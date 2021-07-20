import './css/styles.css';
import API from './js/fetchCountries';
import countryCard from './templates/countryCard.hbs';
import countryList from './templates/countryList.hbs'
import getCountryRefs from './js/getCountryRefs';
import Notiflix from "notiflix";

const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;
const refs = getCountryRefs();

refs.searchCountry.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch (event) {
    refs.countryInfo.innerHTML = '';
    refs.countryList.innerHTML = '';
    const searchValue = event.target.value;

    API.fetchCountries(searchValue)
    .then(renderCountryCardMarkup)
    .catch(error => console.log(error))
}

function renderCountryCardMarkup (countries){
      if (countries.length === 1) {
        refs.countryInfo.insertAdjacentHTML('beforeend', countryCard(countries[0]));
      } 
      else if (countries.length > 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.')
      }
      else if (countries.status === 404) {
        Notiflix.Notify.failure('Oops, there is no country with that name');
      }
      else if (countries.length >= 2 && countries.length <= 10) {
        refs.countryList.insertAdjacentHTML('afterbegin', countryList(countries));
      } 
}