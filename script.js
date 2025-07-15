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
      question: "¿Qué son los conceptos básicos de variables de proceso?",
      options: [
        "Ideas complejas y avanzadas",
        "Fundamentos esenciales para entender el control de procesos",
        "Teorías obsoletas",
        "Conceptos sin aplicación práctica",
      ],
      correct: 1,
    },
    {
      question: "¿Cuál es la diferencia entre variable controlada y no controlada?",
      options: [
        "No hay diferencia",
        "La controlada se puede manipular, la no controlada no",
        "Ambas son iguales",
        "Solo existe un tipo",
      ],
      correct: 1,
    },
    {
      question: "¿Qué es un setpoint?",
      options: [
        "Un error en el sistema",
        "El valor deseado de una variable",
        "Un tipo de sensor",
        "Una falla del proceso",
      ],
      correct: 1,
    },
    {
      question: "¿Cómo se clasifican las variables según su naturaleza?",
      options: ["Continuas y discretas", "Solo continuas", "Solo discretas", "No se clasifican"],
      correct: 0,
    },
    {
      question: "¿Qué es la retroalimentación en un sistema de control?",
      options: [
        "Un error del sistema",
        "La información que regresa del proceso para ajustar el control",
        "Una falla técnica",
        "Un tipo de variable",
      ],
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
        title: "Contextualización",
        icon: "fas fa-anchor",
        image: "images/30.jpg", // Imagen para el punto del mapa
        content: {
          title: "Laa leyenda del \"One Process\"",
          text: "En un vasto océano de conocimiento, existe una leyenda sobre un tesoro llamado \"One Process \", un poder que otorga a su poseedor el control absoluto sobre los procesos químicos e industriales. Se dice que aquel que logre dominar las variables de proceso podrá navegar por los mares de la ingeniería sin miedo a naufragar.\nTú, joven aprendiz, eres navegante en esta travesía. Para encontrar el One Process, deberás viajar a través de cinco islas legendarias, cada una custodiada por un guardián que pondrá a prueba tu ingenio y habilidades. ¿Serás capaz de superar los desafíos y convertirte en el Gran Monarca de los Procesos?",
          steps: [
            
          ],
        },
        sidebarButtons: [
          { id: "que-es", label: "La leyenda del \"One Process\"", icon: "fas fa-question-circle", type: "content" },
          { id: "objetivos", label: "Objetivos", icon: "fas fa-bullseye", type: "content" },
          { id: "importancia", label: "Importancia", icon: "fas fa-star", type: "content" },
          { id: "ejemplos", label: "Ejemplos", icon: "fas fa-lightbulb", type: "content" },
          { id: "test", label: "Realizar Test", icon: "fas fa-clipboard-check", type: "test" },
        ],
      },
      {
        id: 2,
        title: "Introducción",
        icon: "fas fa-book-open",
        image: "images/2.jpg",
        content: {
          title: "Introduccion",
          text: "Los conceptos básicos incluyen la comprensión de variables controladas, manipuladas y de perturbación, así como los principios de retroalimentación y control automático.",
          steps: [
            "a. Definición de variables controladas y manipuladas.",
            "b. Comprensión de perturbaciones y su impacto.",
            "c. Principios de retroalimentación y control.",
          ],
        },
        sidebarButtons: [
          { id: "que-es", label: "¿Qué es?", icon: "fas fa-question-circle", type: "content" },
          { id: "fundamentos", label: "Fundamentos", icon: "fas fa-foundation", type: "content" },
          { id: "aplicaciones", label: "Aplicaciones", icon: "fas fa-cogs", type: "content" },
          { id: "recursos", label: "Recursos", icon: "fas fa-tools", type: "content" },
          { id: "test", label: "Realizar Test", icon: "fas fa-clipboard-check", type: "test" },
        ],
      },
      {
        id: 3,
        title: "HERRAMIENTAS",
        icon: "fas fa-tools",
        image: "images/3.jpg",
        content: {
          title: "Instrumentos de Medición y Control",
          text: "Las herramientas incluyen sensores, transmisores, controladores y actuadores que permiten medir, procesar y controlar las variables del proceso.",
          steps: [
            "a. Selección de sensores apropiados para cada variable.",
            "b. Configuración de sistemas de transmisión de datos.",
            "c. Implementación de estrategias de control.",
          ],
        },
        sidebarButtons: [
          { id: "que-es", label: "¿Qué es?", icon: "fas fa-question-circle", type: "content" },
          { id: "tipos", label: "Tipos de Herramientas", icon: "fas fa-list", type: "content" },
          { id: "mantenimiento", label: "Mantenimiento", icon: "fas fa-wrench", type: "content" },
          { id: "uso-practico", label: "Uso Práctico", icon: "fas fa-hand-paper", type: "content" },
          { id: "test", label: "Realizar Test", icon: "fas fa-clipboard-check", type: "test" },
        ],
      },
      {
        id: 4,
        title: "PREPARACIÓN",
        icon: "fas fa-ship",
        image: "images/5.jpg",
        content: {
          title: "Preparación del Sistema de Control",
          text: "La preparación incluye el diseño del sistema, calibración de instrumentos y establecimiento de procedimientos operativos.",
          steps: [
            "a. Diseño del esquema de control del proceso.",
            "b. Calibración y verificación de instrumentos.",
            "c. Desarrollo de procedimientos operativos estándar.",
          ],
        },
        sidebarButtons: [
          { id: "que-es", label: "¿Qué es?", icon: "fas fa-question-circle", type: "content" },
          { id: "planificacion", label: "Planificación", icon: "fas fa-map-marked-alt", type: "content" },
          { id: "suministros", label: "Suministros", icon: "fas fa-boxes", type: "content" },
          { id: "seguridad", label: "Seguridad", icon: "fas fa-shield-alt", type: "content" },
          { id: "test", label: "Realizar Test", icon: "fas fa-clipboard-check", type: "test" },
        ],
      },
      {
        id: 5,
        title: "IMPLEMENTACIÓN",
        icon: "fas fa-compass",
        image: "images/8.jpg",
        content: {
          title: "Implementación del Sistema de Control",
          text: "La implementación involucra la puesta en marcha del sistema, ajuste de parámetros y optimización del rendimiento.",
          steps: [
            "a. Puesta en marcha del sistema de control.",
            "b. Ajuste fino de parámetros de control.",
            "c. Optimización continua del rendimiento.",
          ],
        },
        sidebarButtons: [
          { id: "que-es", label: "¿Qué es?", icon: "fas fa-question-circle", type: "content" },
          { id: "tecnicas", label: "Técnicas", icon: "fas fa-compass", type: "content" },
          { id: "monitoreo", label: "Monitoreo", icon: "fas fa-chart-line", type: "content" },
          { id: "optimizacion", label: "Optimización", icon: "fas fa-cog", type: "content" },
          { id: "test", label: "Realizar Test", icon: "fas fa-clipboard-check", type: "test" },
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
        <i class="${topic.icon}"></i>
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

function updateTopicMainContent(buttonId) {
  const topicMainContent = document.getElementById("topicContentText")
  topicMainContent.innerHTML = ""

  const content = getContentForButton(buttonId)

  // Obtener el ID del módulo y tema actual para el data-topic
  const moduleId = Object.keys(modulesData).find((key) =>
    modulesData[key].topics.some((topic) => topic.id === currentTopicData.id && topic.title === currentTopicData.title),
  )
  const topicKey = `${moduleId}-${currentTopicData.id}`

  // Agregar data-topic al content-box
  const contentBox = document.querySelector(".content-box")
  if (contentBox) {
    contentBox.setAttribute("data-topic", topicKey)
  }

  const titleElement = document.createElement("h3")
  titleElement.textContent = content.title
  titleElement.className = "topic-content-title"

  const textElement = document.createElement("p")
  textElement.textContent = content.text
  textElement.className = "topic-content-text"

  const stepsList = document.createElement("ol")
  stepsList.className = "topic-content-steps"

  content.steps.forEach((step) => {
    const stepItem = document.createElement("li")
    stepItem.textContent = step
    stepsList.appendChild(stepItem)
  })

  topicMainContent.appendChild(titleElement)
  topicMainContent.appendChild(textElement)
  topicMainContent.appendChild(stepsList)

  addTopicContentStyles()
  resetSpeechButton() // Reiniciar el botón de voz al cambiar de subtema
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
      title: "Leyenda del One \"Process\"",
      text: "En un vasto océano de conocimiento, existe una leyenda sobre un tesoro llamado \"One Process \", un poder que otorga a su poseedor el control absoluto sobre los procesos químicos e industriales. Se dice que aquel que logre dominar las variables de proceso podrá navegar por los mares de la ingeniería sin miedo a naufragar.\nTú, joven aprendiz, eres navegante en esta travesía. Para encontrar el One Process, deberás viajar a través de cinco islas legendarias, cada una custodiada por un guardián que pondrá a prueba tu ingenio y habilidades. ¿Serás capaz de superar los desafíos y convertirte en el Gran Monarca de los Procesos?",
      steps: [
      ],
    },
    "1-1-objetivos": {
      title: "Objetivos del Control",
      text: "Los objetivos principales del control de variables de proceso incluyen mantener la calidad del producto, optimizar la eficiencia operativa y garantizar la seguridad del proceso.",
      steps: [
        "a. Mantener la calidad constante del producto final",
        "b. Optimizar el uso de recursos y energía",
        "c. Garantizar la seguridad operacional del proceso",
      ],
    },
    "1-1-importancia": {
      title: "Importancia del Control de Variables",
      text: "El control adecuado de variables es fundamental para el éxito de cualquier proceso industrial, ya que permite predecir y controlar el comportamiento del sistema.",
      steps: [
        "a. Prevención de desviaciones que afecten la calidad",
        "b. Reducción de costos operativos y desperdicios",
        "c. Cumplimiento de especificaciones y normativas",
      ],
    },
    "1-1-ejemplos": {
      title: "Ejemplos de Variables de Proceso",
      text: "En la industria encontramos múltiples ejemplos de variables que deben ser controladas para asegurar el funcionamiento óptimo de los procesos.",
      steps: [
        "a. Temperatura en reactores químicos",
        "b. Presión en sistemas de destilación",
        "c. Caudal en procesos de transferencia de fluidos",
      ],
    },

    // ========== MÓDULO 1 - TEMA 2 (CONCEPTOS BÁSICOS) ==========
    "1-2-que-es": {
      title: "Conceptos Básicos del Control de Procesos",
      text: "Los conceptos básicos incluyen la comprensión de variables controladas, manipuladas y de perturbación, así como los principios fundamentales de retroalimentación y control automático.",
      steps: [
        "a. Definición de variables controladas y manipuladas",
        "b. Comprensión de perturbaciones y su impacto",
        "c. Principios de retroalimentación y control",
      ],
    },
    "1-2-fundamentos": {
      title: "Fundamentos Teóricos",
      text: "Los fundamentos teóricos del control de procesos se basan en principios matemáticos y físicos que permiten modelar y predecir el comportamiento de los sistemas.",
      steps: [
        "a. Modelos matemáticos de procesos dinámicos",
        "b. Teoría de control clásico y moderno",
        "c. Análisis de estabilidad y respuesta temporal",
      ],
    },
    "1-2-aplicaciones": {
      title: "Aplicaciones Industriales",
      text: "Las aplicaciones del control de procesos se extienden a múltiples industrias, desde la petroquímica hasta la alimentaria, cada una con sus particularidades específicas.",
      steps: [
        "a. Control de temperatura en hornos industriales",
        "b. Regulación de pH en procesos químicos",
        "c. Control de nivel en tanques de almacenamiento",
      ],
    },
    "1-2-recursos": {
      title: "Recursos y Herramientas",
      text: "Los recursos necesarios para implementar control de procesos incluyen hardware especializado, software de control y personal capacitado.",
      steps: [
        "a. Sensores y transmisores de campo",
        "b. Sistemas de control distribuido (DCS)",
        "c. Software de simulación y modelado",
      ],
    },

    // ========== MÓDULO 1 - TEMA 3 (HERRAMIENTAS) ==========
    "1-3-que-es": {
      title: "Instrumentos de Medición y Control",
      text: "Las herramientas incluyen sensores, transmisores, controladores y actuadores que permiten medir, procesar y controlar las variables del proceso de manera precisa y confiable.",
      steps: [
        "a. Selección de sensores apropiados para cada variable",
        "b. Configuración de sistemas de transmisión de datos",
        "c. Implementación de estrategias de control",
      ],
    },
    "1-3-tipos": {
      title: "Tipos de Herramientas de Control",
      text: "Existen diversos tipos de herramientas especializadas para diferentes variables y aplicaciones industriales, cada una con características técnicas específicas.",
      steps: [
        "a. Sensores de temperatura: termopares, RTD, termistores",
        "b. Medidores de presión: manómetros, transmisores electrónicos",
        "c. Medidores de flujo: turbinas, electromagnéticos, ultrasónicos",
      ],
    },
    "1-3-mantenimiento": {
      title: "Mantenimiento de Instrumentos",
      text: "El mantenimiento preventivo y correctivo de los instrumentos es crucial para garantizar mediciones precisas y operación confiable del sistema de control.",
      steps: [
        "a. Calibración periódica de instrumentos de medición",
        "b. Inspección visual y limpieza de sensores",
        "c. Verificación de conexiones eléctricas y neumáticas",
      ],
    },
    "1-3-uso-practico": {
      title: "Uso Práctico de Instrumentos",
      text: "La aplicación práctica de los instrumentos requiere conocimiento técnico sobre instalación, configuración y operación en condiciones industriales reales.",
      steps: [
        "a. Instalación correcta según especificaciones técnicas",
        "b. Configuración de parámetros operativos",
        "c. Interpretación de señales y diagnóstico de fallas",
      ],
    },

    // ========== MÓDULO 1 - TEMA 4 (PREPARACIÓN) ==========
    "1-4-que-es": {
      title: "Preparación del Sistema de Control",
      text: "La preparación incluye el diseño del sistema, calibración de instrumentos y establecimiento de procedimientos operativos para garantizar un funcionamiento óptimo.",
      steps: [
        "a. Diseño del esquema de control del proceso",
        "b. Calibración y verificación de instrumentos",
        "c. Desarrollo de procedimientos operativos estándar",
      ],
    },
    "1-4-planificacion": {
      title: "Planificación del Sistema",
      text: "La planificación efectiva del sistema de control requiere análisis detallado de requisitos, selección de tecnologías apropiadas y diseño de arquitecturas robustas.",
      steps: [
        "a. Análisis de requisitos funcionales y de rendimiento",
        "b. Selección de hardware y software de control",
        "c. Diseño de arquitectura de red y comunicaciones",
      ],
    },
    "1-4-suministros": {
      title: "Suministros y Materiales",
      text: "Los suministros necesarios incluyen instrumentos, cables, gabinetes, software y herramientas especializadas para la implementación del sistema.",
      steps: [
        "a. Instrumentos de campo: sensores, transmisores, válvulas",
        "b. Equipos de control: PLC, DCS, sistemas SCADA",
        "c. Materiales auxiliares: cables, gabinetes, fuentes de poder",
      ],
    },
    "1-4-seguridad": {
      title: "Aspectos de Seguridad",
      text: "La seguridad en sistemas de control incluye protección de personal, equipos y medio ambiente, así como ciberseguridad industrial.",
      steps: [
        "a. Sistemas de seguridad instrumentados (SIS)",
        "b. Protocolos de seguridad cibernética",
        "c. Procedimientos de emergencia y parada segura",
      ],
    },

    // ========== MÓDULO 1 - TEMA 5 (IMPLEMENTACIÓN) ==========
    "1-5-que-es": {
      title: "Implementación del Sistema de Control",
      text: "La implementación involucra la puesta en marcha del sistema, ajuste de parámetros y optimización del rendimiento para lograr los objetivos operacionales.",
      steps: [
        "a. Puesta en marcha del sistema de control",
        "b. Ajuste fino de parámetros de control",
        "c. Optimización continua del rendimiento",
      ],
    },
    "1-5-tecnicas": {
      title: "Técnicas de Implementación",
      text: "Las técnicas de implementación incluyen metodologías probadas para la puesta en marcha, comisionado y optimización de sistemas de control industrial.",
      steps: [
        "a. Comisionado por etapas y pruebas funcionales",
        "b. Sintonización de controladores PID",
        "c. Validación de lazos de control y alarmas",
      ],
    },
    "1-5-monitoreo": {
      title: "Monitoreo y Supervisión",
      text: "El monitoreo continuo permite detectar desviaciones, diagnosticar problemas y mantener el rendimiento óptimo del sistema de control.",
      steps: [
        "a. Sistemas de monitoreo en tiempo real",
        "b. Análisis de tendencias y KPIs operacionales",
        "c. Diagnóstico predictivo y mantenimiento basado en condición",
      ],
    },
    "1-5-optimizacion": {
      title: "Optimización Continua",
      text: "La optimización continua busca mejorar el rendimiento del sistema mediante análisis de datos, ajustes de parámetros y mejoras tecnológicas.",
      steps: [
        "a. Análisis de datos históricos y patrones operacionales",
        "b. Implementación de mejoras y actualizaciones",
        "c. Evaluación de ROI y beneficios operacionales",
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
