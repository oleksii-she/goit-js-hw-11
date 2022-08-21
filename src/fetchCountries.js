//  function pixabayApi() {
//   const BASE_URL = 'https://pixabay.com/api/';
//   const key = '29380167-bc7f7d83fdfa795e7dcbffaab';
//   const q = 'yellow+flower';
//   const imageType = 'photo';
//   const orientation = 'horizontal';
//   const safesearch = 'true';

//   //   const options = {
//   //     method: 'GET',
//   //   };

export { pixabayApi };
const axios = require('axios').default;

const BASE_URL = 'https://pixabay.com/api/';
const key = '29380167-bc7f7d83fdfa795e7dcbffaab';
const q = 'yellow+flower';
const imageType = 'photo';
const orientation = 'horizontal';
const safesearch = 'true';
const name = 'dog';

function pixabayApi(name, page = 1) {
  return axios
    .get(
      `https://pixabay.com/api/?image_type=photo&key=29380167-bc7f7d83fdfa795e7dcbffaab&q=${name}&orientation=horizontal&safesearch=true&min_height=426&per_page=40&page=${page}`
    )
    .then(res => res)
    .catch(err => console.log(err));
}

// const options = {
//   headers: {
//     imageType: 'photo',
//     key: '29380167-bc7f7d83fdfa795e7dcbffaab',
//     query: `${name}`,
//     orientation: 'horizontal',
//     safesearch: 'true',
//   },
// };
