function createCard(product) {
  const { id, url, price, name} = product; // destructring

  const cardsDiv = document.createElement('div');

  const card = document.createElement("div");
  card.classList.add("card");

  const img = document.createElement("img");
  img.src = url;
  img.alt = "";

  const cardName = document.createElement('p')
  cardName.textContent = name;
  cardName.style.fontWeight = '300';

  const priceHeading = document.createElement("h4");
  priceHeading.textContent = getPrice(price) + " ₸";
  priceHeading.style.marginTop = '160px';
  priceHeading.style.fontSize = '21px';

  const button = document.createElement("button");
  button.style.marginBottom = '-240px'
  if (isAddedToCart(product)) {
    button.textContent = "Added to cart";
    button.enabled = false;
  } else {
    button.textContent = "Add to cart";
    button.addEventListener("click", () => {
      addToCart(product);
    });
  }

  card.appendChild(img);
  card.appendChild(cardName);
  card.appendChild(priceHeading);
  card.appendChild(button);

  cardsDiv.appendChild(card);

  return card;
}

function getPrice(price) {
  let priceStr = String(price);
  if (priceStr.length > 4) {
    const priceSlices = [];
    for (let i = priceStr.length - 3; i >= 0; i -= 3) {
      priceSlices.unshift(priceStr.slice(i > 0 ? i : 0, i + 3));
      priceStr = priceStr.slice(0, i);
    }
    priceSlices.unshift(priceStr);
    priceStr = priceSlices.join(" ");
  }
  return priceStr ;
}

function addToCart(product) {
  const cart = localStorage.getItem("cart");
  const cartItems = JSON.parse(cart) || [];
  if (isAddedToCart(product)) {
    return;
  }
  cartItems.push({ ...product, quantity: 1 });
  localStorage.setItem("cart", JSON.stringify(cartItems));
  window.location.reload();
}

function isAddedToCart(product) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  return cart.find((p) => p.id == product.id) != null;
}

const cards = document.querySelector(".cards");
const url =
  "https://65d7137927d9a3bc1d7a1726.mockapi.io/cards";
fetch(url)
  .then((res) => res.json())
  .then((data) => {
    data.forEach((product) => {
      cards.appendChild(createCard(product));
    });
  })
  .catch((error) => {
    cards.innerHTML = `<p>Error occured. Error: ${error}</p>`;
  });


  //----------------------------------------------------------------
  //slider

  let carousel = document.querySelector('.carousel');
let carouselContent = document.querySelector('.carousel-content');
let slides = document.querySelectorAll('.slide');
let arrayOfSlides = Array.prototype.slice.call(slides);
let carouselDisplaying;
let screenSize;
setScreenSize();
let lengthOfSlide;

function addClone() {
   let lastSlide = carouselContent.lastElementChild.cloneNode(true);
   lastSlide.style.left = (-lengthOfSlide) + "px";
   carouselContent.insertBefore(lastSlide, carouselContent.firstChild);
}
// addClone();

function removeClone() {
  let firstSlide = carouselContent.firstElementChild;
  firstSlide.parentNode.removeChild(firstSlide);
}

function moveSlidesRight() {
  let slides = document.querySelectorAll('.slide');
  let slidesArray = Array.prototype.slice.call(slides);
  let width = 0;

  slidesArray.forEach(function(el, i){
    el.style.left = width + "px";
    width += lengthOfSlide;
  });
  addClone();
}
moveSlidesRight();

function moveSlidesLeft() {
  let slides = document.querySelectorAll('.slide');
  let slidesArray = Array.prototype.slice.call(slides);
  slidesArray = slidesArray.reverse();
  let maxWidth = (slidesArray.length - 1) * lengthOfSlide;

  slidesArray.forEach(function(el, i){
    maxWidth -= lengthOfSlide;
    el.style.left = maxWidth + "px";
  });
}

window.addEventListener('resize', setScreenSize);

function setScreenSize() {
  if ( window.innerWidth >= 500 ) {
    carouselDisplaying = 3;
  } else if ( window.innerWidth >= 300 ) {
    carouselDisplaying = 2;
  } else {
    carouselDisplaying = 1;
  }
  getScreenSize();
}

function getScreenSize() {
  let slides = document.querySelectorAll('.slide');
  let slidesArray = Array.prototype.slice.call(slides);
  lengthOfSlide = ( carousel.offsetWidth  / carouselDisplaying );
  let initialWidth = -lengthOfSlide;
  slidesArray.forEach(function(el) {
    el.style.width = lengthOfSlide + "px";
    el.style.left = initialWidth + "px";
    initialWidth += lengthOfSlide;
  });
}


let rightNav = document.querySelector('.nav-right');
rightNav.addEventListener('click', moveLeft);

let moving = true;
function moveRight() {
  if ( moving ) {
    moving = false;
    let lastSlide = carouselContent.lastElementChild;
    lastSlide.parentNode.removeChild(lastSlide);
    carouselContent.insertBefore(lastSlide, carouselContent.firstChild);
    removeClone();
    let firstSlide = carouselContent.firstElementChild;
    firstSlide.addEventListener('transitionend', activateAgain);
    moveSlidesRight();
  }
}

function activateAgain() {
  let firstSlide = carouselContent.firstElementChild;
  moving = true;
  firstSlide.removeEventListener('transitionend', activateAgain);
}

let leftNav = document.querySelector('.nav-left');
leftNav.addEventListener('click', moveRight);

// let moveLeftAgain = true;

function moveLeft() {
  if ( moving ) {
    moving = false;
    removeClone();
    let firstSlide = carouselContent.firstElementChild;
    firstSlide.addEventListener('transitionend', replaceToEnd);
    moveSlidesLeft();
  }
}

function replaceToEnd() {
  let firstSlide = carouselContent.firstElementChild;
  firstSlide.parentNode.removeChild(firstSlide);
  carouselContent.appendChild(firstSlide);
  firstSlide.style.left = ( (arrayOfSlides.length -1) * lengthOfSlide) + "px";
  addClone();
  moving = true;
  firstSlide.removeEventListener('transitionend', replaceToEnd);
}




carouselContent.addEventListener('mousedown', seeMovement);

let initialX;
let initialPos;
function seeMovement(e) {
  initialX = e.clientX;
  getInitialPos();
  carouselContent.addEventListener('mousemove', slightMove);
  document.addEventListener('mouseup', moveBasedOnMouse);
}

function slightMove(e) {
  if ( moving ) {
    let movingX = e.clientX;
    let difference = initialX - movingX;
    if ( Math.abs(difference) < (lengthOfSlide/4) ) {
      slightMoveSlides(difference);
    }  
  }
}

function getInitialPos() {
  let slides = document.querySelectorAll('.slide');
  let slidesArray = Array.prototype.slice.call(slides);
  initialPos = [];
  slidesArray.forEach(function(el){
    let left = Math.floor( parseInt( el.style.left.slice(0, -2 ) ) ); 
    initialPos.push( left );
  });
}

function slightMoveSlides(newX) {
  let slides = document.querySelectorAll('.slide');
  let slidesArray = Array.prototype.slice.call(slides);
  slidesArray.forEach(function(el, i){
    let oldLeft = initialPos[i];
    el.style.left = (oldLeft + newX) + "px";
  });
}

function moveBasedOnMouse(e) { 
  let finalX = e.clientX;
  if ( initialX - finalX > 0) {
    moveRight();
  } else if ( initialX - finalX < 0 ) {
    moveLeft();
  }
  document.removeEventListener('mouseup', moveBasedOnMouse);
  carouselContent.removeEventListener('mousemove', slightMove);
}