$(function() {

  // When the '?' key is pressed
  $(document).keypress(function(e) {
    if (e.which == 63) {
      $('#helpModal').modal('toggle');
    }
  });

  // Activate tooltips
  $("[rel='tooltip']").tooltip({
    placement: 'bottom'
  });

  // On move select
  var movesSelect = $('#moves select'),
      moveAddButton = $('#moves #addButton');
  movesSelect.change(function() {
    if (movesSelect.val() !== null) {
      moveAddButton.removeAttr('disabled');
    } else {
      moveAddButton.attr('disabled', 'disabled');
    }
  });

  // Load the moves
  $.getJSON('moves.json', function(data, textStatus, jqXHR) {
    $.each(data, function(val, move) {
      $('#moves select').append($('<option/>').val(val).text(move.name));
    });
    $('#moves-loading').fadeOut(function() {
      $('#moves').fadeIn();
    });
  });

  // On move removal click
  $('#move-list li i.icon-remove-sign').click(function(e) {
    var target = $(e.target).parent('li');
    target.fadeOut(function() {
      target.remove();
    });
  });

});
