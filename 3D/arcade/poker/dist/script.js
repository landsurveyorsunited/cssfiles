const playingCards = (function() {
  const suits = ['hearts', 'diams', 'clubs', 'spades'];
  const ranks = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];
  const cards = suits.reduce((deck, suit) => {
    return [
      ...deck,
      ...ranks.map(rank => ({suit, rank}))
    ];
  }, []);
  let shuffledCards = [...cards];
  let report = {Hands: 0, Decks: 0};
  let isAnimating = false;
  
  function deal() {
    let handsWithScore = 0;
    shuffledCards = [...shuffledCards].sort(() => Math.random() - 0.5);
    document.getElementById('hands').innerHTML = '';
    for (let i = 0; i < 50; i += 5) {
      let hand = shuffledCards.slice(i, i+5);
      let handScore = score(hand);
      renderHand( hand, handScore);
      report[handScore || 'None'] = report[handScore || 'None'] || 0;
      report[handScore || 'None'] += 1;
      if ( handScore ) handsWithScore += 1;
    }
    report.Hands += 10;
    report.Decks += 1;
    report[handsWithScore + ' Hands'] = report[handsWithScore + ' Hands'] || 0;
    report[handsWithScore + ' Hands'] += 1;
    renderReport();
  }

  function score(hand) {
    let rankCounts = {};
    let suitCounts = {};
    let pairCounts = [0, 0, 0, 0, 0];
    let isFlush = false;
    let isStraight = true;
    let prevRank = '';
    let sortedHand = [...hand].sort((a, b) => ranks.indexOf(a.rank) - ranks.indexOf(b.rank));
    sortedHand.forEach((card, idx) => {
      rankCounts[card.rank] = rankCounts[card.rank] || 0;
      rankCounts[card.rank] += 1;
      suitCounts[card.suit] = suitCounts[card.suit] || 0;
      suitCounts[card.suit] += 1;
      
      if (isStraight && prevRank) {
        if (idx === 4 && prevRank === 5) {
          if (['A', 6].indexOf(card.rank) === -1) {
            isStraight = false;
          }
        } else if (ranks.indexOf(prevRank) !== ranks.indexOf(card.rank) - 1) {
          isStraight = false;
        }
      }
      prevRank = card.rank;
    });
    
    for (let rankKey in rankCounts) {
      pairCounts[rankCounts[rankKey]] += 1;
    }
    
    for (let suitKey in suitCounts) {
      isFlush = suitCounts[suitKey] === 5;
    }
    
    if (isFlush && isStraight && hand[0].rank === 10) {
      return 'Royal Flush'
    } else if (isFlush && isStraight) {
      return 'Straight Flush';
    } else if (pairCounts[4]) {
      return 'Four of a Kind';
    } else if (pairCounts[3] && pairCounts[2]) {
      return 'Full House';
    } else if (isFlush) {
      return 'Flush';
    } else if (isStraight) {
      return 'Straight';
    } else if (pairCounts[3]) {
      return 'Three of a Kind';
    } else if (pairCounts[2] === 2) {
      return 'Two Pairs';
    } else if (pairCounts[2]) {
      return 'One Pair';
    }
    return '';
  }
  
  function renderHand(hand, score) {
    let str = document.getElementById('hands').innerHTML;
    str += hand.reduce((str, card) => {
      let className = ['hearts', 'diams'].includes(card.suit) ? 'red' : '';
      return str += _generateCard(card);
    }, '<li>');
    str += `${score ? `<p>${score}</p>` : ''}</li>`;
    document.getElementById('hands').innerHTML = str;
  }
  
  function _generateCard(card) {
    const suitString = card.suit ? `&${card.suit}; ` : '';
    const displays = {
      A: suitString,
      K: '&#9818;',
      Q: '&#9819;',
      J: '&#x2694;',
      Joker: '&#127183;'
    };
    const cardDisplay = displays[card.rank] || suitString.repeat(card.rank);
    return `
      <div class="playing-card flipped">
        <div class="card-front ${card.suit || ''}" data-card="${card.rank}${suitString}">
          <span>${cardDisplay}</span>
        </div>
      </div>
    `;
  }
  
  function renderReport() {
    let str = '';
    let cats = ['Decks','Hands', 'None', 'One Pair', 'Two Pairs', 'Three of a Kind', 'Straight', 'Flush', 'Full House', 'Four of a Kind', 'Straight Flush', 'Royal Flush', '0 Hands', '1 Hands', '2 Hands', '3 Hands', '4 Hands', '5 Hands', '6 Hands', '7 Hands', '8 Hands', '9 Hands', '10 Hands'];
    cats.forEach(cat => str += `<li>${cat}: ${report[cat] || 0}</li>`);
    document.getElementById('report').innerHTML = str;
  }
  
  function animationStep() {
    deal();
    if (isAnimating) {
      window.requestAnimationFrame(animationStep);
    }
  }
  
  function toggleAnimation() {
    isAnimating = !isAnimating;
    if (isAnimating) {
      window.requestAnimationFrame(animationStep);
    }
  }
  
  return { deal, toggleAnimation };
})();

//for (let i = 0; i < 1000; i ++){
  playingCards.deal();
//}