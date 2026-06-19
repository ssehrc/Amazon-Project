//getting a variable out of a file
//1. Add type="module" attribute ->amazon.html
//2. Export ->cart.js
//3. Import 
//for modules to work it needs live server, for this course
import {cart, addToCart} from '../data/cart.js';
import {products} from '../data/products.js';
import { formatCurrency } from './utils/money.js';

let productsHTML = '';

//forEach loop takes the object, saves it in product, then runs it in the function.
products.forEach((product) => {
    productsHTML += `
        <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${formatCurrency(product.priceCents)}
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id} js-quantity-selector">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart"
          data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
        `;
});

console.log(productsHTML);

document.querySelector('.js-products-grid').innerHTML = productsHTML;

//updates webpages cart quantity
function updateCartQuantity(){
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
       
  document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
}
//function will add a 'Added' message when use adds item to cart
function addedMessage(productId){
  let addedMessageTimeoutId;
  const addedMessage = document.querySelector(`.js-added-to-cart-${productId}`);
  addedMessage.classList.add('added-to-cart-visible');
        //displays for 2 seconds
  if(addedMessageTimeoutId) {
    clearTimeout(addedMessageTimeoutId);
  }
  const timeoutId = setTimeout(() => {
    addedMessage.classList.remove('added-to-cart-visible');
  }, 2000);
  addedMessageTimeoutId = timeoutId;
}
document.querySelectorAll('.js-add-to-cart').forEach((button) => {
    
    button.addEventListener('click', () => {
        //data attribute
        const productId = button.dataset.productId;
        addToCart(productId);
        
        //Adds items to cart
        updateCartQuantity();
        
        //displays 'Added' message when user adds an item to cart
        addedMessage(productId);
        
    });
});