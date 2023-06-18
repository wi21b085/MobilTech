$(document).ready(function () {

    function ladeCustomer(customer) {
        let row = $('<tr>').appendTo($('tbody'));
        row.append($('<td>').text(customer.id));
        row.append($('<td>').text(customer.vorname));
        row.append($('<td>').text(customer.nachname));
        row.append($('<td>').text(customer.username));
        row.append($('<td>').text(customer.email));
        row.append($('<td>').text(customer.adresse));
        row.append($('<td>').text(customer.plz));
        row.append($('<td>').text(customer.ort));

        let span = $("<span>")

        span.on("click", function () {
            const username = document.cookie.split(';').find(cookie => cookie.includes('username')).split('=')[1];
            if (customer.username !== username) {

                $.ajax({
                    url: "../../backend/logic/requestHandler.php",
                    type: "POST",
                    data: {
                        method: "statusUpdate",
                        param: JSON.stringify({
                            id: customer.id,
                            status: customer.status
                        })
                    },
                    success: function (response) {
                        console.log(response.success)
                        window.location.reload()
                    },
                    error: function (error) {
                        console.log("Error on POST of Status Update")
                        console.log(error)
                        if (customer.status == 0) alert("Error on Activating")
                        else alert("Error on Deactivating")
                    }
                });
            }
        })

        if (customer.status == 0) {
            var status = 'Inaktiv';
            span.attr("class", "btn btn-danger");
        }
        else {
            var status = 'Aktiv';
            span.attr("class", "btn btn-success");
        }

        let td = $('<td style="text-align:center">');
        row.append(td);
        td.append(span.text(status));
        {
            if (customer.admin == 0) customer.admin = 'Nein';
            else customer.admin = 'Ja';
        }
        row.append($('<td style="text-align:center">').text(customer.admin));

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

            if (response.admin !== "false") {
                createTable()

                for (let i in response) {
                    let customer = response[i];
                    console.log(customer)
                    ladeCustomer(customer);
                }
            } else {
                window.location = "index.html"
            }
        },
        error: function () {
            $('.error').append('<center><div class="alert alert-danger" role="alert" style="width:50%;">The data could not be loaded! :(</div></center>');
        }
    };

    $.ajax(config);

    function createTable() {
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

        $('<tbody>').appendTo(table);
        $('#viewCustomersTable').append(table);
    }

    console.log("Skript geladen")
})