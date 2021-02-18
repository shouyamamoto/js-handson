const slideImageContainer = document.getElementById('slideImage__container')
const slideImageFrag = document.createDocumentFragment()
const nextArrow = document.getElementById('js-arrow__next')
const prevArrow = document.getElementById('js-arrow__prev')
const pagination = document.getElementById('js-pagination')
const slideImages = []
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

// fetchでデータを取得してきてからimgを生成する
function fetchImages() {
  return new Promise((reject) => {
    setTimeout(function() {
      reject(myFetch('slide.json'))
    }, 3000)
  })
}

async function createImg() {
  const data = await fetchImages()
  const images = data.images
  const imgFrag = document.createDocumentFragment()
  images.forEach(image => {
    const imgElement = document.createElement('img')
    imgElement.src = image.img_path
    imgElement.classList.add('slideImage')
    slideImages.push(imgElement)
    imgFrag.appendChild(imgElement)
  })
  slideImageContainer.appendChild(imgFrag)
  return slideImages
}

async function showSlide() {
  const slideImageList = await createImg()
  // HTMLコレクションの中をpageNumの引数に
  pageNum(slideImageList)

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
    
    if(isLast(currentNum)) {
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
}
showSlide()


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
  return currentNum === 0;
}

// 最後の要素かを判定する
function isLast(currentNum) { 
  return currentNum === slideImageList.length - 1;
}