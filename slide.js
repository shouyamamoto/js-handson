const slideImageContainer = document.getElementById('slideImage__container')
const slideImageFrag = document.createDocumentFragment()
const nextArrow = document.getElementById('js-arrow__next')
const prevArrow = document.getElementById('js-arrow__prev')
const pagination = document.getElementById('js-pagination')
const slideImages = []
const imgFrag = document.createDocumentFragment()
let currentNum = 0

// 初期状態からprevArrowはdisabledにしておく用の関数
function checkInitCurrent() {
  if(currentNum === 0) {
    prevArrow.classList.add('disabled')
  }
}

// fetchでjsonデータを取得してくる用の関数
async function myFetch(url) {
  try {
    const response = await fetch(url)
    const json = await response.json()
    return json
  } catch {
    console.error('データを取得できませんでした。')
  } finally {
    console.log('myFetch run')
  }
}


function fetchImages() {
  return new Promise((resolve) => {
    setTimeout(function() {
      resolve(myFetch('slide.json'))
    }, 3000)
  })
}

async function createImg() {
  try {
    const data = await fetchImages()
    const images = data.images
    createImgDom(images)
  } catch(e) {
    console.error(e);
  }
  return slideImages
}

function createImgDom(images) {
  // fetchで取得してきた要素を使って、domを作る
  images.forEach(image => {
    const imgElement = document.createElement('img')
    imgElement.src = image.img_path
    imgElement.classList.add('slideImage')
    slideImages.push(imgElement)
    imgFrag.appendChild(imgElement)
  })
  // fragをulに追加
  slideImageContainer.appendChild(imgFrag)
}

async function showSlide() {
  try {
    const slideImageList = await createImg()
    createSlide(slideImageList)
  } catch(e) {
    console.error(e);
  }
}
showSlide()

function createSlide(slideImageList) {
  // 初めのスライドの要素にactiveクラスをつける
  slideImageList[0].classList.add('active')

  // currentNumの値を確認してdisabledクラスをつける
  checkInitCurrent()
  
  // arrowにactiveクラスをつける 
  nextArrow.classList.add('active')
  prevArrow.classList.add('active')

  // クリックイベント
  nextArrow.addEventListener('click', () => {
    changeImage(1, slideImageList);
    prevArrow.classList.remove('disabled')
    
    if(isLast(currentNum, slideImageList)) {
      nextArrow.classList.add('disabled')
    }
  })
  
  prevArrow.addEventListener('click', () => {
    changeImage(-1, slideImageList);
    nextArrow.classList.remove('disabled')

    if(isFirst(currentNum)) {
      prevArrow.classList.add('disabled')
    }
  })

  pageNum(slideImageList)
}


// 現在のスライドの枚数
function pageNum(target) {
  pagination.textContent = `${currentNum + 1} / ${target.length}`
}

// 画像切り替え
function changeImage(num, target) {
  if(currentNum + num >= 0 && currentNum + num < target.length) {
    target[currentNum].classList.remove('active')
    currentNum += num
    target[currentNum].classList.add('active')

    pageNum(target);
  }
}

// 最初の要素かを判定する
function isFirst(currentNum) { 
  return currentNum === 0
}

// 最後の要素かを判定する
function isLast(currentNum, slideImageList) { 
  return currentNum === slideImageList.length - 1
}

