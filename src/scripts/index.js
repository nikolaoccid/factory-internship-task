import '../styles/index.scss';
import $ from 'jquery';

function extendSlider(selector){
  const viewportWidth = window.innerWidth;
  const textareaWidth = $('.textarea').width();
  let sliderDivWidth = $(`.${selector}`).width();
  let leftScreenSpace = viewportWidth - textareaWidth - sliderDivWidth;

  if (leftScreenSpace > 0) {
    const childElements = $(`.${selector}`).children().clone();
    $(`.${selector}`).append(childElements);
    extendSlider();
  }
}
function disableButtons(){
  $('.left-button').prop('disabled', true);
  $('.right-button').prop('disabled', true);
}

function enableButtons(){
  $('.left-button').prop('disabled', false);
  $('.right-button').prop('disabled', false);
}

function sliderLeft(selector) {
  // $(`.${selector} > img:first-child`).animate({
  //   marginRight: $(`.${selector} > img:first-child`).width()
  // }, {duration: 500, queue: false}).promise().then(()=> {
  //     $(`.${selector} > img:nth-child(1)`).css({
  //       marginRight: 0
  //     });

  $(`.${selector}`).prepend($(`.${selector} > img:last-child`));
  $(`.${selector} > img:first-child`).hide().css({marginRight: -($(`.${selector} > img:last-child`).width() - 20)});
  $(`.${selector} > img:first-child`).animate({
    marginRight: 0
  }, {
    duration: 1600,
    queue: false
  }, ()=>{
    // $(`.${selector} > img:first-child`).delay(1400).fadeIn({duration: 3000, queue: false});
  }).fadeIn(2500,() => {
    $(`.${selector} > img:first-child`).delay(800);
  } ).promise().then(()=>{

    enableButtons();
  });

}

function sliderRight(selector){
  $(`.${selector}`).append($(`.${selector} > img:first-child`).clone());

  $(`.${selector} > img:first-child`).animate({
    marginRight: -$(`.${selector} > img:first-child`).width() - 10
  }, { duration: 1000, queue: false }).promise().done(() => {
    $(`.${selector} > img:first-child`).remove();
  }).promise().then(()=>{
    enableButtons();
  });
}


function slideLeft(){
  disableButtons();
  sliderLeft('top-slider');
  sliderLeft('bottom-slider');
  // enableButtons(); is called after the animation
}
function slideRight(){
  disableButtons();
  sliderRight('top-slider');
  sliderRight('bottom-slider');
  // enableButtons() function called after the animation;
}
$(document).ready(function() {
  extendSlider('top-slider');
  extendSlider('bottom-slider');
  $('.left-button').on('click', slideLeft);
  $('.right-button').on('click', slideRight);

});