document.addEventListener("DOMContentLoaded", function() {
    
    // document.getElementById("header").innerHTML = `
  
    //     <nav class="navbar navbar-expand-lg bg-body-tertiary">
    //         <div class="container-fluid">
    //             <a class="navbar-brand" href="/">Sotuv bo'lmi</a>
    //             <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    //                 <span class="navbar-toggler-icon"></span>
    //             </button>
    //             <div class="collapse navbar-collapse" id="navbarNav">
    //                 <ul class="nav nav-tabs">
    //                 <li class="nav-item">
    //                     <a class="nav-link"  href="/create">Shablon yaratish</a>
    //                 </li>
    //                 <li class="nav-item">
    //                     <a class="nav-link" href="/create-category">Turkum yaratish</a>
    //                 </li>
    //                 <li class="nav-item">
    //                     <a class="nav-link" href="/add-product">Mahsulot qo'shish</a>
    //                 </li>
    //                 </ul>
    //             </div>
    //         </div>
    //     </nav>
        
    // `;

    let [
        nav, div, a, button, span, div2, ul, li1, a1, li2, a2, li3, a3, li4, a4
    ] = createElements('nav', 'div', 'a', 'button', 'span', 'div','ul','li', 'a', 'li', 'a', 'li', 'a', 'li', 'a')
    nav.className = "navbar navbar-expand-lg bg-body-tertiary"
    div.className = "container-fluid"
    a.className = "navbar-brand"
    a.href = '/'
    a.textContent = 'Sotuv bo\'lmi'
    button.className = 'navbar-toggler'
    button.type = 'button'
    button.setAttribute('data-bs-toggle', 'collapse')
    button.setAttribute('data-bs-target', '#navbarNav')
    button.setAttribute('aria-controls', 'navbarNav')
    button.setAttribute('aria-expanded', 'false')
    span.className = 'navbar-toggler-icon'
    div2.className = 'collapse navbar-collapse'
    div2.id = 'navbarNav'
    ul.className = 'nav nav-tabs'
    li1.className = 'nav-item'
    li2.className = 'nav-item'
    li3.className = 'nav-item'
    li4.className = 'nav-item'
    a1.className = window.location.pathname == '/create' ? 'nav-link active' : 'nav-link'
    a1.href = '/create'
    a1.textContent = 'Shablon yaratish'
    a2.className = window.location.pathname == '/create-category' ? 'nav-link active' : 'nav-link'
    a2.textContent = 'Turkum yaratish'
    a2.href = '/create-category'
    a3.className =  window.location.pathname == '/add-product' ? 'nav-link active' : 'nav-link'
    a3.textContent = 'Mahsulot qo\'shish'
    a3.href = '/add-product'
    a4.className =  window.location.pathname == '/products' ? 'nav-link active' : 'nav-link'
    a4.textContent = 'Maxsulotlar'
    a4.href = '/products'
    li1.append(a1)
    li2.append(a2)
    li3.append(a3)
    li4.append(a4)
    ul.append(li1, li2, li3, li4)
    div2.append(ul)
    button.append(span)
    div.append(a, button, div2)
    nav.append(div)

    document.getElementById("header").append(nav)
});

