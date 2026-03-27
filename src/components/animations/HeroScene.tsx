"use client";

import { useRef, useEffect } from "react";

export default function HeroScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !mountRef.current) return;

    let animationFrameId: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mount = mountRef.current as any;

    (async () => {
      const THREE = await import("three");

      const container = mountRef.current!;
      const width = container.clientWidth;
      const height = container.clientHeight;

      const scene = new THREE.Scene();

      const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
      camera.position.z = 4;

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(window.devicePixelRatio);
      container.appendChild(renderer.domElement);

      const geometry = new THREE.IcosahedronGeometry(1.5, 1);
      const material = new THREE.MeshBasicMaterial({ color: 0x6366f1, wireframe: true });
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
      scene.add(ambientLight);

      const pointLight = new THREE.PointLight(0x6366f1, 1.5, 20);
      pointLight.position.set(3, 3, 3);
      scene.add(pointLight);

      const handleResize = () => {
        const w = container.clientWidth;
        const h = container.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener("resize", handleResize);

      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        mesh.rotation.x += 0.003;
        mesh.rotation.y += 0.005;
        renderer.render(scene, camera);
      };
      animate();

      mount._cleanup = () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener("resize", handleResize);
        renderer.dispose();
        geometry.dispose();
        material.dispose();
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      };
    })();

    return () => {
      mount._cleanup?.();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{ width: "100%", height: "100%", position: "absolute", top: 0, left: 0 }}
      aria-hidden="true"
    />
  );
}
