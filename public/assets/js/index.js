const dogs = [
  {
    breed: 'border-collie',
    age: 'puppy',
    avatarUrl: 'assets/images/border-collie-puppy.jpg',
    alt: 'Border Collie puppy',
    caption: 'Border Collie',
  },
  {
    breed: 'border-collie',
    age: 'adult',
    avatarUrl: 'assets/images/border-collie-adult.jpg',
    alt: 'Border Collie adult',
    caption: 'Border Collie',
  },
  {
    breed: 'german-shepherd',
    age: 'puppy',
    avatarUrl: 'assets/images/german-shepherd-puppy.jpg',
    alt: 'German Shepherd puppy',
    caption: 'German Shepherd',
  },
  {
    breed: 'german-shepherd',
    age: 'adult',
    avatarUrl: 'assets/images/german-shepherd-adult.jpg',
    alt: 'German Shepherd adult',
    caption: 'German Shepherd',
  },
  {
    breed: 'dachshund',
    age: 'puppy',
    avatarUrl: 'assets/images/dachshund-puppy.jpg',
    alt: 'Dachshund puppy',
    caption: 'Dachshund',
  },
  {
    breed: 'dachshund',
    age: 'adult',
    avatarUrl: 'assets/images/dachshund-adult.jpg',
    alt: 'Dachshund adult',
    caption: 'Dachshund',
  },
  {
    breed: 'beagle',
    age: 'puppy',
    avatarUrl: 'assets/images/beagle-puppy.jpg',
    alt: 'Beagle puppy',
    caption: 'Beagle',
  },
  {
    breed: 'beagle',
    age: 'adult',
    avatarUrl: 'assets/images/beagle-adult.jpg',
    alt: 'Beagle adult',
    caption: 'Beagle',
  },
  {
    breed: 'golden-retriever',
    age: 'puppy',
    avatarUrl: 'assets/images/golden-retriever-puppy.jpg',
    alt: 'Golden Retriever puppy',
    caption: 'Golden Retriever',
  },
  {
    breed: 'golden-retriever',
    age: 'adult',
    avatarUrl: 'assets/images/golden-retriever-adult.jpg',
    alt: 'Golden Retriever adult',
    caption: 'Golden Retriever',
  },
  {
    breed: 'yorkshire-terrier',
    age: 'puppy',
    avatarUrl: 'assets/images/yorkshire-terrier-puppy.jpg',
    alt: 'Yorkshire Terrier puppy',
    caption: 'Yorkshire Terrier',
  },
  {
    breed: 'yorkshire-terrier',
    age: 'adult',
    avatarUrl: 'assets/images/yorkshire-terrier-adult.jpg',
    alt: 'Yorkshire Terrier adult',
    caption: 'Yorkshire Terrier',
  },
];

function Card({ src, alt, caption, breed }) {
  const container = document.createElement('div');
  const card = document.createElement('div');
  const front = document.createElement('div');
  const back = document.createElement('div');
  const img = document.createElement('img');
  const imgCaption = document.createElement('div');
  const imgBack = document.createElement('img');
  container.classList.add('card');
  container.classList.add('flipped');
  card.classList.add('surface');
  front.classList.add('front');
  back.classList.add('back');
  imgCaption.classList.add('caption');
  container.appendChild(card);
  card.appendChild(front);
  card.appendChild(back);
  front.appendChild(img);
  front.appendChild(imgCaption);
  imgCaption.appendChild(document.createTextNode(caption.toUpperCase()));
  back.appendChild(imgBack);
  img.src = src;
  img.alt = alt;
  imgBack.src = 'assets/images/dog-paw-print.svg';
  imgBack.alt = 'Dog paw print';

  function flip() {
    container.classList.toggle('flipped');
  }

  function isShown() {
    return !container.classList.contains('flipped');
  }

  return { element: container, flip, isShown, breed };
}

function App({ data }) {
  const board = document.createElement('div');
  board.classList.add('board');
  const listOfCards = data.map(function({ avatarUrl, alt, caption, breed }) {
    return Card({
      src: avatarUrl,
      alt,
      caption,
      breed,
    });
  });
  let shouldUpdateBoard = false;
  listOfCards.forEach(renderCard);

  function renderCard(card) {
    let shouldFlipCard = true;
    const cardArea = document.createElement('div');
    cardArea.classList.add('card-area');
    cardArea.appendChild(card.element);
    board.appendChild(cardArea);
    arrangeEventListeners();

    function cancelCardFlipping() {
      shouldFlipCard = false;
    }

    function enableCardFlipping() {
      shouldFlipCard = true;
    }

    function handleCardClick() {
      if (shouldFlipCard && !card.isShown()) {
        handleBoardUpdate();
        card.flip();
      }
    }

    function isTouchDevice() {
      return 'ontouchstart' in window;
    }

    function arrangeMobileEventListeners() {
      card.element.addEventListener('touchstart', enableCardFlipping);
      card.element.addEventListener('touchcancel', cancelCardFlipping);
      card.element.addEventListener('touchmove', cancelCardFlipping);
      card.element.addEventListener('touchend', handleCardClick);
    }

    function arrangeEventListeners() {
      if (isTouchDevice()) arrangeMobileEventListeners();
      else card.element.addEventListener('click', handleCardClick);
    }
  }

  function handleBoardUpdate() {
    if (shouldUpdateBoard = !shouldUpdateBoard) updateBoard();
  }

  function updateBoard() {
    const toFlipMap = {};
    listOfCards.forEach(function(card) {
      if (card.isShown()) {
        if (!toFlipMap[card.breed]) toFlipMap[card.breed] = card;
        else delete toFlipMap[card.breed];
      }
    });
    for (breed in toFlipMap) {
      toFlipMap[breed].flip();
    }
  }

  return board;
}

function render(component, element) {
  while (element.firstChild) {
    element.removeChild(element.lastChild);
  }
  element.appendChild(component);
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let x = array[i];
    array[i] = array[j];
    array[j] = x;
  }
}

window.onload = function() {
  shuffle(dogs);
  render(App({ data: dogs }), document.getElementById('app'));
}
