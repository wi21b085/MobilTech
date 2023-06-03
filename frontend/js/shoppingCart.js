function addToCart(productId, quantity) {
  $.ajax({
    url: "../../backend/logic/requestHandler.php",
    type: "POST",
    dataType: "json",
    data: {
      method: "addToCart",
      param: JSON.stringify({
        productId: productId,
        quantity: quantity
      })
    },
    success: function (response) {
      var storage = sessionStorage.getItem("cart"); // id:1
      console.log(storage);
      var cart = [];
      if (storage == null) { // false
        cart.push(response);
        sessionStorage.setItem("cart", JSON.stringify(cart));
        formatCartData(response)
      }
      else {//true
        var cart = JSON.parse(storage);
        console.log(cart);
        var existingProduct = cart.find(product => product.productId === response.productId);
        if (existingProduct) {
          console.log(existingProduct);
          existingProduct.quantity += quantity;
        } else {

          cart.push(response);
        }

        sessionStorage.setItem("cart", JSON.stringify(cart));

        var storage_new = sessionStorage.getItem("cart");
        console.log(storage_new);
        $("#cartBody").empty();
        for (let item of JSON.parse(storage_new)) {
          formatCartData(item);
        }
      }

    },
    error: function () {
      console.log("Failed to add item to cart!");
    }
  });
}

$(document).ready(function () {
  var storage = sessionStorage.getItem("cart"); // id:1
  for (let item of JSON.parse(storage)) {
    formatCartData(item);
  }
})
var $id = 0;
function formatCartData(response) {
  $id = response.productId;
  console.log(response)
  let $cartItem = $('<div>', {
    class: 'cart-item d-flex align-items-center border-bottom py-3',
  });
  let $bildInput = $('<img>', {
    src: response.bild,
    class: 'mr-3 cart-item-image img-fluid',
    width: '100',
    height: 'auto'
  });
  let $itemDetails = $('<div>', {
    class: 'item-details d-flex flex-column flex-grow-1',
  });
  let $nameElement = $('<div>', {
    class: 'cart-item-name',
    text: response.name
  });
  let $priceElement = $('<div>', {
    class: 'cart-item-price',
    text: response.price + ' ' + '€'
  });
  let $quantityWrapper = $('<div>', {
    class: 'quantity-wrapper d-flex align-items-center'
  });
  let $quantityMinus = $('<button>', {
    class: 'btn btn-sm btn-secondary',
    text: '-'
  }).click(function () {
    decreaseQuantity(response.productId);
  });
  let $quantityInput = $('<input>', {
    type: 'number',
    class: 'cart-item-quantity form-control',
    value: response.quantity,
    min: '0'
  }).css('width', '100px');
  let $quantityPlus = $('<button>', {
    class: 'btn btn-sm btn-secondary',
    text: '+'
  }).click(function () {
    increaseQuantity(response.productId);
  });
  let $removeButton = $('<button>', {
    class: 'btn btn-sm btn-danger',
    css: {
      'width': '50%'
    },
    text: 'Remove'
  }).click(function () {
    removeCartItem(response.productId);
  });
  
  

  $itemDetails.css('padding-left', '10px');
  $bildInput.css('max-width', '100%');
  $quantityWrapper.append($quantityMinus, $quantityInput, $quantityPlus);
  $itemDetails.append($nameElement, $priceElement, $quantityWrapper, $('<br>'), $removeButton);
  $cartItem.append($bildInput, $itemDetails);
  $('.offcanvas-body').append($cartItem);

  updateTotalSum();

  function decreaseQuantity(productId) {
    let currentValue = parseInt($quantityInput.val());
    var storage = sessionStorage.getItem("cart");
    var cart = JSON.parse(storage);
    var productIndex = cart.findIndex(product => product.productId == productId);
  
    if (currentValue > 0) {
      $quantityInput.val(currentValue - 1);
      cart[productIndex].quantity--;
  
      if (currentValue === 1) {
        cart.splice(productIndex, 1); // Remove the item from the cart array
        sessionStorage.setItem("cart", JSON.stringify(cart)); // Update the session storage
  
        $cartItem.css('margin-left', '0').animate({ marginLeft: '-100%' }, 400, function () {
          $cartItem.remove();
          updateTotalSum();
        });
      } else {
        sessionStorage.setItem("cart", JSON.stringify(cart)); // Update the session storage
        updateTotalSum();
      }
    }
  }
  

  function increaseQuantity(productId) {
    let currentValue = parseInt($quantityInput.val());
    $quantityInput.val(currentValue + 1);
  
    var storage = sessionStorage.getItem("cart");
    var cart = JSON.parse(storage);
    var product = cart.find(product => product.productId === productId);
  
    if (product) {
      product.quantity++;
      sessionStorage.setItem("cart", JSON.stringify(cart));
    }
  
    updateTotalSum();
  }

  function removeCartItem(productId) {
    var storage = sessionStorage.getItem("cart");
    var cart = JSON.parse(storage);
    var productIndex = cart.findIndex(product => product.productId === productId);
  
    if (productIndex > -1) {
      cart.splice(productIndex, 1);
      sessionStorage.setItem("cart", JSON.stringify(cart));
    }
  
    $cartItem.remove();
    updateTotalSum();
  }
}

updateTotalSum();

function updateTotalSum() {
  let totalSum = 0;
  $('.cart-item').each(function () {
    let quantity = parseInt($(this).find('.cart-item-quantity').val());
    let price = parseFloat($(this).find('.cart-item-price').text());
    totalSum += quantity * price;
  });

  $('#total-sum').remove();

  let $totalSumElement = $('<div>', {
    id: 'total-sum',
    text: 'Total Sum: ' + totalSum.toFixed(2) + ' €'
  });
  $('.offcanvas-body').append($totalSumElement);

  $('#kaufen-button').remove();
  let $kaufenButton = $('<button>', {
    id: 'kaufen-button',
    class: 'btn btn-primary',
    text: 'Kassa'
  });
  $('.offcanvas-body').append($kaufenButton);
}
