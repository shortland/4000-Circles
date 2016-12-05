/*
* Ilan Kleiman
* Original:
* February 7th 2015
* Latest edit:
* December 5th 2016
* 4000 circles - script.js
* http://ilankleiman.com
*/

// along with Better Colors

// release speed of a circle
var release = 50; // in ms (.05s)

// move speed of a circle to its defined location after release
var movement = 2000; // in ms (2s)

// callback speed: once a circle is released, it is slowly brough back to its original corner, this defines the amount of time for each circle to take on moving back to its corner
var callback = 20000; // in ms (30s)

// max-size variant; 1 is largest, '10' is smallest.
// 1 = 1/2 of window width. 2 = ((1/2)/2) = 1/4 of window width). 3 = 1/6 window width. 4 = 1/8 window width (max size is 1/8 of window width)
var variant = 1; // Math.floor(Math.random() * 10) + 1; // or a random number everytime you reload the page

function HSVtoRGB(h, s, v) {
    var r, g, b, i, f, p, q, t;
    if (arguments.length === 1) {
        s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return Math.round(r * 255) + ", " + Math.round(g * 255) + ", " + Math.round(b * 255);
}

function getRandomColor()
{
	/*
	var letters = '0123456789ABCDEF'.split('');
	var color = '';
	for (var i = 0; i < 6; i++ ) {
	color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
	*/
	
	// Better Colors
	// http://martin.ankerl.com/2009/12/09/how-to-create-random-colors-programmatically/
	var golden_ratio_conjugate = 0.618033988749895;
	var h = Math.random(); // use random start value
	h += golden_ratio_conjugate;
	h %= 1;
	return HSVtoRGB(h, 0.5, 0.95);
}

function getDiameter()
{
	var max_size = ($(window).width() / 2) / variant;
	var diameter = Math.floor((Math.random() * max_size) + 20);
	var diameter = Math.floor(diameter / 2);
	return diameter;
}

function getMaxLeft(diameter)
{
	var max_width = $(window).width() - diameter;
	var position = Math.floor((Math.random() * max_width) + 1) - 1;
	return position;
}

function getMaxTop(diameter)
{
	var pre_max = $(window).height();
	var max_height = pre_max - diameter;
	var position = Math.floor((Math.random() * max_height) + 1) - 1;
	return position;
}

function remove_circle(idit) {
	$('#circle_tl_' + idit).remove();
	$('#circle_tr_' + idit).remove();
	$('#circle_bl_' + idit).remove();
	$('#circle_br_' + idit).remove();
}

function size_circle(idit)
{
	var diameter = getDiameter();
	var bg_color = getRandomColor();
	var left = getMaxLeft(diameter);
	var topt = getMaxTop(diameter);
	var radius = diameter / 2;

	var half_animate_top = topt / 1;
	var half_animate_left = left / 1;

	var current = parseInt($('#count').html());
	var new_amount = current + 4;
	$('#count').html(new_amount);

	$('#circle_tl_' + idit).animate(
		{
			'width' : diameter, 
			'height' : diameter, 
			'background-color' : "rgb(" + bg_color + ")",
			'border-radius' : radius,
			'top' : topt + 'px',
			'left' : left + 'px'
		},
		movement,
		function()
		{
			$('#circle_tl_' + idit).animate({
				'top' : '-=' + half_animate_top + 'px',
				'left' : '-=' + half_animate_left + 'px',
			},
			callback
			);
		}
	);
	$('#circle_br_' + idit).animate(
		{
			'width' : diameter, 
			'height' : diameter, 
			'background-color' : "rgb(" + bg_color + ")",
			'border-radius' : radius,
			'bottom' : topt + 'px',
			'right' : left + 'px'
		},
		movement,
		function()
		{
			$('#circle_br_' + idit).animate({
				'bottom' : '-=' + half_animate_top + 'px',
				'right' : '-=' + half_animate_left + 'px',
			},
			callback
			);
		}
	);
	$('#circle_tr_' + idit).animate(
		{
			'width' : diameter, 
			'height' : diameter, 
			'background-color' : "rgb(" + bg_color + ")",
			'border-radius' : radius,
			'top' : topt + 'px',
			'right' : left + 'px'
		},
		movement,
		function()
		{
			$('#circle_tr_' + idit).animate({
				'top' : '-=' + half_animate_top + 'px',
				'right' : '-=' + half_animate_left + 'px',
			},
			callback
			);
		}
	);
	$('#circle_bl_' + idit).animate(
		{
			'width' : diameter, 
			'height' : diameter, 
			'background-color' : "rgb(" + bg_color + ")",
			'border-radius' : radius,
			'bottom' : topt + 'px',
			'left' : left + 'px'
		},
		movement,
		function()
		{
			$('#circle_bl_' + idit).animate({
				'bottom' : '-=' + half_animate_top + 'px',
				'left' : '-=' + half_animate_left + 'px',
			},
			callback
			);
		}
	);

	setTimeout("remove_circle(" + idit +")", callback);
	
}

function fire_events(idit)
{
	if(idit == '1001')
	{
		return false;
	}
	else
	{
		var new_idit = idit + 1;
		size_circle(idit);
		setTimeout("fire_events(" + new_idit + ")", release);
	}
}

$(document).ready(function()
{
	//alert('Press OK to begin!');
	for (i = 0; i <= 1000; i++)
	{
		$('#writer').append("<div id='circle_tl_" + i + "' class='circles_tl'></div>\n");
		$('#writer').append("<div id='circle_br_" + i + "' class='circles_br'></div>\n");
		$('#writer').append("<div id='circle_tr_" + i + "' class='circles_tr'></div>\n");
		$('#writer').append("<div id='circle_bl_" + i + "' class='circles_bl'></div>\n");
		if(i == '1000')
		{
			fire_events('0');
		}
	}
});
