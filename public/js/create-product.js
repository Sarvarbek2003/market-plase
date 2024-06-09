;(async()=> {
    let response = await request('/product/categories', 'GET')
    render(response.result)
})()

save.onclick = () => {
    let inputs = document.querySelectorAll('#add_input')
    let array = [
        {
            key: 'product_name',
            value: product_name.value
        },
        {
            key: 'price',
            value: price.value
        }
    ]
    inputs.forEach((element, index) => {
        if(!element.value.trim()) return
        array.push({
            key: index.toString(),
            value: element.value
        })
    });
    created(array, inputGroupSelect01.value);
}

function render(array) {
    for (const item of array) {
        let [ option ] = createElements('option')
        option.value = item.id
        option.textContent = item.name
        inputGroupSelect01.append(option)
    }
}

async function created(array, category_id) {
    if(!model.value) {
        model.style = 'border: 1px solid red;'
        return 
    } else model.style = ''

    let respone = await request('/product/parametr', 'POST', {
        "name": model.value,
        "category_id": Number(category_id),
        "parametrs": array
    })

    console.log(respone);
}