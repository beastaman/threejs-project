import * as THREE from 'three';

export function initScene() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);

  const camera = new THREE.PerspectiveCamera(
    75, // Increased FOV for better fullscreen coverage
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  
  // Position camera for fullscreen viewing
  camera.position.z = 5;

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: false,
    powerPreference: "high-performance"
  });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 1);
  
  // Enhanced rendering properties for better brightness
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 2.0;
  
  document.body.appendChild(renderer.domElement);

  // Enhanced lighting for better video visibility
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
  directionalLight.position.set(5, 5, 5);

  const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.6);

  scene.add(ambientLight, directionalLight, hemisphereLight);

  return { scene, camera, renderer };
}