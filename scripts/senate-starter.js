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
	for (i = 0; i < array.length; i++) {
		var createRow = document.createElement("tr");
		// loop to order each senatorData inside a td
		//console.log(array);

		for (j = 0; j < senatorData.length; j++) {
			var createCell = document.createElement("td");

			switch (true) {
				// Joint Name + Middle Name + Last Name
				case j == 0 && array[i].middle_name == null:
					createCell.innerHTML = array[i].first_name + " " + array[i].last_name;
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
createDataTable(members);

/*                            TESTING 
			function myFunction() {
				var checkBox = document.getElementById("myCheck");
				var text = document.getElementById("text");
				if (checkBox.checked == true){
				  text.style.display = "block";
				} else {
				   text.style.display = "none";
				}
			  }




 document.getElementById("checkR").addEventListener("click", function() {
	FilterData(members, "R"); 


// document.getElementsByClassName("form-check").addEventListener("click");

checkboxD = document.getElementById("checkD");
checkboxI = document.getElementById("checkI");
checkboxR = document.getElementById("checkR");


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

// Creating new array with members filters
function FilterData() {
	// Checking filters from parties elementesbyclassname create an array
	var filtercheckvalues = [];
	// Looping the array with values an pushing to filtercheckvalues to compare it in filter members.filter() filter is a function
	for (var i = 0; inputElements[i]; ++i) {
		if (inputElements[i].checked) {
			filtercheckvalues.push(inputElements[i].value);
		}
		console.log("soy check value", filtercheckvalues);
		console.log("soy check inputsElementes", inputElements);
	}
	console.log("soy members", members);

	//FilterData(members, filtercheckvalues);
	/* The includes() method determines whether an array includes a certain 
value among its entries, returning true or false as appropriate. Item become members array you could use anyname*/

	let newMembers = members.filter(item =>
		filtercheckvalues.includes(item.party)
	);
	console.log("soy la nueva array", newMembers);
	createDataTable(newMembers);
}

// Creating an array with all States .map looks for an element in a object x could be any name
let statesArray = members.map(x => x.state);
console.log("estados", statesArray);
// Array.from create a New array without duplicates
let statesWithoutDuplicates = Array.from(new Set(statesArray));
console.log("states array", statesWithoutDuplicates);

// Get dropdown element from DOM
//var dropdown = document.getElementById("selectNumber");

var dropdown = document.getElementById("misoptions");

for (var i = 0; i < statesWithoutDuplicates.length; i++) {
	var opt = statesWithoutDuplicates[i];
	var el = document.createElement("option");
	el.textContent = opt;
	el.value = opt;
	dropdown.appendChild(el);
}
