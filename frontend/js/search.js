$(document).ready(function () {

  $('#searchInput').on('input', function () {
    performSearch();
  });
  
});


function performSearch() {

  const main = $("main");
  //const originalMainContent = main.html();
  var typingTimer;
  var doneTypingInterval = 500; // Delay in milliseconds after user stops typing
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
            $("#navbar").append('<main id="searchMain"></main>');
            for (var i = 0; i < response.length; i++) {
              var product = response[i];
              searchProduct(product);
            }
          } else {
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

    $("main").show(); // Restore the original content of main
  }
}

function searchProduct(product) {
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

  $("#searchMain").append(productHTML);
}
