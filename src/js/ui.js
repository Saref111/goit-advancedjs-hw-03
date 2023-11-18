import SlimSelect from 'slim-select';

import {fetchCatByBreed} from './cat-api.js';

const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const breebsSelect = document.querySelector('.breed-select');

export const showLoader = () => {
    loader.classList.add('loader--visible');
};

export const hideLoader = () => {
    loader.classList.remove('loader--visible');
};

export const renderBreedInfo = (breed) => {
    const breedInfo = breed.breeds[0];
    const infoHTMLElement = `
        <img src="${breed.url}" width="600" height="600" class="pic" />
        <div>
            <h2>${breedInfo.name}</h2>
            <p>${breedInfo.description}</p>
            <ul>${breedInfo.temperament.split(', ').map((it) => `<li>${it}</li>`).join('')}</ul>
        </div>
    `;
    catInfo.innerHTML = '';
    catInfo.insertAdjacentHTML('afterbegin', infoHTMLElement);
};

const onBreedsSelectChange = async (e) => {
    const chosenBreed = e.target[e.target.selectedIndex];

    try {
        showLoader();
        const resp = await fetchCatByBreed(chosenBreed.value);
        renderBreedInfo(resp[0]);
        hideLoader();
    } catch (err) {
        hideLoader();
        console.error('Cannot render breed info. Error occured: ', err);
    }
};

export const renderSelect = (breeds) => {
    const options = breeds.map((b) => `<option value="${b.id}">${b.name}</option>`).join('');
    breebsSelect.insertAdjacentHTML('afterbegin', options);
    const slimSelect = new SlimSelect({ select: breebsSelect });
    breebsSelect.addEventListener('change', onBreedsSelectChange);
    
    return slimSelect;
};
