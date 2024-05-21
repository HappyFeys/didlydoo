document.getElementById("header__addEvent").addEventListener("click", function(){

  const form = document.getElementById("form--formulaire")

  form.style.display = "block"

})

document.getElementById("submit").addEventListener("click", function(){
  event.preventDefault();

  const popup = document.getElementById("form--popup")

  popup.style.display = "block"

})