import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { NewsPixabayApi } from './fetchCountries';

const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const guard = document.querySelector('.js-guard');
const scrollBtn = document.querySelector('.is-show_btn__hide');
// const loadMore = document.querySelector('.load-more');

window.onscroll = () => {
  if (window.scrollY > 700) {
    scrollBtn.classList.remove('is-show_btn__hide');
  } else if (window.scrollY < 700) {
    scrollBtn.classList.add('is-show_btn__hide');
  }
};
scrollBtn.onclick = () => {
  window.scrollTo(0, 0);
};

async function onSubmitSearchImg(e) {
  e.preventDefault();
  try {
    const searchValue = e.currentTarget.elements.searchQuery.value.trim();
    newApiService.query = searchValue;
    newApiService.ressetPage();
    const data = await newApiService.fetchPixabayApiService();
    if (searchValue === '') {
      return Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else if (data.data.totalHits === 0) {
      return Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    clearGalleryList();

    Notiflix.Notify.success(`Hooray! We found ${data.data.totalHits} images.`);

    createGallaryMarkup(data);
  } catch (error) {
    gallery.innerHTML = `<div class="error">
    <h2 class="error-title">
      Sorry, we are having technical problems, please wait with us, we will
      fix everything quickly, or come back later, thanks!
    </h2>
  </div>
</div>`;
  }
}
function createGallaryMarkup(data) {
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

  gallery.insertAdjacentHTML('beforeend', markup);
  let lightbox = new SimpleLightbox('.gallery a', {});

  observer.observe(guard);
}

// loadMore.addEventListener('click', onClickPage);
searchForm.addEventListener('submit', onSubmitSearchImg);

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

async function loadMore() {
  newApiService.incrementPage();

  const data = await newApiService.fetchPixabayApiService();
  const totalHits = data.data.totalHits;

  if (Math.round(totalHits / 40) < newApiService.page + 1) {
    return Notiflix.Notify.warning(
      'We are sorry, but you have reached the end of search results.'
    );
  }

  createGallaryMarkup(data);
}
function updateList(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting === true) {
      loadMore();
    }
  });
}
