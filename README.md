![Tomviz][tomviz_logo]

This repository hosts [Tomviz][tomviz] documentation using the [MkDocs][mkdocs]
package. It can be built locally, and it is also hosted on [readthedocs][rtd].
If you want to contribute please fork the repository, create a feature branch
and create a pull request.

Building Locally
----------------

First clone the repository, and then get your environment set up.

    git clone git://github.com/openchemistry/tomvizdocs
    cd tomvizdocs

We are assuming you are using Python 3, and want to create a virtual
environment to develop the documentation locally. This can be done with as so:

    mkvirtualenv tomvizdocs
    pip install -r docs/requirements.txt
    mkdocs serve -a localhost:8089

This will set up a local server on port 8089 which you can view in your
preferred browser.

![Kitware, Inc.][KitwareLogo]

  [tomviz]: https://tomviz.org/ "The Tomviz project"
  [tomviz_logo]: https://github.com/OpenChemistry/tomviz/blob/master/tomviz/icons/tomvizfull.png "Tomviz"
  [KitwareLogo]: http://www.kitware.com/img/small_logo_over.png "Kitware"
  [mkdocs]: https://www.mkdocs.org/
  [rtd]: https://tomviz.readthedocs.io/