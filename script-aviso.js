document.addEventListener('DOMContentLoaded', function () {
  function esDesktop() {
    const ua = navigator.userAgent.toLowerCase();
    return !/android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(ua);
  }

  if (!esDesktop()) {
    // Crear contenedor del mensaje
    const aviso = document.createElement('div');
    aviso.className = 'aviso-dispositivo';
    aviso.innerHTML = '<h2>Esta aplicación solo está disponible en computadoras de escritorio.</h2>';

    // Agregar al body
    document.body.innerHTML = ''; // Limpia el contenido existente
    document.body.appendChild(aviso);
  }
});