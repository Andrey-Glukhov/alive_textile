<?php
function alive_script_enqueue(){
//css
	wp_enqueue_style( 'alive-stylesheet', get_template_directory_uri() . '/css/alive.css', array(), '1.0.0', 'all' );
  //js
  // unregister jQuery
  wp_deregister_script('jquery-core');
  wp_deregister_script('jquery');

  // register
  wp_register_script( 'jquery-core', 'https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js', false, null, true );
  wp_register_script( 'jquery', false, array('jquery-core'), null, true );

  // enqueue
  wp_enqueue_script( 'jquery' );
  // Bootstrap
  wp_enqueue_script( 'bootstrap-js', 'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js', array('jquery'), null, true );
  // ScrollMagic
  wp_enqueue_script( 'scroll-magic-js', 'https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.7/ScrollMagic.js', array('jquery'), null, true );
  wp_enqueue_script( 'add-indicators-js', 'https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.7/plugins/debug.addIndicators.min.js', array('jquery', 'scroll-magic-js'), null, true );
  // GSAP
  wp_enqueue_script( 'gsap-js', 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.2.0/gsap.min.js', array('jquery'), null, true );
  wp_enqueue_script( 'gsap-animation-js', 'https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.5/plugins/animation.gsap.js', array('jquery', 'gsap-js'), null, true );
  // Barba
  wp_enqueue_script( 'barba-js', 'https://cdn.jsdelivr.net/npm/@barba/core', array(), null, true );
  // P5
 // wp_enqueue_script( 'p5-js', 'https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.1.9/p5.min.js', array(), null, true );
  
  //if (is_home()) {
    //wp_enqueue_script( 'play-canvas', get_template_directory_uri() . '/js/play-canvas.js', array('p5-js'), null, true );
  //}

  wp_enqueue_script( 'alive-js', get_template_directory_uri() . '/js/alive.js', array('jquery', 'scroll-magic-js', 'gsap-js', 'bootstrap-js'), null, true );

  
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

//setcookie(TEST_COOKIE, 'WP Cookie check', 0, COOKIEPATH, COOKIE_DOMAIN);
//if ( SITECOOKIEPATH != COOKIEPATH ) setcookie(TEST_COOKIE, 'WP Cookie check', 0, SITECOOKIEPATH, COOKIE_DOMAIN);

// add_filter('post_class','timeline_column_classes');
// function timeline_column_classes( $classes ) {
//     global $wp_query;
//     $current_post = $wp_query->current_post;
//     $event_type = get_field("event_type", $current_post->ID);
//     $classes[] = $event_type;
//     //if( $wp_query->current_post%2 == 0 ) $classes[] = 'column-post-left';
//     return $classes;
// }

function log_rest_api_errors( $result, $server, $request ) {
	if ( $result->is_error() ) {
		error_log( sprintf(
			"REST request: %s: %s",
			$request->get_route(),
			print_r( $request->get_params(), true )
		) );

		error_log( sprintf(
			"REST result: %s: %s",
			$result->get_matched_route(),
			print_r( $result->get_data(), true )
		) );
	}

	return $result;
}
add_filter( 'rest_post_dispatch', 'log_rest_api_errors', 10, 3 );

?>
