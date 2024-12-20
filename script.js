const canvas = document.getElementById('fireCanvas');
const ctx = canvas.getContext('2d');

const audio = document.getElementById('theme-music');
const toggleMusicButton = document.getElementById('toggle-music');

const hoverSound = new Audio('./public/sounds/hover-sound.mp3');
const swordSound = new Audio('./public/sounds/draw-sword.mp3');

const buttons = document.querySelectorAll('.hover-sound');

const swordButton = document.getElementById('swordShow');

swordButton.addEventListener('click', () => {
    swordSound.currentTime = 0;
    swordSound.play();
});

buttons.forEach((button) => {
    button.addEventListener('mouseover', () => {
        hoverSound.currentTime = 0;
        hoverSound.play();
    });
});

audio.addEventListener('canplay', () => {
    toggleMusicButton.disabled = false;
});

audio.addEventListener('error', () => {
    console.error('Erro ao carregar o áudio.');
    toggleMusicButton.disabled = true;
});

window.addEventListener('resize', () => {
    const oldWidth = canvas.width;
    const oldHeight = canvas.height;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    particles.forEach((particle) => {
        particle.x *= canvas.width / oldWidth;
        particle.y *= canvas.height / oldHeight;
    });
});


toggleMusicButton.addEventListener('click', () => {
    try {
        if (!audio.paused) {
            audio.pause();
            toggleMusicButton.textContent = audio.paused ? '🔈' : '🔊';
        } else {
            audio.play();
            toggleMusicButton.textContent = audio.play ? '🔊' : '🔈';
        }
    } catch (error) {
        console.error('Ocorreu um erro ao tentar manipular o áudio:', error);
        alert('Não foi possível executar trilha sonora.');
    }
    
});

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];

function createParticle() {
    const color = `rgba(255, 69, 0, ${Math.random().toFixed(2)})`
    const particle = {
        x: Math.random() * canvas.width,
        y: canvas.height,
        size: Math.random() * 4 + 1,
        speed: Math.random() * 4 + 2,
        opacity: Math.random(),
        color,
    };
    particles.push(particle);
}

function updateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y -= p.speed + Math.random();
        p.opacity -= 0.005;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color.replace(/[^,]+(?=\))$/, p.opacity.toFixed(2));
        ctx.fill();
        ctx.closePath();

        if (p.y + p.size < -50 || p.opacity <= 0) {
            particles.splice(i, 1);
            i--;
        }
    }
}

function animate() {
    if (particles.length < 100) {
        createParticle();
    }
    updateParticles();
    requestAnimationFrame(animate);
} 

animate();