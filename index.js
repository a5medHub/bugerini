import { menuArray } from "./data.js"

const menuEl = document.getElementById("menu")
const paymentEl = document.getElementById("payment")
const totalEl = document.getElementById("total")
const allAmmount = []
const x = {pizzaCount:0, burgerCount:0, beerCount:0 }

document.addEventListener("click", (event) => {
    if (event.target.dataset.icon) {
        if(event.target.dataset.icon == 0){
            x.pizzaCount+=1
            addToMenu(event.target.dataset.icon,x.pizzaCount)
        }else if(event.target.dataset.icon == 1){
            x.burgerCount+=1
            addToMenu(event.target.dataset.icon,x.burgerCount)
        }else if(event.target.dataset.icon == 2){
            x.beerCount+=1
            addToMenu(event.target.dataset.icon,x.beerCount)
        }
        
    } else if (event.target.dataset.delete) {
        removeItemFromOrder(event.target.dataset.delete)
    }
})

function addToMenu(e, counter){
    if(counter<5 ){
        const addItem = menuArray.filter(item=> item.id == e )[0]  
        let theHtmlRender =`
            <div class="orders" id="${addItem.id}">
            
                <div class="itemAdded">
                    <h3>${addItem.name} <small class="${addItem.name}">x${counter}</small></h3>
                    <button class='delete' data-delete="${addItem.id}">remove</button>
                    <h5>$${addItem.price}</h5>
                    
                </div>
            </div>`
        paymentEl.innerHTML += theHtmlRender
            totalAmmount(addItem.price, addItem.id, addItem.name)
        }
    // else{
    //     // document.querySelector(".counter").innerHTML = `x${counter}`;
    // }
}


// function removeItemFromOrder(e){
//     if(e == 0){
//         x.pizzaCount-=1
//         totalAmmount(price-x.pizzaCount)
//     }
//     console.log("item is deleted", e)

// }
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
    // totalEl.innerHTML = 

}
render()
