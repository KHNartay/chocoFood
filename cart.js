async function createCartItem() {
    const url = 'https://65d7137927d9a3bc1d7a1726.mockapi.io/cardsObject'
    const response = await fetch(url)
    const data = await response.json()

    const cardsDiv = document.querySelector('.left');

    const cardImg = document.createElement('img');
    cardImg.classList.add('card-image')
}