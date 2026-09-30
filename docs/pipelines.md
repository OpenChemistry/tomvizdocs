# External Pipelines

You can run Tomviz pipelines outside the GUI in two equivalent ways:

 * The `tomviz-pipeline` command line tool.
 * The `tomviz_pipeline.run` function from the small `tomviz-pipeline` Python
   package.

Both run the state files (`.tvsm` JSON or `.tvh5` HDF5) you save from the
GUI, and both can replace the inputs saved in them. That is what makes them
useful for batch processing: build a pipeline once in the GUI, save it as a
template or a state file, then run it on any number of new datasets.

## Installation

Both interfaces are in the `tomviz-pipeline` package
([repository](https://github.com/openchemistry/tomviz-pipeline)) on PyPI and
conda-forge. Install it into any environment with Python 3.9 or newer:

```bash
pip install tomviz-pipeline
# or
conda install -c conda-forge tomviz-pipeline
```

This puts the `tomviz-pipeline` executable on your `PATH` and makes the
`tomviz_pipeline` module importable. Tomviz uses the same package for
[external execution](pipeline_management.md#python-transforms-and-sources),
so one environment can serve both.

## Running a Pipeline As-Is

Given just a state file and an output directory, the pipeline runs once on
the inputs saved in the state file:

```bash
tomviz-pipeline -s pipeline.tvsm -o results/
```

```python
from tomviz_pipeline import run

run("pipeline.tvsm", "results/")
```

Visualization nodes are ignored. The leaves of what remains (every output
port whose data isn't consumed by another node) are written under
`results/` as typed files (EMD for image data, CSV for tables, XYZ for
molecules), named `<id>_<label>__<port>.<ext>`.

## Overriding Inputs for Batch Processing

To run the pipeline on new data, override its inputs. How depends on
whether the pipeline has one source or several.

### Single-Source Pipelines

With exactly one source node, the override is a file, a glob, or a list of
files. Each file is one run.

```bash
# One file → one run.
tomviz-pipeline -s pipeline.tvsm -o results/ --input data.emd

# Glob → one run per matched file.
tomviz-pipeline -s pipeline.tvsm -o results/ --input 'data/*.emd'

# Explicit list (comma-separated, no spaces).
tomviz-pipeline -s pipeline.tvsm -o results/ --input a.emd,b.emd,c.emd
```

```python
from tomviz_pipeline import run

run("pipeline.tvsm", "results/", inputs="data.emd")
run("pipeline.tvsm", "results/", inputs="data/*.emd")
run("pipeline.tvsm", "results/", inputs=["a.emd", "b.emd", "c.emd"])
```

### Multi-Source Pipelines

With several sources, each override names its source by node id. Node ids
are stable integers, visible in the state file.

On the CLI, prefix every `--input` value with `NODE_ID:`:

```bash
tomviz-pipeline -s pipeline.tvsm -o results/ \
    --input '1:data/*.emd' \
    --input '3:reference.emd'
```

In Python, pass a dict keyed by node id:

```python
from glob import glob
from tomviz_pipeline import run

run("pipeline.tvsm", "results/", inputs={
    1: sorted(glob("data/*.emd")),  # five matches → five runs
    3: "reference.emd",              # broadcast across all five runs
})
```

A length-1 value (a single file or a glob that matches one file) is
broadcast to the longest non-broadcast list, so a constant reference input
can be paired with a sweep over many primary inputs. Lists of length two or
more must all agree on length.

## Output Layout

For a single run, outputs land directly under the output directory:

```
results/
  3_Reconstruction__output.emd
  5_AnalyzeStructures__results.csv
  state.tvsm
```

For two or more runs, each run gets its own zero-padded subdirectory:

```
results/
  run_0/
    3_Reconstruction__output.emd
    state.tvsm
  run_1/
    3_Reconstruction__output.emd
    state.tvsm
  ...
```

Each run also writes `state.tvsm`, the pipeline with that run's inputs
pinned. It can be opened in Tomviz or passed back to `tomviz-pipeline -s`.

The subdirectory prefix defaults to `run` and can be changed with
`--run-prefix` on the CLI or `run_dir_prefix=` in Python.

## Bundled State Output

By default, each leaf output port is written as its own typed file (the
`port` output format). Two other formats are available:

 * `state` - write a single `output_state.tvh5` per run that bundles the
   pipeline state with the data of every populated, non-visualization output
   port. It can be opened in Tomviz.
 * `state+port` - both: the bundled tvh5 plus the typed per-port files.

```bash
tomviz-pipeline -s pipeline.tvsm -o results/ --output-format state
```

```python
run("pipeline.tvsm", "results/", output_format="state")
```

## Worked Example

The Tomviz repository has a batch run you can reproduce in
[`examples/batch`](https://github.com/openchemistry/tomviz/tree/master/examples/batch)
(it needs `tomviz-pipeline` 3.1.7 or newer). `make_example.py` writes four
small volumes with different numbers of spheres, and a pipeline,
`particles.tvsm` (Gaussian Blur, Binary Threshold, Connected Components):

```bash
cd examples/batch
python make_example.py example
tomviz-pipeline -s example/particles.tvsm -o example/results \
    --input 'example/inputs/*.emd'
```

The glob matches four files, so there are four runs, each writing the
Connected Components label map:

```
example/results/
  run_0/4_Connected_Components__volume.emd
  run_0/state.tvsm
  run_1/4_Connected_Components__volume.emd
  run_1/state.tvsm
  run_2/...
  run_3/...
```

`run.sh` in the same directory does both steps. For your own pipeline, save
it with `File` -> `Save State As` and use your state file and input glob. The
state file needs no editing: `--input` replaces the reader's file list for
every run.
