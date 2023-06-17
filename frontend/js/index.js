
function loadProduct(product) {
  let col = $("<div>", { class: "col-md-3 col-sm-6" });
  let card = $("<div>", { class: "card mb-3" });
  let cardTitle = $("<h5>", { class: "card-title", text: product.name });
  let cardBody = $("<div>", { class: "card-body" });
  let cardImage = $("<img>", { class: "card-img-top img-fixed-size", src: product.bild});
  let cardText = $("<p>", { class: "card-text", text: product.kurzbeschreibung });
  let cardLink = $('<a>', {
    class: 'btn btn-primary',
    text: 'View Category',
    href: '../sites/viewProducts.html?categorie = ' + encodeURIComponent(product.firma)
  });
  
  
  
  
  cardBody.append(cardTitle, cardText, cardLink);
  card.append(cardImage, cardBody);
  col.append(card);
  $("#placeholder").append(col);
}

$(document).ready(function() {
  let url = "../../backend/logic/requestHandler.php";

  let config = {
    url: url,
    type: "GET",
    dataType: "json",
    data: {
      method: "indexCategory"
    },
    success: function(response) {
      console.log(response);

      // Display all products in loadProduct function
      response.forEach(function(product) {
        loadProduct(product);
      });

      // Select the first three products for the carousel
      let carouselItems = response.slice(0, 3);

      // Create the carousel items
      carouselItems.forEach(function(product, index) {
        let activeClass = index === 0 ? "active" : "";
        let carouselItem = $("<div>", { class: "carousel-item " + activeClass, "data-bs-interval": "10000" });
        let carouselContent = $("<article>", { class: "container my-5 d-grid gap-5" });
        let row = $("<div>", { class: "row" });
      
        let colImage = $("<div>", { class: "col-lg-6 col-md-6 mb-lg-0 mb-5" });
        let image = $("<img>", { class: "carousel-image", src: product.bild });
        colImage.append(image);
      
        let colText = $("<div>", { class: "col-lg-6 col-md-6 mb-lg-0 mb-5" });
        let text = $("<p>", { text: product.kurzbeschreibung });
        colText.append(text);
      
        row.append(colText,colImage);
        carouselContent.append(row);
        carouselItem.append(carouselContent);
        $("#carouselExampleDark .carousel-inner").append(carouselItem);
      });
      

      // Initialize the carousel
      $("#carouselExampleDark").carousel();
    },
    error: function() {
      $('.error').append('<center><div class="alert alert-danger" role="alert" style="width:50%;">The data could not be loaded! :(</div></center>');
    }
  };

  $.ajax(config);
});

function moveWerbung() {
  var containerWidth = $('#werbung').width();
  var containerHeight = $('#werbung').height();
  var textWidth = $('#werbungText').outerWidth();
  var textHeight = $('#werbungText').outerHeight();

  var randomX = Math.floor(Math.random() * (containerWidth - textWidth));
  var randomY = Math.floor(Math.random() * (containerHeight - textHeight));

  $('#werbungText').css({ top: randomY + 'px', left: randomX + 'px' });
}

$(document).ready(function() {
  setInterval(moveWerbung, 2000);
});

