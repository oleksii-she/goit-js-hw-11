export { NewsPixabayApi };
const axios = require('axios').default;

const loadMore = document.querySelector('.load-more');

class NewsPixabayApi {
  constructor() {
    this.searchValue = '';
    this.page = 1;
  }

  fetchPixabayApiService() {
    return axios
      .get(
        `https://pixabay.com/api/?image_type=photo&key=29380167-bc7f7d83fdfa795e7dcbffaab&q=${this.searchValue}&orientation=horizontal&safesearch=true&min_height=426&per_page=42&page=${this.page}`
      )
      .then(res => res)
      .then(data => {
        this.incrementPage();
        return data.data.hits;
      })
      .catch(err => {
        if (res.status === 400) {
          console.log(err);
        }
      });
  }
  ressetPage() {
    this.page = 1;
  }
  incrementPage() {
    this.page += 1;
  }

  get query() {
    return this.searchValue;
  }

  set query(nuwQuery) {
    this.searchValue = nuwQuery;
  }
}

// console.log(testin);
// testin.pixabayApiService();

//  `https://pixabay.com/api/?image_type=photo&key=29380167-bc7f7d83fdfa795e7dcbffaab&q=${this.searchQuery}&orientation=horizontal&safesearch=true&min_height=426&per_page=40&page=${this.page}`
// console.log(testin);
// const searchQuery = 'dog';
// const page = 1;

// nasme.pixabayApiService();
// console.log();

// function pixabayApi(name, page = 1) {
//   return axios
//     .get(
//       `https://pixabay.com/api/?image_type=photo&key=29380167-bc7f7d83fdfa795e7dcbffaab&q=${name}&orientation=horizontal&safesearch=true&min_height=426&per_page=40&page=${page}`
//     )
//     .then(res => console.log(res))
//     .catch(err => console.log(err));
// }

// const options = {
//   headers: {
//     imageType: 'photo',
//     key: '29380167-bc7f7d83fdfa795e7dcbffaab',
//     query: `${name}`,
//     orientation: 'horizontal',
//     safesearch: 'true',
//   },
// };
