// hier mache ich in documetn ready jedes mal dass der user irgend etwas bei der suche tippt wird das funktion performSearch durch geführt
$(document).ready(function () {
  $('#searchInput').on('input', function () {
    performSearch();
  });

});


function performSearch() {

  const main = $("main");
  var typingTimer;
  var doneTypingInterval = 1; // hier haben wir nach jedem tipp ein delay von 1 millisekond
  clearTimeout(typingTimer); // hier wird der vorherige time gelöscht

  //hier trimen wir das input in #searchimput
  var searchItem = $("#searchInput").val().trim();
  //wenn die input fehld nicht leer ist dann wird ein ajax request durchgeführt
  if (searchItem !== "") {

    typingTimer = setTimeout(function () {

      $.ajax({
        type: "POST",
        data: {
          method: "search",
          param: JSON.stringify({
            //wir schicken mit jedes searchItem die wir jedes 1millisekond tippen
            item: searchItem
          })
        },
        url: "../../backend/logic/requestHandler.php",
        dataType: "json",
        success: function (response) {
          console.log(response);
          //hier checken wir ob wir eine respnse haben und dass es nicht notFound ist
          if (response && Array.isArray(response) && response.item !== "notFound") {
            //hier entfehrnen searchMain
            $("#searchMain").remove();
            $("main").hide();
            $("#navbar").append('<center><main id="searchMain" style="margin-bottom:100px; margin-top:40px; width:50%;"></main></center>');
            for (var i = 0; i < response.length; i++) {
              var product = response[i];
              //hier werden die Podukte die von der response bekommen sind in einem searchProduct in html formatieren
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
//hier wird jeder produkt mit dem muster von der function erstellt
//jeder produkt wird das bild, name, preis, und ein button kauf haben
//jedes mal dass dieser button zu jeweiligen produkt geschickt wird, wird dieses produkt im wahrenkorb erstellet
//dafür ausführen wir die funktion addtocart in onclick
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

//hier appenden jedes mal das wir die Produkte im #searchMain
  $("#searchMain").append(productHTML);
}

