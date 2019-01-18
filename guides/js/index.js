jQuery(document).ready(function($) {

    //set up scroll to behavior for anchor links
    var scrollControl = {
        scrollElement : $('html, body'),
        anchorLink : $("a[href^='#']"),
        speed : 700,
        //move fluidly to the anchor selected
        moveTo : function(){
            this.anchorLink.click(function(event) {
                //act abnormal
                event.preventDefault();
                //cache and capture some things
                var target = this.hash,
                $target = $(target);
                //set up the actual animation
                scrollControl.scrollElement.stop().animate({
                    'scrollTop': $target.offset().top
                //when it's over, set the has for the url
                }, this.speed, 'swing', function() {
                    window.location.hash = target;
                });
            });
        },
        //stop all motion if the user interacts during motion
        stopMove : function(){
            this.scrollElement.bind('scroll mousedown wheel DOMMouseScroll mousewheel keyup', function(e){
                if ( e.which > 0 || e.type == 'mousedown' || e.type == 'mousewheel'){
                    scrollControl.scrollElement.stop();
                }
            });
        },
        //set everything up
        init : function(){
            this.moveTo();
            this.stopMove();
        }
    };
    //initialize anchor link behavior
    scrollControl.init();

    //set up the half-and-half page scrolling behavior
    var halfHalf = {
        //cache and initialize some variables
        win : $(window),
        colL : $('.col-l'),
        colR : $('.col-r'),
        pages : $('.full-page'),
        curPage : 1,
        pageH : null,
        //get the window's height on demand
        getWinH : function(){
            return this.win.height();
        },
        //set up the negative margin for the inverse scrolling page
        setScroll : function(){
            var revScroll = Math.round(-this.colL.height() + this.win.scrollTop() + this.getWinH());
            this.colR.css('margin-top', revScroll);
        },
        //force the size of the pages to be the window's size
        setSize : function(){
            this.pages.each(function(){
                thisPage = $(this);
                thisPage.height(halfHalf.getWinH());
                halfHalf.pageH = thisPage.height();
            });
        },
        //snap back to a full page if idol for too long
        snapTimer : function() {
            clearTimeout($.data(this, 'scrollTimer'));
            $.data(this, 'scrollTimer', setTimeout(function() {
                $('#page-link' + halfHalf.curPage).click();
            }, 1000));
        },
        //set things up initially
        init : function(){
            //set the initial size and placement of things
            this.setSize();
            this.setScroll();
            //bind these behaviors to various browser interactions
            this.win.resize(function(){
                halfHalf.setSize();
                halfHalf.snapTimer();
            });
            this.win.scroll(function(){
                halfHalf.setScroll();
                halfHalf.snapTimer();
                //the current page is based on the percentage scrolled through the entire site
                halfHalf.curPage = Math.round(halfHalf.win.scrollTop() / halfHalf.pageH) + 1;
            });
        }
    };
    //kick it all off
    halfHalf.init();

});