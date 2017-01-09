let boardChosen = false;

function updateRecentlyAddedCards() {
  $('ul#cards').html('');
   $.get('/cards', function(cards) {
    if(cards.length > 0) {
      $('#cardsSection').show();
    }
    cards.forEach(function(card) {
      //console.log(card);
      $('<li>' + card.boardName + ': <a target="_new" href="' + card.url + '">' + card.name + '</a></li>').appendTo('ul#cards');
    });
   });
}

function unchooseBoard() {
    boardChosen = false;
    $('#cardMakerForm').hide();
    $('#title').val('');
    $('.pick').show();
    $('#pick').show();
    $('#picked').hide();
    $('#description').val('');
    $('#hide').show();
}

function handleKeyUp(e) {
  const key = e.key;
  
  if('Escape' === key) {
    if(boardChosen) {
      unchooseBoard();
    } else {
      window.close();
    }
  }

  if(!boardChosen && (-1 !== $.inArray(key, ['a', 's', 'z']))) {
    boardChosen = true;
    $('#cardMakerForm').show();
    $('#title').focus();
    $('.pick').hide();
    $('#pick').hide();
    $('#picked').show();
    $('#' + e.key).show();
  }
}

$(function() {
  updateRecentlyAddedCards();
  
  $(document).bind('keyup', handleKeyUp);

  $('form').submit(function(event) {
    $(document).unbind('keyup')
    event.preventDefault();
    
    // Save our values
    var list = $('.pick:visible').attr('id');
    var title = $('#title').val();
    var description = $('#description').val();
    
    // Display submitting if taking more than a split second (usually quicker)
    var submitting = setTimeout(function(){
      $('#main').html('Submitting...');
    }, 300);
    
    function displayCard(){
      clearTimeout(submitting);
      $('#main').html('<h2 class="error">Submission failed? Save your card:</h2><p id="saver">');
      $('#saver').html('<br /><b>Title</b><br /><pre>' + title + '</pre><br /><b>Description</b><br /><pre>' + description + '</pre>');
    }
    
    // Display error if more than a couple seconds (almost never takes this long)
    setTimeout(function(){
      displayCard();
    }, 2000);
    
    // Make the card
    $.post('/addCard?' + $.param({title: title, description:description, list:list}), function(code, result) {
      if(code !== 'OK' || result !== 'success') {
        alert('Error adding card, see console log');
        console.log(code);
        console.log(result);
      } else {
        window.close();
      }
    }).fail(function() {
        displayCard();
        alert('Error adding card');
    });
  });
});