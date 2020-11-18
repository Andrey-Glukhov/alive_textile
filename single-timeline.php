<?php
/**
*Template Name: Project Template
*/
get_header(); ?>

<main data-barba="container" data-barba-namespace="single">

<?php if(have_posts() ) : while (have_posts() ) :the_post();
	$cat = get_the_category();?>
<section class="container-fluid single_item <?php the_field('event_type');?>_color">
<article class="row justify-content-center single_item_header">
  <div class="col-md-1 arrow-pict"><a href="http://localhost:8888/alive_textile/wordpress/"><img src="http://localhost:8888/alive_textile/wordpress/wp-content/uploads/2020/11/arrow-01.png"/></a></div>
  <div class="col-md-4 single_<?php the_field('event_type');?>_type"><h2><?php the_field('event_type');?></h2></div>
  <div class="col-md-1 changing-pict"></div>
  <div class="col-md-4"></div>
  <div class="col-md-1"></div>
</article>

<article class="row single_row justify-content-center">
      <div class="col-md-4 col-sm-10 single_<?php the_field('event_type');?>">
        <div class="single_<?php the_field('event_type');?>_date"><p><?php the_field('event_date_text');?></p></div>
        <h2><?php the_title();?></h2>
      </div>

      <div class="col-md-1"></div>

      <div class="col-md-4 col-sm-10"></div>
</article>

<article class="row single_row justify-content-center">

      <div class="col-md-4 col-sm-10 single_<?php the_field('event_type');?>">
        <div class="single_<?php the_field('event_type');?>_img"><img src="<?php the_field('timeline_image');?>"/></div>
      </div>

      <div class="col-md-1"></div>

      <div class="col-md-4 col-sm-10 single_short_desc">
        <p>
          <?php the_field('second_column');?>
        </p>
      </div>

</article>


<article class="row single_row fluid_content justify-content-center">
  <?php the_content();?>
</article>
</section>
<?php endwhile; ?>
<?php endif; ?>
<?php get_footer(); ?>
