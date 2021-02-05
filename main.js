'use strict';
const ul = document.querySelector('ul');
const fragment = document.createDocumentFragment();

const loading = document.createElement('img');
loading.src = 'loading-circle.gif';
loading.className = 'loading-circle';

const reqBtn = document.querySelector('#js-req-btn');
const modalBtn = document.querySelector('#js-modal-btn');
const mask = document.querySelector('#js-mask');

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

reqBtn.addEventListener('click', async () => {
  ul.appendChild(loading);
  modalBtn.remove();
  mask.remove();
  reqBtn.remove();

  // thenのreturnで新しいpromiseが返ってきているので、awaitで非同期処理を待つ
  const data = await fetchData();
  createElements(data);
});

async function fetchData() {
  try {
    const fetchResult = await fetch('https://jsondata.okiba.me/v1/json/9omPz210202144336')
    .then((response) => {
      // ここでawaitを使わず、thenを使うのは、response.json()の実行が非同期処理ではないから？
      // でもfetchからの処理をまってからthenは実行される。
      return response.json();
    });
    console.log(fetchResult.data);
    // thenの中でreturnした値が、fetchDataを実行したときに返却される値になる。（新しいpromiseを返す）
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