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
        'posts_per_page' => -1,
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
   <div class="col-12">
      <div class="row">
        <?php 
          $event_type = get_field('event_type');
          //echo $event_type[0];
          if ($event_type[0] === "ongoing"):
            ?>
          <div class="col-6 column_event"></div>
            <div class="col-6 column_ongoing">
              <h2><?php the_title();?></h2>
              <div><?php the_field('event_type');?></div>
            </div>
          <?php elseif ($event_type[0] === "event"):?>
          <div class="col-6 column_event">
            <h2><?php the_title();?></h2>
            <div><?php the_field('event_type');?></div>
          </div>
          <div class="col-6 column_ongoing"></div>
        <?php endif; ?>  
      </div>
    </div>
  <?php endwhile; ?>
<?php endif; ?>

		</article>

</section>


  <?php get_footer(); ?>
