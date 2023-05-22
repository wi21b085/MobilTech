function loadNav() {
  $.ajax({
      url: "../../backend/logic/nav_logic.php",
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