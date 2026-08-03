# Data Acquisition

An experimental feature adds the ability to passively watch a directory for new
files in order to facilitate a passive mode of acquisition where another program
is acquiring data from the microscope. The Tomviz acquisition interface will
watch files in a specified directory using a regular expression to match the
file name.

The process watching the directory is a small, self-contained Python server with
a simple programming interface that can be called over the network. The process
should be started on a machine with access to files as they are acquired, this
can then be used from the Tomviz user interface.

## Installing the Acquisition Server

Get a copy of the Tomviz source repository, and ensure the machine has Python
available. You can install everything in a Python virtual environment:

    git clone --recursive git://github.com/openchemistry/tomviz.git
    cd tomviz/acquisition
    python -m venv tomviz-acq
    source tomviz-acq/bin/activate
    pip install -e .
    pip install -e .[tiff]
    pip install -e .[test]

## Starting the Acquisition Server

Once everything is installed you can start the acquisition server:

    source tomviz-acq/bin/activate
    tomviz-acquisition -a tomviz.acquisition.vendors.passive.PassiveWatchSource

This will start a process running in the terminal on the machine that has a
directory to be watched passively.

## Connecting from the Application

Start the Tomviz application, click on the `Tools` menu, and then select
`Acquisition`. This will open a dialog. Click on `Introspect` at the bottom,
and fill in the details. Typical testing parameters might be the default host
name of `localhost`, port number of `8080`, watch path of `/tmp/test` and the
file name regex of `.*`.

Once ready click on `Connect`, and `Watch` to begin observing the directory. A
preview of the last image to be acquired will be shown, and the pipeline will
get a "Live" data source. This will be appended to and the pipeline re-executed
when new images are available.

## Starting a Test Sequence

Image stacks already acquired can be used for testing. The following command
writes an image from a stack every five seconds:

    tomviz-tiltseries-writer -p /tmp/test -d 5 -t tiff

It supports `dm3` type as well. The path, delay, and type can all be modified.

## Active Development

This feature is under active development and the interfaces may change.
