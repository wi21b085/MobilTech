function ladeCustomer(customer) {
    let table = $('<table>').addClass('table table-striped');

    let thead = $('<thead>').appendTo(table);
    let headerRow = $('<tr>').appendTo(thead);
    headerRow.append($('<th>').text('ID'));
    headerRow.append($('<th>').text('Vorname'));
    headerRow.append($('<th>').text('Nachname'));
    headerRow.append($('<th>').text('Username'));
    headerRow.append($('<th>').text('Email'));
    headerRow.append($('<th>').text('Adresse'));
    headerRow.append($('<th>').text('PLZ'));
    headerRow.append($('<th>').text('Ort'));
    headerRow.append($('<th>').text('Status'));
    headerRow.append($('<th>').text('Admin'));
    
    let tableBody = $('<tbody>').appendTo(table);
    let row = $('<tr>').appendTo(tableBody);
    row.append($('<td>').text(customer.id));
    row.append($('<td>').text(customer.vorname));
    row.append($('<td>').text(customer.nachname));
    row.append($('<td>').text(customer.username));
    row.append($('<td>').text(customer.email));
    row.append($('<td>').text(customer.adresse));
    row.append($('<td>').text(customer.plz));
    row.append($('<td>').text(customer.ort));
    row.append($('<td>').text(customer.status));
    row.append($('<td>').text(customer.admin));
    
    $('#viewCustomersTable').append(table);
  }
  
  

let url = "../../backend/logic/requestHandler.php";

let config = {
    url: url,
    type: "GET",
    dataType: "json",
    data: {
        method: "viewCustomers"
    },
    success: function (response) {
        console.log(response);
        for (let i in response) {
            let customer = response[i];
            console.log(customer)
            ladeCustomer(customer);
        }
    },
    error: function () {
        $('.error').append('<center><div class="alert alert-danger" role="alert" style="width:50%;">The data could not be loaded! :(</div></center>');
    }
};

$.ajax(config);

console.log("Skript geladen")
