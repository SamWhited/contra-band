$(function() {

  // When the '?' key is pressed
  $(document).keypress(function(e) {
    if (e.which == 63) {
      $('#helpModal').modal('toggle');
    }
  });

});
