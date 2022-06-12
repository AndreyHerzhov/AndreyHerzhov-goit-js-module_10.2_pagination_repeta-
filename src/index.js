/*
 * - Пагинация
 *   - страница и кол-во на странице
 * - Загружаем статьи при сабмите формы
 * - Загружаем статьи при нажатии на кнопку «Загрузить еще»
 * - Обновляем страницу в параметрах запроса
 * - Рисуем статьи
 * - Сброс значения при поиске по новому критерию
 *
 * https://newsapi.org/
 * 4330ebfabc654a6992c2aa792f3173a3
 * http://newsapi.org/v2/everything?q=cat&language=en&pageSize=5&page=1
 */

 import './css/common.css'
 import NewsApiService from './js/news-service'
 import articlesTpl from './templates/articles.hbs'
 import LoadMoreBtn from './js/components/load-more-btn'

 const refs = {
   searchForm: document.querySelector('.js-search-form'),
   articlesContainer: document.querySelector('.js-articles-container'),
 }

 const loadMoreBtn = new LoadMoreBtn({
   selector:'[data-action="load-more"]',
   hidden: true
  })
  console.log(loadMoreBtn)
 const newsApiService = new NewsApiService()



 refs.searchForm.addEventListener('submit', onSearch)
 loadMoreBtn.refs.button.addEventListener('click', fetchArticles)

 function onSearch(e) {
  e.preventDefault()
  
  newsApiService.query = e.currentTarget.elements.query.value
  if(newsApiService.query === '') {
    return alert('Fill')
  }

  loadMoreBtn.show()
  newsApiService.resetPage()
  
  clearArcticleContainer()

  fetchArticles()
 }

 
 
 function fetchArticles() {
  loadMoreBtn.disable()
  newsApiService.fetchArticles().then(articles => {
  appendtArticlesMarkup(articles)
  loadMoreBtn.enable()
  })
 }

 function appendtArticlesMarkup(articles) {
   refs.articlesContainer.insertAdjacentHTML('beforeend', articlesTpl(articles))
 }

 function clearArcticleContainer() {
   refs.articlesContainer.innerHTML = ''
 }