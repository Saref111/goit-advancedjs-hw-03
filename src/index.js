import {fetchBreeds} from './js/cat-api.js';
import {renderSelect, showLoader, hideLoader} from './js/ui.js';

import "izitoast/dist/css/iziToast.min.css";

const main = async () => {
    try {
        showLoader();
        const breeds = await fetchBreeds();
        const select = renderSelect(breeds);
        hideLoader();
    } catch (err) {
        hideLoader();
        console.error('Cannot render breeds. Error occured: ', err);
    }
};

main();
