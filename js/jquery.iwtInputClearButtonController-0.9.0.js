/**
 * input 태그에 clear 버튼 기능 추가하기
 * 일반적으로 값이 입력이 돼도 포커스가 있을때만 나타나지만
 * 포커스와 상관없이 값이 있으면 무조건 표시되게 함
 * jquery.iwtInputClearButtonController-0.9.0.js
 * requires jQuery v1.4.2 or later
 *
 * @author incree <incree@incree.com>
 * @copyright incree 2013.08.06 GPL Version 2 license
 * @version 0.9.0
 * 
 */
(function($) {
	window.isMsClearDisplayNoneStyleAdded = false;
	
	var ua = navigator.userAgent,
  		ie = /msie|Trident/i.test(ua);

	$.iwtInputClearButtonController = {
		defaultOptions: {
			image:'btn_textClear.gif',   // 삭제 이미지
			position:'relative',         // 이미지의 position
			className: '',               // 이미지에 적용할 class
			appendTarget:'',             // 없으면 input 의 parent로, 설정할 경우는 jquery object로(ex : $('body'))
			top:'',                      // position이 relative or absolute 일때 top 좌표
			left:'',                     // position이 relative or absolute 일때 left 좌표
			bottom:'',                   // position이 relative or absolute 일때 bottom 좌표
			right:''                     // position이 relative or absolute 일때 right 좌표
		}
	}

	$.fn.iwtInputClearButtonController = function(options) {
		if(ie && !window.isMsClearDisplayNoneStyleAdded) {
			// ie10에 자체적으로 표시되는 clear 버튼을 감춘다(.someinput::-ms-clear {display: none;})
			// 메타 태그에 X-UA-Compatible 이 있을때 오류 날수 있어서 try로 감싼다(ex : <meta http-equiv="X-UA-Compatible" content="IE=7" />)
			try {
				$('<style type="text/css"></style>').text('input::-ms-clear{display: none;}').appendTo('head');
			}
			catch(e) {}
			window.isMsClearDisplayNoneStyleAdded = true;
		}
		
		var $result = $([]);

		this.each(function(idx, elem) {
			if (elem.tagName.toUpperCase() == "INPUT") {
				var data = $.data(elem, 'iwtInputClearButtonController');
				if (!data) data = new iwtInputClearButtonController(elem, options);
				$result = $result.add(data);
			}
		});
		
		return $result
	}
	
	iwtInputClearButtonController = function(input, options) {
		var controller = this;
		var $input = $(input)

		options = $.extend({}, $.iwtInputClearButtonController.defaultOptions, options);
		
		var cssMap = {position:options.position, cursor:'pointer', zIndex:999};
		if(options.top != '') cssMap['top'] = options.top;
		if(options.left != '') cssMap['left'] = options.left;
		if(options.bottom != '') cssMap['bottom'] = options.bottom;
		if(options.right != '') cssMap['right'] = options.right;

		var $img = $('<img>')
			.attr({src: options.image, alt: '입력값 삭제'})
			.addClass(options.className)
			.css(cssMap)
			.appendTo(typeof options.appendTarget == 'object' ? options.appendTarget : $input.parent())
			.click(function() {
				$input.val('').focus();
				return false;
			})
			.hide();

		$input.bind('propertychange keyup input paste focus blur', function() {
			if($(this).val() == '') $img.hide();
			else $img.show();
		});
		
		$(function() {
			if($input.val() != '') $img.show();
		});
	}
})(jQuery);