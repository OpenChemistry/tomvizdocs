Typical data sets may have following relationships between attributes and sizes.

| Volume          | Voxels        | Size (char) | Size (int) |
|  :---           |  :---         |    :---     | :---       |
| 64<sup>3</sup>  | 262,144       | 0.25 MB     | 1 MB       |
| 128<sup>3</sup> | 2,097,152     | 2.00 MB     | 8 MB       |
| 256<sup>3</sup> | 16,777,216    | 16.00 MB    | 64 MB      |
| 512<sup>3</sup> | 134,217,728   | 128.00 MB   | 512 MB     |
| 1024<sup>3</sup>| 1,073,741,824 | 1,024.00 MB | 4096 MB    |

### Load data

In this subsection, loading methods for three data categories, single data file, stack of images and raw data set, are being introduced.

#### Single data file

Loading single dataset is straight forward, simply select ```Open Data``` from the ```File``` menu, as indicated in screenshot below.

![Open data](img/tomviz_open_data.png)

#### Image stacks

Loading image stacks takes a little bit more efforts than loading single data file. After selecting ```Open Stack``` from the ```File``` menu, check all the images you would like to include in the pop-up window, as indicated in screenshots below.

![Open stack](img/tomviz_open_stack.png)

![Open stack dialog](img/tomviz_stack_dialog.png)

#### Reading a raw file

Users can also choose to read raw files by defining data dimensions, type, endianness, and etc, as indicated below.

![Open data](img/raw_reader.png)

### Save results

#### Save data

Users can save the data by either clicking the ```Save Data``` button from ```File``` (as shown below), or simply using the keyboard short-cut ```Ctrl+S```.

![Save data](img/tomviz_save_data.png)

#### Save state

Similarly to saving data, users can save the state by clicking the ```Save State``` button from ```File```.

![Save state](img/tomviz_save_state.png)

### Recover and load state

#### Recover state

Tomviz saves the pipeline every five minutes, users can recover the previous states by simply allowing the Tomviz to load them.

![Recover state](img/tomviz_recover.png)

#### Load state

When there is no prompt, users can manually load and recover previous states by selecting ```Load State``` from ```File```.

![Load state](img/tomviz_load_state.png)

## Exporting Data

Resulting data can be exported via many ways, which includes saving data to standard formats; taking screenshots or animations of the render view; creating an interactive scene for web browsers; exporting geometry for 3D printing and generating images of slices.

### Save data

Saving data can be accessed via ```File``` menu, simply click on ```Save Data```. Alternatively users can also simply press ```Ctrl+S```.

![Save menu](img/tomviz_save_data.png)

In the pop-up window, choose one of the standard formats that you want to save your data as.

![Data formats](img/save_data_formats.png)

We recommend EMD (HDF5 based) for saving data. Because it supports all the data types that are used in Tomviz, and can save units in all three dimensions. However, note that it may not be as widely supported.

Besides EMD, TIFF is often the most diverse type to export to. Although it supports limited types that are used in Tomviz due to limited support for units and dimensions, it is open and widely supported by many other packages.