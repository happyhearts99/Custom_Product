/* 
* Version: 1.0
* Requires: 
* Dependecies: jQuery 1.4+
* 
*/

pipemarker_custom = {

	config : {
		baseurl: "/process/process_quickbuy.php?action=10&",
		category: "Custom",
		subcategory: "Custom",
		productno: "Custom",
		pid: "888",
		sh_id: "Insert"
	},
	
	popular_legend : {
	
		pipemarker_legends : {
			baseurl : "/process/productfilter.php'",
			category : "Pipe Markers",
			subcategory : "	EZ Pipe Markers"
		}
	
	},
	
	product_config_classes : {
		color: null,
		mounting_option: null,
		material_thickness: null,
		band: null,
		layout: null
	},
	
	product_config : {
		color: null,
		mounting_option: null,
		material_thickness: null,
		band: null,
		layout: null,
		stencil_text_size: null,
		legends: []
	},
	
	product_sku : {
		sku_id: null,
		minimum_qty: null
	},
	
	product_pricing : {},
	
	text_heights : {},		
	
	selected_product : {
		selected: null,
		product_text_height: 0,
		line_height: 0
	},
	common: {
	init: function(config) {
	  // application-wide code
	 $.extend(pipemarker_custom.config, config);
	},
	
	interaction : {
		focus_events : function($form_parent) {
			$form_parent.live("focusin",function(){
				$(this).addClass("focused");
			
			});
			
			$form_parent.live("focusout",function(){
				$(this).removeClass("focused");
			});
		}
	
	},
	
	buildUrl : function() {
		pipemarker_custom.config.category = $("input#category").val();
		pipemarker_custom.config.subcategory = $("input#subcategory").val();
		pipemarker_custom.config.productno = $("body").data("productno");
		pipemarker_custom.config.pid = $("body").data("pid");
		pipemarker_custom.config.sh_id = $("body").data("sh_id");
		
		var url = pipemarker_custom.config.baseurl + "category=" + pipemarker_custom.config.category + "&subcategory=" +  pipemarker_custom.config.subcategory + "&productno=" + pipemarker_custom.config.productno + "&pid=" + pipemarker_custom.config.pid + "&sh_id=" + pipemarker_custom.config.sh_id;
		
		return url
	},
	
	buildEditUrl : function(new_sh_id) {
		var url = pipemarker_custom.config.baseurl + "category=" + pipemarker_custom.config.category + "&subcategory=" +  pipemarker_custom.config.subcategory + "&productno=" + pipemarker_custom.config.productno + "&pid=" + pipemarker_custom.config.pid + "&sh_id=" + new_sh_id;
		
		return url
;	},
	
	buildLegendSearch : function() {
		
		var baseUrl = "/process/productfilter.php?";
		var category = "Pipe Markers";
		var subcategory = "EZ Pipe Markers";
		var url = baseUrl + "category=" + category + "&subcategory=" + subcategory;
		return url;
	},	
	
	update_legend_storage : function(legend){
	//Expects a string
		pipemarker_custom.product_config.legends.push(legend);
	},
	
	generate_random_legend : function() {
		legends = pipemarker_custom.product_config.legends;
		random_legend_index = [Math.floor(Math.random() * legends.length)];
		random_legend = legends[random_legend_index];
		return random_legend;
	},	
	
	centerProductImages: function($selector_to_center,$boundry_selector) {
		//position is dependent on jQuery U/I 1.7+
		$selector_to_center.position({
		my: "center",
		at: "center",
		of: $boundry_selector
		});
		
	},
	
	setUpTabbedNavigation : function($buttons, tabs) {

		$buttons.tabs(tabs, {
			effect: 'fade'
		});
			
	return $buttons.data("tabs");
	},
	
	set_up_tab_indexing : function($form_inputs,$last_input){
		var tabindex = 1;
		$form_inputs.each(function() {
			$(this).attr("tabindex", tabindex);
			tabindex++;
		});
		
		var lastIndex = tabindex + 1;
		
		$last_input.attr("tabindex",lastIndex);
		
	},
	
	setUpScroller : function($selector_to_bind) {
	
		$selector_to_bind.scrollable({
			items: "#scroll-wrapper",
			easing: "swing",
			speed: 200
		});
		
		var main_selector_api = $selector_to_bind.data("scrollable");
		return main_selector_api
	},
	
	showCurrentProduct : function(selectedProductIndex, scrollable_api) {
		var $productsInScroller = scrollable_api.getItems();
		$productsInScroller.removeClass("selected");
		$productsInScroller.eq(selectedProductIndex).addClass("selected");
		var selectedProduct = $productsInScroller.eq(selectedProductIndex);
		pipemarker_custom.selected_product.selected = selectedProduct;
		pipemarker_custom.selected_product.product_text_height = selectedProduct.find(".product-text").height();
		pipemarker_custom.common.bindAttributeSelectMenus.updateSpecificationPositon();
		return selectedProduct
		
	},
	
	legend_auto_search : function(data){
	
	},
	
	updateProduct : {
		nameplates : function(selectedProductIndex, scrollable_api) {
			var $productsInScroller = scrollable_api.getItems();
			$productsInScroller.removeClass("selected");
			$productsInScroller.eq(selectedProductIndex).addClass("selected");
			var selectedProduct = $productsInScroller.eq(selectedProductIndex);
			pipemarker_custom.selected_product.selected = selectedProduct;
			pipemarker_custom.selected_product.product_text_height = selectedProduct.find(".product-text").height();
			var copyToFitError = $("#copy-to-fit-error");
			$(copyToFitError).fadeOut("fast");
			var size = pipemarker_custom.selected_product.selected.find("ul.product-sizes li span").html();
			//Pricing is updated by next function
			var linesInArea = [];
			//Loop through lines and add them to array to pass to copy to fit
			$("#line-container input.text-line").each(function(i){
				var copy = $(this).val();
				if (copy != ""){
					linesInArea.push(copy);
				}
				
			});
			
			if (linesInArea.length !== 0){
				pipemarker_custom.common.text_manipulation.copy_to_fit(linesInArea);
				
				var size_to_set = pipemarker_custom.common.text_manipulation.copy_to_fit(linesInArea);
					if (size_to_set === "1/8"){
							$("#edit_text_buttons #line_by_line_mode").fadeOut("fast");
					} else {
						$("#edit_text_buttons #line_by_line_mode").fadeIn("fast");
					}	
			} else {
				pipemarker_custom.common.updateSelectMenu.text_size();
			}
		
			pipemarker_custom.common.updateSelectMenu.material_thickness();
			pipemarker_custom.common.updateSelectMenu.mounting_option();
			//pipemarker_custom.common.updateSelectMenu.text_size();
			pipemarker_custom.common.bindAttributeSelectMenus.updateSpecificationPositon();
			pipemarker_custom.common.text_manipulation.update_last_line();
			$("#line-by-line-error").slideUp("fast");
			return selectedProduct
		},
		
		pipe_markers : function(selectedProductIndex, scrollable_api) {
			var $productsInScroller = scrollable_api.getItems();
			$productsInScroller.removeClass("selected");
			$productsInScroller.eq(selectedProductIndex).addClass("selected");
			var selectedProduct = $productsInScroller.eq(selectedProductIndex);
			
			//Update display name 
			
			pipemarker_custom.selected_product.selected = selectedProduct;
			pipemarker_custom.product_sku.sku_id = $("#nameplate-selector").val();
			pipemarker_custom.common.bindAttributeSelectMenus.updatePricing(selectedProduct.find(".product-data"));
			
			//Update Text Minimums
			var text_limits = $(selectedProduct).find(".availible-text-sizes li");
			text_limits = text_limits.data("max-char");
			pipemarker_custom.common.bindAttributeSelectMenus.updateSpecificationPositon();
			pipemarker_custom.common.text_manipulation.generate_single_line();
			return selectedProduct
		},
		
		duct_markers : function(selectedProductIndex, scrollable_api) {
			var $productsInScroller = scrollable_api.getItems();
			$productsInScroller.removeClass("selected");
			$productsInScroller.eq(selectedProductIndex).addClass("selected");
			var selectedProduct = $productsInScroller.eq(selectedProductIndex);
			
			pipemarker_custom.selected_product.selected = selectedProduct;
			pipemarker_custom.product_sku.sku_id = $("#nameplate-selector").val();
			pipemarker_custom.common.bindAttributeSelectMenus.updatePricing(selectedProduct.find(".product-data"));
			
			//Update Text Minimums
			var text_limits = $(selectedProduct).find(".availible-text-sizes li");
			text_limits = text_limits.data("max-char");
			pipemarker_custom.common.bindAttributeSelectMenus.updateSpecificationPositon();
			pipemarker_custom.common.text_manipulation.generate_single_line();
			return selectedProduct
		},
		
		underground_tape : function(selectedProductIndex, scrollable_api) {
			var $productsInScroller = scrollable_api.getItems();
			$productsInScroller.removeClass("selected");
			$productsInScroller.eq(selectedProductIndex).addClass("selected");
			var selectedProduct = $productsInScroller.eq(selectedProductIndex);
			
			pipemarker_custom.selected_product.selected = selectedProduct;
			pipemarker_custom.product_sku.sku_id = $("#nameplate-selector").val();
			pipemarker_custom.common.bindAttributeSelectMenus.updatePricing(selectedProduct.find(".product-data"));
			
			//Update Text Minimums
			var text_limits = $(selectedProduct).find(".availible-text-sizes li");
			text_limits = text_limits.data("max-char");
			pipemarker_custom.common.bindAttributeSelectMenus.updateSpecificationPositon();
			pipemarker_custom.common.text_manipulation.generate_single_line();
			return selectedProduct
		},
		
		ammonia_markers : function(selectedProductIndex, scrollable_api) {
			var $productsInScroller = scrollable_api.getItems();
			$productsInScroller.removeClass("selected");
			$productsInScroller.eq(selectedProductIndex).addClass("selected");
			var selectedProduct = $productsInScroller.eq(selectedProductIndex);
			
			pipemarker_custom.selected_product.selected = selectedProduct;
			pipemarker_custom.product_sku.sku_id = $("#nameplate-selector").val();
			pipemarker_custom.common.bindAttributeSelectMenus.updatePricing(selectedProduct.find(".product-data"));
			
			//Update Text Minimums
			var text_limits = $(selectedProduct).find(".availible-text-sizes li");
			text_limits = text_limits.data("max-char");
			pipemarker_custom.common.bindAttributeSelectMenus.updateSpecificationPositon();
			pipemarker_custom.common.text_manipulation.generate_single_line();
		return selectedProduct
		},
		
		stencils : function(selectedProductIndex, scrollable_api) {
			var $productsInScroller = scrollable_api.getItems();
			$productsInScroller.removeClass("selected");
			$productsInScroller.eq(selectedProductIndex).addClass("selected");
			var selectedProduct = $productsInScroller.eq(selectedProductIndex);
			
			pipemarker_custom.selected_product.selected = selectedProduct;
			pipemarker_custom.product_sku.sku_id = $("#textsize-select select").val();
			pipemarker_custom.common.updateSelectMenu.stencil_text_size();
			pipemarker_custom.common.bindAttributeSelectMenus.updatePricing(selectedProduct.find(".product-data"));
			pipemarker_custom.common.bindAttributeSelectMenus.updateSpecificationPositon();
			pipemarker_custom.common.text_manipulation.generate_single_line();
		return selectedProduct
		}
		
	
	},//End Update Product		
	
	changeProduct : function($selector_to_bind, $trigger){
	//Expects a jQuery($) wrapped select element for $trigger
	//Expects the scrollable wrapper for binding
		var main_selector_api = $selector_to_bind.data("scrollable");
		
		$selector_to_bind.bind('product.change-product', function(event,selectedProductIndex){
			main_selector_api.seekTo(selectedProductIndex);
			pipemarker_custom.common.updateProduct[action](selectedProductIndex,main_selector_api);		
		});
		
		$trigger.change(function(event){
			var selectedProductIndex = $trigger.attr("selectedIndex");
			var style = $trigger.find("option:selected").text();
			pipemarker_custom.product_config.style = style;
			$selector_to_bind.trigger('product.change-product',[selectedProductIndex]);
		});
		
	},
/* !Create Class Names */	
	createClassName : {
	
		productno : function(text_string) {
		text_string = text_string.replace(/\s+/g,"_").replace(/\//g, '_').replace(/\"/g, '').replace(/\./g, '_').toLowerCase();
		return text_string;
		},
		
		text_size: function(text_string) {
		var prefix = "ts_"
		text_string = prefix + text_string.replace(/\//g, '_').replace(/\"/g, '').replace(/\./g, '_');
		return text_string;	
		},
		
		mounting_option: function(text_string) {
		var prefix = "mo_"
		text_string = prefix + text_string.replace(/\s+/g,"_").replace(/\//g, '_').replace(/\"/g, '').replace(/\&/g, 'and').replace(/\./g, '_').toLowerCase();
		return text_string;	
		},
		
		color: function(text_string) {
		text_string = text_string.replace(/\//,"_").replace(/\s+/g,"_").toLowerCase();
		return text_string;
		},
		
		band: function(text_string) {
		text_string = text_string.replace(/\s+/g,"_").replace(/\//g, '_').replace(/\"/g, '').replace(/\./g, '_').toLowerCase();
		return text_string;
		},
		
		layout: function(text_string) {
		text_string = text_string.replace(/\s+/g,"_").replace(/\//g, '_').replace(/\"/g, '').replace(/\./g, '_').toLowerCase();
		return text_string;
		},
		
		product_size: function(text_string) {
		text_string = text_string.replace(/\-/g, '_').replace(/\//g, '_').replace(/\"/g,'').replace(/\s/g,'');
		return text_string;
		},
		
		product_prefix: function(text_string) {
			text_string = text_string.split("-");
			text_string = text_string[0] + "_";
			return text_string;	
		}, 
		
		product_prefix_double: function(text_string) {
			text_string = text_string.split("-");
			var prefix_1 = text_string[0];
			var prefix_2 = text_string[1];
			text_string = prefix_1 + "-" + prefix_2 + "_";
			return text_string;
		}
	},//End createClassName
	/* !Create Select Menus */
	createSelectMenu : {
		color: function(color,loadColor) {
			var colorCount = -1;
			var color_select = [];
			$.each(color, function(key,value){
				colorCount = colorCount + 1;
				var color_class = pipemarker_custom.common.createClassName.color(value);
				var color_name = value;
				
				var color_container = {
				color_class: color_class,
				color_name: color_name
				};
				
				if (color_name === loadColor) {
				color_container.selected = "selected"
				};
				
				color_select.push(color_container);
			});
		 
		return color_select	
		},
		
		band: function(band,loadBand) {
			var bandCount = -1;
			var band_select = [];
			$.each(band, function(key,value){
				bandCount = bandCount + 1;
				var band_class = pipemarker_custom.common.createClassName.band(value);
				var band_name = value;
				
				var band_container = {
				band_class: band_class,
				band_name: band_name
				};
				
				if (band_name === loadBand) {
				band_container.selected = "selected"
				};
				
				band_select.push(band_container);
			});
		 
		return band_select	
		},
		
		layout: function(layout,loadLayout) {
			
			var layoutCount = -1;
			var layout_select = [];
			$.each(layout, function(key,value){
				layoutCount = layoutCount + 1;
				var layout_class = pipemarker_custom.common.createClassName.layout(value);
				var layout_name = value;
				
				var layout_container = {
				layout_class: layout_class,
				layout_name: layout_name
				};
				
				if (layout_name === loadLayout) {
				layout_container.selected = "selected"
				};
				
				layout_select.push(layout_container);
			});
		 
		return layout_select	
		},
		
		mounting_option: function(mounting_option, loadMountingOption) {
			var mounting_select = [];
			$.each(mounting_option, function(key,value){
				var mounting_option_container = {
					name: value
				};
				
				if (value === loadMountingOption) {
					mounting_option_container.selected = "selected";
					pipemarker_custom.product_config.mounting_option = value;
				};
				
				mounting_select.push(mounting_option_container);
			});
		
		return mounting_select
		},
		
		material_thickness: function(material_codes, loadMaterialCode) {
				var material_select = [];
				$.each(material_codes, function(key,value){
				
				if (this.material_code === loadMaterialCode) {
				
					this.selected = "selected"
					pipemarker_custom.product_config.material_thickness = this.thickness;
				};
			
				material_select.push(this);
			});
		
		return material_select
		},
		
		product_size: function(product_id, product_size, productCount, loadProductID) {
			var product_size_selector = {
				product_id: product_id,
				product_size: product_size
			};
			
			if (loadProductID != null){
					if (product_id === loadProductID) {
					product_size_selector.selected = "selected";
				}
				
			} else if (productCount === 0) {
				product_size_selector.selected = "selected";
			} 
			return product_size_selector
		},
		
		stencil_material: function(product_id, product_material, productCount, loadProductID) {
			var stencil_material_selector = {
				product_id: product_id,
				product_material: product_material
			};
			
			if (loadProductID != null){
					if (product_id === loadProductID) {
					stencil_material_selector.selected = "selected";
				}
				
			} else if (productCount === 0) {
				stencil_material_selector.selected = "selected";
			} 
			return stencil_material_selector
		},
		
		text_size: function(textsize,loadedText) {
			var text_size_select = [];
			var loadedTextReplace = loadedText.text_size.replace(/\"/g,'');
			$.each(textsize, function(key,value){
				if (key === loadedTextReplace){
					this.selected = "selected";
					loadedText.max_upper = this.max_upper;
					loadedText.max_mixed = this.max_mixed;
				}
				text_size_select.push(this);
			});
			
			return text_size_select;
		},
		
	stencil_text_size: function(stencil_textsize,loadedText) {
		
			var text_size_select = [];
			var loadedTextReplace = loadedText.text_size.replace(/\"/g,'');
			$.each(stencil_textsize, function(key,value){
				if (this.name === loadedTextReplace){
					this.selected = "selected";
					pipemarker_custom.product_config.stencil_text_size = this.name;
				}
				text_size_select.push(this);
			});
			
			return text_size_select;
		}
		
	},// end createSelectMenu
	
updateSelectMenu : {
	material_thickness: function() {
		var selectedProductData = pipemarker_custom.selected_product.selected;
		selectedProductData = selectedProductData.find(".product-pricing");
		var select_menu = $("#material_thickness");
		select_menu = $.tmplItem(select_menu);
		var material_code_array = {
				select_options : []
			}
			
		selectedProductData.each(function(i){
		var material_select = {};
			material_select.sku_id = $(this).data("product-material-code");
			material_select.thickness = $(this).data("product-material-code-title");
			
			if(material_select.thickness === pipemarker_custom.product_config.material_thickness) {
				material_select.selected = "selected"
				pipemarker_custom.product_sku.sku_id = $(this).data("product-material-code");
			}
			
			material_code_array.select_options.push(material_select);
		});
		select_menu.data = material_code_array;
		select_menu.update();
		//Update Pricing after material code change
		var selectedProduct = pipemarker_custom.selected_product.selected;
		selectedProduct = selectedProduct.find(".product-data");
		pipemarker_custom.common.bindAttributeSelectMenus.updatePricing(selectedProduct);
		
	},
/* !Left off */
stencil_text_size: function() {
		var selectedProductData = pipemarker_custom.selected_product.selected;
		selectedProductData = selectedProductData.find(".product-pricing");
		var select_menu = $("#textsize-select select");
		select_menu = $.tmplItem(select_menu);
		var textsize_select_array = {
				select_options : []
			}
			
		selectedProductData.each(function(i){
		var textsize_select = {};
			textsize_select.sku_id = $(this).attr("id");
			textsize_select.name = $(this).data("product-text-size");
			
			if(textsize_select.name === pipemarker_custom.product_config.stencil_text_size) {
				textsize_select.selected = "selected"
				pipemarker_custom.product_sku.sku_id = $(this).attr("id");
			}
			
			textsize_select_array.select_options.push(textsize_select);
		});
		select_menu.data = textsize_select_array;
		select_menu.update();
		//Update Pricing after material code change
		var selectedProduct = pipemarker_custom.selected_product.selected;
		selectedProduct = selectedProduct.find(".product-data");
		pipemarker_custom.common.bindAttributeSelectMenus.updatePricing(selectedProduct);
		
	},
	
	mounting_option: function() {
		var selectedProductData = pipemarker_custom.selected_product.selected;
		selectedProductData = selectedProductData.find(".availible-mounting-options li");
		var select_menu = $("#select_mounting_options");
		select_menu = $.tmplItem(select_menu);
		
		var mounting_option_array = {
	  			select_options : []
	  		}
		var match_found = false;
		var first_option = {};	
		selectedProductData.each(function(i){
		var mounting_select = {};
			mounting_select.name = $(this).find("span").text();
			if(mounting_select.name === pipemarker_custom.product_config.mounting_option) {
				mounting_select.selected = "selected";
				pipemarker_custom.product_config.mounting_option = mounting_select.name;
				match_found = true; 
			} 
			mounting_option_array.select_options.push(mounting_select);
		});
		
		if (match_found === false ){
			pipemarker_custom.product_config.mounting_option = selectedProductData.eq(0).find("span").text();
		}
		
		select_menu.data = mounting_option_array;
		select_menu.update();	
	},
	/* !Update Text Size */
	text_size: function() {
		var selectedProductData = pipemarker_custom.selected_product.selected;
		selectedProductData = selectedProductData.find(".availible-text-sizes li");
		var select_menu = $("#line-container select.select-text-size");
		//Gather data from selectedProduct
		
		//Replace Select Menus
	$(select_menu).each(function(i){
				
			var select_menu_template = $.tmplItem(this);
			var text_size_select = select_menu_template.data;
			
			var current_size = $(this).val();
			text_size_select.select_options = [];
			selectedProductData.each(function(i){
				text_size = {};
				text_size.name = $(this).find("span").text();
				text_size.max_upper = $(this).data("max-char-upper");
				text_size.max_mixed = $(this).data("max-char-mixed");
			
			if(text_size.name === current_size) {
				text_size.selected = "selected";
				text_size_select.max_mixed = text_size.max_mixed;
				text_size_select.max_upper = text_size.max_upper;
			} 
			text_size_select.select_options.push(text_size);
		});
		
		select_menu_template.data = text_size_select;
		select_menu_template.update();
		
		//Update line input with max lines
		});
	
		/*
		select_menu.data = mounting_option_array;
		select_menu.update();
		*/
	}
},//End updateSelectMenu
	
loadSelectedProductPreview : {

		layout : function($layout_input) {
			var value = $layout_input.val();
			value = pipemarker_custom.common.createClassName.layout(value);
			return value
		},
		band : function($band_input) {
			var value = $band_input.val();
			value = pipemarker_custom.common.createClassName.band(value);
			return value
		},
		color : function($color_input) {
			var value = $color_input.val();
			value = pipemarker_custom.common.createClassName.color(value);
			return value
		},
		
		mounting_option : function($mounting_options_input) {			
			var value = $mounting_options_input.val();
			value = pipemarker_custom.common.createClassName.mounting_option(value);
			return value
			}
		},//End loadSelectedProductPreview 
		
	updateClass : function($selector) {
		array_of_attributes = [];
		$.each(pipemarker_custom.product_config_classes, function(key,value){
			if (value != null){
				array_of_attributes.push(value);
			}
		});
		array_of_attributes = array_of_attributes.join(" ");
		$selector.attr("class", array_of_attributes);
	},
	
	updateTextClass : function(array_of_attributes,$selector) {
		array_of_attributes = array_of_attributes.join(" ");
		$selector.attr("class", array_of_attributes);
	},
	
	/* !Bind Select Menus */
	bindAttributeSelectMenus : {
	
	bind_color_select : function($selector_to_bind, $trigger){
	$selector_to_bind.bind('product.change-color', function(event,color){
		pipemarker_custom.common.bindAttributeSelectMenus.updateCustomProduct.update_color(color,$selector_to_bind);
		
	});
	
	$trigger.change(function(event){
		var color = $(this).val();
		$selector_to_bind.trigger('product.change-color',[color]);
	});
	
	},
	
	bind_layout_select : function($selector_to_bind, $trigger){
	$selector_to_bind.bind('product.change-layout', function(event,layout){
		pipemarker_custom.common.bindAttributeSelectMenus.updateCustomProduct.update_layout(layout,$selector_to_bind);
		
	});
	
	$trigger.change(function(event){
		var layout = $(this).val();
		$selector_to_bind.trigger('product.change-layout',[layout]);
	});
	
	},
	
	
	bind_band_select : function($selector_to_bind, $trigger){
	$selector_to_bind.bind('product.change-band', function(event,band){
	pipemarker_custom.common.bindAttributeSelectMenus.updateCustomProduct.update_band(band,$selector_to_bind);
	
	});
	
	$trigger.change(function(event){
	var band = $(this).val();
	$selector_to_bind.trigger('product.change-band',[band]);
	});
	
	},

	bind_mounting_select : function($selector_to_bind, $trigger){
	$selector_to_bind.bind('product.change-mounting-option', function(event,mounting_option){
		
		pipemarker_custom.common.bindAttributeSelectMenus.updateCustomProduct.update_mounting(mounting_option,$selector_to_bind);
		
	});
	
	$trigger.live('change', function(event){
		var mounting_option = $(this).val();
		$selector_to_bind.trigger('product.change-mounting-option',[mounting_option]);
	});
	
	},

	bind_text_size : function($selector_to_bind, $trigger){
	$selector_to_bind.live('text.change-size', function(event,text_size){
		pipemarker_custom.common.text_manipulation.update_text_size(text_size,$(this));
	});
	
	$trigger.live('change', function(event){
		var text_size = $(this).val();
		var max_char = $(this).find("option:selected").data("max-char-upper");
		var line = $(this).closest(".custom-text").find("input.text-line");
		var max_char_container = line.siblings("span.max_chars");
		max_char_container.html(max_char);
		$(line).attr("maxlength",max_char).data("max-char-upper",max_char);
		var line_number = $(line).attr("id");
		line_number = "."+ line_number;
		var selectedProduct = pipemarker_custom.selected_product.selected;
		var selectedProductParagraph = selectedProduct.find(line_number);
		selectedProductParagraph.trigger('text.change-size',[text_size]);
	});
	
	},
	
	bind_text_orientation : function($selector_to_bind, $trigger){
	$selector_to_bind.live('text.change-orientation', function(event,text_orientation){
		pipemarker_custom.common.text_manipulation.update_text_orientation(text_orientation,$(this));
	});
	
	$trigger.live('click', function(event){
		var text_orientation = $(this).val();
		var max_char = $(this).find("option:selected").data("max-char-upper");
		var line = $(this).closest(".custom-text").find("input.text-line");
		var line_number = $(line).attr("id");
		line_number = "."+ line_number;
		var selectedProduct = pipemarker_custom.selected_product.selected;
		var selectedProductParagraph = selectedProduct.find(line_number);
		selectedProductParagraph.trigger('text.change-orientation',[text_orientation]);
	});
	
	},
	
	bind_material_code : function($selector_to_bind, $trigger){
	$selector_to_bind.bind('product.change-material_code', function(event,material_code,material_thickness){
	pipemarker_custom.common.bindAttributeSelectMenus.updateCustomProduct.update_material_code(material_code,material_thickness,$selector_to_bind);
	
	});
	
	$trigger.live('change',function(event){
		var material_code = $(this).val();
		var material_thickness = $(this).find("option:selected").text();
		
	$selector_to_bind.trigger('product.change-material_code',[material_code,material_thickness]);
	});
	
	},
	
	bind_stencil_textsize_select : function($selector_to_bind, $trigger){
	$selector_to_bind.bind('product.change-stencil_text_size', function(event,sku_id,stencil_text_size){
	pipemarker_custom.common.bindAttributeSelectMenus.updateCustomProduct.update_stencil_text_size(sku_id,stencil_text_size,$selector_to_bind);
	
	});
	
	$trigger.live('change',function(event){
		var sku_id = $(this).val();
		var stencil_text_size = $(this).find("option:selected").text();
		
	$selector_to_bind.trigger('product.change-stencil_text_size',[sku_id,stencil_text_size]);
	});
	
	},
/* !Update CUstom Product Attributes */
	updateCustomProduct : {
		
		update_color : function(color,$selector_to_bind){
			pipemarker_custom.product_config.color = color;
			color = pipemarker_custom.common.createClassName.color(color);
			pipemarker_custom.product_config_classes.color = color;	
			pipemarker_custom.common.updateClass($selector_to_bind);
		},
		
		update_band : function(band,$selector_to_bind){
			pipemarker_custom.product_config.band = band;
			band = pipemarker_custom.common.createClassName.band(band);
			pipemarker_custom.product_config_classes.band = band;	
			pipemarker_custom.common.updateClass($selector_to_bind);
		},
		
		update_layout : function(layout,$selector_to_bind){
			pipemarker_custom.product_config.layout = layout;
			layout = pipemarker_custom.common.createClassName.layout(layout);
			pipemarker_custom.product_config_classes.layout = layout;	
			pipemarker_custom.common.updateClass($selector_to_bind);
		},
		
		update_mounting : function(mounting_option,$selector_to_bind) {
			pipemarker_custom.product_config.mounting_option = mounting_option;
			mounting_option = pipemarker_custom.common.createClassName.mounting_option(mounting_option);
			pipemarker_custom.product_config_classes.mounting_option = mounting_option;	
			pipemarker_custom.common.updateClass($selector_to_bind);
		},
		
		update_material_code : function(material_code,material_thickness,$selector_to_bind) {
	
			pipemarker_custom.product_sku.sku_id = material_code;
			pipemarker_custom.product_config.material_thickness = material_thickness;
			var selectedProduct = pipemarker_custom.selected_product.selected;
			selectedProduct = selectedProduct.find(".product-data");
			pipemarker_custom.common.bindAttributeSelectMenus.updatePricing(selectedProduct);
		},
		update_stencil_text_size : function(sku_id,stencil_text_size,$selector_to_bind) {

			pipemarker_custom.product_sku.sku_id = sku_id;
			pipemarker_custom.product_config.stencil_text_size = stencil_text_size;
			var selectedProduct = pipemarker_custom.selected_product.selected;
			selectedProduct = selectedProduct.find(".product-data");
			//Update hidden text_size input;
			$("#select-text-size").val(pipemarker_custom.product_config.stencil_text_size);
			pipemarker_custom.common.bindAttributeSelectMenus.updatePricing(selectedProduct);
		}
	},//updateCustomProduct

	updatePricing : function($selected_product_data) {
		
		var sku_id = pipemarker_custom.product_sku.sku_id;
		sku_id = "#" + sku_id;
		var pricing_container = $selected_product_data.find(sku_id);
		var pricing_list = pricing_container.find("li");
		var first_price = 0;
		$(pricing_list).each(function(i){
			if(i === 0) {
				first_price = $(this).data('price');
				first_price = first_price.toFixed(2);
			}
			var quanity_break = $(this).data('quanity-break');
			var pricing = $(this).data('price');
			pricing = pricing.toFixed(2);
			pipemarker_custom.product_pricing[quanity_break] = pricing;
		});
		
		var quanityBreak = [];
		var pricingBreak = [];	
		
		$.each(pipemarker_custom.product_pricing, function(key,value){	
			quanityBreak.push("<th class='quanity_break'>" + key + "</th>");
	 		pricingBreak.push("<td class='quanity_pricing'>" + value  + "</td>");
		});
		
		quanityBreak = quanityBreak.join("");
		pricingBreak = pricingBreak.join("");
		
		var pricing_table ={
			first_price: first_price,
			quanity_break: quanityBreak,
			quanity_price: pricingBreak	
		}
		
		var pricingDetailsContainerTable = $("#product-specification").find("table");
		$(pricingDetailsContainerTable).html("");
		$("#you-pay").html("");
	
	 $("#product-quanity-pricing-template").tmpl(pricing_table).appendTo(pricingDetailsContainerTable);
	  $("#you-pay-template").tmpl(pricing_table).appendTo("#you-pay");
	  	
	  	//Set Up Pricing Tab
		var $buttons = $("#pricing-nav ul.tabs");
		var tabs = "div#product-details > div"
		var pricing_tabs_api = pipemarker_custom.common.setUpTabbedNavigation($buttons,tabs);
		//Prevent default on alternate tab buttons
		$("#you-pay a").click(function(event){
			pricing_tabs_api.click(1);
			event.preventDefault();
		});
		
		$("#product-pricing-container a").click(function(event){
			pricing_tabs_api.click(0);
			event.preventDefault();
		});
	  
	},
	
	updateSpecificationPositon: function($selected_product_data) {
		var main_selector_api = $("#custom-product-images").data("scrollable");
		main_selector_api.onSeek(function(){ 
			var productOffset = pipemarker_custom.selected_product.selected.outerWidth();
			$("#product-specification").css("left",productOffset)
		});
	}
},//End bindAttributeSelectMenus
/* !Bind Text Manipulation Events */
bindTextManipulationEvents : {

	line_input : function($selector_to_bind, $trigger) {
		
		$selector_to_bind.live('update_text.text_manipulation', function(event,value,line_number){
			var $preview_to_update = $(this);
			//Bind character count tooltip
			pipemarker_custom.common.text_manipulation.updatePreview(value,line_number,$preview_to_update)
			var selectedProductTextContainer = pipemarker_custom.selected_product.selected.find("div.vertically-aligned-copy");	
		if (!Modernizr.csstransforms){
			$preview_to_update.removeAttr('style');
		} 
		pipemarker_custom.common.text_manipulation.compress_text($preview_to_update,selectedProductTextContainer);	
			 
		});
		
		$trigger.live('keyup',function(){
			var value = $(this).val();
			var productCustomInput = $(this)
			var line_number = "p." + $(this).attr("id") + " span.copy";
			var selectedProduct = pipemarker_custom.selected_product.selected;
			var selectedProductParagraph = selectedProduct.find(line_number);
			selectedProductParagraph.trigger('update_text.text_manipulation',[value,line_number]);
			pipemarker_custom.common.bindTextManipulationEvents.activate_counter(productCustomInput);
		});
	},
	
	line_input_limits : function($selector_to_bind, $trigger) {
		
		$selector_to_bind.live('update_max_min_tooltip', function(event,maxCharUpper,maxCharMixed){
			
				var paragraphStats = {
					max_upper_1: maxCharUpper,
					max_mixed_1: maxCharMixed
				}
				
			var max_chars = paragraphStats.max_upper_1;
	
		});
		
		$selector_to_bind.live('close_max_min_tooltip', function(){
			$(this).find(".nooflines").show("fast");
		});
		
		$trigger.live('focus',function(){
			var maxCharUpper = $(this).data("max-char-upper");
			var maxCharMixed = $(this).data("max-char-mixed");

		});	
		
		$trigger.live('blur',function(){
		
				var selectedProductTextContainer = pipemarker_custom.selected_product.selected.find("div.vertically-aligned-copy");
				
			
		});	
	}, 
	
	activate_counter : function($selector_to_bind, max_chars) {
		var counter = $selector_to_bind.parent(".legend-input").find("span.current-characters");
		var copy = $selector_to_bind.val();
		var numberofchars = copy.length;
		counter.html(numberofchars);
	},
	
	legend_auto_complete : function($selector_to_bind){
		var line_number = "p." + $selector_to_bind.attr("id") + " span.copy";
		var selectedProduct = pipemarker_custom.selected_product.selected;
		var selectedProductParagraph = selectedProduct.find(line_number);
		$selector_to_bind.autocomplete({
			source: pipemarker_custom.product_config.legends,
			select: function(event, ui){
			var value = ui.item.value;	
			selectedProductParagraph.trigger('update_text.text_manipulation',[value,line_number]);
			}
		});
	},
	
	convert_to_decimal : function(fraction) {
		fraction = fraction.split("-");
		decimal = 0;
			function divideToDecimal(fraction_to_split) {
				fraction_to_split = fraction_to_split.split("/");
					if (fraction_to_split.length > 1) {
						fraction_to_split = fraction_to_split[0]/fraction_to_split[1];
					} else {
						fraction_to_split = fraction_to_split[0];
						fraction_to_split = parseInt(fraction_to_split);
					}
				
				return fraction_to_split
			};
		if (fraction.length > 1){
			decimal = divideToDecimal(fraction[1]);
			whole_number = fraction[0];
			whole_number = parseInt(whole_number);
			decimal = whole_number + decimal;
			
		} else {
			
			decimal = divideToDecimal(fraction[0]);
			
		}
		
		return decimal;
	}, 
	
	measure_text_heights : function($selector_with_heights) {
		$selector_with_heights.each(function(i){
			var outertextHeight = $(this).outerHeight(true);
			var textSizeClass = $(this).attr("id");
			var textSize = $(this).find("span").html();
			var textDecimal = pipemarker_custom.common.bindTextManipulationEvents.convert_to_decimal(textSize);
			pipemarker_custom.text_heights[textSize] = {
				text_size: textSize,
				text_class: textSizeClass,
				text_height: outertextHeight,
				text_size_decimal: textDecimal
			};	
		});
	},
	
	update_text_heights : function(){
		var totalheight = 0;
		var customer_text = pipemarker_custom.selected_product.selected.find(".product-text p");
		customer_text.each(function(i){
			var height = $(this).outerHeight(true);
			totalheight += height;
		});
		pipemarker_custom.selected_product.line_height = totalheight;
		return totalheight
		},
		
	bind_copy_to_fit : function($selector_to_bind,$trigger) {
		$selector_to_bind.bind("copy-to-fit", function(event){
		var linesInArea = $(this).val().split("\n");
		var size_to_set = pipemarker_custom.common.text_manipulation.copy_to_fit(linesInArea);
		if (size_to_set === "1/8"){
				$("#edit_text_buttons #line_by_line_mode").fadeOut("fast");
		} else {
			$("#edit_text_buttons #line_by_line_mode").fadeIn("fast");
		}
		});
		
		$trigger.click(function(){
		$selector_to_bind.trigger("copy-to-fit");
		});
	},
	
	bind_add_a_line : function($selector_to_bind,$trigger){
		$selector_to_bind.bind("add-a-line", function(event,last_line_number,line_template){
			var $selector_to_add = $(this);
			pipemarker_custom.common.text_manipulation.add_a_line($selector_to_add,last_line_number,line_template);
		});
		
		$trigger.live("click",function(event){
		var line_template = $.tmplItem(this);
		var last_line_number = line_template.data;
		last_line_number = last_line_number.numberofline;
		$selector_to_bind.trigger("add-a-line",[last_line_number,line_template]);
		event.preventDefault();
		
		});
	},
	
	bind_delete_a_line : function($selector_to_bind,$trigger){
		$selector_to_bind.bind("delete-a-line", function(event,last_line_number,line_template){
			var $selector_to_delete = $(this);
			pipemarker_custom.common.text_manipulation.delete_a_line($selector_to_delete,last_line_number,line_template);
		});
		
		
		$trigger.live("click",function(){
			var line_template = $.tmplItem(this);
			var last_line_number = line_template.data;
			last_line_number = last_line_number.numberofline;
			$selector_to_bind.trigger("delete-a-line",[last_line_number,line_template]);
			event.preventDefault();
		});
	}
},//End bindAttributeSelectMenus
/* !Add To Cart Functions */
add_to_cart : {
	form_submit : function($form_to_validate){
		$form_to_validate.validate({
		invalidHandler: function (e, validator, form) {
			var errors = validator.numberOfInvalids();
			if (errors) {
				$(this).addClass("error");

			} else {
				$(this).removeClass("error");
			}
		},

		rules: {

			quanity: {
				required: true,
				min: pipemarker_custom.product_sku.minimum_qty
			}
		},
		messages: {
			quanity: {
				required: "Please enter a quanity",
				min: "A minimum of "+ pipemarker_custom.product_sku.minimum_qty +" is required"
			}
		},

		focusCleanup: true,

		submitHandler: function (form) {
			$(form).ajaxSubmit({
				dataType: 'json',
				beforeSerialize: function($form){
					pipemarker_custom.common.add_to_cart.update_number_of_lines($form);
				},
				success: function(responseText){
					
					if (responseText == "successupdate") {
						window.location = "../shoppingcart.php";
					} else {
						pipemarker_custom.common.add_to_cart.update_item_count(responseText);
						pipemarker_custom.common.add_to_cart.add_to_cart_response(responseText);
					}
				},
				resetForm: false
			});
		}
	});
},//End Form submit
	add_to_cart_response : function(responseText){
	var selectedProduct = pipemarker_custom.selected_product.selected;
		$("#item-added").html("");
		var product_type_image = $(selectedProduct).attr("id");
		responseText.product_type_image = product_type_image;
		responseText.style = pipemarker_custom.product_config.style;
		
		if ("color" in responseText){
			if (responseText.color !== null){
			var color = responseText.color;
				color =  pipemarker_custom.common.createClassName.color(color);
				responseText.color = color;
			};
		};
		if ("band" in responseText){
		var band = responseText.band;
			band =  pipemarker_custom.common.createClassName.band(band);
			responseText.band = band;
		};
		
		if ("layout" in responseText){
		var layout = responseText.layout;
			layout =  pipemarker_custom.common.createClassName.layout(layout);
			responseText.layout = layout;
		};
		
		if ("mounting_option" in responseText){
		var mounting_option = responseText.mounting_option;
			mounting_option =  pipemarker_custom.common.createClassName.mounting_option(mounting_option);
			responseText.mounting_option = mounting_option;
		};
		
		
		$.each(responseText.text_detail,function(key,value){
			if (this.text_size !== null){
				var text_size = this.text_size;
				text_size = pipemarker_custom.common.createClassName.text_size(text_size);
				this.text_size = text_size;
			};
		});
		
		$("#custom_response_template").tmpl(responseText).appendTo("#item-added");
			var id_to_compress = "#" + responseText.sh_id;
				var customThumbnail = $("#item-added").find(id_to_compress).tmplItem();
				var customText = $(customThumbnail.nodes).find(".vertically-aligned-copy span");
				customThumbnail =  $(customThumbnail.nodes).find(".thumbnail");
				
		/!* Cart Preview Update */
		$(".cart-preview-overlay").load("/shoppingcartpreview.php",function()
		{
			$("a.cart-close-button").click(
			function () {	
			$(".cart-preview-overlay").slideUp("fast");
		});	
		});
		

		
		$("#item-added").slideDown("fast");
		
		//Lazy function. Rewrite later
		$("body").unbind('close-cart-response').bind('close-cart-response', function () {
		$("#item-added").fadeOut("fast", function () {
			$(this).html("");
		});
		});
	
		$("body").unbind("click").click(function () {
			$(this).trigger('close-cart-response');	
		});
		
		$("body").unbind("keyup").keyup(function (e) {
		if (e.keyCode == 27) {
			$(this).trigger('close-cart-response');
		}
	});
		
	},
	
	bind_quanity_input : function($selector_to_bind,$trigger){
		
		$selector_to_bind.bind('calculate_savings',function(event,currentQuantity){
			pipemarker_custom.common.add_to_cart.calculate_savings(currentQuantity);
		});
		
		$selector_to_bind.bind('hide-total',function(){
			$("#total-cost #total-cost-price").fadeOut("fast", function(){
					$("#total-cost .view-pricing").fadeIn("fast");
			});
		});
		
		$selector_to_bind.bind('show-total',function(){
			$("#total-cost #total-cost-price").fadeIn("fast");
			$("#total-cost .view-pricing").fadeOut("fast");
		
		});
		
		$trigger.focus(function(){
			$selector_to_bind.trigger('show-total');
			var hold_quanity = $(this).val();
			if (hold_quanity){
			pipemarker_custom.common.add_to_cart.calculate_savings(hold_quanity);
			}
		});
		
		$trigger.blur(function(){
			var hold_quanity = $(this).val();
			if (!hold_quanity){
				$selector_to_bind.trigger('hide-total');
			}
		});
		
		$trigger.keyup(function(){
			var currentQuantity = $(this).val();
			currentQuantity = parseFloat(currentQuantity);
			var minimumQuantity = pipemarker_custom.product_sku.minimum_qty;
			
			if (currentQuantity >= minimumQuantity){
				$selector_to_bind.trigger('calculate_savings',[currentQuantity]);
			}
			
		});
	},
	
	calculate_savings : function(currentQuanity){
	
		currentQuanity = parseFloat(currentQuanity);
		var product_pricing = pipemarker_custom.product_pricing;
		var price_count = 0;
		var priceBasedOnQuanity = 0;
		var original_unit_price = 0;
		var original_price = 0;
		var percentSaved = "";
		
		$.each(product_pricing, function(key, value) {
			price_count = price_count + 1;
			var quanityBreak = parseFloat(key);
			if (price_count === 1) {
				original_unit_price = value;
				original_unit_price = parseFloat(original_unit_price);
				original_unit_price = original_unit_price.toFixed(2);
				original_price = original_unit_price * currentQuanity;
				original_price = original_price.toFixed(2);
			}
			
			
			if (currentQuanity >= quanityBreak) {
			priceBasedOnQuanity = value;
			priceBasedOnQuanity = parseFloat(priceBasedOnQuanity);
			priceBasedOnQuanity = priceBasedOnQuanity.toFixed(2);		
		}});
		
		var totalPrice = priceBasedOnQuanity * currentQuanity;
		totalPrice = totalPrice.toFixed(2);
		
		percentSaved = ((original_price - totalPrice) / original_price) * 100;
		percentSaved = percentSaved.toFixed(2);
	
		if (!isNaN(currentQuanity)){
		
		$("#unit-cost span.price").text("$" + priceBasedOnQuanity );
	} else {
		$("#unit-cost span.price").text("$" + original_unit_price );
	}

	if (!isNaN(currentQuanity) && totalPrice !== "0.00") {
		$("#total-cost p").text("$" + totalPrice);
	} else {
		$("#total-cost p").text("$" + "0.00");
	}
	
	$("#percentage-saved p").text(percentSaved + "%");
	
	if (isNaN(percentSaved)) {
	
	} else {
		if (percentSaved != 0.00) {
			if ($("#percentage-saved").is(":visible")){
				//do nothing 
			} else {
			
			$("#percentage-saved").fadeIn("fast");
			}
			
			$("#unit-cost strike.crossed-out").text("$" + original_unit_price);
			$("#total-cost strike.crossed-out").text("$" + original_price);
	
		} else {
			$("#unit-cost strike.crossed-out").text(" ");
			$("#total-cost strike.crossed-out").text(" ");
			$("#percentage-saved").fadeOut("fast");
		}
	
}
},

	update_number_of_lines : function(form){
		var finalNumberOfLines = $("#line-container input.text-line").length
		$(form).find("#nooftextlines").val(finalNumberOfLines);
	},
	
	update_item_count : function(responseText){
		var added_to_cart = responseText;
		var noOfItems = added_to_cart.current_item_number;
		var itemCounter = $("#cart-controls #item-count");
		itemCounter.html(noOfItems + ' items');
		
	}
},
/* !Text Manipulation */
text_manipulation : {
	updatePreview : function(current_input_value,line_class,$preview_to_update) {
		$preview_to_update.html(current_input_value);
	
	},
	
	remove_empty_strings : function(array_of_strings){
		function checkIfEmpty(element, index, array) {
			return !(element === "" || typeof element == "undefined" || element === null);
		}
		var lines = array_of_strings.filter(checkIfEmpty);
		return lines
	},
	
	count_lines : function(){
		var numberOfLines = $("#line-container").find(".custom-text").length;
		return numberOfLines
	},
	
	compress_text : function($element_to_compress, $boundry){
		$element_to_compress.compressText($boundry);
		//Update compression input
		var compression_rate = $element_to_compress.data("compression");
		var line_number = $element_to_compress.parent("p").data("line-number");
		line_number = "#" + line_number + "_compression";
		$(line_number).val(compression_rate);
	},
	
	
	update_text_size : function(text_size,paragraph_to_change){
		array_of_attributes = [];
		var orientation = paragraph_to_change.data("text_orientation");
		var line_number = paragraph_to_change.data("line-number");
		var text_size_class = pipemarker_custom.common.createClassName.text_size(text_size);
		array_of_attributes.push(orientation,line_number,text_size_class);
		pipemarker_custom.common.updateTextClass(array_of_attributes,paragraph_to_change);
		paragraph_to_change.data("current-text-size",text_size);
		
		pipemarker_custom.common.bindTextManipulationEvents.update_text_heights();
		var selectedProductTextContainer = pipemarker_custom.selected_product.selected.find("div.vertically-aligned-copy");	
		var $preview_to_update = paragraph_to_change.find("span.copy"); 
		if (!Modernizr.csstransforms){
			$preview_to_update.removeAttr('style');
		} 
		pipemarker_custom.common.text_manipulation.compress_text($preview_to_update,selectedProductTextContainer);	
	},
	
	update_text_orientation : function(text_orientation,paragraph_to_change){
		array_of_attributes = [];
		var orientation = paragraph_to_change.data("text_orientation");
		var line_number = paragraph_to_change.data("line-number");
		var text_size = paragraph_to_change.data("current-text-size");
		var text_size_class = pipemarker_custom.common.createClassName.text_size(text_size);
		array_of_attributes.push(text_orientation,line_number,text_size_class);
		pipemarker_custom.common.updateTextClass(array_of_attributes,paragraph_to_change);
		paragraph_to_change.data("text_orientation",text_orientation);
	},
	
	generate_line_preview : function(customer_lines,size_to_set){
	//customer_lines should be an array of strings
	//size_to_set should be an object including size, orientation, etc
	var selectedProductText = pipemarker_custom.selected_product.selected.find("div.vertically-aligned-copy");
	customer_lines_array = [];
	$.each(customer_lines,function(key,value){
		var customer_line = {};
		customer_line.text_content = value;
		customer_line.text_size = size_to_set.text_size;
		customer_line.text_align = size_to_set.text_align;
		customer_line.textclassname = size_to_set.textclassname;
		customer_line.numberofline = key + 1;
		customer_lines_array.push(customer_line);
	});
	
	//Compress if needed
	var selectedProductTextContainer = pipemarker_custom.selected_product.selected.find("div.vertically-aligned-copy");
	$("#generated-paragraph-templates").tmpl(customer_lines_array).appendTo(selectedProductText);	
			selectedProductText.find("span.copy").each(function(i){
			pipemarker_custom.common.text_manipulation.compress_text($(this),selectedProductTextContainer);	
			});
	},
	
	generate_blank_line : function(line_number){
	//customer_lines should be an array of strings
	//size_to_set should be an object including size, orientation, etc
	var selectedProductText = pipemarker_custom.selected_product.selected.find("div.vertically-aligned-copy");
		var new_line = {};
		new_line.text_content = "NEW LINE";
		new_line.text_size = "1/4";
		new_line.text_align = "center";
		new_line.textclassname = pipemarker_custom.common.createClassName.text_size(new_line.text_size);
		new_line.numberofline = line_number;
	
	//Compress if needed
	
	$("#generated-paragraph-templates").tmpl(new_line).appendTo(selectedProductText);	
	},
	/* !Left Off */
	generate_single_line : function(){
	//customer_lines should be an array of strings
	//size_to_set should be an object including size, orientation, etc
	var selectedProductText = pipemarker_custom.selected_product.selected.find("div.vertically-aligned-copy");
	$(selectedProductText).html("");
		var new_line = {};
		new_line.text_content = $("#line-container #line_1").val();
		new_line.numberofline = 1;
	
	//Compress if needed
	
	$("#generated-paragraph-templates").tmpl(new_line).appendTo(selectedProductText);	
	},
	
	
	generate_line_editor : function(customer_lines,product_text_sizes,size_to_set,sizes_to_enable){
	//customer_lines should be an array of strings
	//size_to_set should be an object including size, orientation, etc
	var line_container = $("#line-container");
	var numberOfLines = pipemarker_custom.common.text_manipulation.count_lines();
	
	select_options = [];
	//Loop through availible text sizes to build select menus and find orientation, size matches
	product_text_sizes.each(function(i){
		var select_option = {};
		select_option.name = $(this).find("span").html();
		select_option.max_upper = $(this).data("max-char-upper");
		select_option.max_mixed = $(this).data("max-char-mixed");
		select_options.push(select_option);
	}); 
	
	customer_lines_array = [];
	$.each(customer_lines,function(key,value){
		var customer_line = {};
		customer_line.text_content = value;
		customer_line.text_size = size_to_set.text_size;
		customer_line.text_align = size_to_set.text_align;
		customer_line.textclassname = size_to_set.textclassname;
		customer_line.max_upper = size_to_set.max_upper;
		customer_line.numberofline = key + 1;
		customer_line.select_options = select_options;
			$.each(customer_line.select_options, function(key,value){
				if (this.name === customer_line.text_size){
					this.selected = "selected";
					}
					if(jQuery.inArray(this.name,sizes_to_enable) === -1 || this.name === "1/8") {
							this.disabled = "disabled";
						}
				
			});
		customer_lines_array.push(customer_line);
	});
	
	
	$("#line-container-templates").tmpl(customer_lines_array).appendTo(line_container);	
	
	},
	
	copy_to_fit : function(linesInArea) {
		//Reset line container
		var errorContainer = $("#copy-to-fit-error");
		$("#line-by-line-error").slideUp("fast");
		$(errorContainer).fadeOut("fast");
		var lines = pipemarker_custom.common.text_manipulation.remove_empty_strings(linesInArea);
		var number_of_lines = lines.length;
		var product_text_sizes = pipemarker_custom.selected_product.selected.find(".availible-text-sizes li");
		var copy_to_fit_sizes = pipemarker_custom.selected_product.selected.find(".copy-to-fit");
		var total_max_char = copy_to_fit_sizes.data("max-char-upper");
		var total_max_lines = copy_to_fit_sizes.data("max-lines");
		
		var lines_will_fit = false;
		var sizes_to_enable = [];
		//Loop through text sizes to compare heights
		var usable_text_sizes = [];
		$(product_text_sizes).each(function(i){
			var text_size = $(this).find("span").html();
			var height_of_lines = 0;
			//Loop through text height object to find matches
			$.each(pipemarker_custom.text_heights, function(key,value){
				if(text_size == this.text_size){
					height_of_lines = number_of_lines * this.text_height;
					return false;	
				}
			});
			//Compare height of lines with the hieght of selected product
				var productHeight = pipemarker_custom.selected_product.product_text_height;
				if (height_of_lines < productHeight && number_of_lines <= total_max_lines) {
						lines_will_fit = true;
						usable_text_sizes.push(this);
				}	
		});
		if (lines_will_fit === true){
			//If lines will fit now choose the best size
			var array_of_maxchars = [];
			var find_highest_max = [];
			var meets_minimum = true;
			//Loop through sizes returned by lines returned
			$.each(lines, function(key,value){
			var numberChars = this.length;
			var under_max_chars = [];
				$.each(usable_text_sizes,function(key,value){
					var usable_size = $(this);
					var max_chars = $(this).data("max-char-upper");
					find_highest_max.push(max_chars);
					if (max_chars >= numberChars) {
							array_of_maxchars.push(max_chars);
							under_max_chars.push(max_chars);
							sizes_to_enable.push(usable_size.find("span").html());
					}
			});
			
				if (under_max_chars.length === 0){
					meets_minimum = false;
					var absolute_maximum = Array.max(find_highest_max);
					pipemarker_custom.common.errors.copy_to_fit_chars(value,numberChars,absolute_maximum);			
					return false;	
				}
		});

			
			if (meets_minimum === true){
				var maxToMatch = Array.min(array_of_maxchars);
				//Loop through usable_text_sizes again to find match
				var size_to_set = {};
				$.each(usable_text_sizes,function(key,value){
					var max_chars = $(this).data("max-char-upper");
					//Find match
					 
					if (max_chars === maxToMatch){
						size_to_set.text_size = $(this).find("span").html();
						size_to_set.text_align = "center";
						size_to_set.textclassname = pipemarker_custom.common.createClassName.text_size(size_to_set.text_size);
						size_to_set.max_upper = max_chars;
					}
					
				});
$("#line-container").html("");
pipemarker_custom.selected_product.selected.find("div.vertically-aligned-copy").html("");				
sizes_to_enable = sizes_to_enable.myUnique();				
pipemarker_custom.common.text_manipulation.generate_line_editor(lines,product_text_sizes,size_to_set,sizes_to_enable);
pipemarker_custom.common.text_manipulation.update_last_line();
pipemarker_custom.common.text_manipulation.generate_line_preview(lines,size_to_set);
pipemarker_custom.common.bindTextManipulationEvents.update_text_heights();
return size_to_set.text_size
			}
		//Find the highest number in array. This is the size to set.
		} else {
			pipemarker_custom.common.errors.copy_to_fit_lines(total_max_lines,number_of_lines);
			return "Too many lines";
		}		
	},
	/* !Update Last Line */
	update_last_line : function(){
		var $lineContainer = $("#line-container div.custom-text");
		var $lastLine = $("div.custom-text:last")
		$lineContainer.removeClass("last-line");
		$lastLine.addClass("last-line");		
	},
	
	add_a_line : function($selector_to_add,last_line_number,line_template){
		var product_text_sizes = pipemarker_custom.selected_product.selected.find(".availible-text-sizes li:not(.copy-to-fit)");
		var lines_will_fit = false;
		var sizes_to_enable = [];
		var usable_text_sizes = [];
		var total_height_of_lines = pipemarker_custom.selected_product.line_height;
		var product_text_height =  pipemarker_custom.selected_product.product_text_height;
		var line_data = line_template.data;
		var line_data_copy = jQuery.extend(true, {}, line_data);
		line_data_copy.select_options = [];
		line_data_copy.text_content = "";
		new_line_number = parseInt(last_line_number) + 1;
		line_data_copy.numberofline = new_line_number
		
		//Grab the new id to skip when updating the other selec menus
		var new_id = "#line-" + new_line_number + "-container";
		//Loop through text sizes
		$(product_text_sizes).each(function(i){
			var text_size = $(this).find("span").html();
			var text_size_decimal = $(this).data("text-size-decimal");
			var max_upper = $(this).data("max-char-upper");
			var max_mixed = $(this).data("max-char-mixed");
			var max_lines = $(this).data("max-lines");
			var textclassname = pipemarker_custom.common.createClassName.text_size(text_size);
			//update new select menus
			new_select_option = {};
			new_select_option.name = text_size;
			new_select_option.max_lines = max_lines;
			new_select_option.max_mixed = max_mixed;
			new_select_option.max_upper = max_upper;
			new_select_option.textclassname = textclassname;
			new_select_option.text_size_decimal = text_size_decimal;
			//update old select menus
			old_select_option = {};
			old_select_option.name = text_size;
			old_select_option.max_lines = max_lines;
			old_select_option.max_mixed = max_mixed;
			old_select_option.max_upper = max_upper;
			old_select_option.textclassname = textclassname;
			old_select_option.text_size_decimal = text_size_decimal;
			//Loop through text height object to find matches
			$.each(pipemarker_custom.text_heights, function(key,value){
					if(text_size == this.text_size){
						var line_height = this.text_height;
						var size_if_added = line_height + total_height_of_lines;
							if (size_if_added <  product_text_height){
								lines_will_fit = true;
									
							} else {
								
								new_select_option.disabled = "disabled"
								old_select_option.disabled = "disabled"
								//console.log("wont fit",text_size);	
								/* !Add Line Error Here */
							}
					}
					
			});
		
		line_data_copy.select_options.push(new_select_option);
		sizes_to_enable.push(old_select_option);
		});
	
	if (lines_will_fit === true){
		$("#line-container-templates").tmpl(line_data_copy).appendTo("#line-container");
		pipemarker_custom.common.text_manipulation.generate_blank_line(new_line_number);
		//Loop through select menus to update select
		
		
		$("#line-container").find(".custom-text").not(new_id).find("select.select-text-size").each(function(i){
			var text_content = $(this).closest(".custom-text").find("input.text-line").val();
			var current_size = $(this).val();
	 		//Loop through select options to find a match
	 		$.each(sizes_to_enable, function(key,value){ 
	 			var option = this;
	 			if (option.name === current_size){
	 				option.selected = "selected";
	 			};
			});
			var select_template = $.tmplItem(this);
			var select_template_data = select_template.data;
			select_template_data.select_options = sizes_to_enable;
			select_template_data.text_content = text_content;
			select_template.update();
		});	
		
		pipemarker_custom.common.bindTextManipulationEvents.update_text_heights();
		pipemarker_custom.common.text_manipulation.update_last_line();
		
		} else {
		
			pipemarker_custom.common.errors.no_more_lines();
		}
	},	
	
	delete_a_line : function($selector_to_delete,last_line_number,line_template){
		$("#line-by-line-error").slideUp("fast");
		var product_text_sizes = pipemarker_custom.selected_product.selected.find(".availible-text-sizes li:not(.copy-to-fit)");
		var previewToDelete = line_template.nodes;
		var previewClassToDelete = $(previewToDelete).find("input.text-line").attr("id");
		previewClassToDelete = "." + previewClassToDelete;
 		var selectedProduct = pipemarker_custom.selected_product.selected;
 		selectedProduct.find(previewClassToDelete).fadeOut("fast").remove();
 		$(previewToDelete).fadeOut("fast").remove();
 		//Function to update last line class
 		pipemarker_custom.common.bindTextManipulationEvents.update_text_heights();
 		
 		
 		//Find what text sizes will fit now that a line has been deleted.
 		var total_height_of_lines = pipemarker_custom.selected_product.line_height;
 		var product_text_height =  pipemarker_custom.selected_product.product_text_height;
 		var numberOfLines = pipemarker_custom.common.text_manipulation.count_lines();
 		
		
 		var select_options = [];
 		$(product_text_sizes).each(function(i){ 
 			var text_size = $(this).find("span").html();
			var text_size_decimal = $(this).data("text-size-decimal");
			var max_upper = $(this).data("max-char-upper");
			var max_mixed = $(this).data("max-char-mixed");
			var max_lines = $(this).data("max-lines");
			var textclassname = pipemarker_custom.common.createClassName.text_size(text_size);
 			//update new select menus
			new_select_option = {};
			new_select_option.name = text_size;
			new_select_option.max_lines = max_lines;
			new_select_option.max_mixed = max_mixed;
			new_select_option.max_upper = max_upper;
			new_select_option.textclassname = textclassname;
			new_select_option.text_size_decimal = text_size_decimal;
			//Loop through text height object to find matches
			
			$.each(pipemarker_custom.text_heights, function(key,value){
				if (numberOfLines > 1) {	
					if(text_size == this.text_size){
						var line_height = this.text_height;
						var size_if_added = line_height + total_height_of_lines;
							if (size_if_added <  product_text_height){
								lines_will_fit = true;	
							} else {
								lines_will_fit = false;
								new_select_option.disabled = "disabled";	
							}
					}
				}//End check for heights. 
				//Check for size match	
			});
			
			
			
 			select_options.push(new_select_option);
 		});//End Text Loop
 		
 		//Loop through remaining lines to update select menus
 		$("#line-container").find(".custom-text").find("select.select-text-size").each(function(i){
 		var current_size = $(this).val();
 		//Loop through select options to find a match
 		$.each(select_options, function(key,value){ 
 			var option = this;
 			if (option.name === current_size){
 				option.selected = "selected";
 			};
 			
 		});
 		
		var text_content = $(this).closest(".custom-text").find("input.text-line").val();
		var select_template = $.tmplItem(this);
		var select_template_data = select_template.data;
		select_template_data.select_options = select_options;
		select_template_data.text_content = text_content;
		select_template.update();
	});
	pipemarker_custom.common.text_manipulation.update_last_line();	
	}
	
},//End text_manipulation

/* !Errors */
errors: {
	copy_to_fit_lines: function(max_lines,number_of_lines){
	var errorContainer = $("#copy-to-fit-error");

	$(errorContainer).find("#error-copy").html("").end().fadeIn("fast");
	var errorMsg = {
		ourmessage: "You have <strong>"+ number_of_lines +" lines</strong> the maximum for this nameplate size is <strong>"+ max_lines +" lines</strong>"
	}
	
	$("#line-by-line-error-template").tmpl(errorMsg).appendTo("#copy-to-fit-error #error-copy");	

	},
	
	copy_to_fit_chars: function(value,numberChars,absolute_maximum){
	var errorContainer = $("#copy-to-fit-error");
	$(errorContainer).find("#error-copy").html("").end().fadeIn("fast");
	
		var errorMsg = {
		errorline: value,
		noofcharacters: numberChars,
		maxium_chars: absolute_maximum
	}
		$("#line-by-line-error-template").tmpl(errorMsg).appendTo("#copy-to-fit-error #error-copy");	
	
	},
	
	no_more_lines: function(){
		$("#line-by-line-error").slideDown("fast");
		$("#line-by-line-error #line-by-line-error-copy").html("");
		var errorMsg = {
		ourmessage: "You cannot add anymore lines to this Nameplate"
		}
		
		$("#line-by-line-error-template").tmpl(errorMsg).appendTo("#line-by-line-error #line-by-line-error-copy");	
	}
}

},//End common 

/* !Build Functions */
custom: {
		init: function() {
		
		var legendFeed = pipemarker_custom.common.buildLegendSearch();
		
		$.getJSON(legendFeed, function(data) {
		
		pipemarker_custom.common.legend_auto_search(data);
		
		$.each(data,function(key, value) {
		var legend = this;
		legend = legend.markerLegend;
		pipemarker_custom.common.update_legend_storage(legend);
		});
		
		  var custom_url = pipemarker_custom.common.buildUrl();
		 $.getJSON(custom_url, function(data) {
		 	pipemarker_custom.custom[action].buildInterface(data);
		 	
		 });
		 

	});		
	},
	/* !Build Nameplates */
	nameplates:  {
		  	buildInterface : function(data) {
		  	
		  	var productno = $("body").data("productno");
			productno =  pipemarker_custom.common.createClassName.productno(productno);
			$("body").addClass(productno);
	  		
	  		//check for customer load color
	  		var noDataLoaded = $.isArray(data.custom_selected);

	  		 if (noDataLoaded === false) {
	  		  	var loadColor = data.custom_selected.color;
	  		 	var loadProductID = data.custom_selected.productid;
				var loadColor = data.custom_selected.color;
				var loadMountingOption = data.custom_selected.mounting_option;
				var loadMaterialCode = data.custom_selected.material_code;
				var loadText = data.custom_selected.text_detail;
	  		 	

	  		 } else {
	  			
	  		
	  			var loadColor = null;
	  		 	var loadProductID = null;
				var loadMountingOption = null;
				var loadMaterialCode = null;
				var loadText = {
					"1" : {}
				};
				loadText[1].numberofline = "1",
				loadText[1].select_options = [],
				loadText[1].text_align = "center",
				loadText[1].text_content = "", 
				loadText[1].text_size = '1/4"'	
				
	  		 };
	  	
	  		
	  		/* !Set up arrays to store select options for template insertion at the end of looping*/
	  		var product_selector_array = {
	  			select_options : []
	  		};
	  		
	  		var mounting_option_array = {
	  			select_options : []
	  		}
	  		
			var color_select_array = {
				select_options : []
			}	
	  		
	  		var material_code_array = {
				select_options : []
			}
			
			var text_string_array = {
				text_lines : []
			}
	  		
	  	
	  		var colors =  pipemarker_custom.common.createSelectMenu.color(data.color,loadColor);
	  		
	  		
	  		/* Start building global select menus */
	  		color_select_array.select_options = colors;
	  		
	  		var productCount = -1;
	  		/* Iterate through products to build sku level select menus*/
	  		$.each(data.product,function(key,value){ 
	  			productCount = productCount + 1;
	  			var product = this;
	  			var product_id = key;
	  			var product_size = product.size;
	  			var image_id = product_id;
	  			
	  			//Grab Copy to Fit Sizes and create classname
	  			product.copy_to_fit.textclassname = pipemarker_custom.common.createClassName.text_size(product.copy_to_fit.copytofit_textsize);
	  			
	  			//Remove quotes from copy to fit size
	  			
	  			product.copy_to_fit.copytofit_textsize = product.copy_to_fit.copytofit_textsize.replace(/\"/g,'');
	  			
	  			//Loop through text size to create class names and add to object
				$.each(product.textsize, function(key,value){
					this.textclassname = pipemarker_custom.common.createClassName.text_size(key);
					this.name = key;
					this.text_size_decimal = pipemarker_custom.common.bindTextManipulationEvents.convert_to_decimal(key);
					this.max_upper = this[0];
					this.max_mixed = this[1];
					this.max_lines = this[2];
					
				});
	  		
	  			//Build Product 
	  			var product_selector = pipemarker_custom.common.createSelectMenu.product_size(product_id, product_size, productCount, loadProductID);
	  			product_selector_array.select_options.push(product_selector);
	  			
	  			//Extract text sizes from loaded product or first product
	  			if (loadProductID != null || loadProductID != undefined) { 
	  				if (loadProductID === product_id) {
					
					$.each(loadText, function(key,value){
						var loadedText = this;
						loadedText.numberofline = key;
						var text_size = pipemarker_custom.common.createSelectMenu.text_size(product.textsize,loadedText);
						loadedText.select_options = text_size;
						loadedText.textclassname = pipemarker_custom.common.createClassName.text_size(loadedText.text_size);
						
	  		$("#line-container-templates").tmpl(loadedText).appendTo("#line-container");
	  		
	  		//Set orientation 
	  		var generatedLineID = "#line-" + this.numberofline + "-container"; 
			var generatedLine = $(generatedLineID).tmplItem();
			var generatedLineOrientation = $(generatedLine.nodes).find("div.text_orientation input");
			$(generatedLineOrientation).each(function(){
				var generatedLineOrientationValue = $(this).val();
				if (generatedLineOrientationValue === loadedText.text_align ){
					$(this).attr("checked","checked");
				}});
	  		//Append text to copy to fit preview
	  		text_string_array.text_lines.push($.trim(loadedText.text_content));
	  		
	  		});}
	  		
	  			} else if (productCount == 0) {
	  			
	  				$.each(loadText, function(key,value){
						var loadedText = this;
						loadedText.numberofline = key;
						loadedText.text_content = "";
						var text_size = pipemarker_custom.common.createSelectMenu.text_size(product.textsize,loadedText);
						loadedText.select_options = text_size;
						loadedText.textclassname = pipemarker_custom.common.createClassName.text_size(loadedText.text_size);
	  		$("#line-container-templates").tmpl(loadedText).appendTo("#line-container");
	  				
	  			}); 
	  			};
	  			
	  			
	  			//Load mounting options. First if its in edit mode or new by checking if loadProduct is empty
	  			if (loadProductID != null || loadProductID != undefined) {
	  			if (loadProductID === product_id) {
	  				var mounting_option = pipemarker_custom.common.createSelectMenu.mounting_option(product.mounting_option, loadMountingOption);
	  				mounting_option_array.select_options = mounting_option;
	  				}
	  				
	  			} else if (productCount == 0) {
	  				loadMountingOption = product.mounting_option[0];
	  				var mounting_option = pipemarker_custom.common.createSelectMenu.mounting_option(product.mounting_option,loadMountingOption);
	  				mounting_option_array.select_options = mounting_option;
	  			}
	  			
	  			/* !Build Material Code Selector or Hidden Input */
	  			var checkMatertialArrayLength = product.materialcode_data.length;
	  			
	  			
	  				//If data length is greater then 1 then build a select menu
	  				
	  						if (loadProductID != null || loadProductID != undefined) {
	  								if (loadProductID === product_id) {
	  								var material_code = pipemarker_custom.common.createSelectMenu.material_thickness(product.materialcode_data,loadMaterialCode);
	  								material_code_array.select_options = material_code;
	  								}
	  							
	  						} else if (productCount == 0) {
	  							loadMaterialCode = product.materialcode_data[0].material_code;
	  							var material_code = pipemarker_custom.common.createSelectMenu.material_thickness(product.materialcode_data,loadMaterialCode);
	  							material_code_array.select_options = material_code;
	  						}
	  					
}); //End product loop
	  		
	  		//Append Menus to templates
	  		
	  		$("#size-select-menu").tmpl(product_selector_array).appendTo("#product-options");
	  		$("#material-select-menu").tmpl(material_code_array).appendTo("#product-options");
	  		$("#color-select-menu").tmpl(color_select_array).appendTo("#product-options");
	  		$("#mounting-select-menu").tmpl(mounting_option_array).appendTo("#product-options");
	  		
	  		//Append Text to copy to fit area
	  		text_string_array = text_string_array.text_lines.join("\n");
	  		$("#copy-to-fit").text(text_string_array);
			
	  	var product_selector =  $("#nameplate-size").tmplItem();
	  	var $product_selector = $(product_selector.nodes).find("select");
	  	//Grab SKU ID based on selected material code. 
	  	var product_sku_id = $("#select-material-thickness").tmplItem(); 
	  	product_sku_id = $(product_sku_id.nodes).find("#material_thickness").val();
	  	//Update product_sku object
	  	pipemarker_custom.product_sku.sku_id = product_sku_id; 
	  	
		/* !Notes */
		var notes = {}
		notes.note = data.notes;
		$("#minimum-quanity-template").tmpl(notes).appendTo("#minimum-quanity-container ul");
	  	
	  	pipemarker_custom.custom[action].buildProducts(data.product,$product_selector,loadText);
	 	/* !Gather text heights and add to text height object */
	 	
	 	var $selector_with_heights = $("#potential-text-sizes p");
	 	pipemarker_custom.common.bindTextManipulationEvents.measure_text_heights($selector_with_heights);
	 	
	 	//Set Up Edit Copy Tabs
	 	var $buttons = $("#edit_text_buttons");
	 	var tabs = "div#enter-copy-sections > div"
	 	var edit_copy_tabs_api = pipemarker_custom.common.setUpTabbedNavigation($buttons,tabs);
	 	//Set up tabs to change radio button when clicked
	 	var $tab_links = edit_copy_tabs_api.getTabs();
	 	
	 	$tab_links.bind("set-customer-text-style", function(event){
	 		$(this).find('input[type="radio"]').attr("checked","checked");
	 	});
	 	
	 	$tab_links.click(function(){
	 		$(this).trigger("set-customer-text-style");
	 	});
	 	
	 	/* !Radio buttons function as tabs */
	 	$tab_links.find('input[type="radio"]').click(function(event){
	 		event.stopPropagation();
	 		var tabIndexToSet = $tab_links.find('input[type="radio"]').index(this);
	 		edit_copy_tabs_api.click(tabIndexToSet);
	 	});
	 	
	  	
	  	/* !Bind Form Submit */
	  	var $product_form = $('#custom_products_form');
	  	pipemarker_custom.common.add_to_cart.form_submit($product_form);	
	  		
	  	},//End Build Interface
	  buildProducts : function(nameplates,$product_selector,loadText) {
		 	pipemarker_custom.common.set_up_tab_indexing($("#custom-product-selection input[type='text'], #custom-product-selection select"),$("#main-product-quantity-input"));
		
		pipemarker_custom.common.interaction.focus_events($("#product-options div.custom-selection, #enter-copy-sections, div.custom-text, #configure-and-pricing-tab-container, #product-options-tab-container"));
	  	$.each(nameplates, function(key,value){
	  		var nameplate = this;
	  		var product_id = key;
			var image_id = product_id;
	  		nameplate.image_id = image_id;
	  		var minimum_quantity = this.min_quantity;
			pipemarker_custom.product_sku.minimum_qty = minimum_quantity;
	  		
	  		$("#product-image-template").tmpl(nameplate).appendTo("#scroll-wrapper");
	  		//Find template nodes for centering
	  		var templateId = "#" + image_id;
	  		var generatedProduct = $(templateId).tmplItem();
	  		var $selector_to_center = $(generatedProduct.nodes).find(".image-and-measurements");
	  		var $boundry_selector = $(generatedProduct.nodes);
	  		
	  		pipemarker_custom.common.centerProductImages($selector_to_center,$boundry_selector);
	  	});//End Product Loop 
	  //Show the selected options on the preview image
	  var $assign_data = $("#custom-product-images");
	  var $color_input = $("#nameplate_color");
	  var $mounting_options_input = $("#select_mounting_options");
	  var $material_code_input = $("#material_thickness");
	  var classes_to_set = [];
	  var color_to_set = pipemarker_custom.common.loadSelectedProductPreview.color($color_input, $assign_data);
	  pipemarker_custom.product_config_classes.color = color_to_set;
	  var mounting_to_set = pipemarker_custom.common.loadSelectedProductPreview.mounting_option($mounting_options_input, $assign_data);
	  pipemarker_custom.product_config_classes.mounting_option = mounting_to_set;
	  pipemarker_custom.common.updateClass($assign_data);
	 
	 /* !Set Up Nameplate Scrollers */ 
	 var $selector_to_bind = $("#custom-product-images");  
	 var main_selector_api = pipemarker_custom.common.setUpScroller($selector_to_bind);
	 var selectedProductIndex = $product_selector.attr("selectedIndex");	  
	 main_selector_api.seekTo(selectedProductIndex);
	 
	//Update style object for add to cart
	var style = $product_selector.find("option:selected").text();
	pipemarker_custom.product_config.style = style;
	
	 var selectedProduct = pipemarker_custom.common.showCurrentProduct(selectedProductIndex,main_selector_api);
	 var selectedProductText = $(selectedProduct).find("div.vertically-aligned-copy");
	 pipemarker_custom.common.bindAttributeSelectMenus.updatePricing(selectedProduct.find(".product-data"));
	/* !Bind Pricing */
	var pricing_input = $("#main-product-quantity-input");
	var pricing_container = $("#you-pay");
	pipemarker_custom.common.add_to_cart.bind_quanity_input(pricing_container,pricing_input);
	 
	 
//Bind Events
/* !Product Scroller */
var product_selector_trigger =  $("#nameplate-size").tmplItem();
var $product_selector_trigger = $(product_selector_trigger.nodes).find("select");
pipemarker_custom.common.changeProduct($selector_to_bind,$product_selector_trigger);
//Bind Attribute Selectors
		pipemarker_custom.common.bindAttributeSelectMenus.bind_color_select($selector_to_bind, $color_input);
		pipemarker_custom.common.bindAttributeSelectMenus.bind_mounting_select($selector_to_bind, $mounting_options_input);
		pipemarker_custom.common.bindAttributeSelectMenus.bind_material_code($selector_to_bind, $material_code_input);
		selectedProductText.html("");
		//Place text on selected product 
		$.each(loadText, function(key,value){
			
	  		$("#generated-paragraph-templates").tmpl(this).appendTo(selectedProductText);	
	  	});
	  	//Update height of texts
	  	pipemarker_custom.common.bindTextManipulationEvents.update_text_heights();
	  	
	  	/* !Left Off */
	  	//Bind Text Manipulation events	
	 	var productCustomText = $("#custom-product-images .product-text p span.copy");
	 	//Loop through text to assign compression if needed
	 	$(productCustomText).each(function(i){
	 		var compression = $(this).data("compression");
	 		if (compression !== 0.00){
				$(this).css({
					scaleX: compression,
					origin: [0, 0]
				});
	 		} else {
	 		
	 			$(this).css({
					scaleX: 1,
					origin: [0, 0]
				});
	 		}
	 		
	 	});
	 	
	 	var productCustomInputs = $("#line-container .legend-input input.text-line");
	 	var changeTextSizeSelect = $("select.select-text-size");
	 	var changeTextOrientationInput = $("#orientation-container .text_orientation input");
	 	var productCustomTextParent = $("#custom-product-images .product-text p");
	 	var productCustomInputContainer = $("#line-container .legend-input");
	 	var lineContainer = $("#line-container");
	 	var productAddButton = $("#line-container .add_line");
	 	var productDeleteButton = $("#line-container .delete_line");
	 	var copyToFitTextArea = $("#copy-to-fit");
	 	var copyToFitTrigger = $("#copy-to-fit-container #preview");
	 	pipemarker_custom.common.bindTextManipulationEvents.line_input(productCustomText,productCustomInputs);
	 	pipemarker_custom.common.bindAttributeSelectMenus.bind_text_size(productCustomTextParent,changeTextSizeSelect);
	 	pipemarker_custom.common.bindAttributeSelectMenus.bind_text_orientation(productCustomTextParent,changeTextOrientationInput);
 	 	pipemarker_custom.common.bindTextManipulationEvents.bind_copy_to_fit(copyToFitTextArea,copyToFitTrigger);
 	 	pipemarker_custom.common.bindTextManipulationEvents.line_input_limits(productCustomInputContainer,productCustomInputs);
 	 	pipemarker_custom.common.bindTextManipulationEvents.bind_add_a_line(lineContainer,productAddButton);
 	 	pipemarker_custom.common.bindTextManipulationEvents.bind_delete_a_line(lineContainer,productDeleteButton);
 	 	//pipemarker_custom.common.bindTextManipulationEvents.activate_counter(productCustomInputs);
 	 	//Add last line class
 	 	pipemarker_custom.common.text_manipulation.update_last_line();
 	 	
 	 	 	//Set Up Edit Copy Tabs
	 	var $buttons = $("#edit_text_buttons");
	 	var tabs = "div#enter-copy-sections > div"
	 	var edit_copy_tabs_api = pipemarker_custom.common.setUpTabbedNavigation($buttons,tabs);

$("#copy-to-fit").focus();
 	
//Set up tooltips. May need for add/generate lines
},//End buildProducts
set_up_guide : function(){
	
}//End Set up guide
},//End nameplates functions
/* !Build Pipemarkers */	  	
pipe_markers: {

		
	  	buildInterface : function(data) { 
			
			/* !Productno to Class*/
			var productno = $("body").data("productno");
			productno =  pipemarker_custom.common.createClassName.productno(productno);
			$("body").addClass(productno);
	  		var noDataLoaded = $.isArray(data.custom_selected);
		 	
		 	
	  		 if (noDataLoaded === false) {
	  		  	var loadColor = data.custom_selected.color;
	  		 	var loadProductID = data.custom_selected.productid;
				var loadColor = data.custom_selected.color;
				var loadText = {
					"1" : {}
				};
				
				loadText[1].text_content = data.custom_selected.text_content;
	  		 	

	  		 } else {
	  			
	  			var loadColor = null;
	  		 	var loadProductID = null;
				var loadMountingOption = null;
				var loadMaterialCode = null;
				var loadText = {
					"1" : {}
				};
				
				loadText[1].numberofline = "1",
				loadText[1].select_options = [],
				loadText[1].text_align = "center",
				loadText[1].text_content = ""
				
	  		 };
	  	
	  		
	  	
	  		
			var color_select_array = {
				select_options : []
			}	
			
			var product_selector_array = {
				select_options : []
			}	
	  	
	  		var colors =  pipemarker_custom.common.createSelectMenu.color(data.color,loadColor);
	  		
	  		color_select_array.select_options = colors;
		
		var productCount = -1;
		$.each(data.product,function(key,value){ 
			productCount = productCount + 1;
			var product = this;
			var product_id = key;
			var product_size = product.size;
			var product_style = product.style;
			var image_id = product_id;
	  			
	  		var product_selector = pipemarker_custom.common.createSelectMenu.product_size(product_id, product_style, productCount, loadProductID);
	  			
			var text_size = {};
			$.each(product.text_size, function(key,value){
			
			text_size.textclassname = pipemarker_custom.common.createClassName.text_size(key);
			text_size.name = key;
			text_size.max_char = value;
			
			});
			
			product.text_size = text_size;
	  		
			//Extract text sizes from loaded product or first product
			if (loadProductID != null || loadProductID != undefined) { 
			if (loadProductID === product_id) {
			
			$.each(loadText, function(key,value){
				var loadedText = this;
				loadedText.numberofline = key;
				loadedText.max_upper = product.text_size.max_char;
			$("#line-container-templates").tmpl(loadedText).appendTo("#line-container");
			
			//Append text to copy to fit preview
			
			
			});
			}
			
			} else if (productCount == 0) {
			
			$.each(loadText, function(key,value){
			var loadedText = this;
			loadedText.numberofline = key;
			loadedText.text_content = pipemarker_custom.common.generate_random_legend();
			loadedText.max_upper = product.text_size.max_char;
			$("#line-container-templates").tmpl(loadedText).appendTo("#line-container");
			}); 
			};
	  		product_selector.sku_id = product.sku_id;
	  		
	  		product_selector_array.select_options.push(product_selector);

		});//End Product Loops
		
		/* !Load Pipemarker Select Menus into template */
		$("#size-select-menu").tmpl(product_selector_array).appendTo("#product-options");	
		$("#color-select-menu").tmpl(color_select_array).appendTo("#product-options");
		
		pipemarker_custom.custom[action].buildProducts(data.product,$product_selector,loadText);
		var $assign_data = $("#custom-product-images");
		var $color_input = $("#nameplate_color");
		var color_to_set = pipemarker_custom.common.loadSelectedProductPreview.color($color_input, $assign_data);
		pipemarker_custom.product_config_classes.color = color_to_set;
		pipemarker_custom.common.updateClass($assign_data);
		
		 var $selector_to_bind = $("#custom-product-images");  
		var product_selector =  $("#nameplate-size").tmplItem();
		
	  	var $product_selector = $(product_selector.nodes).find("select");
	  	
	  			//Grab SKU ID based on selected size. 
	  	product_sku_id = $product_selector.val();
	  	//Update product_sku object
	  	pipemarker_custom.product_sku.sku_id = product_sku_id; 
	  	//Update price 
	  	
		pipemarker_custom.common.changeProduct($selector_to_bind,$product_selector);
		//Bind Attribute Selectors
		pipemarker_custom.common.bindAttributeSelectMenus.bind_color_select($selector_to_bind, $color_input);
		/* !Bind Form Submit */
	  	var $product_form = $('#custom_products_form');
	  	pipemarker_custom.common.add_to_cart.form_submit($product_form);
	  		/* !Notes */
			var notes = {}
			notes.note = data.notes;
			$("#minimum-quanity-template").tmpl(notes).appendTo("#minimum-quanity-container ul");
	  
	
	  	
	  },//End buildInterface
	  
	  buildProducts : function(pipemarkers,$product_selector,loadText) {
	 
	 	pipemarker_custom.common.set_up_tab_indexing($("#custom-product-selection input[type='text'], #custom-product-selection select"),$("#main-product-quantity-input"));
		
		
		pipemarker_custom.common.interaction.focus_events($("#product-options div.custom-selection, #enter-copy-sections, div.custom-text,#configure-and-pricing-tab-container,#configure-and-pricing-tab-container"));
	 
	  	$.each(pipemarkers, function(key,value){
	  		var pipemarker = this;
	  		var product_id = key;
			var image_id = product_id;
			var minimum_quantity = this.min_quantity;
			pipemarker_custom.product_sku.minimum_qty = minimum_quantity;
			
			if(minimum_quantity > 1) {
				$("#main-product-quantity-input").val(minimum_quantity);
			}
	  		pipemarker.image_id = image_id;
	  			
	  		//Create class for text-size
	  		$("#product-image-template").tmpl(pipemarker).appendTo("#scroll-wrapper");
	  		var templateId = "#" + image_id;
	  
	  		var generatedProduct = $(templateId).tmplItem();
	  		
	  		var $selector_to_center = $(generatedProduct.nodes).find(".image-and-measurements");
	  		var $boundry_selector = $(generatedProduct.nodes);
	  		var $selector_to_scale = $(generatedProduct.nodes).find(".thumbnail");
	  		var $text_to_scale = $(generatedProduct.nodes).find(".product-text p");
	  		pipemarker_custom.common.centerProductImages($selector_to_center,$boundry_selector);
	  		
	  		}); //End Product Loop
	 	/* !Set Up Pipemarker Scrollers */
		 var $selector_to_bind = $("#custom-product-images");
		 var product_selector =  $("#nameplate-size").tmplItem();
	  	var $product_selector = $(product_selector.nodes).find("select");
	  	
	  	//Grab SKU ID based on selected size. 
	  	product_sku_id = $product_selector.val();
	 
	  	//Update product_sku object
	  	pipemarker_custom.product_sku.sku_id = product_sku_id; 
	  	//Update price 	
		 var main_selector_api = pipemarker_custom.common.setUpScroller($selector_to_bind);
		 var selectedProductIndex = $product_selector.attr("selectedIndex");	  
		 main_selector_api.seekTo(selectedProductIndex);
		 
		 //Update style object for add to cart
		var style = $product_selector.find("option:selected").text();
		pipemarker_custom.product_config.style = style;
		 
		 
		 var selectedProduct = pipemarker_custom.common.showCurrentProduct(selectedProductIndex,main_selector_api);
		 var selectedProductText = $(selectedProduct).find("div.vertically-aligned-copy");
		selectedProductText.html("");
		pipemarker_custom.common.bindAttributeSelectMenus.updatePricing(selectedProduct.find(".product-data"));
		
		 /* !Bind Pricing */
		 var pricing_input = $("#main-product-quantity-input");
		 var pricing_container = $("#you-pay");
		 pipemarker_custom.common.add_to_cart.bind_quanity_input(pricing_container,pricing_input);
	 
		//Place text on selected product 
		$.each(loadText, function(key,value){
		
			$("#generated-paragraph-templates").tmpl(this).appendTo(selectedProductText);	
		}); 

			//Bind Text Manipulation events	
	 		//Bind Text Manipulation events	
	 	var productCustomText = $("#custom-product-images .product-text p span.copy");
	 	var productCustomInputs = $("#line-container .legend-input input.text-line");
	 	var productCustomInputContainer = $("#line-container .legend-input");
 	 	pipemarker_custom.common.bindTextManipulationEvents.line_input(productCustomText,productCustomInputs);
//Set up tooltips. May need for add/generate lines
		pipemarker_custom.common.bindTextManipulationEvents.line_input_limits(productCustomInputContainer,productCustomInputs);	
		
		pipemarker_custom.common.bindTextManipulationEvents.legend_auto_complete(productCustomInputs);		
	$("#line_1").focus();	
	 
	}//End buildProducts  	
},//End pipemarker functions
	/* !Build Duct Markers */	  	
duct_markers: {
	  	buildInterface : function(data) { 
	  		var noDataLoaded = $.isArray(data.custom_selected);

	  		 if (noDataLoaded === false) {
	  		  	var loadColor = data.custom_selected.color;
	  		 	var loadProductID = data.custom_selected.productid;
				var loadColor = data.custom_selected.color;
				var loadText = {
					"1" : {}
				};
				
				loadText[1].text_content = data.custom_selected.text_content;
	  		 	

	  		 } else {
	  			
	  			var loadColor = null;
	  		 	var loadProductID = null;
				var loadMountingOption = null;
				var loadMaterialCode = null;
				var loadText = {
					"1" : {}
				};
				
				loadText[1].numberofline = "1",
				loadText[1].select_options = [],
				loadText[1].text_align = "center",
				loadText[1].text_content = "", 
				loadText[1].text_size = '1/4"'	
				
	  		 };
	  	
	  		
			var color_select_array = {
				select_options : []
			}	
			
			var product_selector_array = {
				select_options : []
			}	
	  	
	  		var colors =  pipemarker_custom.common.createSelectMenu.color(data.color,loadColor);
	  		
	  		color_select_array.select_options = colors;
		
		var productCount = -1;
		$.each(data.product,function(key,value){ 
			productCount = productCount + 1;
			var product = this;
			var product_id = key;
			var product_size = product.size;
			var image_id = pipemarker_custom.common.createClassName.product_prefix_double(product_id) + 
			pipemarker_custom.common.createClassName.product_size(product_size);
	  			
	  		var product_selector = pipemarker_custom.common.createSelectMenu.product_size(product_id, product_size, productCount, loadProductID);
	  		var minimum_quantity = this.min_quantity;
			pipemarker_custom.product_sku.minimum_qty = minimum_quantity;
	  		
	  		
	  		var text_size = {};
			$.each(product.text_size, function(key,value){
			
			text_size.textclassname = pipemarker_custom.common.createClassName.text_size(key);
			text_size.name = key;
			text_size.max_char = value;
			
			});
			
			product.text_size = text_size;
	  		
			//Extract text sizes from loaded product or first product
			if (loadProductID != null || loadProductID != undefined) { 
			if (loadProductID === product_id) {
			
			$.each(loadText, function(key,value){
			
			var loadedText = this;
			loadedText.numberofline = key;
			loadedText.max_upper = product.text_size.max_char;
			$("#line-container-templates").tmpl(loadedText).appendTo("#line-container");
			
			//Append text to copy to fit preview
			
			
			});
			
			}
			
			} else if (productCount == 0) {
			
			$.each(loadText, function(key,value){
			var loadedText = this;
			loadedText.numberofline = key;
			loadedText.text_content = product_id;
			loadedText.max_upper = product.text_size.max_char;
			$("#line-container-templates").tmpl(loadedText).appendTo("#line-container");
			
			}); 
			};
	  		
	  		product_selector.sku_id = product.sku_id;
	  		product_selector_array.select_options.push(product_selector);

		});//End Product Loops
		
		/* !Load Pipemarker Select Menus into template */
		$("#size-select-menu").tmpl(product_selector_array).appendTo("#product-options");
			
		$("#color-select-menu").tmpl(color_select_array).appendTo("#product-options");
		
		/* !Notes */
		var notes = {}
		notes.note = data.notes;
		$("#minimum-quanity-template").tmpl(notes).appendTo("#minimum-quanity-container ul");

		
		pipemarker_custom.custom[action].buildProducts(data.product,$product_selector,loadText);
		var $assign_data = $("#custom-product-images");
		var $color_input = $("#nameplate_color");
		var color_to_set = pipemarker_custom.common.loadSelectedProductPreview.color($color_input, $assign_data);
		pipemarker_custom.product_config_classes.color = color_to_set;
		pipemarker_custom.common.updateClass($assign_data);
		
		 var $selector_to_bind = $("#custom-product-images"); 
	
		
		var product_selector =  $("#nameplate-size").tmplItem();
	  	var $product_selector = $(product_selector.nodes).find("select");
	  			//Grab SKU ID based on selected size. 
	  	product_sku_id = $product_selector.val();
	  	//Update product_sku object
	  	pipemarker_custom.product_sku.sku_id = product_sku_id; 
	  	//Update price 
	  	
		pipemarker_custom.common.changeProduct($selector_to_bind,$product_selector);
		//Bind Attribute Selectors
		pipemarker_custom.common.bindAttributeSelectMenus.bind_color_select($selector_to_bind, $color_input);
		/* !Bind Form Submit */
	  	var $product_form = $('#custom_products_form');
	  	pipemarker_custom.common.add_to_cart.form_submit($product_form);
	  },//End buildInterface
	  
	  buildProducts : function(duct_markers,$product_selector,loadText) {
	 	 	pipemarker_custom.common.set_up_tab_indexing($("#custom-product-selection input[type='text'], #custom-product-selection select"),$("#main-product-quantity-input"));
		
		
		pipemarker_custom.common.interaction.focus_events($("#product-options div.custom-selection, #enter-copy-sections, div.custom-text,#configure-and-pricing-tab-container,#configure-and-pricing-tab-container"));
	 
	  	$.each(duct_markers, function(key,value){
	  		var duct_marker = this;
	  		var product_id = key;
			var image_id = pipemarker_custom.common.createClassName.product_prefix_double(product_id) + 
			pipemarker_custom.common.createClassName.product_size(duct_marker.size);
	  		duct_marker.image_id = image_id;
	  		
	  			
	  		//Create class for text-size
	  		$("#product-image-template").tmpl(duct_marker).appendTo("#scroll-wrapper");
	  		var templateId = "#" + image_id;
	  
	  		var generatedProduct = $(templateId).tmplItem();
	  		
	  		var $selector_to_center = $(generatedProduct.nodes).find(".image-and-measurements");
	  		var $boundry_selector = $(generatedProduct.nodes);
	  		var $selector_to_scale = $(generatedProduct.nodes).find(".thumbnail");
	  		var $text_to_scale = $(generatedProduct.nodes).find(".product-text p");

	  		pipemarker_custom.common.centerProductImages($selector_to_center,$boundry_selector);
	  		
	  		}); //End Product Loop
	 	/* !Set Up Pipemarker Scrollers */
		 var $selector_to_bind = $("#custom-product-images");
		 var product_selector =  $("#nameplate-size").tmplItem();
	  	var $product_selector = $(product_selector.nodes).find("select");
	  	//Grab SKU ID based on selected size. 
	  	product_sku_id = $product_selector.val();
	  	//Update product_sku object
	  	pipemarker_custom.product_sku.sku_id = product_sku_id; 
	  		
		 var main_selector_api = pipemarker_custom.common.setUpScroller($selector_to_bind);
		 var selectedProductIndex = $product_selector.attr("selectedIndex");	  
		 main_selector_api.seekTo(selectedProductIndex);
		 var selectedProduct = pipemarker_custom.common.showCurrentProduct(selectedProductIndex,main_selector_api);
		//Update style object for add to cart
		var style = $product_selector.find("option:selected").text();
		pipemarker_custom.product_config.style = style;
		
		 var selectedProductText = $(selectedProduct).find("div.vertically-aligned-copy");
		selectedProductText.html("");
		//Place text on selected product 
		$.each(loadText, function(key,value){
			$("#generated-paragraph-templates").tmpl(this).appendTo(selectedProductText);	
		});
		
		 
		pipemarker_custom.common.bindAttributeSelectMenus.updatePricing(selectedProduct.find(".product-data"));
		/* !Bind Pricing */
	var pricing_input = $("#main-product-quantity-input");
	var pricing_container = $("#you-pay");
	pipemarker_custom.common.add_to_cart.bind_quanity_input(pricing_container,pricing_input);
			//Bind Text Manipulation events	
	 		//Bind Text Manipulation events	
	 	var productCustomText = $("#custom-product-images .product-text p span.copy");
	 	var productCustomInputs = $("#line-container .legend-input input.text-line");
	 	var productCustomInputContainer = $("#line-container .legend-input");
 	 	pipemarker_custom.common.bindTextManipulationEvents.line_input(productCustomText,productCustomInputs);
//Set up tooltips. May need for add/generate lines
		pipemarker_custom.common.bindTextManipulationEvents.line_input_limits(productCustomInputContainer,productCustomInputs);	
	 $("#line_1").focus();	
	}//End buildProducts  	
	},//End Duct Marker functions
/* !Build Ammonia Markers */
ammonia_markers: {
	  	buildInterface : function(data) { 
			
			var productno = $("body").data("productno");
			productno =  pipemarker_custom.common.createClassName.productno(productno);
			$("body").addClass(productno);
	  		var noDataLoaded = $.isArray(data.custom_selected);

	  		 if (noDataLoaded === false) {
	  		 	var loadProductID = data.custom_selected.productid;
				var loadBand = data.custom_selected.band;
				var loadText = {
					"1" : {}
				};
				
				loadText[1].text_content = data.custom_selected.text_content;
	  		 	

	  		 } else {
	  			
	  			var loadBand = null;
	  		 	var loadProductID = null;
				var loadMountingOption = null;
				var loadMaterialCode = null;
				var loadText = {
					"1" : {}
				};
				
				loadText[1].numberofline = "1",
				loadText[1].select_options = [],
				loadText[1].text_align = "center",
				loadText[1].text_content = "", 
				loadText[1].text_size = '1/4"'	
				
	  		 };
	  	
	  		
			var band_select_array = {
				select_options : []
			}	
			
			var product_selector_array = {
				select_options : []
			}	
	  	
	  		var band =  pipemarker_custom.common.createSelectMenu.band(data.band,loadBand);
	  		
	  		band_select_array.select_options = band;
		
		var productCount = -1;
		$.each(data.product,function(key,value){ 
			productCount = productCount + 1;
			var product = this;
			var product_id = key;
			var product_size = product.size;
			var product_style = product.style;
			var image_id = product_id;
			if ("min_quantity" in this){
			var minimum_quantity = this.min_quantity;
			pipemarker_custom.product_sku.minimum_qty = minimum_quantity;
			} else {
				pipemarker_custom.product_sku.minimum_qty = 1;
			}
	  			
	  		var product_selector = pipemarker_custom.common.createSelectMenu.product_size(product_id, product_style, productCount, loadProductID);
	  		
	  		
	  		var text_size = {};
			$.each(product.text_size, function(key,value){
			
			text_size.textclassname = pipemarker_custom.common.createClassName.text_size(key);
			text_size.name = key;
			text_size.max_char = value;
			
			});
			
			product.text_size = text_size;
	  		
	  		
			//Extract text sizes from loaded product or first product
			if (loadProductID != null || loadProductID != undefined) { 
			if (loadProductID === product_id) {
			
			$.each(loadText, function(key,value){
			
			var loadedText = this;
			loadedText.numberofline = key;
			loadedText.max_upper = product.text_size.max_char;
			$("#line-container-templates").tmpl(loadedText).appendTo("#line-container");
			
			});
			
			}
			
			} else if (productCount == 0) {
			
			$.each(loadText, function(key,value){
			var loadedText = this;
			loadedText.numberofline = key;
			loadedText.text_content = "HTRS"
			loadedText.max_upper = product.text_size.max_char;
			$("#line-container-templates").tmpl(loadedText).appendTo("#line-container");
			
			}); 
			};
	  		
	  		product_selector.sku_id = product.sku_id;
	  		product_selector_array.select_options.push(product_selector);

		});//End Product Loops
		
		/* !Load Pipemarker Select Menus into template */
		$("#size-select-menu").tmpl(product_selector_array).appendTo("#product-options");	
		$("#band-select-menu").tmpl(band_select_array).appendTo("#product-options");
		/* !Notes */
		var notes = {}
		notes.note = data.notes;
		$("#minimum-quanity-template").tmpl(notes).appendTo("#minimum-quanity-container ul");
		
		pipemarker_custom.custom[action].buildProducts(data.product,$product_selector,loadText);
		var $assign_data = $("#custom-product-images");
		var $band_input = $("#select-band");
		var band_to_set = pipemarker_custom.common.loadSelectedProductPreview.band($band_input, $assign_data);
		pipemarker_custom.product_config_classes.band = band_to_set;
		pipemarker_custom.common.updateClass($assign_data);
		
		var $selector_to_bind = $("#custom-product-images");  
		var product_selector =  $("#nameplate-size").tmplItem();
	  	var $product_selector = $(product_selector.nodes).find("select");
	  	
	  			//Grab SKU ID based on selected size. 
	  	product_sku_id = $product_selector.val();
	  	//Update product_sku object
	  	pipemarker_custom.product_sku.sku_id = product_sku_id; 
	  	//Update price 
	  	
		pipemarker_custom.common.changeProduct($selector_to_bind,$product_selector);
		//Bind Attribute Selectors
		pipemarker_custom.common.bindAttributeSelectMenus.bind_band_select($selector_to_bind, $band_input);
		/* !Bind Form Submit */
	  	var $product_form = $('#custom_products_form');
	  	pipemarker_custom.common.add_to_cart.form_submit($product_form);
	  },//End buildInterface
	  
	  buildProducts : function(ammonia_markers,$product_selector,loadText) {
	 	 	pipemarker_custom.common.set_up_tab_indexing($("#custom-product-selection input[type='text'], #custom-product-selection select"),$("#main-product-quantity-input"));
		
		
		pipemarker_custom.common.interaction.focus_events($("#product-options div.custom-selection, #enter-copy-sections, div.custom-text,#configure-and-pricing-tab-container,#configure-and-pricing-tab-container"));
	  	$.each(ammonia_markers, function(key,value){
	  		var ammonia_marker = this;
	  		var product_id = key;
			var image_id = product_id;
	  		ammonia_marker.image_id = image_id;
	  			
	  		//Create class for text-size
	  		$("#product-image-template").tmpl(ammonia_marker).appendTo("#scroll-wrapper");
	  		var templateId = "#" + image_id;
	  
	  		var generatedProduct = $(templateId).tmplItem();
	  		
	  		var $selector_to_center = $(generatedProduct.nodes).find(".image-and-measurements");
	  		var $boundry_selector = $(generatedProduct.nodes);
	  		var $selector_to_scale = $(generatedProduct.nodes).find(".thumbnail");
	  		var $text_to_scale = $(generatedProduct.nodes).find(".product-text p");
	  		
	  		
	  		pipemarker_custom.common.centerProductImages($selector_to_center,$boundry_selector);
	  		
	  		}); //End Product Loop
	 	/* !Set Up Scrollers */
		 var $selector_to_bind = $("#custom-product-images");
		 var product_selector =  $("#nameplate-size").tmplItem();
	  	var $product_selector = $(product_selector.nodes).find("select");
	  	//Grab SKU ID based on selected size. 
	  	product_sku_id = $product_selector.val();
	  	//Update product_sku object
	  	pipemarker_custom.product_sku.sku_id = product_sku_id; 	
		 var main_selector_api = pipemarker_custom.common.setUpScroller($selector_to_bind);
		 var selectedProductIndex = $product_selector.attr("selectedIndex");	  
		 main_selector_api.seekTo(selectedProductIndex);
		 var selectedProduct = pipemarker_custom.common.showCurrentProduct(selectedProductIndex,main_selector_api);
		 var selectedProductText = $(selectedProduct).find("div.vertically-aligned-copy");
		selectedProductText.html("");
		//Update style object for add to cart
	var style = $product_selector.find("option:selected").text();
	pipemarker_custom.product_config.style = style;
	
			pipemarker_custom.common.bindAttributeSelectMenus.updatePricing(selectedProduct.find(".product-data")); 
		//Place text on selected product 
		$.each(loadText, function(key,value){
		
			$("#generated-paragraph-templates").tmpl(this).appendTo(selectedProductText);	
		}); 
		pipemarker_custom.common.bindAttributeSelectMenus.updatePricing(selectedProduct.find(".product-data"));
		/* !Bind Pricing */
	var pricing_input = $("#main-product-quantity-input");
	var pricing_container = $("#you-pay");
	pipemarker_custom.common.add_to_cart.bind_quanity_input(pricing_container,pricing_input);
			//Bind Text Manipulation events	
	 		//Bind Text Manipulation events	
	 	var productCustomText = $("#custom-product-images .product-text p span.copy");
	 	var productCustomInputs = $("#line-container .legend-input input.text-line");
	 	var productCustomInputContainer = $("#line-container .legend-input");
 	 	pipemarker_custom.common.bindTextManipulationEvents.line_input(productCustomText,productCustomInputs);
//Set up tooltips. May need for add/generate lines
		pipemarker_custom.common.bindTextManipulationEvents.line_input_limits(productCustomInputContainer,productCustomInputs);	
	 $("#line_1").focus();	
	}//End buildProducts  	
	},//End Ammonia Marker functions
/* !Underground Tape */
underground_tape: {
	  	buildInterface : function(data) { 
			
	  		var noDataLoaded = $.isArray(data.custom_selected);

	  		 if (noDataLoaded === false) {
	  		  	var loadColor = data.custom_selected.color;
	  		 	var loadProductID = data.custom_selected.productid;
				var loadColor = data.custom_selected.color;
				var loadText = {
					"1" : {}
				};
				
				loadText[1].text_content = data.custom_selected.text_content;
	  		 	

	  		 } else {
	  			
	  			var loadColor = null;
	  		 	var loadProductID = null;
				var loadMountingOption = null;
				var loadMaterialCode = null;
				var loadText = {
					"1" : {}
				};
				
				loadText[1].numberofline = "1",
				loadText[1].select_options = [],
				loadText[1].text_align = "center",
				loadText[1].text_content = "", 
				loadText[1].text_size = '1/4"'	
				
	  		 };
	  	
	  		
			var color_select_array = {
				select_options : []
			}	
			
			var product_selector_array = {
				select_options : []
			}	
	  	
	  		var colors =  pipemarker_custom.common.createSelectMenu.color(data.color,loadColor);
	  		
	  		color_select_array.select_options = colors;
		
		var productCount = -1;
		$.each(data.product,function(key,value){ 
			productCount = productCount + 1;
			var product = this;
			var product_id = key;
			var product_size = product.size;
			var image_id = pipemarker_custom.common.createClassName.product_prefix_double(product_id) + 
			pipemarker_custom.common.createClassName.product_size(product_size);
			if ("min_quantity" in this){
			var minimum_quantity = this.min_quantity;
			pipemarker_custom.product_sku.minimum_qty = minimum_quantity;
			} else {
				pipemarker_custom.product_sku.minimum_qty = 1;
			}
	  			
	  		var product_selector = pipemarker_custom.common.createSelectMenu.product_size(product_id, product_size, productCount, loadProductID);
	  		
	  		
	  		var text_size = {};
			$.each(product.text_size, function(key,value){
			
			text_size.textclassname = pipemarker_custom.common.createClassName.text_size(key);
			text_size.name = key;
			text_size.max_char = value;
			
			});
			
			product.text_size = text_size;
	  		
			//Extract text sizes from loaded product or first product
			if (loadProductID != null || loadProductID != undefined) { 
			if (loadProductID === product_id) {
			
			$.each(loadText, function(key,value){
			
			var loadedText = this;
			loadedText.numberofline = key;
			loadedText.max_upper = product.text_size.max_char;
			$("#line-container-templates").tmpl(loadedText).appendTo("#line-container");
			
			//Append text to copy to fit preview
			});
			
			}
			
			} else if (productCount == 0) {
			
			$.each(loadText, function(key,value){
			var loadedText = this;
			loadedText.numberofline = key;
			loadedText.text_content = product_id;
			loadedText.max_upper = product.text_size.max_char;
			$("#line-container-templates").tmpl(loadedText).appendTo("#line-container");
			
			}); 
			};
	  		
	  		product_selector.sku_id = product.sku_id;
	  		product_selector_array.select_options.push(product_selector);

		});//End Product Loops
		
		/* !Load Pipemarker Select Menus into template */
		$("#size-select-menu").tmpl(product_selector_array).appendTo("#product-options");	
		$("#color-select-menu").tmpl(color_select_array).appendTo("#product-options");
		/* !Notes */
		var notes = {}
		notes.note = data.notes;
		$("#minimum-quanity-template").tmpl(notes).appendTo("#minimum-quanity-container ul");
		
		pipemarker_custom.custom[action].buildProducts(data.product,$product_selector,loadText);
		var $assign_data = $("#custom-product-images");
		var $color_input = $("#nameplate_color");
		var color_to_set = pipemarker_custom.common.loadSelectedProductPreview.color($color_input, $assign_data);
		pipemarker_custom.product_config_classes.color = color_to_set;
		pipemarker_custom.common.updateClass($assign_data);
		
		var $selector_to_bind = $("#custom-product-images"); 
		var product_selector =  $("#nameplate-size").tmplItem();
	  	var $product_selector = $(product_selector.nodes).find("select");
	  			//Grab SKU ID based on selected size. 
	  	product_sku_id = $product_selector.val();
	  	//Update product_sku object
	  	pipemarker_custom.product_sku.sku_id = product_sku_id; 
	  	//Update price 
	  
		pipemarker_custom.common.changeProduct($selector_to_bind,$product_selector);
		//Bind Attribute Selectors
		pipemarker_custom.common.bindAttributeSelectMenus.bind_color_select($selector_to_bind, $color_input);
			/* !Bind Form Submit */
	  	var $product_form = $('#custom_products_form');
	  	pipemarker_custom.common.add_to_cart.form_submit($product_form);
	  },//End buildInterface
	  
	  buildProducts : function(underground_tape,$product_selector,loadText) {
	 	 	pipemarker_custom.common.set_up_tab_indexing($("#custom-product-selection input[type='text'], #custom-product-selection select"),$("#main-product-quantity-input"));
		
		
		pipemarker_custom.common.interaction.focus_events($("#product-options div.custom-selection, #enter-copy-sections, div.custom-text,#configure-and-pricing-tab-container,#configure-and-pricing-tab-container"));
	  	$.each(underground_tape, function(key,value){
	  		var underground_tape = this;
	  		var product_id = key;
			var image_id = product_id;
	  		underground_tape.image_id = image_id;
	  			
	  		//Create class for text-size
	  		$("#product-image-template").tmpl(underground_tape).appendTo("#scroll-wrapper");
	  		var templateId = "#" + image_id;
	  
	  		var generatedProduct = $(templateId).tmplItem();
	  		
	  		var $selector_to_center = $(generatedProduct.nodes).find(".image-and-measurements");
	  		var $boundry_selector = $(generatedProduct.nodes);
	  		var $selector_to_scale = $(generatedProduct.nodes).find(".thumbnail");
	  		var $text_to_scale = $(generatedProduct.nodes).find(".product-text p");	
	  		pipemarker_custom.common.centerProductImages($selector_to_center,$boundry_selector);
	  		
	  		}); //End Product Loop
	 	/* !Set Up Pipemarker Scrollers */
		 var $selector_to_bind = $("#custom-product-images");
		 var product_selector =  $("#nameplate-size").tmplItem();
	  		var $product_selector = $(product_selector.nodes).find("select");
		 var main_selector_api = pipemarker_custom.common.setUpScroller($selector_to_bind);
		 var selectedProductIndex = $product_selector.attr("selectedIndex");	  
		 main_selector_api.seekTo(selectedProductIndex);
		 var selectedProduct = pipemarker_custom.common.showCurrentProduct(selectedProductIndex,main_selector_api);
		 var selectedProductText = $(selectedProduct).find("div.vertically-aligned-copy");
		 
		//Update style object for add to cart
		var style = $product_selector.find("option:selected").text();
		pipemarker_custom.product_config.style = style;
	
		 //Grab SKU ID based on selected size. 
	  	product_sku_id = $product_selector.val();
	  	//Update product_sku object
	  	pipemarker_custom.product_sku.sku_id = product_sku_id; 
		selectedProductText.html("");
		//Place text on selected product 
		$.each(loadText, function(key,value){
			$("#generated-paragraph-templates").tmpl(this).appendTo(selectedProductText);	
		}); 
		pipemarker_custom.common.bindAttributeSelectMenus.updatePricing(selectedProduct.find(".product-data"));
		/* !Bind Pricing */
	var pricing_input = $("#main-product-quantity-input");
	var pricing_container = $("#you-pay");
	pipemarker_custom.common.add_to_cart.bind_quanity_input(pricing_container,pricing_input);
			//Bind Text Manipulation events	
	 		//Bind Text Manipulation events	
	 	var productCustomText = $("#custom-product-images .product-text p span");
	 	var productCustomInputs = $("#line-container .legend-input input.text-line");
	 	var productCustomInputContainer = $("#line-container .legend-input");
 	 	pipemarker_custom.common.bindTextManipulationEvents.line_input(productCustomText,productCustomInputs);
//Set up tooltips. May need for add/generate lines
		pipemarker_custom.common.bindTextManipulationEvents.line_input_limits(productCustomInputContainer,productCustomInputs);	
	 $("#line_1").focus();	
	}//End buildProducts  	
	},//End Underground Tape functions
/* !Build Custom Stencils */
stencils: {
	buildInterface : function(data) { 
		var noDataLoaded = $.isArray(data.custom_selected);
		 if (noDataLoaded === false) {
	  		  	var loadLayout = data.custom_selected.text_detail.layout;
	  		 	var loadProductID = data.custom_selected.productid;
				var loadTextSize = data.custom_selected.text_detail.text_size;
				var loadText = {
					"1" : {}
				};
				loadText[1].numberofline = "1",
				loadText[1].select_options = [],
				loadText[1].text_content = data.custom_selected.text_detail.text_content,
				loadText[1].text_size = data.custom_selected.text_detail.text_size
	  		 } else {
	  			
	  			var loadLayout = null;
	  		 	var loadProductID = null;
				var loadTextSize =	null;
				var loadText = {
					"1" : {}
				};
				loadText[1].numberofline = "1",
				loadText[1].select_options = [],
				loadText[1].text_content = "", 
				loadText[1].text_size = '1/2"'	
				
	  		 };
	  	 
		var material_selector_array = {
				select_options : []
			};
	  		
	  		var layout_select_array = {
	  			select_options : []
	  		}
	  		
			var textsize_select_array = {
				select_options : []
			}		 
	
	var layout = pipemarker_custom.common.createSelectMenu.layout(data.layout,loadLayout);
	
		/* Start building global select menus */
		layout_select_array.select_options = layout;
		
		var productCount = -1;
			
		$.each(data.product,function(key,value){ 
			productCount = productCount + 1;
			var product = this;
	  			var product_id = key;
	  			var product_material = product.material;
	  			var image_id = product_id;
	  			product.text_sizes_template = [];
	  			var minimum_quantity = this.min_quantity;
			pipemarker_custom.product_sku.minimum_qty = minimum_quantity;
	  			//Loop through text size to create class names and add to object
	  			
	  			$.each(product.stencil_textsize, function(key,value){
					var textsize = this;
						$.each(textsize.text_size, function(key,value){
							textsize.textclassname = pipemarker_custom.common.createClassName.text_size(key);
							textsize.name = key;
							textsize.max_upper = 30;
						});
					product.text_sizes_template.push(textsize);	
				});	
				
				if (loadProductID != null || loadProductID != undefined) { 
	  				if (loadProductID === product_id) { 
	  				$.each(loadText, function(key,value){	
	  					var loadedText = this;
	  					
						loadedText.numberofline = key;
						var text_size = pipemarker_custom.common.createSelectMenu.stencil_text_size(product.text_sizes_template,loadedText);
						textsize_select_array.select_options = text_size;
						loadedText.textclassname = pipemarker_custom.common.createClassName.text_size(loadedText.text_size);
					
			$("#line-container-templates").tmpl(loadedText).appendTo("#line-container");
			});
	  				
	  					}	
	  				} else if (productCount == 0) {
	  					
					$.each(loadText, function(key,value){
						var loadedText = this;
						
						loadedText.numberofline = key;
						loadedText.text_content = product_id;
						var text_size = pipemarker_custom.common.createSelectMenu.stencil_text_size(product.text_sizes_template,loadedText);
						textsize_select_array.select_options = text_size;
						loadedText.textclassname = pipemarker_custom.common.createClassName.text_size(loadedText.text_size);
						
						$("#line-container-templates").tmpl(loadedText).appendTo("#line-container");
					
					}); 
	  				
	  				};
				//Build material Selector
				var material_selector = pipemarker_custom.common.createSelectMenu.stencil_material(product_id, product_material, productCount, loadProductID);
	  			material_selector_array.select_options.push(material_selector);
	  			
		});			  		
	/* Append Menus to templates */
		$("#material-select-menu").tmpl(material_selector_array).appendTo("#product-options");
		$("#textsize-select-menu").tmpl(textsize_select_array).appendTo("#product-options");
		$("#layout-select-menu").tmpl(layout_select_array).appendTo("#product-options");
		/* !Notes */
		var notes = {}
		notes.note = data.notes;
		$("#minimum-quanity-template").tmpl(notes).appendTo("#minimum-quanity-container ul");
	//Show selected options
	var product_sku_id = $("#textsize-select select.select-text-size").val(); 
	pipemarker_custom.product_sku.sku_id = product_sku_id;
	pipemarker_custom.custom[action].buildProducts(data.product,loadText);
		
	/* !Bind Form Submit */
	var $product_form = $('#custom_products_form');
	pipemarker_custom.common.add_to_cart.form_submit($product_form);
	//Update hidden text_size input;
	$("#select-text-size").val(pipemarker_custom.product_config.stencil_text_size);
		
	},//End buildInterface
	  
	buildProducts : function(stencils,loadText) {
	 	 	pipemarker_custom.common.set_up_tab_indexing($("#custom-product-selection input[type='text'], #custom-product-selection select"),$("#main-product-quantity-input"));
		
		
		pipemarker_custom.common.interaction.focus_events($("#product-options div.custom-selection, #enter-copy-sections, div.custom-text,#configure-and-pricing-tab-container,#configure-and-pricing-tab-container"));
	  $.each(stencils, function(key,value){
	  var stencil = this;
	  var product_id = key;
	  var image_id = product_id;
	  image_id = image_id.replace(/\./g, ''); 
	  stencil.image_id = image_id;
	  
	 $("#product-image-template").tmpl(stencil).appendTo("#scroll-wrapper");
	 	//Find template nodes for centering
	var templateId = "#" + image_id;
	
	var generatedProduct = $(templateId).tmplItem();
	
	var $selector_to_center = $(generatedProduct.nodes).find(".image-and-measurements");
	var $boundry_selector = $(generatedProduct.nodes);
	
	pipemarker_custom.common.centerProductImages($selector_to_center,$boundry_selector);
	  
	  });//End Product loop
	  //Show the selected options on the preview images
	   var $assign_data = $("#custom-product-images");
	   var $layout_input = $("#stencil_layout");
	   var classes_to_set = [];
	   var layout_to_set = pipemarker_custom.common.loadSelectedProductPreview.layout($layout_input, $assign_data);
	  pipemarker_custom.product_config_classes.layout = layout_to_set;
	  pipemarker_custom.common.updateClass($assign_data);
	  
	  /* !Set Up Scroller */
		var product_selector =  $("#material-select").tmplItem();
		var $product_selector = $(product_selector.nodes).find("select");
		var $selector_to_bind = $("#custom-product-images");
		var $layout_options_input = $("#stencil_layout");
		var $stencil_text_size_select = $("#textsize-select select");
	var main_selector_api = pipemarker_custom.common.setUpScroller($selector_to_bind);
	var selectedProductIndex = $product_selector.attr("selectedIndex");	
	 main_selector_api.seekTo(selectedProductIndex);
	 	 var selectedProduct = pipemarker_custom.common.showCurrentProduct(selectedProductIndex,main_selector_api);
	 	 var selectedProductText = $(selectedProduct).find("div.vertically-aligned-copy");
	 pipemarker_custom.common.bindAttributeSelectMenus.updatePricing(selectedProduct.find(".product-data"));
	 /* !Bind Pricing */
	var pricing_input = $("#main-product-quantity-input");
	var pricing_container = $("#you-pay");
	pipemarker_custom.common.add_to_cart.bind_quanity_input(pricing_container,pricing_input);
	 //Update style object for add to cart
	var style = $product_selector.find("option:selected").text();
	pipemarker_custom.product_config.style = style;
	
	 pipemarker_custom.common.changeProduct($selector_to_bind,$product_selector);
	 //Bind Select Menus
		pipemarker_custom.common.bindAttributeSelectMenus.bind_layout_select($selector_to_bind, $layout_options_input);
		
	 		pipemarker_custom.common.bindAttributeSelectMenus.bind_stencil_textsize_select($selector_to_bind, $stencil_text_size_select);
	 
	 selectedProductText.html("");
		//Place text on selected product 
		$.each(loadText, function(key,value){
	  		$("#generated-paragraph-templates").tmpl(this).appendTo(selectedProductText);	
	  	}); 
	 
	 	//Bind Text Manipulation events	
	 	var productCustomText = $("#custom-product-images .product-text p span.copy");
	 	var productCustomInputs = $("#line-container .legend-input input.text-line");
	 	var productCustomInputContainer = $("#line-container .legend-input");
 	 	pipemarker_custom.common.bindTextManipulationEvents.line_input(productCustomText,productCustomInputs);
 	 	pipemarker_custom.common.bindTextManipulationEvents.line_input_limits(productCustomInputContainer,productCustomInputs);
 	 	pipemarker_custom.common.bindTextManipulationEvents.activate_counter(productCustomInputs);
	  $("#line_1").focus();	
	}//End buildProducts  	
	}//End Stencil functions
}//End custom functions
};

UTIL = {
  exec: function( controller, action ) {
    var ns = pipemarker_custom,
        action = ( action === undefined ) ? "init" : action;

    if ( controller !== "" && ns[controller] && typeof ns[controller][action] == "function" ) {
      ns[controller][action]();
    }
  },

  init: function() {
    var body = $("body");
        controller = body.data('product-controller');
        action = body.data('category');
        action = action.split(' ').join('_');
        action = action.toLowerCase();
		if (typeof console == "undefined") {
		this.console = {log: function() {}};
		}
		
    UTIL.exec( "common" );
    UTIL.exec( controller );
    UTIL.exec( controller, action );
  }
};

$( document ).ready( UTIL.init );
