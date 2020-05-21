<?php

if( !defined( 'ABSPATH' ) ) exit;

require_once __DIR__ . '/functions.php';


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
        $this->utlilties = new PHP_Utilities();
    }

    public function get_modifier_class() {

        $modifier = $this->utlilties->get_array_element('modifier-class',  $this->data);

        if ($modifier === null) return '';

        return $modifier;

    }

    public function get_js_event_class() {

        $js_event_class = $this->utlilties->get_array_element('js-event-class',  $this->data);

        if ($js_event_class === null) return 'js-set-cookie';

        return $js_event_class;

    }

    public function render_close_close_button() {

        $js_event_class = $this->get_js_event_class();

        ob_start(); ?>

        <span class="simple-popup__close <?php echo $js_event_class; ?>" data-element="close">X</span>

        <?php return ob_get_clean();
    }


    public function render_title() {

        $title = $this->utlilties->get_array_element('title',  $this->data);

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

        $button_text = $this->utlilties->get_array_element('button-text',  $this->data);

        if ($button_text === null) return '';

        $js_event_class = $this->get_js_event_class();

        ob_start(); ?>

        <a class="simple-popup__button <?php echo $js_event_class; ?>" data-element="button"><?php echo $button_text; ?></a>

        <?php return ob_get_clean();
    }

    public function render_popup($content) {

        $modifier_class = $this->get_modifier_class();

        ob_start(); ?>

        <div class="simple-popup <?php echo $modifier_class; ?> js-simple-popup">

            <?php echo $this->render_close_close_button(); ?>
            <?php echo $this->render_title(); ?>
            <?php echo $this->render_content($content); ?>
            <?php echo $this->render_button(); ?>

        </div>

        <?php return ob_get_clean();

    }

    static public function enqueue_scripts() {

        // TODO this will need to change if converted to a Composer dependency
        // TODO enqueue cookie-js as separate script, make optional include (maybe the theme already includes it...)

        add_action( 'wp_enqueue_scripts', 'simple_popup_enqueue_scripts' );

        function simple_popup_enqueue_scripts() {

            wp_enqueue_style( 'simple-popup', simple_popup_dependency_url( 'includes/css/style.css' ), array(), SIMPLE_POPUP_DEPENDENCY_VERSION, 'all' );

            wp_enqueue_script( 'simple-popup', simple_popup_dependency_url( 'includes/js/all.min.js' ), array( 'jquery' ), SIMPLE_POPUP_DEPENDENCY_VERSION, true );



        }

    }

}
