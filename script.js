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
  return priceStr;
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