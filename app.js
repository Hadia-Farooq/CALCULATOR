let display = document.getElementById("display");
let buttons = document.querySelectorAll("button");

buttons.forEach(function(button) {
    button.onclick = function() {
        let value = button.innerText;

        if (value === "C") {
            display.value = "";
        }
        else if (value === "⌫") {
    display.value = display.value.slice(0, -1);
}else if (value === "%") {
    display.value = Number(display.value) / 100;
}
        else if (value === "=") {
            try {
                display.value = eval(display.value);
            }
            catch {
                display.value = "Error";
            }
        }
        else {
            display.value = display.value + value;
        }
    };
});

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

let dots = [];
let mouse = { x: -1000, y: -1000 };

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    dots = [];

    for (let i = 0; i < 90; i++) {
        dots.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: 0,
            vy: 0
        });
    }
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function moveMouse(e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
}

window.addEventListener("mousemove", moveMouse);

window.addEventListener("touchmove", function(e) {
    if (e.touches.length > 0) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
    }
}, { passive: true });

window.addEventListener("touchend", function() {
    mouse.x = -1000;
    mouse.y = -1000;
});

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    dots.forEach(function(dot) {
        let dx = dot.x - mouse.x;
        let dy = dot.y - mouse.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100 && distance > 0) {
            dot.vx += (dx / distance) * 0.8;
            dot.vy += (dy / distance) * 0.8;
        }

        dot.vx *= 0.95;
        dot.vy *= 0.95;

        dot.x += dot.vx;
        dot.y += dot.vy;

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = "#87915D";
        ctx.fill();
    });

    requestAnimationFrame(animate);
}

animate();
