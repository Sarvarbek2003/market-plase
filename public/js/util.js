const backendApi = 'http://localhost:3333'      
async function request (route, method, body) {
	let headers = {
		
	}
	
	if( !(body instanceof FormData) ) {
		headers['Content-Type'] = 'application/json'
	}

	let response = await fetch(route, {
		headers,
		method,
		body: (body instanceof FormData) ? body : JSON.stringify(body)
	})

	if(!(response.status === 200 || response.status === 201)) {
		response = await response.json()
		appendAlert(response.message, 'danger')
        return false
	}

	return await response.json()
}

function createElements (...array) {
	return array.map(el => document.createElement(el))
}

function getDatesByMonthInterval(totalAmount, interval, customDate) {
	const dates = [];
	let currentDate = new Date();
	let day = 2592000000
	for (let i = 0; i < interval; i += 1) {
		currentDate = new Date(currentDate.getTime() + day)
		let date = new Date(customDate ? customDate: Date.now()).getDate().toString().padStart(2, '0') 
		let month = (currentDate.getMonth() + 1).toString().padStart(2, '0') 
		let year = currentDate.getFullYear() 
		dates.push(`${date}.${month}.${year}`)
	}

	const paymentPerMonth = Math.floor(totalAmount / dates.length); // Butun qism
	const payments = new Array(dates.length).fill(paymentPerMonth); // Hamma oylar uchun dastlabki to'lov qiymatlari
	
	// Qoldiq qiymatni oxirgi oydagi to'lovga qo'shamiz
	const lastPayment = totalAmount - paymentPerMonth * (dates.length - 1);
	payments[dates.length - 1] = lastPayment;
  
	return {dates, payments};
}
  
const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
const appendAlert = (message, type) => {
	const wrapper = document.createElement('div')
	wrapper.innerHTML = [
		`<div class="alert alert-${type} alert-dismissible" role="alert">`,
		`   <div>${message}</div>`,
		'   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
		'</div>'
	].join('')
	alertPlaceholder.append(wrapper)
}