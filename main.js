'use strict';
const ul = document.querySelector('ul');
const items = [{to: "bookmark.html", img: "1.png", alt:"画像1", text: "ブックマーク"}, {to: "message.html", img: "2.png", alt:"画像2", text: "メッセージ"}];

const fragment = document.createDocumentFragment();
for(const item of items) {
  const li = document.createElement('li');
  const a = document.createElement('a');
  const img = document.createElement('img');
  const text = item.text;
  a.href = item.to;
  img.alt = item.alt;
  img.src = item.img;
  a.appendChild(img);
  a.insertAdjacentHTML('beforeend', text);
  li.appendChild(a);
  fragment.appendChild(li);
}
ul.appendChild(fragment);
