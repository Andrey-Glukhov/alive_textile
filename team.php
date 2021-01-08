<?php
/**
*Template Name: Team Page
*/
get_header(); ?>

<div class="page_transition"></div>
<main data-barba="container" data-barba-namespace="people">
<div class="static_opener_background" ></div>
<div class="static_opener" id="opener_canvas"></div> 
  <a href="http://localhost:8888/alive_textile/wordpress" class="home_link"></a>
    <div class="return_arrow"></div>
  <div class="container-fluid people-background">
    <div class="row background-people-row">
      <div class="col-md-3 col-sm-5 col-5 logo_side">
      </div>
      <div class="col-md-9 col-sm-7 col-7 people_side canvas_template">
      </div>
    </div>
  </div>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-3 col-sm-5 col-5"></div>
      <div class="col-md-8 col-sm-6 col-6 team_header">
        <h1>PEOPLE</h1>
      </div>

    </div>
    <?php
    $the_team = new WP_Query( array(
      'page_id' => 7,
      'meta_key' => 'organization',
      'orderby'			=> 'meta_value',
    ) );
    $organization = '';
    $firt_time = true;
    $profile = '';
    if( have_rows('single_profile') ): while( have_rows('single_profile') ) : the_row();
    if ($organization !=  get_sub_field('organization')){
      $organization = get_sub_field('organization');
      if (! $firt_time){ ?>
      </div>
      </div>
    </div>
  </div>
  <?php echo $profile;
  $profile = '';?>
<?php  } else {
  $firt_time = false;
}
?>
<div class="row organization_row">
  <div class="col-md-3 col-sm-5 col-5 ">
    <div class="logo_image <?php the_sub_field('organization'); ?>">
    <img src="<?php the_sub_field('logo'); ?>" alt="">
      </div>
    <div class="team_dot"></div>
  </div>

  <div class="col-md-9 col-sm-7 col-7">
    <div class="container accordion_container" >
    <div class = "row portret_row">

    <?php }
    ?>
    <div class = "col-md-3 col-sm-6 col-12 portret">
    <a role = "button" data-toggle="collapse" href= "#<?php echo str_replace(' ', '', get_sub_field('name')); ?>">
      <img src="<?php the_sub_field('portret'); ?>"/>
      <p><?php the_sub_field('name'); ?></p>
    </a></div>
    <?php $profile .= '<div class=" justify-content-end profile collapse col-12"  id = "' . str_replace(' ', '', get_sub_field('name')) . '"><div class="descr col-sm-7">' . get_sub_field('description') . '</div></div>'; ?>

  <?php endwhile;?>
</div>
</div>
</div>

</div>
<?php echo $profile; ?>
<?php  endif;?>

</div>
</main>

<?php get_footer(); ?>

