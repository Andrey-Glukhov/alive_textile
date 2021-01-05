<?php
/**
*Template Name: Project Template
*/
get_header(); ?>

<div class="page_transition"></div>
<main data-barba="container" data-barba-namespace="single">

	<a href="http://localhost:8888/alive_textile/wordpress" class="home_link"></a>
	<div class="return_arrow"></div>
	<div class="single_opener" id="opener_canvas"></div>
	<?php if(have_posts() ) : while (have_posts() ) :the_post();
	$cat = get_the_category();
	if (count($cat) <=0 ) {
		$cat = array('no_cat');
	}
	?>

	<div class="container-fluid single_item <?php the_field('event_type');?>_color">
		<div class="row justify-content-center single_item_header">
			<div class="col-1"></div>
			<div class="col-sm-4 col-10 single_<?php the_field('event_type');?>_type"><h2><?php echo $cat[0]->name;?></h2></div>
			<div class="col-sm-2 d-none d-sm-flex type_icon_wrapper"><div class="single_type_icon <?php echo $cat[0]->name;?>"></div></div>
			<div class="col-sm-4 d-none d-sm-block single_line"></div>
			<div class="col-1"></div>
		</div>

		<div class="row single_row justify-content-center">
			<div class="col-md-5 col-sm-10 col-10 single_<?php the_field('event_type');?>">
				<div class="single_<?php the_field('event_type');?>_date"><p><?php the_field('event_date_text');?></p></div>
				<h2><?php the_title();?></h2>
			</div>

			<div class="col-md-5 col-sm-10d-none d-sm-none d-md-block"></div>
		</div>

		<div class="row single_row justify-content-center">

			<div class="col-md-5 col-sm-10 col-10 single_<?php the_field('event_type');?>">
				<div class="single_<?php the_field('event_type');?>_img"><img src="<?php the_field('event_image');?>"/></div>
			</div>

			<div class="col-md-5 col-sm-10 col-10 single_short_desc">
				<p>
					<?php the_field('second_column');?>
				</p>
			</div>
		</div>

		<div class="fluid_content">
			<?php the_content();?>
		</div>
	</div>
<?php endwhile; ?>
<?php endif; ?>
</main>
<?php get_footer(); ?>
