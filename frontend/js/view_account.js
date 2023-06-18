$(document).ready(function () {
    const username = document.cookie.split(';').find(cookie => cookie.includes('username')).split('=')[1];

    let url = "../../backend/logic/requestHandler.php";

    let config = {
        url: url,
        type: "GET",
        dataType: "json",
        data: {
            method: "viewAccount",
            param: username
        },
        success: function (response) {
            let customer = response;
           
            $('#username').html(customer.username);
            $('#anrede').html(customer.anrede);
            $('#vorname').html(customer.vorname);
            $('#nachname').html(customer.nachname);
            $('#email').html(customer.email);
            $('#add').html(customer.adresse);
            $('#plz').html(customer.plz);
            $('#ort').html(customer.ort);

            $('#editButton').click(function () {
                if ($(this).text() === 'Bearbeiten') {
                    $('#anrede').replaceWith('<input type="text" id="anredeInput" class="borderless-input" value="' + $('#anrede').text() + '">');
                    $('#vorname').replaceWith('<input type="text" id="vornameInput" class="borderless-input" value="' + $('#vorname').text() + '">');
                    $('#nachname').replaceWith('<input type="text" id="nachnameInput" class="borderless-input" value="' + $('#nachname').text() + '">');
                    $('#email').replaceWith('<input type="text" id="emailInput" class="borderless-input" value="' + $('#email').text() + '">');
                    $('#add').replaceWith('<input type="text" id="addInput" class="borderless-input" value="' + $('#add').text() + '">');
                    $('#plz').replaceWith('<input type="text" id="plzInput" class="borderless-input" value="' + $('#plz').text() + '">');
                    $('#ort').replaceWith('<input type="text" id="ortInput" class="borderless-input" value="' + $('#ort').text() + '">');

                    $(this).text('Submit');
                } else if ($(this).text() === 'Submit') {
                    var data = JSON.stringify({
                        username: customer.username,
                        anrede: $('#anredeInput').val(),
                        vorname: $('#vornameInput').val(),
                        nachname: $('#nachnameInput').val(),
                        email: $('#emailInput').val(),
                        adresse: $('#addInput').val(),
                        plz: $('#plzInput').val(),
                        ort: $('#ortInput').val()
                    });

                    $.ajax({
                        url: '../../backend/logic/requestHandler.php',
                        type: 'POST',
                        data: {
                            method: "editAccount",
                            param: data
                           
                        },
                        success: function (response) {
                            console.log('Data submitted successfully:');
                            console.log(data);
                            data = JSON.parse(data);

                            // Replace the input fields with the updated information
                            $('#anredeInput').replaceWith('<span id="anrede">' + data.anrede + '</span>');
                            $('#vornameInput').replaceWith('<span id="vorname">' + data.vorname + '</span>');
                            $('#nachnameInput').replaceWith('<span id="nachname">' + data.nachname + '</span>');
                            $('#emailInput').replaceWith('<span id="email">' + data.email + '</span>');
                            $('#addInput').replaceWith('<span id="add">' + data.adresse + '</span>');
                            $('#plzInput').replaceWith('<span id="plz">' + data.plz + '</span>');
                            $('#ortInput').replaceWith('<span id="ort">' + data.ort + '</span>');

                            $('#editButton').text('Bearbeiten');
                        },
                        error: function (error) {
                            console.error('Error submitting data:', error);
                        }
                    });
                }
            });
        }
    };

    $.ajax(config);
});
