<?php get_header(); ?>
<main data-barba="container" data-barba-namespace="home">
<section class="alive_opener" id="opener_canvas">
	<div class="page_transition"></div>

	<div class="container-fluid devide_menu">
		<div class="row menu_sticker" >
			<div class="col-6 events_header">EVENTS</div>
			<div class="col-6 ongoing_header">ONGOING</div>
		</div>
	</div>

	<section class="alive_opener">
		<article>
			<header class="website_title">
				<h1>ALIVE<br>TEXTILES</h2>
				</header>
			</article>
			<div class="arrow_to_scroll"></div>
		</section>

		<section class="container-fluid timeline">
			<div class="row timeline_secure_background">
				<div class="col-6 secure_event_background"></div>
				<div class="col-6 secure_ongoing_background"></div>
			</div>
			<article class="row timeline_row">
				<?php $args = array(
					'post_type' => 'timeline',
					'post_status' => 'publish',
					'order' => 'ASC',
					'orderby' => 'meta_value',
					'posts_per_page' => -1,
					'meta_query' => array(
						array(
							'key' => 'event_date',
							'compare' => '>=',
							'value' =>date('d/m/Y'),
						)
					),
					'meta_key' => 'event_date',
					'meta_type' => 'DATE'
				);
				$event = new WP_Query( $args );

				if($event->have_posts() ) : while ( $event->have_posts() ) : $event->the_post();
				$cat = get_the_category();
				?>
				<div class="col-12">
					<div class="row">
						<div class="r_d"></div>
						<div class="col-6 column_event_background"></div>
						<div class="col-6 column_ongoing_background"></div>
					</div>
					<div class="row collapse">
						<?php
						$event_type = get_field('event_type');
						//echo $event_type[0];
						if ($event_type[0] === "ongoing"):
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
						<?php elseif ($event_type[0] === "event"):?>
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

</main>
<?php get_footer(); ?>
