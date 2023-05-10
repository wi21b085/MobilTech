$("form").on("submit", function (event) {
   event.preventDefault(); // prevent default form submission behavior
   // var formData = $(this).serialize(); // serialize form data into a query string
   var name = $("#name").val();
   var preis = $("#preis").val();
   var firma = $("#firma").val();
   var kurzbeschreibung = $("#kurzbeschreibung").val();
   var text = $("#text").val();

    $.ajax({
        type: "POST",
        dataType: "json",
        data: {
            name: name,
            preis: preis,
            firma: firma,
            kurzbeschreibung: kurzbeschreibung,
            text: text
        },
        url: "../../backend/logic/addProduct_logic.php",
        success: function (response) {
            if (response.success) {
                $("#message-success").show().fadeOut(2700); 
            } else {
                $("#message-failed").show().fadeOut(3700);

            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            $("#message-error").show();
        }
    });
});
