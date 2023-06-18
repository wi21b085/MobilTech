$(document).ready(function () {

  $('#searchInput').on('input', function () {
    performSearch();
  });

});


function performSearch() {

  const main = $("main");
  //const originalMainContent = main.html();
  var typingTimer;
  var doneTypingInterval = 1; // Delay in milliseconds after user stops typing
  clearTimeout(typingTimer); // Clear the previous timer

  var searchItem = $("#searchInput").val().trim();

  if (searchItem !== "") {
    typingTimer = setTimeout(function () {
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
        success: function (response) {
          console.log(response);

          if (response && Array.isArray(response) && response.item !== "notFound") {

            $("#searchMain").remove();
            $("main").hide(); // Clear previous search results
            $("#navbar").append('<center><main id="searchMain" style="margin-bottom:100px; margin-top:40px; width:50%;"></main></center>');
            for (var i = 0; i < response.length; i++) {
              var product = response[i];
              searchProduct(product);
            }
          } else {
            if ($("#searchMain"))
              $("#searchMain").remove();
            $("main").show();
          }
        },
        error: function () {
          $('.error').html('<center><div class="alert alert-danger" role="alert" style="width:50%;">The data could not be loaded! :(</div></center>');
        }
      });
    }, doneTypingInterval);
  } else {
    $("#searchMain").remove();

    $("main").show();
  }
}

function searchProduct(product) {
  var productHTML = `
  <div class="container">
  <center>
  <div class="card mb-3">
    <div class="row">
      <div class="col-md-3" style="width: 50%; ">
        <img src="${product.bild}" class="img-thumbnail img-fluid rounded-start" alt="Product Image" style="width:100px; height:auto;">
      </div>
      <div class="col-md-9" style="width: 50%; text-align:left;">
        <div class="card-body">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text">Price: ${product.preis}</p>
          <a href="#" class="btn btn-primary" onclick="addToCart(${product.id}, 1, ${product.preis}, '${product.name}', '${product.bild}')">Kauf</a>
        </div>
      </div>
    </div>
    </div>
    </center>
    </div>
    `;


  $("#searchMain").append(productHTML);
}

