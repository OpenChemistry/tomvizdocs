# Visualization

Tomviz provides a hardware accelerated visualization engine connected to a data
pipeline. Upon loading data a default view will be shown of the data (a slice
and an outline). Once operations are applied to the data these will move to the
output of the pipeline automatically.

It is possible to visualize the original data by selecting the root (usually
denoted by the name of the file loaded) and adding the desired visualization
modules to it. Data can be cloned, which will create a new root with a copy of
the selected data.

Tomviz saves its state every five minute which can be recovered when Tomviz next
starts should the application crash or the computer have power issues. You can
also save the application state by taking a snapshot of the pipeline at a given
moment, note that saving state does not save data. See the
[data section](data.md) for more details on loading/saving data and/or state.

![Start and end of Tomviz pipeline](img/tomviz_start_end_pipeline.png)

The screenshot above shows data as loaded on the left, and then a cropped view
of a single nanoparticle on the right. Note the two volume modules in the
pipeline placed on the original data and the output data.

## Techniques

In this section, we will go over some available techniques and explain the
important parameters. Most of the techniques are GPU accelerated, which requires
a good graphics card that has at least 2GB memory, and ideally 16GB of system
memory. Larger volumes will require more data, see [data section](data.md) for
some discussion of typical data sizes.

## Modules

![Visualization modules](img/viz_modules.png)

Visualization modules are implemented in C++ using GLSL to take full advantage
of hardware acceleration. These modules are available from the visualization
menu and operate on the volumes loaded/processed in the application. The toolbar
is shown above, with the `Visualization` menu shown below, note the identical
icons with brief descriptions in the menu.

![Visualization menu](img/viz_menu.png)

### Views of loaded data

When Tomviz opens data it has a number of defaults. The screenshot below shows
a typical view of a volume loaded, with a slice through the center of the data,
an outline showing the total size of the volume, and the default `Plasma` color
map. Histogram is calculated in the background thread and then displayed when
ready in the top-right.

![Default view of the data](img/default_view.png)

### Palette and background colors

The color palette can be modified using the button shown, and has several
useful presets. The default palette can also be changed if preferred.

![Visualization menu](img/palette.png)

The black background is recommended when displaying on monitors, or in some
presentations, white is often better for print, web pages and etc.

### Color maps

`Plasma` is the default color map, but the application contains a number of
alternative color maps that can be used. You can invert the color maps, and also
create custom color maps that can be saved for future use.

![Color maps](img/colormaps.png)

Selecting `Viridis` will result in the view being modified as shown, different
data can benefit from some of the alternate color maps.

![Color maps](img/colormap2.png)

### Contour

A contour along a single isovalue can be displayed in the application by double
clicking on the histogram at the desired value, or by adding a contour module.
The module properties has a slider where the value can be specified, a few
example contours are shown below at different isovalues. Note how the color is
set by the color map.

![Contour](img/contour.png)

![Contour](img/contour2.png)

![Contour](img/contour3.png)

### Slice

Slices through the data can be added with the `Slice` module. The default is to
show an orthogonal slice such as that shown below.

![Orthogonal slice](img/orthogonal_slice.png)

You can set the direction to `Custom` in order to slice through at any angle.

![Slice](img/slice.png)

### Outline

The outline module principally shows the extents of the volume, and can be
useful to see how far the volume extends. There are a few other options
available in the module properties. Clicking on `Show Axes` will show the axes,
and clicking on `Show Grid` will add a grid as shown below.

![Outline](img/outline.png)

### Ruler

Rulers can be used to measure distances in the scene. The start and end point
can be selected interactively, and the length is displayed.

![Outline](img/ruler.png)

### Threshold

The `Threshold` module will display all voxels between the specified minimum and
maximum values. The bounds are specified in the properties panel for the module.

![Threshold](img/threshold.png)

The two screenshots show two distinct ranges as selected in the properties
panel shown.

![Threshold](img/threshold2.png)

### Clip

Clipping planes can be added to the data in order to clip any applied `Slice`,
`Volume`, or `Contour` modules. The default is an orthogonal plane, but the its
direction can be changed and the plane can be inverted to allow for clipping
from all directions.

![Inverted clip plane](img/inverted_clip_plane.png)

The direction can be set to `Custom` to clip at any angle, and the plane color
and opacity can also be changed to fit your needs.

![Nonortho clip plane](img/nonortho_clip_plane.png)

Planes and arrows can also be toggled off for clearer views of the clipped data.

![Hidden clip planes](img/hidden_clip_planes.png)


## Volume Rendering

Tomviz uses volume rendering provided by VTK that utilizes graphics processing
units (GPUs) to accelerate rendering and achieve maximum performance. It needs
to upload the volume as a 3D texture, and offers a number of rendering options
that will be described and demonstrated. The default settings of the volume
renderer with the default color map and opacity look like the image below.

![Volume render default](img/volume_render.png)

### Color Map and Opacity

The color map, histogram, opacity function combined widget in the top-right of
the application display is closely integrated with the volume renderer. The grey
circles along the rectangular color bar at the bottom can be double-clicked to
edit the color. The line at the top can be left-clicked to add new nodes to the
opacity function, which are colored magenta when active. They can be dragged up
(more opaque) and down (less opaque) and side-to-side to change the scalar
value to which they apply.

The screenshot below shows the impact on the volume renderer of adding an
additional node, and setting it to zero such that all values below about
10,000 are fully transparent. This tends to remove most of the "background"
values that dominate in the default image with just two nodes. The transparency
linearly interpolates between points

![Volume render opacity](img/volume_render2.png)

### Background color

The color palette can be manipulated by clicking on the artist palette icon in
the toolbar. The screenshots below show the white and black palettes and their
impact on the volume rendering without any other changes.

![Volume render black](img/volume_render_black.png)

![Volume render white](img/volume_render_white.png)

### Empty space and cropping

Making the outline module visible by adding it (or clicking on the eyeball) will
show the total extent of the volume. Once we have found suitable opacity points
it is clear that quite a bit of the space is empty.

![Volume render outline](img/volume_render_outline.png)

You can access the `Crop` operator from the `Data Transforms` menu, and
interactively crop the volume. This can be done numerically in the dialog or
interactively in the 3D view. The screenshot below shows an example of the crop
operator in action, this is a C++ operator developed to be highly interactive.

![Volume render crop](img/volume_render_crop_menu.png)

You can either type the desired extents into the dialog, or drag the spherical
handles to move the planes in or out.

![Volume render crop](img/volume_render_crop1.png)

![Volume render crop](img/volume_render_crop2.png)

When the desired values are set, click on `OK` to finish the cropping, you can
also click `Apply` to see the result but keep the dialog open to interactively
update the crop values until you are happy with them.

![Volume render crop](img/volume_render_crop3.png)

### Rendering Properties

The volume renderer properties are in the properties panel when the volume
module is selected in the pipeline browser. The panel is shown below with the
default options selected.

![Volume render properties](img/volume_props.png)

The following screenshots only modify the options in the volume renderer
properties panel. The default options produce the following result:

![Volume render default](img/volume_default.png)

Turning `Ray Jittering` off does not look very different with this dataset, but
in others the jittering can remove what looks like a wood grain pattern.

![Volume render no jitter](img/volume_no_jitter.png)

Turning lighting on can have quite a marked effecf, it adds shadows, highlights
and other related lighting benefits. It often needs enough opacity to be used
for the shadows and surface to offer the additional depth shown below.

![Volume render lighting](img/volume_lighting.png)

The `Max Intensity` blending mode (`Composite` is default) enables you to see
the core of the structure more easily. In this case there is a lot more high
intensity that is typically hidden. 

![Volume render max intensity](img/volume_max.png)

The 1D transfer function highlights surfaces using gradient opacity to modulate
the volume rendered image.

![Volume render 1D transfer](img/volume_1d_transfer.png)

The 2D transfer also highlights the surfaces/high rates of change but can offer
the ability to be more selective. The volume must be quite well behaved to
exhibit enough structure to be amenable to this approach.

![Volume render 2D transfer](img/volume_2d_transfer.png)

The 2D transfer function features a box using the main color map with its
opacity values, and that box can be moved around to select specific regions
of scalar value and gradient magnitude.

![Volume render 2D transfer](img/volume_2d_transfer2.png)

## Exporting Visualizations

Tomviz offers a number of options to export the visualizations created in the
application.

### Export screenshot

From the same `File` menu, you can choose `Export Screenshot`. The dialog lets
you specify the size of the image to export and supports most standard image
formats. You can override palette, the use of the transparent background can be
especially useful in presentations for example.

![Screenshot](img/export_screenshot.png)

### Export movie

The movie defaults to producing an orbit around the volume using the scene in
the current view. You can set the resolution before saving and the color
palette as above. It is `Export Movie` in the `File` menu, and supports a number
of common movie formats.

![Movie](img/save_movie.png)

### Export to web

The option to export to web is useful to go beyond a simple movie, and offer an
interactive element that can be shared in any modern web browser. By default
it generates images statically, and the HTML page can be opened in almost any
browser, with limited interactivity.

![Web](img/export_web.png)

It is usually better to use a geometry based export, but that requires a more
modern web browser that supports WebGL. You often need to downsample the data
in order to view it in a browser, and offer better interactivity. You can set
it to use an external data file that can be used in larger web pages, or an
integrated HTML page that can be emailed as a single object/hosted.

An example after successfully exporting the data to web may look like

![Web](img/export_web_eg.png)

### Export mesh for 3D printing

Contours of the data set with a specific value can be exported to an STL mesh
file by right-clicking on `Contour` inside the `Pipelines` browser as shown
below. You should choose `Export as Mesh` and choose where to save the mesh to.

![Export mesh from contour](img/export_mesh.png)

### Export image from slice

A similar capability is offered in the slice widget, where you can right-click
the `Slice` and select `Export as image` from the context menu. You can choose
where to save the image, and it will be exported as a flat image sharing the
dimensions of that slice through the volume in the case of orthogonal slices.

![Export mesh from slice](img/export_image.png)
