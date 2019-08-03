
(function($) {
	/**
	 * jQuery Dynamic Breadcrumb Plugin.
	 * 
	 * Copyright 2015, HBT GmbH
	 * 
	 * Simple plugin for generating a dynamic breadcrumb with sub menus. Depends on the jQuery Viewport plugin (http://www.appelsiini.net/projects/viewport) and jQuery 2.1.4.
	 * 
	 * Call initBreadcrumb on a container like div or nav, then use the added refresh() function to refresh the breadcrumb, e.g.:
	 * 
	 * var breadcrumb = $('#breadcrumb').initBreadcrumb();
	 * $(window).scroll(breadcrumb.refresh);
	 * 
	 * Breadcrum levels must contain an identifying class:
	 * 
	 * <div id="id1" class="bcLevel1">
	 *   <h2></h2>
	 *   <article id="id2" class="bcLevel2">
	 *     <h3></h3>
	 *     <section id="id3" class="bcLevel3"><h4></h4></section>
	 *     <section id="id4 class="bcLevel3"><h4></h4></section>
	 *   </article>
	 *   </article id="id5" class="bcLevel2">...</article>
	 *   ...
	 * </div>
	 */
	$.fn.initBreadcrumb = function(options) {
        var settings = $.extend({
            levels: 3,
            slideDuration: 200,
            levelClassPrefix: 'bcLevel'
        }, options);
        
        var breadcrumbContainer = $(this);
        
        var breadcrumbList = $('<ul><li><a href="#">Home</a></li></ul>').prependTo(breadcrumbContainer).addClass('breadcrumb');
        
        for (i = 0;i < settings.levels;i++) {
        	breadcrumbList.append('<li></li>');
        }
        
        breadcrumbContainer.refresh = function() {
        	var level = 0;
        	var currentContainer;
        	
        	for (i = settings.levels;i > 0;i--) {
        		if ($('.'+settings.levelClassPrefix+i+':in-viewport').length > 0) {
        			level = i;
        			currentContainer = $('.'+settings.levelClassPrefix+i+':in-viewport').first();
        			window.console.log('currentContainer:' + currentContainer.attr('id'));
        			break;
        		}
        	}
        	
        	if (level > 0) {
        		for (i = settings.levels;i > level;i--) {
        			breadcrumbList.find('> li:nth-child('+(i+1)+')').hide();
        		}
        		for (;level > 0;level--) {
        			var cssLevel = level + 1;
        			var childLi = breadcrumbList.find('> li:nth-child('+cssLevel+')').empty();
        			$('<a href="#'+currentContainer.attr('id')+'">'+currentContainer.find('h'+cssLevel).first().text()+'</a>').appendTo(childLi);
        			var siblings = currentContainer.siblings('.'+settings.levelClassPrefix+level);
        			if (siblings.length > 0) {
        				var subMenu = $('<ul>').appendTo($('<div>').appendTo(childLi));
        				siblings.each(function() {
        					subMenu.append('<li><a href="#' + $(this).attr('id') + '">' + $(this).find('h'+cssLevel).first().text() + '</a></li>');
        				});
        			}
        			
        			childLi.show();
        			currentContainer = currentContainer.parent();
        		}
        		breadcrumbContainer.slideDown(settings.slideDuration);
        	} else {
        		breadcrumbContainer.slideUp(settings.slideDuration);
        	}
        }
        
        return breadcrumbContainer;
	};
	
}(jQuery));
