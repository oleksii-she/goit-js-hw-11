import { pixabayApi } from './fetchCountries';

const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const example = document.querySelector('.example');
const loadMore = document.querySelector('.load-more');

let page = 1;

function onSubmitSearchImg(e) {
  e.preventDefault();

  const searchValue = e.target.elements.searchQuery.value;

  pixabayApi(searchValue).then(data => creatGallaryMarkup(data));
}

function creatGallaryMarkup({ data: { hits } }) {
  const markupBtn =
    '<button type="button" class="load-more">Load more</button>';
  const markup = hits

    .map(el => {
      return `<div class="photo-card">
    <img src="${el.webformatURL}" alt="${el.tags}" loading="lazy"/>
    <div class="info">
      <p class="info-item">
        <b>Likes</b><span>${el.likes}</span>
      </p>
      <p class="info-item">
        <b>Views</b><span>${el.views}</span>
      </p>
      <p class="info-item">
        <b>Comments</b><span>${el.comments}</span>
      </p>
      <p class="info-item">
        <b>Downloads</b><span>${el.downloads}</span>
      </p>
    </div>
  </div>
  `;
    })
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
}
function onclickPage(e) {
  pixabayApi((page += 1)).then(data => {
    const markup = creatGallaryMarkup({ data: { hits } });
    gallery.insertAdjacentHTML('beforeend', markup);
  });
}

searchForm.addEventListener('submit', onSubmitSearchImg);
loadMore.addEventListener('click', onclickPage);
