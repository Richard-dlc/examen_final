## EXAMEN FINAL - CALCULADORA INTEGRAL DE TRIANGULOS

### Comandos de HTML
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Calculadora Integral de Triángulos</title>

      <!-- Vinculamos el archivo de estilos CSS -->
    <link rel="stylesheet" href="css/miestilo.css">
</head>
<body>
    <div class="container">
        <h1>Calculadora Integral de Triángulos</h1>
        <p class="subtitulo">Análisis completo de un triángulo a partir de sus tres lados</p>

          <!-- Formulario para ingresar los lados del triángulo -->
        <div class="formulario">
            <label>Lado a: <input type="number" id="ladoA" /></label>
            <label>Lado b: <input type="number" id="ladoB" /></label>
            <label>Lado c: <input type="number" id="ladoC" /></label>

            <!-- Botón que ejecuta la función calcular() del archivo JS -->
            <button onclick="calcular()">Calcular</button>
        </div>

        <!-- Área de dibujo -->
        <canvas id="trianguloCanvas" width="400" height="400"></canvas>

        <!-- Aquí se mostrará el resultado generado por JavaScript -->
        <div class="resultados" id="resultados"></div>
    </div>

     <!-- Vinculamos el archivo JavaScript -->
    <script src="js/mijava_srcp.js"></script>
</body>
</html>

## Comandos de CSS
/* Estilo general del cuerpo de la página */
body {
    font-family: Arial, sans-serif;
    background-color: #f5f8fa;
    margin: 0;
    padding: 0;
}

/* Contenedor principal del contenido */
.container {
    max-width: 900px;  /* Ancho máximo */
    margin: 40px auto;  /* Centrado vertical y horizontal */
    padding: 20px;
    background-color: #ffffff; /* Fondo blanco */
    border-radius: 12px; /* Bordes redondeados */
    box-shadow: 0 0 12px rgba(0, 0, 0, 0.1); /* Sombra suave */
    text-align: center;
}

/* Título principal */
h1 {
    color: #1d3557; /* Azul oscuro */
    margin-bottom: 10px;
}

/* Subtítulo */
.subtitulo {
    color: #457b9d;  /* Azul claro */
    margin-bottom: 30px;
}

/* Formulario de entrada de datos */
.formulario {
    display: flex;
    justify-content: center;
    gap: 15px; /* Espacio entre elementos */
    flex-wrap: wrap;
    margin-bottom: 30px;
}

/* Estilo de los campos de entrada */
.formulario input {
    width: 80px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 6px;
}

/* Botón de calcular */
.formulario button {
    padding: 8px 20px;
    background-color: #1d3557; /* Azul oscuro */
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.3s; /* Suaviza el cambio de color al pasar el mouse */
}

.formulario button:hover {
    background-color: #457b9d; /* Color al pasar el mouse */
}

/* Contenedor de resultados en forma de cuadrícula */
.resultados {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    text-align: left;
}

/* Caja de cada resultado */
.resultado-box {
    background-color: #f1faee;
    border-left: 6px solid #1d3557;
    padding: 15px;
    border-radius: 8px;
}

/* Título dentro de cada caja de resultados */
.resultado-box h3 {
    margin-top: 0;
    color: #1d3557;
}

## Comandos de JAVA SCRIPT
// Función principal que se ejecuta al hacer clic en "Calcular"
function calcular() {
    // Obtenemos los valores ingresados por el usuario y los convertimos a números decimales
    const a = parseFloat(document.getElementById("ladoA").value);
    const b = parseFloat(document.getElementById("ladoB").value);
    const c = parseFloat(document.getElementById("ladoC").value);

     // Verificamos si los lados ingresados forman un triángulo válido (desigualdad triangular)
    if (!a || !b || !c || a + b <= c || a + c <= b || b + c <= a) {
        alert("Los lados ingresados no forman un triángulo válido.");
        return;
    }

    // Dibujo del triángulo
    dibujarTriangulo(a, b, c);

    // Calculamos el semiperímetro (s) para usar en varias fórmulas
    const s = (a + b + c) / 2;

    // --- ÁREA usando la fórmula de Herón ---
    const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));

    // --- PERÍMETRO ---
    const perimetro = a + b + c;

    // --- ÁNGULOS usando la Ley de Cosenos ---
    const anguloA = radToDeg(Math.acos((b ** 2 + c ** 2 - a ** 2) / (2 * b * c)));
    const anguloB = radToDeg(Math.acos((a ** 2 + c ** 2 - b ** 2) / (2 * a * c)));
    const anguloC = 180 - anguloA - anguloB; // Se deduce el tercer ángulo

     // --- MEDIANAS (desde vértices opuestos) ---
    const ma = 0.5 * Math.sqrt(2 * b ** 2 + 2 * c ** 2 - a ** 2);
    const mb = 0.5 * Math.sqrt(2 * a ** 2 + 2 * c ** 2 - b ** 2);
    const mc = 0.5 * Math.sqrt(2 * a ** 2 + 2 * b ** 2 - c ** 2);

    // --- ALTURAS desde cada lado ---
    const ha = (2 * area) / a;
    const hb = (2 * area) / b;
    const hc = (2 * area) / c;

    // --- BISECTRICES internas desde cada vértice ---
    const ta = calcularBisectriz(b, c, a);
    const tb = calcularBisectriz(a, c, b);
    const tc = calcularBisectriz(a, b, c);

    // Mostramos todos los resultados dentro del contenedor "resultados"
    document.getElementById("resultados").innerHTML = `
        <div class="resultado-box">
            <h3>Ángulos</h3>
            Ángulo a (α) = ${anguloA.toFixed(2)}°<br>
            Ángulo b (β) = ${anguloB.toFixed(2)}°<br>
            Ángulo c (γ) = ${anguloC.toFixed(2)}°
        </div>
        <div class="resultado-box">
            <h3>Medianas</h3>
            Mediana ma = ${ma.toFixed(2)}<br>
            Mediana mb = ${mb.toFixed(2)}<br>
            Mediana mc = ${mc.toFixed(2)}
        </div>
        <div class="resultado-box">
            <h3>Bisectrices</h3>
            Bisectriz ta = ${ta.toFixed(2)}<br>
            Bisectriz tb = ${tb.toFixed(2)}<br>
            Bisectriz tc = ${tc.toFixed(2)}
        </div>
        <div class="resultado-box">
            <h3>Alturas</h3>
            Altura ha = ${ha.toFixed(2)}<br>
            Altura hb = ${hb.toFixed(2)}<br>
            Altura hc = ${hc.toFixed(2)}
        </div>
        <div class="resultado-box">
            <h3>Perímetro y Área</h3>
            Perímetro = ${perimetro.toFixed(2)}<br>
            Área = ${area.toFixed(2)}
        </div>
    `;
}
// Función para convertir radianes a grados sexagesimales
function radToDeg(r) {
    return r * 180 / Math.PI;
}

// Función para calcular la longitud de una bisectriz interna desde un vértice
function calcularBisectriz(b, c, a) {
    // Esta fórmula deriva de la ley de la bisectriz
    const angulo = Math.acos((b ** 2 + c ** 2 - a ** 2) / (2 * b * c));
    const bisectriz = (2 * b * c * Math.cos(angulo / 2)) / (b + c);
    return bisectriz;
}

function dibujarTriangulo(a, b, c) {
    const canvas = document.getElementById("trianguloCanvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const escala = 300 / Math.max(a, b, c);
    const A = a * escala;
    const B = b * escala;
    const C = c * escala;

    const Ax = 50, Ay = 300;
    const Bx = Ax + C, By = 300;

    const cosGamma = (A**2 + B**2 - C**2) / (2 * A * B);
    const gamma = Math.acos(cosGamma);

    const Cx = Ax + B * Math.cos(gamma);
    const Cy = Ay - B * Math.sin(gamma);

    ctx.beginPath();
    ctx.moveTo(Ax, Ay);
    ctx.lineTo(Bx, By);
    ctx.lineTo(Cx, Cy);
    ctx.closePath();
    ctx.strokeStyle = "#1d3557";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = "#a8dadc";
    ctx.fill();

    ctx.fillStyle = "#000";
    ctx.font = "16px Arial";
    ctx.fillText(`a = ${a}`, (Bx + Cx) / 2, (By + Cy) / 2 - 10);
    ctx.fillText(`b = ${b}`, (Ax + Cx) / 2 - 30, (Ay + Cy) / 2);
    ctx.fillText(`c = ${c}`, (Ax + Bx) / 2 - 10, Ay + 20);
}