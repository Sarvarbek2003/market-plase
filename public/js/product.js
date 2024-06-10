;(async()=> {
    let response = await request('/product/categories', 'GET')
    renderCategory(response.result)
})()

{/* <div class="accordion-item">
        <h2 class="accordion-header">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#1" aria-expanded="false" aria-controls="1">
                Accordion Item #1
            </button>
        </h2>
        <div id="1" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
            <div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the first item's accordion body.</div>
        </div>
</div> */}

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
    let response = await request('/product/' + id, 'GET')
    for (const item of response.result) {
        let  [
            div1, div2, img, div3, h5, p, div4, small
        ] = createElements('div','div', 'img', 'div', 'h5', 'p', 'div','small')

        div1.className = 'col'
        div2.className = 'card h-100'
        div3.className = 'card-body'
        div4.className = 'card-footer'
        h5.className = 'card-title'
        p.className = 'card-text'
        img.className = 'card-img-top'
        small.className = 'text-body-secondary'

        img.src = item.photo
        h5.textContent = item.name 
        small.textContent = `ID: ${item.uniqueid}`
        div3.append(h5)
        item.parametrs.map(el =>  {
            let [p] = createElements('p')
            p.className = 'text-body-secondary'
            p.textContent = `${el.key}-${el.value}\n`
            p.style = 'margin-bottom: 1px;'
            div3.append(p)
        })

        div4.append(small)
        div2.append(img, div3, div4)
        div1.append(div2)
        document.querySelector('.row').append(div1)
    }
}


{/* <div class="col" style="max-width: 260px;">
<div class="card h-100">
  <img src="files/login.jpg" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
  </div>
  <div class="card-footer">
    <small class="text-body-secondary">Last updated 3 mins ago</small>
  </div>
</div>
</div> */}