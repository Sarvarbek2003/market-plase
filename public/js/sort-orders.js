let tBody = document.querySelector('.table-group-divider')
let tHead = document.querySelector('.table-dark')
let trDinmaic = document.querySelector('.dinamic-tr')
let tdElemtnNames = {
    name: 'Name',
    buy_sell: 'Buy price',
    sell_price: 'Sell price',
    uniqueid: 'ID',
    vendor: 'Vendor',
    created_at: 'Time',
    month: 'Month',
    comment: "Comment",
    payment_day: 'Payment day',
    description: 'Description',
    last_payment_date: 'Last payment'
}
;(async()=> {
    let respone = await request('/market/products')
    renderDataForTable(respone)
})()

function renderDataForTable(data) {
    tBody.innerHTML = null
    trDinmaic.innerHTML = null
    if(!data.isOrder) {
        renderProductsForTable(data.data)
    } else {
        renderOrdersForTable(data.data)
    }
}

document.querySelectorAll('.btn-list .btn').forEach(btn => {
    btn.onclick = async () => {
        document.querySelectorAll('.btn-list .btn').forEach(e => e.style = 'border: 0px solid black;')
        btn.style = 'border: 2px solid black;'
        placeholderRunner()
        let respone = await request('/market/products?type='+ btn.id)
        renderDataForTable(respone)
    }
})

function renderOrdersForTable(list) {
    renderTdElement(list[0])
    list.map( (item, index) => {
        let [tr, th] = createElements('tr', 'th')
        th.textContent = index + 1
        tr.append(th)
        for (const key of Object.keys(item)) {
            if(!tdElemtnNames[key]) continue
            let [td] = createElements('td')
            td.innerHTML = renderTextContent(item, key)     
            if(key == 'comment') td.onclick = () => {
                comment_model.textContent = item[key]
            }      
            tr.append(td)
        }
        tBody.append(tr)
    })
}

function renderProductsForTable(list) {
    renderTdElement(list[0])
    list.map( (item, index) => {
        let [tr, th] = createElements('tr', 'th')
        th.textContent = index + 1
        tr.append(th)
        for (const key of Object.keys(item)) {
            let [td] = createElements('td')
            td.innerHTML = renderTextContent(item, key)    
            if(key == 'comment') td.onclick = () => {
                comment_model.textContent = item[key]
            }    
            tr.append(td)
        }
        tBody.append(tr)
    })
}

function renderTdElement (item) {
    let [th] = createElements('th')
    th.scope = 'col'
    th.textContent = '№'
    trDinmaic.append(th)
    for (const el of Object.keys(item)) {
        if(!tdElemtnNames[el]) continue
        let [th] = createElements('th')
        th.scope = 'col'
        th.textContent = tdElemtnNames[el]
        trDinmaic.append(th)
    }
}

function renderTextContent (item, key) {
    if(['created_at', 'last_payment_date'].includes(key)) {
        return new Date(item[key]).toLocaleString('ru')
    } else if(['comment'].includes(key)) {
        return `<img style="cursor: pointer;" width="20" src="./files/background.jpg" data-bs-toggle="modal" data-bs-target="#commentModal">`
    } else {
        return item[key]
    }
}

function placeholderRunner() {
    tBody.innerHTML = 
    `<tr>
        <th scope="row" class="placeholder-glow"><span class="placeholder col-6 bg-secondary"></span></th>
        <td scope="row" class="placeholder-glow"><span class="placeholder col-6 bg-secondary"></span></td>
        <td class="placeholder-glow"><span class="placeholder col-6 bg-secondary"></td>
        <td class="placeholder-glow"><span class="placeholder col-6 bg-secondary"></td>
        <td class="placeholder-glow"><span class="placeholder col-6 bg-secondary"></td>
        </tr>
        <tr>
        <th scope="row" class="placeholder-glow"><span class="placeholder col-6 bg-secondary"></span></th>
        <td scope="row" class="placeholder-glow"><span class="placeholder col-6 bg-secondary"></span></td>
        <td class="placeholder-glow"><span class="placeholder col-6 bg-secondary"></td>
        <td class="placeholder-glow"><span class="placeholder col-6 bg-secondary"></td>
        <td class="placeholder-glow"><span class="placeholder col-6 bg-secondary"></td>
        </tr>
        <tr>
        <th scope="row" class="placeholder-glow"><span class="placeholder col-6 bg-secondary"></span></th>
        <td scope="row" class="placeholder-glow"><span class="placeholder col-6 bg-secondary"></span></td>
        <td class="placeholder-glow"><span class="placeholder col-6 bg-secondary"></td>
        <td class="placeholder-glow"><span class="placeholder col-6 bg-secondary"></td>
        <td class="placeholder-glow"><span class="placeholder col-6 bg-secondary"></td>
        </tr>
        <tr>
        <th scope="row" class="placeholder-glow"><span class="placeholder col-6 bg-secondary"></span></th>
        <td scope="row" class="placeholder-glow"><span class="placeholder col-6 bg-secondary"></span></td>
        <td class="placeholder-glow"><span class="placeholder col-6 bg-secondary"></td>
        <td class="placeholder-glow"><span class="placeholder col-6 bg-secondary"></td>
        <td class="placeholder-glow"><span class="placeholder col-6 bg-secondary"></td>
    </tr>`
    trDinmaic.innerHTML = `
        <th class="placeholder-glow" scope="col"><span class="placeholder col-6 bg-secondary"></span></th>
        <th class="placeholder-glow" scope="col"><span class="placeholder col-6 bg-secondary"></span></th>
        <th class="placeholder-glow" scope="col"><span class="placeholder col-6 bg-secondary"></span></th>
        <th class="placeholder-glow" scope="col"><span class="placeholder col-6 bg-secondary"></span></th>
        <th class="placeholder-glow" scope="col"><span class="placeholder col-6 bg-secondary">
    `
}
