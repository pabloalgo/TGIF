// DOM
var listaCompra = ["leche", "huevos", "pollo", "pizzas", "agua"];

var lista = document.getElementById("lista"); // <ul id="lista"></ul>
for (var i = 0; i < listaCompra.length; i++) {
	var item = document.createElement("li"); // <li></li>

	item.setAttribute("class", "list-item");

	// poner stringss dentro de li
	item.innerHTML = listaCompra[i]; //<li>leche</li>

	// append li to ul
	lista.appendChild(item); //<ul id="lista"> <li>leche</li></ul>
	console.log(lista);
	console.log(item);
}
