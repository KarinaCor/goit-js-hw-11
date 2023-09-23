import { PixabayAPI } from './pixabay-api.js';
import { refs } from './refs.js';
import { lightbox } from './SimpleLightbox.js';
import { renderList } from './renderList.js'
import { Notify } from 'notiflix';

const pixabayApi = new PixabayAPI(40);

let totalPages = 0;

refs.form.addEventListener('submit', onSubmit);

async function onSubmit(e) {
    e.preventDefault();
console.log(e.currentTarget.elements);
    const searchEl = e.currentTarget.elements['searchQuery'].value.trim()
    if(!searchEl) {
        return Notify.failure("Sorry, there are no images matching your search query. Please try again.")
       
    }
    

    pixabayApi.q = searchEl;
    pixabayApi.page = 1;

    try {
        const { totalHits, hits } = await pixabayApi.getPhotos();
        totalPages = Math.ceil(totalHits / 40);
        if (totalHits === 0) {
           return Notify.failure ('Sorry, there are no images matching your search query. Please try again.')
        } 
        else {
            Notify.success(`Hooray! We found: ${totalHits} images.`);

            refs.list.innerHTML = renderList(hits);
            lightbox.refresh();
        }
        if( totalPages === 1 ) {
            return;
        }
        observer.observe(refs.targetEl)
    } catch(error) {
        Notify.failure(`${error}`)
        }
        finally {
            refs.form.reset();
        }
             
           } 
    
    
    const observer = new IntersectionObserver((entries, observer) => {
        if(entries[0].isIntersecting) {
            loadMoreData()
        }
    },
    {
    root: null, 
    rootMargin:'300px', 
    threshold: 1,
    }
    );
 


async function loadMoreData() {
    pixabayApi.page +=1;
    const { hits } = await pixabayApi.getPhotos();

    try {
        refs.list.insertAdjacentHTML('beforeend', renderList(hits));
        
        lightbox.refresh();
        if(pixabayApi.page === totalPages) {
           Notify.info("We're sorry, but you've reached the end of search results.")
    observer.unobserve(refs.targetEl)
    return;
        }
       
    }
    catch(error) {
        Notify.failure(`${error}`)
    }
}

