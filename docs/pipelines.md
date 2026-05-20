# External Pipelines

Tomviz includes a number of functions and algorithms, but if those do not
satisfy your needs there is also support for extensions. These include custom
transforms and file formats, which are primarily implemented using Python
scripts and JSON to describe user interface elements. These are introduced in
the [operators development](operators_development.md) section.

The data processing pipeline is central to Tomviz, and each transform is a
self-contained unit operating on the data. It is possible to run these
transforms interactively in the application, in a separate conda environment
per-transform, or in an external pipeline runner. This section covers running
transforms in external pipelines.

## Per-Transform External Execution

Individual transforms can be configured to execute in an external subprocess
with a separate conda environment. This is controlled by the
`tomviz_pipeline_env` setting in the transform's JSON description file. See
[External Subprocess Execution](operators_development.md#external-subprocess-execution)
for details.

## Command-Line Pipeline Runner

The `tomviz-pipeline` command allows executing a pipeline from the command
line without the GUI. This is useful for batch processing or automation.

### Installation

Create a virtual environment and install the package:

```bash
git clone --recursive git://github.com/openchemistry/tomviz
cd tomviz/tomviz/python
pip install -e .
```

### Running Pipelines

Use Tomviz to build a pipeline and save a state file. The input must be an EMD
file, and the output will be an EMD file. Transforms execute in sequence as
they do in the application.

```bash
tomviz-pipeline -s state.tvsm -d data.emd -o output.emd
```

A directory may be provided for the `-d` option. In this case the pipeline
will be executed on all EMD files in that directory. The `-o` option
also accepts a directory for writing transformed EMD files.

```bash
tomviz-pipeline -s /tmp/test.tvsm -d /tmp/data/ -o /tmp/output
```

Transformed datasets are written with the `_transformed` suffix.
