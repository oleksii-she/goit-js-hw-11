import SimpleLightbox from 'simplelightbox';
import Notiflix from 'notiflix';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { NewsPixabayApi } from './fetchCountries';

const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const example = document.querySelector('.example');
const guard = document.querySelector('.js-guard');

// const loadMore = document.querySelector('.load-more');

async function onSubmitSearchImg(e) {
  e.preventDefault();
  try {
    const searchValue = e.currentTarget.elements.searchQuery.value.trim();
    if (searchValue.length >= 2) {
      newApiService.query = searchValue;
      newApiService.ressetPage();
      const data = await newApiService.fetchPixabayApiService();

      clearGalleryList();
      createGallaryMarkup(data);
    } else if (newApiService.query === '') {
      Notiflix.Notify.failure('Oops, there is no country with that name');
    } else if (subscription === 'premium') {
      cost = 500;
    } else {
      console.log('Invalid subscription type');
    }
  } catch (error) {
    Notiflix.Notify.failure('Oops, there is no country with that name');
  }
}

function createGallaryMarkup(data) {
  // console.log(totalHits);
  const markup = data.data.hits
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
  Notiflix.Notify.success('Hooray! We found totalHits images.');
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
console.log();
const observer = new IntersectionObserver(updateList, options);

async function updateList(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting === true) {
      newApiService
        .fetchPixabayApiService()

        .then(data => {
          createGallaryMarkup(data);
        })
        .catch(err => {
          console.log(err);
        });
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
