<?php get_header(); ?>
<div class="page_transition"></div>
<main class="home_main" data-barba="container" data-barba-namespace="home">
	<!-- <div class="main_background"></div> -->
	<div class="container-fluid devide_menu">
		<div class="row menu_sticker" >
			<div class="col-6 events_header category_column">
				<div class="icon_wraper">
					<div class="research_icon filter" data-category="research" data-press="no"></div>
					<div class="research_category"><p>research</p></div>
				</div>
				<div class="icon_wraper">
					<div class="demonstrator_icon filter" data-category="demonstrators" data-press="no"></div>
					<div class="demonstrator_category"><p>demonstrators</p></div>
				</div>
				<div class="icon_wraper">
					<div class="vision_icon filter" data-category="visions" data-press="no"></div>
					<div class="vision_category"><p>visions</p></div>
				</div>
				</div>
			<div class="col-6 ongoing_header category_column">
				<div class="icon_wraper">
					<div class="exhibition_icon filter" data-category="exhibitions" data-press="no"></div>
					<div class="exhibition_category"><p>exhibitions</p></div>
				</div>
				<div class="icon_wraper">
					<div class="dialogue_icon filter" data-category="dialogues" data-press="no"></div>
					<div class="dialogue_category"><p>dialogues</p></div>
				</div>
				<div class="icon_wraper">
					<div class="update_icon filter" data-category="updates"data-press="no"></div>
					<div class="update_category"><p>updates</p></div>
				</div>
			</div>
		</div>
	</div>
	<!-- <div class="evet_category">
		<div class="category_column" >
			<div class="r_d_icon" data-category="r_d" data-press="no"></div>
			<div class="museum_icon" data-category="virtual_museum" data-press="no"></div>
			<div class="exhibition_icon" data-category="exhibition" data-press="no"></div>
			<div class="prototype_icon" data-category="prototype" data-press="no"></div>
			<div class="public_icon" data-category="public_event"data-press="no"></div>
		</div>
	</div> -->

  <section class="alive_opener" id="opener_canvas">
		<article>
			<div class="coming_soon"><img src="https://www.alivetextiles.com/wp-content/uploads/2020/12/coming_soon-01.png"/></div>
			<header class="website_title">
				<h1>ALIVE<br>TEXTILES</h1>
				</header>
			</article>
			<div class="arrow_to_scroll"></div>
		</section>

		<section class="container-fluid timeline">
			<div class="row timeline_secure_background">
				<div class="col-6 secure_event_background"></div>
				<div class="col-6 secure_ongoing_background"></div>
			</div>
			<article class="row timeline_row" >
				<?php $args = array(
					'post_type' => 'timeline',
					'post_status' => 'publish',
					 'order' => 'DESC',
					'orderby' => 'meta_value',
					'posts_per_page' => -1,
					// 'meta_query' => array(
					// 	array(
					// 		'key' => 'event_date',
					// 		'compare' => '>=',
					// 		'value' =>date('Y/m/d'),
					// 	)
					// ),
					'meta_key' => 'event_date',
					'meta_type' => 'DATE'
				);
				$event = new WP_Query( $args );
				$current_year ="";
				if($event->have_posts() ) : while ( $event->have_posts() ) : $event->the_post();
				$cat = get_the_category();
				if (count($cat) <=0 ) {
					$catname = 'no_cat';
				} else {
					$catname = $cat[0]->name;
				}
				$event_year = substr(get_field('event_date'), -4);
				if ($current_year != $event_year) {
					$current_year = $event_year;
					?>
					<div class="col-12 event_date_heading"><?php echo($current_year);?></div>
					<?php
				} else {

				}

				?>
				<div class="col-12 timeline_item" data-category="<?php echo $catname; ?>">
					<div class="row">
						<!--<div class="overlay_icon anim_icon"></div>-->
						<div class="r_d" data-tooltip="<?php the_title();?>" data-open="close"> </div>
						<div class="col-6 column_event_background"></div>
						<div class="col-6 column_ongoing_background"></div>
					</div>
					<div class="row collapse">
						<?php
						$event_type = get_field('event_type');
						//echo $event_type[0];
						if ($event_type[0] === "event"):
							?>
							<div class="col-6 column_event"></div>
							<div class="col-6 column_ongoing">
								<a href="<?php the_permalink();?>">
									<div class="divider_ongong"></div>
									<div class="ongoing_date"><p><?php the_field('event_date_text');?></p></div>
									<h2><?php the_title();?></h2>
									<div class="ongoing_img"><img src="<?php the_field('timeline_image');?>"/></div>
								</a>
							</div>
						<?php elseif ($event_type[0] === "ongoing"):?>
							<div class="col-6 column_event">
								<a href="<?php the_permalink();?>">
									<div class="divider_event"></div>
									<div class="event_date"><p><?php the_field('event_date_text');?></p></div>
									<h2><?php the_title();?></h2>
									<div class="event_img"><img src="<?php the_field('timeline_image');?>"/></div>
								</a>
							</div>
							<div class="col-6 column_ongoing"></div>
						<?php endif; ?>
					</div>
				</div>
			<?php endwhile; ?>
		<?php endif; ?>

	</article>

</section>
<?php get_footer(); ?>