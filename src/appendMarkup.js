import { refs } from './refs';

export function appendMarkup(countries) {
  let lanToPrint = [];
  let languages = countries.map(el => el.languages);
  for (const lan of languages) {
    lanToPrint = Object.values(lan);
  }

  let resolt = countries
    .map(
      el => `<li>
  <img class='country-list__img' src='${el.flags.svg}' alt='${el.name.official}'  width='25px'/>
    
    <span class='country-list__name'>${el.name.common}</span>
    </li>`
    )
    .join('');

  let countryInfo = countries.map(
    el => `<p class='country-info__capital'>
      <span class='weight'>Capital:</span>
      ${el.capital}
  </p>
  <p class='ci__population'>
      <span class='weight'>Population:</span>
      ${el.population}
  </p>
  <p>Languages: ${lanToPrint}</p>`
  );

  if (countries.length === 1) {
    refs.countryList.innerHTML = resolt;
    refs.countryInf.insertAdjacentHTML('beforeend', countryInfo);
  }
  if (countries.length > 1) {
    return (refs.countryList.innerHTML = resolt);
  }
}
