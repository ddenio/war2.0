//Example fetch using pokemonapi.co
document.querySelector('#shuffle').addEventListener('click', getFetch)
document.querySelector('#warDraw').addEventListener('click', warDraw)
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

function showWarDiv() {
  let warHeader = document.getElementById('warHeader');
  let warDiv = document.getElementById('warDrawDiv');
  if (warHeader.style.display === "flex") {
    warHeader.style.display = "none";
  } else {
    warHeader.style.display = "flex";
  }
  if (warDiv.style.display === "flex") {
    warDiv.style.display = "none";
  } else {
    warDiv.style.display = "flex";
  }
}

function reset() {
  let reset = document.getElementById('reset');
  document.getElementById('compCardText').innerText = '';
  document.getElementById('playerCardText').innerText = '';
  let player = document.getElementById('playercounter');
  let computer = document.getElementById('compcounter');
  computer.style.color = "white";
  player.style.color = "white";
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
  document.querySelector('#warHeader').innerText = "";
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
      let computerVal = convertToNum(data.cards[0].value);
      let player1Val = convertToNum(data.cards[1].value);
      console.log(`Computer Val: ${computerVal}, Player Val: ${player1Val}`)
      if (data.remaining === 0) {
        document.querySelector('#compCard').src = data.cards[0].image
        comptext;
        playertext;
        document.querySelector('#playerCard').src = data.cards[1].image
        document.querySelector('#remaining').innerText = `Cards remaining: ${data.remaining}`
        document.querySelector('#compPile').src = 'https://www.deckofcardsapi.com/static/img/back.png';
        document.querySelector('#playerPile').src = 'https://www.deckofcardsapi.com/static/img/back.png';
        if (computerVal === player1Val) {
          computer.style.color = "white";
          player.style.color = "white";
          document.querySelector('#warHeader').innerText = `War!!! Draw another card to see who wins!!`
          document.querySelector('#compcounter').innerText = `Computer Score: ${compScore}`;
          document.querySelector('#playercounter').innerText = `Player Score: ${playerScore}`;
          showWarDiv();
          drawHide();
        } else if(computerVal > player1Val) {
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
          computer.style.color = "green";
          player.style.color = "white";
          if (reset.style.display === "flex") {
            reset.style.display = "none";
          } else {
            reset.style.display = "flex";
          }
          playertext = document.getElementById('playerCardText').innerText = '';
          comptext = document.getElementById('compCardText').innerText = '';
          setTimeout(function () { alert(`Computer Wins with ${compScore} points :/`); }, 500);


        } else {
          document.getElementById('compCardText').innerText = '';
          document.getElementById('playerCardText').innerText = '';
          document.querySelector('#playercounter').innerText = `Player Score: ${playerScore}`;
          document.querySelector('#remaining').innerText = `Cards remaining: 0`
          document.querySelector('#compCard').src = ""
          document.querySelector('#playerCard').src = ""
          computer.style.color = "white";
          player.style.color = "green";
          if (reset.style.display === "flex") {
            reset.style.display = "none";
          } else {
            reset.style.display = "flex";
          }
          playertext = document.getElementById('playerCardText').innerText = '';
          comptext = document.getElementById('compCardText').innerText = '';
          setTimeout(function () { alert(`You win with ${playerScore} points !`); }, 500);

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
        if (computerVal === player1Val) {
          computer.style.color = "white";
          player.style.color = "white";
          showWarDiv();
          document.querySelector('#warHeader').innerText = `War!!! Draw another card to see who wins!!`
          document.querySelector('#compcounter').innerText = `Computer Score: ${compScore}`;
          document.querySelector('#playercounter').innerText = `Player Score: ${playerScore}`;
          drawHide();
        } else if(computerVal > player1Val) {
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

function warDraw() {
  const url = `https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=4`;
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
      let computerVal = convertToNum(data.cards[0].value);
      let player1Val = convertToNum(data.cards[1].value);
      console.log(`Computer Val: ${computerVal}, Player Val: ${player1Val}`)
      if (data.remaining === 0) {
        document.querySelector('#compCard').src = data.cards[0].image
        comptext;
        playertext;
        document.querySelector('#playerCard').src = data.cards[1].image
        document.querySelector('#remaining').innerText = `Cards remaining: ${data.remaining}`
        document.querySelector('#compPile').src = 'https://www.deckofcardsapi.com/static/img/back.png';
        document.querySelector('#playerPile').src = 'https://www.deckofcardsapi.com/static/img/back.png';
        if (computerVal === player1Val) {
          computer.style.color = "white";
          player.style.color = "white";
          document.querySelector('#warHeader').innerText = `War!!! Draw another card to see who wins!!`
          document.querySelector('#compcounter').innerText = `Computer Score: ${compScore}`;
          document.querySelector('#playercounter').innerText = `Player Score: ${playerScore}`;
          showWarDiv();
          drawHide();
        } else if(computerVal > player1Val) {
          compScore += 6;
          computer.style.color = "yellow";
          player.style.color = "white";
          document.querySelector('#compcounter').innerText = `Computer Score: ${compScore}`;
          document.querySelector('#playercounter').innerText = `Player Score: ${playerScore}`;
          drawHide();
          showWarDiv();
        } else {
          playerScore += 6;
          computer.style.color = "white";
          player.style.color = "yellow";
          document.querySelector('#compcounter').innerText = `Computer Score: ${compScore}`;
          document.querySelector('#playercounter').innerText = `Player Score: ${playerScore}`;
          drawHide();
          showWarDiv();
        } 
        if (compScore > playerScore) {

          document.querySelector('#compcounter').innerText = `Computer Score: ${compScore}`;
          document.querySelector('#remaining').innerText = `Cards remaining: 0`
          document.getElementById('compCardText').innerText = '';
          document.getElementById('playerCardText').innerText = '';
          document.querySelector('#compCard').src = ""
          document.querySelector('#playerCard').src = ""
          computer.style.color = "green";
          player.style.color = "white";
          if (reset.style.display === "flex") {
            reset.style.display = "none";
          } else {
            reset.style.display = "flex";
          }
          setTimeout(function () { alert(`Computer Wins with ${compScore} points :/`); }, 500);


        } else {
          document.getElementById('compCardText').innerText = '';
          document.getElementById('playerCardText').innerText = '';
          document.querySelector('#playercounter').innerText = `Player Score: ${playerScore}`;
          document.querySelector('#remaining').innerText = `Cards remaining: 0`
          document.querySelector('#compCard').src = ""
          document.querySelector('#playerCard').src = ""
          computer.style.color = "white";
          player.style.color = "green";
          if (reset.style.display === "flex") {
            reset.style.display = "none";
          } else {
            reset.style.display = "flex";
          }
          setTimeout(function () { alert(`You win with ${playerScore} points !`); }, 500);

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
        if (computerVal === player1Val) {
          computer.style.color = "white";
          player.style.color = "white";
          showWarDiv();
          document.querySelector('#warHeader').innerText = `War!!! Draw another card to see who wins!!`
          document.querySelector('#compcounter').innerText = `Computer Score: ${compScore}`;
          document.querySelector('#playercounter').innerText = `Player Score: ${playerScore}`;
          drawHide();
        } else if(computerVal > player1Val) {
          compScore += 6;
          computer.style.color = "yellow";
          player.style.color = "white";
          document.querySelector('#compcounter').innerText = `Computer Score: ${compScore}`;
          document.querySelector('#playercounter').innerText = `Player Score: ${playerScore}`;
          document.querySelector('#compcounter').innerText = `Computer Score: ${compScore}`;
          document.querySelector('#warHeader').innerText = `Computer Wins War and 6 Cards!`
          warHeaderHide();
          drawHide();
          showWarDiv();
        } else {
          playerScore += 6;
          computer.style.color = "white";
          player.style.color = "yellow";
          document.querySelector('#compcounter').innerText = `Computer Score: ${compScore}`;
          document.querySelector('#playercounter').innerText = `Player Score: ${playerScore}`;
          document.querySelector('#warHeader').innerText = `Player Wins War and 6 Cards!`
          warHeaderHide();
          drawHide();
          showWarDiv();
        } 
      }



    })
    .catch(err => {
      console.log(`error ${err}`)
    });
}

function convertToNum(val){
  if (val === 'ACE') {
    return 14
  }else if (val === 'KING'){
    return 13
  }else if (val === 'QUEEN'){
    return 12
  }else if (val === 'JACK'){
    return 11
  }else {
    return Number(val)
  }
}

function drawHide() {
  let y = document.getElementById('drawcard');
  if (y.style.display === "none") {
    y.style.display = "flex";
  } else {
    y.style.display = "none";
  }
}

function warHeaderHide() {
  let y = document.getElementById('warHeader');
  if (y.style.display === "none") {
    y.style.display = "flex";
  } else {
    y.style.display = "none";
  }
}
