# jquery-dynamicbreadcrumb

Simple plugin for generating a dynamic breadcrumb with sub menus. Depends on the jQuery Viewport plugin (http://www.appelsiini.net/projects/viewport).

**This is a migration from a 2015 blog article that was not updated to or tested with current jQuery version. Depends on jQuery 2.1.4!**

Call initBreadcrumb on a container like div or nav, then use the added `refresh()` function to refresh the breadcrumb, e.g.:

    var breadcrumb = $('#breadcrumb').initBreadcrumb();
    $(window).scroll(breadcrumb.refresh);

Breadcrum levels must contain an identifying class:

    <div id="id1" class="bcLevel1">
    <h2></h2>
    <article id="id2" class="bcLevel2">
    <h3></h3>
    <section id="id3" class="bcLevel3"><h4></h4></section>
    <section id="id4 class="bcLevel3"><h4></h4></section>
    </article>
    </article id="id5" class="bcLevel2">...</article>
    ...
    </div>
