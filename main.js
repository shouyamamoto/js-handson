'use strict';
const ul = document.querySelector('ul');
const fragment = document.createDocumentFragment();
const loading = document.createElement('img');
const reqBtn = document.querySelector('.req-btn');
const modalBtn = document.querySelector('.modal-btn');
const mask = document.querySelector('.mask');
const inputNum = document.querySelector('.input-num');
const inputArea = document.querySelector('.input-area');

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
reqBtn.addEventListener('click', () => {
  console.log(inputNum.value);
  ul.appendChild(loading);
  setTimeout(fetchData, 3000);

  modalBtn.remove();
  inputArea.remove();
  mask.remove();
  reqBtn.remove();
});

mask.addEventListener('click', () => {
  reqBtn.classList.remove('active');
  inputArea.classList.remove('active');
  inputNum.classList.remove('active');
  mask.classList.remove('active');
});

async function fetchData() {
  try {
    const response = await fetch('https://jsondata.okiba.me/v1/json/9omPz210202144336');
    const json = await response.json();
    loading.remove();
    createElements(json.data);
  } catch(e) {
    console.error(e);
  } finally {
    console.log('fetchData run');
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