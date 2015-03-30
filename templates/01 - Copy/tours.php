<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="icon" href="icon/favicon.ico">
    <title>First Template</title>
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="css/jquery-ui.min.css" rel="stylesheet">
    <link href="css/style.css" rel="stylesheet">
  </head>
  <body>
    <?php 
        include "components/header.php";
    ?>
        <ol class="breadcrumb">
          <li><a href="index.php">Trang chủ</a></li>
          <!-- <li><a href="#">Library</a></li> -->
          <li class="active">Tours</li>
        </ol>
    <?php
        include "components/content.php";
        include "components/footer.php";
        include "book.php";
    ?>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
    <script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.9.2/jquery-ui.min.js"></script>
    <!-- <script src="js/bootstrap-datetimepicker.js"></script> -->
    <script src="js/bootstrap.min.js"></script>
    <script src="js/main.js"></script>
  </body>
</html>