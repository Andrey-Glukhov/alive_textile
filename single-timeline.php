<?php
/**
*Template Name: Project Template
*/
get_header(); ?>

<div class="page_transition"></div>
<main data-barba="container" data-barba-namespace="single">
<a href="http://localhost:8888/alive_textile/wordpress" class="home_link"></a>
<div class="return_arrow"></div>
<?php if(have_posts() ) : while (have_posts() ) :the_post();
	$cat = get_the_category();
	if (count($cat) <=0 ) {
		$cat = array('no_cat');
				}
		?>
<section class="container-fluid single_item <?php the_field('event_type');?>_color">
<div class="single_opener" id="opener_canvas"></div>
<article class="row justify-content-center single_item_header">
  <div class="col-md-1"></div>
  <div class="col-md-5 single_<?php the_field('event_type');?>_type"><h2><?php the_field('event_type');?></h2></div>
  <div class="col-md-5"></div>
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


<article class="fluid_content">

  <?php the_content();?>

</article>
</section>
<?php endwhile; ?>
<?php endif; ?>

<?php get_footer(); ?>


