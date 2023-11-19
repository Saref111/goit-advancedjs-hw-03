import SlimSelect from 'slim-select';
import iziToast from 'izitoast';

const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const breebsSelect = document.querySelector('.breed-select');

export const renderErrorNotification = (err) => {
    iziToast.error({
        title: 'Error occured',
        message: err.message,
        timeout: false,
    });
};

export const clearInfo = () => {
    catInfo.innerHTML = '';
};

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
    catInfo.insertAdjacentHTML('afterbegin', infoHTMLElement);
};

export const renderSelect = (breeds, onChange) => {
    const options = breeds.map((b) => `<option value="${b.id}">${b.name}</option>`).join('');
    breebsSelect.insertAdjacentHTML('afterbegin', options);
    
    const slimSelect = new SlimSelect({ select: breebsSelect });
    breebsSelect.addEventListener('change', onChange);
    breebsSelect.classList.add('breed-select--visible');
    
    return slimSelect;
};
