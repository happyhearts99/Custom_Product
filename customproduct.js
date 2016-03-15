String.prototype.replaceAt=function(index, char) {
  return this.substr(0, index) + char + this.substr(index+char.length);
}



$(document).ready(function(e) {

(function ($) {
$.fn.vAlign = function() {
	return this.each(function(i){
	
	var h = $(this).height();
	var oh = $(this).outerHeight();
	var mt = (h + (oh - h)) / 2;	
	$(this).css("margin-top", "-" + mt + "px");	
	$(this).css("top", "50%");
	$(this).css("position", "absolute");	
	});	
};
})(jQuery);

//$("#custom-product-images .nameplate-sample .image-and-measurements").vAlign();


var customImageContainers = $("#custom-product-images .nameplate-sample .image-and-measurements");

function centerProductImages(customImageContainers){
	
	$(customImageContainers).each(function(){
	
	var customImageContainersChild = $(this).find(".nameplate-image");
	var customImageContainersChildWidth = $(this).find(".nameplate-image").outerWidth() + 100;
	$(this).width(customImageContainersChildWidth);
	var customImageContainersParent = $(this).parent("#custom-product-images .nameplate-sample");
		
		$(this).position({
		my: "center",
		at: "center",
		of: customImageContainersParent
		});
	 
	
	});

}

centerProductImages(customImageContainers);


function setSizeToWIndow() {
	var windowSize = $(window).width();
	$("#custom-product-images").width(windowSize);
} 

setSizeToWIndow(); 



//Start tabbed navigation

$("#product-options-navigation ul.tabs").tabs("div#product-options-tab-container > section", {
 effect: 'fade'
	
});


//This function slides to currently selected nameplate
$("#custom-product-images").scrollable({

	items: "#scroll-wrapper",
	easing: "swing"

});
//Set up scroller api so we can control it from the nameplate selector;

var scroller_api = $("#custom-product-images").data("scrollable");

//Scroll to selected default when page loads
function scrollToOnLoad() {

	var currentlySelected = $("#nameplate-selector").attr("selectedIndex");
	var hiddenCustomDataContainer = $("#nameplate-selector").val();
	var selectedNameplate = $("div#" + hiddenCustomDataContainer +"").parent(".nameplate-sample");
	$(selectedNameplate).addClass("selected");
	scroller_api.seekTo(currentlySelected, 400);
	var selectedNameplatePosition = $(selectedNameplate).width();
	$("#product-specification").offset({left: selectedNameplatePosition});
	$("#product-specification").fadeIn("fast");

}

scrollToOnLoad();

/* !Namplate Selector */
//This builds line entry container when new plate size is selected.
$("#nameplate-selector").bind('load.text-limit-and-prices', function(){
	var currentlySelected = $(this).attr("selectedIndex");
	
	//Calls scrollable .api and shifts to selected Nameplate image.
	
	scroller_api.seekTo(currentlySelected, 400);
	
	//Use this varible to find hidden line/text limits
	var hiddenCustomDataContainer = $(this).val();
	var selectedNameplate = $("div#" + hiddenCustomDataContainer +"").parent(".nameplate-sample");
	hiddenCustomDataContainer = $("div#" + hiddenCustomDataContainer + ".product-data");
	var customNameplatePreviews = $("#custom-product-images .nameplate-sample").removeClass("selected");
	$(selectedNameplate).addClass("selected");
	$("#product-specification").fadeOut("fast");
	
	scroller_api.onSeek(function(){
	var selectedNameplatePosition = $(selectedNameplate).width();
	$("#product-specification").offset({left: selectedNameplatePosition});
	$("#product-specification").fadeIn("fast");
	});
	
	
	
	
	var namePlateTextLimits = $(hiddenCustomDataContainer).find("ul.availible-text-sizes li");
	var namePlateMountingOptions = $(hiddenCustomDataContainer).find("ul.availible-mounting-options li");
	var materialCodes = $(hiddenCustomDataContainer).find("ul.product-pricing");
	var materialCodeSelect = $("#material_thickness");
	
	changeMaterialCodeValue(materialCodes,materialCodeSelect);
	var globalProductAttributesContainer = $("#custom-product-images");
	//Load new mounting options menu
	loadMountingOptions(namePlateMountingOptions,globalProductAttributesContainer);
	var newSelectOptions = "";
	//Create a new select menu to insert into the lineContainers
	$(namePlateTextLimits).each(function(index){
	var textSize = $(this).find("span").html();
	var maxCharUpper = $(this).data("max-char-upper");
	var maxCharMixed = $(this).data("max-char-mixed");
	//Create a new select menu based on nameplate size
	newSelectOptions += "<option value="+ textSize +" title="+ textSize +" data-max-char-upper="+maxCharUpper+" data-max-char-mixed="+maxCharMixed+">"+ textSize +"</option>"
});			
	
	//Create an array of the lines already on the page
var lineContainers = $("div.line-containers div.custom-text");
	
	$(lineContainers).each(function(index){
		
		var currentLineContainer = $(this);
		var lineContainersTextSize = $(this).find("div.text-size");
		var currentSelectMenu = $(lineContainersTextSize).find("select.select-text-size");
		var currentSelectMenuSelected = $(currentSelectMenu).attr("selectedIndex");
		
		$(currentSelectMenu).remove();
		
		$(lineContainersTextSize).append('<select id="" name="select-text-size" class="select-text-size">'+ newSelectOptions +'</select>').find("select").attr("selectedIndex", currentSelectMenuSelected);
		
		var newSelectMenu = $(lineContainersTextSize).find("select.select-text-size");
		initializeTextSizeSkuSwitch(newSelectMenu,currentLineContainer,customNameplatePreviews);
		
		var upperLimitContainer = $(this).find("span.max-char-upper");
		var mixedLimitContainer = $(this).find("span.max-char-mixed");
	
	});
	

});

$("#nameplate-selector").change(function(){
	
	$(this).trigger('load.text-limit-and-prices');

});
	
function changeMaterialCodeValue(materialCodes,materialCodeSelect) {
	$(materialCodes).each(function(i){
		var materialCodeNumber = $(this).data("product-material-code");
		var materialCodeTitle = $(this).data("product-material-code-title");
		var materialCodeSelectOptions = $(materialCodeSelect).find("option");
			
			$(materialCodeSelectOptions).each(function(i){
				var currentOption = $(this).text();
				
				if (materialCodeTitle === currentOption) {
					$(this).val(materialCodeNumber);
					
				}
				
			});
		
	});
}

//Product Specification Tooltips 




//Initialize

function loadMountingOptions(namePlateMountingOptions,customNameplateGlobalContainer) {

//Clear select mounting options
var currentSelectMenu = $("#select_mounting_options");
var currentSelectMenuIndex = $(currentSelectMenu).val();
var currentSelectFallBack = $(currentSelectMenu).find("option:first").val()
var currentSelectMenuContainer = $("#mounting-options");	
var newSelectOptions = "";
var hasMatch = false;
	
	$(namePlateMountingOptions).each(function(){
	var mountingOption = $(this).find("span").html();
	
	
	if (mountingOption == currentSelectMenuIndex){
			newSelectOptions += "<option value='"+ mountingOption +"' title='"+ mountingOption +"' selected='selected'>"+ mountingOption +"</option>"
			currentSelectMenuIndex = mountingOption;
			hasMatch = true;
			
			
	} else {
	
		newSelectOptions += "<option value='"+ mountingOption +"' title='"+ mountingOption +"'>"+ mountingOption +"</option>"
		
	}
	
	
	});
	
$(currentSelectMenu).remove();

currentSelectMenu = $(currentSelectMenuContainer).append('<select id="select_mounting_options" name="select-text-size" class="select-text-size">'+ newSelectOptions +'</select>');

currentSelectMenu = $(currentSelectMenu).find("#select_mounting_options");

if (hasMatch === true){
	$(currentSelectMenu).val(currentSelectMenuIndex);
	
} else {
$(currentSelectMenu).val(currentSelectFallBack);
	
}


changeMountingOptions(currentSelectMenu,customNameplateGlobalContainer);
$(customNameplateGlobalContainer).trigger('change-nameplates.mounting-options');
}

function changeColor(globalProductAttributesContainer, productColor, productType, productMounting) {
	
	$("#custom-product-images").bind('change-nameplates.colors', function(){
			
			$(globalProductAttributesContainer).attr('class', productType + " " + productColor + " " + productMounting).fadeIn("fast");
			
			$(this).data("product-type",productType);
			$(this).data("product-color", productColor);
	
	});

//Triggered when page loads
$("#custom-product-images").trigger("change-nameplates.colors");

//Triggered when new color is selected 

}




$("#custom-product-selection #nameplate_color").change(function(){
	var globalProductAttributesContainer = $("#custom-product-images");
	var selectedColor = $(this).find("option:selected").val();
	var selectedColor = selectedColor.split("/")[0].replace(/\//,"");
	selectedColor = selectedColor.toLowerCase();
	
	var productType = $(globalProductAttributesContainer).data("product_type");
	var productMounting = $(globalProductAttributesContainer).data("product-mounting");
	productMounting = "mo_" + productMounting.replace("&","and").replace(/\s+/g,"_").toLowerCase();
	changeColor(globalProductAttributesContainer, selectedColor, productType, productMounting);
	$("#custom-product-images").trigger("change-nameplates.colors");
});


function changeMountingOptions(currentSelectMenu,globalProductAttributesContainer) {


	$(globalProductAttributesContainer).bind('change-nameplates.mounting-options', function(){
		
		var productColor = $(globalProductAttributesContainer).data("product-color");
		var productType = $(globalProductAttributesContainer).data("product-type");
		var productMounting = $(currentSelectMenu).val();
		var productMountingClass = "mo_" + productMounting.replace("&","and").replace(/\s+/g,"_").toLowerCase();
			
			$(globalProductAttributesContainer).attr('class', productType + " " + productColor + " " + productMountingClass).fadeIn("fast");
		
		$(globalProductAttributesContainer).data("product-mounting", productMounting);			
	
	});
	
	$(currentSelectMenu).change(function(){
	
		$(globalProductAttributesContainer).trigger('change-nameplates.mounting-options');
	
	});
	
	

}

//This function changes text limitations based on text size
function changeTextSize(textSizeSelect,customNameplatePreviews){
	$(textSizeSelect).bind('change-size.text-size', function(){
		var currentLineContainer = $(this).parents("div.custom-text");
		$(currentLineContainer).addClass("current-line");
		var maxCharUpper = $(textSizeSelect).find("option:selected").data("max-char-upper");
		var maxCharMixed = $(textSizeSelect).find("option:selected").data("max-char-mixed");
		var upperLimitContainer = $(currentLineContainer).find("span.max-char-upper");
		var mixedLimitContainer = $(currentLineContainer).find("span.max-char-mixed");

		$(upperLimitContainer).html(maxCharUpper);
		$(mixedLimitContainer).html(maxCharMixed);
		var textLine = $(currentLineContainer).find("input.text-line");
		var currentLineContainerId = $(textLine).attr("id");
		var associatedParagraph = "."+currentLineContainerId;
		
		$(textLine).data("max-char-upper", maxCharUpper).data("max-char-mixed", maxCharMixed);
		var sizeToSet = $(this).val()
		sizeToSet = "ts_" + sizeToSet.replace(/\//g, '_').replace(/\"/g, '').replace(/\./g, '_');
		$(currentLineContainer).data("current-text-size", sizeToSet);	
			$(customNameplatePreviews).each(function(index){
				var paragraphToChange = $(this).find(associatedParagraph);
				var lineNumber = $(paragraphToChange).data("line-number");
				var textOrientation = $(paragraphToChange).data("text_orientation");
				
				$(paragraphToChange).fadeOut("fast").data("current-text-size", sizeToSet);						
				var textSizeClass = $(paragraphToChange).data("current-text-size");
				$(paragraphToChange).attr('class', lineNumber + " " + textSizeClass + " " + textOrientation).fadeIn("fast");
			});
		changeTextInputs(maxCharUpper,maxCharMixed,currentLineContainer,upperLimitContainer,mixedLimitContainer);		
});

$(textSizeSelect).change(function(){
	$(this).trigger('change-size.text-size');
});
}


function initializeTextSizeSkuSwitch(textSizeSelect,currentLineContainer,customNameplatePreviews) {
	//Set minimuns based on chosen nameplate size
		var maxCharUpper = $(textSizeSelect).find("option:selected").data("max-char-upper");
		var maxCharMixed = $(textSizeSelect).find("option:selected").data("max-char-mixed");
		var upperLimitContainer = $(currentLineContainer).find("span.max-char-upper");
		var mixedLimitContainer = $(currentLineContainer).find("span.max-char-mixed");
		$(upperLimitContainer).html(maxCharUpper);
		$(mixedLimitContainer).html(maxCharMixed);
		var textLine = $(currentLineContainer).find("input.text-line");
		$(textLine).data("max-char-upper", maxCharUpper).data("max-char-mixed", maxCharMixed);
	
	//Bind "change" event to newly generated menu
		changeTextSize(textSizeSelect,customNameplatePreviews);
}



function monitorCharCount(previewLinesToChange,currentLineContainer,maxCharUpper,maxCharMixed,theLine) {
	$(theLine).bind('update-char-count', function(event){
			
			var currentText = $(this).val();
			$(previewLinesToChange).each(function(){
				$(this).html(currentText);
			});
			
			//var currentLineContainer = $(this).closest("div.custom-text");
			var upperLimitContainer = $(currentLineContainer).find("span.max-char-upper");
			var mixedLimitContainer = $(currentLineContainer).find("span.max-char-mixed");
	
			//Detect Upper and Lowercase characters 
			if ( currentText.toUpperCase() === currentText && currentText.toLowerCase() !== currentText ) {
				
				$(mixedLimitContainer).parents("p").removeClass("monitor-this-limit");		
				$(upperLimitContainer).parents("p").addClass("monitor-this-limit");
				
				activateCharCount(maxCharUpper,theLine);
			}
			else if ( currentText.toUpperCase() !== currentText) {
				$(upperLimitContainer).parents("p").removeClass("monitor-this-limit");
				$(mixedLimitContainer).parents("p").addClass("monitor-this-limit");
				
				activateCharCount(maxCharMixed,theLine);
	
			return false;
			}
		
	});

$(theLine).keyup(function(){
	$(this).trigger('update-char-count');
	
});

};

function activateCharCount(max_recommended_text,theLine) {

$(theLine).NobleCount('div.current-line span.current-char',{
		max_chars: max_recommended_text,
		on_negative: 'go_red',
		on_positive: 'go_green',
		block_negative: false
	});

}
	
function changeTextInputs(theLine) {

	theLine = $(theLine).find("input.text-line");

	$(theLine).bind('start-char-monitoring', function(){
		var currentLineContainer = $(this).closest("div.custom-text");
		lineId = $(this).attr("id");
		lineId = "." + lineId;
		var maxCharUpper = $(this).data("max-char-upper");
		var maxCharMixed = $(this).data("max-char-mixed"); 
		var previewLinesToChange = $("#custom-product-images .nameplate-sample p"+lineId+"");
		$(currentLineContainer).addClass("current-line");
		monitorCharCount(previewLinesToChange,currentLineContainer,maxCharUpper,maxCharMixed,theLine);

	
});

$(theLine).bind('end-char-monitoring' ,function() {
	var currentLineContainer = $(this).closest("div.custom-text");
	$(currentLineContainer).removeClass("current-line");
});


$(theLine).focus(function(){
	$(this).trigger('start-char-monitoring');
});

$(theLine).blur(function(){
	$(this).trigger('end-char-monitoring');
});

} 	


function changeTextOrientation(orientationChanger,associatedParagraph) {

	$(orientationChanger).bind('change-line-orientation', function(){
		var newOrientation = $(this).val();
		$(associatedParagraph).data("text_orientation", newOrientation);
		var lineNumber = $(associatedParagraph).data("line-number");
		var textSize = $(associatedParagraph).data("current-text-size");
		$(associatedParagraph).fadeOut("fast");
		$(associatedParagraph).attr('class', lineNumber + " " + textSize + " " + newOrientation ).fadeIn("fast");
	});	

	$(orientationChanger).click(function(){
		$(this).trigger('change-line-orientation');
	});

};



function addALine(customNameplatePreviews,addALineButton) {
$(addALineButton).bind('add_line', function(e){
	var lineToDuplicate = $(this).closest("div.custom-text");
	var currentTextSize = $(lineToDuplicate).find("select.select-text-size").val();
	currentTextSize = "ts_" + currentTextSize.replace(/\//g, '_').replace(/\"/g, '').replace(/\./g, '_');
	var lineToDuplicateTextInput = $(lineToDuplicate).find("input.text-line");
	var lineContainers = $("div.line-containers");
	var linesAlreadyonPage = $("div.line-containers div.custom-text").length;
	var newId = linesAlreadyonPage + 1;
	var newTextOrientationName = "text-orientation_" + newId;
	var newTextId = "line_"+ newId;
	newId = "line-"+ newId + "-container";
	var maxCharUpper = $(lineToDuplicateTextInput).data("max-char-upper");
	var maxCharMixed = $(lineToDuplicateTextInput).data("max-char-mixed"); 
	var duplicateLine = $(lineToDuplicate).clone().appendTo(lineContainers).attr("id",newId).find("input.text-line").removeClass("current-line").attr("id",newTextId).attr("name",newTextId);
	
	var duplicateLine = $(lineContainers).find("div#"+newId);
	$(duplicateLine).data("current-text-size", currentTextSize);
	$(duplicateLine).data("line-number", newTextId);
	var duplicateLineAddButton = $(duplicateLine).find("a.add_line");
	var duplicateLineText = $(duplicateLine).find("input.text-line");
	 $(duplicateLineText).val("");
	var duplicateLineSelect = $(duplicateLine).find(".select-text-size");
	var duplicateTextOrientation = $(duplicateLine).find(".text_orientation input");
	$(duplicateTextOrientation).attr("name",newTextOrientationName);	
	$(duplicateLineText).data("max-char-upper", maxCharUpper);
	$(duplicateLineText).data("max-char-mixed", maxCharMixed);
	
	changeTextInputs(duplicateLine);
	addALine(customNameplatePreviews,duplicateLineAddButton);
	changeTextSize(duplicateLineSelect,customNameplatePreviews);
	
	var associatedParagraph = $("<p></p>").appendTo(customNameplatePreviews).addClass(newTextId).addClass(currentTextSize).data("current-text-size", currentTextSize).data("line-number", newTextId);
	
	changeTextOrientation(duplicateTextOrientation,associatedParagraph);
	removeLine(customNameplatePreviews);
	$(this).fadeOut("fast");

});

$(addALineButton).click(function(e){
	$(this).trigger('add_line');
	e.preventDefault();
	
});
	
};	


function removeLine(customNameplatePreviews){

	$("a.delete_line").bind('remove_line', function(e){
		var lineToDelete = $(this).closest("div.custom-text");
		var previewLineToDelete = $(lineToDelete).find("div.legend-input input.text-line").attr("id");
		previewLineToDelete = $(customNameplatePreviews).find("p." + previewLineToDelete);
		$(previewLineToDelete).fadeOut("fast").remove();
		$(lineToDelete).fadeOut("fast");
		var linesToReset = $(this).closest("div.line-containers").find("div.custom-text").not(lineToDelete);
		$(linesToReset).each(function(index){
			var newCount = index + 1;
			var textInputtoChange = $(this).find("div.legend-input input.text-line");
			newTextid = "line_" + newCount;
			newCount = "line-"+ newCount +"-container";
			$(textInputtoChange).attr("id",newTextid).attr("name",newTextid);
			$(this).attr("id", newCount);
			
		});
		
		$(lineToDelete).remove();
		
	});
	
	$("a.delete_line").click(function(e){
		$(this).trigger('remove_line');
	});

}


function setupPricing(productPricing,customNameplatePreviewContainer){
	$(productPricing).each(function(){
		//Grab Prices
		var quanityPricing = $(this).find("li");
		var materialCode = "mc_" + $(this).data("product-material-code");
		
		var pricingSpan = $("<span id='"+ materialCode +"'></span>").appendTo(customNameplatePreviewContainer);
		

		var prices = {};
		//Loop through prices
		$(quanityPricing).each(function(i){
			
			var quanityBreak = $(this).find("span").html(); 
			var quanityPricing = $(this).data("price");
			
			quanityPricing = quanityPricing.toFixed(2);
			var pricing_tier =  "pricing_tier_" + i;
		
			prices[pricing_tier] = {
			quanity_break: quanityBreak, 
			quanity_price: quanityPricing
			};
			//quanityBreak,quanityPricing
			
			//prices.push(pricing_tier);
			
		});
		
	
		$(pricingSpan).data(prices);
});	
}

function loadPricing(selectedNameplate){
	//This will load pricing into the product specification div 
	var specificationContainer = $("#product-specifications");
	selectedNameplate = $(selectedNameplate).parents(".nameplate-sample");
	//Find current material code
	var selectedMaterialCodePrices = $("#material_thickness").val();
	 	selectedMaterialCodePrices = "#mc_" + selectedMaterialCodePrices;
	 	selectedMaterialCodePrices = $(selectedNameplate).find(selectedMaterialCodePrices).data();
		var selectedPriceDisplay = [];
		
	 	$.each(selectedMaterialCodePrices, function(i){
	 	
	 	selectedPriceDisplay.push(this.quanity_break, this.quanity_price);
			
	 });
	 console.log(selectedPriceDisplay);
	 $("#product-quanity-template").tmpl(selectedPriceDisplay).appendTo("#product-specification table");
	//Build a table from the prices
	$(specificationContainer).bind('show-current-price', function(){
	
	
	
	});
	
}

//Show Current Pricing

function initializeTool(){
	//Set Defaults

	var defaultNameplate = $("#nameplate-selector option:selected").val();
	defaultNameplate  = $("div#" + defaultNameplate + ".product-data");
	var namePlateTextLimits = $(defaultNameplate).find("ul.availible-text-sizes li");
	var allLineContainer = $("#custom-product-selection div.custom-text");
	var customNameplatePreviews = $("#custom-product-images .nameplate-sample .nameplate-image");
	var globalProductAttributesContainer =  $("#custom-product-images");
	var productColor = $(globalProductAttributesContainer).data("product-color");
	var productType = $(globalProductAttributesContainer).data("product-type");
	var productMounting = $(globalProductAttributesContainer).data("product-mounting");
	var productMountingSelect = $("#select_mounting_options");
	var maxCharUpper = "";
	var maxCharMixed = "";
	
	changeColor(globalProductAttributesContainer, productColor, productType);
	
	$(customNameplatePreviews).each(function(index){ 
		
			var customNameplatePreviewContainer = $(this).parents(".nameplate-sample");
			var productSize = $(customNameplatePreviewContainer).find("ul.product-sizes li span").html();
			
			productSize = productSize.replace(/\"/g, '');
			productSize = productSize.split("x");
			var productWidth = productSize[0];
			var productHeight = productSize[1];
			$(customNameplatePreviewContainer).find(".np-height span").html(productHeight);
			$(customNameplatePreviewContainer).find(".np-width span").html(productWidth);
			

			//Store Pricing Data inside of each preview container for access later
			var productPricing = $(customNameplatePreviewContainer).find("ul.product-pricing");
			/* !Put Setup Pricing Function Here*/
			setupPricing(productPricing,customNameplatePreviewContainer);
	});

	$(allLineContainer).each(function(index){
		var currentTextSize = $(this).find(".select-text-size option:selected").val();
		var textSizeSelect = $(this).find(".select-text-size");	
		var textLine = $(this).find("input.text-line");
		var orientationChanger = $(this).find(".text_orientation input");
		var orientationValue = $(orientationChanger).val();
		var currentLineContainerId = $(textLine).attr("id");
		var associatedParagraph = "."+currentLineContainerId;
		var upperLimitContainer = $(this).find("span.max-char-upper");
		var mixedLimitContainer = $(this).find("span.max-char-mixed");
		currentTextSize = "ts_" + currentTextSize.replace(/\//g, '_').replace(/\"/g, '').replace(/\./g, '_');
		$(this).data("current-text-size", currentTextSize);
		$(this).data("line-number", currentLineContainerId);
			
		$(customNameplatePreviews).each(function(index){
			var paragraphToChange = $(this).find("."+currentTextSize);
		
			
			
			$(associatedParagraph).addClass(currentTextSize).addClass(orientationValue).data("current-text-size", currentTextSize);
			$(associatedParagraph).data("line-number", currentLineContainerId);
			$(associatedParagraph).data("text_orientation", orientationValue);
		});
		
		associatedParagraph = $(customNameplatePreviews).find(associatedParagraph);
		var limitsForThisLine = $(defaultNameplate).find(currentTextSize);
		var maxCharUpper = $(limitsForThisLine).data("max-char-upper");
		var maxCharMixed = $(limitsForThisLine).data("max-char-mixed");
		var addALineButton = $(this).find("a.add_line");
		upperLimitContainer.html(maxCharUpper);
		mixedLimitContainer.html(maxCharMixed);
		
		$(textLine).data("max-char-upper", maxCharUpper)
		$(textLine).data("max-char-mixed", maxCharMixed);
		
		loadPricing(defaultNameplate);
		changeMountingOptions(productMountingSelect,globalProductAttributesContainer);
		changeTextInputs($(this));
		addALine(customNameplatePreviews,addALineButton);
		changeTextSize(textSizeSelect,customNameplatePreviews);
		changeTextOrientation(orientationChanger,associatedParagraph);
		
		
	});
	
	//This function rebinds change-text-size event. 
	
	
	
	

};

initializeTool();

});

