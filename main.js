const body = document.querySelector('body')
const tabs = document.querySelector('ul')
tabs.classList.add('tab')

const contentsWrap = document.createElement('div')
const newsContents = document.createElement('div')
const economyContents = document.createElement('div')
const entertainmentContents = document.createElement('div')
const sportsContents = document.createElement('div')
const japanContents = document.createElement('div')

const newsContentsInner = document.createElement('div')
const economyContentsInner = document.createElement('div')
const entertainmentContentsInner = document.createElement('div')
const sportsContentsInner = document.createElement('div')
const japanContentsInner = document.createElement('div')

const newsTitleWrap = document.createElement('ul')
const economyTitleWrap = document.createElement('ul')
const entertainmentTitleWrap = document.createElement('ul')
const sportsTitleWrap = document.createElement('ul')
const japanTitleWrap = document.createElement('ul')

const contents = [newsContents, economyContents, entertainmentContents, sportsContents, japanContents]
const contentsInners = [newsContentsInner, economyContentsInner, entertainmentContentsInner, sportsContentsInner, japanContentsInner]
const titleWraps = [newsTitleWrap, economyTitleWrap, entertainmentTitleWrap, sportsTitleWrap, japanTitleWrap]

contentsWrap.classList.add('contentWrap')

for(let i = 0; i < contents.length; i++) {
  contentsWrap.appendChild(contents[i])
  contents[i].classList.add('content')
  contentsInners[i].classList.add('content__inner')
  titleWraps[i].classList.add('titleWrap')
  body.appendChild(contentsWrap)
}

async function fetchArticleData () {
  try {
    const articleData = await fetch('https://jsondata.okiba.me/v1/json/BPyzv210207140601')
    .then(response => {
      const json =  response.json()
      return json
    })
    .then(json => {
      const articles = json.articleList
      const categoryNames = new Set()
      const imgSources = new Set()
      const articleData = new Set()
      for(article of articles) {
        const categoryName = article.category
        const imgSrc = article.img
        const articles = article.articleInfo
        categoryNames.add(categoryName)
        imgSources.add(imgSrc)
        articleData.add(articles)
      }
      return {
        categoryNames, imgSources, articleData, articles
      }
    })
    return articleData
  } catch(e) {
    console.log('ぶっこわれてます')
  } finally {
    console.log('fetchData run')
  }
}

async function createElement () {
  const articleData = await fetchArticleData()

  // tabの生成
  for(const categoryName of articleData.categoryNames) {
    const tab = document.createElement('li')
    tab.classList.add('tab__item')
    tab.textContent = categoryName
    tabs.appendChild(tab)
  }
  // タイトルの生成
  for(const articleArray of articleData.articleData) {
    for(const article of articleArray) {
      const title = document.createElement('li')
      const titleLink = document.createElement('a')
      titleLink.href = "#"
      titleLink.textContent = article.title
      title.appendChild(titleLink)
      title.classList.add('title')

      if(article.category === 'ニュース') {
        newsTitleWrap.appendChild(title)
        newsContentsInner.appendChild(newsTitleWrap)
        newsContents.appendChild(newsContentsInner)
        newsContents.classList.add('active')
      } else if(article.category === '経済') {
        economyTitleWrap.appendChild(title)
        economyContentsInner.appendChild(economyTitleWrap)
        economyContents.appendChild(economyContentsInner)
      } else if(article.category === 'エンタメ') {
        entertainmentTitleWrap.appendChild(title)
        entertainmentContentsInner.appendChild(entertainmentTitleWrap)
        entertainmentContents.appendChild(entertainmentContentsInner)
      } else if(article.category === 'スポーツ') {
        sportsTitleWrap.appendChild(title)
        sportsContentsInner.appendChild(sportsTitleWrap)
        sportsContents.appendChild(sportsContentsInner)
      } else if(article.category === '国内') {
        japanTitleWrap.appendChild(title)
        japanContentsInner.appendChild(japanTitleWrap)
        japanContents.appendChild(japanContentsInner)
      } 
    }
  }

  // 画像の生成
  for(const imgSrc of articleData.imgSources) {
    const img = document.createElement('img')
    img.src = imgSrc
    img.classList.add('img')

    if(imgSrc === 'img/news-image.png') {
      newsContentsInner.appendChild(img)
    } else if(imgSrc === 'img/economy-image.png') {
      economyContentsInner.appendChild(img)
    } else if(imgSrc === 'img/entertainment-image.png') {
      entertainmentContentsInner.appendChild(img)
    } else if(imgSrc === 'img/sports-image.png') {
      sportsContentsInner.appendChild(img)
    } else if(imgSrc === 'img/japan-image.png') {
      japanContentsInner.appendChild(img)
    }
  }
}

createElement()