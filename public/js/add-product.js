let fields = []
let inputGroup = document.querySelector('.dinamic-input__continer')
let cardBody = document.querySelector('.card-dinamic-body')
let saveProduct = document.getElementById('save_product')
let fileInput = document.getElementById('inputGroupFile04')
let parametrs = []

let fileData = null
;(async () => {
    let response = await request('/product/categories', 'GET')
    let response2 = await request('/product/parametrs/' + response.result[0].id, 'GET')
    let response3 = await request('/product/' + response2.result[0].id, 'GET')
    response3.result.forEach( el => renderProducts(el))
    fields = response2.result
    renderCategory(response.result)
    renderTemplate(response2.result)
    inputRender(response2.result[0])
})()

function renderCategory(array) {
    for (const item of array) {
        let [ option ] = createElements('option')
        option.value = item.id
        option.textContent = item.name
        inputGroupSelect01.append(option)
    }
}

function renderTemplate(array) {
    for (const item of array) {
        let [ option ] = createElements('option')
        option.value = item.id
        option.textContent = item.name
        inputGroupSelect02.append(option)
    }
}

document.getElementById('inputGroupSelect01').onchange = async() => {
    let response = await request('/product/parametrs/' + inputGroupSelect01.value, 'GET')
    fields = response.result
    inputGroupSelect02.innerHTML = null
    cardBody.innerHTML = null
    inputGroup.innerHTML = null
    renderTemplate(response.result)
    inputRender(response.result[0])
}

document.getElementById('inputGroupSelect02').onchange = () => {
    let field = fields.find(el => el.id == inputGroupSelect02.value)
    inputGroup.innerHTML = null
    cardBody.innerHTML = null
    inputRender(field)
}

function inputRender(field) {
    for (const item of field?.parametrs) {
        if(['price', 'product_name'].includes(item.key)) {
            if (item.key == 'product_name') document.querySelector('.card-title_child-key').textContent = `${item.value}: `
            if (item.key == 'price') {
                let  [p, span, span2] = createElements('p', 'span', 'span')
                span.textContent = `${item.value}: `
                span2.className = 'sell_input'
                p.style = 'margin-bottom: 1px;'
                p.append(span, span2)
                cardBody.append(p)
            }
            continue
        } 
        let [div, span, input, p, span2, span3] = createElements('div', 'span', 'input', 'p', 'span', 'span')
        div.className = 'input-group mb-3'
        span.className = 'input-group-text'
        input.className = 'form-control'
        input.id = item.key
        input.onkeyup = () => {
            span3.textContent = input.value
            if(parametrs.find(e => e.key == item.value)) {
                parametrs.map(e => {
                    if(e.key == item.value) e.value = input.value
                })
            } else {
                parametrs.push({
                    key: item.value,
                    value: input.value
                })
            }
        }
        span.textContent = item.value
        span2.textContent = `${item.value}: `
        span3.className = 'template-text'
        p.append(span2, span3)
        p.style = 'margin-bottom: 1px;'
        div.append(span, input)
        inputGroup.append(div)
        cardBody.append(p)
    }

    let  [p, small, span, span1] = createElements('p', 'small', 'span', 'span')
    span.textContent = 'ID: '
    span1.className = 'uniqueid'
    small.append(span, span1)
    small.className = "text-body-secondary"
    p.append(small)
    cardBody.append(p)
}

saveProduct.onclick = () => {    
    let access = true
    document.querySelectorAll('input').forEach(element => {
        if(!element.value) {
            element.style = 'border: 1px solid red;'
            access = false
        } else {
            element.style = ''
        }
      
    })
    if(!access) return 
    if(addProduct()) return
    // document.querySelectorAll('input').forEach(element => {
    //     element.value = null
    // })
    // let arr = ['sell_input', 'product_name', 'uniqueid']
    // arr.forEach(el => {
    //     document.querySelector(`.${el}`).textContent = null
    // })
    // document.querySelectorAll('.template-text').forEach(e => e.textContent = null)
    // setImage.srcset = './files/background.jpg'
}

currency.onclick = () => {
    currency.textContent = currency.textContent == 'USD' ? 'UZS' : 'USD'
}

cancel_photo.onclick = () => {
    fileInput.value = null
}

document.querySelectorAll('.form-control').forEach(el => {
    el.onkeyup = () => {
        if(['product_name', 'uniqueid'].includes(el.id)) document.querySelector(`.${el.id}`).textContent = el.value
        else if (['buy_input','proc_input'].includes(el.id)) {
            sell_input.value = +buy_input.value + ((+buy_input.value / 100) * +proc_input.value)
            document.querySelector(`.sell_input`).textContent = sell_input.value
        }
    }
    el.onchange = (data) => {
        if (['buy_input','proc_input'].includes(el.id)) {
            sell_input.value = +buy_input.value + ((+buy_input.value / 100) * +proc_input.value)
            document.querySelector(`.sell_input`).textContent = sell_input.value
        } else if (el.id == 'inputGroupFile04') {
            let file = data.target.files[0]
            let render = new FileReader()
            fileData = file
            render.onload = function (e) {
                setImage.srcset = e.target.result
            }
            render.readAsDataURL(file)
        }
    }
})

async function addProduct() {
    let subcategory_id = document.getElementById('inputGroupSelect02').value
    let formData = new FormData()
    formData.append('subcategory_id', subcategory_id)
    formData.append('name', product_name.value)
    formData.append('uniqueid', uniqueid.value)
    formData.append('buy_price', buy_input.value)
    formData.append('sell_price', sell_input.value)
    formData.append('currency', currency.textContent)
    formData.append('parametrs', JSON.stringify(parametrs))
    formData.append('files', fileData)
    let response = await request('/product', 'POST', formData)
    console.log('response', response);
    if(response) {
        location.reload()
        // renderProducts({
        //     name: product_name.value,
        //     sell_price: sell_input.value,
        //     parametrs: parametrs,
        //     photo: setImage.srcset,
        //     uniqueid: uniqueid.value
        // })
    } else {
        return false
    }
}   

async function renderProducts (item) {

    let [ 
        div1, div2, picture, source, img, div3, div4, h6, p, p2, small, span
    ] = createElements('div', 'div', 'picture', 'source', 'img', 'div', 'div', 'h6', 'p', 'p', 'small', 'span', 'span')
    
    div1.className = 'card mb-3'
    div2.className = 'row g-0'
    picture.className = 'col-md-3'
    source.srcset = item.photo
    source.type = "image/jpg"
    img.className="img-fluid"
    img.setAttribute('accept', 'image/*')
    img.setAttribute('width', '300')
    div3.className = 'col-md-8'
    div4.className = 'card-body'
    h6.className = 'card-title'
    h6.textContent = item.name
    p.textContent = item.sell_price + ' ' + item.currency
    div4.append(h6, p)
    item.parametrs.forEach( el => {
        let [p] = createElements('p')
        p.textContent = `${el.key}: ${el.value}`
        p.style = 'margin-bottom: 1px;'
        div4.append(p)
    })

    span.textContent = 'ID: '+ item.uniqueid
    small.append(span)
    small.className = "text-body-secondary"
    p2.append(small)
    div4.append(p2)
    picture.append(source, img)
    
    div3.append(div4)
    div2.append(picture, div3)
    div1.append(div2)
    document.querySelector('.product-list').append(div1)
}