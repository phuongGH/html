// menu auto dropdown when hover 
$(function(){
	$('ul.nav li.dropdown').hover(function() {
		$(this).addClass('oppen');
		$('.dropdown-menu', this).fadeIn();	
	}, function() {
		$(this).removeClass('oppen');
		$('.dropdown-menu', this).fadeOut('fast');
	});
});
// show calender
// $(function () {
//     $('#btn-calendar').datetimepicker();
// });



 $( "#btn-calendar" ).datepicker({
    changeMonth: true,
    changeYear: true,
}); 

