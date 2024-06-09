;(async() => {
    let data = await request('/product/categories', "GET")
    render (data)
})()

let cards = document.querySelector('.cards')
let addBtn = document.getElementById('add_category')

addBtn.onclick = async () => {
    if(!category_name.value) {
        category_name.style = 'border: 1px solid red;'
        return
    } else {
        category_name.style = ''
        let response = await request('/product/category', "POST" , {
            name: category_name.value
        })
        if(response) {
            let data = await response.json() 
            createElement(data)
            category_name.value = ''
        }
    }
}

function render(data) {
    let array = data.result
    for (const item of array) {
        createElement(item)
    }
}

function createElement (item) {
    let value = item.name;
    let id = item.id
    let card_div = document.createElement('div')
    let card_body = document.createElement('div')
    let h5 = document.createElement('h5')
    let button_del = document.createElement('button')
    let button_stop = document.createElement('button')
    let button_start = document.createElement('button')
    card_div.className = 'card'
    card_div.style = "width: 15rem;"
    card_body.className = 'card-body'
    h5.className = 'card-title'
    h5.textContent = value
    button_del.className = 'btn btn-danger'
    button_stop.className = 'btn btn-warning'
    button_start.className = 'btn btn-success'
    button_del.textContent = 'Delete'
    button_stop.textContent = 'Stop'
    button_start.textContent = 'Start'
    button_start.disabled = item.is_active
    button_stop.disabled = !item.is_active
    button_del.onclick = async () => {
        let response = await request('/product/category/' + id, 'DELETE')
        if(response.status == 200) card_div.remove()
    }   
    button_start.onclick = () => update({is_active: true, id, name: item.name}, button_start, button_stop)
    button_stop.onclick = () => update({is_active: false, id, name: item.name}, button_start, button_stop)
    
    card_body.append(h5, button_del, button_stop, button_start)
    card_div.append(card_body)
    cards.append(card_div)
}

async function update(params, button_start, button_stop) {
    let { is_active, id, name } = params

    let response = await request('/product/category/' + id, 'PUT', { 
        name: name, 
        is_active: is_active 
    })
    if(response) {
        appendAlert(is_active ? 'Xizmat yondi' : 'Xizmat o\'chdi', is_active ? 'success' : 'warning')
        if(is_active === true) {
            button_start.disabled = true
            button_stop.disabled = false
        } else {
            button_start.disabled = false
            button_stop.disabled = true
        }
    }
}