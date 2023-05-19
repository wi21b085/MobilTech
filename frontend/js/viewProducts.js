
function ladeProduct(product) {
    let $productCard = $('<div>', {
        class: 'card',
        css: {
            'width': '18rem',
            'height': 'auto',
            'margin-right': '20px',
            'margin-top': '25px'

        }
    });

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

    let $cardBody = $('<div>', {
        class: 'card-body'
    });

    let $cardTitle = $('<h5>', {
        class: 'card-title',
        text: product.name
    });

    let $cardText = $('<p>', {
        class: 'card-text',
        text: product.kurzbeschreibung,
    });

    let $cardPreis = $('<p>', {
        class: 'card-text',
        text: product.preis + "€",
    });
    let cardStarts = $('<p>', {
        class: 'card-text',
        css: {
            color: 'gold',
            'font-size': '20px',
        },
        text: (function () {
            switch (product.bewertung) {
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


    let $cardLink = $('<a>', {
        class: 'btn btn-primary',
        //href: 'hhhh'+product.id,
        text: 'Kauf'
    });


    $productCard.append($cardImg, $cardBody);
    $cardBody.append($cardTitle, $cardText, $cardPreis, cardStarts, $cardLink);
    $('.product-placeholder').append($productCard);

    var $ratingInputs = $('input[name="rating"]');
    $ratingInputs.change(function () {
        var rating = $(this).val();
        if (product.bewertung == rating) {
            $productCard.append($cardImg, $cardBody);
            $cardBody.append($cardTitle, $cardText, $cardPreis, cardStarts, $cardLink);
            $('.product-placeholder').append($productCard);
        } else {
            $productCard.remove();
        }
    });

    var $artInput = $('button[name="art"]');
    $artInput.on("click", function () {
        var art = $(this).val();
        console.log(art);
        if (product.firma == art) {
            $productCard.append($cardImg, $cardBody);
            $cardBody.append($cardTitle, $cardText, $cardPreis, cardStarts, $cardLink);
            $('.product-placeholder').append($productCard);
        }else {
            $productCard.remove();
        }
        
        $ratingInputs.each(function () {
            $(this).prop('checked', false);
        });
    });


    // var samsung = $('#samsung').attr('value');
    // var apple = $('#apple').attr('value');
    // var huawei = $('#huawei').attr('value');

    $("#all").on("click", function () {
        $productCard.append($cardImg, $cardBody);
        $cardBody.append($cardTitle, $cardText, $cardPreis, cardStarts, $cardLink);
        $('.product-placeholder').append($productCard);
        $ratingInputs.each(function () {
            $(this).prop('checked', false);
        });

    });
}


$(document).ready(function () {
    $('.filter-more').slideUp();
    $('#more').click(function () {
        $('.filter-more').slideToggle();
    });
});








let url = "../../backend/logic/requestHandler.php";

let config = {
    url: url,
    type: "GET",
    dataType: "json",
    data: {
    method:"viewProduct"
    },
    success: function (response) {
        console.log(response);
        for (let i in response) {
            let product = response[i];
            ladeProduct(product);
        }
    },
    error: function () {
        $('.error').append('<center><div class="alert alert-danger" role="alert" style="width:50%;">The data could not be loaded! :(</div></center>');
    }
};

$.ajax(config);

