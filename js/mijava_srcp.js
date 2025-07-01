function calcular() {
    const a = parseFloat(document.getElementById("ladoA").value);
    const b = parseFloat(document.getElementById("ladoB").value);
    const c = parseFloat(document.getElementById("ladoC").value);

    if (!a || !b || !c || a + b <= c || a + c <= b || b + c <= a) {
        alert("Los lados ingresados no forman un triángulo válido.");
        return;
    }

    const s = (a + b + c) / 2;

    // Área con fórmula de Herón
    const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));

    // Perímetro
    const perimetro = a + b + c;

    // Ángulos con Ley de Cosenos
    const anguloA = radToDeg(Math.acos((b ** 2 + c ** 2 - a ** 2) / (2 * b * c)));
    const anguloB = radToDeg(Math.acos((a ** 2 + c ** 2 - b ** 2) / (2 * a * c)));
    const anguloC = 180 - anguloA - anguloB;

    // Medianas
    const ma = 0.5 * Math.sqrt(2 * b ** 2 + 2 * c ** 2 - a ** 2);
    const mb = 0.5 * Math.sqrt(2 * a ** 2 + 2 * c ** 2 - b ** 2);
    const mc = 0.5 * Math.sqrt(2 * a ** 2 + 2 * b ** 2 - c ** 2);

    // Alturas
    const ha = (2 * area) / a;
    const hb = (2 * area) / b;
    const hc = (2 * area) / c;

    // Bisectrices
    const ta = calcularBisectriz(b, c, a);
    const tb = calcularBisectriz(a, c, b);
    const tc = calcularBisectriz(a, b, c);

    // Mostrar resultados
    document.getElementById("resultados").innerHTML = `
        <div class="resultado-box">
            <h3>Ángulos</h3>
            a = ${anguloA.toFixed(2)}°<br>
            ß = ${anguloB.toFixed(2)}°<br>
            ? = ${anguloC.toFixed(2)}°
        </div>
        <div class="resultado-box">
            <h3>Medianas</h3>
            ma = ${ma.toFixed(2)}<br>
            mb = ${mb.toFixed(2)}<br>
            mc = ${mc.toFixed(2)}
        </div>
        <div class="resultado-box">
            <h3>Bisectrices</h3>
            ta = ${ta.toFixed(2)}<br>
            tb = ${tb.toFixed(2)}<br>
            tc = ${tc.toFixed(2)}
        </div>
        <div class="resultado-box">
            <h3>Alturas</h3>
            ha = ${ha.toFixed(2)}<br>
            hb = ${hb.toFixed(2)}<br>
            hc = ${hc.toFixed(2)}
        </div>
        <div class="resultado-box">
            <h3>Perímetro y Área</h3>
            Perímetro = ${perimetro.toFixed(2)}<br>
            Área = ${area.toFixed(2)}
        </div>
    `;
}

function radToDeg(r) {
    return r * 180 / Math.PI;
}

function calcularBisectriz(b, c, a) {
    const s = (b + c + a) / 2;
    return (2 * b * c * Math.cos(radToDeg(Math.acos((b ** 2 + c ** 2 - a ** 2) / (2 * b * c))) / 2)) / (b + c);
}