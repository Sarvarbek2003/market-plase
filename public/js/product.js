;(async()=> {
    let response = await request('/product/categories', 'GET')
    renderCategory(response.result)
})()
let product_id 
send_telegram.onclick = async() => {
    let response = await request('/market/send/' + product_id, 'GET')
    if(response.result == 'ok') {
        appendAlert('Xabar telegramga yuborildi', 'success')
    }
}

async function renderCategory (items) {
    for (const item of items) {
        let [ div, h2, button, div2 ] = createElements('div', 'h2', 'button', 'div') 
        div.className = 'accordion-item'
        h2.className = 'accordion-header'
        button.className = 'accordion-button collapsed'
        div2.className = 'accordion-collapse collapse'

        div2.setAttribute('data-bs-parent', '#accordionFlushExample')
        button.setAttribute('data-bs-toggle', 'collapse')
        button.setAttribute('data-bs-target', '#'+item.id)
        button.setAttribute('aria-controls', item.id)
        button.setAttribute('aria-expanded', 'false')

        div2.id = item.id
        button.textContent = item.name
        button.disabled = !item.is_active
        button.onclick = async () => {
            if(div2.children.length) return
            div2.innerHTML = null
            let response = await request('/product/parametrs/' + item.id, 'GET')
            for (const p of response.result) {
                let [ div ] = createElements('div')
                div.onclick = () => renderProductsForCard(p.id)
                div.className = 'accordion-body'
                div.style = 'cursor: pointer;'
                div.textContent = p.name
                div2.append(div)
            }
        }
        h2.append(button)
        div.append(h2, div2)
        accordionFlushExample.append(div)
    }
}

async function renderProductsForCard(id) {
    document.querySelector('.row').innerHTML = null
    let response = await request('/product/' + id, 'GET')
    for (const item of response.result) {
        let  [
            div1, div2, img, div3, h5, p, div4, small, img2
        ] = createElements('div','div', 'img', 'div', 'h5', 'p', 'div','small', 'img')

        div1.className = 'col'
        div2.className = 'card h-100'
        div3.className = 'card-body'
        div4.className = 'card-footer'
        h5.className = 'card-title'
        p.className = 'card-text'
        img.className = 'card-img-top'
        img2.className = 'telegram-icon'
        small.className = 'text-body-secondary'
        p.style = 'margin-bottom: 1px;font-weight: 700;'

        img.src = item.photo
        img2.src = 'files/telegram-icon.svg'
        h5.textContent = item.name 
        p.textContent = Number(item.sell_price).toLocaleString() + ` ${item.currency}\n`
        small.textContent = `ID: ${item.uniqueid}`

        img2.setAttribute('data-bs-toggle','modal')
        img2.setAttribute('data-bs-target','#exampleModal')

        div3.append(h5, p)
        let txt = `<pre>Narxi: ` + Number(item.sell_price).toLocaleString() + ` ${item.currency}\n`
        item.parametrs.map(el =>  {
            let [p] = createElements('p')
            p.className = 'card-text'
            p.textContent = `${el.key}-${el.value}`
            txt += `${el.key}-${el.value}\n`
            p.style = 'margin-bottom: 1px;'
            div3.append(p)
           
        })

        img2.onclick = () => {
            product_id = item.id
            document.querySelector('.modal-body').innerHTML = txt + '</pre>'
        }
        small.onclick = () => {
            navigator.clipboard.writeText(item.uniqueid)
            appendAlert('ID dan nusxa olindi', 'success')
        }

       

        div4.append(small, img2)
        div2.append(img, div3, div4)
        div1.append(div2)
        document.querySelector('.row').append(div1)
    }
}
