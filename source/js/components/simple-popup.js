/**
 * Class: SupapressCart
 */

// TODO this is going to pollute the global scope.
// TODO I might be better to create a an global object all Supadu dependencies sit under (supaduDependencies.SimplePopup)?
var SimplePopup = {};

(function($) { // reference jquery

        var defaultCookie = {
            name: 'simple-popup-cookie',
            value: "simple-popup-cookie"
        };

        SimplePopup = function (options)  {
            this.options = options;

            this.constructor = function () {
                this.popUp = this.getPopup();
                this.popupAtts = this.getPopupAttributes();
                this.cookieData = this.getCookieData();
                this.jsEventClass = 'js-simple-popup-event';
            };

            this.getPopup = function () {

                if (this.options.popup !== undefined) {

                    // default behaviour: popup element passed on popup instantiated on page load
                    return $(this.options.popup);

                } else if (this.options.customPopupId !== undefined ) {

                    // custom behaviour: custom target option used to target specific popup (logic used in conjunction with the customInlineEvent method)
                    return $(".js-simple-popup[data-popup-id='" + this.options.customPopupId + "']");

                }

                return null;

            };

            this.getPopupAttributes = function () {

                if (this.popUp === null) return null;

                return this.popUp.data('popupAtts');
            };

            this.getCookieData = function () {

                return {
                    name: this.popupAtts.customCookieName !== undefined ? this.popupAtts.customCookieName : defaultCookie.name,
                    value: this.popupAtts.customCookieValue !== undefined ? this.popupAtts.customCookieValue : defaultCookie.value
                };

            };

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

            this.hidePopup = function(e) {
                $(e.target).closest(this.popUp).hide();
            };

            this.defaultCloseEvent = function(e) {
                this.hidePopup(e);
            };

            this.defaultSubmitEvent = function (e) {

                this.setCookie();
                this.hidePopup(e);

            };

            this.customInlineEvent = function (e) {

                // customInlineEvent is called Simple_Popup PHP class method: handle_inline_event

                e = e || window.event;

                e.preventDefault();

                this.defaultSubmitEvent(e);

            };

            this.setupEvents = function() {

                var $simplePopup = this;

                $(this.popUp).on('click', function(e) {

                    var $element = $(e.target);

                    if ($element.hasClass($simplePopup.jsEventClass) === false) return;

                    if ($element.data('element') === 'button') {

                        $simplePopup.defaultSubmitEvent(e);

                    } else if($element.data('element') === 'close') {

                        $simplePopup.defaultCloseEvent(e);

                    }

                });

            };

            this.init = function() {

                // stop script running if cookie is set
                if (this.getCookie() !== null) return;

                this.displayPopup();
                this.setupEvents();
            };

            this.constructor(options); // TODO this wrong - Work out a better way of calling constructor (refactor to ES6?)
        };

})(jQuery);


