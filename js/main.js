$(function() {

  // When the '?' key is pressed
  $(document).keypress(function(e) {
    if (e.which == 63) {
      $('#helpModal').modal('toggle');
    }
  });

  // When a move is selected
  var movesSelect = $('#moves select'),
      moveAddButton = $('#moves #addButton');
  movesSelect.change(function() {
    if (movesSelect.val() !== null) {
      moveAddButton.removeAttr('disabled');
    } else {
      moveAddButton.attr('disabled', 'disabled');
    }
  });

});
