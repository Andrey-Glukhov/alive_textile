<?php
function alive_script_enqueue(){
//css
	wp_enqueue_style( 'alive-stylesheet', get_template_directory_uri() . '/css/alive.css', array(), '1.0.0', 'all' );
//js
  wp_enqueue_script('jquery');
  wp_enqueue_script( 'alive-js', get_template_directory_uri() . '/js/alive.js', array('jquery'), '1.0.0', true );

}
add_action( 'wp_enqueue_scripts', 'alive_script_enqueue' );

function alive_theme_setup(){
  add_theme_support('menus');
  register_nav_menu('primary', 'Primary Header Navigation');

}
add_action('init', 'alive_theme_setup');
add_theme_support('custom-background');
add_theme_support('custom-header');
add_theme_support('post-formats', array('aside', 'chat', 'gallery','link','image','quote','status','video'));
add_theme_support('post-thumbnails');

?>
