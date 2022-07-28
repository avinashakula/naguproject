/* FunFact Carousel */
$(document).ready(function(){
    var owl = $('.facts-carousel');
		owl.owlCarousel({
			touchDrag: true,
			mouseDrag: true,
			items:1,
			dots:true,
			autoHeight:false,
			margin: 20,
			nav:true,
			navText: [
			'<span aria-label="' + 'prev' + '"><i class="icon icon-arrow-left"></i></span>',
			'<span aria-label="' + 'next' + '"><i class="icon icon-arrow-right"></i></span>'
		],
		});		
	});

function val() {
  d = document.getElementById("select_id").value;
  $('.select-span').html(d);
}



 /*TABS SCRIPT*/
$(document).ready(function(){
 (function() {
   if($('.content-tabs').length || $('.aside-tabs').length) {
	var $contentTabs  = $('.content-tabs'),
		$asideTabs    = $('.aside-tabs');
		$.fn.tabs     = function($obj) {
		$tabsNavLis = $obj.find('.tabs-nav').children('li'),
		$tabContent = $obj.find('.tab-content');
		$tabsNavLis.first().children().addClass('active').show();
		$tabContent.first().show();
		$obj.find('ul.tabs-nav li a').on('click', function(e) {
		var $this = $(this);
		$obj.find('ul.tabs-nav li a').removeClass('active');
		$this.addClass('active');
		$obj.find('.tab-content').hide();
		$($this.attr('href')).fadeIn();
		e.preventDefault();
	  });
	 }
		$contentTabs.tabs($contentTabs);
		$asideTabs.tabs($asideTabs);
		}
	  })
   ();
});


/*Accordin TABS SCRIPT*/
(function($) {
$( document ).ready(function() {
$(".add-accordin > li > a").on("click", function(){
  var element = $(this).parent("li");
  if (element.hasClass("open")) {
   element.removeClass("open");
   element.find("li").removeClass("open");
   element.find(".accordin-content").slideUp();
  }
  else {
   element.addClass("open");
   element.children(".accordin-content").slideDown();
   element.siblings("li").children(".accordin-content").slideUp();
   element.siblings("li").removeClass('open');
   element.siblings("li").find("li").removeClass('open');
   element.siblings("li").find(".accordin-content").slideUp();
  }  
 });
});
} )( $ );	



///Modal JS
$(document).on( "click", ".modal-overlay, .close-btn, .modal-close", function() {
	$(this).closest('.modal').fadeToggle('');
	$('body').removeClass('show-modal');	
});


$(document).on( "click", ".faq-btn", function() {
	$('.faq-modal').fadeToggle();
	$('body').toggleClass('show-modal');
});



$(function() {
    $('.select-label').on('click', function() {
        $(this).siblings('.select-drop').slideToggle();
        $(this).toggleClass('select-drop-active');
    });
});
$(document).on("click", ".select-drop li", function() {
    $(this).closest('.select-box').find('.select-label .select-option').html($(this).html());
    $(this).closest('.select-drop').slideToggle();
    $('.select-label').removeClass('select-drop-active').addClass('selected-option');
	
});
const $menu = $('.select-box');
$(document).mouseup(e => {
    if (!$menu.is(e.target) && $menu.has(e.target).length === 0){
        $menu.children('.select-drop').slideUp();
        $('.select-label').removeClass('select-drop-active');
    }
});
