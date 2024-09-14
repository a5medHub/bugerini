import { menuArray } from "./data.js"
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

const menuEl = document.getElementById("menu")
const paymentEl = document.getElementById("payment")
const totalEl = document.getElementById("total")
const allAmmount = []
let totalPriceListCounter = 0
// let theHtmlRender = []
let priceOfId = {}

document.addEventListener("click", (event) => {
    if (event.target.dataset.icon) {
        addToMenu(event.target.dataset.icon)
       
    } else if (event.target.dataset.delete) {
        removeItemFromOrder(event.target.dataset.delete)
    }
})

function addToMenu(e, counter){
    let id = uuidv4()
    const addItem = menuArray.filter(item=> item.id == e )[0] 
    let theHtmlRender =`
            <div class="orders" id="${id}">
                <div class="itemAdded">
                    <h3>${addItem.name} <!--<small class="${addItem.name}">x${counter}</small>--></h3>
                    <button class='delete' data-delete="${id}" >remove</button>

                    <h5>$${addItem.price}</h5>
                </div>
            </div>`
            priceOfId[id] = addItem.price
            // console.log(id)
            // console.log(priceOfId)
            paymentEl.innerHTML += theHtmlRender
            
            totalAmmount(addItem.price, addItem.id, addItem.name, id)


    
}


function removeItemFromOrder(id){
    const order = document.getElementById(id)
    totalPriceListCounter-=1

    // console.log(priceOfId)
    // console.log(priceOfId[order.id])
    // console.log(order.id)
    const removeItemPriceFromList = Object.entries(priceOfId).forEach(function(e){
        if(e[0] == order.id){
        console.log("item found: ", order.id, "Price is: ", e[1])
        console.log("all ammount before: ",allAmmount)
        allAmmount.splice(e[1],1)
        console.log("all ammount after: ",allAmmount)

        }
        // console.log(allAmmount)
        
    })

    if(totalPriceListCounter>=1){
        order.innerHTML = ''
        
    }else{
        order.innerHTML = ''
        totalEl.innerHTML = ''
        priceOfId = {}
        // allAmmount = []
    }

}
function totalAmmount(price, id, name, removeId) {
    // console.log("removeId: ",removeId)
    allAmmount.push(price)
    let totalPrice = allAmmount.reduce(function(first, last){
        return first+last
    })
    totalPriceList(totalPrice)
    // payment(totalPrice,allAmmount,price, id, name)
}

function totalPriceList(e){
    totalPriceListCounter+=1
    totalEl.innerHTML = `
    <hr class='hrPriceList'>
    <div class='totalPriceList'>
        <h3>Total Price:</h3>
        <p>$${e}</p>
    </div>
    <button class="submitOrder">Complete order</button>`
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
