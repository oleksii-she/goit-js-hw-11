import SimpleLightbox from 'simplelightbox';

import 'simplelightbox/dist/simple-lightbox.min.css';

import { NewsPixabayApi } from './fetchCountries';

const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const example = document.querySelector('.example');
const guard = document.querySelector('.js-guard');

// const loadMore = document.querySelector('.load-more');

function onSubmitSearchImg(e) {
  e.preventDefault();

  const searchValue = e.currentTarget.elements.searchQuery.value.trim();
  if (searchValue) {
    newApiService.query = searchValue;
    newApiService.ressetPage();
    newApiService.fetchPixabayApiService().then(data => {
      clearGalleryList();
      createGallaryMarkup(data);

      // loadMore.classList.remove('is-hidden');
    });
  } else {
    clearGalleryList();
  }
}
function crateBigImgmarkun() {}
function createGallaryMarkup(obj) {
  const markup = obj
    .map(el => {
      return `<div class="photo-card">
      <a  href="${el.largeImageURL}">
  <img src="${el.webformatURL}" alt="${el.tags}" loading="lazy" class="width_img"/></a>
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
  observer.observe(guard);
  let lightbox = new SimpleLightbox('.gallery a', {
    captionDelay: 250,
  });
}

// loadMore.addEventListener('click', onClickPage);
searchForm.addEventListener('submit', onSubmitSearchImg);

// function onClickPage(e) {

// }

function clearGalleryList() {
  gallery.innerHTML = '';
}

const options = {
  root: null,
  rootMargin: '500px',
  threshold: 1,
};
const newApiService = new NewsPixabayApi();

const observer = new IntersectionObserver(updateList, options);

function updateList(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting === true) {
      newApiService
        .fetchPixabayApiService()

        .then(createGallaryMarkup)
        .catch(err => {
          console.log(err);
        });
      lightbox.refresh();
    }
  });
}

// const { height: cardHeight } = document
//   .querySelector('.gallery')
//   .firstElementChild.getBoundingClientRect();

// window.scrollBy({
//   top: cardHeight * 5,
//   behavior: 'smooth',
// });
