The analysis pipeline consists principally of data [operators](operator.md),
these are pipeline objects that can perform various analytical functions on the
volumetric data. The first place to look would be the `Data Transforms` menu,
along with the `Segmentation` menu. Tomviz comes bundled with a full Python 3.7
environment, including NumPy, SciPy, Python-wrapped ITK, etc.

## Data Transforms

Data transforms contain a number of useful operators to analyze your data. They
are implemented in C++ or Python, and are grouped in the `Data Transforms`
top-level menu. Some are very simple, and operate immediately on the data while
others require some parameters to be set.

![Data transform menu](img/data_transform_menu.png)

You can view the source code of the Python operators, and double-click them to
edit inputs or view the source code. All operators run in a background thread,
and the application remains interactive while they execute. The screenshot above
shows the contents of the menu.

They are roughly grouped into data manipulation (crop, conversion to float,
reinterpreting types), volume manipulation (shift, slice deletion, padding,
binning, clearing subvolumes), and more general operations (invert data, FFT,
Gaussian filter). They can be combined in pipelines, and the code used as a
starting point in developing custom data transforms.

## Segmentation

Tomviz offers a number of simple segmentation routines that make use of ITK
under the `Segmentation` menu. These include operations such as binary threshold
where all voxels between the specified values will be labeled `1`, geometric
operations such as binary dilate, erode, open and close. There are some labeling
operators, and some experimental particle/pore segmentation.

![Segmentation menu](img/segmentation_menu.png)
