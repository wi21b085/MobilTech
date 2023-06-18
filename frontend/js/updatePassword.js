$(document).ready(function() {
    
    $('#editButton').click(function() {
    
      var oldPassword = $('#altePasswordInput').val();
      var newPassword = $('#neuesPasswordInput').val();
      var newPasswordRepeat = $('#neuesPasswordWiederholungInput').val();
  
     
      verifyPassword(oldPassword, function(response) {
        if (response.success) {
          
          if (newPassword === newPasswordRepeat) {
            updatePassword(newPassword, function(updateResponse) {
              if (updateResponse.success) {
                alert('Password updated successfully');
              } else {
                alert('Failed to update password');
              }
            });
          } else {
            alert('New password and repeat password do not match');
          }
        } else {
          alert('Incorrect old password');
        }
      });
    });
  

    function verifyPassword(oldPassword, callback) {
      $.ajax({
        url: '.../../backend/logic/requestHandler.php',
        method: 'POST',
        data: { password: oldPassword },
        dataType: 'json',
        success: function(response) {
          callback(response);
        },
        error: function() {
          alert('Failed to verify password');
        }
      });
    }
  
    
    function updatePassword(newPassword, callback) {
   
      $.ajax({
        url: '../../backend/logic/requestHandler.php',
        method: 'POST',
        data: { password: newPassword },
        dataType: 'json',
        success: function(response) {
          $("#message-success").text("Password geändert !").show().fadeOut(2700);
          callback(response);
        },
        error: function() {
      
          alert('Failed to update password');
        }
      });
    }
  });