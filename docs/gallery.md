# Gallery

Renderings made in Tomviz 3.1, each exported with `File` >
`Export Screenshot`. The caption under each one links to the page that shows
how to make it.

## X-ray fluorescence and ptychography

![XRF reconstruction of an integrated circuit (left) beside the ptychographic phase reconstruction of the same sample (right)](img/gallery/chip_xrf_ptycho.png)

An integrated circuit sample measured at NSLS-II. Left, the copper
fluorescence reconstructed from a PyXRF tilt series; right, the phase from
ptychography of the same sample, shown with the same camera, where the finer
resolution of ptychography is plain. See the [PyXRF](sources_pyxrf.md) and
[Ptycho](sources_ptycho.md) sources.

## Several volumes in one view

![Copper and tungsten fluorescence of the integrated circuit rendered as two volumes in one view](img/gallery/chip_multi_volume.png)

Two element maps from the same XRF reconstruction, copper (magenta) and
tungsten (blue), each a volume with its own color map and opacity, rendered
together so they blend correctly where they overlap. See
[Several volumes in one view](visualization.md#several-volumes-in-one-view).

## Cut-out view

![A nanoparticle with one corner cut away to show its interior](img/gallery/cut_out.png)

A corner cut out of a PtCu nanoparticle to show its interior, with a
Viridis color map. See [Cut-out views](visualization.md#cut-out-views).

## Exploded view

![The same nanoparticle split into seven slabs pulled apart](img/gallery/exploded_view.png)

The same nanoparticle split into seven slabs along one axis and pulled apart,
so every layer can be seen at once. See
[Exploded view](visualization.md#exploded-view).

## Lighting presets

![The star-shaped nanoparticle with the Flat (left) and Full (right) lighting presets](img/gallery/star_lighting_compare.png)

The star-shaped nanoparticle that comes with the installers, rendered with
the `Flat` lighting preset (left) and the `Full` preset (right), which adds
shading and brings out the shape of each arm. See
[Rendering Properties](visualization.md#rendering-properties).

## Label maps

![Surfaces of 140 segmented nanoparticles, each in its own color](img/gallery/label_map.png)

Nanoparticles segmented with `Segment Particles` and
`Connected Components`, then shown with the `Label Map` visualization: 140
labels, each drawn as a smoothed surface in its own color. See
[Label Map](visualization.md#label-map).

## Fourier-space filtering

![A nanoparticle lattice before (left) and after (right) Fourier Peak Mask](img/gallery/fourier_peak_mask.png)

A superlattice of gold nanoparticles as reconstructed (left), and after
`Fourier Peak Mask` keeps only its Bragg peaks (right), which brings out the
periodic lattice. See
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

Instance segmentation of the integrated circuit's ptychographic
reconstruction by SAM 3 with the text prompt "IC feature", using a
fine-tuned checkpoint. See
[SAM 3 Segmentation](ml_segmentation.md#sam-3-segmentation-3d).
