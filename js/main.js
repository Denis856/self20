var menu_img = document.querySelector('.menu_img');
var main = document.querySelector('.main');

function turn() {
   menu_img.classList.toggle('turn');
}

$(".menu_img").click(function(){
   $(".menu1__list").toggleClass('turn2');
});

$(".main").click(function(){
   $(".menu_img").removeClass('turn');
   $(".menu1__list").removeClass('turn2');
});

$(function(){
   $('a[href^="#"]').click(function(){
   var target = $(this).attr('href');
   $('html, body').animate({scrollTop: $(target).offset().top}, 800);//800 - длительность скроллинга в мс
   return false;
   });
   });


   function consoleBG() {
      if ($(window).scrollTop() == 0) {
         $(".header").removeClass('bg32');
         $(".menu1__link").removeClass('bg32');
      } else {
         $(".header").addClass('bg32');
         $(".menu1__link").addClass('bg32');
      }
   }
   consoleBG();
   $(window).scroll(function() {
      consoleBG();
   });


// =========================================

(function($) {
	function animatedBlocks () {
		$('.need-animate').each(function () {
			var scrollPosTop = $(window).scrollTop(), // позиция скролла, верх страницы
				blockPosTop = $(this).offset().top, // позиция блока (верх), который нужно анимировать
				blockPosBottom = blockPosTop+$(this).height(), // позиция блока (низ), который нужно анимировать
				windowHeight = $(window).height(), // высота окна браузера
				windowLineTop = scrollPosTop+(windowHeight*(1/8)), // верхняя граница окна браузера при пересечении которой анимируется блок
				windowsLineBottom = scrollPosTop+(windowHeight*(7/8)); // нижяя граница окна браузера при пересечении которой анимируется блок

			if (
				(windowLineTop <= blockPosBottom && windowLineTop > blockPosTop) // если верхняя часть экрана выше нижней границы блока, но не прошла блок полностью
				|| (windowsLineBottom >= blockPosTop && windowsLineBottom < blockPosBottom) // если нижняя часть экрана дошла до верхней границы блока, но не прошла блок полностью
				|| ((blockPosTop > windowLineTop && blockPosTop < windowsLineBottom) || (blockPosBottom > windowLineTop && blockPosBottom < windowsLineBottom)) // или блок по центру экрана
			) {
				$(this).removeClass('need-animate').addClass('animated');
			}
		});
	}
	$(document).ready(function () {
		setTimeout(function () {
			animatedBlocks();
		}, 1000);
	});
	$(window).scroll(function () {
		animatedBlocks();
	});
})(jQuery);

// =====================================

var carousel = document.querySelector('.page3__columns');
var firstImg = carousel.querySelectorAll('.page3_item')[0];
var arr1 = document.querySelectorAll('.arr1');

var isDragStar = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff;
var firstImgWidth = firstImg.clientWidth + 14;
var scrollWidth = carousel.scrollWidth - carousel.clientWidth;


var showHideIcons = () => {
   arr1[0].style.display = carousel.scrollLeft == 0 ? 'none' : 'block';
   arr1[1].style.display = carousel.scrollLeft == scrollWidth ? 'none' : 'block';
}

arr1.forEach(icon =>{
   icon.addEventListener('click', () => { // скрол стрелкой
      carousel.scrollLeft += icon.id == 'left' ? -firstImgWidth : firstImgWidth;
      setTimeout(() => showHideIcons(), 60);
   });
});

var autoSlide = () => {
   if(carousel.scrollLeft == (carousel.scrollWidth - carousel.clientWidth)) return;

   positionDiff = Math.abs(positionDiff);
   var firstImgWidth = firstImg.clientWidth + 14;
   var valDiference = firstImgWidth - positionDiff;

   if(carousel.scrollLeft > prevScrollLeft){
      return carousel.scrollLeft += positionDiff > firstImgWidth / 3 ? valDiference : -positionDiff;
   }
   return carousel.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDiference : -positionDiff;
};

var dragStar = (e) => {
   isDragStar = true; // скрол картинкой
   prevPageX = e.pageX || e.touches[0].pageX;
   prevScrollLeft = carousel.scrollLeft;
}

var dragging = (e) => {
   if(!isDragStar) return;
   e.preventDefault();
   isDragging = true;
   carousel.classList.add('dragging');
   positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
   carousel.scrollLeft = prevScrollLeft - positionDiff;
   showHideIcons();
}

var dragStop = () => {
   isDragStar = false;
   carousel.classList.remove('dragging');
   if(!isDragging) return;
   isDragging = false;
   autoSlide();
}

carousel.addEventListener('mousedown', dragStar);
carousel.addEventListener('touchstart', dragStar);

carousel.addEventListener('mousemove', dragging);
carousel.addEventListener('touchmove', dragging);

carousel.addEventListener('mouseup', dragStop);
carousel.addEventListener('mouseleave', dragStop);
carousel.addEventListener('touchend', dragStop);