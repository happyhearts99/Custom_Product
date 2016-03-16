$(document).ready(function () {
//from quote.js begin

//Extend Array object to add a function to remove items
	Array.prototype.removeByValue = function (val) {
		for (var i = 0; i < this.length; i++) {
			if (this[i] == val) {
				this.splice(i, 1);
				break;
			}
	}
}

//Check if navigation is in viewport 
$('#main-navigation-container').bind('inview', function (event, visible) {
	if (visible == true) {
		$("div#alert-and-alternate-shopping-cart").slideUp("fast");

	} else {
		$("div#alert-and-alternate-shopping-cart").slideDown("fast");
	}
});


jQuery.validator.setDefaults({ 

ignore: ".ignore",
messages: {
		company: { 
		
			required: "Please enter your company name" 		
		},
		
		first_name: { 
		
			required: "Please enter a first name" 		
		},
		
		last_name: { 
		
			required: "Please enter a last name" 		
		},
		
		phone_number: { 
		
			required: "Please enter a phone number" 		
		},
		
		address1: { 
		
			required: "Please enter an address" 		
		},
		
		state: { 
		
			required: "Please select a state" 		
		},

		zipcode: { 
		
			required: "Please enter an zip code" 		
		},
		
		country: { 
		
			required: "Please select a country" 		
		},
		
		saved_shipping_addresses: {
			required: "Please choose a shipping address"
			
		}


	}
});



//Simple Scrolling
$(".scroll").click(function(event){
		//prevent the default action for the click event
		event.preventDefault();

		//get the full url - like mysitecom/index.htm#home
		var full_url = this.href;

		//split the url by # and get the anchor target name - home in mysitecom/index.htm#home
		var parts = full_url.split("#");
		var trgt = parts[1];

		//get the top offset of the target anchor
		var target_offset = $("#"+trgt).offset();
		var target_top = target_offset.top;

		//goto that anchor by setting the body scroll top to anchor top
		$('html, body').animate({scrollTop:target_top}, 1000);
});


/*! Main Navigation */


$(".main-category").hoverIntent(

	function () {
		$(this).addClass("current").children(".drop-side").slideDown("fast");
		
	}, function () {

		$(this).removeClass("current").children(".drop-side").fadeOut("fast");

	});
	
	$(".sub-category").hoverIntent(

	function () {
		$(this).addClass("current").children(".drop-side").slideDown("fast");

	}, function () {

		$(this).removeClass("current").children(".drop-side").fadeOut("fast");

});
	//Prevent bubbling test 

	$("#expand_description").change(function()
	{
		var selectevalue=$($(this)).val();	
		var processv=$("#processfolder").val();
		$.get(processv, {'action':'11','q' : selectevalue},
			function(data)
			{
				$("#product_instruction").html(data);
				$("#submiterrormessage").html('');			
			});
	});	
//quickbuy.js start

	$("#product_customddl").change(function()
	{
		var selectevalue=$($(this)).val();	
		var processv=$("#processfolder").val();
		$.get(processv, {'action':'11','q' : selectevalue},
			function(data)
			{
				$("#product_instruction").html(data);
				$("#submiterrormessage").html('');			
			});
	});	

	$("#product_category").change(function()
	{
		var selectevalue=$($(this)).val();	
		var processv=$("#processfolder").val();
		$.get(processv, {'action':'2','q' : selectevalue},
			function(data)
			{
				$("#productresult").html(data);
			});
	});		

//quickbuy.js end

	//Apple Style MouseTooltip 

	function initiateMouseTip() {
		$('a[rel=mousetip]').mouseover(function (e) {

			var tip = $(this).attr('title');
			$(this).attr('title', '');
			var newMousetip = '<div class="mousetip"><p class="mousetipcopy">' + tip + ' </p></div>';
			$(this).append(newMousetip);
			$(".mousetip").css('top', e.pageY + 10);
			$(".mousetip").css('left', e.pageX + 20);

			$('.mousetip').fadeIn('500');
			$('.mousetip').fadeTo('10', 0.8);

		}).mousemove(function (e) {

			$(".mousetip").css('top', e.pageY + 10);
			$(".mousetip").css('left', e.pageX + 20);

		}).mouseout(function () {

			$(this).attr('title', $('.mousetipcopy').html());
			$(this).children('div.mousetip').remove();
		});
	}

	initiateMouseTip();

	/*!Product Detail Page Specifications Tab */

	$("span.tabs").tabs("#product-detail-specification-slider > section", {
		effect: 'fade',
		history: true,
		onClick: function () {
			$('#other-specifications').masonry({
				itemSelector: '.grid_4'
			})
		}
	});

	$("form.disable-enter").bind("keypress", function (e) {
		if (e.keyCode == 13) return false;
	});

	/* Masonry effect for Pipemarker upsells */
	$('#more-pipe-markers .product-list').masonry({

		itemSelector: '.pipemarker-upsell'

	});


	/* Custom Styled Select Menus */


//Form Focus
$("form :input").focus(function() {
  $("label[for='" + this.id + "']").addClass("labelfocus");
}).blur(function() {
  $("label").removeClass("labelfocus");
});



	
//Breadcrumb Meganavigation
$(".open-dropdown").click(function () {
	$("#product-navigation").slideDown('fast');

});

	//Expand Collapse
	$(".collapse-trigger").click(function () {
		$(this).children(".expand-container").slideToggle('fast');
	});


/*!Rep Account Managment Tabs */

});
