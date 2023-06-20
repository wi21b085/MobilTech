$(document).ready(function () {

    $("#register").on("click", function (event) { // wenn Button für Registrieren geklickt wird, dann sende die Daten an BE
        event.preventDefault()

        $.ajax({
            url: "../../backend/logic/requestHandler.php",
            type: "POST",
            data: {
                method: "register",
                param: JSON.stringify({
                    anrede: $("#anrede").val(),
                    vorname: $("#vorname").val(),
                    nachname: $("#nachname").val(),
                    username: $("#username").val(),
                    email: $("#email").val(),
                    password: $("#password").val(),
                    password2: $("#password2").val(),
                    adresse: $("#adresse").val(),
                    plz: $("#plz").val(),
                    ort: $("#ort").val()
                })
            },
            dataType: "json",
            success: function (response) {
                console.log(response.success)
                if(response.success == true){ // Wenn registrieren erfolgreich, dann leite zu login weiter
                    window.location = "login.html"
                } else {
                    alert("Registrieren fehlgeschlagen!")
                }
            },
            error: function (error) {
                console.log("Error on POST of register")
                console.log(error)
                alert("Error")
            }
        });

    })
});
