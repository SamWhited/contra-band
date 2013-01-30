$(function() {

  //
  // Helper Functions
  //
  var newEditableSpan = function(options) {
    options = $.extend({
      text: 'New Editable',
    }, options);
    return (
      addEditableHandlers($('<span/>')
        .text(options.text)
        .attr('contenteditable', 'true')
        .attr('data-original-text', options.text))
    );
  },
  addEditableHandlers = function(editable) {
    editable = editable || $('[contenteditable=true]');
    editable.each(function(i, v) {
      var target = $(v);
      target.attr('data-original-text', target.text());
    });
    editable.keydown(function(e) {
      var target = $(e.target);
      switch (e.which) {
        case 13: // Enter
          target.attr('data-original-text', target.text());
          target.blur();
          break;
        case 27: // Escape
          target.text(target.attr('data-original-text'));
          target.blur();
          break;
      }
    });
    return editable;
  },
  insertMoveLi = function(options) {
    options = $.extend({
      title: 'New Move',
    }, options);

    var newMove = $('<li/>')
      .hide()
      .append([
        newEditableSpan({
          text: options.title
        }),
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

  // Make sure any editable elements that are already in the page have the
  // required handlers.
  addEditableHandlers();

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
  $(document).keydown(function(e) {
    var focused = $("*:focus");
    if (!focused.is("textarea, input[text], [contenteditable=true]")
          && e.which == 63) {
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
