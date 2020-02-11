switch (true) {
	case j == 0 && array[i].middle_name == null:
		createCell.innerHTML = array[i].first_name + " " + array[i].last_name;

		// console.log(mates[i]);
		break;

	case j == 0:
		createCell.innerHTML =
			array[i].first_name +
			" " +
			array[i].middle_name +
			" " +
			array[i].last_name;

		console.log(mates[i]);
		break;
	case j < 0:
		createCell.innerHTML = array[i][senatorData[j]];
}
