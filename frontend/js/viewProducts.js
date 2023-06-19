//hier wird jeder produkt erstellt mit dem design
function ladeProduct(product) {
    //hier wird das jeweilige product card erstellt
    let $productCard = $('<div>', {
        class: 'card',
        css: {
            'width': '18rem',
            'height': 'auto',
            'margin-right': '20px',
            'margin-top': '25px'

        }
    });
    //hier wird das jeweilige produkt image gezeigt und mit dem css formatieret
    let $cardImg = $('<img>', {
        class: 'card-img-top',
        src: product.bild,
        css: {
            'width': '12rem',
            'height': 'auto',
            'object-fit': 'contain',
            'height': '200px',
            'width': '100%',
            'display': 'block',
            'margin': '0 auto'
        }
    });
    //hier wird das card-body erstellt
    let $cardBody = $('<div>', {
        class: 'card-body'
    });

    //hier wird das produkt name in einem h5 gezeigt und mit dem bootstrap class card-title formatiert
    let $cardTitle = $('<h5>', {
        class: 'card-title',
        text: product.name
    });
    //hier cardText gezeigt und formatiert 
    let $cardText = $('<p>', {
        class: 'card-text',
        text: product.kurzbeschreibung,
        css: {
            'height': '120px',
        }
    });
    //hier wird das produkt preis gezeigt und formatiert
    let $cardPreis = $('<p>', {
        class: 'card-text',
        text: product.preis + "€",
    });
    //hier wird die bewertung von dem produkt gezeigt
    let cardStarts = $('<p>', {
        class: 'card-text',
        //wird auf dem gold farbe und auf größe von 20px formatiert
        css: {
            color: 'gold',
            'font-size': '20px',
        },
        //hier wird überprüft das wert von der bewertung
        text: (function () {
            switch (product.bewertung) {
                //wenn 0 dann wir das string mit leere sterne

                case 0:
                    return "☆☆☆☆☆";
                    break;
                case 1:
                    return "★☆☆☆☆";
                    break;
                case 2:
                    return "★★☆☆☆";
                    break;
                case 3:
                    return "★★★☆☆";
                    break;
                case 4:
                    return "★★★★☆";
                    break;
                case 5:
                    return "★★★★★";
                    break;
            }
        })
    });

    //hier wird das card link(kauf button) erstellt die auch für jeweiligen produkt ein onclick erstellt
    let $cardLink = $('<a>', {
        href: '#',
        class: 'btn btn-primary',
        text: 'Kauf',
        onclick: `addToCart(${product.id}, 1, ${product.preis}, '${product.name}', '${product.bild}')`
    });

    //hier wird auf dem $productCard das img und body appenden
    $productCard.append($cardImg, $cardBody);
    //und auf dem body selber wird das titel(produkt name), preis, Bewertung, und button kauf appended
    $cardBody.append($cardTitle, $cardText, $cardPreis, cardStarts, $cardLink);
    $('.product-placeholder').append($productCard);


    //hier wird nach dem rating(bewertung) die jeweiligen produkten gefiltert und gezeigt
    var $ratingInputs = $('input[name="rating"]');
    $ratingInputs.change(function () {
        var rating = $(this).val();
        if (product.bewertung == rating) {
            //hier wird das obj von diesem produkt erstellt
            $productCard.append($cardImg, $cardBody);
            $cardBody.append($cardTitle, $cardText, $cardPreis, cardStarts, $cardLink);
            $('.product-placeholder').append($productCard);
        } else {
            //wenn product.bewertung != rating dann werden sie entfehrnt
            $productCard.remove();
        }
    });
    //hier werden alle produkt gezeigt
    $("#all").on("click", function () {
        $productCard.append($cardImg, $cardBody);
        $cardBody.append($cardTitle, $cardText, $cardPreis, cardStarts, $cardLink);
        $('.product-placeholder').append($productCard);
        $ratingInputs.each(function () {
            $(this).prop('checked', false);
        });

    });

    //hier wird nach dem art gefilltert 
    var $artInput = $('button[name="art"]');
    $artInput.on("click", function () {
        var art = $(this).val();
        console.log(art);
        //wenn das product.firm(von ajax request) das gleiche wie das art auf dem button die geclickt wurde ist, dann muss man die produkten mit dem art zeigen
        if (product.firma == art) {
            $productCard.append($cardImg, $cardBody);
            $cardBody.append($cardTitle, $cardText, $cardPreis, cardStarts, $cardLink);
            $('.product-placeholder').append($productCard);
        } else {
            //die produkten die nicht dem art entsprechen sollen auch nicht gezeigt
            $productCard.remove();
        }

        $ratingInputs.each(function () {
            $(this).prop('checked', false);
        });
    });


    // var samsung = $('#samsung').attr('value');
    // var apple = $('#apple').attr('value');
    // var huawei = $('#huawei').attr('value');


}

//hier wird mit toggle  das bewertung liste gezeigt oder geschlossen
$(document).ready(function () {
    $('.filter-more').slideUp();
    $('#more').click(function () {
        $('.filter-more').slideToggle();
    });
});






//hier machen wir ein ajax request mit methode viewProduct 
//hier erhalten wir alle produkten 
let url = "../../backend/logic/requestHandler.php";

let config = {
    url: url,
    type: "GET",
    dataType: "json",
    data: {
        method: "viewProduct"
    },
    success: function (response) {
        console.log(response);
        for (let i in response) {
            let product = response[i];
            //hier wird jeweilige produkt erstellt
            ladeProduct(product);
        }
    },
    error: function () {
        $('.error').append('<center><div class="alert alert-danger" role="alert" style="width:50%;">The data could not be loaded! :(</div></center>');
    }
};

$.ajax(config);
