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

function Card({ src, alt, caption }) {
  const container = document.createElement('div');
  const card = document.createElement('div');
  const front = document.createElement('div');
  const back = document.createElement('div');
  const img = document.createElement('img');
  const imgCaption = document.createElement('div');
  container.classList.add('card');
  card.classList.add('surface');
  card.classList.add('flipped');
  front.classList.add('front');
  back.classList.add('back');
  imgCaption.classList.add('caption');
  container.appendChild(card);
  card.appendChild(front);
  card.appendChild(back);
  front.appendChild(img);
  front.appendChild(imgCaption);
  img.src = src;
  img.alt = alt;
  imgCaption.appendChild(document.createTextNode(caption.toUpperCase()));

  function flipCard() {
    card.classList.toggle('flipped');
  }

  return { card: container, flipCard };
}

function App({ data }) {
  const container = document.createElement('div');
  container.classList.add('board');
  data.forEach(function({ avatarUrl, alt, caption }) {
    const cardArea = document.createElement('div');
    const { card, flipCard } = Card({
      src: avatarUrl,
      alt,
      caption,
    });
    cardArea.classList.add('card-area');
    cardArea.appendChild(card);
    container.appendChild(cardArea);
    card.addEventListener('click', function() { flipCard(); });
  });
  return container;
}

function render(component, element) {
  while (element.firstChild) {
    element.removeChild(element.lastChild);
  }
  element.appendChild(component);
} 

window.onload = function() {
  render(App({ data: dogs }), document.getElementById('app'));
}
