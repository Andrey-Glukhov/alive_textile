<nav>
  <div class="container-fluid">
    <div class="row menu_sticker" >
      <div class="col-6 events_header">EVENTS</div>
      <div class="col-6 ongoing_header">ONGOING</div>
  </div>
</div>
  <div class="menu-btn">
    <div class="animated-icon1"><span></span><span></span><span></span></div>
  </div>

  <div class="menu" style="padding:0;">
          <div class="nav_content">
            <ul>
              <?php
              wp_nav_menu(array(
                'theme_location' => 'primary',
                'container' => false,
                'menu_class' => 'auto-navigation',
                'items_wrap' => '<div id="%1$s" class="navigation-bar %2$s">%3$s</div>',
                'item_spacing' => 'preserve'
              )
            );
            ?>
          </ul>
        </div>
      </div>
</nav>
<div class="category-nav">
<div class="r_d"></div>
<div class="r_d"></div>
<div class="r_d"></div>
<div class="r_d"></div>
<div class="r_d"></div>
</div>
