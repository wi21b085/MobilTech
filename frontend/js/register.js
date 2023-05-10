$(document).ready(function () {

    $("#register").on("click", function (event) {
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
            },
            error: function (error) {
                console.log("Error on POST of register")
                console.log(error)
                alert("Error")
            }
        });

    })
});
