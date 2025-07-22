// Variables globales
let currentModule = "home"
let currentView = "home"
let currentModuleData = null
let currentTopicData = null
let sidebarVisible = true
let notificationsContainer = null
let actualCurrentModule = "home" // Nueva variable para rastrear el módulo actual real

// Variables para Speech Synthesis
let utterance = null
let isSpeaking = false
let listenBtn = null

function isMobileOrTablet() {
  return /Mobi|Android|iPhone|iPad|iPod|Opera Mini|IEMobile/i.test(navigator.userAgent);
}

window.addEventListener("DOMContentLoaded", () => {
  const deviceWarning = document.getElementById("deviceWarning");
  const appContainer = document.getElementById("appContainer"); // envoltorio principal de tu app (ver abajo)

  if (isMobileOrTablet()) {
    deviceWarning.style.display = "flex";
    if (appContainer) appContainer.style.display = "none";
  } else {
    deviceWarning.style.display = "none";
    if (appContainer) appContainer.style.display = "block";
  }
});


// Banco de preguntas personalizado para cada tema
const customTestQuestions = {
  // Módulo 1
  "1-1": [
    // Módulo 1, Tema 1
    {
      question: "¿Qué es una variable de proceso?",
      options: [
        "Un factor que se mantiene constante",
        "Un parámetro que se controla durante un proceso",
        "Una medida de tiempo",
        "Un tipo de instrumento",
      ],
      correct: 1,
    },
    {
      question: "¿Cuál es el objetivo principal del control de variables?",
      options: [
        "Aumentar los costos",
        "Optimizar el desarrollo del proceso",
        "Complicar el sistema",
        "Reducir la eficiencia",
      ],
      correct: 1,
    },
    {
      question: "¿Qué tipo de variables existen en un proceso?",
      options: [
        "Solo variables independientes",
        "Variables dependientes e independientes",
        "Solo variables dependientes",
        "Variables aleatorias únicamente",
      ],
      correct: 1,
    },
    {
      question: "¿Por qué es importante monitorear las variables?",
      options: [
        "Para mantener la calidad del proceso",
        "Para aumentar el tiempo de producción",
        "Para complicar el análisis",
        "Para reducir la productividad",
      ],
      correct: 0,
    },
    {
      question: "¿Qué herramientas se usan para medir variables?",
      options: [
        "Solo calculadoras",
        "Instrumentos de medición especializados",
        "Solo computadoras",
        "Herramientas manuales básicas",
      ],
      correct: 1,
    },
  ],
  "1-2": [
    // Módulo 1, Tema 2
    {
      question: "Responde las preguntas sobre conversión de unidades de temperatura. Se trata de ejercicios de conversión entre °C, °F y K, preguntas de verdadero o falso y selección múltiple.<br><br>1- Convierte 100°C a Fahrenheit usando la fórmula: <br><br>°F = (°C × 9⁄5) + 32",
      options: [
        "87,5 °F",
        "212 °F ",
        "148 °F",
        "210 °C",
      ],
      correct: 1,
    },
    {
      question: "La temperatura de congelación del agua en Kelvin es 0 K.",
      options: [
        "Verdadero",
        "Falso",
      ],
      correct: 1,
    },
    {
      question: "100°F es mayor que 40°C",
      options: [
        "Verdadero",
        "Falso",
      ],
      correct: 1,
    },
    {
      question: "¿Qué afirmación es correcta sobre la relación entre °C y K?",
      options: [
        "El valor en °C siempre es mayor que en K", 
        "Ambas escalas tienen la misma magnitud numérica", 
        "El valor en K siempre es mayor que en °C por 273.15 unidades", 
        "Para convertir de °C a K se debe restar 273.15"],
      correct: 2,
    },
    {
      question: "¿Cuál de las siguientes afirmaciones sobre la conversión de diferencias de temperatura (∆T) entre °C y K es correcta?",
      options: [
        "Un cambio de 1 °C es igual a un cambio de 1 K",
        "Un cambio de 1 °C equivale a un cambio de 273.15 K",
        "Un cambio de 1 K equivale a un cambio de 0 °C",
        "Para convertir ∆°C a ∆K se debe sumar 273.15",
      ],
      correct: 0,
    },
  ],
  "1-3": [
    // Módulo 1, Tema 3
    {
      question: "Seleccione las respuestas correctas:<br><br>Una corriente de oxígeno (O₂) entra a un reactor con flujo molar de 10 mol/min. ¿Cuál es su flujo másico en g/min?",
      options: [
        "320 g/min",
        "0,32 g/min",
        "3,2 g/min",
        "160 g/min",
      ],
      correct: 0,
    },
    {
      question: "Se suministra un flujo de nitrógeno (N₂) a razón de 22,4 L/min en condiciones estándar (0 °C y 1 atm). <br><br>¿Cuál es el flujo molar? <br><br>DATO: 1 mol de gas ocupa 22,4 L en condiciones estándar.",
      options: [
        "0,5 mol/min",
        "2 mol/min",
        "1 mol/min",
        "10 mol/min",
      ],
      correct: 2,
    },
    {
      question: `Ordena de mayor a menor los siguientes flujos másicos:<br><br>
        A: 5 mol/min de CH₄ (PM = 16,0 g/mol)<br>
        B: 2 mol/min de CO₂ (PM = 44,0 g/mol)<br>
        C: 3 mol/min de O₂ (PM = 32,0 g/mol)`,
      options: [
        "B > C > A",
        "C > B > A",
        "C > B > A",
        "A > B > C",
      ],
      correct: 1,
    },
    {
      question: "Un flujo de dióxido de carbono (CO₂) entra a una columna de absorción con un flujo másico de 88 g/min. <br><br>¿Cuál es el flujo molar? <br><br> Dato: Masa molar del CO₂ = 44.0 g/mol .",
      options: [
        "4 mol/min", 
        "2 mol/min", 
        "1 mol/min", 
        "0.5 mol/min"],
      correct: 1,
    },
  ],
  // Módulo 2
  "2-1": [
    // Módulo 2, Tema 1
    {
      question: "¿Qué caracteriza a las tormentas en el mar?",
      options: ["Vientos suaves", "Condiciones climáticas extremas", "Aguas tranquilas", "Cielos despejados"],
      correct: 1,
    },
    {
      question: "¿Cuál es la primera señal de una tormenta?",
      options: [
        "Cambios en la presión atmosférica",
        "Aumento de la temperatura",
        "Disminución del viento",
        "Cielo completamente azul",
      ],
      correct: 0,
    },
    {
      question: "¿Qué equipo es esencial durante una tormenta?",
      options: ["Sombrillas", "Equipos de seguridad y navegación", "Ropa ligera", "Instrumentos musicales"],
      correct: 1,
    },
    {
      question: "¿Cómo se debe navegar en baja visibilidad?",
      options: ["A máxima velocidad", "Con instrumentos de navegación y precaución", "Sin instrumentos", "Solo de día"],
      correct: 1,
    },
    {
      question: "¿Qué protocolo seguir en tormentas severas?",
      options: [
        "Ignorar la tormenta",
        "Buscar refugio y seguir protocolos de seguridad",
        "Acelerar el viaje",
        "Apagar todos los equipos",
      ],
      correct: 1,
    },
  ],
  // AGREGADO: Preguntas para el tema de navegación nocturna
  "2-4": [
    {
      question: "¿Cuál es la principal ventaja de la navegación nocturna?",
      options: [
        "Mayor velocidad",
        "Movimientos sigilosos y no detectados",
        "Mejor visibilidad",
        "Menos peligros marinos",
      ],
      correct: 1,
    },
    {
      question: "¿Qué constelación es más importante para la navegación nocturna?",
      options: ["Orión", "La Osa Mayor y la Estrella Polar", "Casiopea", "La Cruz del Sur"],
      correct: 1,
    },
    {
      question: "¿Cuál es un peligro específico de la navegación nocturna?",
      options: [
        "Exceso de luz solar",
        "Colisiones con obstáculos no visibles",
        "Demasiado viento",
        "Aguas muy tranquilas",
      ],
      correct: 1,
    },
    {
      question: "¿Qué técnica se usa para navegación silenciosa?",
      options: [
        "Motores a máxima potencia",
        "Velas silenciosas y remos amortiguados",
        "Música alta para distraer",
        "Luces brillantes",
      ],
      correct: 1,
    },
    {
      question: "¿Cómo se aprovechan las corrientes nocturnas?",
      options: [
        "Se ignoran completamente",
        "Se usan para movimiento eficiente y silencioso",
        "Solo se usan de día",
        "Se evitan siempre",
      ],
      correct: 1,
    },
  ],
}

// Datos de los módulos con soporte para imágenes (solo 2 módulos)
const modulesData = {
  1: {
    title: "MÓDULO 1: VARIABLES DE PROCESO",
    subtitle: "Fundamentos del Control de Procesos",
    topics: [
      {
        id: 1,
        title: "Isla de la presión",
        icon: "fas fa-anchor",
        image: "images/30.jpg", // Imagen para el punto del mapa
        content: {
          title: "La leyenda del \"One Process\"",
          text: "En un vasto océano de conocimiento, existe una leyenda sobre un tesoro llamado \"One Process \", un poder que otorga a su poseedor el control absoluto sobre los procesos químicos e industriales. Se dice que aquel que logre dominar las variables de proceso podrá navegar por los mares de la ingeniería sin miedo a naufragar.\nTú, joven aprendiz, eres navegante en esta travesía. Para encontrar el One Process, deberás viajar a través de cinco islas legendarias, cada una custodiada por un guardián que pondrá a prueba tu ingenio y habilidades. ¿Serás capaz de superar los desafíos y convertirte en el Gran Monarca de los Procesos?",
          steps: [
          ],
        },
        sidebarButtons: [
          { id: "que-es", label: "Introducción", icon: "fas fa-question-circle", type: "content" },
          { id: "variablesP", label: "Las variables de proceso", icon: "fas fa-bullseye", type: "content" },
          { id: "Ipresion", label: "Isla de la presión", icon: "fas fa-stopwatch", type: "content" },
          { id: "Cpresion", label: "¿Qué es la presión?", icon: "fas fa-stopwatch", type: "content" },
          { id: "Tpresion", label: "Tipos de presión", icon: "fas fa-stopwatch", type: "content" },
          { id: "medicion", label: "Instrumentos de medición", icon: "fas fa-stopwatch", type: "content" },
          { id: "desafio", label: "Desafío", icon: "fas fa-lightbulb", type: "content" },
          // { id: "test", label: "Realizar Test", icon: "fas fa-clipboard-check", type: "test" },
        ],
      },
      {
        id: 2,
        title: "Isla del fuego eterno",
        icon: "fas fa-book-open",
        image: "images/2.jpg",
        content: {
          title: "El Desafío de Calor'Bel",
          text: "Los conceptos básicos incluyen la comprensión de variables controladas, manipuladas y de perturbación, así como los principios de retroalimentación y control automático.",
          steps: [
          ],
        },
        sidebarButtons: [
          { id: "que-es", label: "El Desafío de Calor'Bel", icon: "fas fa-question-circle", type: "content" },
          { id: "islaC", label: "Isla del fuego eterno", icon: "fas fa-fire", type: "content" },
          { id: "conversion", label: "Conversión de temperaturas", icon: "fas fa-fire", type: "content" },
          { id: "Vtemperatura", label: "Temperatura", icon: "fas fa-fire", type: "content" },
          { id: "test", label: "Desafío", icon: "fas fa-lightbulb", type: "test" },
        ],
      },
      {
        id: 3,
        title: "Isla del gran flujo",
        icon: "fas fa-tools",
        image: "images/3.jpg",
        content: {
          title: "Isla del gran flujo",
          text: "Las herramientas incluyen sensores, transmisores, controladores y actuadores que permiten medir, procesar y controlar las variables del proceso.",
          steps: [
          ],
        },
        sidebarButtons: [
          { id: "que-es", label: "Prueba del capitán Venturi", icon: "fas fa-question-circle", type: "content" },
          { id: "Iflujo", label: "Isla del gran flujo", icon: "fas fa-tint", type: "content" },
          { id: "Vflujo", label: "Flujo", icon: "fas fa-tint", type: "content" },
          { id: "test", label: "Desafío", icon: "fas fa-lightbulb", type: "test" },
        ],
      },
      {
        id: 4,
        title: "Isla de la concentración",
        icon: "fas fa-ship",
        image: "images/5.jpg",
        content: {
          title: "Isla de la concentración",
          text: "La preparación incluye el diseño del sistema, calibración de instrumentos y establecimiento de procedimientos operativos.",
          steps: [
          ],
        },
        sidebarButtons: [
          { id: "que-es", label: "El Reto de Alquimix", icon: "fas fa-question-circle", type: "content" },
          { id: "concentracion", label: "Isla de la concentración", icon: "fas fa-flask	", type: "content" },
          { id: "expresar", label: "Formas de expresar la concentración", icon: "fas fa-flask	", type: "content" },
          { id: "VideoC", label: "Concentración", icon: "fas fa-flask", type: "content" },
          { id: "desafioA", label: "Desafío", icon: "fas fa-lightbulb", type: "content" },
        ],
      },
      {
        id: 5,
        title: "Isla del Gran Saber",
        icon: "fas fa-compass",
        image: "images/8.jpg",
        content: {
          title: "Isla del Gran Saber",
          text: "La implementación involucra la puesta en marcha del sistema, ajuste de parámetros y optimización del rendimiento.",
          steps: [
          ],
        },
        sidebarButtons: [
          { id: "que-es", label: "La prueba del One Process", icon: "fas fa-question-circle", type: "content" },
          { id: "proceso", label: "Proceso real", icon: "fas fa-book-open", type: "content" },
          { id: "desafioG", label: "Desafío", icon: "fas fa-lightbulb", type: "content" },
        ],
      },
    ],
  },
  2: {
    title: "MÓDULO 2: DESAFÍOS DEL MAR",
    subtitle: "Pruebas y Aventuras Peligrosas",
    topics: [
      {
        id: 1,
        title: "TORMENTAS",
        icon: "fas fa-bolt",
        image: "/placeholder.svg?height=90&width=90",
        content: {
          title: "Navegando en Tormentas",
          text: "Las tormentas representan uno de los mayores desafíos para cualquier pirata. Aprender a navegar en condiciones adversas requiere técnicas especiales, conocimiento meteorológico y valentía.",
          steps: [
            "a. Identificación temprana de señales de tormenta.",
            "b. Técnicas de navegación en condiciones de baja visibilidad.",
            "c. Protocolos de seguridad durante tormentas severas.",
          ],
        },
        sidebarButtons: [
          { id: "que-es", label: "¿Qué es?", icon: "fas fa-question-circle", type: "content" },
          { id: "tipos-tormentas", label: "Tipos de Tormentas", icon: "fas fa-cloud-rain", type: "content" },
          { id: "preparacion", label: "Preparación", icon: "fas fa-hard-hat", type: "content" },
          { id: "supervivencia", label: "Supervivencia", icon: "fas fa-life-ring", type: "content" },
          { id: "test", label: "Realizar Test", icon: "fas fa-clipboard-check", type: "test" },
        ],
      },
      {
        id: 2,
        title: "BATALLAS NAVALES",
        icon: "fas fa-sword",
        image: "/placeholder.svg?height=90&width=90",
        content: {
          title: "Estrategias de Combate Marino",
          text: "Las batallas navales requieren estrategia, coordinación y conocimiento táctico. Los piratas deben dominar el arte del combate en alta mar.",
          steps: [
            "a. Formaciones de combate y maniobras tácticas.",
            "b. Uso efectivo de armamento naval.",
            "c. Técnicas de abordaje y combate cuerpo a cuerpo.",
          ],
        },
        sidebarButtons: [
          { id: "que-es", label: "¿Qué es?", icon: "fas fa-question-circle", type: "content" },
          { id: "estrategias", label: "Estrategias", icon: "fas fa-chess", type: "content" },
          { id: "armamento", label: "Armamento", icon: "fas fa-bomb", type: "content" },
          { id: "tacticas", label: "Tácticas", icon: "fas fa-fist-raised", type: "content" },
          { id: "test", label: "Realizar Test", icon: "fas fa-clipboard-check", type: "test" },
        ],
      },
      {
        id: 3,
        title: "MONSTRUOS MARINOS",
        icon: "fas fa-dragon",
        image: "/placeholder.svg?height=90&width=90",
        content: {
          title: "Enfrentando Criaturas del Abismo",
          text: "Los océanos albergan criaturas misteriosas y peligrosas. Los piratas deben estar preparados para enfrentar desde krakens gigantes hasta sirenas encantadoras.",
          steps: [
            "a. Identificación de diferentes tipos de criaturas marinas.",
            "b. Estrategias de evasión y confrontación.",
            "c. Uso de amuletos y protecciones místicas.",
          ],
        },
        sidebarButtons: [
          { id: "que-es", label: "¿Qué es?", icon: "fas fa-question-circle", type: "content" },
          { id: "bestiario", label: "Bestiario", icon: "fas fa-dragon", type: "content" },
          { id: "defensas", label: "Defensas", icon: "fas fa-shield-alt", type: "content" },
          { id: "leyendas", label: "Leyendas", icon: "fas fa-scroll", type: "content" },
          { id: "test", label: "Realizar Test", icon: "fas fa-clipboard-check", type: "test" },
        ],
      },
      {
        id: 4,
        title: "NAVEGACIÓN NOCTURNA",
        icon: "fas fa-moon",
        image: "/placeholder.svg?height=90&width=90",
        content: {
          title: "Secretos de la Navegación Nocturna",
          text: "La navegación nocturna presenta desafíos únicos pero también oportunidades especiales. Los piratas expertos pueden usar la oscuridad para movimientos sigilosos.",
          steps: [
            "a. Uso de constelaciones para navegación.",
            "b. Técnicas de navegación silenciosa.",
            "c. Aprovechamiento de corrientes nocturnas.",
          ],
        },
        sidebarButtons: [
          { id: "que-es", label: "¿Qué es?", icon: "fas fa-question-circle", type: "content" },
          { id: "constelaciones", label: "Constelaciones", icon: "fas fa-star", type: "content" },
          { id: "sigilo", label: "Técnicas de Sigilo", icon: "fas fa-user-ninja", type: "content" },
          { id: "peligros", label: "Peligros Nocturnos", icon: "fas fa-exclamation-triangle", type: "content" },
          { id: "test", label: "Realizar Test", icon: "fas fa-clipboard-check", type: "test" }, // ARREGLADO: Cambié de "content" a "test"
        ],
      },
      {
        id: 5,
        title: "SUPERVIVENCIA",
        icon: "fas fa-life-ring",
        image: "/placeholder.svg?height=90&width=90",
        content: {
          title: "Técnicas de Supervivencia Marina",
          text: "La supervivencia en el mar requiere conocimientos especializados sobre obtención de agua dulce, pesca y navegación de emergencia.",
          steps: [
            "a. Obtención y purificación de agua en el mar.",
            "b. Técnicas de pesca y obtención de alimentos.",
            "c. Construcción de refugios flotantes de emergencia.",
          ],
        },
        sidebarButtons: [
          { id: "que-es", label: "¿Qué es?", icon: "fas fa-question-circle", type: "content" },
          { id: "agua-alimento", label: "Agua y Alimento", icon: "fas fa-utensils", type: "content" },
          { id: "refugio", label: "Refugio", icon: "fas fa-home", type: "content" },
          { id: "rescate", label: "Señales de Rescate", icon: "fas fa-flag", type: "content" },
          { id: "test", label: "Realizar Test", icon: "fas fa-clipboard-check", type: "test" },
        ],
      },
    ],
  },
}

// Inicialización cuando se carga la página
document.addEventListener("DOMContentLoaded", () => {
  console.log("🏴‍☠️ Iniciando La Aventura del Tesoro Pirata...")
  initializeApp()
})

function initializeApp() {
  setupEventListeners()
  showNotification("¡Bienvenido a la Aventura del Tesoro Pirata!", "success")
}

function setupEventListeners() {
  console.log("Configurando event listeners...")

  // Navegación del sidebar
  const menuBtn = document.getElementById("menuBtn")
  const homeButton = document.getElementById("homeBtn")
  const compassBtn = document.getElementById("compassBtn")
  const helpBtn = document.getElementById("helpBtn")

  // Botón Menú - Mostrar módulos
  if (menuBtn) {
    menuBtn.addEventListener("click", function () {
      console.log("Menu button clicked")
      showMenuContent()
      setActiveNavItem(this)
    })
  }

  // Botón Inicio - Mostrar página principal
  if (homeButton) {
    homeButton.addEventListener("click", function () {
      console.log("Home button clicked")
      showHomeContent()
      setActiveNavItem(this)
    })
  }

  // Botón Navegación
  if (compassBtn) {
    compassBtn.addEventListener("click", function () {
      console.log("Compass button clicked")
      setActiveNavItem(this)
    })
  }

  // Botón Ayuda
  if (helpBtn) {
    helpBtn.addEventListener("click", function () {
      console.log("Help button clicked")
      setActiveNavItem(this)
    })
  }

  // Tarjetas de módulos
  const moduleCards = document.querySelectorAll(".module-card")
  moduleCards.forEach((card) => {
    card.addEventListener("click", function () {
      const moduleNumber = this.getAttribute("data-module")
      console.log("Module clicked:", moduleNumber)
      showModuleDetails(moduleNumber)
    })
  })

  // Paginación
  const pageButtons = document.querySelectorAll(".page-btn")
  pageButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      const moduleId = this.getAttribute("data-module")
      console.log("Module button clicked:", moduleId)
      navigateToModule(moduleId)
    })
  })

  const nextButton = document.getElementById("pageNext")
  if (nextButton) {
    nextButton.addEventListener("click", () => {
      console.log("Next button clicked, current module:", actualCurrentModule)
      const modules = ["home", "1", "2"] // Solo 2 módulos
      const currentIndex = modules.indexOf(actualCurrentModule)
      if (currentIndex < modules.length - 1) {
        const nextModule = modules[currentIndex + 1]
        navigateToModule(nextModule)
      } else {
        showNotification("¡Has completado toda la aventura!", "success")
      }
    })
  }

  // Botón volver a módulos
  const backToModules = document.getElementById("backToModules")
  if (backToModules) {
    backToModules.addEventListener("click", () => {
      document.getElementById("moduleRouteContent").classList.remove("active")
      showMenuContent()
      setActiveNavItem(document.getElementById("menuBtn"))
    })
  }

  // Botón volver a ruta
  const backToRoute = document.getElementById("backToRoute")
  if (backToRoute) {
    backToRoute.addEventListener("click", () => {
      document.getElementById("topicContent").classList.remove("active")
      if (currentModuleData) {
        showModuleRoute(currentModuleData)
      }
    })
  }

  // Botón toggle del sidebar
  const sidebarToggle = document.getElementById("sidebarToggle")
  if (sidebarToggle) {
    sidebarToggle.addEventListener("click", toggleSidebar)
  }

  // Botón de escuchar tema (Speech-to-Text)
  listenBtn = document.getElementById("listenBtn")
  if (listenBtn) {
    listenBtn.addEventListener("click", toggleSpeech)
  }
}

function navigateToModule(moduleId) {
  console.log("Navigating to module:", moduleId)

  // Actualizar botones de paginación
  const pageButtons = document.querySelectorAll(".page-btn")
  pageButtons.forEach((btn) => {
    btn.classList.remove("active")
    if (btn.getAttribute("data-module") === moduleId) {
      btn.classList.add("active")
    }
  })

  currentModule = moduleId
  actualCurrentModule = moduleId // Actualizar el módulo actual real

  // Navegar según el módulo
  if (moduleId === "home") {
    showNotification(`Navegando a ${getModuleName(moduleId)}`, "success")
    showHomeContent()
    setActiveNavItem(document.getElementById("homeBtn"))
  } else {
    showModuleDetails(moduleId)
  }

  
}

function getModuleName(moduleId) {
  const moduleNames = {
    home: "Inicio",
    1: "Módulo 1",
    2: "Módulo 2",
  }
  return moduleNames[moduleId] || "Módulo Desconocido"
}

function showModuleDetails(moduleNumber) {
  const moduleData = modulesData[moduleNumber]
  if (!moduleData) return

  currentModuleData = moduleData
  actualCurrentModule = moduleNumber.toString() // Asegurar que sea string

  // Actualizar botones de paginación para mostrar concordancia
  const pageButtons = document.querySelectorAll(".page-btn")
  pageButtons.forEach((btn) => {
    btn.classList.remove("active")
    if (btn.getAttribute("data-module") === moduleNumber) {
      btn.classList.add("active")
    }
  })

  showModuleRoute(moduleData)
  showNotification(`Explorando ${moduleData.title}...`, "success")
}

function showModuleRoute(moduleData) {
  // Ocultar otras secciones
  document.getElementById("homeContent").classList.add("hidden")
  document.getElementById("menuContent").classList.remove("active")
  document.getElementById("topicContent").classList.remove("active")

  // Detener cualquier reproducción de voz al cambiar de vista
  stopSpeech()

  // Mostrar la sección de ruta del módulo
  const moduleRouteContent = document.getElementById("moduleRouteContent")
  moduleRouteContent.classList.add("active")

  // Actualizar el título
  document.getElementById("routeTitle").textContent = moduleData.title

  // Generar los puntos de la ruta
  generateRoutePoints(moduleData.topics)

  // Mostrar sidebar cuando estamos en vista normal
  showSidebarInNormalView()
}

function generateRoutePoints(topics) {
  const container = document.querySelector(".route-points-container")
  container.innerHTML = ""

  // Posiciones alternadas para crear efecto de mapa
  const positions = [
    { x: 15, y: 25 },
    { x: 30, y: 65 },
    { x: 45, y: 25 },
    { x: 60, y: 65 },
    { x: 75, y: 25 },
  ]

  topics.forEach((topic, index) => {
    const pointElement = document.createElement("div")
    pointElement.className = "route-point"
    pointElement.style.left = positions[index].x + "%"
    pointElement.style.top = positions[index].y + "%"
    pointElement.setAttribute("data-topic-id", topic.id)

    // Crear el contenido del punto con soporte para imágenes
    const pointContent = `
      <div class="point-circle" data-number="${topic.id}">
        ${
          topic.image
            ? `<img src="${topic.image}" alt="${topic.title}" class="point-image" />`
            : `<i class="${topic.icon}"></i>`
        }
      </div>
      <div class="point-info">
        <span class="point-title">${topic.title}</span>
      </div>
    `

    pointElement.innerHTML = pointContent

    pointElement.addEventListener("click", () => {
      showTopicContent(topic)
    })

    container.appendChild(pointElement)
  })
}

function showTopicContent(topicData) {
  currentTopicData = topicData

  // Ocultar la vista de ruta del módulo
  document.getElementById("moduleRouteContent").classList.remove("active")

  // Mostrar la vista de contenido del tema
  const topicContent = document.getElementById("topicContent")
  topicContent.classList.add("active")

  // Actualizar el título del tema
  document.getElementById("topicTitle").textContent = `${currentModuleData.title} - ${topicData.title}`

  // Generar la lista de puntos en el sidebar
  generateTopicPointsList()

  // Cargar el contenido del tema
  loadTopicContent(topicData)

  // Ocultar sidebar automáticamente cuando se muestra contenido de tema
  hideSidebarInTopicView()
}

function generateTopicPointsList() {
  const container = document.getElementById("topicPointsList")
  container.innerHTML = ""

  currentModuleData.topics.forEach((topic) => {
    const pointItem = document.createElement("div")
    pointItem.className = `topic-point-item ${topic.id === currentTopicData.id ? "active" : ""}`
    pointItem.setAttribute("data-topic-id", topic.id)

    pointItem.innerHTML = `
      <div class="topic-point-icon">
        ${
          topic.image
            ? `<img src="${topic.image}" class="topic-icon-image" alt="${topic.title}">`
            : `<i class="${topic.icon}"></i>`
        }
      </div>
      <div class="topic-point-text">
        <span class="number">${topic.id}</span>
        <span class="title">${topic.title}</span>
      </div>
    `
    pointItem.addEventListener("click", () => {
      const newTopicData = currentModuleData.topics.find((t) => t.id === topic.id)
      if (newTopicData) {
        currentTopicData = newTopicData
        loadTopicContent(newTopicData)

        container.querySelectorAll(".topic-point-item").forEach((item) => {
          item.classList.remove("active")
        })
        pointItem.classList.add("active")

        document.getElementById("topicTitle").textContent = `${currentModuleData.title} - ${newTopicData.title}`
      }
    })

    container.appendChild(pointItem)
  })
}

function loadTopicContent(topicData) {
  generateTopicInfoSidebar()
  updateTopicMainContent("que-es")
  updateInfoButtonsState("que-es")
  // Reiniciar el botón de voz al cargar un nuevo tema
  resetSpeechButton()
}

function generateTopicInfoSidebar() {
  const container = document.querySelector(".topic-info-sidebar .info-buttons")
  if (!container || !currentTopicData) return

  container.innerHTML = ""

  currentTopicData.sidebarButtons.forEach((button) => {
    const btnElement = document.createElement("button")
    btnElement.className = `info-btn ${button.id === "que-es" ? "active" : ""}`
    btnElement.setAttribute("data-info", button.id)
    btnElement.setAttribute("data-type", button.type)

    btnElement.innerHTML = `
      <i class="${button.icon}"></i>
      <span>${button.label}</span>
    `

    if (button.type === "test") {
      btnElement.addEventListener("click", (e) => {
        e.preventDefault()
        stopSpeech() // Detener la voz al abrir el test
        showTestModal(currentTopicData)
      })
    } else {
      btnElement.addEventListener("click", (e) => {
        e.preventDefault()
        updateTopicMainContent(button.id)
        updateInfoButtonsState(button.id)
        resetSpeechButton() // Reiniciar el botón de voz al cambiar de subtema
      })
    }

    container.appendChild(btnElement)
  })
}

function showTestModal(topicData) {
  // Obtener preguntas personalizadas para este tema específico
  const testQuestions = getCustomTestQuestions(topicData)

  const modal = document.createElement("div")
  modal.className = "modal-overlay test-modal"
  modal.innerHTML = `
    <div class="modal-content test-content">
      <div class="modal-header">
        <h3><i class="fas fa-clipboard-check"></i> Test: ${topicData.title}</h3>
        <button class="modal-close">&times;</button>
      </div>
      <div class="modal-body test-body">
        <div class="test-progress">
          <div class="progress-bar">
            <div class="progress-fill" style="width: 0%"></div>
          </div>
          <span class="progress-text">Pregunta 1 de ${testQuestions.length}</span>
        </div>
        <div class="test-questions-container">
          ${generateTestHTML(testQuestions)}
        </div>
      </div>
      <div class="modal-footer test-footer">
        <button class="modal-btn test-prev" disabled>Anterior</button>
        <button class="modal-btn test-next">Siguiente</button>
        <button class="modal-btn test-submit" style="display: none;">Finalizar Test</button>
      </div>
    </div>
  `

  document.body.appendChild(modal)
  setupTestLogic(modal, testQuestions)

  const closeBtn = modal.querySelector(".modal-close")
  closeBtn.addEventListener("click", () => {
    document.body.removeChild(modal)
  })

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      document.body.removeChild(modal)
    }
  })
}

// Nueva función para obtener preguntas personalizadas
function getCustomTestQuestions(topicData) {
  const moduleId = Object.keys(modulesData).find((key) =>
    modulesData[key].topics.some((topic) => topic.id === topicData.id && topic.title === topicData.title),
  )

  const questionKey = `${moduleId}-${topicData.id}`

  // Retornar preguntas personalizadas si existen, sino usar preguntas genéricas
  return customTestQuestions[questionKey] || generateGenericTestQuestions(topicData)
}

// Función de respaldo para generar preguntas genéricas
function generateGenericTestQuestions(topicData) {
  return [
    {
      question: `¿Cuál es el concepto principal de ${topicData.title}?`,
      options: [
        "Una técnica básica de navegación",
        topicData.content.title,
        "Un tipo de embarcación pirata",
        "Una herramienta de medición",
      ],
      correct: 1,
    },
    {
      question: `¿Cuál de los siguientes es un paso importante en ${topicData.title}?`,
      options: [
        topicData.content.steps[0],
        "Contar monedas de oro",
        "Limpiar la cubierta del barco",
        "Cantar canciones piratas",
      ],
      correct: 0,
    },
    {
      question: `¿Por qué es importante dominar ${topicData.title}?`,
      options: [
        "Para impresionar a otros piratas",
        "Para encontrar más tesoros",
        "Para desarrollar habilidades esenciales de navegación pirata",
        "Para decorar el barco",
      ],
      correct: 2,
    },
    {
      question: `¿Cuál es una aplicación práctica de ${topicData.title}?`,
      options: [
        "Decorar el barco con banderas",
        "Aplicación en navegación diaria y expediciones",
        "Contar historias a la tripulación",
        "Limpiar las velas del barco",
      ],
      correct: 1,
    },
    {
      question: `¿Qué recursos son necesarios para ${topicData.title}?`,
      options: [
        "Solo buena suerte",
        "Herramientas básicas, materiales de apoyo y conocimiento específico",
        "Un loro parlante",
        "Muchas monedas de oro",
      ],
      correct: 1,
    },
  ]
}

function generateTestHTML(questions) {
  return questions
    .map(
      (q, index) => `
    <div class="test-question ${index === 0 ? "active" : ""}" data-question="${index}">
      <h4 class="question-title">${q.question}</h4>
      <div class="question-options">
        ${q.options
          .map(
            (option, optIndex) => `
          <label class="option-label">
            <input type="radio" name="question_${index}" value="${optIndex}">
            <span class="option-text">${option}</span>
          </label>
        `,
          )
          .join("")}
      </div>
    </div>
  `,
    )
    .join("")
}

function setupTestLogic(modal, questions) {
  let currentQuestion = 0
  const answers = {}

  const prevBtn = modal.querySelector(".test-prev")
  const nextBtn = modal.querySelector(".test-next")
  const submitBtn = modal.querySelector(".test-submit")
  const progressFill = modal.querySelector(".progress-fill")
  const progressText = modal.querySelector(".progress-text")

  function updateProgress() {
    const progress = ((currentQuestion + 1) / questions.length) * 100
    progressFill.style.width = progress + "%"
    progressText.textContent = `Pregunta ${currentQuestion + 1} de ${questions.length}`
  }

  function showQuestion(index) {
    const questionElements = modal.querySelectorAll(".test-question")
    questionElements.forEach((el, i) => {
      el.classList.toggle("active", i === index)
    })

    // Controlar visibilidad de botones manteniendo posición
    prevBtn.disabled = index === 0
    prevBtn.style.opacity = index === 0 ? "0.5" : "1"

    if (index === questions.length - 1) {
      nextBtn.style.display = "none"
      submitBtn.style.display = "flex"
    } else {
      nextBtn.style.display = "flex"
      submitBtn.style.display = "none"
    }

    updateProgress()
  }

  nextBtn.addEventListener("click", () => {
    const selectedOption = modal.querySelector(`input[name="question_${currentQuestion}"]:checked`)
    if (selectedOption) {
      answers[currentQuestion] = Number.parseInt(selectedOption.value)
    }

    if (currentQuestion < questions.length - 1) {
      currentQuestion++
      showQuestion(currentQuestion)
    }
  })

  prevBtn.addEventListener("click", () => {
    if (currentQuestion > 0) {
      currentQuestion--
      showQuestion(currentQuestion)
    }
  })

  submitBtn.addEventListener("click", () => {
    const selectedOption = modal.querySelector(`input[name="question_${currentQuestion}"]:checked`)
    if (selectedOption) {
      answers[currentQuestion] = Number.parseInt(selectedOption.value)
    }

    const results = calculateTestResults(questions, answers)
    showTestResults(modal, results)
  })

  showQuestion(0)
}

function calculateTestResults(questions, answers) {
  let correct = 0
  const total = questions.length

  questions.forEach((question, index) => {
    if (answers[index] === question.correct) {
      correct++
    }
  })

  const percentage = Math.round((correct / total) * 100)

  let grade, message, icon

  if (percentage >= 90) {
    grade = "Capitán Pirata"
    message = "¡Excelente! Dominas completamente este tema."
    icon = "fas fa-crown"
  } else if (percentage >= 70) {
    grade = "Pirata Experimentado"
    message = "¡Muy bien! Tienes un buen conocimiento del tema."
    icon = "fas fa-star"
  } else if (percentage >= 50) {
    grade = "Pirata Aprendiz"
    message = "Bien, pero necesitas repasar algunos conceptos."
    icon = "fas fa-anchor"
  } else {
    grade = "Grumete"
    message = "Necesitas estudiar más este tema antes de continuar."
    icon = "fas fa-ship"
  }

  return { correct, total, percentage, grade, message, icon }
}

function showTestResults(modal, results) {
  const modalBody = modal.querySelector(".modal-body")
  const modalFooter = modal.querySelector(".modal-footer")

  modalBody.innerHTML = `
    <div class="test-results">
      <div class="result-icon">
        <i class="${results.icon}"></i>
      </div>
      <h3 class="result-grade">${results.grade}</h3>
      <div class="result-score">
        <span class="score-number">${results.percentage}%</span>
        <span class="score-detail">${results.correct} de ${results.total} correctas</span>
      </div>
      <p class="result-message">${results.message}</p>
      <div class="result-progress">
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${results.percentage}%"></div>
        </div>
      </div>
    </div>
  `

  modalFooter.innerHTML = `
    <button class="modal-btn test-retry">Repetir Test</button>
    <button class="modal-btn test-continue">Continuar Aventura</button>
  `

  modal.querySelector(".test-retry").addEventListener("click", () => {
    document.body.removeChild(modal)
    showTestModal(currentTopicData)
  })

  modal.querySelector(".test-continue").addEventListener("click", () => {
    document.body.removeChild(modal)
    showNotification(`¡Test completado! Puntuación: ${results.percentage}%`, "success")

    // Pasar al siguiente tema del módulo
    const currentTopicIndex = currentModuleData.topics.findIndex((topic) => topic.id === currentTopicData.id)
    if (currentTopicIndex < currentModuleData.topics.length - 1) {
      const nextTopic = currentModuleData.topics[currentTopicIndex + 1]
      showTopicContent(nextTopic)
    } else {
      // Si es el último tema, volver a la vista de ruta del módulo
      document.getElementById("topicContent").classList.remove("active")
      showModuleRoute(currentModuleData)
      showNotification("¡Has completado todos los temas de este módulo!", "success")
    }
  })
}

function showHomeContent() {
  const homeContent = document.getElementById("homeContent")
  const menuContent = document.getElementById("menuContent")
  const moduleRouteContent = document.getElementById("moduleRouteContent")
  const topicContent = document.getElementById("topicContent")

  homeContent.classList.remove("hidden")
  menuContent.classList.remove("active")
  moduleRouteContent.classList.remove("active")
  topicContent.classList.remove("active")

  stopSpeech() // Detener la voz al cambiar de vista

  showSidebarInNormalView()
  currentView = "home"
  actualCurrentModule = "home" // Actualizar el estado actual

  // AGREGAR ESTAS LÍNEAS PARA SINCRONIZAR LA BARRA INFERIOR:
  const pageButtons = document.querySelectorAll(".page-btn")
  pageButtons.forEach((btn) => {
    btn.classList.remove("active")
    if (btn.getAttribute("data-module") === "home") {
      btn.classList.add("active")
    }
  })
}

function showMenuContent() {
  const homeContent = document.getElementById("homeContent")
  const menuContent = document.getElementById("menuContent")
  const moduleRouteContent = document.getElementById("moduleRouteContent")
  const topicContent = document.getElementById("topicContent")

  homeContent.classList.add("hidden")
  moduleRouteContent.classList.remove("active")
  topicContent.classList.remove("active")

  stopSpeech() // Detener la voz al cambiar de vista

  setTimeout(() => {
    menuContent.classList.add("active")
  }, 250)

  showSidebarInNormalView()
  currentView = "menu"
}

function setActiveNavItem(activeItem) {
  const navItems = document.querySelectorAll(".nav-item")
  navItems.forEach((item) => item.classList.remove("active"))
  activeItem.classList.add("active")
}

// Funciones para manejar el sidebar
function toggleSidebar() {
  const sidebar = document.querySelector(".sidebar")
  const mainContainer = document.querySelector(".main-container")
  const toggleBtn = document.getElementById("sidebarToggle")

  sidebarVisible = !sidebarVisible

  if (sidebarVisible) {
    sidebar.classList.remove("collapsed")
    mainContainer.classList.remove("sidebar-collapsed")
    toggleBtn.innerHTML = '<i class="fas fa-times"></i>'
  } else {
    sidebar.classList.add("collapsed")
    mainContainer.classList.add("sidebar-collapsed")
    toggleBtn.innerHTML = '<i class="fas fa-bars"></i>'
  }
}

function hideSidebarInTopicView() {
  const sidebar = document.querySelector(".sidebar")
  const mainContainer = document.querySelector(".main-container")
  const toggleBtn = document.getElementById("sidebarToggle")

  sidebar.classList.add("collapsed")
  mainContainer.classList.add("sidebar-collapsed")
  toggleBtn.innerHTML = '<i class="fas fa-bars"></i>'
  toggleBtn.style.display = "flex" // Mostrar el botón solo cuando estamos en vista de tema
  sidebarVisible = false
}

function showSidebarInNormalView() {
  const sidebar = document.querySelector(".sidebar")
  const mainContainer = document.querySelector(".main-container")
  const toggleBtn = document.getElementById("sidebarToggle")

  sidebar.classList.remove("collapsed")
  mainContainer.classList.remove("sidebar-collapsed")
  toggleBtn.innerHTML = '<i class="fas fa-times"></i>'
  toggleBtn.style.display = "none" // Ocultar el botón en vistas normales
  sidebarVisible = true
}

// nueva funcion con texto e imagen y video
function updateTopicMainContent(buttonId) {
  const topicMainContent = document.getElementById("topicContentText");
  topicMainContent.innerHTML = "";

  const content = getContentForButton(buttonId);

  // Obtener el ID del módulo y tema actual para el data-topic
  const moduleId = Object.keys(modulesData).find((key) =>
    modulesData[key].topics.some((topic) => topic.id === currentTopicData.id && topic.title === currentTopicData.title)
  );
  const topicKey = `${moduleId}-${currentTopicData.id}`;

  // Agregar data-topic al content-box
  const contentBox = document.querySelector(".content-box");
  if (contentBox) {
    contentBox.setAttribute("data-topic", topicKey);
  }

  // Título
  const titleElement = document.createElement("h3");
  titleElement.textContent = content.title;
  titleElement.className = "topic-content-title";
  topicMainContent.appendChild(titleElement);

  // Texto + Imagen en un contenedor
  const textImageContainer = document.createElement("div");
  textImageContainer.className = "topic-content-text-image";

  if (content.image) {
    const imgElement = document.createElement("img");
    imgElement.src = content.image;
    imgElement.alt = content.title || "Imagen del subtema";
    imgElement.className = "topic-side-image";
    textImageContainer.appendChild(imgElement);
  }

  const textElement = document.createElement("p");
  textElement.innerHTML = content.text;
  textElement.className = "topic-content-text";
  textImageContainer.appendChild(textElement);
  
  topicMainContent.appendChild(textImageContainer);

  // Lista de pasos
  const stepsList = document.createElement("ol");
  stepsList.className = "topic-content-steps";

  content.steps.forEach((step) => {
    const stepItem = document.createElement("li");
    stepItem.textContent = step;
    stepsList.appendChild(stepItem);
  });

  topicMainContent.appendChild(stepsList);

  // Video (debajo de todo)
  if (content.video) {
    const videoContainer = document.createElement("div");
    videoContainer.className = "topic-content-video";
    videoContainer.innerHTML = `
      <iframe width="100%" height="315"
        src="${content.video}"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen>
      </iframe>
    `;
    topicMainContent.appendChild(videoContainer);
  }
    //Esto fuerza que el scroll vaya al inicio del contenedor correcto
  document.querySelector(".topic-main-content")?.scrollTo({ top: 0, behavior: "smooth" });

  addTopicContentStyles();
  resetSpeechButton(); // Reiniciar el botón de voz al cambiar de subtema
}


// Función mejorada para contenido específico por tema y subtema
function getContentForButton(buttonId) {
  const defaultContent = {
    title: currentTopicData.content.title,
    text: currentTopicData.content.text,
    steps: currentTopicData.content.steps,
  }

  // Contenido específico por tema y subtema
  const moduleId = Object.keys(modulesData).find((key) =>
    modulesData[key].topics.some((topic) => topic.id === currentTopicData.id && topic.title === currentTopicData.title),
  )

  const topicKey = `${moduleId}-${currentTopicData.id}`
  const contentKey = `${topicKey}-${buttonId}`

  // Contenido específico para cada combinación de tema y subtema
  const specificContent = {
    // ========== MÓDULO 1 - TEMA 1 (GENERALIDADES) ==========
    "1-1-que-es": {
      title: "Leyenda del \"One Process\"",
      text: "En un vasto océano de conocimiento, existe una leyenda sobre un tesoro llamado \"One Process \", un poder que otorga a su poseedor el control absoluto sobre los procesos químicos e industriales. Se dice que aquel que logre dominar las variables de proceso podrá navegar por los mares de la ingeniería sin miedo a naufragar.\nTú, joven aprendiz, eres navegante en esta travesía. Para encontrar el One Process, deberás viajar a través de cinco islas legendarias, cada una custodiada por un guardián que pondrá a prueba tu ingenio y habilidades. ¿Serás capaz de superar los desafíos y convertirte en el Gran Monarca de los Procesos?",
      steps: [
      ],
      image: "images/40.jpeg"
    },
    "1-1-variablesP": {
      title: "Las variables de proceso",
      text: "Las variables de proceso son esenciales en la ingeniería, ya que permiten describir y controlar el comportamiento de las sustancias dentro de un sistema. Un proceso implica la transformación de materias primas a través de diversas unidades operativas. Las variables de proceso juegan un papel clave para garantizar la eficacia, seguridad y eficiencia del proceso, y la calidad de los productos y servicios ofrecidos. Su correcta medición y control son fundamentales para mantener la estabilidad y mejorar el desempeño de los procesos.",
      steps: [
      ],
      video: "https://www.youtube.com/embed/0JPaVp52rWk"
    },
    "1-1-Ipresion": {
      title: "El Reino de Baro'Que",
      text: "Aquí, el pirata Baro'Que, conocido como \"El Señor de la Presión\", controla los mares con su habilidad de manipular la presión del aire y el agua. Para pasar su prueba, debes comprender la diferencia entre presión absoluta y manométrica, así como dominar las herramientas de medición de presión.",
      steps: [
      ],
      image: "images/41.jpeg"
    },
    "1-1-Cpresion": {
      title: "¿Cómo se define la presión?",
      text: "La presión se define como la fuerza ejercida por unidad de área (F/A). En el contexto de los fluidos, se utiliza el término presión cuando esta fuerza es ejercida por un gas o un líquido sobre una superficie. Por lo tanto, se expresa en unidades de newtons por metro cuadrado (N/m²), la cual se llama pascal (Pa).",
      steps: [
      ],
      video: "https://www.youtube.com/embed/xc5dEGnVwUE"
    },
    "1-1-Tpresion": {
      title: "Tipos de presión",
      text: `<b>Presión absoluta:</b> es la presión medida en relación con el vacío absoluto, el cual representa la ausencia total de presión (cero presión).
      <br><b>Presión atmosférica:</b> es la presión que ejerce el aire de la atmósfera sobre la superficie terrestre y sobre todos los objetos situados en ella. Su valor varía con la altitud y las condiciones climáticas.
      <br><b>Presión manométrica:</b> es la diferencia entre la presión absoluta y la presión atmosférica. Corresponde a la presión que mide un manómetro, por lo general sin tener en cuenta la presión atmosférica. Se utiliza comúnmente en sistemas cerrados como tanques, tuberías o equipos presurizados, y no está limitada únicamente a sistemas de aire comprimido.
      <br><br><b>P absoluta = P manométrica + P atmosférica</b>`,
      steps: [
      ],
      image: "images/42.jpeg"
    },
    "1-1-medicion": {
      title: "Instrumentos de medición",
      text: `<b style="padding-left: 20px; display: inline-block;">Métodos de elemento elástico</b>
      <ul style="list-style: disc; padding-left: 20px;">
      <ul>
        <li>Tubo Bourdon: mide presión por la deformación de un tubo curvado.</li>
        <li>Fuelles y diafragmas: se deforman con la presión; usados en presiones bajas o con fluidos especiales.</li>
      </ul><br>

      <b>Métodos de columna de líquido</b>
      <ul>
        <li>Manómetros de líquido: miden presión mediante la altura de una columna de fluido (agua, mercurio, etc.).</li>
      </ul><br>

      <b>Métodos eléctricos y electrónicos</b>
      <ul>
        <li>Manómetros electrónicos: combinan elementos mecánicos con sensores.</li>
        <li>Transductores piezorresistivos y piezoeléctricos: convierten la presión en señales eléctricas; usados en sistemas automatizados.</li>
      </ul>`,
      steps: [
      ],
      image: "images/44.jpeg"
    },
    "1-1-desafio": {
      title: "El Reino de Baro'Que",
      text: `<b>Desafío:</b> Utilizando el <b>simulador PhET</b>, selecciona dos líquidos con diferentes densidades 
      (por ejemplo, agua y miel). Usa la regla (haciendo clic en su ítem) para medir la altura del líquido en el recipiente 
      y el manómetro para medir la presión. Puedes controlar el nivel del líquido en el recipiente arrastrando la perilla de 
      control de flujo superior hacia la derecha para agregar más contenido, o utilizando la perilla inferior para retirar la cantidad necesaria.
      <br><br>1 - Llena el recipiente con cada líquido hasta la altura máxima y mide la presión a 1 m de profundidad. 
      <br>2 - Compara los resultados obtenidos con ambos líquidos.      
      <br><br><b>¿Cuál de los líquidos ejerce mayor presión según la altura asignada? </b>      
      <br><br><b>Enlace al simulador: </b> <a href="https://phet.colorado.edu/sims/html/under-pressure/latest/under-pressure_all.html?locale=es" target="_blank" style="color: #1222b6ff;">¡¡ Haz clic aquí !!</a>`,

      steps: [
      ],
      image: "images/45.PNG"
    },

    // ========== MÓDULO 1 - TEMA 2 (CONCEPTOS BÁSICOS) ==========
    "1-2-que-es": {
      title: "El Desafío de Calor'Bel",
      text: "En esta isla volcánica, la pirata Calor'Bel puede cambiar la temperatura a su antojo. Solo aquellos que dominen las escalas de temperatura podrán cruzar sin ser consumidos por las llamas.",
      steps: [
      ],
      image: "images/46.jpeg"
    },
    "1-2-islaC": {
      title: "Isla del fuego eterno",
      text: `La temperatura es una variable que afecta las propiedades físicas y químicas de las sustancias. 
      Su control es esencial, ya que influye en las propiedades fisicoquímicas, en el estado de agregación 
      (sólido, líquido o gas) y en la velocidad de las reacciones químicas. Es importante comprender que existen 
      diferentes escalas de temperatura (Kelvin, Celsius, Fahrenheit), por lo que se requieren ecuaciones de conversión entre ellas. 
      La medición de la temperatura se realiza mediante instrumentos como termómetros, termopares u otros sensores térmicos.`,
      steps: [
      ],
      image: "images/47.jpeg"
    },
    "1-2-conversion": {
      title: "Tabla de conversión de temperaturas",
      text: `
      <table style="border-collapse: collapse; width: 100%; text-align: center; font-family: 'Comic Sans MS', cursive; border: 2px solid #a76de0;">
        <thead>
          <tr style="background-color: #ffc8c8;">
            <th style="border: 1px solid #a76de0; padding: 8px;">CONVERTIR</th>
            <th style="border: 1px solid #a76de0; padding: 8px;">ECUACIÓN</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="border: 1px solid #a76de0; padding: 8px;">°C → °F</td>
            <td style="border: 1px solid #a76de0; padding: 8px;">°F = (9/5 * °C) + 32</td>
          </tr>
          <tr>
            <td style="border: 1px solid #a76de0; padding: 8px;">°F → °C</td>
            <td style="border: 1px solid #a76de0; padding: 8px;">°C = 5/9 (°F - 32)</td>
          </tr>
          <tr>
            <td style="border: 1px solid #a76de0; padding: 8px;">°C → K</td>
            <td style="border: 1px solid #a76de0; padding: 8px;">K = °C + 273.15</td>
          </tr>
          <tr>
            <td style="border: 1px solid #a76de0; padding: 8px;">K → °C</td>
            <td style="border: 1px solid #a76de0; padding: 8px;">°C = K - 273.15</td>
          </tr>
          <tr>
            <td style="border: 1px solid #a76de0; padding: 8px;">°F → K</td>
            <td style="border: 1px solid #a76de0; padding: 8px;">K = 5/9 (°F - 32) + 273.15</td>
          </tr>
          <tr>
            <td style="border: 1px solid #a76de0; padding: 8px;">K → °F</td>
            <td style="border: 1px solid #a76de0; padding: 8px;">°F = 9/5 (K - 273.15) + 32</td>
          </tr>
        </tbody>
      </table>`,
      steps: [
      ],
    },
    "1-2-Vtemperatura": {
      title: "Video explicativo de la temperatura",
      text: "",
      steps: [
      ],
      video: "https://www.youtube.com/embed/WUVAUrvzsgo"
    },

    // ========== MÓDULO 1 - TEMA 3 (HERRAMIENTAS) ==========
    "1-3-que-es": {
      title: "La prueba del capitán Venturi",
      text: "El Capitán Venturi, un legendario navegante, controla los ríos subterráneos de esta isla con su dominio del flujo volumétrico, másico y molar. Para seguir adelante, debes demostrar tu capacidad para calcular, diferenciar y relacionar estos tipos de flujo en un sistema de tuberías.",
      steps: [
      ],
      image: "images/49.jpeg"
    },
    "1-3-Iflujo": {
      title: "Isla del gran flujo",
      text: "El flujo se refiere al movimiento de material (generalmente, un fluido) dentro de un proceso y puede ser másico, molar o volumétrico. Es esencial para calcular la cantidad de producción en un proceso. Las velocidades de flujo son variables críticas, e influyen en la caída de presión y determinan parámetros de diseño, en sistemas de transporte en tuberías y ductos.",
      steps: [
      ],
      image: "images/50.jpeg"
    },
    "1-3-Vflujo": {
      title: "Video explicativo del flujo",
      text: "",
      steps: [
      ],
      video: "https://www.youtube.com/embed/OicdnB4vSqI"
    },

    // ========== MÓDULO 1 - TEMA 4 (PREPARACIÓN) ==========
    "1-4-que-es": {
      title: "El Reto de Alquimix",
      text: `El alquimista Alquimix protege la receta del elixir más puro del mundo, 
      pero solo aquellos que dominen la concentración y la composición de las soluciones podrán obtenerla. 
      Aquí aprenderás sobre unidades como Normalidad (N), Molaridad (M), ppm, ppb, %p/p, %p/V, %mol/mol.`,
      steps: [
      ],
      image: "images/51.jpeg"
    },
    "1-4-concentracion": {
      title: "Isla de la concentración",
      text: `La concentración química se refiere a la medida de la cantidad de soluto presente en una solución, disolución o mezcla. La concentración cuantifica la proporción de soluto respecto a la solución total (soluto+disolvente). Algunas unidades específicas también expresan esta proporción en relación directa con la cantidad de disolvente. <br>
      <b>Soluto: </b> La sustancia que se disuelve en el disolvente.
      <br><b>Disolvente: </b> La sustancia que disuelve el soluto.
      <br><b>Solución: </b> La mezcla homogénea resultante de la combinación del soluto y el disolvente.`,
      steps: [
      ],
      image: "images/52.jpeg"
    },
    "1-4-expresar": {
      title: "¿Cómo se expresa la concentración?",
      text: `La concentración se expresa de diferentes maneras, siendo las más comunes:
      <br><b> Molaridad (M): </b> Moles de soluto por litro de solución. 
      <br><b> Fracción másica (p/p): </b> Masa de soluto por 100 gramos de solución. 
      <br><b> Fracción molar (mol/mol): </b> Moles de soluto por el total de moles en la solución. 
      <br><b> Normalidad (N): </b> Equivalentes-gramo de soluto por litro de solución.
      <br><b> Molaridad (M): </b> Moles de soluto por litro de solución.
      <br><b> Partes por millón (ppm): </b> Miligramos de soluto por litro de solución (mg/L) o por kilogramo, dependiendo del sistema.
      <br><b> Partes por billón (ppb): </b> Microgramos de soluto por litro (µg/L) o por kilogramo.
      <br><b> Porcentaje masa a masa (%p/p): </b> Gramos de soluto por 100 gramos de solución.
      <br><b> Porcentaje masa a volumen (%p/v): </b> Gramos de soluto por 100 mL de solución.
      <br><b> Porcentaje molar (%mol/mol): </b> Moles de soluto por 100 moles de solución
      <br><b> Fracción másica (w): </b> Relación entre la masa del soluto y la masa total de la solución (adimensional, puede expresarse en decimal o en porcentaje).`,
      steps: [
      ],
      image: "images/53.jpeg"
    },
    "1-4-VideoC": {
      title: "Video explicativo de la concentración",
      text: "",
      steps: [
      ],
      video: "https://www.youtube.com/embed/2A0CDxUAld4"
    },
    "1-4-desafioA": {
      title: "El Reto de Alquimix",
      text: `<b>Desafío:</b> En el <b>simulador PhET</b>, simula una solución con 1 L de agua, agrega 0,5 moles de soluto y calcula la molaridad (M). 
      <br><br>Luego, observa qué sucede con la molaridad si agregas más soluto sin cambiar el volumen.
      <br><br>Ahora analiza cuánto sería la molaridad si agregas 1 mol en solo 0,25 L.
      <br><br>Finalmente, compara dos soluciones utilizando como solutos nitrato de cobalto y sulfato de cobre, agregando la misma cantidad de moles y volumen en cada caso. 
      <br><br>Observa las diferencias en la concentración que se generan y reflexiona sobre cómo influye el tipo de soluto en la representación visual del simulador.
      <br><br><b>Enlace al simulador: </b> <a href="https://phet.colorado.edu/es/simulations/concentration" target="_blank" style="color: #1222b6ff;">¡¡ Haz clic aquí !!</a>`,
      steps: [
      ],
      image: "images/54.PNG"
    },

    // ========== MÓDULO 1 - TEMA 5 (IMPLEMENTACIÓN) ==========
    "1-5-que-es": {
      title: "El último desafío",
      text: `Después de superar todas las islas, llegas a la Isla del Gran Saber, donde una antigua y gran maestra del conocimiento te hará una última prueba: integrar todas las variables de proceso en un gran caso de estudio. Solo entonces, recibirás el título de Gran Monarca de los Procesos y descubrirás el secreto del One Process.
      <br><br><b>Desafío final:</b> Analiza un proceso real donde debas aplicar todos los conocimientos adquiridos.`,
      steps: [
      ],
      image: "images/55.jpeg"
    },
    "1-5-proceso": {
      title: "Aplicación en un caso real",
      text: `<p>Una planta química produce etanol (EtOH) a partir de una mezcla líquida de etanol y agua, proveniente de una unidad de fermentación. Esta mezcla alimenta una torre de destilación para purificar el etanol.</p>
      <ul>
        <li><strong>Temperatura de operación:</strong> 80 °C</li>
        <li><strong>Presión de operación:</strong> 1,5 atm</li>
        <li><strong>Flujo volumétrico de alimentación gaseosa (EtOH puro):</strong> 500 L/h</li>
      </ul>
      <p><br><strong>Datos físicos:</strong></p>
      <ul>
        <li><strong>Masa molar del etanol:</strong> 46,07 g/mol</li>
        <li><strong>Densidad líquida del etanol a 25 °C:</strong> 789 kg/m³</li>
        <li><strong>Constante de gas:</strong> R = 0,08205 L·atm/mol·K</li>
      </ul>`,
      steps: [
      ],
      image: "images/56.jpeg"
    },
    "1-5-desafioG": {
      title: "Realiza estos enunciados",
      text: `
      1-	Convertir el flujo volumétrico de etanol a flujo molar (mol/h) usando la ley de los gases ideales.<br><br>
      2-	Calcular el flujo másico de etanol (kg/h) a partir del flujo molar.<br><br>
      3-	¿Cuál sería el volumen que ocuparía ese mismo flujo molar a condiciones estándar (0 °C y 1 atm)?<br><br>
      4-	¿Cuánto cambia la densidad del etanol gaseoso al pasar de condiciones estándar a las condiciones de operación?<br><br>
      5-	Si se aumenta la presión a 2,0 atm manteniendo la misma temperatura, ¿qué ocurre con el volumen del gas?<br>
      -	Aumenta<br>
      -	Disminuye<br>
      -	Permanece constante<br><br>
        Justifica tu respuesta brevemente con una fórmula o concepto.`,
      steps: [
      ],
    },

    // ========== MÓDULO 2 - TEMA 1 (TORMENTAS) ==========
    "2-1-que-es": {
      title: "Navegando en Tormentas Marinas",
      text: "Las tormentas representan uno de los mayores desafíos para cualquier navegante. Requieren técnicas especiales, conocimiento meteorológico y preparación mental para enfrentarlas con éxito.",
      steps: [
        "a. Identificación temprana de señales de tormenta",
        "b. Técnicas de navegación en condiciones de baja visibilidad",
        "c. Protocolos de seguridad durante tormentas severas",
      ],
    },
    "2-1-tipos-tormentas": {
      title: "Tipos de Tormentas Marinas",
      text: "Existen diferentes tipos de tormentas marinas, cada una con características específicas que requieren estrategias de navegación particulares y preparación especializada.",
      steps: [
        "a. Tormentas tropicales y huracanes de gran intensidad",
        "b. Tormentas de viento del norte (Nortes) y frentes fríos",
        "c. Tormentas eléctricas localizadas y chubascos",
      ],
    },
    "2-1-preparacion": {
      title: "Preparación para Tormentas",
      text: "La preparación adecuada antes de enfrentar una tormenta puede ser la diferencia entre el éxito y el desastre en alta mar. Incluye aspectos técnicos y logísticos.",
      steps: [
        "a. Revisión completa del equipo de seguridad y navegación",
        "b. Planificación de rutas alternativas y refugios",
        "c. Comunicación con autoridades marítimas y servicios de rescate",
      ],
    },
    "2-1-supervivencia": {
      title: "Técnicas de Supervivencia",
      text: "Las técnicas de supervivencia durante tormentas incluyen maniobras específicas de navegación y uso adecuado del equipo de emergencia para preservar vidas.",
      steps: [
        "a. Técnicas de capeo y navegación defensiva",
        "b. Uso de anclas de capa y drogues para estabilización",
        "c. Procedimientos de abandono de embarcación y rescate",
      ],
    },

    // ========== MÓDULO 2 - TEMA 2 (BATALLAS NAVALES) ==========
    "2-2-que-es": {
      title: "Estrategias de Combate Marino",
      text: "Las batallas navales requieren estrategia, coordinación y conocimiento táctico. Los navegantes deben dominar el arte del combate en alta mar para proteger sus embarcaciones.",
      steps: [
        "a. Formaciones de combate y maniobras tácticas",
        "b. Uso efectivo de armamento naval",
        "c. Técnicas de abordaje y combate cuerpo a cuerpo",
      ],
    },
    "2-2-estrategias": {
      title: "Estrategias Tácticas Navales",
      text: "Las estrategias tácticas navales han evolucionado a lo largo de la historia, adaptándose a nuevas tecnologías y condiciones de combate marítimo.",
      steps: [
        "a. Maniobras de flanqueo y envolvimiento táctico",
        "b. Uso del viento y corrientes como ventaja estratégica",
        "c. Coordinación de ataques múltiples y formaciones",
      ],
    },
    "2-2-armamento": {
      title: "Armamento Naval Especializado",
      text: "El conocimiento del armamento naval es esencial para cualquier combate marítimo, desde cañones tradicionales hasta armas modernas de precisión.",
      steps: [
        "a. Cañones de diferentes calibres y alcances efectivos",
        "b. Armas de abordaje: sables, pistolas y mosquetes",
        "c. Armamento defensivo: escudos y armaduras protectoras",
      ],
    },
    "2-2-tacticas": {
      title: "Tácticas de Combate Naval",
      text: "Las tácticas de combate naval incluyen tanto maniobras ofensivas como defensivas, adaptadas a diferentes tipos de embarcaciones y condiciones.",
      steps: [
        "a. Tácticas de línea de batalla y formaciones cerradas",
        "b. Ataques sorpresa y emboscadas estratégicas",
        "c. Maniobras de retirada estratégica y reagrupamiento",
      ],
    },

    // ========== MÓDULO 2 - TEMA 3 (MONSTRUOS MARINOS) ==========
    "2-3-que-es": {
      title: "Enfrentando Criaturas del Abismo",
      text: "Los océanos albergan criaturas misteriosas y peligrosas. Los navegantes deben estar preparados para enfrentar desde krakens gigantes hasta sirenas encantadoras.",
      steps: [
        "a. Identificación de diferentes tipos de criaturas marinas",
        "b. Estrategias de evasión y confrontación",
        "c. Uso de amuletos y protecciones místicas",
      ],
    },
    "2-3-bestiario": {
      title: "Bestiario Marino Completo",
      text: "El bestiario marino incluye una amplia variedad de criaturas, desde las más comunes hasta las legendarias, cada una con características y peligros únicos.",
      steps: [
        "a. Kraken: pulpos gigantes con tentáculos destructivos",
        "b. Sirenas: criaturas encantadoras con cantos hipnóticos",
        "c. Leviatanes: serpientes marinas de proporciones colosales",
      ],
    },
    "2-3-defensas": {
      title: "Sistemas de Defensa Contra Criaturas",
      text: "Los sistemas de defensa incluyen tanto métodos físicos como místicos para protegerse de las criaturas marinas más peligrosas.",
      steps: [
        "a. Arpones especializados y redes de acero reforzado",
        "b. Amuletos protectores y talismanes ancestrales",
        "c. Técnicas de camuflaje y navegación sigilosa",
      ],
    },
    "2-3-leyendas": {
      title: "Leyendas y Mitos Marinos",
      text: "Las leyendas marinas contienen sabiduría ancestral sobre criaturas del mar, transmitida de generación en generación entre navegantes experimentados.",
      steps: [
        "a. Relatos históricos de encuentros documentados",
        "b. Rituales de protección y ceremonias marinas",
        "c. Mapas de zonas peligrosas y avistamientos",
      ],
    },

    // ========== MÓDULO 2 - TEMA 4 (NAVEGACIÓN NOCTURNA) ==========
    "2-4-que-es": {
      title: "Secretos de la Navegación Nocturna",
      text: "La navegación nocturna presenta desafíos únicos pero también oportunidades especiales. Los navegantes expertos pueden usar la oscuridad para movimientos sigilosos.",
      steps: [
        "a. Uso de constelaciones para navegación",
        "b. Técnicas de navegación silenciosa",
        "c. Aprovechamiento de corrientes nocturnas",
      ],
    },
    "2-4-constelaciones": {
      title: "Navegación por Constelaciones",
      text: "Las constelaciones han sido la guía principal de los navegantes durante milenios, proporcionando referencias precisas para la orientación nocturna.",
      steps: [
        "a. Identificación de constelaciones principales: Osa Mayor, Cruz del Sur",
        "b. Cálculo de posición usando la Estrella Polar",
        "c. Navegación estacional según movimiento de constelaciones",
      ],
    },
    "2-4-sigilo": {
      title: "Técnicas de Navegación Sigilosa",
      text: "La navegación sigilosa permite movimientos no detectados durante la noche, utilizando técnicas especiales para minimizar ruido y visibilidad.",
      steps: [
        "a. Reducción de ruido: velas silenciosas y remos amortiguados",
        "b. Camuflaje visual: pinturas oscuras y luces mínimas",
        "c. Aprovechamiento de sombras y condiciones meteorológicas",
      ],
    },
    "2-4-peligros": {
      title: "Peligros de la Navegación Nocturna",
      text: "La navegación nocturna presenta riesgos únicos que requieren preparación especial y técnicas de mitigación para garantizar la seguridad.",
      steps: [
        "a. Colisiones con obstáculos no visibles",
        "b. Desorientación y pérdida de rumbo",
        "c. Encuentros con criaturas nocturnas peligrosas",
      ],
    },

    // ========== MÓDULO 2 - TEMA 5 (SUPERVIVENCIA) ==========
    "2-5-que-es": {
      title: "Técnicas de Supervivencia Marina",
      text: "La supervivencia en el mar requiere conocimientos especializados sobre obtención de agua dulce, pesca y navegación de emergencia en condiciones extremas.",
      steps: [
        "a. Obtención y purificación de agua en el mar",
        "b. Técnicas de pesca y obtención de alimentos",
        "c. Construcción de refugios flotantes de emergencia",
      ],
    },
    "2-5-agua-alimento": {
      title: "Obtención de Agua y Alimento",
      text: "La obtención de recursos básicos en el mar es fundamental para la supervivencia, requiriendo técnicas especializadas y conocimiento del entorno marino.",
      steps: [
        "a. Destilación solar de agua de mar usando materiales básicos",
        "b. Pesca con anzuelos improvisados y técnicas primitivas",
        "c. Recolección de algas comestibles y plancton marino",
      ],
    },
    "2-5-refugio": {
      title: "Construcción de Refugios Marinos",
      text: "Los refugios flotantes proporcionan protección contra elementos y depredadores, utilizando materiales disponibles y técnicas de construcción naval básica.",
      steps: [
        "a. Balsas improvisadas con restos de naufragios",
        "b. Refugios flotantes usando barriles y maderas",
        "c. Sistemas de anclaje temporal y estabilización",
      ],
    },
    "2-5-rescate": {
      title: "Señales de Rescate y Comunicación",
      text: "Las señales de rescate son cruciales para ser localizado por equipos de búsqueda, utilizando métodos visuales, sonoros y de comunicación.",
      steps: [
        "a. Señales visuales: espejos, humo y banderas improvisadas",
        "b. Señales sonoras: silbatos, golpes rítmicos y gritos coordinados",
        "c. Comunicación por radio y dispositivos de emergencia",
      ],
    },
  }

  // Retornar contenido específico si existe, sino usar contenido por defecto del tema
  return specificContent[contentKey] || defaultContent
}

function updateInfoButtonsState(buttonId) {
  const infoButtons = document.querySelectorAll(".topic-info-sidebar .info-buttons .info-btn")
  infoButtons.forEach((btn) => {
    btn.classList.remove("active")
    if (btn.getAttribute("data-info") === buttonId) {
      btn.classList.add("active")
    }
  })
}

function addTopicContentStyles() {
  if (!document.getElementById("topic-content-styles")) {
    const topicStyles = `
      .topic-content-title {
        color: var(--ocean-blue);
        font-size: 1.5rem;
        margin-bottom: 1rem;
        font-weight: bold;
      }
      
      .topic-content-text {
        color: var(--driftwood);
        line-height: 1.6;
        margin-bottom: 1.5rem;
        text-align: justify;
      }
      
      .topic-content-steps {
        color: var(--driftwood);
        line-height: 1.5;
        padding-left: 1.5rem;
      }
      
      .topic-content-steps li {
        margin-bottom: 0.5rem;
      }
    `

    const styleSheet = document.createElement("style")
    styleSheet.id = "topic-content-styles"
    styleSheet.textContent = topicStyles
    document.head.appendChild(styleSheet)
  }
}

function showNotification(message, type = "success") {
  if (type === "info") return

  if (!notificationsContainer) {
    notificationsContainer = document.getElementById("notificationsContainer")
    if (!notificationsContainer) {
      notificationsContainer = document.createElement("div")
      notificationsContainer.id = "notificationsContainer"
      notificationsContainer.className = "notifications-container"
      document.body.appendChild(notificationsContainer)
    }
  }

  const notification = document.createElement("div")
  notification.className = `notification ${type}`
  notification.innerHTML = `
    <div class="notification-content">
      <i class="fas fa-check-circle"></i>
      <span>${message}</span>
    </div>
  `

  notificationsContainer.appendChild(notification)

  setTimeout(() => {
    notification.style.animation = "slideOutRight 0.3s ease"
    setTimeout(() => {
      if (notificationsContainer.contains(notification)) {
        notificationsContainer.removeChild(notification)
      }
    }, 300)
  }, 3000)
}

// Funciones de Speech-to-Text
function toggleSpeech() {
  if (isSpeaking) {
    pauseSpeech()
  } else {
    startSpeech()
  }
}

function startSpeech() {
  if (!window.speechSynthesis) {
    showNotification("Tu navegador no soporta la síntesis de voz.", "error")
    return
  }

  const topicContentTextElement = document.getElementById("topicContentText")
  if (!topicContentTextElement) return

  const textToSpeak = topicContentTextElement.innerText

  if (speechSynthesis.speaking && utterance) {
    speechSynthesis.resume()
    isSpeaking = true
    updateSpeechButton("Pausar Tema", "fas fa-pause")
  } else {
    utterance = new SpeechSynthesisUtterance(textToSpeak)
    utterance.lang = "es-ES" // Establecer el idioma a español
    utterance.rate = 1 // Velocidad de habla (1 es normal)
    utterance.pitch = 1 // Tono de voz (1 es normal)

    utterance.onend = () => {
      isSpeaking = false
      updateSpeechButton("Escuchar Tema", "fas fa-volume-up")
    }

    utterance.onerror = (event) => {
      console.error("SpeechSynthesisUtterance.onerror", event)
      isSpeaking = false
      // No mostrar "Error al Escuchar" permanentemente, solo resetear
      updateSpeechButton("Escuchar Tema", "fas fa-volume-up")
      showNotification("Error al reproducir el audio.", "error")
    }

    speechSynthesis.speak(utterance)
    isSpeaking = true
    updateSpeechButton("Pausar Tema", "fas fa-pause")
  }
}

function pauseSpeech() {
  if (speechSynthesis.speaking) {
    speechSynthesis.pause()
    isSpeaking = false
    updateSpeechButton("Reanudar Tema", "fas fa-play")
  }
}

function stopSpeech() {
  if (speechSynthesis.speaking || speechSynthesis.paused) {
    speechSynthesis.cancel()
  }
  isSpeaking = false
  updateSpeechButton("Escuchar Tema", "fas fa-volume-up")
}

function updateSpeechButton(text, iconClass) {
  if (listenBtn) {
    listenBtn.innerHTML = `<i class="${iconClass}"></i> ${text}`
  }
}

function resetSpeechButton() {
  stopSpeech() // Asegura que cualquier reproducción anterior se detenga
  updateSpeechButton("Escuchar Tema", "fas fa-volume-up")
}
