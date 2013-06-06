/**
* jQuery Simple Slider
* @name jquery.slider.js
* @author Mattia - http://www.matriz.it
* @version 1.0.0
* @date June 6, 2013
* @category jQuery plugin
* @copyright (c) 2013 Mattia at Matriz.it (info@matriz.it)
* @license MIT - http://opensource.org/licenses/mit-license.php
* @example Visit http://www.matriz.it/projects/jquery-simple-slider/ for more informations about this jQuery plugin
*/
(function($) {
	var slider = {
		'init': function(el, opts) {
			var t = $(el), t_w = t.css('width'),
				children = this.getChildren(el, opts), l = children.length, i = 0,
				w = 0;
			if (l > 0) {
				for (i = 0; i < l; i++) {
					w += $(children[i]).outerWidth(true);
				}
				t.css({
					'overflow': 'hidden',
					'width': t_w
				});
				this.getContent(el, opts).css('width', w);
				this.getPrev(el, opts).click(function() {
					slider.prev(el, opts);
					return false;
				});
				this.getNext(el, opts).click(function() {
					slider.next(el, opts);
					return false;
				});
			}
		},
		'prev': function(el, opts) {
			this.scrollTo(el, opts, false);
		},
		'next': function(el, opts) {
			this.scrollTo(el, opts, true);
		},
		'scrollTo': function(el, opts, is_next) {
			var children = this.getChildren(el, opts), l = children.length, i = 0,
				w = 0, prev_w = 0,
				scroll = 0, new_scroll = 0;
			el = $(el);
			scroll = el.scrollLeft()
			for (i = 0; i < l; i++) {
				prev_w = w;
				w += $(children[i]).outerWidth(true);
				if (is_next && w > scroll) {
					new_scroll = w;
					break;
				} else if (!is_next && w >= scroll) {
					new_scroll = prev_w;
					break;
				}
			}
			el.animate({'scrollLeft': new_scroll}, opts.duration);
		},
		'getContent': function(el, opts) {
			return $(el).find(opts.content);
		},
		'getChildren': function(el, opts) {
			return $(el).find(opts.children);
		},
		'getPrev': function(el, opts) {
			return $(opts.prev);
		},
		'getNext': function(el, opts) {
			return $(opts.next);
		}
	};

	$.fn.slider = function(options) {
		var opts = $.extend({
			'duration': 500,
			'children': 'img',
			'content': '.content',
			'prev': 'a.prev',
			'next': 'a.next'
		}, options);
		
		return this.each(function() {
			slider.init(this, opts);
		});
	};
})(jQuery);