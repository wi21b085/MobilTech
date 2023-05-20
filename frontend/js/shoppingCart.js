function addToCart(productId, quantity, price, name, bild) {
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
        name: name,
        bild:bild
        
        
    })
      },
      success: function(response) {
        console.log(bild)
        formatCartData(response);
      },
      error: function() {
        console.log("Failed to add item to cart!");
      }
    });
  }
  
  function formatCartData(response) {
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
      text: response.price + ' '+ '€'
    });
    let $quantityWrapper = $('<div>', {
      class: 'quantity-wrapper d-flex align-items-center'
    });
    let $quantityMinus = $('<button>', {
      class: 'btn btn-sm btn-secondary',
      text: '-'
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
    });
  
    $itemDetails.css('padding-left', '10px'); // Add right padding to the item details
  
    $bildInput.css('max-width', '100%'); // Add max-width CSS property for responsiveness
    $quantityWrapper.append($quantityMinus, $quantityInput, $quantityPlus);
    $itemDetails.append($nameElement, $priceElement, $quantityWrapper);
    $cartItem.append($bildInput, $itemDetails);
    $('.offcanvas-body').append($cartItem);
  }
  
  
  