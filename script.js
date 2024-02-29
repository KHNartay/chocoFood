async function getFetch() {
    const url = 'https://65d7137927d9a3bc1d7a1726.mockapi.io/cards'
    const response = await fetch(url)
    const data = await response.json()
    return data;
}

console.log(getFetch());

async function createCard() {
    const cardsDiv = document.querySelector('.cold-foods');

    document.querySelector('.card img').src = 

    return cardsDiv;
}

createCard();