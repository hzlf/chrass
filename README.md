chrass
======

Change Log
----------
## Version 0.3.1
Fixed a bug when a style contains a quote ("). The quote would throw the JSON
object created to contain the stylesheets descriptor.

Also added better error handling and incorporated suggestions provided by
JSLint.

## Version 0.3
This release makes the sidebar to display the sass debug information when an
item using sass is selected.

The displayed data is synthesized from the filename and the matching
line number. Only the actual file name is displayed though the sass data
includes the full path.

![Screenshot](https://github.com/hzlf/chrass/raw/master/docs/version0_3.png)

** Note: ** Due to the security restrictions on Chrome the extension will work
only on html files served remotely. This is the same issue that affects Firebug
lite described ![here](http://getfirebug.com/wiki/index.php/Firebug_Lite_FAQ#It_doesn.27t_work_on_local_pages)

## Version 0.2
This release provides a sidebar that interacts with the elements tree.

If the page has sass debug info, a sidebar in the developer tools will appear.
The elements tree is scanned and if the user selects an element with sass data
it will show the filename and line number for that element.

This is shown in the screenshot below

![Screenshot](https://github.com/hzlf/chrass/raw/master/docs/version0_2.png)

Support is still fairly limited but should be able to detect the basic case of an element with a sass class.

Note that the file address are stored as absolute paths by sass.

## Version 0.1
This is the initial release. The extension works when the developer tools are opened. It reads the page, searches for stylesheets and tries to determine if the css contains sass debug info.

If the stylesheets are generated with sass a static page is added to the Saas sidebar. The sidebar only exist if pages have the sass debug info.

For a test page go to http://ketalo.com/chromesass/test.html
