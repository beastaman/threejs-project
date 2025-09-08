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
  video.loop = false;
  video.style.display = 'none';
  document.body.appendChild(video);

  // Hide content initially
  const content = document.querySelector('.content') as HTMLElement;
  const heading = content?.querySelector('h1') as HTMLElement;
  const tagline = content?.querySelector('.tagline') as HTMLElement;
  const newsletter = content?.querySelector('.newsletter') as HTMLElement;

  if (content) {
    content.style.visibility = 'hidden';
    gsap.set([heading, tagline, newsletter], {
      opacity: 0,
      y: 50,
      scale: 0.9
    });
  }

  try {
    await new Promise((resolve, reject) => {
      video.addEventListener('loadeddata', resolve, { once: true });
      video.addEventListener('error', reject, { once: true });
      video.load();
    });

    await video.play();
    
    const videoTexture = new THREE.VideoTexture(video);
    videoTexture.minFilter = THREE.LinearFilter;
    videoTexture.magFilter = THREE.LinearFilter;
    videoTexture.colorSpace = THREE.SRGBColorSpace;

    // Calculate proper fullscreen dimensions
    const fov = camera.fov * (Math.PI / 180);
    const distance = camera.position.z;
    const vFOV = 2 * Math.tan(fov / 2) * distance;
    const hFOV = vFOV * camera.aspect;

    // Use these dimensions to ensure fullscreen coverage
    const planeWidth = hFOV;
    const planeHeight = vFOV;

    const geometry = new THREE.PlaneGeometry(planeWidth, planeHeight);
    
    // Enhanced material for better brightness
    const material = new THREE.MeshStandardMaterial({ 
      map: videoTexture,
      side: THREE.FrontSide,
      color: new THREE.Color(1.3, 1.3, 1.3),
      emissive: new THREE.Color(0.15, 0.15, 0.15),
      emissiveMap: videoTexture,
      emissiveIntensity: 0.3,
      roughness: 0.8,
      metalness: 0.0
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 0, 0); // Center at origin
    scene.add(mesh);

    // Add additional point lights for brightness
    const pointLight1 = new THREE.PointLight(0xffffff, 1.2, 30);
    pointLight1.position.set(0, 0, 5);
    const pointLight2 = new THREE.PointLight(0xffffff, 0.8, 25);
    pointLight2.position.set(-5, 5, 3);
    const pointLight3 = new THREE.PointLight(0xffffff, 0.8, 25);
    pointLight3.position.set(5, -5, 3);
    
    scene.add(pointLight1, pointLight2, pointLight3);

    // Video end event
    video.addEventListener('ended', () => {
      if (content) {
        content.style.visibility = 'visible';
        
        const tl = gsap.timeline({
          defaults: { ease: "power3.out" }
        });

        tl.to(heading, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
        })
        .to(tagline, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
        }, "-=0.7")
        .to(newsletter, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
        }, "-=0.5");
      }
      
      video.currentTime = video.duration - 0.1;
    });

    // Enhanced resize handler
    function handleResize() {
      const newFOV = 2 * Math.tan(fov / 2) * distance;
      const newHFOV = newFOV * camera.aspect;
      
      mesh.geometry.dispose();
      mesh.geometry = new THREE.PlaneGeometry(newHFOV, newFOV);
    }

    window.addEventListener('resize', handleResize);

    // Animation loop
    function animate() {
      requestAnimationFrame(animate);
      if (video.readyState === 4) {
        videoTexture.needsUpdate = true;
      }
      renderer.render(scene, camera);
    }
    animate();

  } catch (error) {
    console.error('Video setup failed:', error);
  }
}

// Handle window resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Initialize
setupVideo().catch(console.error);