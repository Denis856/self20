var productContainers = document.querySelectorAll('.create__items');
var item20 = document.querySelectorAll('.create__item')[0];
var nxtBtn = document.querySelectorAll('.create__arr_left');
var preBtn = document.querySelectorAll('.create__arr_right');

productContainers.forEach((item, i) => {
    let containerWidth = item20.clientWidth + 72;

    nxtBtn[i].addEventListener('click', () => {
        item.scrollLeft += containerWidth;
    });

    preBtn[i].addEventListener('click', () => {
        item.scrollLeft -= containerWidth;
    });
    
});