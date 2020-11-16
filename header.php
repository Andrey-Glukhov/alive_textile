<!doctype html>
<html>
<head>
  <meta charset="utf-8" name="viewport" content="width=device-width, initial-scale=1" >
  <meta name="keywords" content="alive textiles" />
  <meta name="description" content="alive textiles" />

  <title>alive textiles</title>

  <link href="https://fonts.googleapis.com/css2?family=Bitter:ital,wght@0,100;0,400;0,500;0,700;0,900;1,100;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet">
  <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossorigin="anonymous">

  <script
  src="https://code.jquery.com/jquery-2.2.4.min.js"
  integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44="
  crossorigin="anonymous"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>


  <!-- ScrollMagic -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.7/ScrollMagic.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.7/plugins/debug.addIndicators.min.js"></script>
  <!-- GreenSock TweenMax -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.18.2/TweenMax.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.2.0/gsap.min.js"></script>
  <!-- ScrollMagic GreenSock Plugin -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.5/plugins/animation.gsap.js"></script>
<!-- barba -->
  <script src="https://cdn.jsdelivr.net/npm/@barba/core"></script>

  <?php wp_head(); ?>
</head>

<?php
if(is_front_page()):
  $moon_classes = array('alive_front_class', 'front_class');
else:
  $moon_classes = array('no_alive_front_class');
endif;
?>
<body data-barba="wrapper" <?php body_class($mavis_classes); ?>>
  <header>
  <?php include (TEMPLATEPATH . '/navigation.php'); ?>
	</header>
