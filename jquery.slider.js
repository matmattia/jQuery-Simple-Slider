/**
 * jQuery Simple Slider
 * @name jquery.slider.js
 * @author Mattia - http://www.matriz.it
 * @version 1.1.0
 * @date May 6, 2015
 * @category jQuery plugin
 * @copyright (c) 2015 Mattia at Matriz.it (info@matriz.it)
 * @license MIT - http://opensource.org/licenses/mit-license.php
 * @example Visit http://www.matriz.it/projects/jquery-simple-slider/ for more informations about this jQuery plugin
 */
(function($) {
	"use strict";
	$.fn.slider = function(options) {
		var opts = $.extend({
			'duration': 500,
			'easing': 'swing',
			'children': 'img',
			'prev': 'a.prev',
			'next': 'a.next'
		}, options);
		
		return this.each(function() {
			var slider = {
				'el': null,
				'opts': {},
				'index': 0,
				'is_moving': false,
				'init': function(el, opts) {
					var that = this, children = null, css = {'overflow': 'hidden'};
					this.el = $(el);
					this.opts = opts;
					children = this.getChildren();
					if (children.length > 0) {
						if (this.el.css('position') == 'static') {
							css.position = 'relative';
						}
						this.el.css(css);
						children.each(function(i) {
							var c = $(this), css = {
								'top': 0,
								'width': '100%'
							};
							if (c.css('position') == 'static') {
								css.position = i > 0 ? 'absolute' : 'relative';
							}
							css.left = (i * 100) + '%';
							c.css(css);
						});
						this.getPrev().click(function() {
							that.prev();
							return false;
						});
						this.getNext().click(function() {
							that.next();
							return false;
						});
					}
				},
				'prev': function() {
					this.scrollTo(false);
				},
				'next': function() {
					this.scrollTo(true);
				},
				'scrollTo': function(is_next) {
					var that = this, i = is_next ? this.index + 1 : this.index - 1;
					if (!this.is_moving && this.getChild(i)) {
						this.is_moving = true;
						this.getChildren().animate({'left': (is_next ? '-' : '+') + '=100%'}, this.opts.duration, this.opts.easing, function() {
							that.is_moving = false;
						});
						this.index = i;
					}
				},
				'getChildren': function() {
					return this.el.find(this.opts.children);
				},
				'getChild': function(i) {
					var children = this.getChildren(), child = null;
					if (!isNaN(i) && i >= 0 && i < children.length && children[i]) {
						child = $(children[i]);
					}
					return child;
				},
				'getPrev': function() {
					return $(this.opts.prev);
				},
				'getNext': function() {
					return $(this.opts.next);
				}
			};
			slider.init(this, opts);
		});
	};
})(jQuery);