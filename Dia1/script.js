//**********************
// *Tarea 1-Javascript**
// *********************

// Mostrar panel de bienvenida
alert("Bienvenido a CampusLands");

const opcion = prompt(
    "Por favor, selecciona tu rol:\n" +
    "1. Camper\n" +
    "2. Trainer\n" +
    "3. Coordinador"
);

// Funciones para los distintos menús
function menuCamper() {
    alert("Bienvenido Camper!\n1. Iniciar Sesion\n2. Registrarse");
}

function menuTrainer() {
    alert("Menú del Trainer\n1. Dame tu ID\n2. Ver Campers");
}

function menuCoordinador() {
    alert("Menú del Coordinador\n1. Dame tu ID\n2. Ver Campers\n3. Ver Trainers ");
}

// Redirigir al menú correspondiente
if (opcion === "1") {
    menuCamper();
} else if (opcion === "2") {
    menuTrainer();
} else if (opcion === "3") {
    menuCoordinador();
} else {
    alert("Opción inválida. Recarga la página e intenta de nuevo.");
}

//DEsarrollado por: Juan Jose Abril Roman/ C.C 1.097.495.953