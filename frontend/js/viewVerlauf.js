function ladeVerlauf(verlauf, oid) {
    if (verlauf.order_id == oid) {
        dataRow = $('<tr>').appendTo($('#' + oid));
        dataRow.append($('<td>').text(verlauf.datum));
        dataRow.append($('<td>').text(verlauf.order_id));
        dataRow.append($('<td>').text(verlauf.produkt_name));
        dataRow.append($('<td>').text(verlauf.menge_produkt));
        dataRow.append($('<td>').text(verlauf.preis_produkt));
        dataRow.append($('<td>').text(verlauf.preis_produkt * verlauf.menge_produkt));
    }
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

        if (response.success !== false) {
            let oid = 0;
            let gesamtpreis = 0;
            let table = null;
            for (let i in response) {
                let verlauf = response[i];
                console.log(verlauf);

                if (verlauf.order_id !== oid) {
                    if (oid != 0) {
                        let dataRow2 = $('<tr class="test">').appendTo($('#' + oid));
                        dataRow2.append($('<td>').append('<button class="btn download" id="'+oid+'"><i class="fa fa-download"></i>Download</button>'));
                        dataRow2.append($('<td>').text(""));
                        dataRow2.append($('<td>').text(""));
                        dataRow2.append($('<td>').text(""));
                        dataRow2.append($('<td>').append('<b>'+'Summe:'+'</b>'));
                        dataRow2.append($('<td>').append('<b>'+gesamtpreis + '€'+'</b>'));
                        $(table).append(dataRow2);

                    }

                    oid = verlauf.order_id
                    gesamtpreis = 0;
                    table = $('<table>').addClass('table table-striped');
                    let thead = $('<thead>').appendTo(table);
                    let headerRow = $('<tr>').appendTo(thead);
                    headerRow.append($('<th>').text('DATUM'));
                    headerRow.append($('<th>').text('ORDER_ID'));
                    headerRow.append($('<th>').text('PRODUKT'));
                    headerRow.append($('<th>').text('MENGE'));
                    headerRow.append($('<th>').text('PREIS'));
                    headerRow.append($('<th>').text('PREIS * STÜCK'));
                    table.append($('<tbody id=' + verlauf.order_id + '></tbody>'));

                    $('#viewVerlaufTable').append(table);
                }

                gesamtpreis += verlauf.preis_produkt * verlauf.menge_produkt;
                ladeVerlauf(verlauf, oid);
            }

            if (oid != 0) {
                let dataRow2 = $('<tr class="test">').appendTo($('#' + oid));
                dataRow2.append($('<td>').append('<button class="btn download" id="'+oid+'"><i class="fa fa-download"></i>Download</button>'));
                dataRow2.append($('<td>').text(""));
                dataRow2.append($('<td>').text(""));
                dataRow2.append($('<td>').text(""));
                dataRow2.append($('<td>').append('<b>'+'Summe:'+'</b>'));
                dataRow2.append($('<td>').append('<b>'+gesamtpreis + '€'+'</b>'));
                $(table).append(dataRow2);


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

$(document).ready(
    function(){
        $(".download").on("click", function(){
          window.print()
          
        
        });
    }
)
