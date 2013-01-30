$(function() {

  //
  // Helper Functions
  //

  var insertMoveLi = function(options) {
    options = $.extend({
      title: 'New Move',
    }, options);

    var newMove = $('<li/>')
      .hide()
      .append([
        $('<span/>').text(options.title).attr('contenteditable', 'true'),
        $('<i/>').addClass('icon-remove-sign').click(function(e) {
          var target = $(e.target).parent('li');
          target.fadeOut(function() {
            target.remove();
          });
        }),
        $('<i/>').addClass('icon-plus-sign').click(function(e) {
          insertMoveLi({
            after: $(e.target).parent('li')
          });
        })
      ]);

    if (options.after) {
      newMove.insertAfter($(options.after));
    } else {
      $('#move-list').append(newMove);
    }

    newMove.fadeIn();
    return (newMove);
  }

  //
  // AJAX Calls
  //

  // Load the moves
  $.getJSON('moves.json', function(data, textStatus, jqXHR) {
    $.each(data, function(val, move) {
      $('#moves select').append($('<option/>').val(val).text(move.name));
    });
    $('#moves-loading').fadeOut(function() {
      $('#moves').fadeIn();
    });
  });

  // Load an example dance
  $.getJSON('brokensixpence.json', function(data, textStatus, jqXHR) {
    $.each(data.dance.moves, function(val, move) {
      insertMoveLi({
        title: move.title
      });
    });
  });

  //
  // Events
  //

  // On move add button click
  $('#addButton').click(function(e) {
    insertMoveLi({
      title: $('#moves select option:selected').first().text()
    });
  });

  // When the '?' key is pressed
  $(document).keypress(function(e) {
    if (e.which == 63) {
      $('#helpModal').modal('toggle');
    }
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

  // Activate tooltips
  $("[rel='tooltip']").tooltip({
    placement: 'bottom'
  });

});
