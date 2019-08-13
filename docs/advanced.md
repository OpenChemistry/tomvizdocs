# Advanced

## Introduction

Tomviz includes a number of functions and algorithms, if those do not satisfy
your needs there is also support for extensions. These include custom operators
and file formats, which are primarily implemented using Python scripts and JSON
to describe user interface elemens. These are introduced in the
[operators](operator.md) section.

The data processing pipeline is central to Tomviz, and each operator is a
self-contained unit operating on the data. It is possible to run these operators
interactively in the application, in a Docker container as part of the
application, and in an external pipeline runner. This section covers running
operators in exernal pipelines.

## External Pipelines

Tomviz usually runs pipelines in a background thread (```Threaded```)
interactively in the application. This can be changed to ```Docker``` in
```Pipeline Settings```.

![Pipeline Settings](img/pipeline_settings.png)

When changing ```Pipeline Mode``` to ```Docker```, a new dialog will appear:

![Pipeline Settings](img/pipeline_settings_docker.png)

Click on ```OK``` when ready. Tomviz will download the docker image from the
selected source the next time the pipeline executes.

![Pipeline Settings](img/pulling_docker.png)

### Running pipelines

We recommend that you create a virtual environment, and install requirements
into that environment. The steps are shown below:

```bash
  $ git clone --recursive git://github.com/openchemistry/tomviz
  $ cd tomviz/tomviz/python
  $ mkvirtualenv tomviz
  $ pip install -e .
```

Use Tomviz to build a pipeline, and save the sate state file (JSON). Note that
the input must be an EMD file, and the output will be an EMD file. The operators
can will be executed in sequence as they are in the application.

```bash
  $ tomviz-pipeline -s state.tvsm -d data.emd -o output.emd
  [2019-07-23 14:14:59,647] INFO: Executing 'Invert Data' operator
  [2019-07-23 14:14:59,963] INFO: Writing transformed data.
```

## Summary

This section showed how the pipeline can be run externally.
