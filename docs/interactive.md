# Interactive Python Console

Tomviz provides a Python console and interactive API that can be used to build up
and interact with pipelines from within Python. The Python console can be enabled
using the View menu.


# Loading a state file

```python
>>> from tomviz import state
>>> state.load('test.tvsm')
```

# Executing the pipeline

```python
>>> from tomviz import state
>>> state.load('test.tvsm')
>>> state.pipelines[0].execute()
```

# Creating a data source

```python
>>> from tomviz import state
>>> ds = state.DataSource(
            fileNames=['SMALL_PtCu_NanoParticle.tif']
    )
>>> p = state.Pipeline(ds)
>>> state.pipelines.append(p)
```

# Adding an operator

```python
>>> from tomviz import state
>>> ds = state.DataSource(
        fileNames=['SMALL_PtCu_NanoParticle.tif']
    )
>>> p = state.Pipeline(ds)
>>> state.pipelines.append(p)
>>> from tomviz.operators import InvertData
>>> o = InvertData()
>>> p.dataSource.operators.append(o)
```

# Adding a Module

```python
>>> from tomviz import state
>>> ds = state.DataSource(
        fileNames=['SMALL_PtCu_NanoParticle.tif']
    )
>>> p = state.Pipeline(ds)
>>> state.pipelines.append(p)
>>> from tomviz.modules import Volume
>>> m = Volume()
>>> p.dataSource.modules.append(m)
```

# Accessing views

You can accessing the active view in the following way:

```python
>>> from tomviz import state
>>> active = state.active_view()
```

You can also get a list of all views in the following way:

```python
>>> from tomviz import state
>>> views = state.views()
```

# Controlling the camera

A view has a camera associate with it:

```python
>>> from tomviz import state
>>> active = state.active_view()
>>> camera = active.camera
```

The camera has the following methods:

`dolly(self, value)`  - Divide the camera's distance from the focal point by the given dolly `value`.

`azimuth(self, angle)` - Rotate the camera about the view up vector centered at the focal point.

`yaw(self, angle)` - Rotate the focal point about the view up vector, using the camera's position as the center of rotation.

`elevation(self, angle)` - Rotate the camera about the cross product of the negative of the direction of projection and the view up vector, using the focal point as the center of rotation.

`pitch(self, angle)` - Rotate the focal point about the cross product of the view up vector and the direction of projection, using the camera's position as the center of rotation.

The camera has the following properties:

`roll` - Rotate the camera about the direction of projection.

`position` - Set/Get the position of the camera in world coordinates.

`focal_point` - Set/Get the focal of the camera in world coordinates.

`view_up` - Set/Get the view up direction for the camera.

`distance` - Move the focal point so that it is the specified distance from the camera position

`zoom` - Decrease the view angle by the specified factor. A value greater than 1 is a zoom-in, a value less than 1 is a zoom-out.

Here is an example of rolling the camera in the active view.

```python
>>> from tomviz import state
>>> active = state.active_view()
>>> active.camera.roll = 45
```

# Taking a screen shot

```python
>>> from tomviz import state
>>> state.load('test.tvsm')
>>> state.pipelines[0].execute()
>>> view = state.active_view()
>>> view.save_screenshot('screen.png')
```

## Controlling output image

The `palette`, `resolution` keyword arguments can be using to control the
output image saved. The `palette` argument can take one of the values from the
following `Enum` controlling the image background, the default in `Current`,
which will use the current palette used by the Tomviz application.

``` python
class Palette(Enum):
    Current = ""
    TransparentBackground = "TransparentBackground"
    BlackBackground = "BlackBackground"
    DefaultBackground = "DefaultBackground"
    GradientBackground = "GradientBackground"
    GrayBackground = "GrayBackground"
    PrintBackground = "PrintBackground"
    WhiteBackground = "WhiteBackground"
```

So for example to save a screenshot with a transparent background the following
invocation would be used:

```python
>>>
>>> from tomviz import views
>>> view = views.active_view()
>>> view.save_screenshot('screen.png',
                         palette=views.Pallete.TransparentBackground)
```



