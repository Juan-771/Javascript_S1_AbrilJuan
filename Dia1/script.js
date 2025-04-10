//**********************
// *Tarea 1-Javascript**
// *********************

// Mostrar panel de bienvenida
alert("Bienvenido a CampusLands");

const opcion = prompt(
    "Por favor, selecciona tu rol:\n" +
    "1. Estudiante\n" +
    "2. Trainer\n" +
    "3. Coordinador"
);

// Funciones para los distintos menús
function menuEstudiante() {
    alert("Bienvenido Camper!\n1. Iniciar Sesion\n");
}

function menuTrainer() {
    alert("Menú del Trainer\nDame tu ID\n");
}

function menuCoordinador() {
    alert("Menú del Coordinador\n1. Dame tu ID\n ");
}

// Redirigir al menú correspondiente
if (opcion === "1") {
    menuEstudiante();
} else if (opcion === "2") {
    menuTrainer();
} else if (opcion === "3") {
    menuCoordinador();
} else {
    alert("Opción inválida. Recarga la página e intenta de nuevo.");
}

//DEsarrollado por: Juan Jose Abril Roman/ C.C 1.097.495.953