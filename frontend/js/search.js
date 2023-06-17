var typingTimer;
var doneTypingInterval = 500; // Delay in milliseconds after user stops typing

function performSearch() {
  clearTimeout(typingTimer); // Clear the previous timer

  var searchItem = document.getElementById("searchInput").value.trim();

  if (searchItem !== "") {
    typingTimer = setTimeout(function() {
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
          $(".product-placeholder").empty(); // Clear previous search results

          if (response && Array.isArray(response)) {
            for (var i = 0; i < response.length; i++) {
              var product = response[i];
              sucheProduct(product);
            }
          } else {
            $(".product-placeholder").html("<p>No results found.</p>");
          }
        },
        error: function() {
          $('.error').append('<center><div class="alert alert-danger" role="alert" style="width:50%;">The data could not be loaded! :(</div></center>');
        }
      });
    }, doneTypingInterval);
  } else {
    $(".product-placeholder").empty(); // Clear the search results if the search input is empty
  }
}

function sucheProduct(product) {
  var productHTML = `
    <div class="card mb-3">
      <div class="row g-0">
        <div class="col-md-4">
          <img src="${product.bild}" class="img-fluid rounded-start" alt="Product Image">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">Price: ${product.preis}</p>
          </div>
        </div>
      </div>
    </div>
  `;

  $(".product-placeholder").append(productHTML);
}

$(document).ready(function() {
  $('#search').on('input', function() {
    performSearch();
  });
});
