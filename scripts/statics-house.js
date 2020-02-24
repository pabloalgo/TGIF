// "https://cors-anywhere.herokuapp.com/https://api.propublica.org/congress/v1/113/senate/members.json"
// keeping code in (function) variables are not visible on window()
(function() {
	// const array = data.results[0].members;
	const tBodyTop = document.getElementById("senatorsTopEngaged");
	const tBodyBottom = document.getElementById("senatorsBottomEngaged");
	// const senatormissvotes = ["name", "missed_votes", "missed_votes_pct"];
	let arraymembers;
	var patch = window.location.pathname;
	var page = patch.split("/").pop();
	console.log("WICH PAGE", page);
	let valueToCalculateTenpercent;
	var tbodyt = document.getElementById("senatorsTopEngaged");
	console.log("WICH PAGE", tbodyt);

	var tbodyt = document.getElementById("senatorsBottomEngaged");
	console.log("WICH PAGE", tbodyt);

	/*************************************************   Select url to sent js  ****************************************************/
	var senatormissvotes;
	var url;

	// (function) to contorl time to renew data cookies
	(function() {
		var lastclear = localStorage.getItem("lastclear"),
			time_now = new Date().getTime();

		if (time_now - lastclear > 1000 * 24 * 60 * 60) {
			localStorage.clear();

			localStorage.setItem("lastclear", time_now);
		}
	})();
	if (page == "senate-attendance-starter-page.html") {
		//cors-anywhere.herokuapp.com/
		// console.log("WICH PAGE IFFFFF", page);
		https: url = "https://api.propublica.org/congress/v1/113/senate/members.json";
		senatormissvotes = ["name", "missed_votes", "missed_votes_pct"];
		valueToCalculateTenpercent = senatormissvotes[2];
		var pageData = "senate";
		console.log("URL API", url);
		// senatormissvotes[2];
	}
	if (page == "house-attendance-starter-page.html") {
		console.log("WICH PAGE IFFFFF", page);
		url = "https://api.propublica.org/congress/v1/113/house/members.json";
		senatormissvotes = ["name", "missed_votes", "missed_votes_pct"];
		valueToCalculateTenpercent = senatormissvotes[2];
		console.log("URL API", url);
		var pageData = "house";

		//valueToCalculateTenpercent = " missed_votes_pct";
	}
	if (page == "senate-loyalty-starter-page.html") {
		console.log("WICH PAGE senate", page);
		// https://cors-anywhere.herokuapp.com/

		url = "https://api.propublica.org/congress/v1/113/senate/members.json";
		senatormissvotes = ["name", "total_votes", "votes_with_party_pct"];
		//valueToCalculateTenpercent = " missed_votes_pct";
		valueToCalculateTenpercent = senatormissvotes[2];
		console.log("URL API", url);
		var pageData = "senate";
	}
	if (page == "house-loyalty-starter-page.html") {
		console.log("url house", url);
		url = "https://api.propublica.org/congress/v1/113/house/members.json";
		senatormissvotes = ["name", "total_votes", "votes_with_party_pct"];
		valueToCalculateTenpercent = senatormissvotes[2];
		console.log("URL API", url);
		var pageData = "house";
		//valueToCalculateTenpercent = " missed_votes_pct";
	}
	/******************************* LOCAL STORAGE KEEP ON TXT MUST BE PARSE TO CHANGE TXT IN OBJECT   ******************************/

	if (pageData == "house" && localStorage.getItem("houseLocal")) {
		var newtest = localStorage.getItem("houseLocal");
		arraymembers = JSON.parse(newtest);
		console.log("localstore arraymembers", arraymembers);
		// document.getElementById("loading").style.display = "none";
		start();
	} else if (pageData == "senate" && localStorage.getItem("senateLocal")) {
		// localStorage.getItem("senateLocal");
		var newtest = localStorage.getItem("senateLocal");
		arraymembers = JSON.parse(newtest);
		console.log("newtest", newtest);
		console.log("arraymembers", arraymembers);

		// document.getElementById("loading").style.display = "none";
		start();
	} else {
		fetch(url, {
			method: "GET",
			headers: {
				"X-API-Key": `xgcjmvEPRCLkUdtiMETXRdFrRZ6H9E6SVh3tNsaY`

				//xgcjmvEPRCLkUdtiMETXRdFrRZ6H9E6SVh3tNsaY
				//xyIXQJFsjHy2gTDbB2wjkoIzVS0mWHscNHkindLs
				//ZRqqZyse9eb9miTFvaBJFfBegzzOTxz3OpxknxxO
			}
		})
			.then(function(response) {
				if (response.ok) {
					console.log("soy response", response);

					return response.json();
				}
				console.log("response.statusText", response.statusText);
				throw new Error(response.statusText);
			})

			/*********************************** WAITING UNTIL RESPONSE IS OK ***********************************************/
			.then(function(json) {
				console.log("soy data del fetch", json);
				let arraymembers = json.results[0].members;
				localStorage.setItem("arraymembers", JSON.stringify(arraymembers));

				if (pageData == "house") localStorage.setItem("houseLocal", JSON.stringify(arraymembers));
				if (pageData == "senate") localStorage.setItem("senateLocal", JSON.stringify(arraymembers));

				console.log("pagedata", localStorage);

				console.log("pagedata", localStorage);
				start();
				//document.getElementById("loading").style.display = "none";

				// dropDownStates(members);
				// evenListeners(members);
				// createDataTable(members);
			});
		//.catch(function(error) {
		// called when an error occurs anywhere in the chain
		//console.log("Request failed: " + error.message);
		//});
	}
	/*****************************************************INIT FUNCTIONS  **************************************************/
	function start() {
		if (
			page == "senate-attendance-starter-page.html" ||
			page == "house-attendance-starter-page.html" ||
			page == "senate-loyalty-starter-page.html" ||
			page == "house-loyalty-starter-page.html"
		) {
			console.log("SOY START");
			console.log("SOY arraymembers", arraymembers);

			fillDatesObject(arraymembers);
		}
	}
	// function to create cells on Total vote table
	function createsCells(id, numbers) {
		createCell = document.createElement("td");
		createCell.innerHTML = numbers;
		id.append(createCell);
	}
	// Filling object to keep values to show
	function fillDatesObject(array) {
		const repTr = document.getElementById("rep");
		const demTr = document.getElementById("dem");
		const indyTr = document.getElementById("indy");
		var statistics = {
			dem: 0,
			rep: 0,
			ind: 0,
			totalvotewithd: 0,
			totalvotewithr: 0,
			totalvotewithi: 0,
			averagede: 0,
			averagere: 0,
			averagein: 0,
			averageTotal: 0,
			totalmissedvotes: 0,
			totalParty: array.length,
			totalmiss10xcent: 0
		};
		/****************************************************  Function to Calculate data *******************************************/
		// This function calculate statistics.averagere = (statistics.totalvotewithr / statistics.rep).toFixed(2);
		function calculAverage(totalPcent, totalPeople) {
			if (totalPcent == 0 || totalPeople == 0) {
				return (averaverage = 0);
			}
			return (totalPcent / totalPeople).toFixed(2);
		}

		for (i = 0; i < array.length; i++) {
			if (array[i].party == "R") {
				statistics.rep++;
				statistics.totalvotewithr += array[i].votes_with_party_pct;
				statistics.totalmissedvotes += array[i].missed_votes;
			}
			if (array[i].party == "D") {
				statistics.dem++;
				statistics.totalvotewithd += array[i].votes_with_party_pct;
				statistics.totalmissedvotes += array[i].missed_votes;
			}
			if (array[i].party == "I") {
				statistics.ind++;
				statistics.totalvotewithi += array[i].votes_with_party_pct;
				statistics.totalmissedvotes += array[i].missed_votes;
			}
		}
		statistics.averagere = calculAverage(statistics.totalvotewithr, statistics.rep);
		statistics.averagede = calculAverage(statistics.totalvotewithd, statistics.dem);
		statistics.averagein = calculAverage(statistics.totalvotewithi, statistics.ind);

		/***************************    Painting table with Total Votes             ***************************************************/

		statistics.averageTotal =
			(statistics.averagere + statistics.averagede + statistics.averagein) / (statistics.rep + statistics.dem + statistics.rep);
		createsCells(repTr, statistics.rep);
		createsCells(repTr, statistics.averagere + " %");
		createsCells(demTr, statistics.dem + " %");
		createsCells(demTr, statistics.averagede + " %");
		createsCells(indyTr, statistics.ind + " %");
		createsCells(indyTr, statistics.averagein + " %");

		// TopToBottom(array, senatormissvotes[1], 0);
		TopToBottom(array, 0);
		TopToBottom(array, 1);
	}

	// fillDatesObject(array);

	/********************************************************** FILTERING DATA ***************************************************/
	// realtenpercent is the value of missed_votes_pct or votes_against_party_pct of the last senator in 10% list to compare
	// CHANGING VAR valueToCalculateTenpercent value to calculate missed_votes_pct or votes_against_party_pct
	// array.keyinsideobject example array.last_name if you use a parametre is array[parametre]

	function TopToBottom(objectArray, topOrBottom) {
		if (topOrBottom === 0) {
			var sortedArray = Array.from(objectArray);
			sortedArray.sort(function(a, b) {
				// return b.votes_against_party_pct - a.votes_against_party_pct or b.missed_votes_pct - a.missed_votes_pct;
				return b[valueToCalculateTenpercent] - a[valueToCalculateTenpercent];
			});
			console.log("sortedArray b-a", sortedArray);

			const tbodyb = document.getElementById("senatorsBottomEngaged");
			let bottomtenpercent = Math.round(sortedArray.length * 0.1);
			let realtenpercent = sortedArray[bottomtenpercent - 1][valueToCalculateTenpercent];
			// console.log(bottomtenpercent, "bottomtenpercent");

			// console.log("sortedArray", sortedArray);

			createTables(sortedArray, realtenpercent, topOrBottom);
		} else if (topOrBottom == 1) {
			const tbodyt = document.getElementById("senatorsTopEngaged");
			// console.log("TOP BOTTOM senatormissvotes[2]", senatormissvotes[2]);

			var sortedArray = Array.from(objectArray);
			sortedArray.sort(function(a, b) {
				return a[valueToCalculateTenpercent] - b[valueToCalculateTenpercent];
			});
			console.log("sortedArray a - b", sortedArray);
			let bottomtenpercent = Math.round(sortedArray.length * 0.1);
			let realtenpercent = sortedArray[bottomtenpercent - 1][valueToCalculateTenpercent];
			createTables(sortedArray, realtenpercent, topOrBottom);
		}
	}

	/*********************************************************** CREATING TABLE ***************************************************/

	// Change sign to calculate top or down table, dummy value to select TopOrBottom (array[i].missed_votes_pct <= realtenpercent)

	function createTables(array, realtenpercent, topOrBottom) {
		console.log("Create Tables Array", array);

		// The missed_votes is value of missed votes from the Senator of top or bottomm 10%
		if (topOrBottom == 0) {
			var tbodyt = document.getElementById("senatorsBottomEngaged");

			for (i = 0; i <= array.length && array[i][valueToCalculateTenpercent] >= realtenpercent; i++) {
				var createRow = document.createElement("tr");
				for (j = 0; j < senatormissvotes.length; j++) {
					var createCell = document.createElement("td");
					//	Writting data and Full Name
					var fullName = (array[i].first_name + " " + (array[i].middle_name || " ") + " " + array[i].last_name).link(array[i].url);
					createCell.innerHTML = fullName;
					if (j == 1) {
						createCell.innerHTML = array[i][senatormissvotes[j]];
					} else if (j == 2) {
						createCell.innerHTML = array[i][senatormissvotes[j]] + " %";
					}

					createRow.appendChild(createCell);
				}
				tbodyt.appendChild(createRow);
			}
		}
		if (topOrBottom == 1) {
			var tbodyt = document.getElementById("senatorsTopEngaged");

			for (i = 0; i <= array.length && array[i][valueToCalculateTenpercent] <= realtenpercent; i++) {
				var createRow = document.createElement("tr");

				for (j = 0; j < senatormissvotes.length; j++) {
					var createCell = document.createElement("td");
					//	Writting data and Full Name
					var fullName = (array[i].first_name + " " + (array[i].middle_name || " ") + " " + array[i].last_name).link(array[i].url);
					createCell.innerHTML = fullName;
					if (j == 1) {
						createCell.innerHTML = array[i][senatormissvotes[j]];
					} else if (j == 2) {
						createCell.innerHTML = array[i][senatormissvotes[j]] + " %";
					}

					createRow.appendChild(createCell);
				}
				tbodyt.appendChild(createRow);
			}
		}
	}

	function moreOrLessButton() {
		var dots = document.getElementById("dots");
		var moreText = document.getElementById("more");
		var btnText = document.getElementById("myBtn");

		if (dots.style.display === "none") {
			dots.style.display = "inline";
			btnText.innerHTML = "Read more";
			moreText.style.display = "none";
		} else {
			dots.style.display = "none";
			btnText.innerHTML = "Read less";
			moreText.style.display = "inline";
		}
	}
})();
