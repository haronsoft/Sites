/*“use strict” mode on*/
"use strict";

$(document).ready(function() {
	
	
	 /////////////////////////////////////////////////////////////////
    // LOADER
    /////////////////////////////////////////////////////////////////




    // Page transition
    $('.main-menu a').on('click', function(e) {
        $('#page-preloader').fadeIn('slow');
    });


    // Transition delay
    $('.main-menu  a').click(function(e) {
        e.preventDefault();
        var goTo = this.getAttribute("href");
        setTimeout(function() {
            window.location = goTo;
        }, 500);
    });



    var $preloader = $('#page-preloader'),
        $spinner = $preloader.find('.spinner-loader');
    $spinner.fadeOut();
    $preloader.delay(1500).fadeOut('slow');


	
	/*=== Grid ====*/
	$('.pix_row').each(function (i){
		if($(this).find('.pix-item.y2').length != 0){
			$(this).addClass('height-y2');
		}
	});
	
	/*=== Main slider ====*/
	$( '#my-slider' ).sliderPro({
		width: 1170,
		height: 463,
		arrows: false,
		buttons: false,
		fade: true,
		waitForLayers: true,
		thumbnailPointer: false,
		autoplay: true,
		waitForLayers: true,
		touchSwipe: false,
		autoScaleLayers: false
	});
	
	var mainSlider = $('#my-slider').data('sliderPro');
	
	/*=== Main slider prev button ====*/
	$('.main-slider-prev').on('click', function () {
		mainSlider.previousSlide();
		return false;
	});
	
	/*=== Main slider next button ====*/
	$('.main-slider-next').on('click', function () {
		mainSlider.nextSlide();
		return false;
	});
	
	/*=== Hover masks ====*/
	$(".hover-mask").each(function(i) {
		var $mask = $(this);
		var bckg = $mask.data('background');
		$(this).css("background-color",bckg);
	});
		
	$(".pix-item-wrap").each(function(i) {
		var $coloricon = $(this);
		var coloric = $coloricon.data('color');
		$(this).children('.pix-item-text').css("color",coloric);
		$(this).find('.border-bottom').css("border-color",coloric);
	});
	
	
	
	
	
	
	  /////////////////////////////////////
    //  Scroll Animation
    /////////////////////////////////////




	window.sr = ScrollReveal({
	mobile:true,
	reset:true
    }
	);
	
	sr.reveal('.scrollreveal');
	
	
	
	
	/*=== Owl gallery ====*/
	$(".enable-owl-carousel").each(function(i) {
					
		var $owl = $(this);
						
		var navigationData = $owl.data('navigation');
		var paginationData = $owl.data('pagination');
		var singleItemData = $owl.data('single-item');
		var autoPlayData = $owl.data('auto-play');
		var transitionStyleData = $owl.data('transition-style');
		var mainSliderData = $owl.data('main-text-animation');
		var afterInitDelay = $owl.data('after-init-delay');
		var stopOnHoverData = $owl.data('stop-on-hover');
		var min600 = $owl.data('min600');
		var min800 = $owl.data('min800');
		var min1200 = $owl.data('min1200');
						
		$owl.owlCarousel({
			navigation : navigationData,
			pagination: paginationData,
			singleItem : singleItemData,
			autoPlay : autoPlayData,
			transitionStyle : transitionStyleData,
			stopOnHover: stopOnHoverData,
			navigationText : ["",""],
			itemsCustom:[
				[0, 1],
				[600, min600],
				[800, min800],
				[1200, min1200]
			],	
		});
	});
	
	/*=== Form validation ====*/
	$.validate();
	
	/*=== Vertical menu ====*/
	$('#left-menu').metisMenu({
		toggle: false // disable the auto collapse. Default: true.
	});
	
	 $.validate({
		form : '#contact-form',
		onSuccess : function($form) {
		  sendmail();
		},
	  });
	
});

/*=== Main menu ====*/
var trigger = $('.hamburger'),
overlay = $('.overlay'),
isClosed = false;

trigger.click(function () {
	hamburger_cross();      
});

/*=== Hamburger click function ====*/		
function hamburger_cross() {
		
	var windowWidth = $(window).width();
			
	if (isClosed == true){          
		overlay.hide();
		trigger.removeClass('is-open');
		trigger.addClass('is-closed');
		isClosed = false;
		if(windowWidth > 768){
			$('.hamburger').css('left', '100%');
			$('.main-menu>li').css('right', '-1000px');
		}else{
			$("#mobile-menu").css('left', '-290px');
			$("#black-overlay").css('opacity', '0');
			setTimeout(function() { 	
				$("#black-overlay").css('display', 'none');
			}, 300)
		}
	}else{   
		overlay.show();
		trigger.removeClass('is-closed');
		trigger.addClass('is-open');
		isClosed = true;
		if(windowWidth > 768){
			$('.hamburger').css('left', '-10px');
			var timeOut = 50;
			$('.main-menu>li').each(function(indx, element){
				setTimeout(function() { 	
					$(element).css('right', '0');	
				}, timeOut)
				timeOut += 50;
			});
		}else{
			$("#mobile-menu").css('left', '0');
			$("#black-overlay").css('display', 'block');
			$("#black-overlay").css('opacity', '1');
		}
	}
}

$('.zoom-img').magnificPopup({type:'image'});

/*=== Clock ====*/
setInterval( function() {
	var seconds = new Date().getSeconds();
	var sdegree = seconds * 6;
	var srotate = "rotate(" + sdegree + "deg)";
				  
	$("#sec").css({"-moz-transform" : srotate, "-webkit-transform" : srotate});
                  
}, 1000 );
              
         
setInterval( function() {
	var hours = new Date().getHours();
	var mins = new Date().getMinutes();
	var hdegree = hours * 30 + (mins / 2);
	var hrotate = "rotate(" + hdegree + "deg)";
				  
	$("#hour").css({"-moz-transform" : hrotate, "-webkit-transform" : hrotate});
					  
}, 1000 );
        
setInterval( function() {
	var mins = new Date().getMinutes();
	var mdegree = mins * 6;
	var mrotate = "rotate(" + mdegree + "deg)";

	$("#min").css({"-moz-transform" : mrotate, "-webkit-transform" : mrotate});

}, 1000 );

$(window).load(function() {
	
	/*=== Isotope portfolio ====*/
	
	var $container = $('.isotope-filter');

	$container.imagesLoaded(function() {
		$container.isotope({
			// options
			itemSelector: '.isotope-item'
		});
	});

	// filter items when filter link is clicked
	$('#filter a').click(function() {
		var selector = $(this).attr('data-filter');
		$container.isotope({
			filter: selector
		});
		$('#filter a').removeClass('current');
		$(this).addClass('current');
		return false;
	});

});


/*=== initializate google map ====*/

function initMap() {
	
	var styles = [
    {
        "featureType": "administrative",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "saturation": -100
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "saturation": -100
            },
            {
                "lightness": 40
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "saturation": -10
            },
            {
                "lightness": 30
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "saturation": -60
            },
            {
                "lightness": 10
            }
        ]
    },
    {
        "featureType": "landscape.natural",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "saturation": -60
            },
            {
                "lightness": 60
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            },
            {
                "saturation": -100
            },
            {
                "lightness": 60
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            },
            {
                "saturation": -100
            },
            {
                "lightness": 60
            }
        ]
    }
];

	
var myLatLng = {lat: 34.0522342, lng: -118.2436849};

// Create a map object and specify the DOM element for display.
var map = new google.maps.Map(document.getElementById('contact-map'), {
	center: myLatLng,
	scrollwheel: false,
	zoom: 15
});
	
map.setOptions({styles: styles});
	
var image = 'media/map/marker.png';
	
// Create a marker and set its position.
var marker = new google.maps.Marker({
	map: map,
	icon: image,
	position: myLatLng,
	title: 'OUR LOCATON!'
});
	
}

function sendmail() {

		var fields = $('#contact-form').serialize();
		$.ajax({
			type: 'POST',
			url: 'sendmail.php',
			data: fields,
			success: function(data) {
				$('.send-result').html(data);
			}
		});

}