# Data Acquisition

An experimental feature watches a directory for new files, for a passive mode
of acquisition where another program acquires the data from the microscope.
Files are matched with a regular expression on the file name.

The watching is done by a small, self-contained Python server that is called
over the network. Start it on a machine that can see the files as they are
acquired.

## Installing the Acquisition Server

Clone the Tomviz source repository on a machine with Python, and install the
server in a virtual environment:

    git clone --recursive https://github.com/openchemistry/tomviz.git
    cd tomviz/acquisition
    python -m venv tomviz-acq
    source tomviz-acq/bin/activate
    pip install -e .
    pip install -e .[tiff]
    pip install -e .[test]

## Starting the Acquisition Server

Once everything is installed you can start the acquisition server:

    source tomviz-acq/bin/activate
    tomviz-acquisition -a tomviz_acquisition.acquisition.vendors.passive.PassiveWatchSource

The server runs in that terminal.

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

To test with an existing image stack, this command writes one image every
five seconds:

    tomviz-tiltseries-writer -p /tmp/test -d 5 -t tiff

`-p` sets the path, `-d` the delay in seconds, and `-t` the type (`tiff` or
`dm3`).

## Active Development

This feature is under active development and the interfaces may change.
