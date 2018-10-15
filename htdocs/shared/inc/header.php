<!DOCTYPE html>
<html lang="ja">
<head>
	<title><?php echo $siteSetting["title"]; ?> | Gl_template</title>

	<!-- META -->
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, user-scalable=no">
	<meta name="format-detection" content="telephone=no">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="robots" content="index,follow">
	<meta name="description" content="">
	<meta name="keywords" content="">

	<!-- OGP -->
	<meta property="og:title" content="<?php echo $siteSetting["title"]; ?> | gl_template">
	<meta property="og:type" content="website">
	<meta property="og:description" content="">
	<meta property="og:url" content="<?php echo (empty($_SERVER["HTTPS"]) ? "http://" : "https://") . $_SERVER["HTTP_HOST"] . $_SERVER["REQUEST_URI"]; ?>">
	<meta property="og:image" content="/og/og.jpg">
	<meta property="og:site_name" content="gl_template">
	<meta property="og:locale" content="ja_JP">

	<!-- CSS -->
	<link rel="shortcut icon" type="image/x-icon" href="/favicon.ico">
	<link rel="stylesheet" href="/shared/css/import.css">
	<?php
    //ページ独自のcssファイル読み込み
    foreach ($siteSetting['css'] as $value) {
        echo '<link rel="stylesheet" href="'. $value . '">' . "\n";
    }
    ?>
</head>

<body class="<?php echo $siteSetting["type"]; ?>">
<div class="container">
<div class="header-wrapper">
	<header class="header">
	</header>
</div>
<!-- end header-wrapper -->