# Visualization and Analysis

## Introduction

Tomviz visualizes the data at the end of each processing pipeline. Normally at the end of a pipeline, several operations have been applied, and the resulting data set will be visualized. However, if no operators have been applied, the original data can be visualized.

Users can also visualize the original data directly from the beginning, by simply selecting the data set, and adding modules to it. Data sets can be clones, which creates a new root.

During the process, Tomviz saves the pipeline every five minutes. This can be recovered upon restart of Tomviz. Users can also save the application state by taking a snapshot of pipeline at a given moment, which can be restored, edited, saved again later. Note that saving state does not save data.

![start end pipeline](img/tomviz_start_end_pipeline.png)

Typical datasets may have following information

| Volume          | Voxels        | Size (char) | Size (int) |
|  :---           |  :---         |    :---     | :---       |
| 64<sup>3</sup>  | 262,144       | 0.25 MB     | 1 MB       |
| 128<sup>3</sup> | 2,097,152     | 2.00 MB     | 8 MB       |
| 256<sup>3</sup> | 16,777,216    | 16.00 MB    | 64 MB      |
| 512<sup>3</sup> | 134,217,728   | 128.00 MB   | 512 MB     |
| 103<sup>3</sup> | 1,073,741,824 | 1,024.00 MB | 4096 MB    |

### Load data

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

## Volume rendering

## Data transforms

## Segmentation

## Exporting data
