$(document).ready(function () {


  let config = {
    url: "../../backend/logic/requestHandler.php",
    type: "GET",
    dataType: "json",
    data: {
      method: "kassa"
    },
    success: function (response) {
      if (response.id !== "false") {
        kassa(response);
        console.log(response)
      } else {
        window.location = "login.html"
        console.log(response)
      }
    },
    error: function () {
      $('.error').append('<center><div class="alert alert-danger" role="alert" style="width:50%;">The data could not be loaded! :(</div></center>');
    }
  };

  $.ajax(config);

  function kassa(response) {

    var stored = localStorage.getItem('cart');
    var cartData = JSON.parse(stored);

    if (cartData[0]) {

      $('#vorname').html('Vorname: ' + response.vorname);
      $('#nachname').html('Nachname: ' + response.nachname);
      $('#email').html('Email: ' + response.email);
      $('#adresse').html('Adresse: ' + response.adresse);
      $('#plz').html('PLZ: ' + response.plz);
      $('#ort').html('Stadt: ' + response.ort);

      var invoiceContainer = $('<div>').addClass('container mt-4');
      
      var currentDate = new Date();
      var day = currentDate.getDate();
      var month = currentDate.getMonth() + 1;
      var year = currentDate.getFullYear();
      day = day < 10 ? '0' + day : day;
      month = month < 10 ? '0' + month : month;
      var formattedDate = day + '.' + month + '.' + year;



      var dateDiv = $('<div>').addClass('text-end mb-3').html('Datum: ' + formattedDate + '<br><br><br>');
      invoiceContainer.append(dateDiv);

      var table = $('<table>').addClass('table');
      var thead = $('<thead>').addClass('thead-light');
      var tbody = $('<tbody>');
      var headerRow = $('<tr>');
      headerRow.append($('<th>').text('Name'));
      headerRow.append($('<th>').text('Preis'));
      headerRow.append($('<th>').text('Stück'));
      headerRow.append($('<th>').text('Preis * Stück'));

      thead.append(headerRow);

      var totalPrice = 0;
      var totalQuantity = 0;

      for (var i = 0; i < cartData.length; i++) {
        var item = cartData[i];
        var row = $('<tr>');
        row.append($('<td>').text(item.name));

        var price = parseFloat(item.price);
        var quantity = parseInt(item.quantity);
        var totalPriceForItem = price * quantity;

        row.append($('<td>').text('€' + item.price));

        row.append($('<td>').text(item.quantity));
        row.append($('<td>').text('€' + totalPriceForItem.toFixed(2)));

        tbody.append(row);

        totalPrice += totalPriceForItem;
        totalQuantity += quantity;
      }

      table.append(thead);
      table.append(tbody);
      var sumRow = $('<tr>').addClass('table-info').css('background-color', '#f2f2f2');
      sumRow.append($('<td>').text('Summe:'));
      sumRow.append($('<td>').text(''));
      sumRow.append($('<td>').text(totalQuantity));

      sumRow.append($('<td>').text('€' + totalPrice.toFixed(2)));
      tbody.append($('<tr>').append($('<td>').attr('colspan', '3')).css('height', '10px'));
      tbody.append(sumRow);
      invoiceContainer.append(table);



      //Bestelliung submiten


      var bestellenButton = $('<button>').addClass('btn btn-primary').text('Bestellen');

      bestellenButton.on("click", function () {

        var produktData = JSON.parse(localStorage.getItem('cart'));

        var mengeArray = [];
        var preisArray = [];
        var p_idArray = [];
        var gesamtPreisArray = [];

        for (let i = 0; i < produktData.length; i++) {

          var produktIndex = produktData[i];

          var menge = produktIndex.quantity;
          var preis = parseInt(produktIndex.price);
          var p_id = produktIndex.productId;
          var gesamtPreis = menge * preis;

          mengeArray.push(menge);
          preisArray.push(preis);
          p_idArray.push(p_id);
          gesamtPreisArray.push(gesamtPreis);

        }

        let config_bestellen = {
          url: "../../backend/logic/requestHandler.php",
          type: "POST",
          dataType: "json",
          data: {
            method: "bestellen",
            param: ({
              produktenMengen: mengeArray,
              produktenPreise: preisArray,
              produktenId: p_idArray,
              produktenGesamtPreis: gesamtPreisArray
            })
          },
          success: function (response) {
            localStorage.removeItem("cart");
            var url = "../sites/viewVerlauf.html?success";
            window.location.replace(url);
          },
          error: function () {
            console.log("Error bei Bestellungen")
          }
        }
        $.ajax(config_bestellen);

      });

      invoiceContainer.append($('<div>').addClass('text-end').append(bestellenButton));

      $('#kassa').empty().append(invoiceContainer);
    } else {
      window.location="viewProducts.html";
    }
  }
});
