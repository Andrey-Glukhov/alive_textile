<?php
/**
*Template Name: Project Template
*/
get_header(); ?>
<?php if(have_posts() ) : while (have_posts() ) :the_post();?>
<main data-barba="container" data-barba-namespace="single">
<section class="container-fluid single_item <?php the_field('event_type');?>_color">

<article class="row single_row justify-content-center">
      <div class="col-md-5 col-sm-10 single_<?php the_field('event_type');?>">
        <div class="<?php the_field('event_type');?>_date"><p><?php the_field('event_date_text');?></p></div>
        <h2><?php the_title();?></h2>
        <div class="<?php the_field('event_type');?>_img"><img src="<?php the_field('timeline_image');?>"/></div>
      </div>
      <div class="col-md-5 col-sm-10">
        <p>
          <?php the_field('second_column');?>
        </p>
      </div>
</article>
<article class="row single_row justify-content-center">
  <?php the_content();?>
</article>
</section>
</main>
<?php endwhile; ?>
<?php endif; ?>
<?php get_footer(); ?>
