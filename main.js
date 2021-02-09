const today = new Date('2021/2/9')

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
newsContents.id = "news"
economyContents.id = "economy"
entertainmentContents.id = "entertainment"
sportsContents.id = "sports"
japanContents.id = "japan"

for(let i = 0; i < contents.length; i++) {
  contentsWrap.appendChild(contents[i])
  contents[i].classList.add('content')
  contentsInners[i].classList.add('content__inner')
  titleWraps[i].classList.add('titleWrap')
  body.appendChild(contentsWrap)
}




async function fetchArticleData () {
  try {
    const articleData = await fetch('https://jsondata.okiba.me/v1/json/WCTTJ210208232654')
    .then(response => {
      const json =  response.json()
      return json
    })
    return articleData.articleList
  } catch(e) {
    alert('ぶっこわれてます')
  } finally {
    console.log('fetchData run')
  }
}

async function createElement () {
  const articleList = await fetchArticleData()
  const tab_list = new Set()

  for(const article of articleList) {
    // タブの生成
    const tab = document.createElement('li')
    tab.textContent = article.category
    tab.classList.add('tab__item')
    tabs.appendChild(tab)
    tab_list.add(tab)

    // どのタブを初期表示にするか
    if(article.firstView === 'true') {
      tab.classList.add('active')
    }

    if(article.category === 'ニュース') {
      tab.dataset.id = 'news'
    } else if(article.category === '経済') {
      tab.dataset.id = 'economy'
    } else if(article.category === 'エンタメ') {
      tab.dataset.id = 'entertainment'
    } else if(article.category === 'スポーツ') {
      tab.dataset.id = 'sports'
    } else if(article.category === '国内') {
      tab.dataset.id = 'japan'
    }

    if(article.category === 'ニュース' && article.firstView === 'true') {
      newsContents.classList.add('active')
    } else if(article.category === '経済') {
      economyContents.classList.add('active')
    } else if(article.category === 'エンタメ') {
      entertainmentContents.classList.add('active')
    } else if(article.category === 'スポーツ') {
      sportsContents.classList.add('active')
    } else if(article.category === '国内') {
      japanContents.classList.add('active')
    }
    // タブの生成ここまで

    // タイトルの生成
    for(const info of article.articleInfo) {
      const title = document.createElement('li')
      const title_link = document.createElement('a')
      const comment = document.createElement('span')
      const comment_icon = document.createElement('img')
      title.classList.add('title')
      comment.classList.add('comment')
      title_link.innerHTML = info.title
      comment_icon.src = 'img/comment.png'
      comment_icon.classList.add('comment_icon')

      title_link.appendChild(comment)
      title.appendChild(title_link)

      // 投稿日と2021/2/9との日差を取得
      const postDay = new Date(info.postDay)
      const ms = today.getTime() - postDay.getTime()
      const days = Math.floor(ms / (1000*60*60*24))

      // 14日以内の投稿であればnew_iconを追加する
      if(days <= 14) {
        const new_icon = document.createElement('img')
        new_icon.src = 'img/new_icon.png'
        new_icon.classList.add('new_icon')

        if(article.category === 'ニュース') {
          title.appendChild(new_icon)
        } else if(article.category === '経済') {
          title.appendChild(new_icon)
        } else if(article.category === 'エンタメ') {
          title.appendChild(new_icon)
        } else if(article.category === 'スポーツ') {
          title.appendChild(new_icon)
        } else if(article.category === '国内') {
          title.appendChild(new_icon)
        } 
      }

      // コメントがあればアイコンを追加
      if(info.comment > 0) {
        comment.textContent = info.comment
        comment.appendChild(comment_icon)
      }

      if(article.category === 'ニュース') {
        newsTitleWrap.appendChild(title)
        newsContentsInner.appendChild(newsTitleWrap)
        newsContents.appendChild(newsContentsInner)
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
    // タイトルの生成ここまで

    // 画像の生成
    const img = document.createElement('img')
    img.src = article.img
    img.classList.add('img')

    if(article.category === 'ニュース') {
      newsContentsInner.appendChild(img)
      newsContents.appendChild(newsContentsInner)
    } else if(article.category === '経済') {
      economyContentsInner.appendChild(img)
      economyContents.appendChild(economyContentsInner)
    } else if(article.category === 'エンタメ') {
      entertainmentContentsInner.appendChild(img)
      entertainmentContents.appendChild(entertainmentContentsInner)
    } else if(article.category === 'スポーツ') {
      sportsContentsInner.appendChild(img)
      sportsContents.appendChild(sportsContentsInner)
    } else if(article.category === '国内') {
      japanContentsInner.appendChild(img)
      japanContents.appendChild(japanContentsInner)
    }
    // 画像の生成ここまで
  }

  tabClickAction(tab_list)
}

function tabClickAction (tabList) {
  tabList.forEach(clickedTab => {
    clickedTab.addEventListener('click', () => {
      tabList.forEach(tab => {
        tab.classList.remove('active')
      })

      clickedTab.classList.add('active')

      contents.forEach(content => {
        content.classList.remove('active')
      })

      document.getElementById(clickedTab.dataset.id).classList.add('active')
    })
  })
}

createElement()