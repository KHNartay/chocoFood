//slider
    let slideIndex = 0;
const slides = document.querySelectorAll('.slide');

function showSlides() {
  slides.forEach(slide => {
    slide.style.transform = `translateX(-${slideIndex * 100}%)`;
  });
}

function nextSlide() {
  if (slideIndex === slides.length - 1) {
    slideIndex = 0;
  } else {
    slideIndex++;
  }
  showSlides();
}

function prevSlide() {
  if (slideIndex === 0) {
    slideIndex = slides.length - 1;
  } else {
    slideIndex--;
  }
  showSlides();
}

setInterval(nextSlide, 5000);

async function createCard() {
    const url = 'https://65d7137927d9a3bc1d7a1726.mockapi.io/cardsObject'
    const response = await fetch(url)
    const data = await response.json()

    const cardsDiv = document.querySelector('.cards');

    // card one
    const cardOneImg = document.querySelector('.card-one img')
    cardOneImg.src = data[0].url

    document.querySelector('.card-one p').textContent = data[0].name;

    document.querySelector('.card-one span').textContent = data[0].price;

    const buttonOne = document.querySelector('.card-one button');
    buttonOne.addEventListener('click', () => {
                buttonOne.textContent = 'Added to cart';
    })

    // card two
    const cardTwoImg = document.querySelector('.card-two img')
    cardTwoImg.src = data[1].url

    document.querySelector('.card-two p').textContent = data[1].name;

    document.querySelector('.card-two span').textContent = data[1].price;

    const buttonTwo = document.querySelector('.card-two button');
    buttonTwo.addEventListener('click', () => {
            buttonTwo.textContent = 'Added to cart';
    })

    // card three
    const cardThreeImg = document.querySelector('.card-three img')
    cardThreeImg.src = data[2].url;

    document.querySelector('.card-three p').textContent = data[2].name;

    document.querySelector('.card-three span').textContent = data[2].price;

    const buttonThree = document.querySelector('card-three button');
    buttonThree.addEventListener('click', () => {
                buttonThree.textContent = 'Added to cart';
    })


    //card four
    const cardFourImg = document.querySelector('.card-four img')
    cardFourImg.src = data[3].url;

    document.querySelector('.card-four p').textContent = data[3].name;
    
        document.querySelector('.card-four span').textContent = data[3].price;
    
        const buttonFour = document.querySelector('.card-four button');
        buttonFour.addEventListener('click', () => {
                    buttonFour.textContent = 'Added to cart';
        })

    return cardsDiv;
}

createCard();