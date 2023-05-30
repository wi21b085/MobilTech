$("form").on("submit", function (event) {
    event.preventDefault();
    
    var formData = new FormData();
    formData.append('method', "addProduct");
    formData.append('name', $("#name").val());
    formData.append('preis', $("#preis").val());
    formData.append('firma', $("#firma").val());
    formData.append('kurzbeschreibung', $("#kurzbeschreibung").val());
    formData.append('text', $("#text").val());
    
    var fileInput = document.getElementById("bild");
    var bild = fileInput.files[0];
    formData.append('bild', bild, bild.name);

    

    $.ajax({
        type: "POST",
        data: formData,
        processData: false,
        contentType: false,
        url: "../../backend/logic/requestHandler.php",
        //  url: "../../backend/logic/addProduct_logic.php",
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
