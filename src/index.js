import {fetchBreeds} from './js/cat-api.js';

const breebsSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
error.style.display = 'none';

const main = async () => {
    try {
        const breeds = await fetchBreeds();
        const options = breeds.map((b) => `<option value="${b.id}">${b.name}</option>`).join('');
        breebsSelect.insertAdjacentHTML('afterbegin', options)
        loader.style.display = 'none';
    } catch (err) {
        loader.style.display = 'none';
        error.style.display = 'block';
    }

}

main()
