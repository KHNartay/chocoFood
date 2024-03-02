//  id: 1,
// brand: "Reebok",
// imgUrl: "https://a.lmcdn.ru/product/R/T/RTLACN769003_22188898_1_v1_2x.jpg",
// price: 16100,
// category: "Футболка спортивная",

function createCartItem(cartItemData) {
  const { imgUrl, brand, category, price, quantity } = cartItemData;

  const cartItem = document.createElement("div");
  cartItem.classList.add("cart-item");

  const cartItemLeft = document.createElement("div");
  cartItemLeft.classList.add("cart-item-left");

  const img = document.createElement("img");
  img.src = imgUrl;
  img.alt = "";

  const cartItemLeftActions = document.createElement("div");
  cartItemLeftActions.classList.add("cart-item-left-actions");

  const itemNameLink = document.createElement("a");
  itemNameLink.href = "#";
  itemNameLink.textContent = brand + " - " + category;

  const cartItemAmount = document.createElement("div");
  cartItemAmount.classList.add("cart-item-amount");
  cartItemAmount.addEventListener("click", () => increaseQuantity(cartItemData)); 

  const trashButton = document.createElement("button");
  trashButton.addEventListener("click", () => decreaseQuantity(cartItemData) - 3);

  trashButton.innerHTML =
    cartItemData.quantity > 1
      ? '<ion-icon name="remove"></ion-icon>'
      : '<ion-icon name="trash-outline"></ion-icon>';

  const amountText = document.createElement("p");
  amountText.textContent = quantity;

  const addButton = document.createElement("button");
  addButton.innerHTML = '<ion-icon name="add-outline"></ion-icon>';

  const clearCartButton = document.querySelector('#clear-cart')
  clearCartButton.addEventListener("click", () =>{
    localStorage.removeItem("cart");
    window.location.reload()
  })

  cartItemAmount.appendChild(trashButton);
  cartItemAmount.appendChild(amountText);
  cartItemAmount.appendChild(addButton);

  cartItemLeftActions.appendChild(itemNameLink);
  cartItemLeftActions.appendChild(cartItemAmount);

  cartItemLeft.appendChild(img);
  cartItemLeft.appendChild(cartItemLeftActions);

  const cartItemRight = document.createElement("div");
  cartItemRight.classList.add("cart-item-right");

  const closeButton = document.createElement("button");
  closeButton.innerHTML = '<ion-icon name="close-outline"></ion-icon>';
  closeButton.addEventListener("click", () => removeProduct(cartItemData));

  const priceText = document.createElement("p");
  priceText.textContent = getPrice(price) + " ₸";

// {
//   const {sumProductPrice, sumDeliveryPrice, sumTotalPricetotalPrice} = getPrices()

//   const productPriceText = document.querySelector("#product-price");
//   productPriceText.textContent = getPrices(sumProductPrice) + ' ₸';

//   const delPriceText = document.querySelector("#delivery-price");
//   delPriceText.textContent = getPrices(sumDeliveryPrice) + ' ₸';

//   const totalPriceText = document.querySelector("#total-price");
//   totalPriceText.textContent = getPrices(sumTotalPricetotalPrice) + ' ₸';

//   const purchaseBtn = document.querySelector(".cart-right button");

//   if (totalPrice > 0) {
//     purchaseBtn.classList.remove('inactive');
//   } else {
//     purchaseBtn.classList.add('inactive');
//   }
// }

  const cartSize = document.querySelector("#cart-size");
  cartSize.textContent = cartLength();

  const disCart = document.querySelector('display-cart');
  if (cartSize === 0) {
    disCart.style.display = 'none';
  }

  const disCartBtn = document.querySelector("#display-cart button");

  disCartBtn.addEventListener("click", () => {
    const cartItem = document.querySelector(".cart-item");
    cartItem.classList.toggle('hidden');
    if (cartItem.classList.contains('hidden')) {
      disCartBtn.innerHTML = '<ion-icon name="chevron-up-outline"></ion-icon>';
    }
    else {
      disCartBtn.innerHTML = '<ion-icon name="chevron-down-outline"></ion-icon>';
    }
  })
  
  cartItemRight.appendChild(closeButton);
  cartItemRight.appendChild(priceText);

  cartItem.appendChild(cartItemLeft);
  cartItem.appendChild(cartItemRight);

  return cartItem;
}

function cartLength() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartSize = document.querySelector("#cart-size");

  if (cart.length > 0) {
    cartSize.textContent = cart.length;
  } else {
    cartSize.textContent = 0;
  }

  return cart.length;
}

  // function getPrices() {
  //   const cart = JSON.parse(localStorage.getItem("cart")) || [];

  //   const productsPrice = document.querySelector("#products-price");
  //   let sumProductsPrice = 0;
  //   cart.array.forEach((p) => {
  //     productsPrice.textContent = sumProductsPrice += p.price * p.quantity;
  //   });

  //     const deliveryPrice = document.querySelector("#delivery-price");
  //     let sumDeliveryPrice = 0;
  //     cart.forEach((p) => {
  //       deliveryPrice.textContent = sumDeliveryPrice += p.price * p.quantity;
  //     });

  //     const totalPrice = document.querySelector("#total-price");
  //     let sumTotalPrice = 0;
  //     cart.forEach((p) => {
  //       totalPrice.textContent = sumTotalPrice += p.price * p.quantity;
  //     });

  //   if (totalPrice() >= 8000) {
  //     deliveryPrice.textContent = 0;
  //   }
  //   else {
  //     deliveryPrice.textContent = 700;
  //   }
  // }

function increaseQuantity(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.map((p) =>
    p.id == product.id ? { ...p, quantity: p.quantity + 1 } : p
  );
  localStorage.setItem("cart", JSON.stringify(cart));
  window.location.reload();
}

function decreaseQuantity(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (product.quantity > 1) {
    cart = cart.map((p) =>
      p.id == product.id ? { ...p, quantity: p.quantity - 1 } : p
    );
  } else {
    cart = cart.filter((p) => p.id !== product.id);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  window.location.reload();
}

function removeProduct(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter((p) => p.id != product.id);
  localStorage.setItem("cart", JSON.stringify(cart));
  window.location.reload();
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

function clearCartButton () {
  clearCartButton.addEventListener('click', () => {
    localStorage.removeItem('cart')
    window.location.reload()
  })
}

const cart = localStorage.getItem('cart')
const cartItem = JSON.parse(cart) || []

for (const item of cartItem) {
  const cart = createCartItem(item)
  document.querySelector('.cart-items').appendChild(cart)
}

const url = 'https://65d7137927d9a3bc1d7a1726.mockapi.io/cards'

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    data.forEach(product => {
      cards.appendChild(createCard(product));
    });
  })