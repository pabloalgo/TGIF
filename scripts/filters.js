const members = data.results[0].members;
const senatorData = ["name", "party", "state", "seniority", "total_votes"];
const tbody = document.getElementById("senate-data");

/*

function createTable(array) {
	// creacion de elementos aqui solo se crean los emementos
	var tr = document.createElement("senate-data");
	console.log();

	// insercion de data hay que insertar los datos dentro de td, tr, y llamar tbody id luego append para escribir

	// append de elementos hasta que no hay append el resto vive dentro de js



	// document.append.getElementById("pablos");
}

createTable(members); */
/*
//console.log(members);


// Building table with candidates
*/
function orderData(array) {
	// create a loop to store the members in table rows

	for (i = 0; i < array.length; i++) {
		var createRow = document.createElement("tr");
		// loop to order each senatorData inside a td
		console.log(array);

		for (j = 0; j < senatorData.length; j++) {
			var createCell = document.createElement("td");

			switch (true) {
				case j == 0 && array[i].middle_name == null:
					createCell.innerHTML = array[i].first_name + " " + array[i].last_name;
					//+ " " + array[i].last_name
					console.log(array[i].first_name);

					break;

				case j == 0:
					createCell.innerHTML =
						array[i].first_name +
						" " +
						array[i].middle_name +
						" " +
						array[i].last_name;
					console.log("segundo case");

					// console.log(mates[i]);
					break;

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
orderData(members);

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
 document.getElementById("checkR").addEventListener("click", function() {
	FilterData(members, "R");
}); 
document.getElementById("checkD").addEventListener("click", function() {
	FilterData(members, "D");
});
document.getElementById("checkI").addEventListener("click", function() {
	FilterData(members, "I");
});
*/

// document.getElementById('stateDropdown').addEventListener("change", filter);

// document.getElementsByClassName("checks").addEventListener("click");

checkboxD = document.getElementById("checkD");
checkboxI = document.getElementById("checkI");
checkboxR = document.getElementById("checkR");

/*  THINGS TO DO 
 Create array to get de values from checkboxes
 push the value in array
 check if an array includes a value  with a for for all memebers party
 console.log of newarray
 include */

let inputElements = document.getElementsByClassName("checks");
console.log("checks", inputElements);

// Creating new array with filters
function FilterData() {
	// Checking filters from parties elementesbyclassname create an array
	var checksValues = [];

	for (var i = 0; inputElements[i]; ++i) {
		if (inputElements[i].checked) {
			checksValues.push(inputElements[i].value);
		}
	}
	console.log("soy check value", checksValues);
	console.log("soy members", members);

	//FilterData(members, checksValues);

	let Newarray = members.filter(item => checksValues.includes(item.party));
	console.log("soy la nueva array", Newarray);
	orderData(Newarray);
}

let filtersparties = document.getElementsByClassName("checks");

console.log("soy filters parties", filtersparties);

// Using addEventListener and getElementsByClassName ES6 WAY

for (let i = 0; i < filtersparties.length; i++) {
	filtersparties[i].addEventListener("click", FilterData);
}

// ineherenthtml " " borrar tabla
