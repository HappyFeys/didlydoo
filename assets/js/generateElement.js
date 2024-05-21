/** 
* @param {* Type de balise que l'on veut créer, entre " ". Exemple : "p", "span"} tag
* @param {* Contenu que l'on souhaite ajouter à cette balise. Exemple : "Ceci est un contenu" ou une variable} content
* @param {* Section à laquelle on veut appendChild l'élément créé} section
* @param {* Class que l'on souhaite ajouter à l'élément. Si aucun paramètre n'est mentionné, on n'ajoute pas de class} className
*/
export function generateElement(tag, content, section, className) {
    let element = document.createElement(tag);
    element.innerText = content;
    if(className) element.classList.add(className);
    section.appendChild(element)
}

/**
 * 
 * @param {* Section à laquelle on veut appendChild la div} section 
 * @param {* Class que l'on souhaite ajouter à l'élément. Si aucun paramètre n'est mentionné, on n'ajoute pas de class} className 
 */

export function createDiv(section, className){
    let div = document.createElement("div")
    if(className) div.classList.add(className)
    section.appendChild(div)
}

/**
 * 
 * @param {* Balise que l'on souhaite reset entre " ". On peut y renseigner une balise HTML, une classe ou une ID. Exemple : "div", ".container", "#unContainer"} tag 
 */
export function resetHTML(tag) {
    let section = document.querySelector(tag);
    section.innerHTML="";
}

/**
 * 
 * @param {* Src On y renseigne la source de l'élément. Cela peut être un chemin ou une URL} src 
 * @param {* Valeur de la balise alt.} alt 
 * @param {* Section à laquelle on veut appendChild l'élément créé} section 
 * @param {* Class que l'on souhaite ajouter à l'élément. Si aucun paramètre n'est mentionné, on n'ajoute pas de class} className 
 */
export function generateImg(src, alt, section, className) {
    let img = document.createElement("img")
    img.src = src
    img.setAttribute("alt", alt)
    if(className) img.classList.add(className)
    section.appendChild(img)
}

/**
 * 
 * @param {* Src On y renseigne la source de l'élément. Cela peut être un chemin ou une URL} src 
 * @param {* Valeur de la balise alt.} alt 
 * @param {* Section à laquelle on veut appendChild l'élément créé} section
 * @param {* Position de l'élément. Valeur relative à l'insertAdjacentElement. Valeur possible : 'beforebegin', 'afterbegin', 'beforeend', 'afterend'} 
 * @param {* Class que l'on souhaite ajouter à l'élément. Si aucun paramètre n'est mentionné, on n'ajoute pas de class} className 
 */
export function generateImgInsertAdjacentElement(src, alt, section, position, className) {
    let img = document.createElement("img")
    img.src = src
    img.setAttribute("alt", alt)
    if(className) img.classList.add(className)
    section.insertAdjacentElement(position, img)
}