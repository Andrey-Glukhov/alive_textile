<?php get_header(); ?>

<section class="alive_opener">

		<article>
			<header class="website_title">
				<h1>ALIVE<br>TEXTILES</h2>
			</header>
		</article>
    <div class="arrow_to_scroll"></div>
</section>

<section class="container-fluid timeline">
		<article class="row timeline_row">

      <?php $args = array(
        'post_type' => 'timeline',
        'post_status' => 'publish',
        'order' => 'ASC',
        'orderby' => 'meta_value',
        'meta_query' => array(
           array(
           'key' => 'event_date',
           'compare' => '>=',
           'value' =>date('d/m/Y'),
           )
       ),
    'meta_key' => 'event_date',
   'meta_type' => 'DATE'
   );
 $event = new WP_Query( $args );

     if($event->have_posts() ) : while ( $event->have_posts() ) : $event->the_post();
     $cat = get_the_category();
   ?>

      <div class="col-6 events">
        <h2><?php the_title();?></h2>

      </div>
      <div class="col-6 ongoing"></div>
    <?php endwhile; ?>
<?php endif; ?>

		</article>

</section>


  <?php get_footer(); ?>
