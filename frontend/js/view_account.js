$(document).ready(function () {
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
        let customer = response;
        let status = "Aktiv"
        console.log((customer.status))
        if(customer.status !== 1){
        status = "Inaktiv"        
        }
        console.log(status);


        $('#username').html(customer.username)
        $('#status').html(status);
        $('#vorname').html(customer.vorname );
        $('#nachname').html(customer.nachname)
        $('#email').html(customer.email);
        $('#add').html(customer.adresse + ', ' + customer.plz + ', ' + customer.ort);
        $('#editButton').click(function () {
            if ($(this).text() === 'Bearbeiten') {
            $('#vorname').replaceWith('<input type="text" id="vornameInput" class="borderless-input" value="' + $('#vorname').text() + '">');
            $('#nachname').replaceWith('<input type="text" id="nachnameInput" class="borderless-input" value="' + $('#nachname').text() + '">');
            $('#email').replaceWith('<input type="text" id="emailInput" class="borderless-input" value="' + $('#email').text() + '">');
            $('#add').replaceWith('<input type="text" id="addInput" class="borderless-input" value="' + $('#add').text() + '">');

            var status = $('#status').text().trim();
            if (status === 'Aktiv') {
            $('#status').append('<button id="aktivButton" class="btn btn-outline-success my-2 my-sm-0" type="button">deaktivieren</button>');
            }
            $(this).text('Submit');
            }
            else if ($(this).text() === 'Submit') {
                var statusOriginal = status;
                var vornameOriginal = $('#vorname').text();
                var nachnameOriginal = $('#nachname').text();
                var emailOriginal = $('#email').text();
                var addOriginal = $('#add').text();
            
                var statusEdited = $('#statusInput').val();
                var vornameEdited = $('#vornameEdited').val();
                var nachnameEdited = $('#nachnameEdited').val();
                var emailEdited = $('#emailInput').val();
                var addEdited = $('#addInput').val();
            
                var hasChanges = false;
            
                if (statusOriginal !== statusEdited) {
                  hasChanges = true;
                }
                if (vornameOriginal!== vornameEdited) {
                  hasChanges = true;
                }
                if(nachnameOriginal !== nachnameEdited){
                    hasChanges = true;
                }
                if (emailOriginal !== emailEdited) {
                  hasChanges = true;
                }
                if (addOriginal !== addEdited) {
                  hasChanges = true;
                }
                if (hasChanges) {
                  var data = {
                    status: statusEdited,
                    varname: vornameEdited,
                    nachname: nachnameEdited,
                    email: emailEdited,
                    add: addEdited
                  };
                  $.ajax({
                    url: '../../backend/logic/requestHandler.php',
                    type: 'POST',
                    data:{
                        method: "editAccount",
                        param: data
                    }, 
                    success: function (response) {
                      console.log('Data submitted successfully:' + response);
                      
                      $('#status').text(statusEdited);
                      $('#geburtsdatum').text(geburtsdatumEdited);
                      $('#email').text(emailEdited);
                      $('#add').text(addEdited);
            
                      $('#editButton').text('Bearbeiten');
                    },
                    error: function (error) {
                    
                      console.error('Error submitting data:', error);
                    }
                  });
                } else {
                  //Do nothing
                }
              }
            });
      }
    }
    $.ajax(config);

});
