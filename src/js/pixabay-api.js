import axios from "axios";

export class PixabayAPI {
    #BASE_URL = 'https://pixabay.com/api/';
    #API_KEY = '39441457-7e0b81e04f2eb10af3ac9213f';
    constructor(perPage) {
        this.per_page = perPage;
        this.page = 1;
        this.q = '';
    }

  async getPhotos() {
    const response = await axios.get(`${this.#BASE_URL}`,{
        params: {
            key: this.#API_KEY,
            q: this.q,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
            page: this.page,
            per_page: this.per_page

        }
    })
    return response.data;
  }
}



