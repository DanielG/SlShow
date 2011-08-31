SlShow
======

Clientside only HTML/JavaScript slideshow. Because I was too fucking lazy to
install a serverside slideshow thingy.

Installation
------------

scp slshow.html slshow.js you@example.org:/var/www/yoursite/images/

Done.

Your server has to have indexing enabled in that directory tough. SlShow will
try to fetch the index.html file on the clientside and find all the image files
in that directory using a regular expression.
