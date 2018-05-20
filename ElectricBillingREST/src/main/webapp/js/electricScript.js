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
		formSubmit.setAttribute('name', 'submit');
		formSubmit.textContent = "Submit New Bill";
		
		createForm.appendChild(formYear);
		createForm.appendChild(formCost);
		createForm.appendChild(formWattage);
		createForm.appendChild(formFirstName);
		createForm.appendChild(formLastName);
		createForm.appendChild(formSubmit);
		createDiv.appendChild(createForm);
		
		generateLabels();
		establishCreateClickEvent();
	});
};

function generateLabels() {
	var yearLabel = document.createElement("LABEL");
    var yearText = document.createTextNode("Year ");
    yearLabel.setAttribute("for", "year");
    yearLabel.appendChild(yearText);
    document.getElementById("createForm").insertBefore(yearLabel, document.getElementsByName("year")[0]);
    document.getElementById("createForm").insertBefore(document.createElement("BR"), document.getElementsByName("year")[0]);
    
    var costLabel = document.createElement("LABEL");
    var costText = document.createTextNode("Cost ");
    costLabel.setAttribute("for", "cost");
    costLabel.appendChild(costText);
    document.getElementById("createForm").insertBefore(costLabel, document.getElementsByName("cost")[0]);
    document.getElementById("createForm").insertBefore(document.createElement("BR"), document.getElementsByName("cost")[0]);
    
    var wattageLabel = document.createElement("LABEL");
    var wattageText = document.createTextNode("Wattage ");
    wattageLabel.setAttribute("for", "wattage");
    wattageLabel.appendChild(wattageText);
    document.getElementById("createForm").insertBefore(wattageLabel, document.getElementsByName("wattage")[0]);
    document.getElementById("createForm").insertBefore(document.createElement("BR"), document.getElementsByName("wattage")[0]);
    
    var fNameLabel = document.createElement("LABEL");
    var fNameText = document.createTextNode("Manager First Name ");
    fNameLabel.setAttribute("for", "managerFirstName");
    fNameLabel.appendChild(fNameText);
    document.getElementById("createForm").insertBefore(fNameLabel, document.getElementsByName("managerFirstName")[0]);
    document.getElementById("createForm").insertBefore(document.createElement("BR"), document.getElementsByName("managerFirstName")[0]);
    
    var lNameLabel = document.createElement("LABEL");
    var lNameText = document.createTextNode("Manager Last Name ");
    lNameLabel.setAttribute("for", "managerLastName");
    lNameLabel.appendChild(lNameText);
    document.getElementById("createForm").insertBefore(lNameLabel, document.getElementsByName("managerLastName")[0]);
    document.getElementById("createForm").insertBefore(document.createElement("BR"), document.getElementsByName("managerLastName")[0]);
}

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
		
		if (year != "" & cost != "" & wattage != "" & managerFirstName != "" & managerLastName != "") {
			createBill(year, cost, wattage, managerFirstName, managerLastName);
		}
		else  {
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
	billManagerPropertyColumn.textContent = bill.managerFirstName + " "
			+ bill.managerLastName;
	billManagerRow.appendChild(billManagerNameColumn);
	billManagerRow.appendChild(billManagerPropertyColumn);
	billInfo.appendChild(billManagerRow);
	
	// ESTABLISH UPDATE BUTTON
	var updateForm = document.createElement('form');
	var updateSubmit = document.createElement('button');
	updateSubmit.setAttribute('name', 'submit');
	updateSubmit.textContent = "Update Bill";
	//updateSubmit.addEventListener('click', function(event));
	updateForm.appendChild(updateSubmit);
	
	// ESTABLISH DELETE BUTTON
	var deleteForm = document.createElement('form');
	var deleteSubmit = document.createElement('button');
	deleteSubmit.setAttribute('name', 'submit');
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
//	displayColumn.appendChild(billInfo);
	displayColumn.appendChild(deleteForm);
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
				}
			} else {
				console.error("An error has occurred");
				console.error(xhr.status + ': ' + xhr.responseText);
			}
		}
	}
	
	xhr.send(billId);
}