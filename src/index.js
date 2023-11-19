import {fetchBreeds, fetchCatByBreed} from './js/cat-api.js';
import {renderSelect, showLoader, hideLoader, clearInfo, renderBreedInfo, renderErrorNotification} from './js/ui.js';

import "izitoast/dist/css/iziToast.min.css";

const onBreedsSelectChange = async (e) => {
    const chosenBreed = e.target[e.target.selectedIndex];

    try {
        clearInfo();
        showLoader();
        const resp = await fetchCatByBreed(chosenBreed.value);

        if (!resp.length) {
            throw new Error('No cat found');
        }

        renderBreedInfo(resp[0]);
        hideLoader();
    } catch (err) {
        hideLoader();
        renderErrorNotification(err);
        console.error('Cannot render breed info. Error occured: ', err);
    }
};

const main = async () => {
    try {
        showLoader();
        const breeds = await fetchBreeds();
        const select = renderSelect(breeds, onBreedsSelectChange);
        hideLoader();
    } catch (err) {
        hideLoader();
        renderErrorNotification(err);
        console.error('Cannot render select. Error occured: ', err);
    }
};

main();
