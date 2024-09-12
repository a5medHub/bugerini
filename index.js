import { menuArray } from "./data.js"

const menuEl = document.getElementById("menu")
const paymentEl = document.getElementById("payment")
const totalEl = document.getElementById("total")
const allAmmount = []
const x = {pizzaCount:0, burgerCount:0, beerCount:0 }

document.addEventListener("click", (event) => {
    if (event.target.dataset.icon) {
        addToMenu(event.target.dataset.icon)
    } else if (event.target.dataset.delete) {
        removeItemFromOrder(event.target.dataset.delete)
    }
})

function addToMenu(e){
    const pizzaItem = x.pizzaCount
    const addItem = menuArray.filter(item=> item.id == e )[0]
    menuEl.innerHTML+= `
        <div class="orders" id="${addItem.id}">
        
            <div class="itemAdded">
                <h3>${addItem.name} <small>x${pizzaItem}</small></h3>
                <button class='delete' data-delete="${addItem.id}">remove</button>
                <h5>$${addItem.price}</h5>
                
            </div>
        </div>`
    totalAmmount(addItem.price, addItem.id, addItem.name)
    removeItemFromOrder(addItem.id)
}

function removeItemFromOrder(e){
    console.log("item is deleted", e)

}
function totalAmmount(price, id, name) {
    allAmmount.push(price)
    let totalPrice = allAmmount.reduce(function(first, last){
        return first+last
    })
    totalPriceList(totalPrice)
    // console.log(total)
    // payment(totalPrice,allAmmount,price, id, name)
}

// function payment(totalPrice,allAmmount,price, id, name) {
//     console.log(totalPrice,allAmmount,price, id, name)
//     // totalPrice(e)
// }
function totalPriceList(e){
    totalEl.innerHTML = `
    <hr class='hrPriceList'>
    <div class='totalPriceList'>
        <h3>Total Price:</h3>
        <p>$${e}</p>
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
