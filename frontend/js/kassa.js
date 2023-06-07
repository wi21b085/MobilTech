$(document).ready(function () {
  const username = document.cookie.split(';').find(cookie => cookie.includes('username')).split('=')[1];

  let url = "../../backend/logic/requestHandler.php";

  let config = {
    url: url,
    type: "GET",
    dataType: "json",
    data: {
      method: "kassa",
      param: username
    },
    success: function (response) {
      let customer = response;

      $('#vorname').html('Vorname: ' + customer.vorname);
      $('#nachname').html('Nachname: ' + customer.nachname);
      $('#email').html('Email: ' + customer.email);
      $('#adresse').html('Adresse: ' + customer.adresse);
      $('#plz').html('PLZ: ' + customer.plz);
      $('#ort').html('Stadt: ' + customer.ort);

      var stored = sessionStorage.getItem('cart');
      var cartData = JSON.parse(stored);

      if (cartData) {
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
        headerRow.append($('<th>').text('Preis * Stück'));
        headerRow.append($('<th>').text('Stück'));
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
        
          row.append($('<td>').text('€' + totalPriceForItem.toFixed(2))); 
        
          row.append($('<td>').text(item.quantity));
          tbody.append(row);
        
          totalPrice += totalPriceForItem; 
          totalQuantity += quantity;
        }
        
        
        table.append(thead);
        table.append(tbody);

        var sumRow = $('<tr>').addClass('table-info').css('background-color', '#f2f2f2');
        sumRow.append($('<td>').text('Sum:'));
        sumRow.append($('<td>').text('€' + totalPrice.toFixed(2)));
        sumRow.append($('<td>').text(totalQuantity));
        tbody.append($('<tr>').append($('<td>').attr('colspan', '3')).css('height', '10px'));
        tbody.append(sumRow);

        invoiceContainer.append(table);

        var bestellenButton = $('<button>').addClass('btn btn-primary').text('Bestellen');
        invoiceContainer.append($('<div>').addClass('text-end').append(bestellenButton));

        $('#kassa').empty().append(invoiceContainer);
      }
    },
    error: function () {
      $('.error').append('<center><div class="alert alert-danger" role="alert" style="width:50%;">The data could not be loaded! :(</div></center>');
    }
  };

  $.ajax(config);
});
