class Bola {
    constructor(x, y){
        this.x = x 
        this.y = y 
        this.radio = 4
        this.dirX = (Math.random() * 2) - 1
        this.dirY = (Math.random() * 2) - 1
        this.velocidad = 3
        this.originalX = x  // Guardamos la posición original
        this.originalY = y
    }

    dibujar(){
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radio, 0, Math.PI * 2)
        ctx.fillStyle = '#000000'
        ctx.fill()
        ctx.closePath()
    }

    mover(){
        // Movimiento normal
        this.x += this.dirX * this.velocidad
        this.y += this.dirY * this.velocidad
        
        // Rebote en los bordes
        if(this.x + this.radio > canvas.width || this.x < 0){
            this.dirX *= -1
        }
        if(this.y + this.radio > canvas.height || this.y < 0){
            this.dirY *= -1
        }

        // Efecto del mouse
        if (mouse.x && mouse.y) {
            const distX = mouse.x - this.x;
            const distY = mouse.y - this.y;
            const distancia = Math.sqrt(distX * distX + distY * distY);
            const radioInfluencia = 100; // Radio de influencia del mouse

            if (distancia < radioInfluencia) {
                // Calculamos la fuerza de repulsión (más fuerte cuando está más cerca)
                const fuerza = (radioInfluencia - distancia) / radioInfluencia;
                
                // Aplicamos la fuerza en dirección opuesta al mouse
                this.x -= (distX / distancia) * fuerza * 2;
                this.y -= (distY / distancia) * fuerza * 2;
            }
        }
    }

    conectar(otraBola) {
        const distancia = Math.sqrt(
            Math.pow(this.x - otraBola.x, 2) + 
            Math.pow(this.y - otraBola.y, 2)
        );
        
        const distanciaMaxima = 250;
        
        if (distancia < distanciaMaxima) {
            const opacidad = 0.1 + (0.2 * (1 - (distancia / distanciaMaxima)));
            
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 0, 0, ${opacidad})`;
            ctx.lineWidth = 1;
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(otraBola.x, otraBola.y);
            ctx.stroke();
            ctx.closePath();
        }
    }
}