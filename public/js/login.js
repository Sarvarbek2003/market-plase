document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Formani avtomatik yuborilishini oldini oladi
    let username = document.getElementById('loginEmail').value;
    let password = document.getElementById('loginPassword').value;

    if (username && password) {
        let response = await request('/auth/login', "POST", {
            login: username,
            password: password
        })
        if(response) {
            let me = await request('/auth/me', "GET")
            window.localStorage.setItem('user', JSON.stringify(me))
            window.localStorage.setItem('token', response.token)
            window.location = '/'
        }
    } 
});