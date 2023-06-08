function loadNav() {

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

function logout() {
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
  