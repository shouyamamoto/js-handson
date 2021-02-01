'use strict';

const ul = document.querySelector('ul');
const li = document.createElement('li');
const img = document.createElement('img');
const a = document.createElement('a');
a.href = '1.html';
img.src = 'bookmark.png';
img.alt = 'ブックマーク';


ul.appendChild(li);
li.appendChild(a);
a.appendChild(img);
a.insertAdjacentHTML('beforeend', 'これです');

