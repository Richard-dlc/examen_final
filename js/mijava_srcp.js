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