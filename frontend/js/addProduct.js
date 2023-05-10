$("#submit").on("click", function () {
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
                $("#success-message").show();
            } else {
                console.error(response.message);
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.error(xhr);
        }
    });
});




