/**
 * Class: SupapressCart
 */

var SimplePopup = {};

(function($) { // reference jquery

        var defaultCookie = {
            name: 'simple-popup-cookie',
            value: "cookie-privacy-policy"
        };

        SimplePopup = function (options)  {
            this.options = options;
            this.popUp = this.options.jsPopupSelector !== undefined ? $(this.options.jsPopupSelector) : $('.js-simple-popup');
            this.jsEventClass = this.options.jsEventClass !== undefined ? this.options.jsEventClass : 'js-set-cookie';
            this.cookieData = this.options.cookieData !== undefined ? this.options.cookieData : defaultCookie;

            this.getCookie = function() {

                var cookie = Cookies.get(this.cookieData.name);

                if(cookie === undefined) return null;

                return cookie;

            };

            this.setCookie = function() {
                Cookies.set(this.cookieData.name, this.cookieData.value, { expires: 365 });
            };

            this.displayPopup = function() {

                this.popUp.show();
            };

            this.hidePopup = function() {
                this.popUp.hide();
            };

            this.defaultClickEvents = function () {

                // use default events
                this.setCookie();
                this.hidePopup();

            };

            this.setupEvents = function() {

                var $simplePopup = this;

                $(this.popUp).on('click', function(e) {

                    e.preventDefault();

                    var $element = $(e.target);

                    if ($element.hasClass($simplePopup.jsEventClass) === false) return;

                    // TODO merge in custom events
                    var defaultEvents = [
                        {
                            element: 'button',
                            function: $simplePopup.defaultClickEvents()
                        },
                        {
                            element: 'close',
                            function: $simplePopup.defaultClickEvents()
                        }
                    ];

                    var events = $simplePopup.options.events !== undefined ? $simplePopup.options.events : defaultEvents;

                    $(events).each(function (key, event) {

                        if ($element.data('element') === event.element) {

                            // if custom override function is defined, use custom override function
                            event.function();
                        }

                    });

                });

            };

            this.init = function() {

                // stop script running if cookie is set
                if (this.getCookie() !== null) return;

                this.displayPopup();
                this.setupEvents();
            };
        };

})(jQuery);


