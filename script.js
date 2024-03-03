// const cards = document.querySelector(".cards");
// const url =
//   'https://65d7137927d9a3bc1d7a1726.mockapi.io/cards';
// fetch(url)
//   .then((res) => res.json())
//   .then((data) => {
//     data.forEach((product) => {
//       cards.appendChild(createCard(product));
//     });
//   })
//   .catch((error) => {
//     cards.innerHTML = `<p>Error occured. Error: ${error}</p>`;
//   });

async function fetchUrl() {
  try {
  const url =
  'https://65d7137927d9a3bc1d7a1726.mockapi.io/cards';

  const response = await fetch(url);
  const data = await response.json();
  data.forEach((product) => {
    cards.appendChild(createCard(product));
  })
} catch (error) {alert('Error occured')}

  return data;
}

function createCard(product) {
  const product = fetchUrl() // destructring

  const card = document.querySelector(".card");
  card.classList.add("card");

  const img = document.createElement("img");
  img.src = product.url;
  img.alt = "";

  const nameProduct = document.createElement("p");
  nameProduct.textContent = product.name;

  const priceHeading = document.createElement("h3");
  priceHeading.textContent = getPrice(price) + " ₸";

  const button = document.createElement("button");
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
  card.appendChild(nameProduct);
  card.appendChild(priceHeading);
  card.appendChild(button);

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

function isAddedToCart(product) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  return cart.find((p) => p.id == product.id) != null;
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