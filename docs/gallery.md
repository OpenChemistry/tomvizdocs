# Gallery

Renderings made in Tomviz 3.1 with `File` -> `Export Screenshot`. Each
caption links to the page that shows how.

## X-ray fluorescence and ptychography

![XRF reconstruction of an integrated circuit (left) beside the ptychographic phase reconstruction of the same sample (right)](img/gallery/chip_xrf_ptycho.png)

An integrated circuit measured at NSLS-II: the copper fluorescence
reconstructed from a PyXRF tilt series (left) and the ptychographic phase from
the same camera position (right), both with the `Full` lighting preset. See
the [PyXRF](sources_pyxrf.md) and [Ptycho](sources_ptycho.md) sources.

## Several volumes in one view

![The tungsten layer (blue) and copper wiring layers (magenta) of the integrated circuit, rendered as two volumes in one view](img/gallery/chip_multi_volume.png)

Two element maps from the same XRF reconstruction: the tungsten layer (blue)
and the copper wiring layers (magenta), each with its own color map and
opacity. See
[Several volumes in one view](visualization.md#several-volumes-in-one-view).

## Cut-out view

![A nanoparticle with one corner cut away to show its interior](img/gallery/cut_out.png)

A PtCu nanoparticle with one corner cut out, rendered with Viridis and the
`Full` lighting preset. See [Cut-out views](visualization.md#cut-out-views).

## Exploded view

![The same nanoparticle split into slabs and pulled apart](img/gallery/exploded_view.png)

The same nanoparticle split into slabs along one axis and pulled apart. See
[Exploded view](visualization.md#exploded-view).

## Lighting presets

![The star-shaped nanoparticle with the Flat (left) and Full (right) lighting presets](img/gallery/star_lighting_compare.png)

The star nanoparticle from the installers with the `Flat` (left) and `Full`
(right) lighting presets. See
[Lighting presets](visualization.md#lighting-presets).

## Label maps

![Surfaces of 140 segmented nanoparticles, each in its own color](img/gallery/label_map.png)

Nanoparticles segmented with `Segment Particles` and `Connected Components`,
shown as 140 smoothed surfaces with the `Label Map` visualization. See
[Label Map](visualization.md#label-map).

## Fourier-space filtering

![A nanoparticle lattice before (left) and after (right) Fourier Peak Mask](img/gallery/fourier_peak_mask.png)

A gold nanoparticle superlattice as reconstructed (left), and after
`Fourier Peak Mask` keeps only its Bragg peaks (right). See
[Fourier-Space Filtering](analysis.md#fourier-space-filtering).

:::{note}
This dataset is an X-ray ptychographic tomography reconstruction of a
DNA-assembled FCC superlattice of 20 nm gold nanoparticles, recorded at
NSLS-II. It comes from A. Michelson, B. Minevich, H. Emamy, X. Huang,
Y. S. Chu, H. Yan and O. Gang, "Three-dimensional visualization of
nanoparticle lattices and multimaterial frameworks", *Science* **376**,
203-207 (2022),
[doi:10.1126/science.abk0463](https://doi.org/10.1126/science.abk0463). It is
shown with the authors' permission; please cite that paper for any use of the
data.
:::

## SAM 3 segmentation

![SAM 3 instance segmentation of the integrated circuit, each feature in its own color](img/gallery/sam3_segmentation.png)

SAM 3 instance segmentation of the integrated circuit's ptychographic
reconstruction, produced at NSLS-II with SAM 3, a fine-tuned checkpoint and
the text prompt "IC feature". See
[SAM 3 Segmentation](ml_segmentation.md#sam-3-segmentation-3d).
