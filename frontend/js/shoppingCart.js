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
      var storage = localStorage.getItem("cart");
      console.log(storage);
      var cart = [];
      if (storage == null) {
        cart.push(response);
        localStorage.setItem("cart", JSON.stringify(cart));
        formatCartData(response)
      }
      else {
        var cart = JSON.parse(storage);
        console.log(cart);
        var existingProduct = cart.find(product => product.productId === response.productId);
        if (existingProduct) {
          console.log(existingProduct);
          existingProduct.quantity += quantity;
        } else {
          cart.push(response);
        }

        localStorage.setItem("cart", JSON.stringify(cart));

        var storage_new = localStorage.getItem("cart");
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
  $("#shopping-cart").append('<span id="counter_cart">0</span>')

  var storage = localStorage.getItem("cart");
  if (JSON.parse(storage) != null) {
    for (let item of JSON.parse(storage)) {
      formatCartData(item);
    }
  }
})
function formatCartData(response) {
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
  cartcount();

  function decreaseQuantity(productId) {
    let currentValue = parseInt($quantityInput.val());
    var storage = localStorage.getItem("cart");
    var cart = JSON.parse(storage);
    var productIndex = cart.findIndex(product => product.productId == productId);

    if (currentValue > 0) {
      $quantityInput.val(currentValue - 1);
      cart[productIndex].quantity--;

      if (currentValue === 1) {
        cart.splice(productIndex, 1);
        localStorage.setItem("cart", JSON.stringify(cart));

        $cartItem.css('margin-left', '0').animate({ marginLeft: '-100%' }, 400, function () {
          $cartItem.remove();
          updateTotalSum();
          cartcount();

        });
      } else {
        localStorage.setItem("cart", JSON.stringify(cart));
        updateTotalSum();
        cartcount();

      }
    }
  }

  function increaseQuantity(productId) {
    let currentValue = parseInt($quantityInput.val());
    $quantityInput.val(currentValue + 1);

    var storage = localStorage.getItem("cart");
    var cart = JSON.parse(storage);
    var product = cart.find(product => product.productId === productId);

    if (product) {
      product.quantity++;
      localStorage.setItem("cart", JSON.stringify(cart));
    }

    updateTotalSum();
    cartcount();

  }

  function removeCartItem(productId) {
    var storage = localStorage.getItem("cart");
    var cart = JSON.parse(storage);
    var productIndex = cart.findIndex(product => product.productId === productId);

    if (productIndex > -1) {
      cart.splice(productIndex, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
    }

    $cartItem.remove();
    updateTotalSum();
    cartcount();

  }
  

}


updateTotalSum();
cartcount();

function cartcount(){
  $("#counter_cart").text($(".offcanvas-body").find("div.cart-item").length);

}


function updateTotalSum() {
  let totalSum = 0;


  // console.log($(".offcanvas-body").find("div.cart-item"))
  if ($(".offcanvas-body").find("div.cart-item").length == 0) {
    $(".offcanvas-body").empty()
    $('.offcanvas-body').append("<div class='form-text alert alert-info' style='text-align:center'>Warenkorb ist leer.</div>");
  } else {
    $(".offcanvas-body").find($("div.form-text")).remove()
    $('.cart-item').each(function () {
      let quantity = parseInt($(this).find('.cart-item-quantity').val());
      let price = parseFloat($(this).find('.cart-item-price').text());
      totalSum += quantity * price;
    });

    $('#total-sum').remove();

    let $totalSumElement = $('<div>', {
      id: 'total-sum',
      text: 'Total Sum: ' + totalSum.toFixed(2) + ' €',
      class: 'alert alert-info',
    });
    $('.offcanvas-body').append($totalSumElement);

    $('#kaufen-button').remove();
    let $kaufenButton = $('<button>', {
      id: 'kaufen-button',
      class: 'btn btn-primary',
      text: 'Kassa'
    }).click(function(){
      window.location.replace("kassa.html");

    });

    $('.offcanvas-body').append($kaufenButton);
  }
}
