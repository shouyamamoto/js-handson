'use strict';
const ul = document.querySelector('ul');
const fragment = document.createDocumentFragment();

const loading = document.createElement('img');
loading.src = 'loading-circle.gif';
loading.className = 'loading-circle';

const reqBtn = document.querySelector('.req-btn');
const modalBtn = document.querySelector('.modal-btn');
const mask = document.querySelector('.mask');

mask.addEventListener('click', () => {
  if(mask.classList.contains('active')) {
    mask.classList.remove('active');
    reqBtn.classList.remove('active');
  }
});

modalBtn.addEventListener('click', () => {
  reqBtn.classList.toggle('active');
  mask.classList.toggle('active');
});

reqBtn.addEventListener('click', () => {
  ul.appendChild(loading);
  outputFn();

  modalBtn.remove();
  mask.remove();
  reqBtn.remove();
});

async function outputFn() {
  try {
    const response = await fetch('https://jsondata.okiba.me/v1/json/9omPz210202144336');
    const json = await response.json();
    const data = await json.data;
    setTimeout(createElements.bind(null, data) ,3000);
  }catch(e) {
    console.error(e);
  }finally {
    setTimeout(removeLoadingIcon, 3000);
  }
}

function removeLoadingIcon() {
  loading.remove();
}

function createElements(items) {
  for(const item of items) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    const img = document.createElement('img');
    const text = item.text;
    a.href = item.to;
    img.alt = item.alt;
    img.src = item.img;
    a.insertAdjacentHTML('beforeend', text);
    a.appendChild(img);
    li.appendChild(a);
    fragment.appendChild(li);
  }
  ul.appendChild(fragment);
}