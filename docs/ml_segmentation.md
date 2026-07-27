# Machine Learning Segmentation

Tomviz supports segmentation with machine-learning models in two ways:

1. **Local inference** with the built-in `SAM 2 Segmentation (3D)` and
   `SAM 3 Segmentation (3D)` operators, which run Meta's Segment Anything
   models on your machine in a separate conda environment. SAM 2
   propagates a seed-slice prompt and runs on all platforms; SAM 3 is
   text-prompted and requires an NVIDIA GPU.
2. **Facility-hosted inference**, where a lightweight operator submits
   the volume to a remote service and retrieves the finished
   segmentation. This is the pattern used for SAM 3 at the NSLS-II HXN
   beamline.

Both approaches keep the heavyweight AI dependencies (PyTorch, model
weights) out of the Tomviz application itself. Local inference relies on
Tomviz's [external subprocess
execution](operators_development.md#external-subprocess-execution), which
runs an operator in any conda environment you point it at.

## SAM 2 Segmentation (3D)

Available under `Segmentation` -> `Machine Learning`. The operator treats
the volume as a video: the Z-axis is the time axis, and SAM 2's video
predictor propagates a segmentation from a seed slice through the rest of
the volume. The result replaces the active scalars with a uint8 label map
(0 = background, 1 = foreground).

### One-time setup

**1. Create the conda environment.** Environment files ship with Tomviz
under `share/tomviz/environments/` and are also available in the
[Tomviz repository](https://github.com/OpenChemistry/tomviz/tree/master/tomviz/python/environments):

* `sam2-tomviz-cpu.yml` - all platforms; on Apple Silicon PyTorch uses
  the MPS backend automatically.
* `sam2-tomviz-cuda.yml` - NVIDIA GPUs on Linux (conda-forge ships
  CPU-only builds of `sam-2` for Windows and macOS).

```bash
conda env create -f sam2-tomviz-cpu.yml
```

**2. Download a model checkpoint.** Model weights are distributed by Meta
(Apache 2.0) and are not bundled with Tomviz. Download one or more
checkpoints into `~/.tomviz/sam2/checkpoints/` (or any directory; set it
in the `Checkpoint Directory` parameter):

```bash
mkdir -p ~/.tomviz/sam2/checkpoints && cd ~/.tomviz/sam2/checkpoints
curl -O https://dl.fbaipublicfiles.com/segment_anything_2/092824/sam2.1_hiera_base_plus.pt
```

Variants: `sam2.1_hiera_tiny.pt` (~150 MB), `sam2.1_hiera_small.pt`,
`sam2.1_hiera_base_plus.pt` (~320 MB, the default),
`sam2.1_hiera_large.pt` (~900 MB). If the checkpoint matching the
selected `Model Size` is missing, the operator's error message includes
the exact download URL.

**3. Select the environment** in the operator's `Execution` tab. The
operator is external-only, so the `Internal` executor is disabled.

### Usage

The defaults require no manual input: `Prompt Mode` is `Auto Mask
(Otsu)`, which builds the seed mask automatically on the middle slice.
Press `Apply` and the mask is propagated through the volume in both
directions.

If the automatic seed grabs the wrong object:

* Toggle `Invert Contrast` if your feature is darker than the background.
* Switch `Prompt Mode` to `Point (click)` and enter the voxel coordinates
  of a point inside the object of interest (`Seed X/Y/Z`; -1 means
  center).

Other parameters: `Z Axis` (which numpy axis to propagate along),
`Propagation Direction` (both ways from the seed slice, or only forward
or backward), `Model Size` (larger models segment better and run slower;
use `Tiny` for quick previews), and `Device` (`Auto` picks MPS or CUDA
when available, else CPU). The operator can be canceled, and progress
reports the current slice.

## SAM 3 Segmentation (3D)

Available under `Segmentation` -> `Machine Learning`. Instead of a seed
point, you describe what to segment with a **text prompt** (e.g.
"particle", "pore", "crack"). Each slice along all three axes is
segmented independently by the SAM 3 image model, the per-axis masks are
combined by majority voting, and connected-component labeling stitches
the result into a 3D **instance label map** (int32, 0 = background).

**Requirements:** an NVIDIA GPU (CUDA) with at least 8 GB of memory. On
other machines, use the SAM 2 operator or a facility-hosted service
(below).

### One-time setup

**1. Create the conda environment** from `sam3-tomviz-cuda.yml` (shipped
alongside the SAM 2 files):

```bash
conda env create -f sam3-tomviz-cuda.yml
```

**2. Download the model checkpoint.** `sam3.pt` (about 3.5 GB) is
distributed by Meta on
[HuggingFace](https://huggingface.co/facebook/sam3); the repository is
gated, so you need a free HuggingFace account and must accept Meta's SAM
License. Place it at `~/.tomviz/sam3/checkpoints/sam3.pt` (or any path;
set it in the `Checkpoint Path` parameter). Fine-tuned checkpoints of the
SAM 3 image model work the same way.

**3. Select the environment** in the `Execution` tab, as for SAM 2.

### Usage

Set the `Text Prompt` to the kind of feature you want segmented and press
`Apply`. Tuning knobs:

* `Vote Threshold` - how many of the three axis passes must agree for a
  voxel to be foreground (default 2).
* `Minimum Component Size` - connected components smaller than this many
  voxels are removed.
* `Confidence Threshold` - the SAM 3 detection confidence cutoff
  (default 0.3).

Each slice is processed three times (once per axis); progress reports the
current axis and slice, and the operator can be canceled.

## Facility-hosted segmentation

When no local GPU is available, or when a facility maintains a central
model (for example a fine-tuned SAM 3 checkpoint on a data-center GPU),
the recommended pattern is a thin client operator that ships the volume
to a service and polls for the result. The NSLS-II HXN deployment
implements this with [Tiled](https://blueskyproject.io/tiled/): the
Tomviz operator writes the volume and prompt metadata into a Tiled
catalog and polls for the finished segmentation, while a receiver process
on a GPU server runs SAM 3 inference on each new volume and writes the
label map back. The client operator needs only the `tiled` package, so it
runs in the internal executor with no AI dependencies, and the model
weights, license terms, and GPU provisioning stay entirely within the
facility. The reference implementation (operator and receiver) is
maintained in the NSLS-II HXN operator repository.

## A note on model licensing

Tomviz does not distribute any model weights. SAM 2 checkpoints are
released by Meta under the Apache 2.0 license; SAM 3 is released under
Meta's custom SAM License, which carries additional terms. Use of all
third-party models is governed by their own licenses.
