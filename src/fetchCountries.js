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

//   const response = await fetch(
//     `${BASE_URL}?key =${key}&q=${q}&image_type=${imageType}&orientation =${orientation}&safesearch =${safesearch}`
//   );
//   const photo = response.json();
//   return photo;
// }

// pixabayApi();

function fetchCountries() {
  const BASE_URL = 'https://pixabay.com/api/';
  const key = '29380167-bc7f7d83fdfa795e7dcbffaab';
  const q = 'yellow+flower';
  const imageType = 'photo';
  const orientation = 'horizontal';
  const safesearch = 'true';
  return fetch(
    `https://restcountries.${BASE_URL}?key=${key}&q=${q}&image_type=${imageType}&orientation=${orientation}&safesearch=${safesearch}/v3.1/name/name`
  ).then(res => {
    console.log(res);

    if (res.status === 404) {
      throw new Error('Error');
    } else {
      return res.json();
    }
  });
}
fetchCountries();
// ${name}?fields=name,capital,population,flags,languages

// console.log('heas');
