export default class NewsApiService {
    constructor() {
       this.searchQuery = '';
       this.page = 1;
    }

    fetchArticles(){
        console.log('before request', this)
       const url = `https://newsapi.org/v2/everything?q=${this.searchQuery}&language=de&pageSize=5&page=${this.page}&apiKey=49ed73cfe4444ed783474087ec6ce94b`

       return fetch(url)
         .then(r => r.json())
         .then(({articles}) => {
             this.incrementPage() 
            return articles
         })
    }

    incrementPage() {
        this.page += 1
    }

    resetPage(){
        this.page = 1;
    }

    get query() {
        return this.searchQuery
    }
    set query(newQuery) {
        this.searchQuery = newQuery
    }
}