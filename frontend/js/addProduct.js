$("form").on("submit", function (event) {
   event.preventDefault(); // prevent default form submission behavior
   var name = $("#name").val();
   var preis = $("#preis").val();
   var firma = $("#firma").val();
   var kurzbeschreibung = $("#kurzbeschreibung").val();
   var text = $("#text").val();

    $.ajax({
        type: "POST",
        data: {
            method:"addProduct",
            param:JSON.stringify({
                name: name,
                preis: preis,
                firma: firma,
                kurzbeschreibung: kurzbeschreibung,
                text: text
            })
        },
        dataType: "json",
        url: "../../backend/logic/requestHandler.php",
        success: function (response) {
            if (response.success) {
                $("#message-success").show().fadeOut(2700); 
            } else {
                $("#message-failed").show().fadeOut(3700);

            }
        },
        error: function (error) {
            $("#message-error").show();
        }
    });
});
