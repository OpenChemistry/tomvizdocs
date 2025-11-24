# API Reference

This presents API intended to be accessed within Tomviz operator modules.

### Dataset

The Dataset class for managing volumetric and tilt series data. This
is always passed as the first argument within an operator's `transform()`
function.

```{eval-rst}
.. autoclass:: tomviz.dataset.Dataset
   :members:
   :undoc-members:
   :show-inheritance:
```

## Utils

Utility functions that may be used within operators.

```{eval-rst}
.. automodule:: tomviz.utils
   :members:
   :undoc-members:
   :show-inheritance:
```

## Operators

Operators for data transformation and processing.

```{eval-rst}
.. automodule:: tomviz.operators
   :members:
   :undoc-members:
   :show-inheritance:
```

```{eval-rst}
.. note::
   This API documentation is automatically generated from the source code docstrings.
```
