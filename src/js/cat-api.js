import axios from 'axios';

axios.defaults.headers.common["x-api-key"] = 'live_HiesbHCNozFabauA2TlzO2OtiyWGedKBWDRv7zZNtooEj53fuPidluKoVAklkZzU';

export const fetchBreeds = async () => {
    try {
        const resp = await axios.get('https://api.thecatapi.com/v1/breeds');

        return resp.data; 
    } catch (err) {
        console.error('Cannot fetch breeds. Error occured: ', err);
    }
}

export const fetchCatByBreed = async (id) => {
    try {
        const resp = await axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${id}`);

        return resp.data; 
    } catch (err) {
        console.error('Cannot fetch breed info. Error occured: ', err);
    }
}