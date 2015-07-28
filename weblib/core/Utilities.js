
/**
 * Get the window size.
 * @return {Object} and object with {x,y} representing the width and height of the window respectively.
 */
function getWinSize() {
	return winSize = {
		x:$(window).width(),
		y:$(window).height()
	};
};

/**
 * Get the current date.
 * @return {Object} and object with {d,m,y} representing the day, month and year.
 */
function getCurDate() {
	var newDate = new Date();
	return curDate = {
		d: newDate.getDate(),
		m: newDate.getMonth()+1,
		y: newDate.getFullYear()
	};
}

/**
 * Translate an element a given amount in the x, y a z axes.
 * @param  {string} elem - A jQuery selector to find the element.
 * @param  {Number} x    - The amount to translate the object along the x axis.
 * @param  {Number} y    - The amount to translate the object along the y axis.
 * @param  {Number} z    - The amount to translate the object along the z axis.
 */
function translate(elem, x, y, z){
	var elemMatrix = 	getMatrix(elem),
		matrixType =	elemMatrix[1].length == 6 ? '2D' : elemMatrix[1].length == 17 ? '3D' : undefined,
		translateAxis = {
			x: x !== undefined ? x : matrixType == '2D' ? elemMatrix[1][4] : matrixType == '3D' ? elemMatrix[1][13] : 0,
			y: y !== undefined ? y : matrixType == '2D' ? elemMatrix[1][5] : matrixType == '3D' ? elemMatrix[1][14] : 0,
			z: z !== undefined ? z : matrixType == '2D' ? 0 : matrixType == '3D' ? elemMatrix[1][15] : 0
		};
	$(elem).css(prefix.css + 'transform', 'translateX(' + translateAxis.x + 'px) translateY(' + translateAxis.y + 'px) translateZ(' + translateAxis.z + 'px)');
};

/**
 * Get the transformation matrix for a given element.
 * @param  {string} element - A jQuery selector to find the element.
 * @return {Array}        - An array containing the matrix and it's values in the form [matrix, values].
 */
function getMatrix(element) {

	var	matrix = $(element).css(prefix.css + 'transform');
	matrixValues = matrix.match(/-?[0-9\.]+/g);

	return [matrix, matrixValues];
};

/**
 * Set base site origin variable.
 * @param  {string} class/id of element to be check for its orientation.
 * @return {classname} - Set orientation class name to element specifie.
 */	
function getOrientationOf(element) {
		
		if(site.winSize.y > site.winSize.x){
			$(element).removeClass('landscape');
			$(element).addClass('portrait');
			console.log('orientation of ' + element + ': portrait');
			
		} else if(site.winSize.x > site.winSize.y){
			$(element).removeClass('portrait');
			$(element).addClass('landscape');
			console.log('orientation of ' + element + ': landscape');
			
		} else {
			console.log('orientation not detected');
		};
};

/**
 * Add css prefixes to elements that need them.
 * @return {[typ
 */
function prefix() {
	var styles = window.getComputedStyle(document.documentElement, '');

	pre = (Array.prototype.slice
			.call(styles)
			.join('')
			.match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
		)[1],
		dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1];
	return prefix = {
		dom: dom,
		lowercase: pre,
		css: '-' + pre + '-',
		js: pre[0].toUpperCase() + pre.substr(1)
	};
};

/**
 * Check if something exists.
 * @return {Boolean} - true if the object exists, false otherwise.
 */
$.fn.exists = function () {
    return this.length !== 0;
}

/**
 * Used to generate font size on body for em dynamic rezing on screen size change
 */
$.fn.flowtype = function(options) {

  var settings = $.extend({
	 maximum   : 9999,
	 minimum   : 1,
	 maxFont   : 9999,
	 minFont   : 1,
	 fontRatio : 30
  }, options),

  changes = function(el) {
	 var $el = $(el),
		elw = $el.width(),
		width = elw > settings.maximum ? settings.maximum : elw < settings.minimum ? settings.minimum : elw,
		fontBase = width / settings.fontRatio,
		fontSize = fontBase > settings.maxFont ? settings.maxFont : fontBase < settings.minFont ? settings.minFont : fontBase;
	 $el.css('font-size', fontSize + 'px');
  };

  return this.each(function() {
  // Context for resize callback
	 var that = this;
  // Make changes upon resize
	 $(window).resize(function(){changes(that);});
  // Set changes on load
	 changes(this);
  });
};


/**
 * Copy JSON data into an object, using an asynchronous JQuery call.
 * @param  jsonFile {string} - Thje path to the JSON file to load.
 * @param  object {Object} - The object to put the data into.
 * @param  complete {function} - The function to run on complete.
 * @return {JQuery Object} - JQuery object, if you want to chain more calls.
 */
function copyJSONIntoObject(jsonFile, object, complete) {
	return $.getJSON(jsonFile, 
		function (data) {
			for (var attr in data) {
				object[attr] = data[attr];	
			}
		}).error( 
		function(jqXHR, textStatus, errorThrown) {
			console.log('getJSON error: ', textStatus);
			console.log('getJSON errorThrown: ', errorThrown);
			console.log('arguments: ', arguments);
			console.log("getJSON incoming Text " + jqXHR.responseText);
		}).complete(complete);
}
/**
 * Set window location to a new URL
 */
function newPage(newurl) {
	// set the new url in the window
	window.location = newurl;
}