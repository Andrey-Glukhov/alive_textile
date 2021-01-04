<?php
/**
*Template Name: Subscribe Page
*/
get_header(); ?>

<div class="page_transition"></div>
<main data-barba="container" data-barba-namespace="subscribe">

  <a href="http://localhost:8888/alive_textile/wordpress" class="home_link"></a>
  <div class="return_arrow"></div>
  <div class="container-fluid people-background">
    <div class="row background-subscribe-row">
      <div class="col-lg-3 col-md-4 col-sm-12 icons_side"></div>
      <div class="col-lg-9 col-md-8 col-sm-12 form_side"></div>
    </div>
  </div>

  <div class="container-fluid subscribe_page">

    <div class="row">
      <div class="col-lg-3 col-md-4 col-sm-1 col-1"></div>
      <div class="col-lg-8 col-md-7 col-sm-11 col-11 team_header">
        <h1>SUBSCRIBE</h1>
      </div>
    </div>

    <div class="row justify-content-center subscribe_row">
      <div class="col-lg-3 col-md-4 col-sm-10 col-10 newsletter">
        <p>
          If you wish to receive updates about ALIVE TEXTILES, please subscribe to
          our newsletter.
        </p>
        <div class="subscribe_icons">
          <a href="https://www.facebook.com/studiosamiraboon/" target="_blank"><img src="http://localhost:8888/alive_textile/wordpress/wp-content/themes/alive/img/facebook-square.png"/></a>
          <a href="https://www.instagram.com/studiosamiraboon/" target="_blank"><img src="http://localhost:8888/alive_textile/wordpress/wp-content/themes/alive/img/instagram-square.png"/></a>
        </div>
      </div>
      <div class="subscribe_form_bg col-lg-9 col-md-8 col-sm-12">
        <div class="row justify-content-center sub_wraper">
          <div class="col-lg-7 col-md-8 col-sm-10 col-10">
            <!-- Begin Mailchimp Signup Form -->
            <link href="//cdn-images.mailchimp.com/embedcode/classic-10_7.css" rel="stylesheet" type="text/css">
            <div id="mc_embed_signup">
              <form action="https://samiraboon.us1.list-manage.com/subscribe/post?u=589ab2577656a6e339d95da53&amp;id=a9e3fdcc29" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate autocomplete="off">
                <div id="mc_embed_signup_scroll">

                  <div class="mc-field-group">
                    <label for="mce-EMAIL">Email Address </label>
                    <input type="email" value="" name="EMAIL" class="required email" id="mce-EMAIL">
                  </div>
                  <div class="mc-field-group">
                    <label for="mce-FNAME">First Name</label>
                    <input type="text" value="" name="FNAME" class="required" id="mce-FNAME">
                  </div>
                  <div class="mc-field-group">
                    <label for="mce-LNAME">Last Name</label>
                    <input type="text" value="" name="LNAME" class="required" id="mce-LNAME">
                  </div>
                  <div id="mce-responses" class="clear">
                    <div class="response" id="mce-error-response" style="display:none"></div>
                    <div class="response" id="mce-success-response" style="display:none"></div>
                  </div>    <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
                  <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_589ab2577656a6e339d95da53_a9e3fdcc29" tabindex="-1" value=""></div>
                  <div class="clear"><input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="button"></div>
                </div>
              </form>
            </div>
            <script type='text/javascript' src='//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js'></script><script type='text/javascript'>(function($) {window.fnames = new Array(); window.ftypes = new Array();fnames[0]='EMAIL';ftypes[0]='email';fnames[1]='FNAME';ftypes[1]='text';fnames[2]='LNAME';ftypes[2]='text';}(jQuery));var $mcj = jQuery.noConflict(true);</script>
            <!--End mc_embed_signup-->
          </div>
        </div>
      </div>

    </div>


  </div>


</main>

<?php get_footer(); ?>
