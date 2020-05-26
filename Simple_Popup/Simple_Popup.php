<?php

if( !defined( 'ABSPATH' ) ) exit;

//require __DIR__ . '/../vendor/autoload.php'; // useful for dependency development

require_once __DIR__ . '/functions.php';

use ArrayHelpers\Arr;

/**
 * Class Simple_Popup
 *
 * OPTIONS:
 * title
 * content
 * button
 * modifier-class
 * js-event-class
 *
 */

class Simple_Popup {

    public function __construct($data)
    {
        $this->data = $data;
        $this->parent_class = 'simple-popup';
    }

    public function get_modifier_class() {

        $modifiers = Arr::get($this->data, 'modifiers');

        if ($modifiers === null) return '';

        $prefix = ' ' . $this->parent_class . '--'; // ' simple-popup__'
        if (is_array($modifiers)) {
            return $prefix . implode($prefix, $modifiers);
        }

        return $prefix . $modifiers;

    }

    public function get_js_event_class() {

        return 'js-simple-popup-event';

    }

    public function render_close_close_button() {

        $js_event_class = $this->get_js_event_class();

        ob_start(); ?>

        <span class="simple-popup__close <?php echo $js_event_class; ?>" data-element="close">X</span>

        <?php return ob_get_clean();
    }


    public function render_title() {

        $title =  Arr::get($this->data, 'title');

        if ($title === null) return '';

        ob_start(); ?>

        <p class="simple-popup__title"><?php echo $title; ?></p>

        <?php return ob_get_clean();
    }

    public function render_content($content) {

        if (is_string($content) === false || $content === '') return '';

        ob_start(); ?>

        <div class="simple-popup__content"><?php echo $content; ?></div>

        <?php return ob_get_clean();
    }

    public function render_button() {

        $button_text = Arr::get($this->data, 'button-text',  );

        if ($button_text === null) return '';

        $js_event_class = $this->get_js_event_class();

        ob_start(); ?>

        <a class="simple-popup__button <?php echo $js_event_class; ?>" data-element="button"><?php echo $button_text; ?></a>

        <?php return ob_get_clean();
    }

    public function get_custom_properties() {

        // TODO add cookie date/timestamp...

        $custom_cookie = Arr::get($this->data, 'custom-cookie');
        $popup_id = $this->get_popup_id();

        // if no custom cookie data provided or popup id, return
        if ($custom_cookie === null) return null;
        if ($popup_id === null) return '';

        $custom_cookie_name = Arr::get($custom_cookie, 'name');
        $custom_cookie_value = Arr::get($custom_cookie, 'value');

        if ($custom_cookie_name === null || $custom_cookie_value === null) return null;

        $popupOptions = new stdClass();
        $popupOptions->customPopupId = $popup_id;
        $popupOptions->customCookieName = $custom_cookie_name;
        $popupOptions->customCookieValue = $custom_cookie_value;

        return $popupOptions;

    }

    public function get_popup_attributes() {

        $custom_props = $this->get_custom_properties();

        if ($custom_props === null) return '';

        return $custom_props;

    }

    public function get_popup_id() {

        $custom_popup_id = Arr::get($this->data, 'custom-popup-id');

        if ($custom_popup_id === null) return 'simple-popup';

        return $custom_popup_id;

    }

    public function render_popup($content) {

        ob_start(); ?>

        <div class="<?php echo $this->parent_class; ?> <?php echo $this->get_modifier_class(); ?> js-simple-popup"
             data-popup-id="<?php echo $this->get_popup_id(); ?>"
             data-popup-atts='<?php echo json_encode($this->get_popup_attributes()); ?>'
        >

            <?php echo $this->render_close_close_button(); ?>
            <?php echo $this->render_title(); ?>
            <?php echo $this->render_content($content); ?>
            <?php echo $this->render_button(); ?>

        </div>

        <?php return ob_get_clean();

    }

    public function handle_inline_event() {

        $popup_id = $this->get_popup_id();
        $popupOptions = new stdClass();
        $popupOptions->customPopupId = $popup_id;

        return 'new SimplePopup(' . json_encode($popupOptions) . ').customInlineEvent(event);';

    }

    static public function enqueue_popup_styles() {
            wp_enqueue_style( 'simple-popup', simple_popup_dependency_url( '/includes/css/style.css' ), array(), SIMPLE_POPUP_DEPENDENCY_VERSION, 'all' );
    }

    static public function enqueue_cookie_scripts() {
        wp_enqueue_script( 'simple-popup-cookie', simple_popup_dependency_url( '/includes/js/js.cookie.js' ), array(), SIMPLE_POPUP_DEPENDENCY_VERSION, true );
    }

    static public function enqueue_popup_scripts($dependencies = null) {

        $dependencies_array = array( 'jquery' );

        if ($dependencies !== null) {
            $dependencies_array[] = $dependencies;
        }

        wp_enqueue_script( 'simple-popup', simple_popup_dependency_url( '/includes/js/all.min.js' ), $dependencies, SIMPLE_POPUP_DEPENDENCY_VERSION, true );
    }

    static public function enqueue_assets() {

        add_action( 'wp_enqueue_scripts', function () {

            // static methods created for each include so files can be optionally not included

            Simple_Popup::enqueue_popup_styles();
            Simple_Popup::enqueue_cookie_scripts();
            Simple_Popup::enqueue_popup_scripts('simple-popup-cookie');

        }, 1);

    }

}
