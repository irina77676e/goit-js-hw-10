import './css/styles.css';
import NewsApiService from './fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { refs } from './refs';
import { appendMarkup } from './appendMarkup';

const debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

const newsApiService = new NewsApiService();

refs.searchBox.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
  clearContainer();

  if (!e.target.value.trim()) {
    return;
  }
  newsApiService.query = e.target.value.trim();

  newsApiService
    .fetchCountries()
    .then(countries => {
      if (countries.length > 10) {
        Notify.info(
          '⚠️Too many matches found. Please enter a more specific name.'
        );
        return;
      }
      appendMarkup(countries);
    })
    .catch(() => {
      Notify.failure('❌Oops, there is no country with that name');
    });
}

function clearContainer() {
  refs.countryInf.innerHTML = '';
  refs.countryList.innerHTML = '';
}
