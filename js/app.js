'use strict';

// console.log('Am I alive?');

// * GLOBALS

let voteCount = 25;
let productArray = [];
let myChart = null;

// * DOM REFERENCES

let imageContainer = document.getElementById('img-container');
let imgOne = document.getElementById('img-one');
let imgTwo = document.getElementById('img-two');
let imgThree = document.getElementById('img-three');
let resultsBtn = document.getElementById('show-results-btn');

// * HELPER/UTILITY FUNCITONS

function randomIndex() {
  return Math.floor(Math.random() * productArray.length);
}

let picArray = [];
function uniqueImageChecker() {
  let imageArray = [];
  while (imageArray.length < 3) {
    let randomImage = randomIndex();
    if (imageArray.includes(randomImage) || picArray.includes(randomImage)) {
      // do nothing
    }
    else {
      imageArray.push(randomImage);
    }
  }
  picArray = imageArray;
  return (imageArray);
}

function renderImages() {
  let imageChecker = uniqueImageChecker();
  let imgOneRandom = productArray[imageChecker[0]];
  let imgTwoRandom = productArray[imageChecker[1]];
  let imgThreeRandom = productArray[imageChecker[2]];

  imgOne.src = imgOneRandom.imagePath;
  imgTwo.src = imgTwoRandom.imagePath;
  imgThree.src = imgThreeRandom.imagePath;

  imgOne.alt = imgOneRandom.name;
  imgTwo.alt = imgTwoRandom.name;
  imgThree.alt = imgThreeRandom.name;

  imgOneRandom.views++;
  imgTwoRandom.views++;
  imgThreeRandom.views++;
}

// * EVENT HANDLERS

function handleShowResults() {
  let chartContext = document.getElementById('my-chart').getContext('2d');
  if (voteCount === 0) {

    let prodNames = [];
    let prodViews = [];
    let prodClicks = [];
    for (let i = 0; i < productArray.length; i++) {
      prodNames.push(productArray[i].name);
      prodViews.push(productArray[i].views);
      prodClicks.push(productArray[i].clicks);
    }

    let chartConfig = {
      type: 'bar',
      data: {
        labels: prodNames,
        barThickness: 'flex',
        datasets: [{
          label: '# of Views',
          data: prodViews,
          backgroundColor: 'red',
          borderColor: 'red',
          borderWidth: 1,
        }, {
          label: '# of Clicks',
          data: prodClicks,
          backgroundColor: 'green',
          borderColor: 'green',
          borderWidth: 1,
        }],
        borderWidth: 1
      },
      options: {
        legend: {
          display: false,
        },
        scales: {
          x: {
            beginAtZero: true,
          },
          y: {
            beginAtZero: true,
          },
          gridLines: {
            display: false,
          },
        }
      },
    };

    myChart = new Chart(chartContext, chartConfig);
    resultsBtn.removeEventListener('click', handleShowResults);
  }
}

function handleImageClick() {

  let prodClicked = event.target.alt;

  for (let i = 0; i < productArray.length; i++) {
    if (productArray[i].name === prodClicked) {
      productArray[i].clicks++;

      voteCount--;

      // * RENDER NEW IMAGES
      renderImages();
    }
  }

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

let prodNames = [];

for (let i = 0; i < productArray.length; i++) {
  prodNames.push(productArray[i].name);
}

renderImages();

imageContainer.addEventListener('click', handleImageClick);
resultsBtn.addEventListener('click', handleShowResults);
