//Example fetch using pokemonapi.co
document.querySelector('#shuffle').addEventListener('click', getFetch)

document.querySelector('#draw').addEventListener('click', getDraw)
document.querySelector('#resetbutton').addEventListener('click', reset)

function hideDiv() {
  let x = document.getElementById('grabdeck');
  let y = document.getElementById('drawcard');
  let z = document.getElementById('container');
  let deck = document.getElementById('deckdiv');
  let header = document.querySelector('h1');
  if (x.style.display === "none") {
    x.style.display = "flex";
  } else {
    x.style.display = "none";
  }
  if (deck.style.display === "block") {
    deck.style.display = "none";
  } else {
    deck.style.display = "block";
  }
  if (y.style.display === "flex") {
    y.style.display = "none";
  } else {
    y.style.display = "flex";
  }
  if (z.style.display === "flex") {
    z.style.display = "none";
  } else {
    z.style.display = "flex";
  }
  if (header.style.display === "none") {
    header.style.display = "block";
  } else {
    header.style.display = "none";
  }

  document.querySelector('#compPile').src = 'https://www.deckofcardsapi.com/static/img/back.png';
  document.querySelector('#playerPile').src = 'https://www.deckofcardsapi.com/static/img/back.png';
  document.querySelector('#compcounter').innerText = `Computer Score: 0`;
  document.querySelector('#playercounter').innerText = `Player Score: 0`;
  document.querySelector('#remaining').innerText = `Cards remaining: 52`

}

function reset() {
  let reset = document.getElementById('reset');
  document.getElementById('compCardText').innerText = '';
  document.getElementById('playerCardText').innerText = '';
  compScore = 0;
  playerScore = 0;
  if (reset.style.display === "none") {
    reset.style.display = "block";
  } else {
    reset.style.display = "none";
  }

  hideDiv();
}
let deckId = '';
function getFetch() {
  const url = `https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`
  fetch(url)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      console.log(data)
      deckId = data.deck_id
      document.querySelector('#deck').src = 'https://www.deckofcardsapi.com/static/img/back.png'
    })
    .catch(err => {
      console.log(`error ${err}`)
    });
}

let compScore = 0;
let playerScore = 0;

function getDraw() {
  const url = `https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`;
  let reset = document.getElementById('reset');
  let z = document.getElementById('container');
  let player = document.getElementById('playercounter');
  let computer = document.getElementById('compcounter');
  let playertext = document.getElementById('playerCardText').innerText = 'Player Card';
  let comptext = document.getElementById('compCardText').innerText = 'Computer Card';
  fetch(url)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      console.log(data)
      z.style.display = "flex";
      if (data.remaining === 0) {
        document.querySelector('#compCard').src = data.cards[0].image
        comptext;
        playertext;
        document.querySelector('#playerCard').src = data.cards[1].image
        document.querySelector('#remaining').innerText = `Cards remaining: ${data.remaining}`
        document.querySelector('#compPile').src = 'https://www.deckofcardsapi.com/static/img/back.png';
        document.querySelector('#playerPile').src = 'https://www.deckofcardsapi.com/static/img/back.png';
        if (data.cards[0].value > data.cards[1].value) {
          compScore += 2;
          computer.style.color = "yellow";
          player.style.color = "white";

          document.querySelector('#compcounter').innerText = `Computer Score: ${compScore}`;
          document.querySelector('#playercounter').innerText = `Player Score: ${playerScore}`;

        } else {
          playerScore += 2;
          computer.style.color = "white";
          player.style.color = "yellow";
          document.querySelector('#compcounter').innerText = `Computer Score: ${compScore}`;
          document.querySelector('#playercounter').innerText = `Player Score: ${playerScore}`;

        }
        if (compScore > playerScore) {

          document.querySelector('#compcounter').innerText = `Computer Score: ${compScore}`;
          document.querySelector('#remaining').innerText = `Cards remaining: 0`
          document.getElementById('compCardText').innerText = '';
          document.getElementById('playerCardText').innerText = '';
          document.querySelector('#compCard').src = ""
          document.querySelector('#playerCard').src = ""

          if (reset.style.display === "flex") {
            reset.style.display = "none";
          } else {
            reset.style.display = "flex";
          }
          setTimeout(function () { alert(`Computer Wins with ${compScore} points :/`); }, 1000);


        } else {
          document.getElementById('compCardText').innerText = '';
          document.getElementById('playerCardText').innerText = '';
          document.querySelector('#playercounter').innerText = `Player Score: ${playerScore}`;
          document.querySelector('#remaining').innerText = `Cards remaining: 0`
          document.querySelector('#compCard').src = ""
          document.querySelector('#playerCard').src = ""

          if (reset.style.display === "flex") {
            reset.style.display = "none";
          } else {
            reset.style.display = "flex";
          }
          setTimeout(function () { alert(`You win with ${playerScoreScore} points !`); }, 1000);

        }

      }
      else {
        document.querySelector('#compCard').src = data.cards[0].image
        document.querySelector('#playerCard').src = data.cards[1].image
        document.querySelector('#remaining').innerText = `Cards remaining: ${data.remaining}`
        document.querySelector('#compPile').src = 'https://www.deckofcardsapi.com/static/img/back.png';
        document.querySelector('#playerPile').src = 'https://www.deckofcardsapi.com/static/img/back.png';
        comptext;
        playertext;
        if (data.cards[0].value > data.cards[1].value) {
          compScore += 2;
          computer.style.color = "yellow";
          player.style.color = "white";
          document.querySelector('#compcounter').innerText = `Computer Score: ${compScore}`;
          document.querySelector('#playercounter').innerText = `Player Score: ${playerScore}`;
        } else {
          playerScore += 2;
          computer.style.color = "white";
          player.style.color = "yellow";
          document.querySelector('#compcounter').innerText = `Computer Score: ${compScore}`;
          document.querySelector('#playercounter').innerText = `Player Score: ${playerScore}`;
        }
      }



    })
    .catch(err => {
      console.log(`error ${err}`)
    });
}



