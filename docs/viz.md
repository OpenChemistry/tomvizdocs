# Visualization and Analysis

## Table of Contents
1. [Introduction](#introduction)
    1. [Load data](#loaddata)
    2. [Save Results](#saveresults)
    3. [Recover and load state](#recoverstate)
2. [Visualization Techniques](#visualizationtechniques)
    1. [Available visualization modules](#vizmodules)
    2. [Default view of loaded data](#defaultview)
3. [Volume Rendering](#volumerendering)
    1. [Display options](#displayoptions)
    2. [Rendering properties](#renderingproperties)
4. [Data Transforms](#datatransforms)
5. [Segmentation](#segmentation)
6. [Exporting Data](#exportingdata)
    1. [Save data](#savedata)
    2. [Export screenshot](#exportscreenshot)
    3. [Export movie](#exportmovie)
    4. [Export to web](#exporttoweb)
    5. [Export mesh for 3D printing](#exportmesh)
    6. [Export image from slice](#exportimage)
7. [Summary](#summary)

<!--*********************** Section 1 Introduction ***********************-->
<a name="introduction"></a>
## Introduction

Tomviz visualizes the resulting data set at the end of each processing pipeline, where normally several operations have been applied. However, if no operators have been applied, the original data will be visualized.

Users can also display the original data directly from the beginning of a pipeline, by simply selecting the data set, and adding modules to it. Data sets can be clones, which means creating a new root.

During the process, Tomviz saves the pipeline every five minutes. This can be recovered upon next restart of Tomviz. Users can also save the application state by taking a snapshot of the pipeline at a given moment, which can be restored, edited, saved again later. Note that saving state does not save data.

<img src="img/tomviz_start_end_pipeline.png" width="600">

Typical datasets may have following relationships between attributes and sizes.

| Volume          | Voxels        | Size (char) | Size (int) |
|  :---           |  :---         |    :---     | :---       |
| 64<sup>3</sup>  | 262,144       | 0.25 MB     | 1 MB       |
| 128<sup>3</sup> | 2,097,152     | 2.00 MB     | 8 MB       |
| 256<sup>3</sup> | 16,777,216    | 16.00 MB    | 64 MB      |
| 512<sup>3</sup> | 134,217,728   | 128.00 MB   | 512 MB     |
| 103<sup>3</sup> | 1,073,741,824 | 1,024.00 MB | 4096 MB    |

<a name="loaddata"></a>
### Load data

In this subsection, loading methods for three data categories, single data file, stack of images and raw data set, are being introduced.

#### Single data file

Loading single data set is straight forward, simply select ```Open Data``` from the ```File``` menu, as indicated in screenshot below.

<img src="img/tomviz_open_data.png" height="250">

#### Image stacks

Loading image stacks takes a little bit more efforts than loading single data file. After selecting ```Open Stack``` from the ```File``` menu, check all the images you would like to include in the pop-up window, as indicated in screenshots below.

<img src="img/tomviz_open_stack.png" height="250">

<img src="img/tomviz_stack_dialog.png" height="250">

#### Reading a raw file

Users can also choose to read raw files by defining data dimensions, type, endianness, and etc, as indicated below.

<img src="img/raw_reader.png" height="250">

<a name="saveresults"></a>
### Save results

#### Save data

Users can save the data by either clicking the ```Save Data``` button from ```File``` (as shown below), or simply using the keyboard short-cut ```Ctrl+S```.

<img src="img/tomviz_save_data.png" height="250">

#### Save state

Similary to saving data, users can save the state by clicking the ```Save State``` button from ```File```.

<img src="img/tomviz_save_state.png" height="250">

<a name="recoverstate"></a>
### Recover and load state

#### Recover state

Tomviz saves the pipeline every five minutes, users can recover the previous states by simply allowing the Tomviz to load them.

<img src="img/tomviz_recover.png" width="600">

#### Load state

When there is no prompt, users can manually load and recover previous states by selecting ```Load State``` from ```File```.

<img src="img/tomviz_load_state.png" height="250">

<a name="visualizationtechniques"></a>
## Visualization techniques

In this section, we will go over some available techniques and explain the important parameters. Most of the techniques are GPU accelerated, which requires a good graphics card that has at least 1GB memory.

<a name="vizmodules"></a>
### Available visualization modules

<img src="img/viz_modules.png" width="300">

Visualization modules were implemented and optimized using C++ and GLSL (GLslang) to take full advantage of hardware accelerations. These modules are available from the visulization menu.

<img src="img/viz_menu.png" height="250">

<a name="defaultview"></a>
### Views of loaded data

A set of visualization modules come pre-set when loading any datasets, as shown in the image below. Default color map, plasma,is used. Histogram is calculated in the background thread and then displayed when ready in the top-right.

Default pipeline is constructed with two modules; outline, which shows the extent of the data; and a slice, which shows the slice going through the center of data.

All the default settings can be modified later.

<img src="img/default_view.png" width="600">

#### Palette and background colors

Palette can be easily modified with several presets.

<img src="img/palette.png" width="200">

Tips: balck blackground is recommended in some situations on monitors; white is preferred for print, web pages and etc. to highlight samples.

#### Color maps

As introduced, ```Plasma``` is the default color map. But users can always choose others from the menu.

<img src="img/colormaps.png" height="250">

For example, below shows the same data set with ```Viridis``` color map.

<img src="img/colormap2.png" width="600">

#### Contour

Users can choose to display the isocontour at a certain level by either sliding the red line on top inside the histogram, or within the bottom-right ```Properties``` section. Specular lighting is used when displaying contours. Several examples with different levels of isocontours are shown below.

<img src="img/contour.png" width="600">

<img src="img/contour2.png" width="600">

<img src="img/contour3.png" width="600">

#### Slice

A 2D lice of data can be displayed separately from a 3D dataset. The slice can be a standard orthogonal slice, or a slice with any arbitrary angles.

##### Orthogonal slice

<img src="img/orthogonal_slice.png" width="600">

##### Arbitrary slice

<img src="img/slice.png" width="600">

#### Outline

Several tools are available to understand the outline of the loaded data set.

##### Grid and axes

Grid and axes generated a bounding box with grids and axes, which help users understand the size of the data set.

<img src="img/outline.png" width="600">

##### Ruler

Rulers are manually defined by users where the start and end points of the ruler is set on specific places of the data set. The length of the ruler is then displayed, as shown in image below.

<img src="img/ruler.png" width="600">

##### Threshold

Users can choose to display only the voxels that are within a certain set of min and max values. The bounds can be set inside the bottom-right ```Properties``` section, as shown below.

<img src="img/threshold.png" width="600">

<img src="img/threshold2.png" width="600">

<!--*********************** Section 3 Volume Rendering ***********************-->
<a name="volumerendering"></a>
## Volume Rendering

Tomviz volume rendering utilizes GPU memory to upload volume to card and provides powerful techniques that traces paths of rays. It supports different options such as changing color map, modifying the opacity transfer function, transfer modes, interpolation, blending, lighting, jittering, and etc. The volume rendering with default settings can look like the image below.

<img src="img/volume_render.png" width="600">

<a name="displayoptions"></a>
### Display options

#### Opacity

Different opacities can be set by dragging the pink ring within the histogram; the higher the more opaque, and the lower the more transparent. An example shown below illustrates when setting voxels with values smaller than around 10,000 are set to compeletly transparent. In contrast to the default rendering shown above, the "outside blue bounding box" now disappears.

<img src="img/volume_render2.png" width="600">

#### Background color

Blackground color can be set by right clicking inside the render view and choosing ```Background color``` in the prompt menu. Both customized and pre-selected colors are available. Images below show two examples of the same dataset with black and white background colors.

<img src="img/volume_render_black.png" width="600">

<img src="img/volume_render_white.png" width="600">

#### Empty space

<img src="img/volume_render_outline.png" width="600">

#### Cropping

Cropping can be easily accessed from ```Crop``` within the ```Data Transform``` menu.

<img src="img/volume_render_crop_menu.png" width="600">

After selecting ```Crop```, a prompt will pop up and ask for the start and end values for cropping. Users can type the exact numbers manually, or dragging the little round dots inside the render view. The numbers inside the pop-up window will change according as the user drags the sliding dots.

<img src="img/volume_render_crop1.png" width="600">

<img src="img/volume_render_crop2.png" width="600">

When the desired values are set, simply click on ```Apply``` to finish the cropping.

<img src="img/volume_render_crop3.png" width="600">

<a name="renderingproperties"></a>
### Rendering Properties

All the available rendering properties live in the bottom left of the window, as shown in image below. It includes many volume rendering properties, which would affect rendering in different ways.

<img src="img/volume_props.png" height="250">

Below we list several results to illustrate the rendering under different properties.

#### Default

<img src="img/volume_default.png" width="400">

#### No jittering

<img src="img/volume_no_jitter.png" width="400">

#### Lighting

<img src="img/volume_lighting.png" width="400">

#### Max intensity

<img src="img/volume_max.png" width="400">

#### 1D transfer

1D transfer function highlights gradients

<img src="img/volume_1d_transfer.png" width="400">

#### 2D transfer

Just like 1D transfer function, 2D transfer also highlights the gradients.

<img src="img/volume_2d_transfer.png" width="400">

Besides it, 2D transfer function provides more selectivity for some data sets. As shown below, users can select a box in the 2D histogram.

<img src="img/volume_2d_transfer2.png" width="400">

<!--*********************** Section 4 Data Transforms ***********************-->
<a name="datatransforms"></a>
## Data Transforms

Data transforms were implemented as operators in C++ or Python. They can be applied to the data directlry, while some of them provide graphical interfaces. The operators source code can be viewed and edited from the ```Context``` menu. Most of the operators make extensive use of NumPy.

All the operators execute in a background thread. During the execution, application remains interactive, and users can still edit the pipeline.

All the operators can be easily accessed from the ```Data Transforms``` menu, as shown below.

<img src="img/data_transform_menu.png" height="400">

<!--*********************** Section 5 Segmentation ***********************-->
<a name="segmentation"></a>
## Segmentation

Tomviz uses [ITK](https://itk.org/) (Segmentation and Registration Toolkit) to segment data in various ways. For examples, topological segmentation, data labeling, summarization, and etc.

All the available segmentation methods can be accessed through the ```Segmentation``` menu, as shown below.

<img src="img/segmentation_menu.png" height="250">

<!--*********************** Section 6 Exporting Data ***********************-->
<a name="exportingdata"></a>
## Exporting Data

Resulting data can be exported via many ways, which includes saving data to standard formats; taking screenshots or animations of the render view; creating an interactive scene for web browsers; exporting geometry for 3D printing and generating images of slices.

<a name="savedata"></a>
### Save data

Saving data can be accessed via ```File``` menu, simply clikc on ```Save Data```. Alternatively users can also simply press ```Ctrl+S```.

<img src="img/tomviz_save_data.png" height="250">

In the pop-up window, choose one of the standard formats that you want to save your data as.

<img src="img/save_data_formats.png" width="400">

We recommend EMD (HDF5 based) for saving data. Because it supports all the data types that are used in Tomviz, and can save units in all three dimensions. However, note that it may not be as widely supported.

Besides EMD, TIFF is often the most diverse type to export to. Although it supports limited types that are used in Tomviz due to limited support for units and dimensions, it is open and widely supported by many other packages.

<a name="exportscreenshot"></a>
### Export screenshot

From the same ```File``` menu, you can choose ```Export Screenshot``` option. Inside the prompt window, specify size, which supports a number of image formats. And then override palette, it is recommended to use transparent backgrounds.

<img src="img/export_screenshot.png" height="250">

<a name="exportmovie"></a>
### Export movie

Exporting movie supports common movie formats. Same as before, ```Export Movie``` can be accessed from ```File```. In the pop-up window, set the resolution or override color palette when needed.

<img src="img/save_movie.png" height="250">

<a name="exporttoweb"></a>
### Export to web

When exporting to web, different types of data may need different settings. When generating images, there is no need for WebGL or any other special settings for the brower. However, when exporting geometry based data where actual data is exported, it is often needed to downsample the result, which also provides better interactivity inside browsers. And when generating data for viewer option, it is better exported to larger website, since by default the whole dataset will be exported to a single HTML page.

<img src="img/export_web.png" width="400">

An example after successfully exporting the data to web may look like

<img src="img/export_web_eg.png" height="300">

<a name="exportmesh"></a>
### Export mesh for 3D printing

Isocontours of the data set with a specific level can be exported to mesh by right-clicking on ```Contour``` inside the ```Pipelines``` section, as shown below, and then choosing ```Export as Mesh```. Define the settings such as the saving address, etc, to complete the process.

<img src="img/export_mesh.png" width="400">

<a name="exportimage"></a>
### Export image from slice

A certain slice of data (either orthogonal or with arbitrary angles) that goes through the data can be saved as an image. Similar to the process when exporting to mesh, simply right-click on the slice that you want to export, and select ```Export as image```.

<img src="img/export_image.png" width="400">

<a name="summary"></a>
## Summary

This tutorial covered how to work with and visualize volume data, which includes data transforms, segmentation and many other options for contours generation, volume rendering, and etc. Different visualization types can be combined and the resulting data set can be exported via various formats and different media types.
