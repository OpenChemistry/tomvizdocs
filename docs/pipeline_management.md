# Pipeline Management

Tomviz uses a node-based pipeline to manage data processing and visualization.
The pipeline is displayed as a vertical strip widget in the top-left panel of
the application, showing the flow of data from sources through transforms to
visualizations.

<!-- VIDEO NEEDED: Overview of the pipeline strip widget. Show creating a source,
     adding transforms, adding visualizations, selecting nodes, expanding/collapsing
     ports, creating and deleting links, using context menus, and using the
     pipeline controls (pause/stop/resume). This is the highest-priority video
     since the pipeline model is the biggest conceptual change in 3.0. -->

## Pipeline Concepts

The pipeline is built from three types of nodes connected by links:

 * **Sources** (green) - Load or generate data. This includes file readers,
   data generators (constant dataset, random particles, electron beam shape),
   and beamline sources (PyXRF, Ptycho).
 * **Transforms** (blue) - Process data. These include all operators from the
   Data Transforms, Segmentation, and Tomography menus.
 * **Visualizations** (orange) - Display data. These include Volume, Slice,
   Contour, Outline, Threshold, Clip, Ruler, Scale Cube, Molecule, and Plot.

Each node has **input ports** (at the top) and **output ports** (at the bottom).
Ports are color-coded by data type:

 * Amber - ImageData (generic volumetric data)
 * Indigo - TiltSeries (volumetric data with tilt angles)
 * Orchid - Volume (volumetric data without tilt angles)
 * Green - LabelMap (categorical/segmentation data)
 * Teal - Table
 * Rose - Molecule
 * Olive - Image

Port types form a hierarchy: TiltSeries, Volume, and LabelMap are all
subtypes of ImageData. A transform that accepts ImageData will accept any of
these subtypes. Transforms declare what types they accept and produce - for
example, segmentation transforms like Binary Threshold accept ImageData and
produce a LabelMap output. Morphology transforms like Binary Dilate accept
LabelMap input and produce LabelMap output, so they can only be linked
downstream of a segmentation step. Transforms that are incompatible with the
selected port's data type appear in the "Unavailable" section of the operator
search dialog.

**Links** connect output ports to input ports, defining how data flows through
the pipeline.

<!-- SCREENSHOT NEEDED: Pipeline strip widget showing a typical pipeline with
     a source node (green), two or three transform nodes (blue), and a
     visualization group (orange). Show at least one node expanded to reveal
     its output ports. The strip should show link lines in the left gutter. -->
![Pipeline strip widget](img/pipeline_strip_widget.png)

## Pipeline Strip Widget

The pipeline strip widget displays nodes as compact cards stacked vertically.
Each card shows:

 * A colored badge with the node icon
 * The node label
 * A state indicator (spinner while running, checkmark when complete, or error icon)
 * A breakpoint indicator (on the left edge)
 * A menu button (three dots)
 * An expand/collapse toggle

### Expanding Nodes

Click the expand toggle (chevron) on a node card to reveal its output ports
as individual port cards below the node. Each port card shows the port type
icon and name. Collapsed nodes show output ports as compact colored dots.

Output port badges indicate data storage:

 * **Pin icon** (top-right corner) - Port data is persistent
 * **RAM icon** (bottom-right corner) - Data is currently in memory
 * **Disk icon** (bottom-right corner) - Data is cached on disk

### Selecting Nodes and Ports

Click a node card to select it. The Properties panel on the left will update
to show the selected node's properties. Click an output port dot or card to
select that port specifically.

When **focus dimming** is enabled (via the filter icon in the pipeline controls),
selecting a node highlights it and its immediate connections while dimming
unrelated parts of the pipeline.

### Context Menus

Right-click a node, port, or link to access its context menu. Context menus
provide options such as:

 * **Nodes** - Edit parameters, delete, clone, export data
 * **Ports** - Change persistence mode, export data
 * **Links** - Delete the connection
 * **Visualization groups** - Remove a visualization from its group

Double-click a node card to open its edit dialog.

## Creating Links

To create a link between nodes, click and drag from an output port dot to an
input port on another node. While dragging, a dashed line follows the cursor.
When the cursor is over a valid input port, the line becomes solid. Release
to create the link.

By default, when you add a new transform or visualization from the menus, it
is automatically linked to the currently selected output port. Hold **Ctrl**
when clicking a visualization menu item to enter manual linking mode, where
you choose which port to connect to.

## Pipeline Controls

The pipeline controls toolbar sits above the pipeline strip widget and provides:

 * **Play/Pause** - Pause automatic pipeline execution. When paused, parameter
   changes accumulate but transforms do not run until you resume.
 * **Stop** - Cancel a currently running pipeline execution.
 * **Focus dimming toggle** (filter icon) - Enable or disable visual dimming of
   unrelated pipeline elements when a node is selected.
 * **Persistence mode** - Set the default data persistence for new transforms:
   * *In Memory* - Keep intermediate results in RAM (fastest, uses more memory)
   * *On Disk* - Cache intermediate results to disk (slower, saves memory)
   * *Transient* - Do not store intermediate results (re-compute when needed)

<!-- SCREENSHOT NEEDED: Pipeline controls toolbar showing the play/pause button,
     stop button, dimming toggle, and persistence dropdown. -->
![Pipeline controls](img/pipeline_controls.png)

## Pipeline Breakpoints

Breakpoints allow you to pause pipeline execution at a specific transform,
enabling step-by-step inspection of intermediate results. This is useful for
debugging complex pipelines or examining how each transform affects the data.

### Setting a Breakpoint

To set a breakpoint, hover your mouse over the left edge of a transform node
in the pipeline strip widget. A faded red circle will appear. Click it to set
the breakpoint - the circle becomes solid, indicating that the pipeline will
pause before executing that transform.

<!-- SCREENSHOT NEEDED: Pipeline strip widget showing a transform node with a
     solid red breakpoint circle on its left edge. -->
![Pipeline breakpoint set](img/pipeline_breakpoint_set.png)

### Running with Breakpoints

When the pipeline encounters a breakpoint, execution pauses at that point. You
can inspect the data as it exists after all preceding transforms have run.
While paused, you can adjust parameters on earlier transforms and re-run. To
resume execution past the breakpoint, click the green Play button that appears
where the breakpoint was.

<!-- SCREENSHOT NEEDED: Pipeline strip widget showing a paused pipeline at a
     breakpoint, with the green play button visible. -->
![Pipeline breakpoint play](img/pipeline_breakpoint_play_button.png)

The breakpoint is not removed automatically after resuming. Click the solid red
circle again to remove it.

## Inserting Transforms

New transforms are linked to the currently selected output port. To insert a
transform in the middle of an existing pipeline:

 1. Select the output port or node that should feed into the new transform
 2. Add the transform from any menu (Data Transforms, Tomography, Segmentation)
 3. The new transform is inserted at that point, and downstream links are
    updated accordingly

## Editing Transform Parameters

Double-click a transform node (or select "Edit" from its context menu) to open
the parameter edit dialog. The dialog provides:

 * **Apply** - Apply the current parameters and re-execute the pipeline, keeping
   the dialog open for further adjustments
 * **OK** - Apply and close the dialog
 * **Cancel** - Discard changes and close

The Apply and OK buttons are disabled while the pipeline is executing.
