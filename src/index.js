import iziToast from "izitoast";
import SlimSelect from 'slim-select'
import {fetchBreeds, fetchCatByBreed} from './js/cat-api.js';

import "izitoast/dist/css/iziToast.min.css";

const breebsSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');

const renderBreedInfo = (breed) => {
    const breedInfo = breed.breeds[0];
    const infoHTMLElement = `
        <img src="${breed.url}" width="600" height="600"/>
        <div>
            <h2>${breedInfo.name}</h2>
            <p>${breedInfo.description}</p>
            <ul>${breedInfo.temperament.split(', ').map((it) => `<li>${it}</li>`).join('')}</ul>
        </div>
    `;
    catInfo.innerHTML = '';
    catInfo.insertAdjacentHTML('afterbegin', infoHTMLElement)
}

const onBreedsSelectChange = async (e) => {
    const chosenBreed = e.target[breebsSelect.selectedIndex];

    try {
        loader.style.display = 'block';
        const resp = await fetchCatByBreed(chosenBreed.value);
        renderBreedInfo(resp[0]);
        loader.style.display = 'none';
    } catch (err) {
        loader.style.display = 'none';
        iziToast.error({
            title: 'Error occured',
            message: 'Cannot render breed info. Try to reload page!'
        })
        console.error('Cannot render breed info. Error occured: ', err);
    }
};

const main = async () => {
    try {
        const breeds = await fetchBreeds();
        const options = breeds.map((b) => `<option value="${b.id}">${b.name}</option>`).join('');
        breebsSelect.insertAdjacentHTML('afterbegin', options);
        new SlimSelect({
            select: breebsSelect
        })
        breebsSelect.addEventListener('change', onBreedsSelectChange);
        loader.style.display = 'none';
    } catch (err) {
        loader.style.display = 'none';
        iziToast.error({
            title: 'Error occured',
            message: 'Cannot render breeds. Try to reload page!'
        })
        console.error('Cannot render breeds. Error occured: ', err);
    }
};

main();
