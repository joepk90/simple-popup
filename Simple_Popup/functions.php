<?php

if( !defined( 'ABSPATH' ) ) exit;

define( 'SIMPLE_POPUP_DEPENDENCY_VERSION', '1.0.3' );

define( 'SIMPLE_POPUP_DEPENDENCY_DIR', untrailingslashit( dirname( __FILE__ ) ) );

function simple_popup_dependency_url($path = '') {

    $directory_path = str_replace('\\', '/', dirname(__FILE__));
    $directory_url = str_replace($_SERVER['DOCUMENT_ROOT'], '', $directory_path) . $path;

    // if is wordpress return path using site url.
//   if (defined('ABSPATH')) {
//       return get_site_url() . $directory_url;
//   }

    return $directory_url;

}
