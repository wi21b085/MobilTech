function loadNav() { // Navbar laden

    let url = "../../backend/logic/nav_logic.php"
  $.ajax({
      url: url,
      type: "POST",
      dataType: "html",
      success: function (response) {
          $("#navbar").html(response);
      },
      error: function (xhr, status, error) {
          alert("Error :(");
      }
  });
}

loadNav();

function logout() { //logout button Aktion
    $.ajax({
        url: "../../backend/logic/requestHandler.php",
        type: "POST",
        data: {
            method: "logout"
        },
        dataType: "json",
        success: function (response) {
            console.log(response.success)
            if (response.success) {
            }
        },
        error: function (error) {
            alert('Sie sind erfolgreich ausgeloggt !')
            sessionStorage.clear();
            window.location = "index.html"
        }
    });
}
  
