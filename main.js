'use strict';
const ul = document.querySelector('ul');
const fragment = document.createDocumentFragment();
const loading = document.createElement('img');
const reqBtn = document.querySelector('#js-req-btn');
const modalBtn = document.querySelector('#js-modal-btn');
const mask = document.querySelector('#js-mask');
const inputNum = document.querySelector('#js-input-num');
const inputArea = document.querySelector('#js-input-area');

// ローディング画像表示
loading.src = 'loading-circle.gif';
loading.className = 'loading-circle';

// モーダルを表示させる処理
modalBtn.addEventListener('click', () => {
  reqBtn.classList.add('active');
  inputArea.classList.add('active');
  inputNum.classList.add('active');
  mask.classList.add('active');
});

// リクエストボタンを押したあとの処理
reqBtn.addEventListener('click', async () => {
  console.log(inputNum.value);

  ul.appendChild(loading);
  modalBtn.remove();
  inputArea.remove();
  mask.remove();
  reqBtn.remove();

  const data = await fetchData();
  createElements(data);
});

mask.addEventListener('click', () => {
  reqBtn.classList.remove('active');
  inputArea.classList.remove('active');
  inputNum.classList.remove('active');
  mask.classList.remove('active');
});

async function fetchData() {
  try {
    const fetchResult = await fetch('https://jsondata.okiba.me/v1/json/9omPz210202144336')
    .then(response => {
      return response.json();
    });
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