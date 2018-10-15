<div class="footer-wrapper">
	<footer class="footer"></footer>
</div>
</div>
<!-- end footer-wrapper -->
<!-- end container -->

<!-- SCRIPT -->
<script src="/shared/js/lib/jquery-3.2.1.min.js"></script>
<script src="/shared/js/lib/underscore-min.js"></script>
<script src="/shared/js/lib/d3.min.js"></script>
<script src="/shared/js/lib/three.min.js"></script>
<?php
//ページ独自のjsファイル読み込み
foreach ($siteSetting['js'] as $value) {
    echo '<script src="'. $value . '" /></script>' . "\n";
}
?>

</body>
</html>