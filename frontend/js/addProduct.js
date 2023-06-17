$("#submit").on("click", function (event) {
    event.preventDefault();

    var formData = new FormData();
    formData.append('name', $("#name").val());
    formData.append('preis', $("#preis").val());
    formData.append('firma', $("#firma").val());
    formData.append('kurzbeschreibung', $("#kurzbeschreibung").val());
    formData.append('text', $("#text").val());
    var fileInput = document.getElementById("bild");
    var bild;
    if (fileInput != null) {
        bild = fileInput.files[0];
    };

    if ($("#submit").text() == "Aktualisieren") {
        formData.append('method', "updateProduct");

        formData.append('id', parseInt($("#updateSelection").val()))
        //console.log(id)
        for (const value of formData.values()) {
            console.log(value);
        }

        if (bild != null) {
            console.log("here")
            formData.append('bild', bild, bild.name);
        }

    } else {
        formData.append('method', "addProduct");
        formData.append('bild', bild, bild.name);
    }

    $.ajax({
        type: "POST",
        data: formData,
        processData: false,
        contentType: false,
        url: "../../backend/logic/requestHandler.php",
        //  url: "../../backend/logic/addProduct_logic.php",
        success: function (response) {
            if (response.success) {
                if ($("#submit").text() == "Aktualisieren") {
                    $("#message-success").text("Das Produkt wurde aktualisiert!").show().fadeOut(2700);
                    $("#updateSelection").val("(Keine Auswahl)").change();
                } else {
                    $("#message-success").text("Das Produkt wurde hinzugefügt!").show().fadeOut(2700);
                }
                $("#bild").replaceWith('<input type="file" class="form-control-file" name="bild" id="bild" accept="image/jpeg, image/jpg, image/png" required>');
                emptyAll();
                addAdminFunction();
            } else {
                $("#message-failed").show().fadeOut(3700);
            }
        },
        error: function (error) {
            $("#message-error").show().fadeOut(3700);
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
    $("#updateSelection").empty().append('<option selected id="noUpdate">(Keine Auswahl)</option>');
    $("#submit").text("Hinzufügen")

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

}

function optionProduct(product) {
    let $opt = $("<option>");
    $opt.text(product.id + ": " + product.name);
    $("#updateSelection").append($opt);
}

$('#updateSelection').change(function () {
    if ($("#updateSelection option:selected").val() == "(Keine Auswahl)") {
        $("#delete").remove();
        emptyAll();

        $("#bild").prop('required', true);

        $("#submit").text("Hinzufügen")

    } else {
        $("#delete").remove();
        let id = parseInt($("#updateSelection").val());
        console.log("ID: " + id);

        var storage = sessionStorage.getItem("select");
        var select = JSON.parse(storage);
        var selected = select.find(selStorage => selStorage.id == id);
        //console.log(selected);

        $("#firma").val(selected.firma);
        $("#name").val(selected.name);
        $("#preis").val(selected.preis);
        $("#kurzbeschreibung").val(selected.kurzbeschreibung);
        $("#text").val(selected.text);

        //$("#bild").remove();
        $("#bild").removeAttr('required');


        $("#submit").text("Aktualisieren")

        var $button = $("<button>")
        $button.attr("type", "submit")
        $button.attr("id", "delete")
        $button.attr("class", "btn btn-danger")
        $button.text("Löschen")
        $("#form").append($button)

        $button.on("click", function (event) {
            event.preventDefault();

            $.ajax({
                type: "POST",
                data: {
                    method: "deleteProduct",
                    param: JSON.stringify({
                        id: parseInt($("#updateSelection").val())
                    })
                },
                dataType: "json",
                url: "../../backend/logic/requestHandler.php",
                success: function (response) {
                    if (response.success) {
                        $("#message-success").text("Das Produkt wurde gelöscht!").show().fadeOut(2700);
                        $("#updateSelection").val("(Keine Auswahl)").change();
                        emptyAll();
                        addAdminFunction();
                    } else {
                        $("#message-failed").show().fadeOut(3700);
                    }
                },
                error: function (error) {
                    $("#message-error").show().fadeOut(3700);
                }
            });
        })
    }
})

function emptyAll() {
    $("#firma").val("");
    $("#name").val("");
    $("#preis").val("");
    $("#kurzbeschreibung").val("");
    $("#text").val("");
}