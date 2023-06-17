function ladeVerlauf(verlauf) {
    let table = $('<table>').addClass('table table-striped');

    let thead = $('<thead>').appendTo(table);
    let headerRow = $('<tr>').appendTo(thead);
    headerRow.append($('<th>').text('ID'));
    headerRow.append($('<th>').text('ORDER_ID'));
    headerRow.append($('<th>').text('PRODUKT'));
    headerRow.append($('<th>').text('MENGE'));
    headerRow.append($('<th>').text('PREIS'));
    headerRow.append($('<th>').text('DATUM'));

    

    
    $('#viewVerlaufTable').append(table);
  }
  
  

let url = "../../backend/logic/requestHandler.php";

let config = {
    url: url,
    type: "GET",
    dataType: "json",
    data: {
        method: "viewVerlauf",

    },
    success: function (response) {
        console.log(response);
        for (let i in response) {
            let verlauf = response[i];
            console.log(verlauf)
            ladeCustomer(verlauf);
        }
    },
    error: function () {
        $('.error').append('<center><div class="alert alert-danger" role="alert" style="width:50%;">The data could not be loaded! :(</div></center>');
    }
};

$.ajax(config);

console.log("Skript geladen");
