import { gsap } from 'https://cdn.skypack.dev/gsap';
import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';

// Camera Setup
const camera = new THREE.PerspectiveCamera(10, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 80;

const scene = new THREE.Scene();
let phoenix;
let mixer;
const loader = new GLTFLoader();
loader.load('phoenix_bird.glb', function (gltf) {
    phoenix = gltf.scene;
    scene.add(phoenix);
    phoenix.scale.set(0.006, 0.006, 0.006);
    phoenix.position.set(0, 20, 0); // Start off-screen at the top of the screen

    // Initial rotation: Face down (rotate around X or Z axis)
    phoenix.rotation.set(Math.PI / 2, Math.PI, 0);  // Facing down initially

    // Initialize the animation mixer
    mixer = new THREE.AnimationMixer(phoenix);
    const action = mixer.clipAction(gltf.animations[0]);
    action.play();

    // Slow down the flying animation by adjusting the timeScale
    action.timeScale = 0.4;

    

    // Trigger the entrance animation after the model is loaded
    entranceAnimation();

    modelMove();
}, function (xhr) {}, function (error) {});

// Renderer Setup
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container3D').appendChild(renderer.domElement);

// Lights Setup
const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
scene.add(ambientLight);
const topLight = new THREE.DirectionalLight(0xffffff, 1);
topLight.position.set(500, 500, 500);
scene.add(topLight);

// Function to Render the Scene
const reRender3D = () => {
    requestAnimationFrame(reRender3D);
    renderer.render(scene, camera);
    if (mixer) mixer.update(0.02);
};
reRender3D();

// Define a Path Using CatmullRomCurve3
const pathPoints = [
    new THREE.Vector3(0, -5.9, 0),
    new THREE.Vector3(1, -1, -5),
    new THREE.Vector3(-1, -1, -5),
    new THREE.Vector3(0.8, -1, 0)
];
const path = new THREE.CatmullRomCurve3(pathPoints);

// Model's position and rotation configuration
let arrPositionModel = [
    {
        id: 'banner',
        position: { x: 0, y: -5.6, z: 0 },
        rotation: { x: 0, y: 0.9, z: 0.2 }  // Initial rotation
    },
    {
        id: "fibo",
        position: { x: 6, y: -4, z: 0 },  // Move to the right side
        rotation: { x: 0, y: Math.PI, z: 0.6 }  // Face left (rotate 180 degrees)
    },
    {
        id: "palin",
        position: { x: -6, y: -4.2, z: 0 },  // Move to the left side
        rotation: { x: 0, y: 0, z: 0.6 }  // Face right (rotate 0 degrees)
    },
    {
        id: "mat",
        position: { x: 9, y: -3.8, z: 0 },  // Move to the right side
        rotation: { x: 0, y: Math.PI, z: 0.6 }  // Face left
    },
    {
        id: "str",
        position: { x: -6, y: -4, z: 0 },  // Move to the left side
        rotation: { x: 0, y: 0.6, z: 0.5 }  // Face right (rotation y = 0)
    },
];

// Function to Move Model Based on Scroll
const modelMove = () => {
    const sections = document.querySelectorAll('.section');
    let currentSection;
    sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 3) {
            currentSection = section.id;
        }
    });

    // Finding the current section and calculating position on the path
    let position_active = arrPositionModel.findIndex((val) => val.id == currentSection);
    if (position_active >= 0) {
        let new_coordinates = arrPositionModel[position_active];

        // Calculate a normalized value for the path based on the section
        const pathProgress = position_active / (arrPositionModel.length - 1); 

        // Set speed and duration for scroll-based movement
        const movementDuration = 3;  // Set duration for movement (higher is slower)
        const movementSpeed = 1.2;  // Controls the movement speed (higher = faster)

        // Animate the Phoenix's position along the path
        gsap.to(phoenix.position, {
            x: new_coordinates.position.x,
            y: new_coordinates.position.y,
            z: new_coordinates.position.z,
            duration: movementDuration / movementSpeed,  // Adjust based on speed
            ease: "power1.out"  // Faster easing for quick movement
        });

        // Animate rotation based on the current section
        gsap.to(phoenix.rotation, {
            x: new_coordinates.rotation.x,
            y: new_coordinates.rotation.y,
            z: new_coordinates.rotation.z,
            duration: movementDuration / movementSpeed,  // Adjust duration for rotation
            ease: "power1.out"
        });
    }
};

// Entrance Animation Function (Smooth Animation from Off-Screen)
const entranceAnimation = () => {
    const entranceDuration = 1.5; // Set the duration for the entrance animation
    const speedFactor = 1.5; // Controls the speed of the movement (larger value = faster)

    // Animate the Phoenix to move from off-screen to on-screen
    gsap.to(phoenix.position, {
        y: 0,  // Final position on-screen (y = 0)
        duration: entranceDuration / speedFactor, // Adjust duration based on speed
        ease: "power3.out",  // Smooth easing for the entrance
        onComplete: () => {
            console.log("Phoenix has entered the screen");
        }
    });

    // Animation to face down and then rotate to face forward (turnaround effect)
    gsap.to(phoenix.rotation, {
        x: 0,  // Final facing up
        y: Math.PI / 2,  // Final facing forward
        z: 0,  // Final z-rotation
        duration: entranceDuration / speedFactor,  // Adjust rotation duration
        ease: "power3.out"
    });

    // Optional: Animate the scale for a more dramatic entrance (could also affect speed)
    gsap.fromTo(phoenix.scale, {
        x: 0.006,
        y: 0.006,
        z: 0.006
    }, {
        x: 0.008,
        y: 0.008,
        z: 0.008,
        duration: entranceDuration / speedFactor,  // Scale duration also adjusted
        ease: "power3.out"
    });
};

// Event listeners for scroll and resize (same as before)
window.addEventListener('scroll', () => {
    if (phoenix) {
        modelMove();
    }
});
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
