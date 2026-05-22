<?php
/**
 * Plugin Name: Custom Tabs Block
 * Plugin URI: https://example.com
 * Description: Custom block for managing multi-level tabs/sections structure
 * Version: 1.0.0
 * Author: Your Name
 * License: GPL v2 or later
 * Text Domain: custom-tabs-block
 * Domain Path: /languages
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Hook into the `init` action to register the block
add_action( 'init', 'custom_tabs_block_register_block' );

function custom_tabs_block_register_block() {
	// Register the block script
	$asset_file = include plugin_dir_path( __FILE__ ) . 'build/index.asset.php';

	wp_register_script(
		'custom-tabs-block-editor',
		plugin_dir_url( __FILE__ ) . 'build/index.js',
		$asset_file['dependencies'],
		$asset_file['version']
	);

	// Register the block style
	wp_register_style(
		'custom-tabs-block-style',
		plugin_dir_url( __FILE__ ) . 'build/index.css',
		array(),
		$asset_file['version']
	);

	// Register the block
	register_block_type(
		'custom-tabs-block/tabs',
		array(
			'editor_script' => 'custom-tabs-block-editor',
			'style'         => 'custom-tabs-block-style',
		)
	);
}
