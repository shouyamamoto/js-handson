'use strict';
const ul = document.querySelector('ul');
const fragment = document.createDocumentFragment();

const loading = document.createElement('img');
loading.src = 'loading-circle.gif';
loading.className = 'loading-circle';

const btn = document.querySelector('.btn');
btn.addEventListener('click', function() {
  ul.appendChild(loading);
  btn.remove();

  fetchData().then(data => {
    loadingIconRemove();
    createElements(data);
  });
});

async function fetchData() {
  try {
    const fetchResult = await fetch('https://jsondata.okiba.me/v1/json/9omPz210202144336')
    // このawaitを使った書き方と、thenを使った書き方の違いが分からないです。
    // const json = await fetchResult.json();
    // return json.data;
    .then((response) => {
      return response.json();
    })
    return fetchResult.data;
  } catch(e) {
    console.error(e);
  } finally {
    console.log('fetchData run');
  }
}

function loadingIconRemove() {
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