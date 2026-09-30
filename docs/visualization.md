# Visualization

Tomviz draws its visualizations on the GPU, fed by the data pipeline. Loaded
data is shown as a volume rendering. When you apply a transform, the
visualizations move to its output.

To view the original data, select the source node and add visualizations to
it. Cloning data (`Data Transforms` -> `Data Management` -> `Clone`) creates a
new source node with a copy of the selected data.

Tomviz saves its state every five minutes, so your work can be recovered the
next time it starts if it crashes or the computer loses power. You can also
save the state yourself at any time. See [Data](data.md) for loading and
saving data and state.

## Techniques

```{raw} html
<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; margin-bottom: 1.5em;">
  <iframe src="https://drive.google.com/file/d/1FUg6hx2XG4exz5JMNDiI9Z7PQirvPR_Q/preview" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
</div>
```

The video covers lighting presets, cut-out and exploded views, region auto
contrast, opacity presets, linked slices in 2D, and several volumes in one
view.

Most techniques run on the GPU. Use a graphics card with at least 2 GB of
memory, and ideally 16 GB of system memory. Larger volumes need more; see
[Data](data.md) for typical data sizes.

## Visualizations

![Visualization toolbar](img/viz_modules.png)

Add visualizations from the `Visualization` menu or the toolbar.

![Visualization menu](img/viz_menu.png)

### Views of loaded data

Newly loaded data is shown as a volume rendering with the default `Plasma`
color map. The histogram and opacity function are at the top right.

![Default view of the data](img/default_view.png)

### Palette and background colors

The palette button in the toolbar picks the background colors from a list of
presets. `Make Current Palette Default` keeps the current one for later
sessions.

![Visualization menu](img/palette.png)

A black background suits monitors and many presentations; white is often
better for print and web pages.

### Color maps

Besides the default `Plasma`, Tomviz has many other color maps. You can
invert a color map, and save your own as a preset.

![Color maps](img/colormaps.png)

Here is the same view with `Viridis`. Different data can benefit from
different color maps.

![Color maps](img/colormap2.png)

### Contour

The `Contour` visualization draws the surface at one isovalue, set with the
`Value` slider in the properties panel. Below are contours at three
isovalues, colored by the color map.

![Contour](img/contour.png)

![Contour](img/contour2.png)

![Contour](img/contour3.png)

The contour properties include `Mode` (Surface, Wireframe or Points), `Lighting`
controls (`Ambient`, `Diffuse`, `Specular`, `Sp. Power`), and the option to
use a `Separate Color Map`. If multiple scalars are available on the data, you can
select both the scalars to `Contour by` and the scalars to `Color by`.

![Contour Color By](img/contour_color_by.png)

### Slice

The `Slice` visualization shows a slice through the data, along the XY plane
by default. The properties panel sets the `Direction` (`XY Plane`,
`YZ Plane`, `XZ Plane` or `Custom`), `Slice Thickness`,
`Interpolate Texture`, and the point and normal of the plane.

![Orthogonal slice](img/orthogonal_slice.png)

Set the direction to `Custom` to slice at any angle; the `Point on Plane` and
`Plane Normal` fields then become editable. For a thick slice, `Aggregation`
(Minimum, Maximum, Mean or Summation) sets how the slices are combined.
`Opacity` makes the slice translucent.

![Slice](img/slice.png)

Tilt series open with a slice, for browsing the projection images.

#### Linking slices across datasets

Check `Link Slices` in two or more slice visualizations to move them
together. Changing the direction or slice in one changes the others, and
`Custom` planes are linked too. Turning the link on moves the other linked
views to match this one. While you drag a slider, the other views update
when you release it.

When both datasets have voxel sizes, linked slices match by physical
position, not by index.

The `Clip` visualization has the same option, `Link Clips`.

```{tip}
An axis-aligned plane only moves along its axis. Dragging its arrow (to
rotate) or its center sphere (to move freely) switches a slice or clip to
`Custom`.
```

```{tip}
To link the cameras too, right-click in a render view and choose
`Add Camera Link...`.
```

#### 2D image viewer

The `2D`/`3D` button in each render view's toolbar turns that view into a 2D
image viewer. It hides everything but slices, shows a slice of the selected
dataset (adding one if needed), and looks straight down it. The button shows
the current mode; click it again to restore the 3D view. Each view switches
on its own, so a split layout can show 2D next to 3D.

![Linked XRF and ptychography slices, each view in 2D](img/linked_slices_2d.png)

### Outline

The `Outline` visualization draws a box around the extent of the volume. Its
properties panel has `Show Axes`, `Show Grid` and `Custom Axes Titles`. Below,
all three are on.

![Outline](img/outline.png)

### Ruler

The `Ruler` measures distances in the scene. Drag its endpoints in the view,
or type their coordinates in the properties panel, which also shows the
length and the data value at each end. Hold `X`, `Y` or `Z` while dragging to
move only along that axis.

![Ruler](img/ruler.png)

### Threshold

The `Threshold` visualization shows all voxels between a minimum and a
maximum value. Its properties panel has `Minimum` and `Maximum` sliders,
`Representation` (Surface, Wireframe or Points), `Opacity` and
`Specular`. Like contours, thresholds support
`Threshold by` and `Color by` when multiple scalars are available.

![Threshold](img/threshold.png)

The two screenshots show two different ranges.

![Threshold](img/threshold2.png)

`Minimum` starts high, so only the brightest voxels show and the first render
is quick. Drag it down to show more. Each voxel in range is drawn as a cube,
so you see what `Binary Threshold` with the same values would segment.

### Label Map

```{raw} html
<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; margin-bottom: 1.5em;">
  <iframe src="https://drive.google.com/file/d/1AgzvmGFW2iVmYAMCmT4cCFZ5iVCY5ujU/preview" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
</div>
```

The `Label Map` visualization shows a segmentation, such as the output of
`Binary Threshold` or `Connected Components`, or any integer volume of
labels. Its values must span a range of at most 65,536.

The properties panel lists the labels with a checkbox to show or hide each
one. Double-click a label's color to change it. A
[Remove Labels](analysis.md#segmentation) transform starts with the labels you
hid. The [Animation Helper](animation.md#animation-helper) records them with
each viewpoint, so labels can appear one by one as the camera moves.

![Label Map properties with the background and labels 2 and 4 hidden, beside the surfaces of the rest](img/label_map_panel.png)

`Representation` chooses how the labels are drawn:

 * **Surface** (the default) draws one closed surface per label.
   `Smoothing` sets the number of iterations, 0 to 32; 0 shows the raw voxel
   faces. `Opacity` makes the surfaces translucent.
 * **Volume** uses the volume renderer, with its lighting, cut-out and
   exploded view controls. Use it for translucent overlays or for label maps
   too large to mesh.

### Clip

A `Clip` plane cuts away part of the other visualizations on the same data,
such as volumes, slices, contours, thresholds and label maps. It starts
axis-aligned. The properties panel sets the plane color, `Show Plane`,
`Show Arrow` (grayed out while the plane is hidden),
`Invert Plane Direction` (which side is clipped) and `Direction`.

![Inverted clip plane](img/inverted_clip_plane.png)

Set `Direction` to `Custom` to clip at any angle. Type the point on the
plane and the plane normal, or click `Set Normal to View` to align the plane
with the camera.

![Nonortho clip plane](img/nonortho_clip_plane.png)

Turn off `Show Plane` for a clearer view of the clipped data.

![Hidden clip planes](img/hidden_clip_planes.png)


## Color Bar and Opacity Editor

![Histogram Widget](img/histogram_widget.png)

The widget at the top right combines the color map, histogram and opacity
function. The color map mostly matters for [slices](#slice) and
[volume rendering](#volume-rendering); the opacity function mostly for volume
rendering.

The bar at the bottom is the color bar. Click it to add a node, drag a node to
move it, double-click a node to change its color, and press `Delete` to
remove it.

The line above is the opacity function. Click it to add a node, and press
`Delete` to remove one. Drag a node up (more opaque), down (less opaque), or
sideways to change the value it applies to.

### Color Space

The gear icon to the right of the histogram opens the color map settings,
where you can change the color space.

### Opacity Presets

The opacity icon on the right side of the histogram opens `Opacity Presets`,
which replaces the opacity curve with one of these shapes:

 * **Gaussian** - a bell centered on `Center` with `Width (sigma)`. It shows
   one intensity band.
 * **Linear** - a ramp from transparent to opaque, `Ramp Width` wide and
   centered on `Ramp Center`.
 * **Linear with cutoff** - transparent below `Cutoff`, then a ramp of
   `Ramp Width` up to opaque.

Changes apply as the sliders move, and you can still edit the curve in the
histogram afterwards. `Color map end follows the Gaussian` moves the color
map's upper end to three widths past the center. `Reset` restores the curve
from when the dialog opened.

![Opacity Presets with a Gaussian, and the volume rendered through it](img/opacity_presets.png)

### Brightness and Contrast

The grayscale icon to the right of the histogram opens the brightness and
contrast dialog, with `Minimum`, `Maximum`, `Brightness` and `Contrast`
controls. It is meant for grayscale color maps but works with any.

![Brightness and Contrast Editor](img/brightness_and_contrast_editor.png)

![Brightness and Contrast Original](img/brightness_and_contrast_original.png)

Brightness shifts the color bar left and right; contrast narrows or widens
it.

`Auto` fits the brightness and contrast to the data using histogram
thresholds. `Reset` restores the original values.

![Brightness and Contrast Auto](img/brightness_and_contrast_auto.png)

Each further press of `Auto` raises the threshold, which increases the
contrast.

`Auto (Selected Region)...` does the same over a box you choose. Drag the box
in the 3D view over the region you care about, then click `Apply`. Use it
when bright spots or empty space elsewhere throw off `Auto`. The dialog stays
open, so you can move the box and apply again.

![Auto contrast computed over the boxed region](img/auto_contrast_region.png)

## Volume Rendering

Tomviz uses VTK's GPU volume renderer, which uploads the volume to the GPU as
a 3D texture. With the default settings, color map and opacity, a volume looks
like this:

![Volume render default](img/volume_render.png)

### Color Map and Opacity

The [color map and opacity editor](#color-bar-and-opacity-editor) sets the
volume's colors and transparency. Below, an added opacity node at zero makes all values below about 10,000 fully
transparent. That removes most of the background values that dominate the
default image, which has just two nodes. Opacity is interpolated linearly
between nodes.

![Volume render opacity](img/volume_render2.png)

### Background color

The screenshots below show the same volume rendering with the black and
white [palettes](#palette-and-background-colors).

![Volume render black](img/volume_render_black.png)

![Volume render white](img/volume_render_white.png)

### Empty space and cropping

The outline shows the full extent of the volume. With suitable opacity, it
is clear that much of that space is empty.

![Volume render outline](img/volume_render_outline.png)

The `Crop` transform, in `Data Transforms` -> `Data Management`, crops the
volume numerically in its dialog or interactively in the 3D view.

![Crop menu location](img/volume_render_crop_menu.png)

Type the start and end of the region in the dialog, or drag the spherical
handles on the 3D box to move its faces in or out.

![Crop dialog with 3D box](img/volume_render_crop1.png)

![Adjusting the crop interactively](img/volume_render_crop2.png)

Click `OK` to crop, `Apply` to preview the result with the dialog still
open, or `Cancel` to discard the changes.

![Volume after cropping](img/volume_render_crop3.png)

#### Cylindrical Crop

`Cylindrical Crop`, in the same menu, crops the volume to a cylinder along
any axis. See [Cylindrical Crop](operators_catalog.md#cylindrical-crop) in the
operator catalog.

### Lighting presets

The `Lighting` group in the volume's properties panel has five presets:

 * `Flat` - unlit; colors come straight from the color map.
 * `Simple` - directional shading. New volumes start here.
 * `Gentle` - matte, low-contrast shading that keeps noise from sparkling.
 * `Soft` and `Full` - add volumetric shadows (short-range or long-range).
   They are slower.

On lower-end hardware, shadows can take long enough for the driver to reset
the GPU, which closes Tomviz, so turning them on shows a warning first. The
`Advanced` expander holds the individual controls: `Shading`, `Ambient`,
`Diffuse`, `Specular`, `Sp. Power`, the `Shadows` switch with
`Shadow Strength`, `Shadow Reach` and `Anisotropy`, and `Smooth Normals`.

To save your own preset, adjust the controls, click `Save...` next to the
`Saved presets...` list above the preset buttons, and give it a name. Saved
presets are available for any volume in later sessions. `Rename...` and
`Delete` act on the selected one.

![The Lighting group with a saved preset and Advanced expanded](img/volume_lighting_presets.png)

### Cut-out views

To see inside a volume without changing the data, check the `Cut Out` group
below `Lighting` in the volume's properties panel. It hides one corner of the
volume. `Corner` picks which one (for example `+X +Y +Z`). The `X`, `Y` and
`Z` sliders place the cut as a fraction of the volume's extent. Uncheck the
group to restore the full volume.

To clear a box in the data itself, use the `Clear Subvolume` transform
(`Data Transforms` -> `Volume Manipulation`).

![Cut-out view of a nanoparticle volume](img/cut_out.png)

```{note}
Cut-out, like clipping, has no effect on volumes larger than the GPU's 3D
texture size limit. Tomviz logs a warning when this happens. Crop or
subsample the volume to bring it under the limit.
```

### Exploded view

Check the `Exploded View` group below `Cut Out` to split the volume into
`Slabs` (2 to 16) along `Axis`, pulled apart by `Gap` (a fraction of the
volume's length). The data is not changed.

With `Axis` set to `Custom`, type a direction in `Direction`, or check
`Show Arrow` and drag the arrow's tip. `Offset` shifts every cut along the
direction by a number of voxels.

The exploded view and the cut-out cannot both be on, and volumetric shadows
are off while the exploded view is on. It is not available for volumes too
large for one GPU texture, or with several volumes in one view.

![Exploded view: seven slabs along Z with a gap of 0.3](img/exploded_view.png)

![Exploded view cut along a custom direction, with its arrow](img/exploded_view_custom.png)

### Several volumes in one view

When two or more volumes are shown in the same view, Tomviz renders them
together so overlapping volumes blend correctly. Color map, opacity,
interpolation and solidity stay per volume.

Blending is always `Composite` with ray jittering, and a clip plane on any
volume clips them all. Lighting is set on the first volume shown. Cut-out,
exploded view and volumetric shadows are unavailable until only one volume
is shown.

![Two volumes rendered together; the second one's panel shows the shared lighting](img/multi_volume.png)

### Rendering Properties

Select the volume visualization in the pipeline to see its properties. Here
is the panel with the defaults:

![Volume render properties](img/volume_props.png)

The panel has `Active Scalars` (which scalar array to render), `Separate Color Map`, `Interpolation` (Nearest Neighbor or
Linear), `Blending Mode` (Composite, Max, Min, Average, Additive), a
`Solidity` slider, `Ray jittering` toggle, `Lighting` controls, and the
[`Cut Out`](#cut-out-views) and [`Exploded View`](#exploded-view) groups.

The screenshots below change only the volume properties (see also
[Lighting presets](#lighting-presets)). The defaults, with
the `Simple` lighting preset, look like this:

![Volume render default](img/volume_default.png)

`Ray jittering` removes what can look like a wood grain pattern.

The `Full` lighting preset adds volumetric shadows for more depth. It needs
enough opacity for the shadows to form.

![Volume render with the Full lighting preset](img/volume_lighting.png)

The `Max` blending mode (`Composite` is default) shows the core of the
structure, with high intensities that `Composite` hides.

![Volume render max intensity](img/volume_max.png)

## Exporting Visualizations

Tomviz can export the render view as an image. For movies, see
[Animation](animation.md).

### Export screenshot

`File` -> `Export Screenshot...` sets the image resolution and color palette.
A transparent background works well in presentations.

![Screenshot](img/export_screenshot.png)

## Plot Visualization

```{raw} html
<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; margin-bottom: 1.5em;">
  <iframe src="https://drive.google.com/file/d/1EVoWTAiN61pKwAJdNu0_9D_KGCkE1e1s/preview" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
</div>
```

The `Plot` visualization draws interactive line charts, in their own plot
view, from the table output of transforms such as
[Power Spectrum Density](analysis.md#power-spectrum-density-psd) and
[Fourier Shell Correlation](analysis.md#fourier-shell-correlation-fsc).

![Plot Line Chart](img/plot_module_line_chart.png)

### Adding a Plot Visualization

Select a node with table output in the pipeline and click the `Plot` button
in the visualization toolbar. The plot is linked to that node's table output
port.

### Plot Options

`X Log Scale` and `Y Log Scale` put each axis on a log scale. `X Label` and
`Y Label` start with the axis names the transform gave and can be edited.

### Plot Colors

Each series gets its own color, with hues spread apart so that many series
stay distinguishable.

### Exporting Plot Data

To export a table as CSV, right-click the transform in the pipeline and
choose `Save Data`.

