let searchUniqueIdinput = document.getElementById('search-uniqueid')
let searchBtn = document.getElementById('search-u-btn')
let isLoan = false
let month = 3
let procuct_id
searchBtn.onclick = async() => {
    renderProductSingle()
}

document.querySelectorAll('#paymentType').forEach( el => {
    el.onclick = () => {
        dropdown.textContent = el.textContent
        if(el.value == 2) {
            document.getElementById('dropdown2').removeAttribute('disabled')
            document.getElementById('input_price').removeAttribute('disabled')
            document.getElementById('dateTime').removeAttribute('disabled')
            input_price.value = null
            isLoan = true
            input_price.placeholder = 'Boshlang\'ich to\'lov'
            document.getElementById('customRange2').removeAttribute('disabled', 'disabled')
        } else {
            isLoan = false
            input_price.disabled = true
            document.getElementById('dropdown2').setAttribute('disabled', 'disabled')
            customRange2.disabled = true
        }
    } 
})

dateTime.onchange = () => {
    resultRender()
    validateInputs(true)
}

order_price.onkeyup = () => {
    validateInputs(true)
    if(!isLoan) {
        input_price.value = order_price.value
    }
}

input_price.onkeyup = () => {
    resultRender()
    validateInputs(true)
}

order_vendor.onkeyup = () => {
    validateInputs(true)
}

floatingTextarea2.onkeyup = () => {
    validateInputs(true)
}

document.getElementById('customRange2').addEventListener('wheel', (event) => {
    if(event.deltaY > 0) {
        customRange2.value = Number(customRange2.value) - 1
    } else customRange2.value = Number(customRange2.value) + 1
    range_value.textContent = customRange2.value 
    resultRender()
    validateInputs(true)
})

customRange2.oninput = () => {
    range_value.textContent = customRange2.value 
    resultRender()
}

function resultRender () {
    let different = Number(order_price.value) - Number(input_price.value)
    let procent = (different / 100) *  Number(customRange2.value)
    let result =( different + procent ) / month
    let dates = getDatesByMonthInterval(different + procent, month, dateTime.value)
    let txt = `Oylik to'lov: ${result.toLocaleString('ru')}\n\n` 
    dates.dates.map( (el, index) => {
        console.log(`${el} - ${dates.payments[index]}\n`);
        txt += `${el} - ${dates.payments[index].toLocaleString('ru')}\n`
    })
    floatingTextarea2.value = txt
}

document.querySelectorAll('#monthCount').forEach( el => {
    el.onclick = () => {
        dropdown2.textContent = el.textContent
        month = el.value
        resultRender()
    } 
})

async function renderProductSingle() {
    if(!searchUniqueIdinput.value) {
        searchUniqueIdinput.style="border: 1px solid red;"
        return
    } else  searchUniqueIdinput.style=""

    let response = await request('market/product/'+ searchUniqueIdinput.value)
    let item = response.data
    if(!Object.keys(item).length) {
        document.querySelector('.product_list-items').innerHTML = `<p class="font-monospace opacity-75 text-center">Maxsulot topilmadi</p>`
        return 
    }
    document.querySelector('.product_list-items').innerHTML = null
    document.querySelector('.product_list-items').style = ''
    document.getElementById('order_vendor').removeAttribute('disabled')
    document.getElementById('order_price').removeAttribute('disabled')
    document.getElementById('floatingTextarea2').removeAttribute('disabled')
    document.getElementById('dropdown').removeAttribute('disabled')
    let [ 
        div1, div2, img, div3, div4, div5, h6, p, p2, small
    ] = createElements('div', 'div', 'img', 'div', 'div', 'div', 'h6', 'p', 'p', 'small')
    
    div1.className = 'card' 
    div2.className = 'card__row'
    div3.className = 'card__row__image'
    div4.className = 'card__content'
    div5.className = 'card-body'
    h6.className = 'card-title'
    small.className = 'text-body-secondary'

    small.textContent = `ID: ${item.uniqueid}`
    p.textContent = `${item.sell_price} ${item.currency}` 
    h6.textContent = item.name
    img.src = item.photo

    order_price.value = item.sell_price
    input_price.value = item.sell_price
    procuct_id = item.id
    
    div5.append(h6, p)
    item.parametrs.forEach( el => {
        let [ p ] = createElements('p')
        p.textContent = `${el.key}: ${el.value}`
        p.style = 'margin-bottom: 1px;'
        div5.append(p)
    })
    p2.append(small)
    div5.append(p2)
    div4.append(div5)
    div3.append(img)
    div2.append(div3, div4)
    div1.append(div2)
    document.querySelector('.product_list-items').append(div1)
}

document.querySelector('#create_order').onclick = async () => {
    let response = await request('/market/product', "POST", 
        {
            "vendor": order_vendor.value,
            "comment": floatingTextarea2.value,
            "is_loan": isLoan,
            "month": month,
            "initial_payment": Number(input_price.value),
            "payment_day": new Date(dateTime.value ? dateTime.value : new Date()).getDate(),
            "price": Number(order_price.value),
            "proc": Number(input_price.value),
            "product_id": procuct_id
        }
    )

    if(response) {
        location.reload();
    }
}

fix.onmousemove	 = () => {
    if(!validateInputs())  fix.disabled = true
}

function validateInputs (check = false) {
    let access = true
    if(!order_vendor.value && !check) {
        order_vendor.style = 'border: 1px solid red;'
        access = false
    } else order_vendor.style = ''
    if(!floatingTextarea2.value && !check) {
        floatingTextarea2.style = 'border: 1px solid red; height: 200px;'
        access = false
    } else floatingTextarea2.style = 'height: 200px;'
    if(!input_price.value && !check) {
        input_price.style = 'border: 1px solid red;'
        access = false
    } else input_price.style = ''
    if(!order_price.value && !check) {
        order_price.style = 'border: 1px solid red;'
        access = false
    } else order_price.style = ''
    if(!input_price.value && !check) {
        input_price.style = 'border: 1px solid red;'
        access = false
    } else input_price.style = ''

    if(access) fix.disabled = false
    return access
}

