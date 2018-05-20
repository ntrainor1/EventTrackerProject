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
	list.textContent = "";

	var displayTable = document.createElement('table');
	billList.forEach(function(value) {
		var displayListRow = document.createElement('tr');
		var displayListItem = document.createElement('td');
		displayListItem.setAttribute('class', 'yearItem');
		displayListItem.textContent = value.year;
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
		displayListRow.appendChild(displayListItem);
		displayTable.appendChild(displayListRow);
	});

	list.appendChild(displayTable);
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
		createDiv.textContent = "";

		var createForm = document.createElement('form');
		createForm.setAttribute('id', 'createForm');
		var formYear = document.createElement('input');
		formYear.setAttribute('name', 'year');
		formYear.setAttribute('type', 'number');
		formYear.required = true;

		var formCost = document.createElement('input');
		formCost.setAttribute('name', 'cost');
		formCost.setAttribute('type', 'number');
		formCost.required = true;

		var formWattage = document.createElement('input');
		formWattage.setAttribute('name', 'wattage');
		formWattage.setAttribute('type', 'number');
		formWattage.required = true;

		var formFirstName = document.createElement('input');
		formFirstName.setAttribute('name', 'managerFirstName');
		formFirstName.setAttribute('type', 'text');
		formFirstName.required = true;

		var formLastName = document.createElement('input');
		formLastName.setAttribute('name', 'managerLastName');
		formLastName.setAttribute('type', 'text');
		formLastName.required = true;

		var formSubmit = document.createElement('button');
		formSubmit.setAttribute('name', 'submitCreate');
		formSubmit.textContent = "Submit New Bill";

		createForm.appendChild(formYear);
		createForm.appendChild(formCost);
		createForm.appendChild(formWattage);
		createForm.appendChild(formFirstName);
		createForm.appendChild(formLastName);
		createForm.appendChild(formSubmit);
		createDiv.appendChild(createForm);

		generateCreateLabels();
		establishCreateClickEvent();
	});
};

function generateCreateLabels() {
	var yearLabel = document.createElement("LABEL");
	var yearText = document.createTextNode("Year ");
	yearLabel.setAttribute("for", "year");
	yearLabel.appendChild(yearText);
	document.getElementById("createForm").insertBefore(yearLabel, document.getElementsByName("year")[0]);

	var costLabel = document.createElement("LABEL");
	var costText = document.createTextNode("Cost ");
	costLabel.setAttribute("for", "cost");
	costLabel.setAttribute("id", "costLabel");
	costLabel.appendChild(costText);
	document.getElementById("createForm").insertBefore(costLabel, document.getElementsByName("cost")[0]);
	document.getElementById("createForm").insertBefore(document.createElement("BR"), document.getElementById("costLabel"));

	var wattageLabel = document.createElement("LABEL");
	var wattageText = document.createTextNode("Wattage ");
	wattageLabel.setAttribute("for", "wattage");
	wattageLabel.setAttribute("id", "wattageLabel");
	wattageLabel.appendChild(wattageText);
	document.getElementById("createForm").insertBefore(wattageLabel, document.getElementsByName("wattage")[0]);
	document.getElementById("createForm").insertBefore(document.createElement("BR"), document.getElementById("wattageLabel"));

	var fNameLabel = document.createElement("LABEL");
	var fNameText = document.createTextNode("Manager First Name ");
	fNameLabel.setAttribute("for", "managerFirstName");
	fNameLabel.setAttribute("id", "fNameLabel");
	fNameLabel.appendChild(fNameText);
	document.getElementById("createForm").insertBefore(fNameLabel, document.getElementsByName("managerFirstName")[0]);
	document.getElementById("createForm").insertBefore(document.createElement("BR"), document.getElementById("fNameLabel"));

	var lNameLabel = document.createElement("LABEL");
	var lNameText = document.createTextNode("Manager Last Name ");
	lNameLabel.setAttribute("for", "managerLastName");
	lNameLabel.setAttribute("id", "lNameLabel");
	lNameLabel.appendChild(lNameText);
	document.getElementById("createForm").insertBefore(lNameLabel, document.getElementsByName("managerLastName")[0]);
	document.getElementById("createForm").insertBefore(document.createElement("BR"), document.getElementById("lNameLabel"));

	document.getElementById("createForm").insertBefore(document.createElement("BR"), document.getElementsByName("submitCreate")[0]);
}

function establishCreateClickEvent() {
	var createSubmitButton = document.getElementsByName("submitCreate")[0];

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

		if (year != 0 & cost != 0 & wattage != 0 & managerFirstName != "" & managerLastName != "") {
			createBill(year, cost, wattage, managerFirstName, managerLastName);
		}
		else {
			var displayColumn = document.getElementById('display');
			displayColumn.textContent = 'All fields must be filled in order to create a new bill entry.';
		}

	index();
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
				index();
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
	xhr.send(billId);
}

function displayBill(bill) {
	var displayColumn = document.getElementById('display');

	// DISPLAY INFORMATION
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
	billManagerPropertyColumn.textContent = bill.managerFirstName + " " + bill.managerLastName;
	billManagerRow.appendChild(billManagerNameColumn);
	billManagerRow.appendChild(billManagerPropertyColumn);
	billInfo.appendChild(billManagerRow);

	// ESTABLISH UPDATE BUTTON
	var updateButton = document.createElement('form');
	var updateSubmit = document.createElement('button');
	updateSubmit.setAttribute('name', 'submit');
	updateSubmit.textContent = "Update Bill";
	updateSubmit.addEventListener('click', function(event) {
		event.preventDefault();
		createUpdateForm(bill.id, bill.year, bill.cost, bill.wattage, bill.managerFirstName, bill.managerLastName);
	});
	updateButton.appendChild(updateSubmit);

	// ESTABLISH DELETE BUTTON
	var deleteForm = document.createElement('form');
	var deleteSubmit = document.createElement('button');
	deleteSubmit.setAttribute('name', 'submitDelete');
	deleteSubmit.textContent = "Delete Bill";
	deleteSubmit.addEventListener('click', function(event) {
		event.preventDefault();

		console.log(deleteSubmit.parentElement);

		if (confirm("Press OK if you are sure you wish to delete")) {
			deleteBill(bill.id);
		}

	});
	deleteForm.appendChild(deleteSubmit);

	displayColumn.appendChild(billInfo);
	displayColumn.appendChild(updateButton);
	displayColumn.appendChild(deleteForm);
}

function createUpdateForm(billId, billYear, billCost, billWattage, billFirstName, billLastName) {
	var updateDiv = document.getElementById('update');
	updateDiv.textContent = "";

	var updateForm = document.createElement('form');
	updateForm.setAttribute('id', 'updateForm');
	var formYear = document.createElement('input');
	formYear.setAttribute('name', 'yearUpdate');
	formYear.setAttribute('type', 'number');
	formYear.setAttribute('value', billYear);
	formYear.required = true;

	var formCost = document.createElement('input');
	formCost.setAttribute('name', 'costUpdate');
	formCost.setAttribute('type', 'number');
	formCost.setAttribute('value', billCost);
	formCost.required = true;

	var formWattage = document.createElement('input');
	formWattage.setAttribute('name', 'wattageUpdate');
	formWattage.setAttribute('type', 'number');
	formWattage.setAttribute('value', billWattage);
	formWattage.required = true;

	var formFirstName = document.createElement('input');
	formFirstName.setAttribute('name', 'managerFirstNameUpdate');
	formFirstName.setAttribute('type', 'text');
	formFirstName.setAttribute('value', billFirstName);
	formFirstName.required = true;

	var formLastName = document.createElement('input');
	formLastName.setAttribute('name', 'managerLastNameUpdate');
	formLastName.setAttribute('type', 'text');
	formLastName.setAttribute('value', billLastName);
	formLastName.required = true;

	var formSubmit = document.createElement('button');
	formSubmit.setAttribute('name', 'submitUpdate');
	formSubmit.textContent = "Update Bill";

	updateForm.appendChild(formYear);
	updateForm.appendChild(formCost);
	updateForm.appendChild(formWattage);
	updateForm.appendChild(formFirstName);
	updateForm.appendChild(formLastName);
	updateForm.appendChild(formSubmit);
	updateDiv.appendChild(updateForm);

	generateUpdateLabels();
	establishUpdateClickEvent(billId);
}


function establishUpdateClickEvent(billId) {
	var updateSubmitButton = document.getElementsByName("submitUpdate")[0];

	console.log(updateSubmitButton);

	updateSubmitButton.addEventListener('click', function(event) {
		event.preventDefault();

		console.log(updateSubmitButton.parentElement);

		var year = updateSubmitButton.parentElement.yearUpdate.value;
		var cost = updateSubmitButton.parentElement.costUpdate.value;
		var wattage = updateSubmitButton.parentElement.wattageUpdate.value;
		var managerFirstName = updateSubmitButton.parentElement.managerFirstNameUpdate.value;
		var managerLastName = updateSubmitButton.parentElement.managerLastNameUpdate.value;
		console.log(year + cost + wattage + managerFirstName + managerLastName);

//		if (year != 0 & cost != 0 & wattage != 0 & managerFirstName != "" & managerLastName != "") {
			updateBill(year, cost, wattage, managerFirstName, managerLastName, billId);
//		}
//		else {
//			var updateColumn = document.getElementById('update');
//			updateColumn.textContent = 'All fields must be filled in order to update this bill entry.';
//		}

	index();
	});
}

function generateUpdateLabels() {
	var yearLabel = document.createElement("LABEL");
	var yearText = document.createTextNode("Year ");
	yearLabel.setAttribute("for", "yearUpdate");
	yearLabel.appendChild(yearText);
	document.getElementById("updateForm").insertBefore(yearLabel, document.getElementsByName("yearUpdate")[0]);

	var costLabel = document.createElement("LABEL");
	var costText = document.createTextNode("Cost ");
	costLabel.setAttribute("for", "costUpdate");
	costLabel.setAttribute("id", "costLabel");
	costLabel.appendChild(costText);
	document.getElementById("updateForm").insertBefore(costLabel, document.getElementsByName("costUpdate")[0]);
	document.getElementById("updateForm").insertBefore(document.createElement("BR"), document.getElementById("costLabel"));

	var wattageLabel = document.createElement("LABEL");
	var wattageText = document.createTextNode("Wattage ");
	wattageLabel.setAttribute("for", "wattageUpdate");
	wattageLabel.setAttribute("id", "wattageLabel");
	wattageLabel.appendChild(wattageText);
	document.getElementById("updateForm").insertBefore(wattageLabel, document.getElementsByName("wattageUpdate")[0]);
	document.getElementById("updateForm").insertBefore(document.createElement("BR"), document.getElementById("wattageLabel"));

	var fNameLabel = document.createElement("LABEL");
	var fNameText = document.createTextNode("Manager First Name ");
	fNameLabel.setAttribute("for", "managerFirstNameUpdate");
	fNameLabel.setAttribute("id", "fNameLabel");
	fNameLabel.appendChild(fNameText);
	document.getElementById("updateForm").insertBefore(fNameLabel, document.getElementsByName("managerFirstNameUpdate")[0]);
	document.getElementById("updateForm").insertBefore(document.createElement("BR"), document.getElementById("fNameLabel"));

	var lNameLabel = document.createElement("LABEL");
	var lNameText = document.createTextNode("Manager Last Name ");
	lNameLabel.setAttribute("for", "managerLastNameUpdate");
	lNameLabel.setAttribute("id", "lNameLabel");
	lNameLabel.appendChild(lNameText);
	document.getElementById("updateForm").insertBefore(lNameLabel, document.getElementsByName("managerLastNameUpdate")[0]);
	document.getElementById("updateForm").insertBefore(document.createElement("BR"), document.getElementById("lNameLabel"));

	document.getElementById("updateForm").insertBefore(document.createElement("BR"), document.getElementsByName("submitUpdate")[0]);
}

function updateBill(year, cost, wattage, managerFirstName, managerLastName, billId) {
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
	xhr.open('PATCH', 'api/electricbills/' + billId, true);
	xhr.setRequestHeader("Content-type", "application/json");
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (this.status === 200 || this.status === 201) {
				var newBill = JSON.parse(this.responseText);
				console.log(newBill);
				index();
				displayBill(newBill);
			} else {
				console.error("An error has occurred");
				console.error(xhr.status + ': ' + xhr.responseText);
			}
		}
	};
	xhr.send(billJSON);
}

function deleteBill(billId) {
	var xhr = new XMLHttpRequest();
	xhr.open('DELETE', 'api/electricbills/' + billId, true);

	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (this.status === 200) {
				console.log(xhr.responseText);
				if (xhr.responseText) {
					index();
					document.getElementById('display').textContent = "";
				}
			} else {
				console.error("An error has occurred");
				console.error(xhr.status + ': ' + xhr.responseText);
			}
		}
	}

	xhr.send(billId);
}