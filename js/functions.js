$(document).ready(function () {
	
	//change iframe content when sidebar link is clicked using its href
	$('.mainPage a, .sideBar a').on('click', function(event) {
		event.preventDefault();
		newUrl = $(this).attr('href');
		
		$(this).closest('li').addClass('active');		
		
		window.parent.pushUrl(newUrl);
		window.parent.highlightNav(newUrl);
		window.parent.changeIframe(newUrl);
		
	});

	$("input[type='text'].input-activeUrl").on("click", function () {
	   $(this).select();
	});
	
	$('.iphone').on('click', function(event) {
		event.preventDefault();
		$('iframe').toggleClass('iphone');
	});
	
});
function pushUrl(newUrl) {
	$('.input-activeUrl').attr('value', newUrl);
	$('.newWindow').attr('href', newUrl);
}
function changeIframe(newUrl) {
	$('iframe').attr('src', newUrl);
};

function highlightNav(newUrl) {
	$('.sideBar').find('li.active').removeClass('active');
	$('[href="' + newUrl + '"]').closest('li').addClass('active');
};