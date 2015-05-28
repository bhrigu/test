(function(){
    /**
     * Affix page elements
     */
    $('.navigation').affix({
        offset: {
            top: $('.header').height(),
            bottom: function () {
                return (this.bottom = $('.footer').outerHeight(true))
            }
        }
    });
    $('.navbar .local-link').affix({
        offset: {
            top: $('.header').height()
        }
    });

    /**
     * Toggle page elements
     */
    var triggers = $('[data-toggle="collapse"]');
    $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
        var $this = $(this);
        if (!$this.attr('data-target-move')) e.preventDefault();
        var $target = $($this.attr('data-target-move')),
            menuTarget =  $($this.attr('data-target')),
            data = menuTarget.data('bs.collapse'),
            triggerView = function(visible){
                $target[visible?'addClass':'removeClass']('move');
            };

        menuTarget.one("show.bs.collapse", function () {
            triggerView(true)
        });
        menuTarget.one("hide.bs.collapse", function () {
            triggerView(false)
        });
    });
    /* cold run */
    triggers.trigger('click.bs.collapse.data-api');
    triggers.trigger('click.bs.collapse.data-api');

    $("a.local-link[href^='#']").on('click', function(e) {
        e.preventDefault();
        var hash = this.hash;
        $('html, body').animate({
            scrollTop: hash?$(hash).offset().top:0
        }, 300, function(){
            window.location.hash = hash;
        });
    });
})()