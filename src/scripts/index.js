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
    extendSlider(selector);
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
  //Copy last image and append it hidden to the beginning of the slider
  $(`.${selector}`).prepend($(`.${selector} > img:last-child`));
  $(`.${selector} > img:first-child`).hide();

  //Move second image to the left, so it makes space for the first image
  $(`.${selector} > img:nth-child(2)`).animate({
    marginRight: ($(`.${selector} > img:first-child`).width() / 2 + 20),
  }, 1000).promise().then(() => {

    //Fade in picture added at the beginning, reset margin-right for second image and enable buttons
    $(`.${selector} > img:first-child`).fadeIn({duration: 1000, start:() => {
      $(`.${selector} > img:nth-child(2)`).css({marginRight: 0});
    }}).promise().then(()=>{
      enableButtons();
    });

  });
}

function sliderRight(selector){
  //Copy first image and add it last in the slider
  $(`.${selector}`).append($(`.${selector} > img:first-child`).clone());

  //Move first image out of the viewport
  $(`.${selector} > img:first-child`).animate({
    marginRight: -$(`.${selector} > img:first-child`).width() - 10
  }, { duration: 1000, queue: false }).promise().done(() => {

    //Remove first image from the slider and enable buttons afterwards
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
$(document).ready(() => {
  // extendSlider('top-slider');
  // extendSlider('bottom-slider');
  $('.left-button').on('click', slideLeft);
  $('.right-button').on('click', slideRight);

});