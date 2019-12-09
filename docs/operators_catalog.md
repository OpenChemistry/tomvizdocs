# Catalog

## Tortuosity

The `Tortuosity` operator calculates various quantities described in the paper by [Chen-Wiegart et al.](https://doi.org/10.1016/j.jpowsour.2013.10.026)

The operator can be found under the `Data Transform` menu.

### Parameters
- `phase (int)`: the scalar value in the dataset that is considered a pore
- `distance_method (enum`): the distance method to calculate distance between pore nodes. Options are: Eucledian, CityBlock, Chessboard.
- `propagation_direction (enum)`: the face of the volume from which distances are calculated. Options are X+, X-, Y+, Y-, Z+, Z-.
- `save_to_file (bool)`: save the detailed output of the operator to files. If set to True, propagate along all six directions and save the results, but only display results for one direction within the application.
- `output_folder (str)`: the path to the folder where the optional output files are written to

### Output
- Volumetric data: in the output volume are saved the distances between each pore voxel and the starting propagation face.
- Path length table: the average path length for a face vs the linear length
- Tortuosity table: 4 different tortuosity values calculated from the path length table.
- Tortuosity distribution table: the distribution of tortuosities for voxels in the last slice of the propagation
- If the `save_to_file` parameter is set to `True`, the quantities above will also be saved to disk inside `output_folder` for all the possible propagation directions. For each direction, the following files are created:
    - `distance_map_*.npy`
    - `path_length_*.csv`
    - `tortuosity_*.csv`
    - `tortuosity_distribution*.csv`


## Pore Size Distribution

The `Pore Size Distribution` operator calculates the continuous pore size distribution as described in the paper by [Münch and Holzer](https://doi.org/10.1111/j.1551-2916.2008.02736.x)

The operator can be found under the `Data Transform` menu.

### Parameters
- `threshold (int)`: scalars greater than `threshold` are considered matter. scalars less than `threshold` are considered pore.
- `radius_spacing (int)`: the pore size distribution is computer for all radii from 1 to `r_max`. Tweak the `radius_spacing` parameter to reduce the number of radii. For example, if `radius_spacing` is 3, only calculate distribution for `r_s = 1, 4, 7, ... , r_max`.
- `save_to_file (bool)`: save the detailed output of the operator to files.
- `output_folder (str)`: the path to the folder where the optional output files are written to

### Output
- Volumetric data: for each pore voxel, save distance from the closest matter voxel.
- Pore size distribution table: the fraction of the total volume that can be filled by spheres with the a certain radius
- If the `save_to_file` parameter is set to `True`, the quantities above will also be saved to disk inside `output_folder`. The following files are created:
    - `pore_size_distribution.csv`
