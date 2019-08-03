# jquery.autoTOC
Automagically create a Table of Contents on your page from the heading tags in your HTML document

## Usage
```
$(selector).autoTOC();
```

## Options
- toc: The ID or class of the element to which the table of contents will be appended

## Example
$("h1,h2").autoTOC({ 
	toc: "#toc"
});

Looks for all of the h1 and h2 heading tags in the document and uses them to dynamically create a table of contents that is written into the element with the ID of #toc.  As the user scrolls through the document, the entries in the table of contents will automatically highlight as the corresponding heading nears to the top of the screen.

Additionally, the document will smooth scroll to the position of the selected heading when the user clicks on a table of contents entry.

