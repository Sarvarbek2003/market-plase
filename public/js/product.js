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
    console.log(response);
}