<?php

if( !defined( 'ABSPATH' ) ) exit;

define( 'SIMPLE_POPUP_DEPENDENCY_VERSION', '1.0.3' );

define( 'SIMPLE_POPUP_DEPENDENCY_DIR', untrailingslashit( dirname( __FILE__ ) ) );

define( 'SIMPLE_POPUP_DEPENDENCY_URL', untrailingslashit( plugins_url( '', __FILE__ ) ) );

function simple_popup_dependency_url( $path = '' ) {
    $url = untrailingslashit( SIMPLE_POPUP_DEPENDENCY_URL );

    if ( ! empty( $path ) && is_string( $path ) && false === strpos( $path, '..' ) ) {
        $url .= '/' . ltrim( $path, '/' );
    }

    return $url;
}

// Composer Includes
require_once __DIR__ . '../vendor/autoload.php';
