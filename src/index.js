import { fetchBreeds, fetchCatByBreed } from './js/cat-api';

const refs = {
  selector: document.querySelector('.breed-select'),
  divCatInfo: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
};

//створюємо options
function getAllCats(arr) {
  for (let i = 0; i < arr.length; i += 1) {
    let value = arr[i].id;
    let text = arr[i].name;

    const optionsElement = document.createElement('option');
    optionsElement.value = value;
    optionsElement.textContent = text;
    refs.selector.appendChild(optionsElement);
  }
}

addCats();

// робимо фетч та додаємо options
function addCats() {
  fetchBreeds()
    .then(getAllCats)
    .catch(error => console.log(error));
}

refs.selector.addEventListener('change', createModalCat);

// прослуховує селект
function onSelectBreed() {
  const selectedValue = refs.selector.options[refs.selector.selectedIndex];
  const selecteId = selectedValue.value;

  return selecteId;
}

//робить розмітку
function markup(arr) {
  let imgUrl = arr.map(link => link.url);

  let catDesc = arr.map(cat => cat.breeds[0].description);

  let catTemp = arr.map(cat => cat.breeds[0].temperament);

  const markup = `<img class="cat-img" src="${imgUrl}" width="600">
    <p><b>Description: </b>${catDesc}</p>
    <p><b>Temperament: </b>${catTemp}</p>`;

  refs.divCatInfo.insertAdjacentHTML('beforeend', markup);
}

// додає розмітку з даними
function createModalCat() {
  const breedId = onSelectBreed();

  const isContent = document.querySelector('.cat-img');

  if (isContent) {
    clearCatContent();
  }

  fetchCatByBreed(breedId)
    .then(markup)
    .catch(error => console.log(error));
}

function clearCatContent() {
  const children = Array.from(refs.divCatInfo.children);

  children.forEach(child => {
    refs.divCatInfo.removeChild(child);
  });
}
