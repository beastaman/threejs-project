import * as THREE from 'three';
import { initScene } from './threejs/scene';
import gsap from 'gsap';
import './styles.css';

interface SceneInit {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
}

const { scene, camera, renderer }: SceneInit = initScene();

async function setupVideo() {
  const video = document.createElement('video');
  video.src = '/Forest_new2_fox0001-0233.mkv';
  video.muted = true;
  video.playsInline = true;
  video.autoplay = true;

  // Hide content initially
  const content = document.querySelector('.content') as HTMLElement;
  if (content) {
    content.style.opacity = '0';
    content.style.visibility = 'hidden';
  }

  try {
    await video.play();
    
    const videoTexture = new THREE.VideoTexture(video);
    videoTexture.minFilter = THREE.LinearFilter;
    videoTexture.magFilter = THREE.LinearFilter;
    videoTexture.format = THREE.RGBAFormat;
    videoTexture.colorSpace = THREE.SRGBColorSpace;

    // Adjust plane size for better responsiveness
    const screenAspect = window.innerWidth / window.innerHeight;
    const videoAspect = video.videoWidth / video.videoHeight;
    let planeWidth = screenAspect > 1 ? 20 : 15;
    let planeHeight = planeWidth / videoAspect;

    const geometry = new THREE.PlaneGeometry(planeWidth, planeHeight);
    
    // Enhanced material with increased brightness
    const material = new THREE.MeshStandardMaterial({ 
      map: videoTexture,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0,
      color: new THREE.Color(1.4, 1.4, 1.4), // Increased brightness
      emissive: new THREE.Color(0.2, 0.2, 0.2), // Add slight glow
      emissiveMap: videoTexture,
      emissiveIntensity: 0.4
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 0, -1);
    scene.add(mesh);

    // Enhanced lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    const pointLight1 = new THREE.PointLight(0xffffff, 1.5);
    const pointLight2 = new THREE.PointLight(0xffffff, 1.5);
    
    pointLight1.position.set(5, 5, 5);
    pointLight2.position.set(-5, -5, 5);
    
    scene.add(ambientLight, pointLight1, pointLight2);

    // Fade in with higher final opacity
    gsap.to(material, {
      opacity: 1,
      duration: 1.5,
      ease: "power2.out"
    });

    // Simplified video end handling
    video.addEventListener('ended', () => {
      if (content) {
        // Simple fade in for content
        content.style.visibility = 'visible';
        gsap.to(content, {
          opacity: 1,
          duration: 1,
          ease: "power2.out"
        });
      }
      video.currentTime = video.duration;
    });

    // Simpler camera position
    camera.position.z = 8;

    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }
    animate();

  } catch (error) {
    console.error('Error loading video:', error);
  }
}

window.addEventListener('resize', () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
});

setupVideo();