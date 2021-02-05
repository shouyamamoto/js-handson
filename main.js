'use strict';
const ul = document.querySelector('ul');
const fragment = document.createDocumentFragment();

const loading = document.createElement('img');
loading.src = 'loading-circle.gif';
loading.className = 'loading-circle';

const btn = document.querySelector('.btn');
btn.addEventListener('click', async function() {
  ul.appendChild(loading);
  btn.remove();

  const data = await fetchData();
  createElements(data);
});

async function fetchData() {
  try {
    const fetchResult = await fetch('https://jsondata.okiba.me/v1/json/9omPz210202144336')
    .then((response) => {
      return response.json();
    })
    return fetchResult.data;
  } catch(e) {
    console.error(e);
  } finally {
    loading.remove();
  }
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