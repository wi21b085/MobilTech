$(document).ready(function() {
  $("#search").on("submit", function(event) {
    event.preventDefault();

    var searchItem = $("#item").val().trim();

    if (searchItem === "") {
      $(".error").text("Please enter a search item.").show();
      return;
    }

    $(".error").hide();

    performSearch(searchItem);
  });

  function performSearch(searchItem) {
    $.ajax({
      type: "POST",
      data: {
        method: "search",
        param: JSON.stringify({
          item: searchItem
        })
      },
      url: "../../backend/logic/requestHandler.php",
      dataType: "json",
      success: function(response) {
        console.log(response);
        if (response.success) {
          var products = response.searched_product_list;
          $(".product-placeholder").empty();
          if (products.length > 0) {
            for (var i = 0; i < products.length; i++) {
              ladeProduct(products[i]);
            }
          } else {
            $(".product-placeholder").html("<p>No results found.</p>");
          }
        } else {
          $(".product-placeholder").html("<p>No results found.</p>");
        }
      },
      error: function(xhr, status, error) {
        console.log(xhr);
        console.log(status);
        console.log(error);
        $(".product-placeholder").html("<p>Error occurred while performing the search.</p>");
      }
    });
  }

  function ladeProduct(product) {
    var $productCard = $('<div>', {
      class: 'card',
      css: {
        'width': '18rem',
        'height': 'auto',
        'margin-right': '20px',
        'margin-top': '25px'
      }
    });

    var $cardImg = $('<img>', {
      class: 'card-img-top',
      src: product.bild,
      css: {
        'width': '12rem',
        'height': 'auto',
        'object-fit': 'contain',
        'height': '200px',
        'width': '100%',
        'display': 'block',
        'margin': '0 auto'
      }
    });

    var $cardBody = $('<div>', {
      class: 'card-body'
    });

    var $cardTitle = $('<h5>', {
      class: 'card-title',
      text: product.name
    });

    var $cardText = $('<p>', {
      class: 'card-text',
      text: product.kurzbeschreibung,
    });

    var $cardPreis = $('<p>', {
      class: 'card-text',
      text: product.preis + "€",
    });

    var cardStarts = $('<p>', {
      class: 'card-text',
      css: {
        color: 'gold',
        'font-size': '20px',
      },
      text: getRatingStars(product.bewertung)
    });

    var $cardLink = $('<a>', {
      class: 'btn btn-primary',
      text: 'Kauf',
      click: function() {
        addToCart(product.id, 1, product.preis, product.name, product.bild);
      }
    });

    $productCard.append($cardImg, $cardBody);
    $cardBody.append($cardTitle, $cardText, $cardPreis, cardStarts, $cardLink);
    $('.product-placeholder').append($productCard);
  }

  function getRatingStars(rating) {
    switch (rating) {
      case 0:
        return "☆☆☆☆☆";
      case 1:
        return "★☆☆☆☆";
      case 2:
        return "★★☆☆☆";
      case 3:
        return "★★★☆☆";
      case 4:
        return "★★★★☆";
      case 5:
        return "★★★★★";
      default:
        return "";
    }
  }
});
