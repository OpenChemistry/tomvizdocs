# Interactive Python Console

Tomviz provides a Python console that can be used to interact with the
application programmatically. The Python console can be enabled from the
`View` menu (or it may already be visible as a tab at the bottom of the
window).

```{note}
The interactive Python API is undergoing changes for the Tomviz 3.0 pipeline
model. The examples below reflect the current state of the API, which may
continue to evolve. The legacy API shown here is still functional.
```

## Loading a state file

```python
>>> from tomviz import state
>>> state.load('test.tvsm')
```

## Executing the pipeline

```python
>>> from tomviz import state
>>> state.load('test.tvsm')
>>> state.pipelines[0].execute()
```

## Creating a data source

```python
>>> from tomviz import state
>>> ds = state.DataSource(
            fileNames=['SMALL_PtCu_NanoParticle.tif']
    )
>>> p = state.Pipeline(ds)
>>> state.pipelines.append(p)
```

## Adding a transform

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

## Adding a Visualization

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

## Accessing views

Access the active view:

```python
>>> from tomviz import state
>>> active = state.active_view
```

Get a list of all views:

```python
>>> from tomviz import state
>>> views = state.views
```

## Controlling the camera

A view has a camera associated with it:

```python
>>> from tomviz import state
>>> active = state.active_view
>>> camera = active.camera
```

The camera has the following methods:

 * `dolly(value)` - Divide the camera's distance from the focal point by the
   given dolly value.
 * `azimuth(angle)` - Rotate the camera about the view up vector centered at
   the focal point.
 * `yaw(angle)` - Rotate the focal point about the view up vector, using the
   camera's position as center.
 * `elevation(angle)` - Rotate the camera about the cross product of the
   negative direction of projection and view up vector.
 * `pitch(angle)` - Rotate the focal point about the cross product of the
   view up vector and direction of projection.

The camera has the following properties:

 * `roll` - Rotate the camera about the direction of projection.
 * `position` - Camera position in world coordinates.
 * `focal_point` - Camera focal point in world coordinates.
 * `view_up` - View up direction.
 * `distance` - Distance from camera to focal point.
 * `zoom` - Zoom factor (>1 zoom in, <1 zoom out).

Example of rolling the camera:

```python
>>> from tomviz import state
>>> active = state.active_view
>>> active.camera.roll = 45
```

## Taking a screenshot

```python
>>> from tomviz import state
>>> state.load('test.tvsm')
>>> state.pipelines[0].execute()
>>> view = state.active_view
>>> view.save_screenshot('screen.png')
```

### Controlling output image

The `palette` and `resolution` keyword arguments control the output image.
The `palette` argument takes a value from the `Palette` enum:

```python
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

Example with transparent background:

```python
>>> from tomviz import views
>>> view = views.active_view
>>> view.save_screenshot('screen.png',
                         palette=views.Palette.TransparentBackground)
```

## Dataset API

The `Dataset` object used in Python transforms exposes these properties:

 * `active_scalars` - Get/set the active scalar array (NumPy ndarray)
 * `active_name` - Get/set the name of the active scalar
 * `num_scalars` - Number of scalar arrays
 * `scalars_names` - List of all scalar array names
 * `scalars(name)` - Get a scalar array by name
 * `set_scalars(name, array)` - Add or update a scalar array
 * `remove_scalars(name)` - Remove a scalar array
 * `spacing` - Voxel spacing (x, y, z) tuple
 * `tilt_angles` - NumPy array of tilt angles
 * `tilt_axis` - Axis index for tilting
 * `scan_ids` - NumPy array of scan IDs
 * `dark` / `white` - Calibration data
 * `metadata` - Arbitrary metadata dictionary
 * `empty_copy()` - New dataset with same geometry, no arrays
