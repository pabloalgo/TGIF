// Value to start array from json
const members = data.results[0].members;
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
	//if (selecStates.value == "all") {
	//	createDataTable(members);
	//} else {
	if (array == []) {
		var createRow = document.createElement("tr");
		document.createElement("td").innerHTML = <p>no existe</p>;
	} else {
		for (i = 0; i < array.length; i++) {
			createRow;
			// loop to order each senatorData inside a td
			//console.log(array);

			for (j = 0; j < senatorData.length; j++) {
				var createCell = document.createElement("td");

				switch (true) {
					// Joint Name + Middle Name + Last Name
					case j == 0 && array[i].middle_name == null:
						createCell.innerHTML =
							array[i].first_name + " " + array[i].last_name;
						//+ " " + array[i].last_name
						//console.log(array[i].first_name);
						break;
					case j == 0:
						createCell.innerHTML =
							array[i].first_name +
							" " +
							array[i].middle_name +
							" " +
							array[i].last_name;
						//console.log("segundo case");
						break;
					// Filling the rest of the values
					case j > 0:
						createCell.innerHTML = array[i][senatorData[j]];
						break;
				}

				//	Other way to do the same with if

				// Create name with midle name
				/*
			if (j == 0 && array[i].middle_name == null) {
				createCell.innerHTML = (
					array[i].first_name +
					" " +
					array[i].last_name
				).link(array[i].url);
			} else if (j == 0) {
				createCell.innerHTML = (
					array[i].first_name +
					" " +
					array[i].middle_name +
					" " +
					array[i].last_name
				).link(array[i].url);
			} else {
				createCell.innerHTML = array[i][senatorData[j]];
			}
			*/

				createRow.appendChild(createCell);
			}
			tbody.appendChild(createRow);
		}
	}
}
createDataTable(members);

/*
document.getElementById("checkI").addEventListener("click", function() {
	FilterData(members, "I");
});
*/

/*  THINGS TO DO 
 Create array to get the values from checkboxes
 push the value from checkboxes in array to compare 
 check if an array includes a value  with a for for all memebers party and filter
should I use include function ? */

let filtersparties = document.getElementsByClassName("form-check");

console.log("soy filters parties", filtersparties);

// Using addEventListener and getElementsByClassName ES6 WAY

for (let i = 0; i < filtersparties.length; i++) {
	filtersparties[i].addEventListener("click", FilterData);
}

let inputElements = document.getElementsByClassName("form-check");
console.log("form-check", inputElements);

function FilterStates(newMembers) {
	console.log("soy newmebers", newMembers);
	console.log("soy un estado", selecStates.value);
	let newMembersByStates = newMembers.filter(
		item => selecStates.value.includes(item.state) || selecStates.value == "all"
	);
	console.log("filtrado por estados ", newMembersByStates);

	createDataTable(newMembersByStates);
	//}
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
		console.log("soy check value", filtercheckvalues);
		console.log("soy check inputsElementes", inputElements);
	}
	console.log("soy members", members);

	// FilterData(members, filtercheckvalues);
	/* The includes() method determines whether an array includes a certain 
value among its entries, returning true or false as appropriate. Item become members array you could use anyname*/

	let newMembers = members.filter(item =>
		filtercheckvalues.includes(item.party)
	);
	console.log("soy la nueva array", newMembers);
	newMembers.sort();

	FilterStates(newMembers);
}

// Creating an array with all States from an objects .map looks for an element in the objects from members array x could be any name
let statesArray = members.map(x => x.state);
console.log("estados", statesArray);
// Array.from create a New array without duplicates
let statesWithoutDuplicates = Array.from(new Set(statesArray));
console.log("states array", statesWithoutDuplicates);
statesWithoutDuplicates.sort();

// Get dropdown element from DOM
//var dropdown = document.getElementById("selectNumber");

var dropdown = document.getElementById("misoptions");

for (var i = 0; i < statesWithoutDuplicates.length; i++) {
	var opt = statesWithoutDuplicates[i];
	var el = document.createElement("option");
	//textContent is an atribute same for value fill value on html <opt>
	el.textContent = opt;
	el.value = opt;
	dropdown.appendChild(el);
}

selecStates = document.getElementById("misoptions");

selecStates.addEventListener("change", FilterData);

console.log("soy un estado", selecStates.value);
/*
valueStates = document
	.getElementById("misoptions")
	.addEventListener("change", createDataTable);
*/
console.log("soy valuestates", dropdown);

/*
let newMembers = members.filter(item =>
	filtercheckvalues.includes(item.party)
);
console.log("soy la nueva array", newMembers);
newMembers.sort();
*/
