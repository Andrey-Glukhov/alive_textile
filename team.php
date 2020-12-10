<?php
/**
*Template Name: Team Page
*/
get_header(); ?>

<div class="page_transition"></div>
<main data-barba="container" data-barba-namespace="people">
  <div class="container-fluid people-background">
    <div class="row background-people-row">
      <div class="col-3 logo_side">
      </div>
      <div class="col-9 people_side">
      </div>
    </div>
  </div>
  <div class="container-fluid">
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
  <div class="col-3 <?php the_sub_field('organization'); ?>">

    <div class="team_dot"></div>
  </div>

  <div class="col-9">
    <div class="container" id="accordion">
    <div class = "row">

    <?php }
    ?>
    <div class = "col-md-3 col-sm-6 col-12 portret">
    <a role = "button" data-toggle="collapse" href= "#<?php echo str_replace(' ', '', get_sub_field('name')); ?>">
      <img src="<?php the_sub_field('portret'); ?>"/>
      <p><?php the_sub_field('name'); ?></p>
    </a></div>
    <?php $profile .= '<div class="profile collapse" data-parent="#accordion"  id = "' . str_replace(' ', '', get_sub_field('name')) . '">' . get_sub_field('description') . '</div>'; ?>

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
<!-- <script>
var $myGroup = $('.profile');
$myGroup.on('show.bs.collapse','.collapse', function() {
$myGroup.find('.collapse.show').collapse('hide');
});
</script> -->
