var patch = window.location.pathname;
var page = patch.split("/").pop();
console.log("WICH PAGE", page);

if (page == "house-starter-page.html") {
	console.log("WICH PAGE IFFFFF", page);
	url = "https://api.propublica.org/congress/v1/113/house/members.json";
}
if (page == "senate-starter-page.html") {
	url = "https://api.propublica.org/congress/v1/113/senate/members.json";
}

if (localStorage.getItem("members")) {
	var newtest = localStorage.getItem("members");
	//console.log("newtest", newtest);
	// Create an object
	members = JSON.parse(newtest);
	console.log("localstore members", members);
	document.getElementById("loading").style.display = "none";
	// const inputElements = document.getElementsByClassName("form-check");
	//"Access-Control-Allow-Origin: "
	start();
} else {
	fetch(url, {
		method: "GET",
		headers: {
			"X-API-Key": `xyIXQJFsjHy2gTDbB2wjkoIzVS0mWHscNHkindLs`
		}
	})
		.then(function(response) {
			if (response.ok) {
				console.log("soy response", response);

				return response.json();
			}
			throw new Error(response.statusText);
		})
		.then(function(json) {
			console.log("soy data del fetch", json);
			let members = json.results[0].members;
			localStorage.setItem("members", JSON.stringify(members));
			start();
			console.log("members", members);
			console.log(localStorage);
			document.getElementById("loading").style.display = "none";
			// dropDownStates(members);
			// evenListeners(members);
			// createDataTable(members);
		})
		.catch(function(error) {
			// called when an error occurs anywhere in the chain
			// console.log("Request failed: " + error.message);
		});
}

function start() {
	if (page == "house-starter-page.html" || page == "senate-starter-page.html") {
		console.log("START MEMBERS", members);
		dropDownStates(members);
		evenListeners(members);
		createDataTable(members);
	}
}

function createDataTable(array) {
	const tbody = document.getElementById("cogress113table");
	const senatorData = ["name", "party", "state", "seniority", "total_votes"];

	// create a loop to push  members in table rows
	tbody.innerHTML = " ";

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
						createCell.innerHTML = (array[i].first_name + " " + array[i].last_name).link(array[i].url);
						break;
					case j == 0:
						createCell.innerHTML = (array[i].first_name + " " + array[i].middle_name + " " + array[i].last_name).link(array[i].url);
						break;
					// Filling the rest of the values

					case j > 0:
						createCell.innerHTML = array[i][senatorData[j]];
						if (j == 3) {
							createCell.innerHTML = array[i][senatorData[j]] + " " + "years";
						}

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

function evenListeners(array) {
	let filtersparties = document.getElementsByClassName("form-check");
	let selecStates = document.getElementById("misoptions");

	// Using addEventListener and getElementsByClassName ES6 WAY

	for (let i = 0; i < filtersparties.length; i++) {
		console.log(filtersparties[i]);
		filtersparties[i].addEventListener("click", function() {
			FilterData(array);
		});
	}
	// even listener don't allow to call a function with value you must call it inside a function ()
	selecStates.addEventListener("change", function() {
		FilterData(array);
	});
}

// Creating new array with members filters
function FilterData(array) {
	const inputElements = document.getElementsByClassName("form-check");
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

	let newMembers = array.filter(item => filtercheckvalues.includes(item.party) || filtercheckvalues == "");
	console.log("after filters newmebers", newMembers);
	FilterStates(newMembers);
}

function dropDownStates(members) {
	// Creating an array with all States from an objects .map looks for an element in the objects from members array x could be any name
	let statesArray = members.map(x => x.state);
	console.log("statesArray", statesArray);
	// Array.from create a New array without duplicates
	let statesWithoutDuplicates = Array.from(new Set(statesArray));
	statesWithoutDuplicates.sort();
	// console.log("statesWithoutDuplicates", statesWithoutDuplicates);

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
	let selecStates = document.getElementById("misoptions");
	let newMembersByStates = newMembers.filter(item => selecStates.value.includes(item.state) || selecStates.value == "all");

	newMembersByStates.sort(function(a, b) {
		return a.last_name - b.last_name;
	});

	createDataTable(newMembersByStates);
}
/*
function search() {
	var results = [];

	var toSearch = "lo";

	for (var i = 0; i < objects.length; i++) {
		for (key in objects[i]) {
			if (objects[i][key].indexOf(toSearch) != -1) {
				results.push(objects[i]);
			}
		}
	}
}

*/
