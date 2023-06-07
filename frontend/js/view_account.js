const username = document.cookie.split(';').find(cookie => cookie.includes('username')).split('=')[1];
let url = "../../backend/logic/requestHandler.php";

let config = {
    url: url,
    type: "GET",
    dataType: "json",
    data: {
        method: "viewAccount",
        param: username
    },
    success: function (response) {
        console.log(response);
        displayUserInfo(response);
    },
    error: function () {
        $('.error').append('<center><div class="alert alert-danger" role="alert" style="width:50%;">The data could not be loaded! :(</div></center>');
    }
};

$.ajax(config);

function displayUserInfo(userInfo) {
    //let userInfo = response;

let $usernameElement = $('<div>', {
    id: 'username',
    text: 'Username: ' + userInfo.username
});

let $nameElement = $('<div>', {
    id: 'name',
    text: 'Name: ' + userInfo.anrede +  userInfo.name + userInfo.nachname
});

let $statusElement = $('<div>', {
    id: 'status',
    text: 'Status: ' + userInfo.status
});

let $geburtsdatumElement = $('<div>', {
    id: 'geburtsdatum',
    text: 'Geburtsdatum: ' + userInfo.geburtsdatum
});

let $emailElement = $('<div>', {
    id: 'email',
    text: 'Email: ' + userInfo.email
});

let $addressElement = $('<div>', {
    id: 'address',
    text: 'Address: ' + userInfo.address + ', ' + userInfo.plz + userInfo.ort 
});

// Append the elements to their respective parent containers
$('#username').append($usernameElement);
$('#name').append($nameElement);
$('#status').append($statusElement);
$('#geburtsdatum').append($geburtsdatumElement);
$('#email').append($emailElement);
$('#address').append($addressElement);

}
