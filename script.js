// ABRIR/CERRAR INFO
document.getElementById('btn-mas-info').addEventListener('click', function() {
    document.getElementById('modal-info').classList.remove('oculto');
});
document.getElementById('btn-cerrar-info').addEventListener('click', function() {
    document.getElementById('modal-info').classList.add('oculto');
});

// REPRODUCIR (Abre la trivia inicial)
document.getElementById('btn-reproducir').addEventListener('click', function() {
    abrirJuego(1); 
});

// CONTROL PRINCIPAL DE JUEGOS
function abrirJuego(numero) {
    document.getElementById('modal-juegos').classList.remove('oculto');
    document.querySelectorAll('.juego-pantalla').forEach(p => p.classList.add('oculto'));
    document.getElementById('pantalla-exito-juego').classList.add('oculto');

    if(numero === 1) iniciarJuego1();
    else if(numero === 2) iniciarJuego2();
    else if(numero === 3) iniciarJuego3();
    else if(numero === 4) iniciarJuego4();
    else if(numero === 5) iniciarJuego5();
    else if(numero === 6) iniciarJuego6();
    else if(numero === 7) iniciarJuego7();
    else if(numero === 8) iniciarJuego8();
    else alert("Próximamente más temporadas...");
}

function cerrarJuego() {
    document.getElementById('modal-juegos').classList.add('oculto');
}

function mostrarExito(mensaje) {
    document.querySelectorAll('.juego-pantalla').forEach(p => p.classList.add('oculto'));
    document.getElementById('texto-recompensa').innerText = mensaje;
    document.getElementById('pantalla-exito-juego').classList.remove('oculto');
    confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
}

// ==========================================
// JUEGO 1: TRIVIA
// ==========================================
const datosJ1 = [
    { p: "¿Dónde fue nuestra primera cita?", o: ["Xmakuil", "Fiesta Urziaz", "Cumpleaños tuyo"], r: 1 },
    { p: "¿Qué juego fue el primero que jugamos?", o: ["Brawl Stars", "Free Fire", "Juego de 1vs1"], r: 0 },
    { p: "¿Dia y fecha de nuestra primera videollamada?", o: ["23 de Marzo 2024", "23 de Enero 2024", "23 de Febrero 2024"], r: 1 },
    { p: "¿Quién dijo te amo primero?", o: ["Tú", "Yo", "Fue al mismo tiempo"], r: 1 },
    { p: "¿Cuál fue el primer regalo que te di?", o: ["Collar", "Aretes", "Ambos"], r: 2 }
];
let actualJ1 = 0;
function iniciarJuego1() { actualJ1 = 0; document.getElementById('juego1').classList.remove('oculto'); cargarPreguntaJ1(); }
function cargarPreguntaJ1() {
    const data = datosJ1[actualJ1]; document.getElementById('j1-pregunta').innerText = data.p;
    document.getElementById('j1-progreso').innerText = `Pregunta ${actualJ1 + 1} de 5`;
    const divOpciones = document.getElementById('j1-opciones'); divOpciones.innerHTML = '';
    data.o.forEach((opcion, i) => {
        const btn = document.createElement('button'); btn.className = 'boton-opcion'; btn.innerText = opcion;
        btn.onclick = () => verificarJ1(i, btn, data.r); divOpciones.appendChild(btn);
    });
}
function verificarJ1(indice, boton, correcto) {
    const divOpciones = document.getElementById('j1-opciones'); Array.from(divOpciones.children).forEach(b => b.disabled = true);
    if(indice === correcto) {
        boton.classList.add('correcta'); setTimeout(() => { actualJ1++; if(actualJ1 < 5) cargarPreguntaJ1(); else mostrarExito("¡Conoces nuestra historia a la perfección! Te amo."); }, 1500);
    } else {
        boton.classList.add('incorrecta'); setTimeout(() => { Array.from(divOpciones.children).forEach(b => b.disabled = false); boton.classList.remove('incorrecta'); }, 1000);
    }
}

// ==========================================
// JUEGO 2: ADIVINA EL PERSONAJE
// ==========================================
const datosJ2 = [
    { img: "ariel.webp", nombre: "Ariel", opciones: ["Bella", "Ariel", "Cenicienta"] },
    { img: "moana.png", nombre: "Moana", opciones: ["Pocahontas", "Mulan", "Moana"] },
    { img: "merida.webp", nombre: "Mérida", opciones: ["Mérida", "Anna", "Rapunzel"] },
    { img: "elsa.webp", nombre: "Elsa", opciones: ["Elsa", "Aurora", "Blancanieves"] }
];
let actualJ2 = 0;
function iniciarJuego2() { actualJ2 = 0; document.getElementById('juego2').classList.remove('oculto'); cargarSombraJ2(); }
function cargarSombraJ2() {
    const data = datosJ2[actualJ2]; const imgSombra = document.getElementById('j2-imagen'); imgSombra.src = data.img;
    imgSombra.classList.remove('revelado', 'salto-imagen'); document.getElementById('j2-progreso').innerText = `Personaje ${actualJ2 + 1} de 4`;
    const divOpciones = document.getElementById('j2-opciones'); divOpciones.innerHTML = '';
    data.opciones.forEach(opcion => {
        const btn = document.createElement('button'); btn.className = 'boton-opcion'; btn.innerText = opcion;
        btn.onclick = () => verificarJ2(opcion, btn, data.nombre); divOpciones.appendChild(btn);
    });
}
function verificarJ2(seleccion, boton, correcto) {
    const divOpciones = document.getElementById('j2-opciones'); Array.from(divOpciones.children).forEach(b => b.disabled = true);
    if(seleccion === correcto) {
        boton.classList.add('correcta'); document.getElementById('j2-imagen').classList.add('revelado', 'salto-imagen');
        setTimeout(() => { actualJ2++; if(actualJ2 < 4) cargarSombraJ2(); else mostrarExito("¡Eres una experta en princesas! (Aunque tú eres mi favorita)."); }, 2000);
    } else {
        boton.classList.add('incorrecta'); setTimeout(() => { Array.from(divOpciones.children).forEach(b => b.disabled = false); boton.classList.remove('incorrecta'); }, 1000);
    }
}

// ==========================================
// JUEGO 3: ORDENA LA FRASE
// ==========================================
const frasesJ3 = ["eres el amor de mi vida", "gracias por estos tres años", "me haces muy feliz siempre", "eres mi princesa y consentida", "quiero un futuro a tu lado"];
let actualJ3 = 0; let palabrasCorrectas = []; let palabrasSeleccionadas = [];
function iniciarJuego3() { actualJ3 = 0; document.getElementById('juego3').classList.remove('oculto'); cargarFraseJ3(); }
function cargarFraseJ3() {
    palabrasSeleccionadas = []; document.getElementById('j3-btn-revisar').classList.add('oculto'); document.getElementById('j3-btn-revisar').disabled = false;
    document.getElementById('j3-progreso').innerText = `Frase ${actualJ3 + 1} de 5`;
    palabrasCorrectas = frasesJ3[actualJ3].split(' '); let palabrasRevueltas = [...palabrasCorrectas].sort(() => Math.random() - 0.5);
    actualizarInterfazJ3(palabrasRevueltas);
}
function actualizarInterfazJ3(banco) {
    const linea = document.getElementById('j3-linea-respuesta'); const contenedorBanco = document.getElementById('j3-banco-palabras');
    linea.innerHTML = ''; contenedorBanco.innerHTML = ''; linea.classList.remove('error-shake');
    palabrasSeleccionadas.forEach((palabra, i) => {
        const btn = document.createElement('button'); btn.className = 'palabra-btn'; btn.innerText = palabra;
        btn.onclick = () => { palabrasSeleccionadas.splice(i, 1); banco.push(palabra); actualizarInterfazJ3(banco); }; linea.appendChild(btn);
    });
    banco.forEach((palabra, i) => {
        const btn = document.createElement('button'); btn.className = 'palabra-btn'; btn.innerText = palabra;
        btn.onclick = () => { banco.splice(i, 1); palabrasSeleccionadas.push(palabra); actualizarInterfazJ3(banco); }; contenedorBanco.appendChild(btn);
    });
    if(banco.length === 0) document.getElementById('j3-btn-revisar').classList.remove('oculto'); else document.getElementById('j3-btn-revisar').classList.add('oculto');
}
function revisarFrase() {
    let todoCorrecto = true; const linea = document.getElementById('j3-linea-respuesta'); const botonesLinea = Array.from(linea.children);
    if (palabrasSeleccionadas.length !== palabrasCorrectas.length) { linea.classList.add('error-shake'); setTimeout(() => linea.classList.remove('error-shake'), 500); return; }
    botonesLinea.forEach((btn, i) => { btn.classList.remove('palabra-error'); if (palabrasSeleccionadas[i] !== palabrasCorrectas[i]) { btn.classList.add('palabra-error'); todoCorrecto = false; } });
    if(todoCorrecto) {
        botonesLinea.forEach(btn => btn.classList.add('correcta')); confetti({ particleCount: 50, spread: 40 }); document.getElementById('j3-btn-revisar').disabled = true;
        setTimeout(() => { actualJ3++; if(actualJ3 < frasesJ3.length) { cargarFraseJ3(); } else { mostrarExito("¡Mensajes descifrados! Te amo con todo mi corazón."); } }, 1500);
    }
}

// ==========================================
// JUEGO 4: COMPLETAR LA FRASE
// ==========================================
const datosJ4 = [
    { inicio: "Nos conocimos en la ", fin: " a finales de 2do año.", opciones: ["Urzaiz", "CTM", "Preparatoria"], correcta: 0 },
    { inicio: "Nuestra primera película juntos fue ", fin: ".", opciones: ["EL libro de la vida", "Barbie", "Ariel"], correcta: 0 },
    { inicio: "Siempre me pides que te compre ", fin: " cuando salimos.", opciones: ["Esquites", "Papas fritas", "Granizado"], correcta: 1 },
    { inicio: "El color que siempre usas en tus uñas es ", fin: ".", opciones: ["Rojo", "Rosa", "Blanco"], correcta: 0 },
    { inicio: "Nuestro mes de aniversario de amigos es ", fin: ".", opciones: ["Septiembre", "Octubre", "Agosto"], correcta: 2 }
];
let actualJ4 = 0;
function iniciarJuego4() { actualJ4 = 0; document.getElementById('juego4').classList.remove('oculto'); cargarFraseJ4(); }
function cargarFraseJ4() {
    const data = datosJ4[actualJ4]; document.getElementById('j4-inicio').innerText = data.inicio; document.getElementById('j4-fin').innerText = data.fin;
    document.getElementById('j4-progreso').innerText = `Frase ${actualJ4 + 1} de 5`;
    const divOpciones = document.getElementById('j4-opciones'); divOpciones.innerHTML = '';
    data.opciones.forEach((opcion, i) => {
        const btn = document.createElement('button'); btn.className = 'boton-opcion'; btn.innerText = opcion;
        btn.onclick = () => verificarJuegoStandard(i, btn, data.correcta, divOpciones, () => { actualJ4++; if(actualJ4 < 5) cargarFraseJ4(); else mostrarExito("¡Tenemos la mejor historia del mundo!"); });
        divOpciones.appendChild(btn);
    });
}

// ==========================================
// JUEGO 5: ADIVINA LA IMAGEN
// ==========================================
const datosJ5 = [
    { img: "quince.jpg", opciones: ["Fiesta de Graduación", "Año Nuevo", "Unos XV Años"], correcta: 2 },
    { img: "cumple.png", opciones: ["Cumpleaños Guille", "Cumpleaños tuyo", "Cumpleaños de mi Suegro"], correcta: 0 }
];
let actualJ5 = 0;
function iniciarJuego5() { actualJ5 = 0; document.getElementById('juego5').classList.remove('oculto'); cargarImagenJ5(); }
function cargarImagenJ5() {
    if(actualJ5 >= datosJ5.length) { mostrarExito("¡Recordamos los mismos momentos hermosos!"); return; }
    const data = datosJ5[actualJ5]; document.getElementById('j5-imagen').src = data.img; document.getElementById('j5-progreso').innerText = `Foto ${actualJ5 + 1} de ${datosJ5.length}`;
    const divOpciones = document.getElementById('j5-opciones'); divOpciones.innerHTML = '';
    data.opciones.forEach((opcion, i) => {
        const btn = document.createElement('button'); btn.className = 'boton-opcion'; btn.innerText = opcion;
        btn.onclick = () => verificarJuegoStandard(i, btn, data.correcta, divOpciones, () => { actualJ5++; cargarImagenJ5(); });
        divOpciones.appendChild(btn);
    });
}

// ==========================================
// JUEGO 6: ¿QUIÉN ES MÁS PROBABLE?
// ==========================================
const datosJ6 = [
    { p: "¿Quién es más probable que se quede dormido viendo Netflix?", opciones: ["Yo", "Tú"], correcta: 1 },
    { p: "¿Quién es más probable que coma a escondidas?", opciones: ["Yo", "Tú"], correcta: 1 },
    { p: "¿Quién es más probable que se caiga en el baño?", opciones: ["Yo", "Tú"], correcta: 0 },
    { p: "¿Quién es más probable que se deje las llaves en la casa?", opciones: ["Yo", "Tú"], correcta: 0 },
    { p: "¿Quién es más probable que extrañe al otro?", opciones: ["Yo", "Tú"], correcta: 1 }
];
let actualJ6 = 0;
function iniciarJuego6() { actualJ6 = 0; document.getElementById('juego6').classList.remove('oculto'); cargarPreguntaJ6(); }
function cargarPreguntaJ6() {
    if(actualJ6 >= datosJ6.length) { mostrarExito("¡Nos conocemos demasiado bien!"); return; }
    const data = datosJ6[actualJ6]; document.getElementById('j6-pregunta').innerText = data.p; document.getElementById('j6-progreso').innerText = `Ronda ${actualJ6 + 1} de ${datosJ6.length}`;
    const divOpciones = document.getElementById('j6-opciones'); divOpciones.innerHTML = '';
    data.opciones.forEach((opcion, i) => {
        const btn = document.createElement('button'); btn.className = 'boton-opcion'; btn.innerText = opcion;
        btn.onclick = () => verificarJuegoStandard(i, btn, data.correcta, divOpciones, () => { actualJ6++; cargarPreguntaJ6(); });
        divOpciones.appendChild(btn);
    });
}

// ==========================================
// JUEGO 7: VERDADERO O FALSO
// ==========================================
const datosJ7 = [
    { afirmacion: "Me enamoré de ti desde el primer día.", correcta: true },
    { afirmacion: "Prefiero los regalos comprados que los hechos a mano.", correcta: false },
    { afirmacion: "Me gusta que me des besotes", correcta: true },
    { afirmacion: "No me gustan los doramas", correcta: false },
    { afirmacion: "Extraño que me a abraces", correcta: true }
];
let actualJ7 = 0;
function iniciarJuego7() { actualJ7 = 0; document.getElementById('juego7').classList.remove('oculto'); cargarAfirmacionJ7(); }
function cargarAfirmacionJ7() {
    if(actualJ7 >= datosJ7.length) { mostrarExito("¡Aprobaste con honores!"); return; }
    document.getElementById('j7-afirmacion').innerText = datosJ7[actualJ7].afirmacion; document.getElementById('j7-progreso').innerText = `Nivel ${actualJ7 + 1} de ${datosJ7.length}`;
    const botones = document.querySelectorAll('#juego7 .boton-opcion'); botones.forEach(b => { b.disabled = false; b.classList.remove('correcta', 'incorrecta'); });
}
function verificarJ7(respuesta, boton) {
    const correcto = datosJ7[actualJ7].correcta; const botones = document.querySelectorAll('#juego7 .boton-opcion'); botones.forEach(b => b.disabled = true);
    if (respuesta === correcto) {
        boton.classList.add('correcta'); setTimeout(() => { actualJ7++; cargarAfirmacionJ7(); }, 1500);
    } else {
        boton.classList.add('incorrecta'); setTimeout(() => { botones.forEach(b => b.disabled = false); boton.classList.remove('incorrecta'); }, 1000);
    }
}

// ==========================================
// JUEGO 8: CANDADO PIN
// ==========================================
let pinIngresado = ""; const PIN_CORRECTO = "0910";
function iniciarJuego8() { pinIngresado = ""; document.getElementById('j8-display').innerText = "_ _ _ _"; document.getElementById('juego8').classList.remove('oculto'); }
function teclearPin(num) { if(pinIngresado.length < 4) { pinIngresado += num; actualizarDisplayPin(); } }
function borrarPin() { pinIngresado = ""; actualizarDisplayPin(); }
function actualizarDisplayPin() { let display = ""; for(let i=0; i<4; i++) { display += (pinIngresado[i] !== undefined) ? pinIngresado[i] : "_"; if(i < 3) display += " "; } document.getElementById('j8-display').innerText = display; }
function verificarPin() {
    if(pinIngresado === PIN_CORRECTO) {
        confetti({ particleCount: 150, spread: 80 }); setTimeout(() => { mostrarExito("¡Candado desbloqueado! Feliz Aniversario mi amor."); }, 500);
    } else {
        const displayDOM = document.getElementById('j8-display'); displayDOM.style.color = "#E50914"; displayDOM.classList.add('error-shake');
        setTimeout(() => { displayDOM.style.color = "#333"; displayDOM.classList.remove('error-shake'); borrarPin(); }, 1000);
    }
}

// ==========================================
// FUNCION AUXILIAR PARA JUEGOS 4, 5 Y 6
// ==========================================
function verificarJuegoStandard(indice, boton, correcto, contenedor, callbackExito) {
    Array.from(contenedor.children).forEach(b => b.disabled = true);
    if(indice === correcto) {
        boton.classList.add('correcta'); setTimeout(() => { callbackExito(); }, 1500);
    } else {
        boton.classList.add('incorrecta'); setTimeout(() => { Array.from(contenedor.children).forEach(b => b.disabled = false); boton.classList.remove('incorrecta'); }, 1000);
    }
}