'use strict';
const ul = document.querySelector('ul');

const texts = ['a1', 'a2'];
const hrefs = ['a1.html', 'a2.html'];
const srcs = ['/img/bookmark.png', '/img/bookmark.png'];

const fragment = document.createDocumentFragment();

for(let i = 0; i < texts.length; i++) {
  const li = document.createElement('li');
  const a = document.createElement('a');
  const img = document.createElement('img');
  const text = texts[i];
  a.href = hrefs[i];
  img.src = srcs[i];
  a.appendChild(img);
  a.insertAdjacentHTML('beforeend', text);
  li.appendChild(a);
  fragment.appendChild(li);
}
ul.appendChild(fragment);

