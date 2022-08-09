import { obtenerPuestos, registrarPuesto, eliminar, editarObj } from "./API.js";
const main = document.querySelector("#main")
const empresa = document.querySelector("#empresa")
const nombrePuesto = document.querySelector("#nombreDelPuesto")
const jornada = document.querySelector("#jornada")
const pais = document.querySelector("#pais")
const nivel = document.querySelector("#nivel")
const rol = document.querySelector("#rol")
const modal = document.querySelector(".btnMod")
const save = document.querySelector("#save")
const checkBoxes = document.querySelector("#checkBoxes")


//event listeners
save.addEventListener("click", guardarPuesto)
checkBoxes.addEventListener("click", showCheckboxes)


//checkbox option
let expanded = false;

function showCheckboxes() {
  let checkboxes = document.getElementById("checkboxes");
  if (!expanded) {
    checkboxes.style.display = "block";
    expanded = true;
  } else {
    checkboxes.style.display = "none";
    expanded = false;
  }
}

async function puestos(){
   const mostrarPuestos = await obtenerPuestos()
   mostrarPuestos.map(item =>{
      
      const {company, contract, languages, level, location, 
         logo, position, postedAt, role, id} = item
      main.innerHTML += `<div class="cardPuesto">
      <div class="rallita"></div>
      <img src="${logo}" alt="" class="icon">
      <div class="sep">
      <div class="caracteristicasPuesto">
        <p class="empresaPuesto">${company}</p>
        <div class="status">
          <p class="bVerde" id="edit" data-id=${id}>Edit</p>
          <p class="bNegro" id="delete" data-id="${id}">Delete</p>
        </div>
      </div>
      <p class="nombrePuesto">${position}</p>
      <div class="caracteristicasPuesto">
        <p class="day">${postedAt}</p>
        <div class="status">
          <p>${contract}</p>
          <p>${location}</p>
        </div>
      </div>
      </div>
      <div class="sep2">
      <div class="hr"></div>
      <div class="tags" id ="${id}">
        <p class="tag">${role}</p>
        <p class="tag">${level}</p>
      </div>
      </div>
    </div>`
    languages.map(item =>{
      const tags = document.getElementById(id)
         const nodo = document.createElement("p")
         const textnode = document.createTextNode(`${item}`)
         nodo.classList.add("tag")
         nodo.appendChild(textnode)
         tags.appendChild(nodo)
      })
   })
   const eliminar = document.querySelectorAll("#delete")
   const editar = document.querySelectorAll("#edit")
      eliminar.forEach(item=>{
         item.addEventListener("click", borrar)
      })
      editar.forEach(item =>{
         item.addEventListener("click", edit)

      })
      
}

async function edit(e){
   save.removeEventListener("click", guardarPuesto)
   const mostrarPuestos = await obtenerPuestos()
   mostrarPuestos.forEach(item =>{
         if(item.id == e.target.dataset.id){
            empresa.value = item.company
            modal.click()
            save.dataset.id = e.target.dataset.id
         }
   })
   save.addEventListener("click", editarPuesto)
   
}

async function editarPuesto(e){
   const mostrarPuestos = await obtenerPuestos()

   const lenguajes = document.querySelectorAll("input[type=checkbox]:checked")
   let arr = []
   lenguajes.forEach(item=>{
      arr.push(item.id)
   })

   mostrarPuestos.forEach(item =>{
         if(item.id == e.target.dataset.id){
            const puestoEditado = {
               id: item.id,
               company: empresa.value,
               logo: "./images/photosnap.svg",
               new: true,
               featured: true,
               position: nombrePuesto.value,
               role: rol.value,
               level: nivel.value,
               postedAt: "1d ago",
               contract: jornada.value,
               location: pais.value,
               languages: arr,
               tools: []
            }
            editarObj(puestoEditado)
            
      
         }
      })
    }

 puestos()

 
 function borrar(e){
   const borr = parseInt(e.target.dataset.id)
   eliminar(borr)
}
 function guardarPuesto(){
   const lenguajes = document.querySelectorAll("input[type=checkbox]:checked")
   let arr = []
   lenguajes.forEach(item=>{
      arr.push(item.id)
   })
   
   const puestoNuevo = {
      company: empresa.value,
      logo: "./images/photosnap.svg",
      new: true,
      featured: true,
      position: nombrePuesto.value,
      role: rol.value,
      level: nivel.value,
      postedAt: "1d ago",
      contract: jornada.value,
      location: pais.value,
      languages: arr,
      tools: []
   }
   
   registrarPuesto(puestoNuevo)
   
 }