// 現在日時を取得
const dayDate = new Date()
const year = dayDate.getFullYear()
const month = dayDate.getMonth() + 1
const day = dayDate.getDate()
const today =  new Date(`${year}/${month}/${day}`);

const body = document.querySelector('body')
const tabs = document.querySelector('ul')
tabs.classList.add('tab')
const tab_list = new Set()

// 各コンテンツの枠
const contentsWrap = document.createElement('div')
const newsContents = document.createElement('div')
const economyContents = document.createElement('div')
const entertainmentContents = document.createElement('div')
const sportsContents = document.createElement('div')
const japanContents = document.createElement('div')

// 各コンテンツの枠の中
const newsContentsInner = document.createElement('div')
const economyContentsInner = document.createElement('div')
const entertainmentContentsInner = document.createElement('div')
const sportsContentsInner = document.createElement('div')
const japanContentsInner = document.createElement('div')

// 各タイトルのラップ
const newsTitleWrap = document.createElement('ul')
const economyTitleWrap = document.createElement('ul')
const entertainmentTitleWrap = document.createElement('ul')
const sportsTitleWrap = document.createElement('ul')
const japanTitleWrap = document.createElement('ul')

const contents = [newsContents, economyContents, entertainmentContents, sportsContents, japanContents]
const contentsInners = [newsContentsInner, economyContentsInner, entertainmentContentsInner, sportsContentsInner, japanContentsInner]
const titleWraps = [newsTitleWrap, economyTitleWrap, entertainmentTitleWrap, sportsTitleWrap, japanTitleWrap]

contentsWrap.classList.add('contentWrap')
newsContents.id = "js-news"
economyContents.id = "js-economy"
entertainmentContents.id = "js-entertainment"
sportsContents.id = "js-sports"
japanContents.id = "js-japan"

for(let i = 0; i < contents.length; i++) {
  contentsWrap.appendChild(contents[i])
  contents[i].classList.add('content')
  contentsInners[i].classList.add('content__inner')
  titleWraps[i].classList.add('titleWrap')
  body.appendChild(contentsWrap)
}

async function fetchArticle () {
  try {
    const response = await fetch('data.json')
    const json = await response.json()
    return json.articles
  } catch {
    tabs.textContent = 'ただいまサーバー側がぶっこわれています。'
  } finally {
    console.log('fetchArticle run')
  }
}

async function createElement () {
  const articles = await fetchArticle()
  createTabs(articles);
  createTitles(articles);
  createImages(articles);
  tabClickAction(tab_list)
}
createElement()

function createTabs(articles) {
  for(const article of articles) {
    const tabFrag = document.createDocumentFragment()
    const tab = document.createElement('li')
    tab.textContent = article.category
    tab.classList.add('tab__item')
    tabFrag.appendChild(tab)
    tabs.appendChild(tabFrag)
    tab_list.add(tab)

    // どのタブを初期表示にするか
    if(article.is_init) {
      tab.classList.add('active')
    }

    if(article.category === 'ニュース') {
      tab.dataset.id = 'js-news'
    } else if(article.category === '経済') {
      tab.dataset.id = 'js-economy'
    } else if(article.category === 'エンタメ') {
      tab.dataset.id = 'js-entertainment'
    } else if(article.category === 'スポーツ') {
      tab.dataset.id = 'js-sports'
    } else if(article.category === '国内') {
      tab.dataset.id = 'js-japan'
    }

    // is_initがtrueのコンテンツを初期表示にする(ニュースカテゴリーがtrueを保持している)
    if(article.category === 'ニュース' && article.is_init === true) {
      newsContents.classList.add('active')
    } else if(article.category === '経済' && article.is_init === true) {
      economyContents.classList.add('active')
    } else if(article.category === 'エンタメ' && article.is_init === true) {
      entertainmentContents.classList.add('active')
    } else if(article.category === 'スポーツ' && article.is_init === true) {
      sportsContents.classList.add('active')
    } else if(article.category === '国内' && article.is_init === true) {
      japanContents.classList.add('active')
    }
  }
}

function createTitles(articles) {
  for(const article of articles) {
    for(const info of article.article) {
      const titleFrag = document.createDocumentFragment()
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
      titleFrag.appendChild(title)

      // 投稿日と今日との日差を取得
      const postDay = new Date(info.created_at)
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
        newsTitleWrap.appendChild(titleFrag)
        newsContentsInner.appendChild(newsTitleWrap)
        newsContents.appendChild(newsContentsInner)
      } else if(article.category === '経済') {
        economyTitleWrap.appendChild(titleFrag)
        economyContentsInner.appendChild(economyTitleWrap)
        economyContents.appendChild(economyContentsInner)
      } else if(article.category === 'エンタメ') {
        entertainmentTitleWrap.appendChild(titleFrag)
        entertainmentContentsInner.appendChild(entertainmentTitleWrap)
        entertainmentContents.appendChild(entertainmentContentsInner)
      } else if(article.category === 'スポーツ') {
        sportsTitleWrap.appendChild(titleFrag)
        sportsContentsInner.appendChild(sportsTitleWrap)
        sportsContents.appendChild(sportsContentsInner)
      } else if(article.category === '国内') {
        japanTitleWrap.appendChild(titleFrag)
        japanContentsInner.appendChild(japanTitleWrap)
        japanContents.appendChild(japanContentsInner)
      } 
    }
  }
}

function createImages(articles) {
  for(const article of articles) {
    const img = document.createElement('img')
    img.src = article.img_path
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
  }
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
