

import { fetchBreeds, fetchCatByBreed } from './js/cat-api';

const ref = {
    selector: document.querySelector('.breed-select'),
    divCatInfo: document.querySelector('.cat-info'),
    loader: document.querySelector('.loader'),
    error: document.querySelector('.error'),
};

const { selector, divCatInfo, loader, error } = ref;

// Заповнення по id породи і виведення назви для користувача

let arrBreedsId = [];

fetchBreeds()
    .then(data => {
        data.forEach(element => {
            arrBreedsId.push({ text: element.name, value: element.id });
        });
    })

    .catch((error) => console.log('Oops! Something went wrong! Try reloading the page!'));

// Додаємо слухача на форму, викликаємо масив котів, генеруємо розмітку

selector.addEventListener('change', onSelectBreed);

function onSelectBreed(event) {

    const breedId = event.currentTarget.value;
    fetchCatByBreed(breedId)
        .then(data => {
            const { url, breeds } = data[0];

            divCatInfo.innerHTML = `<div><img src="${url}" alt="${breeds[0].name}" width="400"><h2>${breeds[0].name}</h2><p>${breeds[0].description}</p><p>${breeds[0].temperament}</p></div>`

        })
        .catch((error) => console.log('Oops! Something went wrong! Try reloading the page!'));
}
