import { NewsPixabayApi } from './fetchCountries';

const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const example = document.querySelector('.example');
const loadMore = document.querySelector('.load-more');

const newApiService = new NewsPixabayApi();

function onSubmitSearchImg(e) {
  e.preventDefault();

  const searchValue = e.currentTarget.elements.searchQuery.value.trim();
  if (searchValue) {
    newApiService.query = searchValue;
    newApiService.ressetPage();
    newApiService.fetchPixabayApiService().then(data => {
      clearGalleryList();
      creatGallaryMarkup(data);
      loadMore.classList.remove('is-hidden');
    });
  } else {
    clearGalleryList();
  }

  // pixabayApi(searchValue).then(data => creatGallaryMarkup(data));
}

function creatGallaryMarkup(obj) {
  const markup = obj
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

loadMore.addEventListener('click', onClickPage);
searchForm.addEventListener('submit', onSubmitSearchImg);

function onClickPage(e) {
  newApiService.fetchPixabayApiService().then(creatGallaryMarkup);
}

function clearGalleryList() {
  gallery.innerHTML = '';
}
