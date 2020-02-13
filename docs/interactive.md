# Interactive Python Console

Tomviz provides a Python console and interactive API that can be used to build up
and interact with pipelines from within Python. The Python console can be enabled
using the View menu.


# Loading a state file

```python
>>> from tomviz import state
>>> state.load('test.tvsm')
>>>
```

# Executing the pipeline

```python
>>> from tomviz import state
>>> state.load('test.tvsm')
>>> state.pipelines[0].execute()
>>>
```

# Creating a data source

```python
>>> from tomviz import state
>>> ds = state.DataSource(
            fileNames=['SMALL_PtCu_NanoParticle.tif']
    )
>>> p = state.Pipeline(ds)
>>> state.pipelines.append(p)
>>>
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
>>>
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
>>>
```

# Taking a screen shot

```python
>>> from tomviz import state
>>> state.load('test.tvsm')
>>> state.pipelines[0].execute()
>>> from tomviz.views import active_view
>>> view = active_view()
>>> view.save_screenshot('screen.png')
```

## Controlling output image

The `palette`, `width` and `height` keyword arguments can be using to control the
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
>>>
```


