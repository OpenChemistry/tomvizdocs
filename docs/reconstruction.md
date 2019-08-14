Tomographic reconstruction transforms a tilt series into a reconstructed volume.
It is the most computationally intensive step step. We recommended that you save
your work often, and consider downsampling the dataset in order to preview
results rapidly.

A number of reconstruction techniques are available in Tomviz:

 * Simple back projection (C++)
 * Weighted back projection
 * Direct Fourier
 * Constraint-based Direct Fourier
 * Algebraic Reconstruction Technique (ART)
 * Simultaneous Iterative Reconstruction Technique (SIRT)
 * TV minimization method
 
Most of the reconstruction techniques have been developed in Python, with the
simple back projection being the exception (developed in C++ for rapid
feedback). They serve as a good starting point to develop new algorithms, or
inspect the implementation of the reconstruction techniques.

### Pre-reconstruction pipeline

The pipeline shown below is typical of a pre-reconstruction pipeline. This
includes a number of steps discussed in the [alignment section](alignment.md).

![Pipeline before reconstruction](img/reco_pre_pipeline.png)

### Reconstruction menu

The reconstruction techniques are in the `Tomography` menu, the menu is shown
below:

![Reconstruction menu](img/reco_menu.png)

### Weighted back projection

A simple and relatively fast reconstruction technique is the weighted back
projection technique. It has a number of parameters that can be specified, along
with the number of updates during reconstruction if you would like to preview
the reconstruction as it proceeds. Once ready to run click on `OK`.

![Weighted back projection](img/weighted_back_proj.png)

A typical reconstruction of the sample tilt series is shown below, it should be
noted that this data was not aligned and distortions are apparent in the
resulting volume.

![Weighted back projection](img/weighted_back_proj2.png)

### Save the reconstruction data

The reconstructed data is shown as a child dataset of the loaded tilt series. In
order to save the result highlight the `Reconstruction` object in the pipeline,
click on `Save Data` in the `File` menu as shown below.

![Save data](img/tomviz_save_data.png)

### Advanced reconstruction techniques

As already mentioned most of the reconstruction techniques are developed in
Python. You can inspect the code in the application, and modify the approach if
needed to improve your results. Any custom Python code will be saved in a state
file. Tomviz offers a number of ready to use algorithms, and is designed so that
you can add more. Experiment in the local application and consider contributing
new algorithms to our codebase.
