$(document).ready(function () {

    function getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }
    function checkCookie() {
        let username = getCookie("username"); // cookie mit key username herausfinden
        if (username != "") {
            console.log("Welcome again " + username);
            $("#loginDiv").empty().append("<p style='text-align:center'>Sie sind bereits angemeldet.</p>") //login verstecken und Info anzeigen
        }
    }
    
    checkCookie() // bei Start der Seite überprüfen ob Cookie mit Username schon existiert, wenn ja, dann Login verstecken

    $("#login").on("click", function (event) { // Login BE Call mit Username bzw. Email
        event.preventDefault()
        
        let checked = document.getElementById("check").checked

        $.ajax({
            url: "../../backend/logic/requestHandler.php",
            type: "POST",
            data: {
                method: "login",
                param: JSON.stringify({
                    username: $("#username").val(),
                    password: $("#password").val(),
                    check: checked
                })
            },
            dataType: "json",
            success: function (response) {
                console.log(response.success)
                console.log(checked)
                if(response.success != false){ // wenn Daten korrekt, dann weiter zu index
                    window.location = "index.html"
                }else{
                    alert("Falsche Benutzerdaten!");
                }
            },
            error: function (error) {
                console.log("Error on POST of login")
                console.log(error)
                alert("Username/Email oder Passwort fehlt!");
            }
        });

    })
});
