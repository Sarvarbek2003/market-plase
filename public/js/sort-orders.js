let tBody = document.querySelector('.table-group-divider')
let tHead = document.querySelector('.table-dark')
let trDinmaic = document.querySelector('.dinamic-tr')
let type = 'all'
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
    let respone = await request(`/market/products?size=${inputGroupSelect0102.value}&page=1`)
    renderDataForTable(respone)
    paginateRender(respone)
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

function paginateRender(data) {
    document.querySelector('.pages-items').innerHTML =null
    prev_btn.disabled = !data.hasPreviousPage
    next_btn.disabled = !data.hasNextPage
    prev_btn.onclick = async() => {
        let respone = await request('/market/products?type='+ type + `&page=${data.currentPage - 1}&size=${inputGroupSelect0102.value}`)
        prev_btn.disabled = !respone.hasPreviousPage
        next_btn.disabled = !respone.hasNextPage
        renderDataForTable(respone)
        paginateRender(respone)
    }

    let limit = data.totalPage > 3 ? 3 : data.totalPage
    for (let i = data.currentPage; i <= limit + data.currentPage - 1; i++ ) { 
        let [div, btn] = createElements('div', 'button')       
        div.className = 'page-item'
        btn.className = 'page-link'
        btn.disabled = data.totalPage >= i ? false : true
        btn.textContent = i
        div.append(btn)
        div.onclick = async () => {
            let respone = await request('/market/products?type='+ type + `&page=${i}&size=${inputGroupSelect0102.value}`)
            prev_btn.disabled = !respone.hasPreviousPage
            next_btn.disabled = !respone.hasNextPage
            renderDataForTable(respone)
            paginateRender(respone)
        }
        document.querySelector('.pages-items').append(div)
    }

    next_btn.onclick = async() => {
        let respone = await request('/market/products?type='+ type + `&page=${data.currentPage +1}&size=${inputGroupSelect0102.value}`)
        next_btn.disabled = !respone.hasNextPage
        prev_btn.disabled = !respone.hasPreviousPage
        renderDataForTable(respone)
        paginateRender(respone)
    }
}


// <li class="page-item"><a class="page-link" style="cursor: pointer;">1</a></li>
// <li class="page-item"><a class="page-link" style="cursor: pointer;">2</a></li>
// <li class="page-item"><a class="page-link" style="cursor: pointer;">3</a></li>
// <li class="page-item">
// <a class="page-link" style="cursor: pointer;" aria-label="Next">
//   <span aria-hidden="true">&raquo;</span>
// </a>
// </li>

document.querySelectorAll('.btn-list .btn').forEach(btn => {
    btn.onclick = async () => {
        document.querySelectorAll('.btn-list .btn').forEach(e => e.style = 'border: 0px solid black;')
        btn.style = 'border: 2px solid black;'
        placeholderRunner()
        type = btn.id
        let respone = await request('/market/products?type='+ btn.id + `&page=${1}&size=${inputGroupSelect0102.value}`)
        renderDataForTable(respone)
        paginateRender(respone)
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
