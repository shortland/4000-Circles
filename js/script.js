/*
* Ilan Kleiman
* Original:
* February 7th 2015
* Latest edit:
* December 4th 2016
* 4000 circles - script.js
* http://ilankleiman.com
*/

// release speed of a circle
var release = 50; // in ms (.05s)

// move speed of a circle to its defined location after release
var movement = 2000; // in ms (2s)

// callback speed: once a circle is released, it is slowly brough back to its original corner, this defines the amount of time for each circle to take on moving back to its corner
var callback = 20000; // in ms (30s)

// max-size variant; 1 is largest, '10' is smallest.
// 1 = 1/2 of window width. 2 = ((1/2)/2) = 1/4 of window width). 3 = 1/6 window width. 4 = 1/8 window width (max size is 1/8 of window width)
var variant = 1; // Math.floor(Math.random() * 10) + 1; // or a random number everytime you reload the page

function getRandomColor()
{
	var letters = '0123456789ABCDEF'.split('');
	var color = '';
	for (var i = 0; i < 6; i++ ) {
	color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
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
			'background-color' : '#' + bg_color,
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
			'background-color' : '#' + bg_color,
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
			'background-color' : '#' + bg_color,
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
			'background-color' : '#' + bg_color,
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
