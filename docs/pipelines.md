# External Pipelines

Tomviz pipelines can be executed outside the GUI in two equivalent ways:

 * The `tomviz-pipeline` command line tool.
 * The `tomviz.pipeline.run` function from the small `tomviz-pipeline` Python
   package that ships with the application.

Both consume the same state files (`.tvsm` JSON or `.tvh5` HDF5) you save
from the GUI, and both let you override the inputs declared in those state
files. That last bit is what makes this useful for batch processing: build a
pipeline interactively once, save it as a template or a state file, then
point the runner at any number of new datasets to get the same processing
applied to each.

## Installation

Both interfaces live in the `tomviz-pipeline` Python package under
`tomviz/python` in the [tomviz repository](https://github.com/openchemistry/tomviz).
Create a virtual environment and install it:

```bash
git clone --recursive https://github.com/openchemistry/tomviz
cd tomviz/tomviz/python
pip install .
```

This puts the `tomviz-pipeline` executable on your `PATH` and makes the
`tomviz.pipeline` module importable.

## Running a Pipeline As-Is

In its simplest form, the runner takes a state file and an output directory.
The pipeline executes once, against whatever inputs are pinned in the state
file:

```bash
tomviz-pipeline -s pipeline.tvsm -o results/
```

```python
from tomviz.pipeline import run

run("pipeline.tvsm", "results/")
```

Visualization nodes are ignored. The leaves of what remains — every output
port whose data isn't consumed by another node — are written under
`results/` as typed files (EMD for image data, CSV for tables, XYZ for
molecules), named `<id>_<label>__<port>.<ext>`.

## Overriding Inputs for Batch Processing

The more interesting case is replacing the inputs declared in the state file
with new data. The shape of the override depends on whether the pipeline has
one source or many.

### Single-Source Pipelines

When the pipeline contains exactly one source node, the override is just a
file, a glob, or a list of files. Each matched file produces one run.

```bash
# One file → one run.
tomviz-pipeline -s pipeline.tvsm -o results/ --input data.emd

# Glob → one run per matched file.
tomviz-pipeline -s pipeline.tvsm -o results/ --input 'data/*.emd'

# Explicit list (comma-separated, no spaces).
tomviz-pipeline -s pipeline.tvsm -o results/ --input a.emd,b.emd,c.emd
```

```python
from tomviz.pipeline import run

run("pipeline.tvsm", "results/", inputs="data.emd")
run("pipeline.tvsm", "results/", inputs="data/*.emd")
run("pipeline.tvsm", "results/", inputs=["a.emd", "b.emd", "c.emd"])
```

### Multi-Source Pipelines

When the pipeline has more than one source, each override has to identify
which source it targets by node id. Node ids are stable integers assigned by
the pipeline and visible inside the state file.

On the CLI, prefix every `--input` value with `NODE_ID:`:

```bash
tomviz-pipeline -s pipeline.tvsm -o results/ \
    --input '1:data/*.emd' \
    --input '3:reference.emd'
```

In Python, pass a dict keyed by node id:

```python
from glob import glob
from tomviz.pipeline import run

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
```

For two or more runs, each run gets its own zero-padded subdirectory:

```
results/
  run_0/
    3_Reconstruction__output.emd
  run_1/
    3_Reconstruction__output.emd
  ...
```

The subdirectory prefix defaults to `run` and can be changed with
`--run-prefix` on the CLI or `run_dir_prefix=` in Python.

## Bundled State Output

By default, each leaf output port is written as its own typed file (the
`port` output format). Two other formats are available:

 * `state` — write a single `output_state.tvh5` per run that bundles the
   pipeline state with the volume payloads of every populated, non-sink
   output port. The resulting file can be re-opened in tomviz.
 * `state+port` — both: the bundled tvh5 plus the typed per-port files.

```bash
tomviz-pipeline -s pipeline.tvsm -o results/ --output-format state
```

```python
run("pipeline.tvsm", "results/", output_format="state")
```
