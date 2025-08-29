"use client";
import React, { useEffect, useRef } from "react";
import * as three from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import populateDistantStars from "./components/populateDistantStars";
import Ship from "./components/ship";
const Black = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rendererRef = useRef<three.WebGLRenderer | null>(null);
  const cameraRef = useRef<three.PerspectiveCamera | null>(null);
  const sceneRef = useRef<three.Scene | null>(null);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    const renderer = new three.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
    });
    renderer.setSize(
      canvasRef.current.clientWidth,
      canvasRef.current.clientHeight
    );
    renderer.outputColorSpace = three.SRGBColorSpace;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = three.PCFShadowMap;
    rendererRef.current = renderer;

    const camera = new three.PerspectiveCamera(
      75,
      canvasRef.current.clientWidth / canvasRef.current.clientHeight,
      0.1,
      10000
    );
    camera.position.set(50, 50, 50);
    camera.lookAt(0, 0, 0);
    const controls = new OrbitControls(camera, canvasRef.current);
    controls.update();
    cameraRef.current = camera;

    const axeshelper = new three.AxesHelper(10);
    axeshelper.position.set(0, 0, 0);

    const light = new three.PointLight(0xffffff, 100, 0, 2);
    light.position.set(0, 20, 0);
    light.shadow.bias = -0.001;
    light.castShadow = true;

    // const light = new three.DirectionalLight(0xffffff, 1);
    // light.castShadow = true;

    const ball = new Ship(10, 0xffffff);
    ball.mesh.castShadow = true;
    ball.mesh.receiveShadow = true;

    const surfaceGeometry = new three.PlaneGeometry(200, 200);
    const surfaceMaterial = new three.MeshStandardMaterial({
      roughness: 0.2,
      metalness: 0,
      color: 0xffffff,
      side: three.DoubleSide,
    });
    const surface = new three.Mesh(surfaceGeometry, surfaceMaterial);
    surface.receiveShadow = true;
    surface.castShadow = true;
    surface.position.set(0, -20, 0);
    surface.rotation.x = Math.PI / 2;
    const stars = populateDistantStars(10000, 10000);

    const scene = new three.Scene();
    sceneRef.current = scene;

    scene.add(ball.mesh, surface, light, stars);

    const onResize = () => {
      const height = window.innerHeight;
      const width = window.innerWidth;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    addEventListener("resize", onResize);

    let frameId: number;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      renderer.render(scene, camera);
      ball.update();
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      removeEventListener("resize", onResize);
      ball.mesh.geometry.dispose();
      surface.geometry.dispose();
      surface.material.dispose();
      renderer.dispose();
      scene.clear();
    };
  }, []);

  return <canvas ref={canvasRef} className="h-screen w-screen"></canvas>;
};

export default Black;

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

// "use client";
// import React, { useEffect, useRef } from "react";
// import * as three from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// import populateDistantStars from "./components/populateDistantStars";

// const Black = () => {
//   const containerRef = useRef<HTMLDivElement | null>(null);
//   const rendererRef = useRef<three.WebGLRenderer | null>(null);
//   const cameraRef = useRef<three.PerspectiveCamera | null>(null);
//   const sceneRef = useRef<three.Scene | null>(null);
//   const resizeObserverRef = useRef<ResizeObserver | null>(null);

//   useEffect(() => {
//     if (!containerRef.current) {
//       return;
//     }
//     const renderer = new three.WebGLRenderer({ antialias: true });
//     renderer.outputColorSpace = three.SRGBColorSpace;
//     renderer.setSize(
//       containerRef.current.clientWidth,
//       containerRef.current.clientHeight
//     );
//     renderer.shadowMap.enabled = true;
//     renderer.shadowMap.type = three.PCFShadowMap;
//     renderer.setClearColor(0x000000, 1);

//     containerRef.current.appendChild(renderer.domElement);
//     rendererRef.current = renderer;

//     const camera = new three.PerspectiveCamera(
//       60,
//       containerRef.current.clientWidth / containerRef.current.clientHeight,
//       0.1,
//       5000
//     );
//     const controls = new OrbitControls(camera, renderer.domElement);
//     controls.enableDamping = true;
//     controls.dampingFactor = 0.1;
//     cameraRef.current = camera;
//     camera.position.set(10, 10, 10);
//     camera.lookAt(0, 0, 0);

//     const axeshelper = new three.AxesHelper(1);
//     const stars = populateDistantStars(2000, 2000);

//     const scene = new three.Scene();
//     sceneRef.current = scene;
//     scene.add(axeshelper, stars);

//     const onResize = () => {
//       const height = containerRef.current?.clientHeight;
//       const width = containerRef.current?.clientWidth;
//       if (!height || !width) {
//         return;
//       }
//       camera.aspect = width / height;
//       camera.updateProjectionMatrix();
//       renderer.setSize(width, height);
//     };
//     onResize();
//     addEventListener("resize", onResize);

//     renderer.setAnimationLoop(() => {
//       renderer.render(scene, camera);
//       controls.update();
//     });

//     return () => {
//       scene.remove(stars);
//       (stars.geometry as three.BufferGeometry).dispose();
//       renderer.dispose();
//       controls.dispose();

//       removeEventListener("resize", onResize);
//       if (
//         renderer.domElement &&
//         renderer.domElement.parentElement === containerRef.current
//       ) {
//         containerRef.current?.removeChild(renderer.domElement);
//       }
//       scene.clear();
//     };
//   }, []);

//   return <div ref={containerRef} className="h-screen w-screen"></div>;
// };

// export default Black;
