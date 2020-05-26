(function($) { // reference query
    $(function() { // shorthand for onLoad()

        var popups = $('.js-simple-popup');

        popups.each(function (index, popup) {

            var $simplePopup = new SimplePopup({"popup": popup});
            $simplePopup.init();

        });


    });
})(jQuery);

