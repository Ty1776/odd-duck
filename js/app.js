'use strict';

// console.log('Am I alive?');

// * GLOBALS

let voteCount = 25;
let productArray = [];

// * DOM REFERENCES

let imageContainer = document.getElementById('img-container');
let imgOne = document.getElementById('img-one');
let imgTwo = document.getElementById('img-two');
let imgThree = document.getElementById('img-three');
let resultsBtn = document.getElementById('show-results-btn');
let resultsContainer = document.getElementById('results-container');

// * HELPER/UTILITY FUNCITONS

function randomIndex() {
  return Math.floor(Math.random() * productArray.length);
}

function renderImages() {
  let imgOneRandom = randomIndex();
  let imgTwoRandom = randomIndex();
  let imgThreeRandom = randomIndex();

  while (imgOneRandom === imgTwoRandom) {
    imgTwoRandom = randomIndex();
  }
  while (imgTwoRandom === imgThreeRandom) {
    imgThreeRandom = randomIndex();
  }
  while (imgThreeRandom === imgOneRandom) {
    imgOneRandom = randomIndex();
  }

  imgOne.src = productArray[imgOneRandom].imagePath;
  imgTwo.src = productArray[imgTwoRandom].imagePath;
  imgThree.src = productArray[imgThreeRandom].imagePath;

  imgOne.alt = productArray[imgOneRandom].name;
  imgTwo.alt = productArray[imgTwoRandom].name;
  imgThree.alt = productArray[imgThreeRandom].name;

  productArray[imgOneRandom].views++;
  productArray[imgTwoRandom].views++;
  productArray[imgThreeRandom].views++;
}

// * EVENT HANDLERS

function handleShowResults() {
  if (voteCount === 0) {
    for (let i = 0; i < productArray.length; i++) {
      let liElem = document.createElement('li');
      liElem.textContent = `${productArray[i].name} had ${productArray[i].clicks} votes, and was seen ${productArray[i].views} times.`;
      resultsContainer.appendChild(liElem);
    }
    resultsBtn.removeEventListener('click', handleShowResults);
  }
}

function handleImageClick() {
  // console.dir(event.target);

  let prodClicked = event.target.alt;

  for (let i = 0; i < productArray.length; i++) {
    if (productArray[i].name === prodClicked) {
      productArray[i].clicks++;
    }
  }
  voteCount--;

  // * RENDER NEW IMAGES
  renderImages();

  // * AFTER 25 VOTES STOP LISTENING FOR CLICKS
  if (voteCount === 0) {
    imageContainer.removeEventListener('click', handleImageClick);
  }

}

// * CONSTRUCTOR

function Products(name, fileExtension = 'jpg') {
  this.name = name;
  this.imagePath = `img/${name}.${fileExtension}`;
  this.clicks = 0;
  this.views = 0;
}

// * EXECUTABLE

let bag = new Products('bag');
let banana = new Products('banana');
let bathroom = new Products('bathroom');
let boots = new Products('boots');
let breakfast = new Products('breakfast');
let bubblegum = new Products('bubblegum');
let chair = new Products('chair');
let cthulhu = new Products('cthulhu');
let dog = new Products('dog-duck');
let dragon = new Products('dragon');
let pen = new Products('pen');
let pet = new Products('pet-sweep');
let scissors = new Products('scissors');
let shark = new Products('shark');
let sweep = new Products('sweep', 'png');
let tauntaun = new Products('tauntaun');
let unicorn = new Products('unicorn');
let water = new Products('water-can');
let wine = new Products('wine-glass');

productArray.push(bag, banana, bathroom, boots, breakfast, bubblegum, chair, cthulhu, dog, dragon, pen, pet, scissors, shark, sweep, tauntaun, unicorn, water, wine);

renderImages();

imageContainer.addEventListener('click', handleImageClick);
resultsBtn.addEventListener('click', handleShowResults);
