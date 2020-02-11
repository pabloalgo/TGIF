/* var members = data.results[0].members;
var tbody = document.getElementById("senate-data");

function createTable(array) {
	// creacion de elementos aqui solo se crean los emementos
	var tr = document.createElement("senate-data");
	console.log();

	// insercion de data hay que insertar los datos dentro de td, tr, y llamar tbody id luego append para escribir

	// append de elementos hasta que no hay append el resto vive dentro de js



	// document.append.getElementById("pablos");
}

createTable(members); */

// console.log(tbody);
// console.log(members[1]);

const tbody = document.getElementById("senate-data");
const array = data.results[0].members;

const senatorData = ["name", "party", "state", "seniority", "total_votes"];
var checkBox = document.getElementById("checkD");
console.log("SHOW CHECKBOX", checkBox.checked);

/*
// console.log(array[1]);

function orderData(array) {
	// create a loop to store the members in table rows

	for (i = 0; i < array.length; i++) {
		var createRow = document.createElement("tr");
		// loop to order each senatorData inside a td
		console.log(array);

		for (j = 0; j < senatorData.length; j++) {
			var createCell = document.createElement("td");

			/*	switch (true) {
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
*/
//	FUNCIONA CON IF

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

			/*
			function myFunction() {
				var checkBox = document.getElementById("myCheck");
				var text = document.getElementById("text");
				if (checkBox.checked == true){
				  text.style.display = "block";
				} else {
				   text.style.display = "none";
				}
			  }

*/
/*
			createRow.appendChild(createCell);
		}
		tbody.appendChild(createRow);
	}
}
orderData(array);
*/
