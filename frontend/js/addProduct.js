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

function checkAdmin() {
    $.ajax({
        type: "GET",
        data: {
            method: "checkAdmin",
            param: ""
        },
        dataType: "json",
        url: "../../backend/logic/requestHandler.php",
        success: function (response) {
            if (response.admin) {
                addAdminFunction();
            } else {
                $("#message-error").text("Sie sind nicht als Admin angemeldet!").show();
                $("#mainDiv").empty();
            }
        },
        error: function (error) {
            console.log(error)
        }
    });
};

checkAdmin();

function addAdminFunction() {
    $.ajax({
        url: "../../backend/logic/requestHandler.php",
        type: "GET",
        dataType: "json",
        data: {
            method: "viewProduct"
        },
        success: function (response) {
            console.log(response);
            $("#selection").attr("onchange",);
            //var storage = sessionStorage.setItem("select");
            //console.log(storage);
            var select = [];
            for (let i in response) {
                let product = response[i];
                optionProduct(product);
                select.push(product);
                sessionStorage.setItem("select", JSON.stringify(select));
            }
        },
        error: function () {
            $('main>center').append('<div class="alert alert-danger" id="message-selection" role="alert" style="width:50%;">The selection data could not be loaded! :(</div>');
        }
    });

    if ($("#updateSelection:selected") != $("#noUpdate")) {
        $("#submit").text("Update")
        $("#submit").attr("id", "update")
    }
}

function optionProduct(product) {
    let $opt = $("<option>");
    $opt.text(product.id + ": " + product.name);
    $("#updateSelection").append($opt);
}

$('#updateSelection').change(function () {
    let sel = parseInt($("#updateSelection").val());
    /*
    $("#firma").val(product.firma);
    $("#name").val(product.name);
    $("#preis").val(product.preis);
    $("#kurzbeschreibung").val(product.kurzbeschreibung);
    $("#text").val(product.text);
    */
    var storage = sessionStorage.getItem("select");
    var select = JSON.parse(storage);
    var selected = select.find(selected => selected.id == sel.id);
    
    $("#firma").val(selected.firma);/*
    $("#name").val(sel.name);
    $("#preis").val(selected.preis);
    $("#kurzbeschreibung").val(selected.kurzbeschreibung);
    $("#text").val(selected.text);*/
})