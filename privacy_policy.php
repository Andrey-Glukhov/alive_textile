<?php
/**
*Template Name: Privacy Policy
*/
get_header(); ?>

<div class="page_transition"></div>
<main data-barba="container" data-barba-namespace="about">
<div class="static_opener_background" ></div>
<div class="static_opener" id="opener_canvas"></div>
<a href="https://www.alivetextiles.com/" class="home_link"></a>
  <div class="return_arrow"></div>
  <div class="container-fluid">
    <div class="row">
      <?php   $ppoliy = new WP_Query( array( 'page_id' => 3 ) );
      if($ppoliy->have_posts() ) : while ($ppoliy->have_posts() ) : $ppoliy->the_post();
      ?>
      <div class="col-lg-9 col-md-8 col-sm-12 about_left people_side canvas_template">
        <div class="container-fluid inner_left">
          <div class="row">
            <div class="col-1"></div>
            <div class="col-11 about_header">
              <h1>PRIVACY POLICY</h1>
            </div>
          </div>
          <?php the_content(); ?>
          </div>
        </div>

      <div class="col-lg-3 col-md-4 col-sm-12 about_right logo_side">
		   <div class="container-fluid inner_right">
          <div class="row justify-content-center">
            <div class="col-10 col-md-12 about_partners">
				<p>Requests, questions and comments regarding the privacy policy 
					are welcomed and should be addressed to: </p>
				<a class="about_mail_link" href="mailto:info@samiraboon.com">info@samiraboon.com</a>
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
