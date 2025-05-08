document.addEventListener("DOMContentLoaded", () => {
    // Referencias a elementos del DOM
    const nuevoHeroeBtn = document.getElementById("nuevoHeroe")
    const guardarHeroeBtn = document.getElementById("guardarHeroe")
    const cancelarBtn = document.getElementById("cancelar")
    const registroTrajes = document.getElementById("registroTrajes")
    const addTrajeBtn = document.getElementById("addTraje")
    const trajesList = document.getElementById("trajesList")
  
    // URL de la API
    const API_URL = "https://68179af726a599ae7c3ae473.mockapi.io/Yo"
  
    // Contador para IDs únicos de trajes
    let trajeCounter = 0
  
    // Mostrar sección de trajes al hacer clic en "Nuevo Heroe"
    nuevoHeroeBtn.addEventListener("click", () => {
      registroTrajes.style.display = "block"
    })
  
    // Ocultar sección de trajes al hacer clic en "Cancelar"
    cancelarBtn.addEventListener("click", () => {
      registroTrajes.style.display = "none"
      trajesList.innerHTML = ""
    })
  
    // Añadir un nuevo campo de traje al hacer clic en el botón "+"
    addTrajeBtn.addEventListener("click", () => {
      addTrajeField()
    })
  
    // Función para añadir un nuevo campo de traje
    function addTrajeField() {
      const trajeId = `traje-${trajeCounter++}`
  
      // Crear elemento para el nuevo traje
      const trajeItem = document.createElement("div")
      trajeItem.className = "traje-item"
      trajeItem.id = trajeId
  
      // Crear input para el nombre del traje
      const trajeInput = document.createElement("input")
      trajeInput.type = "text"
      trajeInput.className = "form-control"
      trajeInput.placeholder = "Nombre del traje"
  
      // Crear botón para eliminar el traje
      const removeBtn = document.createElement("button")
      removeBtn.className = "btn btn-remove"
      removeBtn.innerHTML = "&times;"
      removeBtn.addEventListener("click", () => {
        document.getElementById(trajeId).remove()
      })
  
      // Añadir elementos al item de traje
      trajeItem.appendChild(trajeInput)
      trajeItem.appendChild(removeBtn)
  
      // Añadir el item de traje a la lista
      trajesList.appendChild(trajeItem)
    }
  
    // Guardar héroe en la API
    guardarHeroeBtn.addEventListener("click", async () => {
      // Mostrar indicador de carga
      guardarHeroeBtn.disabled = true
      guardarHeroeBtn.textContent = "Guardando..."
  
      // Recopilar datos del formulario
      const heroe = {
        personaje: document.getElementById("personaje").value,
        actor: document.getElementById("actor").value,
        edad: document.getElementById("edad").value,
        Ubicacion: document.getElementById("Ubicacion").value,
        Poster: document.getElementById("Poster").value,
        fecha: document.getElementById("fecha").value,
        Productora: document.getElementById("Productora").value,
        trajes: [],
      }
  
      // Recopilar trajes
      const trajesItems = trajesList.querySelectorAll(".traje-item")
      trajesItems.forEach((item) => {
        const trajeNombre = item.querySelector("input").value
        if (trajeNombre.trim() !== "") {
          heroe.trajes.push(trajeNombre)
        }
      })
  
      try {
        // Enviar datos a la API
        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(heroe),
        })
  
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`)
        }
  
        const data = await response.json()
        console.log("Héroe guardado en la API:", data)
  
        // Ocultar sección de trajes
        registroTrajes.style.display = "none"
  
        // Limpiar formulario
        limpiarFormulario()
        trajesList.innerHTML = ""
  
        alert("Héroe guardado correctamente en la API")
      } catch (error) {
        console.error("Error al guardar el héroe:", error)
        alert("Error al guardar el héroe. Por favor, intenta de nuevo.")
      } finally {
        // Restaurar el botón
        guardarHeroeBtn.disabled = false
        guardarHeroeBtn.textContent = "Guardar Heroe"
      }
    })
  
    // Función para limpiar el formulario
    function limpiarFormulario() {
      document.getElementById("personaje").value = ""
      document.getElementById("actor").value = ""
      document.getElementById("edad").value = ""
      document.getElementById("Ubicacion").value = ""
      document.getElementById("Poster").value = ""
      document.getElementById("fecha").value = ""
      document.getElementById("Productora").value = "marvel"
    }
  
    // Función para cargar héroes desde la API (opcional)
    async function cargarHeroes() {
      try {
        const response = await fetch(API_URL)
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`)
        }
        const heroes = await response.json()
        console.log("Héroes cargados:", heroes)
        // Aquí podrías mostrar los héroes en una tabla o lista
      } catch (error) {
        console.error("Error al cargar los héroes:", error)
      }
    }
  
    // Cargar héroes al iniciar la página (opcional)
    // cargarHeroes()
  })