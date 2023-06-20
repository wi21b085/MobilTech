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
            alert('Sie sind erfolgreich ausgeloggt !')
    

            console.log(response.success)
            if (response.success) {
                sessionStorage.clear();
                window.location = "index.html"
            }
        },
        error: function (error) {
            console.log("Error on POST of logout")
            console.log(error)
            alert("Error")
        }
    });
}
  
