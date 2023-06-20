$(document).ready(function () {
    const username = document.cookie.split(';').find(cookie => cookie.includes('username')).split('=')[1];

    let url = "../../backend/logic/requestHandler.php";

    let config = { // hier werden die Daten des Users aus dem Backend mittels cookie geholt
        url: url,
        type: "GET",
        dataType: "json",
        data: {
            method: "viewAccount",
            param: username
        },
        success: function (response) { // hier werden die erhaltenen Daten in die Seite eingefügt
            let customer = response;

            $('#username').html(customer.username);
            $('#anrede').html(customer.anrede);
            $('#vorname').html(customer.vorname);
            $('#nachname').html(customer.nachname);
            $('#email').html(customer.email);
            $('#add').html(customer.adresse);
            $('#plz').html(customer.plz);
            $('#ort').html(customer.ort);

            $('#editButton').click(function () { // Wenn der Button fürs Bearbeiten der Daten geklickt wird das hier ausgeführt
                if ($(this).text() === 'Bearbeiten') { // Wenn der Button-Text "Bearbeiten" lautet, werden die Originalinformationen durch input fields ersetzt

                    $('#anrede').replaceWith('<input type="text" id="anredeInput" class="borderless-input" value="' + $('#anrede').text() + '">');
                    $('#vorname').replaceWith('<input type="text" id="vornameInput" class="borderless-input" value="' + $('#vorname').text() + '">');
                    $('#nachname').replaceWith('<input type="text" id="nachnameInput" class="borderless-input" value="' + $('#nachname').text() + '">');
                    $('#email').replaceWith('<input type="text" id="emailInput" class="borderless-input" value="' + $('#email').text() + '">');
                    $('#add').replaceWith('<input type="text" id="addInput" class="borderless-input" value="' + $('#add').text() + '">');
                    $('#plz').replaceWith('<input type="text" id="plzInput" class="borderless-input" value="' + $('#plz').text() + '">');
                    $('#ort').replaceWith('<input type="text" id="ortInput" class="borderless-input" value="' + $('#ort').text() + '">');

                    $(this).text('Speichern');
                    $("#cancelButton").show(); // Button zum Abbrechen wird angezeigt
                    $('#cancelButton').click(function () {
                        // Ersetze die input fields mit den Originalinformationen
                        $('#anredeInput').replaceWith('<span id="anrede">' + customer.anrede + '</span>');
                        $('#vornameInput').replaceWith('<span id="vorname">' + customer.vorname + '</span>');
                        $('#nachnameInput').replaceWith('<span id="nachname">' + customer.nachname + '</span>');
                        $('#emailInput').replaceWith('<span id="email">' + customer.email + '</span>');
                        $('#addInput').replaceWith('<span id="add">' + customer.adresse + '</span>');
                        $('#plzInput').replaceWith('<span id="plz">' + customer.plz + '</span>');
                        $('#ortInput').replaceWith('<span id="ort">' + customer.ort + '</span>');
                    
                        $('#editButton').text('Bearbeiten');
                        $("#cancelButton").hide();
                    });
                    
                } else if ($(this).text() === 'Speichern') { // Wenn der Button-Text "Speichern" lautet, werden die Originalinformationen durch input fields ersetzt
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
                    var password = prompt('Please enter your password:'); // Passwort-Abfrage bei wenn Änderungen gespeichert werden sollen
                    if (password === null || password === '') {
                
                        return;
                    }
                    //Password verification
                    $.ajax({
                        url: '../../backend/logic/requestHandler.php',
                        type: 'POST',
                        data: {
                            method: "verifyPassword",
                            param:{
                            username: customer.username,
                            password: password
                            }
                        },
                        success: function (response) {
                            if (response.success == true) { // wenn Passwort richtig, dann ändere Account Daten
                                $.ajax({
                                    url: '../../backend/logic/requestHandler.php',
                                    type: 'POST',
                                    data: {
                                        method: "editAccount",
                                        param: data
                                    },
                                    success: function (response) {
                                        $("#message-success").text("Konto Daten wurden aktualisiert !").show().fadeOut(2700);
                                        
                                        data = JSON.parse(data);

                                        // Ersetze die input fields mit den geänderten Konto-Daten
                                        $('#anredeInput').replaceWith('<span id="anrede">' + data.anrede + '</span>');
                                        $('#vornameInput').replaceWith('<span id="vorname">' + data.vorname + '</span>');
                                        $('#nachnameInput').replaceWith('<span id="nachname">' + data.nachname + '</span>');
                                        $('#emailInput').replaceWith('<span id="email">' + data.email + '</span>');
                                        $('#addInput').replaceWith('<span id="add">' + data.adresse + '</span>');
                                        $('#plzInput').replaceWith('<span id="plz">' + data.plz + '</span>');
                                        $('#ortInput').replaceWith('<span id="ort">' + data.ort + '</span>');

                                        $('#editButton').text('Bearbeiten');
                                        $("#cancelButton").hide();
                                    },
                                    error: function (error) {
                                        console.error('Error submitting data:', error);
                                    }
                                });
                            } else { // Fehler wenn PW falsch
                                alert('Invalid password. Please try again.');
                            }
                        },
                        error: function (error) { // PW validierung fehlgeschlagen
                            console.error('Error verifying password:', error);
                        }
                    });
                }
            });
        }
    };

    $.ajax(config);
});
