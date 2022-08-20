import { pixabayApi } from './fetchCountries';

const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
function onSubmitSearchImg(e) {
  e.preventDefault();

  const searchValue = e.target.elements.searchQuery.value;

  pixabayApi(searchValue).then(data => creatGallaryMarkup(data));
}

function creatGallaryMarkup({ data: { hits } }) {
  const markup = hits
    .map(el => {
      return `<div class="photo-card">
    <img src="${el.webformatURL}" alt="${el.tags}" loading="lazy"   width="640"   height="480"/>
    <div class="info">
      <p class="info-item">
        <b>Likes: ${el.likes}</b>
      </p>
      <p class="info-item">
        <b>Views: ${el.views}</b>
      </p>
      <p class="info-item">
        <b>Comments: ${el.comments}</b>
      </p>
      <p class="info-item">
        <b>Downloads: ${el.downloads}</b>
      </p>
    </div>
  </div>`;
    })
    .join('');

  gallery.innerHTML = markup;
}
searchForm.addEventListener('submit', onSubmitSearchImg);
