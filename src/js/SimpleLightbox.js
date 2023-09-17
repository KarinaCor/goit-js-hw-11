import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";

export let lightbox = new SimpleLightbox('.gallery a', {captionDelay: 300,caption: true});