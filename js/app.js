'use strict';

// console.log('Am I alive?');

// * GLOBALS

let voteCount = 5;
let productArray = [];
let myChart = null;

// * DOM REFERENCES

let imageContainer = document.getElementById('img-container');
let imgOne = document.getElementById('img-one');
let imgTwo = document.getElementById('img-two');
let imgThree = document.getElementById('img-three');
let resultsBtn = document.getElementById('show-results-btn');
// let resultsContainer = document.getElementById('results-container');

// let chartContext = document.getElementById('my-chart').getContext('2d');

// * HELPER/UTILITY FUNCITONS

function randomIndex() {
  return Math.floor(Math.random() * productArray.length);
}

// let picArray = [];

function renderImages() {
  let imgOneRandom = randomIndex();
  let imgTwoRandom = randomIndex();
  let imgThreeRandom = randomIndex();

  // while (picArray.length < 3);
  // let randomPic = randomIndex();
  // if (!picArray.includes(randomPic)) {
  //   picArray.push(randomIndex);
  // }

  // let imgOneRandom = picArray.shift();
  // let imgTwoRandom = picArray.shift();
  // let imgThreeRandom = picArray.shift();

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
    console.log(prodClicks, prodNames, prodViews);

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
          // x: [{
          //   ticks: {
          //     stepSize: 1,
          //   },
          gridLines: {
            display: false,
          },
        }
      },
    };

    myChart = new Chart(chartContext, chartConfig);
    resultsBtn.removeEventListener('click', handleShowResults);
    // myChart();
  }
}

function handleImageClick() {
  // console.dir(event.target);

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
