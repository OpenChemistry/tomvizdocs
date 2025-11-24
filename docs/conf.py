# Sphinx configuration for Tomviz Documentation

import os
import sys
sys.path.insert(0, os.path.abspath('..'))

# Project information
project = 'Tomviz Documentation'
copyright = 'Content is available under <a href="https://creativecommons.org/licenses/by/4.0/">CC-BY 4.0</a>'
author = 'Tomviz Team'

# Extensions
extensions = [
    'sphinx.ext.autodoc',
    'sphinx.ext.napoleon',
    'sphinx.ext.viewcode',
    'sphinx.ext.intersphinx',
    'sphinx.ext.autosummary',
    'myst_parser',
]

# MyST configuration
myst_heading_anchors = 6
suppress_warnings = ['myst.xref_missing']

# General settings
templates_path = ['_templates']
exclude_patterns = ['_build']
source_suffix = {'.rst': 'restructuredtext', '.md': 'markdown'}

# HTML output
html_theme = 'sphinx_rtd_theme'
html_static_path = ['_static', 'img']
html_css_files = ['extra.css']
html_js_files = ['sidebar.js']
html_logo = 'img/tomviz_logo.png'
html_favicon = 'img/tomviz_favicon.png'
html_show_sourcelink = False
html_show_sphinx = False

# RTD theme - keep navigation simple
html_theme_options = {
    'navigation_depth': 3,
    'collapse_navigation': True,
    'sticky_navigation': True,
    'titles_only': True,
}

# Autodoc - for API documentation
autodoc_typehints = 'description'
autodoc_member_order = 'bysource'

# Napoleon - NumPy-style docstrings
napoleon_numpy_docstring = True
napoleon_google_docstring = False

# Intersphinx - link to other docs
intersphinx_mapping = {
    'python': ('https://docs.python.org/3', None),
    'numpy': ('https://numpy.org/doc/stable/', None),
}

# Autosummary
autosummary_generate = True

# MyST Parser configuration
myst_enable_extensions = [
    "colon_fence",  # Enable ::: fences
    "deflist",      # Enable definition lists
]
