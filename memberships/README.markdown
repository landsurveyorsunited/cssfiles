# CSS only horizontal scrolling 

A Pen created on CodePen.io. Original URL: [https://codepen.io/JFarrow/pen/xxRdgGm](https://codepen.io/JFarrow/pen/xxRdgGm).

With a little js for layout. 
Tested and works in Firefox, Chrome & Opera (versions which support transform).
This is just experimentation, I wouldn't recommend using this in production.
Check the full page to see it work properly. For some reason it's not displaying as expected in editor mode.

Bugs and limitations:

* At narrow window width, the .container element strays to the right and I'm not sure why.

* Internet Explorer ~9 does not render the page properly. You cant even scroll vertically.

* Not entirely accessible friendly since you've to use up/down keys instead of left/right to scroll via keyboard.

As for the content boxes inside the rotated container, they are flipped 90 degrees to set them straight. But keep in mind that their height controls the overall horizontal rhythm but I'm sure it can be rectified with a little help from js (more or less a modified version of the script used currently).
