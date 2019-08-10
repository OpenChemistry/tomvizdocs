# Operators

Operators are the core of the data processing pipeline. They are predominantly
written in Python, with some developed in C++. There are a couple of ways to implement a Python operator. Most operators take a volume as an input, do some operations on that volume, and output a volume. In Python these are typically viewed as NumPy arrays, where they are a view of the native C++ memory used by Tomviz.

## Simple Operator

This operator can be found by clicking on <code>Data Tansforms -> Custom Transform</code>. It is one of the simplest transforms possible where all simple operators define the <code>transform_scalars</code> function, import the necessary modules, and then get the data as an array. This array can be treated like any NumPy array, operated on, and once ready the output should be set to make it visible to the application.

``` python
def transform_scalars(dataset):
    """Python operators that transforms the input array"""

    from tomviz import utils
    import numpy as np

    # Get the current volume as a numpy array.
    array = utils.get_array(dataset)

    # This is where you operate on your data, here we square root it.
    result = np.sqrt(array)

    # This is where the transformed data is set, it will display in tomviz.
    utils.set_array(dataset, result)
```

The dialog in Tomviz enables editing of  Python transforms in the source tab,
clicking apply will apply the code in the editor leaving the dialog open,
clicking OK will apply the transform and close the dialog. The Python code is
not saved permanently, saving a state file will save custom Python.

### Subclassing tomviz.operators.Operator

Tomviz provides an operator base class that can be used to implement a Python operator. To create an operator simply subclass and provide an implementation of the
'transform_scalars' method.

```python

import tomviz.operators

class MyOperator(tomviz.operators.Operator):
    def transform_scalars(self, data):
        # Do work here

```

### Subclassing tomviz.operators.CancelableOperator

To implement an operator that can be canceled the operator should be derived
from <code>tomviz.operators.CancelableOperator</code>. This provides an additional
property called <code>canceled</code> that can be used to determine if the operator
execution have been canceled by the user. The data should be processed in chunks
so that this property can be periodically checked to break out of the execution
if necessary.

```python

import tomviz.operators

class MyCancelableOperator(tomviz.operators.CancelableOperator):
    def transform_scalars(self, data):
         while(not self.canceled):
            # Do work here

```

### Operator progress

Instances of <code>tomviz.operators.Operator</code> have a <code>progress</code> attribute that can be used to report the progress of an operator. The maximum number of steps the operator will report is held in the <code>progress.maximum</code> property and the current progress can be updated using <code>progress.value = currrent_value</code>. A status message can also be set on the progress object to give further feedback to the user <code>progress.message = msg</code>

```python

import tomviz.operators

class MyProgressOperator(tomviz.operators.Operator):
    current_progress = 0
    def transform_scalars(self, data):
        self.progress.maximum = 100
        # Do work here
        current_progress += 1
        self.progress.value = current_progress
```

### Generating the user interface automatically

Python operators can take zero or more parameters that govern their operation.
Initializing these parameter values is typically done through a dialog box
presented prior to running the operator. The simplest way to define the user
interface is to describe the parameters in a JSON file that accompanies the
Python script.

The JSON file consists of a few key/value pairs at the top level of the JSON tree:

* `name` - The name of the operator. The name should not contain spaces.
* `label` - The displayed name of the operator as it should appear in the user
interface. No restrictions.
* `description` - Text that describes what the operator does. No restrictions.
* <code>parameters</code> - A JSON array of parameters.

An item in the <code>parameter</code> array is itself a JSON object consisting of several name/value pairs.

* `name` - The name of the parameter. This must be a valid Python variable name.
* `label` - The displayed name of the parameter in the user interface. No
restrictions.
* <code>type</code> - Parameter type. Currently supported types are:
    * `bool` - Boolean type. Valid values are <code>true</code> or <code>false</code>.
    * <code>int</code> - Integral type. Valid values are in the range of a C integer.
    * `double` - Floating-point type. Valid values are in the range of a C double.
    * `enumeration` - Provides a set of options. Possible values are listed in
    an <code>options</code> key/value pair (described below)
    * `xyz_header` - Special type used as a hint for the UI to add the headers
    "X", "Y", and "Z" above columns for 3-element parameters representing
    coordinates.
    * `file` - Provides the ability to browse for a file path.
    * `directory` - Provides the ability to browse for a directory path.
* <code>default</code> - Default value for the parameter. Must be a number or boolean JSON
value <code>true</code> or <code>false</code>. The default for a multi-element <code>int</code> or `double` parameter is an array of one or more ints or doubles.
* `minimum` - Sets the minimum value that a parameter may be. An array of
values specifies the component-wise minimum of a multi-element parameter.
* `maximum` - Like the `minimum`, but sets the maximum value that a parameter
may be.
* <code>precision</code> - Optional number of digits past the decimal for `double`
parameters.
* <code>options</code> - An array of JSON objects, each of which contains a single key/value pair where the key is the name of the option and the value is an integer index of the options.

Examples of parameter descriptions:

`bool`

```
{
  "name" : "enable_valley_emphasis",
  "label" : "Enable Valley Emphasis",
  "type" : "bool",
  "default" : false
}
```

<code>int</code>
```
{
  "name" : "iterations",
  "label" : "Number of Iterations",
  "type" : "int",
  "default" : 100,
  "minimum" : 0
}
```

Multi-element <code>int</code>
```
{
  "name" : "shift",
  "label" : "Shift",
  "description" : "The shift to apply",
  "type" : "int",
  "default" : [0, 0, 0]
}
```

`double`
```
{
  "name" : "rotation_angle",
  "label" : "Angle",
  "description" : "Rotation angle in degrees.",
  "type" : "double",
  "default" : 90.0,
  "minimum" : -360.0,
  "maximum" : 360.0,
  "precision" : 1
}
```

Multi-element `double`
```
{
  "name" : "resampling_factor",
  "label" : "Resampling Factor",
  "type" : "double",
  "default" : [1, 1, 1]
}
```

`enumeration`
```
{
  "name" : "rotation_axis",
  "label" : "Axis",
  "description" : "Axis of rotation.",
  "type" : "enumeration",
  "default" : 0,
  "options" : [
    {"X" : 0},
    {"Y" : 1},
    {"Z" : 2}
  ]
}
```

### Defining Operator Results and Child Data Sets

In addition to transforming the current data set, operators may produce
additional data sets. The additional data sets are described in the top-level
JSON with the following keys:

* `results` - An array of JSON objects describing the outputs produced by the
operator. Results are additional data objects produced when the operator is run.
Result JSON objects have three key/value pairs:
    * `name` - The name of the result
    * `label` - The displayed name of the result in the UI.
More than one result may be produced by the operator.
* `children` - An array of JSON objects describing child data sets produced by
the operator. Child data sets are similar to results, but are special in that they
must be image data to which additional operators may be applied. A child data set
is described with the same key/value pairs as `results` objects. Currently, only
a single child data set is supported.

The `name` key of each result and child data set must be unique.

### Creating Operator Results and Child Data Sets

In the operator Python code, results and child data sets are set in a
dictionary returned by the `transform_scalars` function. This dictionary consists
of key/value pairs where the name is the `name` value of the result or child
data set and the value is the result or child data object. Results and child
data objects are VTK objects created in the Python operator code. See
`ConnectedComponents.py` for an example of how to return both a result and
child data set.

### Command line execution of pipeline

An operator pipeline can be executed from a Python command line. The data
source must be in EMD format. The execution is driven using a state file containing
the operator pipeline. To install the command line package run the following:

```bash
pip install  <tomviz_repo_directory>/tomviz/python/

```
Then to execute the operator pipeline run the following command:

```
tomviz-pipeline -s <path_to_state_file> -o <path_to_write_output_emd>
```
The input data source in the state file can be overridden by providing a path to
a different EMD file using the -d option.

Current restrictions/issues:

- EMD data source only.
- Spacing and units are copied from input data source.
- No support for child data.

### Custom Operators

Tomviz comes with a number of operators, many of which are developed in Python.
We welcome contributions to the code base, but sometimes it is preferable to
add local operators. On startup the application looks for a `tomviz` directory
as a folder in your home directory, if found that directory is scanned for
operators. These will be added to the <code>Custom Transforms</code> menu, and will look just like builtin operators (empty menu shown below with option to import).

![Custom transforms menu](img/custom_transforms.png)

The default name will match that of the Python file, i.e. `my_thing.py` would
be added as `my_thing` to the menu. You should only import a transform once,
all this really does is add the Python file to the `tomviz` directory in your
home directory, i.e. `~/tomviz/my_thing.py`. When developing a custom transform
it is preferable to simply copy your code to that directory, and edit it in
place. You will need to close and reopen Tomviz in order to see new changes.

If you add a JSON file with the same name you can customize the appearance
further, and even add some input interface.

``` json
{
  "name" : "Custom Thing",
  "label" : "Operate on data",
  "description" : "Apply my special operation to the data...",
}
```

## Import operators

After creating a custom operator, it can be added via importing custom transforms, which can be easily accessed through ```Custom Transform``` menu, as shown below.

![Custom Transforms](img/custom_transforms.png)

Besides importing them in Tomviz application, users can also copy the suitable Python or JSON scripts into ```~/tomviz``` or ```~/.tomviz``` directory.

## Apply operators

After importing or copying the customer operator ```test```, it will show up in the ```Custom Transform``` menu.

![Custom Transforms](img/custom_transforms_test.png)

```test``` can be applied just as normally as other built-in operators. After loading the example dataset, click on ```test```, the result will be displayed in ```RenderView1``` if everything goes well.
![Custom Transforms](img/custom_transforms_applied.png)

### User Input for Operators

After creating a custom operator, the next question is how to modify various user inputs; for example, the chunk size in the ```test``` operator of the previous section. The good news is that users don't have to edit the code every time. On the other hand, JSON scripts can be used for increased control, as shown below.
```JSON
{
  "name": "Fancy Square Root",
  "label": "Classy Square Root",
  "description": "This is the fanciest square root operator, it does it all...",
  "parameters": [
    {
      "name": "number_of_chunks",
      "label": "Number of Chunks",
      "type": "int",
      "default": 10,
      "minimum": 1,
      "maximum": 1000
    }
  ]
}
```

Now that you can import ```Classy Square Root``` in Tomviz

![Custom Transforms](img/custom_transforms_fancier.png)

A user interface which takes user inputs for the operator will pop up. In our case the only user input is ```Number of Chunks```, with default value being 10.

![Custom Transforms](img/custom_transforms_fancier2.png)

Click on ```Apply``` when ready. Result will be displayed as usual in the ```RenderView1```.

![Custom Transforms](img/custom_transforms_fancier3.png)
