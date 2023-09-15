import { PixabayAPI } from './pixabay-api.js';
import { refs } from './refs.js';
import { lightbox } from './SimpleLightbox.js';
import { renderList } from './renderList.js'
import { Notify } from 'notiflix';

const pixabayApi = new pixabayApi(40);

refs.form.addEventListener('submit', onSubmit);

async function onSubmit(e) {
    e.preventDefault();

    const searchEl = e.currentTarget.elements.searchEl.value.trim();
    if(!searchEl) {
        return Notify.warning("Please, fill the main field")
    }

    pixabayApi.q = searchEl;
    pixabayApi.page = 1;

    try {
        const { totalHits, hits } = await pixabayApi.getPhotos();
        if (totalHits === 0) {
            Notify.failure ('Sorry, there are no images matching your search query. Please try again.')
        } 
        else {
            Notify.success("Hooray! We found: ${totalHits} images.");

            refs.list.innerHTML = renderList(hits);
            lightbox.refresh()
        }
        
        totalPages = 
    }
}


async function loadMore(e) {
    pixabayApi.page +=1;
    const { hits } = await pixabayApi.getPhotos();

    try {
        if(pixabayApi.page === totalPages) {
            Notify.info("You've reached the end of search results")

            return;
        }
        refs.list.insertAdjacentHTML('beforeend', renderList(hits));
        lightbox.refresh();
    }
    catch(error) {
        getError()
    }
}

function getError() {
    Notify.failure("Oops! Something went wrong! Try reloading the page!")
}