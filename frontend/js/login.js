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
        let username = getCookie("username");
        if (username != "") {
            console.log("Welcome again " + username);
            $("#loginDiv").empty().append("<p style='text-align:center'>Sie sind bereits angemeldet.</p>")
        }
    }
    
    checkCookie(),

    $("#login").on("click", function (event) {
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
                if(response.success != false){
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
