'use strict';
const ul = document.querySelector('ul');
const fragment = document.createDocumentFragment();

const loading = document.createElement('img');
loading.src = 'loading-circle.gif';
loading.className = 'loading-circle';
ul.appendChild(loading);

// const p = function() {
//   return new Promise(function(resolve, reject) {
//   setTimeout(function() {
//     resolve([{to: "bookmark.html", img: "1.png", alt:"画像1", text: "ブックマーク"}, {to: "message.html", img: "2.png", alt:"画像2", text: "メッセージ"}])
//   }, 3000);
// });
// }

(async function() {
  try {
    const response = await fetch('https://jsondata.okiba.me/v1/json/9omPz210202144336');
    const json = await response.json();
    const data = await json.data;
    return data;
  }catch(e) {
    console.error(e);
  }finally {
    setTimeout(removeLoadingIcon, 3000);
  }
})().then(function(data) {
  setTimeout(createElements.bind(null, data), 3000);
});

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