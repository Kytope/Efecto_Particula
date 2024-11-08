const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

// Objeto para rastrear la posición del mouse
const mouse = {
    x: null,
    y: null
}

// Eventos del mouse
canvas.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});

canvas.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
});

let bolas = [];

for (let i = 0; i < 100; i++){
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    bolas.push(new Bola(x, y));
}

function animar(){
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Dibujamos las conexiones
    for (let i = 0; i < bolas.length; i++) {
        for (let j = i + 1; j < bolas.length; j++) {
            bolas[i].conectar(bolas[j]);
        }
    }

    // Dibujamos y movemos las bolas
    bolas.forEach(bola => {
        bola.dibujar();
        bola.mover();
    });
    
    requestAnimationFrame(animar);
}

// Ajustar el canvas cuando la ventana cambia de tamaño
window.addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
});

animar();