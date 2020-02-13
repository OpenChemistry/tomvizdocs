# Interactive Python Console

Tomviz provides a Python console and interactive API that can be used to build up
and interact with pipelines from within Python. The Python console can be enabled
using the View menu.


# Loading a state file

```python
>>>
Python 3.7.5 (default, Nov 20 2019, 09:21:52)
[GCC 9.2.1 20191008] on linux
>>> from tomviz import state
>>> state.load('/home/cjh/tmp/test.tvsm')
>>>
```

# Executing the pipeline

```python
>>>
Python 3.7.5 (default, Nov 20 2019, 09:21:52)
[GCC 9.2.1 20191008] on linux
>>> from tomviz import state
>>> state.load('/home/cjh/tmp/test.tvsm')
>>> state.pipelines[0].execute()
>>>
```

# Creating a data source

```python
>>>
Python 3.7.5 (default, Nov 20 2019, 09:21:52)
[GCC 9.2.1 20191008] on linux
>>> from tomviz import state
>>> ds = state.DataSource(
            fileNames=['/home/cjh/data/TestData3D/SMALL_PtCu_NanoParticle.tif']
    )
>>> p = state.Pipeline(ds)
>>> state.pipelines.append(p)
>>>
```

# Adding an operator

```python
>>>
Python 3.7.5 (default, Nov 20 2019, 09:21:52)
[GCC 9.2.1 20191008] on linux
>>> from tomviz import state
>>> ds = state.DataSource(
        fileNames=['/home/cjh/data/TestData3D/SMALL_PtCu_NanoParticle.tif']
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
>>>
Python 3.7.5 (default, Nov 20 2019, 09:21:52)
[GCC 9.2.1 20191008] on linux
>>> from tomviz import state
>>> ds = state.DataSource(
        fileNames=['/home/cjh/data/TestData3D/SMALL_PtCu_NanoParticle.tif']
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
>>>
Python 3.7.5 (default, Nov 20 2019, 09:21:52)
[GCC 9.2.1 20191008] on linux
>>> from tomviz import state
>>> state.load('/home/cjh/tmp/test.tvsm')
>>> state.pipelines[0].execute()
>>> from tomviz.views import active_view
>>> view = active_view()
>>> view.save_screenshot('/tmp/screen.png')
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
>>> view.save_screenshot('/tmp/screen.png',
                         palette=views.Pallete.TransparentBackground)
>>>
```



