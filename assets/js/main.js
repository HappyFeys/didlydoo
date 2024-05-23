import { postEvent } from "./api";
import { Get, Set } from "./LocalStorage.js";
import { generateDom } from "./generateDom.js";

let evenement = Get("event", null)
generateDom(evenement)


import { handleFormSubmit } from './formapi.js';

// Ajouter un écouteur d'événements lorsque le contenu de la page est chargé
document.addEventListener("DOMContentLoaded", function() {
    // Appeler la fonction pour gérer la soumission du formulaire
    handleFormSubmit();
});
