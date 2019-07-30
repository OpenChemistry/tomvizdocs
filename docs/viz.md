# Visualization and Analysis

## Table of Contents
1. [Introduction](#introduction)
    1. [Load Data](#loaddata)
2. [Volume Rendering](#volumerendering)
3. [Data Transforms](#datatransforms)
4. [Segmentation](#segmentation)
5. [Exporting Data](#exportingdata)

## Introduction<a name="introduction"></a>

Tomviz visualizes the resulting data set at the end of each processing pipeline, where normally several operations have been applied. However, if no operators have been applied, the original data will be visualized.

Users can also display the original data directly from the beginning of a pipeline, by simply selecting the data set, and adding modules to it. Data sets can be clones, which means creating a new root.

During the process, Tomviz saves the pipeline every five minutes. This can be recovered upon next restart of Tomviz. Users can also save the application state by taking a snapshot of the pipeline at a given moment, which can be restored, edited, saved again later. Note that saving state does not save data.

<img src="img/tomviz_start_end_pipeline.png" width="600">

Typical datasets may have following relationship between attributes and sizes.

| Volume          | Voxels        | Size (char) | Size (int) |
|  :---           |  :---         |    :---     | :---       |
| 64<sup>3</sup>  | 262,144       | 0.25 MB     | 1 MB       |
| 128<sup>3</sup> | 2,097,152     | 2.00 MB     | 8 MB       |
| 256<sup>3</sup> | 16,777,216    | 16.00 MB    | 64 MB      |
| 512<sup>3</sup> | 134,217,728   | 128.00 MB   | 512 MB     |
| 103<sup>3</sup> | 1,073,741,824 | 1,024.00 MB | 4096 MB    |

<a name="loaddata"></a>
### Load data

In this subsection, loading methods for three data categories, which are single data file, stack of images and raw data set, are being introduced.

#### Single data file

Loading single data set is straight forward, simply select ```Open Data``` from the ```File``` menu, as indicated in image below.

<img src="img/tomviz_open_data.png" width="200" height="300">

#### Image stacks

Loading image stacks takes similar efforts as loading single data file. Select ```Open Stack``` from ```File```, and then choose the images you would like to include in the pop-up window, as indicated in screenshots below.

<img src="img/tomviz_open_stack.png" width="200" height="300">

<img src="img/tomviz_stack_dialog.png" height="300">

#### Reading a raw file

Users can read raw files by defining data dimensions, type, endianness, and etc, as indicated below.

<img src="img/raw_reader.png" height="300">

### Save data

#### Save data

Users can save the data by either clicking the ```Save Data``` button from ```File```, or using short-cut ```Ctrl+S```.

<img src="img/tomviz_save_data.png" width="200" height="300">

#### Save state

Similary to saving data, users can save the state by clicking the ```Save State``` button from ```File```.

<img src="img/tomviz_save_state.png" width="200" height="300">

### Recover and load state

#### Recover state

<img src="img/tomviz_recover.png" width="200" height="300">

#### Load state

<img src="img/tomviz_load_state.png" width="200" height="300">

## Visualization techniques

In this section, we will go over some available techniques and explain the important parameters. Most of the techniques are GPU accelerated, which requires a good graphics card that has at least 1GB memory.

### Available visualization modules

<img src="img/viz_modules.png" width="300">

Visualization modules were implemented and optimized using C++ and GLSL (GLslang) to take full advantage of hardware accelerations. These modules are also available from the visulization menu.

<img src="img/viz_menu.png" width="200">

### Default view of loaded data

A set of visualization modules come preset when loading any datasets, as shown in the image below. Default color map, plasma,is used. Histogram is calculated in background thread and then displayed when ready in the top-right. Default pipeline is constructed with two modules; outline, which shows the extent of the data; and a slice, which shows the slice through the center of data.

<img src="img/default_view.png" width="600">

#### Palette and background colors

Palette can be easily modified with several presets. Tips: balck blackground is recommended in some situations on monitors; white is preferred for print, web pages and etc. to highlight samples.

<img src="img/palette.png" width="200">

#### Color maps

<img src="img/colormaps.png" height="250">

<img src="img/colormap2.png" height="250">

#### Contour

##### Specular

<img src="img/contour.png" width="600">

##### Values

<img src="img/contour2.png" width="600">

<img src="img/contour3.png" width="600">

#### Slice

##### Orthogonal slice

<img src="img/orthogonal_slice.png" width="600">

##### Arbitrary slice

<img src="img/slice.png" width="600">

#### Outline

##### Grid and axes

<img src="img/outline.png" width="600">

##### Ruler

<img src="img/ruler.png" width="600">

<img src="img/threshold.png" width="600">

<img src="img/threshold2.png" width="600">

<a name="volumerendering"></a>
## Volume Rendering

<a name="datatransforms"></a>
## Data Transforms

<a name="segmentation"></a>
## Segmentation

<a name="exportingdata"></a>
## Exporting Data
