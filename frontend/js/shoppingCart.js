function addToCart(productId, quantity, price, name) {
    $.ajax({
       url: "../../backend/logic/requestHandler.php",
      type: "POST",
      dataType: "json",
      data: {
        method: "addToCart",
        param: JSON.stringify({
        productId: productId,
        quantity: quantity,
        price: price,
        name: name})
      },
      success: function(response) {
        formatCartData(response);
      },
      error: function() {
        console.log("Failed to add item to cart!");
      }
    });
  }
  
  function formatCartData(response) {
    let $cartItem = $('<div>', {
      class: 'cart-item',
    });
    let $nameElement = $('<div>', {
      class: 'cart-item-name',
      text: response.name
    });
    let $priceElement = $('<div>', {
      class: 'cart-item-price',
      text: response.price
    });
    let $quantityInput = $('<input>', {
      type: 'number',
      class: 'cart-item-quantity',
      value: response.quantity
    });
    $cartItem.append($nameElement, $priceElement, $quantityInput);
    $('.offcanvas-body').append($cartItem);
  }
  