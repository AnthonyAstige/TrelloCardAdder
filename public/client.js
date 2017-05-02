/* globals CONFIG */
let boardChosen = false;
const domain = 'https://trello-card-adder.glitch.me';

function updateRecentlyAddedCards() {
  $('#cards').html('');
  $.get(domain + '/cards', (cards) => {
    const now = new Date();

    // Forget cards older than 15 minutes
    for (let ii = 0; ii < cards.length; ii++) {
      const card = cards[ii];
      const added = Date.parse(card.dateLastActivity); // Note: Ignoring fact that Trello seems ~20 seconds faster than local
      const minutesAgo = (now - added) / 1000 / 60;
      if (minutesAgo > 15) {
        cards.splice(ii--, 1);
      }
    }

    // Display recent cards
    if (cards.length > 0) {
      $('#cardsSection').show();
      cards.forEach(function(card) {
        $('<p><a target="_new" href="' + card.url + '">' + card.name + '</a> (' + card.boardName + ')</p>').appendTo('#cards');
      });
    }
  });
}

function handleKeyUp(e) {
  const key = e.key;
  
  if ('Escape' === key) {
    if (boardChosen) {
      // Unchoose board
      boardChosen = false;
      $('#cardMakerForm').hide();
      $('.pick').show();
      $('#pick').show();
      $('#picked').hide();
      $('#hide').show();
      $('#cardsSection').show();
    } else {
      // Close app
      window.close();
    }
  }
  
  // Shortcut key hit
  const keyboardShortcutKeys = CONFIG.map((a) => a.keyboardShortcut);
  if (!boardChosen && (-1 !== $.inArray(key, keyboardShortcutKeys))) {
    boardChosen = true;
    $('#cardMakerForm').show();
    
    $('#title').focus();
    $('.pick').hide();
    $('#pick').hide();
    $('#picked').show();
    $('#cardsSection').hide();
    $('#' + e.key).show();
  }
}

$(() => {
  updateRecentlyAddedCards();

  $(document).bind('keyup', handleKeyUp);

  $('form').submit((event) => {
    // Prevent double submit / double key use
    $(document).unbind('keyup');
    event.preventDefault();

    // Save our values
    const list = $('.pick:visible').attr('id');
    const title = $('#title').val();
    const description = $('#description').val();

    // Display submitting if taking more than a split second (often quicker)
    let submitting = setTimeout(() => {
      $('#main').html('Submitting...');
    }, 300);

    // Helper to display card in card of errors
    const displayCard = () => {
      clearTimeout(submitting);
      $('#main').html('<h2 class="error">Submission failed? Save your card:</h2><p id="saver">');
      $('#saver').html('<br /><b>Title</b><br /><pre>' + title + '</pre><br /><b>Description</b><br /><pre>' + description + '</pre>');
    }

    // Display error if more than a couple seconds (almost never takes this long)
    setTimeout(displayCard, 2000);

    // Make the card
    $.post(domain + '/addCard?' + $.param({title, description, list}), (code, result) => {
      if(code !== 'OK' || result !== 'success') {
        alert('Error adding card, see console log');
        console.log(code);
        console.log(result);
      } else {
        window.close();
      }
    }).fail(() => {
      displayCard();
      alert('Error adding card');
    });
  });
});