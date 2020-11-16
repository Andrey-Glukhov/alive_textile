<?php
/**
*Template Name: Project Template
*/
get_header(); ?>
<main data-barba="container" data-barba-namespace="single">

<section class="container-fluid single_item">
<article class="row single_row justify-content-center">

      <div class="col-md-5 col-sm-10">
        <div class="divider_ongong"></div>
        <div class="ongoing_date"><p><?php the_field('event_date_text');?></p></div>
        <h2><?php the_title();?></h2>
        <div class="ongoing_img"><img src="<?php the_field('timeline_image');?>"/></div>
      </div>
      <div class="col-md-5 col-sm-10">
        <p>
          <?php the_content();?>
        </p>
      </div>



	</article>

</section>

<div class="col-6 blank"></div>
</main>

<?php get_footer(); ?>
