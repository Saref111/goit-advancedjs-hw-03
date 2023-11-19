import axios from 'axios';

axios.defaults.headers.common["x-api-key"] = 'live_HiesbHCNozFabauA2TlzO2OtiyWGedKBWDRv7zZNtooEj53fuPidluKoVAklkZzU';

export const fetchBreeds = async () => {
    const resp = await axios.get('https://api.thecatapi.com/v1/breeds');
    return resp.data; 
}

export const fetchCatByBreed = async (id) => {
    const resp = await axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${id}`);
    return resp.data; 
}
