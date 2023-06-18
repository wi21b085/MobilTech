$(document).ready(function() {
    // Add a click event listener to the submit button
    $('#editButton').click(function() {
      // Read the input values
      var oldPassword = $('#altePasswordInput').val();
      var newPassword = $('#neuesPasswordInput').val();
      var newPasswordRepeat = $('#neuesPasswordWiederholungInput').val();
  
      // Perform password verification
      verifyPassword(oldPassword, function(response) {
        if (response.success) {
          // Password verification successful, proceed with password update
          if (newPassword === newPasswordRepeat) {
            // Call the updatePassword function
            updatePassword(newPassword, function(updateResponse) {
              if (updateResponse.success) {
                // Password update successful
                alert('Password updated successfully');
              } else {
                // Password update failed
                alert('Failed to update password');
              }
            });
          } else {
            // New password and repeat password do not match
            alert('New password and repeat password do not match');
          }
        } else {
          // Password verification failed
          alert('Incorrect old password');
        }
      });
    });
  
    // Function to verify the old password
    function verifyPassword(oldPassword, callback) {
      // Send an Ajax request to verify_password.php
      $.ajax({
        url: '.../../backend/logic/requestHandler.php',
        method: 'POST',
        data: { password: oldPassword },
        dataType: 'json',
        success: function(response) {
          callback(response);
        },
        error: function() {
          // Ajax request failed
          alert('Failed to verify password');
        }
      });
    }
  
    // Function to update the password
    function updatePassword(newPassword, callback) {
      // Send an Ajax request to update_password.php
      $.ajax({
        url: '../../backend/logic/requestHandler.php',
        method: 'POST',
        data: { password: newPassword },
        dataType: 'json',
        success: function(response) {
          callback(response);
        },
        error: function() {
          // Ajax request failed
          alert('Failed to update password');
        }
      });
    }
  });