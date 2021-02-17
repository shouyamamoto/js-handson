const slideImageContainer = document.getElementById('slideImage__container')
const frag = document.createDocumentFragment()
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
  const response = await fetch(url)
  const json = await response.json()
  return json
}

// fetchでデータを取得してきてからimgを生成する
function fetchSlideCreate() {
  return new Promise((reject) => {
    setTimeout(function() {
      reject(myFetch('slide.json'))
    }, 3000)
  })
  .then(data => {
    data.forEach( img => {
      const imgElement = document.createElement('img')
      imgElement.src = img.src
      imgElement.classList.add('slideImage')
      frag.appendChild(imgElement)
    })
    return frag
  })
  .then( frag => {
    // imgを生成してからslideImageContainerに追加
    slideImageContainer.appendChild(frag)
    // slideImagesに追加して戻り値として返す
    slideImages.push(slideImageContainer.children)
    return slideImages
  })
}

async function showSlide() {
  const slideImageList = await fetchSlideCreate() // 返ってくるのはHTMLコレクション
  // HTMLコレクションの中をpageNumの引数に
  pageNum(slideImageList[0])

  // 初めのスライドの要素にactiveクラスをつける
  slideImageList[0][0].classList.add('active')

  // currentNumの値を確認してdisabledクラスをつける
  checkInitCurrent()
  
  // arrowにactiveクラスをつける 
  nextArrow.classList.add('active')
  prevArrow.classList.add('active')

  // クリックイベント
  nextArrow.addEventListener('click', () => {
    changeImage(1, slideImageList);
    prevArrow.classList.remove('disabled')
  
    if(currentNum === slideImageList[0].length - 1) {
      nextArrow.classList.add('disabled')
    }
  })
  
  prevArrow.addEventListener('click', () => {
    changeImage(-1, slideImageList);
    nextArrow.classList.remove('disabled')
  
    if(currentNum === 0) {
      prevArrow.classList.add('disabled')
    }
  })
  // クリックイベントここまで
}
showSlide()


// 現在のスライドの枚数
function pageNum(target) {
  pagination.textContent = `${currentNum + 1} / ${target.length}`
}

function changeImage(num, target) {
  if(currentNum + num >= 0 && currentNum + num < target[0].length) {
    currentNum += num;

    //　スプレット演算子を使って、HTMLコレクションを配列に直してforEachを使う
    [...target[0]].forEach(image => {
      image.classList.remove('active');
    })
    target[0][currentNum].classList.add('active');

    pageNum(target[0]);
  }
}



