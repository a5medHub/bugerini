import { menuArray } from "./data.js"

const menuEl = document.getElementById("menu")

document.addEventListener("click", (event) => {event.target.dataset.icon?addToMenu(event.target.dataset.icon):''})

// const addToMenu = e => {
//     const addItem = menuArray.filter(item=> item.id == e )[0]
//     console.log(addItem)
// }
function addToMenu(e){

    const addItem = menuArray.filter(item=> item.id == e )[0]
    menuEl.innerHTML+= `
        <div class="orders" id="${addItem.id}">
            <div class="itemAdded">
                <h3>${addItem.name}</h3>
                <p>remove</p>
                <h5>${addItem.price}</h5>
            </div>
        </div>`
  
}

function getMenuItems() {
    return menuArray.map(e => {
        return`
         <div class="item">
            <p>${e.emoji}</p>
            <div class="itemType">
                <h3 class="name">${e.name}</h3>
                <p class="ingredients">${e.ingredients}</p>
                <p class="price">$${e.price}</p>
            </div>
            <button data-icon="${e.id}" id="add-button" class="icon">+</button>
         </div>
         <hr>`
         }).join('')
    
    
}

function render() {
    menuEl.innerHTML = getMenuItems()

    

}
render()
