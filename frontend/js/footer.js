$(document).ready(function(){
    function loadFooter(){
        $("#footer").load("../sites/footer.html", function(){
          $("body").fadeIn(1000);
        });
    }
    loadFooter()
});
