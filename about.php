<?php
/**
*Template Name: About Page
*/
get_header(); ?>

<div class="page_transition"></div>
<main data-barba="container" data-barba-namespace="about">
<a href="http://localhost:8888/alive_textile/wordpress" class="home_link"></a>
  <div class="return_arrow"></div>
  <div class="container-fluid">
    <div class="row">
      <?php   $about = new WP_Query( array( 'page_id' => 5 ) );
      if($about->have_posts() ) : while ($about->have_posts() ) : $about->the_post();
      ?>
      <div class="col-lg-9 col-md-8 col-sm-12 about_left people_side">
        <div class="container-fluid inner_left">
          <div class="row">
            <div class="col-1"></div>
            <div class="col-11 about_header">
              <h1>ABOUT ALIVE TEXTILES</h1>
            </div>
          </div>
          <?php the_content(); ?>
          </div>
        </div>

      <div class="col-lg-3 col-md-4 col-sm-12 about_right logo_side">
        <div class="container-fluid inner_right">
          <div class="row justify-content-center">
            <div class="col-10 col-md-12 about_partners">
              <p><?php the_field('partners'); ?></p>
            <?php   if( have_rows('partner_logos') ) : while( have_rows('partner_logos') ) : the_row();  ?>
              <img src="<?php the_sub_field('logo_image'); ?>"/>
            <?php endwhile; ?>
           <?php endif; ?>
            </div>
            <div class="col-10 col-md-12 about_press">
              <?php the_field('press_field'); ?>
            </div>
          </div>
        </div>
      </div>

 <?php endwhile; ?>
<?php endif; ?>
    </div>
  </div>
</main>

<?php get_footer(); ?>
