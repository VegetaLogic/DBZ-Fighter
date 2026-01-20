// Dragon Ball Z Fighter Game - Original Implementation
// Using Three.js for 3D graphics

// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87CEEB); // Sky blue

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 5, 10);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lighting
const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(10, 10, 5);
scene.add(directionalLight);

// Ground (arena) - Level 1: Basic
const groundGeometry = new THREE.PlaneGeometry(20, 20);
const groundMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513 }); // Brown
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// Add some walls for Tekken-style interactions
const wallGeometry = new THREE.BoxGeometry(20, 5, 1);
const wallMaterial = new THREE.MeshLambertMaterial({ color: 0x666666 });
const wall = new THREE.Mesh(wallGeometry, wallMaterial);
wall.position.set(0, 2.5, -10);
scene.add(wall);

// Player character (Goku - capsule-like: cylinder body + sphere head)
const playerBodyGeometry = new THREE.CylinderGeometry(0.5, 0.5, 1.5, 8);
const playerHeadGeometry = new THREE.SphereGeometry(0.4, 8, 8);
const playerMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000, roughness: 0.3, metalness: 0.1 });
const playerBody = new THREE.Mesh(playerBodyGeometry, playerMaterial);
const playerHead = new THREE.Mesh(playerHeadGeometry, playerMaterial);
playerHead.position.y = 1;
const player = new THREE.Group();
player.add(playerBody);
player.add(playerHead);
player.position.set(-5, 0.75, 0);
scene.add(player);

// Enemy character (Vegeta - capsule-like)
const enemyBodyGeometry = new THREE.CylinderGeometry(0.5, 0.5, 1.5, 8);
const enemyHeadGeometry = new THREE.SphereGeometry(0.4, 8, 8);
const enemyMaterial = new THREE.MeshStandardMaterial({ color: 0x0000ff, roughness: 0.3, metalness: 0.1 });
const enemyBody = new THREE.Mesh(enemyBodyGeometry, enemyMaterial);
const enemyHead = new THREE.Mesh(enemyHeadGeometry, enemyMaterial);
enemyHead.position.y = 1;
const enemy = new THREE.Group();
enemy.add(enemyBody);
enemy.add(enemyHead);
enemy.position.set(5, 0.75, 0);
scene.add(enemy);

// Controls
const keys = {};
let gameStarted = false;

// Start game function
function startGame() {
    gameStarted = true;
    document.getElementById('titleScreen').style.display = 'none';
    animate();
}

// Event listeners
document.addEventListener('keydown', (event) => {
    if (!gameStarted && event.code === 'Enter') {
        startGame();
    }
    if (gameStarted) {
        keys[event.code] = true;
    }
});

document.addEventListener('keyup', (event) => {
    keys[event.code] = false;
});

// Game variables
let playerHealth = 100;
let enemyHealth = 100;
let powerLevel = 0;
let comboCount = 0;
let lastAttackTime = 0;
let isTransformed = false;

// Attack function
function attack(attacker, target) {
    const distance = attacker.position.distanceTo(target.position);
    if (distance < 2) {
        // Hit
        if (target === enemy) {
            enemyHealth -= 10 + comboCount * 2;
            comboCount++;
        } else {
            playerHealth -= 10;
        }
        // Knockback
        const knockbackDir = new THREE.Vector3().subVectors(target.position, attacker.position).normalize();
        target.position.add(knockbackDir.multiplyScalar(0.5));
    } else {
        comboCount = 0;
    }
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    const now = Date.now();

    // Player movement (Tekken-style: WASD for movement, sidestep with Q/E)
    if (keys['KeyW']) player.position.z -= 0.1;
    if (keys['KeyS']) player.position.z += 0.1;
    if (keys['KeyA']) player.position.x -= 0.1;
    if (keys['KeyD']) player.position.x += 0.1;
    if (keys['KeyQ']) { // Sidestep left
        player.position.x -= 0.05;
        player.rotation.y += 0.1;
    }
    if (keys['KeyE']) { // Sidestep right
        player.position.x += 0.05;
        player.rotation.y -= 0.1;
    }

    // Player attack (Space for punch)
    if (keys['Space'] && now - lastAttackTime > 500) {
        attack(player, enemy);
        lastAttackTime = now;
    }

    // Enemy AI (move towards player, attack occasionally)
    const direction = new THREE.Vector3().subVectors(player.position, enemy.position).normalize();
    enemy.position.add(direction.multiplyScalar(0.03));
    enemy.lookAt(player.position);

    if (Math.random() < 0.01) { // 1% chance per frame to attack
        attack(enemy, player);
    }

    // Transformation (Super Saiyan when power level > 50)
    if (powerLevel > 50 && !isTransformed) {
        playerBody.material.emissive = new THREE.Color(0xffff00); // Glow
        playerHead.material.emissive = new THREE.Color(0xffff00);
        player.scale.set(1.2, 1.2, 1.2);
        isTransformed = true;
    }

    // Update UI
    document.getElementById('playerHealth').textContent = Math.max(0, playerHealth);
    document.getElementById('enemyHealth').textContent = Math.max(0, enemyHealth);
    document.getElementById('powerLevel').textContent = Math.floor(powerLevel);
    document.getElementById('combo').textContent = comboCount;

    // Power level increase
    powerLevel += 0.1;

    // Check win/lose
    if (playerHealth <= 0) {
        alert('You lost! Refresh to restart.');
    } else if (enemyHealth <= 0) {
        alert('You won! Refresh to restart.');
    }

    renderer.render(scene, camera);
}

// Window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});