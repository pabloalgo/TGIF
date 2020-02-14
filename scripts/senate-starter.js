const inputElements = document.getElementsByClassName("form-check");

var array;
//"Access-Control-Allow-Origin: "

fetch("https://api.propublica.org/congress/v1/113/senate/members.json", {
	method: "GET",
	headers: {
		"X-API-Key": `xgcjmvEPRCLkUdtiMETXRdFrRZ6H9E6SVh3tNsaY `
	}
})
	.then(function(response) {
		//if (response.ok) {
		console.log("soy response", response);

		return response.json();
		//}
		//throw new Error(response.statusText);
	})
	.then(function(json) {
		// do somenthing with json data
		console.log("soy data del fetch", json);
		members = json.results[0].members;
		console.log("members", members);
		FilterData();
		dropDownStates();
		evenListener();

		createDataTable(members);

		// LLAMAR FUNCIONES QUE EJECUTAN DATOS FILTROS, CREAR TABLA ...
		// SI CREO UNA FUNCION DENTRO DE OTRA FUNCION LA PUEDO LLAMAR DE FUERA? CREO QUE EL SCOPE VA COMO LAS VARIABLES DE DENTRO HACIA AFUERA
	});
//.catch(function(error) {
// called when an error occurs anywhere in the chain
// console.log("Request failed: " + error.message);
//})

// Value to start array from json
//const members = data.results[0].members;
// Values to insert in cells
const senatorData = ["name", "party", "state", "seniority", "total_votes"];
// Value zero to create table
const tbody = document.getElementById("senate-data");

/*

function createTable(array) {
	// creacion de elementos aqui solo se crean los emementos
	// insercion de data hay que insertar los datos dentro de td, tr, y llamar tbody id luego append para escribir
	// append de elementos hasta que no hay append el resto vive dentro de js
	// document.append.getElementById("pablos");
// Building table with candidates
*/

function createDataTable(array) {
	// create a loop to push  members in table rows
	tbody.innerHTML = " ";
	createCell;
	if (array == "") {
		var createRow = document.createElement("tr");
		createCell = document.createElement("td");
		createCell.colSpan = 5;
		createCell.className = "errorms";
		createCell.textContent = "NOTHING FOUND TEXT CONTENT";

		createRow.appendChild(createCell);
		tbody.appendChild(createRow);
	} else {
		for (i = 0; i < array.length; i++) {
			var createRow = document.createElement("tr");
			// loop to order each senatorData inside a td

			for (j = 0; j < senatorData.length; j++) {
				var createCell = document.createElement("td");

				switch (true) {
					// Joint Name + Middle Name + Last Name
					case j == 0 && array[i].middle_name == null:
						createCell.innerHTML =
							array[i].first_name + " " + array[i].last_name;
						break;
					case j == 0:
						createCell.innerHTML =
							array[i].first_name +
							" " +
							array[i].middle_name +
							" " +
							array[i].last_name;
						break;
					// Filling the rest of the values
					case j > 0:
						createCell.innerHTML = array[i][senatorData[j]];
						break;
				}

				createRow.appendChild(createCell);
			}
			tbody.appendChild(createRow);
		}
	}
}
// createDataTable(members);

/*  THINGS TO DO  Selecting elements by class
Selecting elements by class Create array to get the values from checkboxes
 push the value from checkboxes in array to compare 
 check if an array includes a value  with a for for all memebers party and filter
should I use include function ? */

function evenListener(array) {
	let filtersparties = document.getElementsByClassName("form-check");

	// Using addEventListener and getElementsByClassName ES6 WAY

	for (let i = 0; i < filtersparties.length; i++) {
		filtersparties[i].addEventListener("click", FilterData);
	}
	console.log("soy filter parties", filtersparties);
	let inputElements = document.getElementsByClassName("form-check");
}

// Creating new array with members filters
function FilterData() {
	// Checking filters from parties elementesbyclassname create an array
	var filtercheckvalues = [];
	// Looping the array with values an filling array with filtercheckvalues to compare it in filter members.filter() filter is a function
	for (var i = 0; inputElements[i]; ++i) {
		if (inputElements[i].checked) {
			filtercheckvalues.push(inputElements[i].value);
		}
	}

	// FilterData(members, filtercheckvalues);
	/* The includes() method determines whether an array includes a certain 
value among its entries, returning true or false as appropriate. Item become members array you could use anyname*/

	let newMembers = members.filter(
		item => filtercheckvalues.includes(item.party) || filtercheckvalues == ""
	);

	FilterStates(newMembers);
}

function dropDownStates() {
	// Creating an array with all States from an objects .map looks for an element in the objects from members array x could be any name
	let statesArray = members.map(x => x.state);
	// Array.from create a New array without duplicates
	let statesWithoutDuplicates = Array.from(new Set(statesArray));
	statesWithoutDuplicates.sort();

	// Get dropdown element from DOM

	var dropdown = document.getElementById("misoptions");

	for (var i = 0; i < statesWithoutDuplicates.length; i++) {
		var opt = statesWithoutDuplicates[i];
		var el = document.createElement("option");
		//textContent is an atribute same for value fill value on html <opt>
		el.textContent = opt;
		el.value = opt;
		dropdown.appendChild(el);
	}
}

function FilterStates(newMembers) {
	let newMembersByStates = newMembers.filter(
		item => selecStates.value.includes(item.state) || selecStates.value == "all"
	);

	newMembersByStates.sort(function(a, b) {
		return a.last_name - b.last_name;
	});

	createDataTable(newMembersByStates);
}
selecStates = document.getElementById("misoptions");

selecStates.addEventListener("change", FilterData);
