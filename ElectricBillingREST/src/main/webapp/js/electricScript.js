window.addEventListener('load', function(e) {
	console.log('document loaded');
	index();
	init();
});

function index() {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'api/electricbills/', true);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status == 200 || xhr.status == 201) {
				var billList = JSON.parse(xhr.responseText);
				console.log(billList);
				displayBillList(billList);
			} else {
				console.log("Unable to retrieve list of bills.");
				console.error(xhr.status + ': ' + xhr.responseText);
				list.textContent = "Unable to retrieve list of bills.";
			}
		}
	};
	xhr.send(null);
}

function displayBillList(billList) {
	var list = document.getElementById('list');
	var displayList = document.createElement('ul');
	billList.forEach(function(value) {
		var displayListItem = document.createElement('li');
		displayListItem.setAttribute('class', 'yearItem');
		displayListItem.textContent = value.year;
		displayList.appendChild(displayListItem);
		console.log(value);
		displayListItem.addEventListener('click', function(event) {
			event.preventDefault();
			console.log(value);
			var billId = value.id;
			console.log(billId);
			if (!isNaN(billId) && billId > 0) {
				getBill(billId);
			}
		});
	});
	list.appendChild(displayList);
}

function init() {
	document.billForm.lookup.addEventListener('click', function(event) {
		event.preventDefault();
		var billId = document.billForm.billId.value;
		console.log(billId);
		if (!isNaN(billId) && billId > 0) {
			getBill(billId);
		}
	});
	
	document.initCreate.initialize.addEventListener('click', function(event) {
		event.preventDefault();
		var createDiv = document.getElementById('create');
		var createForm = document.createElement('form');
		var formYear = document.createElement('input');
		formYear.setAttribute('name', 'year');
		formYear.setAttribute('type', 'number');
		
		var formCost = document.createElement('input');
		formCost.setAttribute('name', 'cost');
		formCost.setAttribute('type', 'number');
		
		var formWattage = document.createElement('input');
		formWattage.setAttribute('name', 'wattage');
		formWattage.setAttribute('type', 'number');
		
		var formFirstName = document.createElement('input');
		formFirstName.setAttribute('name', 'managerFirstName');
		formFirstName.setAttribute('type', 'text');
		
		var formLastName = document.createElement('input');
		formLastName.setAttribute('name', 'managerLastName');
		formLastName.setAttribute('type', 'text');
		
		var formSubmit = document.createElement('button');
		formSubmit.setAttribute('name', 'submit');
		formSubmit.textContent = "Submit New Bill";
		
		createForm.appendChild(formYear);
		createForm.appendChild(formCost);
		createForm.appendChild(formWattage);
		createForm.appendChild(formFirstName);
		createForm.appendChild(formLastName);
		createForm.appendChild(formSubmit);
		createDiv.appendChild(createForm);
		
		establishCreateClickEvent();
		index();
	});
};

function establishCreateClickEvent() {
	var createSubmitButton = document.getElementsByName("submit")[0];
	
	console.log(createSubmitButton);
	
	createSubmitButton.addEventListener('click', function(event) {
		event.preventDefault();
		
		console.log(createSubmitButton.parentElement);
		
		var year = createSubmitButton.parentElement.year.value;
		var cost = createSubmitButton.parentElement.cost.value;
		var wattage = createSubmitButton.parentElement.wattage.value;
		var managerFirstName = createSubmitButton.parentElement.managerFirstName.value;
		var managerLastName = createSubmitButton.parentElement.managerLastName.value;
		console.log(year + cost + wattage + managerFirstName + managerLastName);
		createBill(year, cost, wattage, managerFirstName, managerLastName);
	});
}

function createBill(year, cost, wattage, managerFirstName, managerLastName) {
	var bill = {};
	bill.year = year;
	bill.cost = cost;
	bill.wattage = wattage;
	bill.managerFirstName = managerFirstName;
	bill.managerLastName = managerLastName;

	console.log(bill);

	var billJSON = JSON.stringify(bill);

	console.log(billJSON);

	var xhr = new XMLHttpRequest();
	xhr.open('POST', 'api/electricbills/', true);
	xhr.setRequestHeader("Content-type", "application/json");
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (this.status === 200 || this.status === 201) {
				var newBill = JSON.parse(this.responseText);
				console.log(newBill);
				displayBill(newBill);
			} else {
				console.error("An error has occurred");
				console.error(xhr.status + ': ' + xhr.responseText);
			}
		}
	}
	xhr.send(billJSON);
}

function getBill(billId) {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'api/electricbills/' + billId, true);

	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status == 200 || xhr.status == 201) {
				var bill = JSON.parse(xhr.responseText);
				console.log(bill);
				displayBill(bill);
			} else {
				console.log("Bill not found.");
				console.error(xhr.status + ': ' + xhr.responseText);
				var billData = document.getElementById('display');
				billData.textContent = 'Bill not found.';
			}
		}
	};
	xhr.send(null);
}

function displayBill(bill) {
	var displayColumn = document.getElementById('display');
	var billInfo = document.createElement('table');
	billInfo.setAttribute('id', 'billTable');
	displayColumn.textContent = '';

	var billYearRow = document.createElement('tr');
	var billYearNameColumn = document.createElement('td');
	var billYearPropertyColumn = document.createElement('td');
	billYearNameColumn.textContent = "Year";
	billYearPropertyColumn.textContent = bill.year;
	billYearRow.appendChild(billYearNameColumn);
	billYearRow.appendChild(billYearPropertyColumn);
	billInfo.appendChild(billYearRow);

	var billCostRow = document.createElement('tr');
	var billCostNameColumn = document.createElement('td');
	var billCostPropertyColumn = document.createElement('td');
	billCostNameColumn.textContent = "Cost";
	billCostPropertyColumn.textContent = "$" + bill.cost;
	billCostRow.appendChild(billCostNameColumn);
	billCostRow.appendChild(billCostPropertyColumn);
	billInfo.appendChild(billCostRow);

	var billWattageRow = document.createElement('tr');
	var billWattageNameColumn = document.createElement('td');
	var billWattagePropertyColumn = document.createElement('td');
	billWattageNameColumn.textContent = "Wattage Used";
	billWattagePropertyColumn.textContent = bill.wattage;
	billWattageRow.appendChild(billWattageNameColumn);
	billWattageRow.appendChild(billWattagePropertyColumn);
	billInfo.appendChild(billWattageRow);

	var billManagerRow = document.createElement('tr');
	var billManagerNameColumn = document.createElement('td');
	var billManagerPropertyColumn = document.createElement('td');
	billManagerNameColumn.textContent = "Manager";
	billManagerPropertyColumn.textContent = bill.managerFirstName + " "
			+ bill.managerLastName;
	billManagerRow.appendChild(billManagerNameColumn);
	billManagerRow.appendChild(billManagerPropertyColumn);
	billInfo.appendChild(billManagerRow);

	displayColumn.appendChild(billInfo);
}

// function getActors(filmId) {
//
// var xhr = new XMLHttpRequest();
// xhr.open('GET', 'api/films/' + filmId + '/actors', true);
//
// xhr.onreadystatechange = function() {
// if (xhr.readyState === 4) {
// if (xhr.status == 200 || xhr.status == 201) {
// var cast = JSON.parse(xhr.responseText);
// console.log(cast);
// displayActors(cast);
// } else {
// console.log("Film not found.");
// console.error(xhr.status + ': ' + xhr.responseText);
// var filmData = document.getElementById('filmData');
// filmData.textContent = 'Film not found.';
// }
// }
// };
// xhr.send(null);
// }

// function displayActors(cast) {
// var dataDiv = document.getElementById('actorData');
// var actorList = document.createElement('ul');
// dataDiv.textContent = '';
//
// cast.forEach(function(value, index, array) {
// var actor = document.createElement('li');
// actor.textContent = value.firstName + " " + value.lastName;
// console.log(actor);
// actorList.appendChild(actor);
// });
//
// dataDiv.appendChild(actorList);
//
// }
