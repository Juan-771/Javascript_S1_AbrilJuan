//Primera manera de crear "arreglo"
let autos = ["Susuki", "Ford", "Mercedez"];
//Segunda manera de crear "arreglo"
let autos2 = new Array("Susuki", "Ford", "Mercedez");

//Agregarle un elemento al "arreglo"
autos.push("Audi");
//Manipulación de datos nulos
autos.push(null);
autos.push(null);
autos.push(null);
autos[5]="Nissan"
console.log(autos);

//Borrar datos de un arreglo
autos.pop();
console.log(autos);

//Reemplazar elementos de un arreglo
//splice(indice_donde_empieza,cantidad_a_eliminar,opcional:elementos a agregar)
autos.splice(4);
console.log(autos);
//Indice de un elemento
autos.push("Ford");
console.log(autos);
console.log(autos.indexOf("Ford"));
console.log(autos.lastIndexOf("Ford"));

//Ordenar
console.log(autos);
autos.push("audi");
autos.push(2);
autos.push("/");
autos.push("AUDI");
autos.sort();
console.log(autos);
//Reverse
autos.reverse();
console.log(autos);

//Set es una estructura de datos que permite almacenar valores únicos de cualquier tipo, 
// ya sean primitivos o referencias a objetos.
//Agregar en Set
let miSet = new Set();
miSet.add(1);
miSet.add(2);
//Eliminar en set
console.log(miSet); 
miSet.delete(1); // Devuelve true
miSet.delete(3); // Devuelve false, ya que 3 no está en el Set
//Tener en set
miSet.add(1);
miSet.add(2);
miSet.add("Pepe");
miSet.add("Pepe");
console.log(miSet.has(1));
console.log(miSet.has(3));
//Size en sets
console.log(miSet.size);

//Un Map puede tener claves de cualquier tipo de dato, incluyendo objetos o funciones.
let miMapa = new Map();

miMapa.set("nombre", "Juan");
miMapa.set("nombre", "Pipe");
miMapa.set({ id: 1 }, "Información adicional");
console.log(miMapa);
//Obtener dato con llave
console.log(miMapa.get("nombre"));
//Eliminar (llave)
miMapa.delete("nombre");
console.log(miMapa);
//Limpiar mapa
miMapa.clear();
console.log(miMapa);
