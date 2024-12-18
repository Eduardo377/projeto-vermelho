const canvas = document.getElementById('fireCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];

function createParticle() {
    const particle = {
        x: Math.random() * canvas.width,
        y: canvas.height,
        size: Math.random() * 4 + 1,
        speed: Math.random() * 4 + 2,
        opacity: Math.random(),
        color: `rgba(255, 69, 0, ${Math.random()})`
    };
    particles.push(particle);
}

function updateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y -= p.speed;
        p.opacity -= 0.005;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        ctx.closePath();

        if (p.y + p.size < -50 || p.opacity <= 0) {
            particles.splice(i, 1);
            i--;
        }
    }
}

function animate() {
    createParticle();
    updateParticles();
    requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

animate();
