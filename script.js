
const menuBtn = document.querySelector('.menu-btn');
const fullScreenNav = document.querySelector('.full-screen-nav');

let poems = [];
let currentIndex = 0;

const poemContainer = document.querySelector('.poem-container');
const prevBtn = document.querySelector('.nav-btn--prev');
const nextBtn = document.querySelector('.nav-btn--next');


function fetchPoems() {
  fetch('./poems.json')
    .then(response => response.json())
    .then(data => {
      poems = data;
      displayPoem(); // Display the initial poem
    })
    .catch(error => console.error('Error:', error));
}

function displayPoem() {
  const poem = poems[currentIndex];
  poemContainer.innerHTML = `<pre class="poem">${poem.content}</pre>`;
}

function slideOut(direction, callback) {
  const oldPoem = document.querySelector('.poem');
  const slideOutClass = direction === 'next' ? 'slide-out-left' : 'slide-out-right';
  oldPoem.classList.add(slideOutClass);

  oldPoem.addEventListener('animationend', () => {
    oldPoem.remove();
    callback(); // Slide in the new poem after the old one slides out
  }, { once: true });
}

function changePoem(newIndex, direction) {
  currentIndex = newIndex;
  slideOut(direction, () => {
    displayPoem();
    const newPoem = document.querySelector('.poem');
    const slideInClass = direction === 'next' ? 'slide-in-right' : 'slide-in-left';
    newPoem.classList.add(slideInClass);
  });
}

prevBtn.addEventListener('click', () => {
  const newIndex = (currentIndex - 1 + poems.length) % poems.length;
  changePoem(newIndex, 'prev');
});

nextBtn.addEventListener('click', () => {
  const newIndex = (currentIndex + 1) % poems.length;
  changePoem(newIndex, 'next');
});

document.addEventListener('DOMContentLoaded', fetchPoems);


menuBtn.addEventListener('click', () => {
  menuBtn.classList.toggle('open');
  fullScreenNav.classList.toggle('open');
});

document.addEventListener('DOMContentLoaded', fetchPoems);
