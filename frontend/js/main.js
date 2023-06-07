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