import {
    menuArray
} from "./data.js"
import {
    v4 as uuidv4
} from 'https://jspm.dev/uuid';

const menuEl = document.getElementById("menu")
const paymentEl = document.getElementById("payment")
const totalEl = document.getElementById("total")
const testBtn = document.getElementById("test")
const allData = []
const priceOfId = {}
let totalPriceListCounter = 0

document.addEventListener("click", (event) => {
    if (event.target.dataset.icon) {
        addToMenu(event.target.dataset.icon)

    } else if (event.target.dataset.delete) {
        removeItemFromOrder(event.target.dataset.delete)
    }
})

testBtn.addEventListener("click", (event) => {
    let numberX = Math.floor(Math.random(allData) * allData.length)
    const randomData = allData.map((e) => {
        return e[0]
    })
    console.log("random number to value", numberX, randomData[numberX])
})

function removeItemFromOrder(id) {
    const order = document.getElementById(id)
    totalPriceListCounter -= 1
    const removeItemPriceFromList = Object.entries(priceOfId).forEach(function (e) {
        if (e[0] == order.id) {
            console.log("item found: ", order.id, "Price is: ", e[1])
        }
    })
    if (totalPriceListCounter >= 1) {
        order.innerHTML = ''
    } else {
        order.innerHTML = ''
        totalEl.innerHTML = ''
        priceOfId = {}
        window.location.reload()
    }
}

function addToMenu(e, counter) {
    let id = uuidv4()
    const addItem = menuArray.filter(item => item.id == e)[0]
    let theHtmlRender = `
            <div class="orders" id="${id}">
                <div class="itemAdded">
                    <h3>${addItem.name} <!--<small class="${addItem.name}">x${counter}</small>--></h3>
                    <button class='delete' data-delete="${id}" >remove</button>
                    <h5>$${addItem.price}</h5>
                </div>
            </div>`
    priceOfId[id] = addItem.price
    paymentEl.innerHTML += theHtmlRender
    totalAmmount(id, addItem.price, addItem.name, addItem.id)
}

function totalAmmount(uid, price, name, id) {
    let pair = [uid, price]
    allData.push(pair)
    console.log(allData)
    const itemsPriceSum = allData.map(function (item) {
            return item[1]
        })
        .reduce(function (first, last) {
            return first + last
        })
    totalPriceList(itemsPriceSum)

    // console.log(itemsPriceSum)
    // allData.push(price)
    // let totalPrice = allData.reduce(function(first, last){
    //     return first+last
    // })
    // totalPriceList(totalPrice)
    // payment(totalPrice,allData,price, id, name)
}

function totalPriceList(itemPrice) {
    totalPriceListCounter += 1
    totalEl.innerHTML = `
    <hr class='hrPriceList'>
    <div class='totalPriceList'>
        <h3>Total Price:</h3>
        <p>$${itemPrice}</p>
    </div>
    <button class="submitOrder">Complete order</button>`
}

function getMenuItems() {
    return menuArray.map(e => {
        return `
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