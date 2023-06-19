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

      $('#editButton').click(function () {
        var oldPassword = $('#altePasswordInput').val();
        var newPassword = $('#neuesPasswordInput').val();
        var newPasswordRepeat = $('#neuesPasswordWiederholungInput').val();

        if (oldPassword === null || oldPassword === '' || newPassword === null || newPassword === '' || newPasswordRepeat === null || newPasswordRepeat === '') {
          alert('Kein Eingabefeld darf leer sein!');
          return;
        }
        $.ajax({
          url: '../../backend/logic/requestHandler.php',
          type: 'POST',
          data: {
            method: "verifyPassword",
            param: {
              username: customer.username,
              password: oldPassword
            }
          },
          success: function (response) {
            if (response.success == true) {
              if (newPassword !== newPasswordRepeat) {
                alert('neue Passwort stimmten nicht überein!')
              }
              else {
                $.ajax({
                  url: '../../backend/logic/requestHandler.php',
                  type: 'POST',
                  data: {
                    method: 'updatePassword',
                    param: {
                      newPassword: newPassword,
                      username: customer.username
                    }
                  },
                  success: function (response3) {
                    if(response3.success == true){
                    $("#message-success").text("Password wurde aktualisiert !").show().fadeOut(2700);
                  }else{
                    alert('Passwort muss je 1 Groß-, Klein-Buchstaben, Zahl und Zeichen enthalten und 8 Zeichen lang sein!')
                  }
                  },
                  error: function (error) {
                    console.error('Error submitting data:', error);
                  }

                })
              }
            } else {
              alert('Alte Passwort ist falsch!')
            }
          },
          error: function (error) {
            console.error('Error verifying password:', error);
          }
        });
      });
    }
  }
  $.ajax(config);
});