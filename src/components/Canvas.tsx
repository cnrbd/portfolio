import React, { useEffect, useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import {
  BlendFunction,
  EffectComposer as FXC,
  EffectPass,
  RenderPass,
  NoiseEffect,
  VignetteEffect,
  BloomEffect,
  PixelationEffect,
} from "postprocessing";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import gsap from "gsap";
import * as THREE from "three";
import { useTexture } from "@react-three/drei";
import { Environment } from "@react-three/drei";
// import { Stats } from "@react-three/drei";

type BackgroundProps = {
  backgroundNumber: number;
  current: string;
};

function usePrevious(value: any) {
  console.log("prev ran");
  const ref = useRef();
  useEffect(() => {
    ref.current = value; // Store current value in ref
  }, [value]); // Update ref when the value changes
  return ref.current; // Return the previous value
}

export const Background: React.FC<BackgroundProps> = React.memo(
  ({ backgroundNumber, current }) => {
    const prevBGN = usePrevious(backgroundNumber);

    // Preload model
    const cyberpunkApartment = useLoader(GLTFLoader, "/models/apt/scene.gltf");
    const futureGadgetLab = useLoader(GLTFLoader, "/models/lab/scene.gltf"); // Unoptimized model for background 3
    const kitchen = useLoader(GLTFLoader, "/models/kitchen/scene.gltf");

    // BG1
    const Blank = () => {
      const { camera } = useThree();
      if (backgroundNumber == 0) {
        useEffect(() => {
          gsap.globalTimeline.clear();
          const cameraTarget = new THREE.Vector3(0, 0, 0);
          camera.position.set(0, 1, 0);
          camera.lookAt(cameraTarget);
        }, []);
      }

      return (
        <mesh
          geometry={new THREE.BoxGeometry(0.00001, 0.00001, 0.00001)}
          material={new THREE.MeshBasicMaterial({ wireframe: true })}
          position={new THREE.Vector3(0, 0, 0)}
          visible={backgroundNumber == 0}
        />
      );
    };

    const Apartment = () => {
      const { scene, camera, gl } = useThree();

      const wallTexture = useTexture({
        normalMap: "/models/apt/textures/Wall_paint_normal.png",
        metalnessMap: "/models/apt/textures/Wall_paint_metallicRoughness.png",
        roughnessMap: "/models/apt/textures/Wall_paint_metallicRoughness.png",
      });

      useEffect(() => {
        cyberpunkApartment.scene.traverse((object) => {
          if (object instanceof THREE.Mesh) {
            // object.material.normalMap = wallTexture.normalMap;
            object.material.metalnessMap = wallTexture.metalnessMap;
            object.material.roughnessMap = wallTexture.roughnessMap;
          }
        });
      }, []);

      if (backgroundNumber == 1) {
        useEffect(() => {
          gsap.globalTimeline.clear();
          const cameraTarget = new THREE.Vector3(0, 0, 0);
          camera.position.set(0.09, 0.04, -0.11);
          camera.lookAt(cameraTarget);
        }, []);
      }

      let mixer: THREE.AnimationMixer;
      if (cyberpunkApartment.animations.length) {
        mixer = new THREE.AnimationMixer(cyberpunkApartment.scene);
        cyberpunkApartment.animations.forEach((clip) => {
          const action = mixer.clipAction(clip);
          action.play();
        });
      }

      useFrame((_state, delta) => {
        mixer?.update(delta);
      });

      cyberpunkApartment.scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          child.material.side = THREE.FrontSide;
        }
      });

      const apartmentLighting = useMemo(() => {
        if (backgroundNumber == 1) {
          return (
            <>
              <ambientLight intensity={1} color={"#f5ebff"} />
              <directionalLight
                position={[1.4, 0.05, 0.2]}
                intensity={4}
                color={"#f5ebff"}
                castShadow={true}
              />
            </>
          );
        } else return null;
      }, [backgroundNumber]);

      const backgroundEnvironment = useMemo(() => {
        if (backgroundNumber == 1) {
          return (
            <Suspense>
              <Environment
                preset="city"
                background
                environmentIntensity={0.4}
              />
            </Suspense>
          );
        }
      }, []);

      const PostProcessingEffects = () => {
        if (backgroundNumber == 1) {
          const composer = useMemo(() => {
            const composer = new FXC(gl, {
              multisampling: 0,
            });

            // Postprocessing Effects
            const bloomEffect = new BloomEffect({
              luminanceThreshold: 0.01,
              luminanceSmoothing: 0.5,
              intensity: 1,
            });

            const vignetteEffect = new VignetteEffect({
              offset: 0.15,
              darkness: 0.83,
              eskil: false,
              blendFunction: BlendFunction.NORMAL,
            });

            const noiseEffect = new NoiseEffect({
              premultiply: true,
              blendFunction: BlendFunction.NORMAL,
            });

            // Glitch effect
            // const glitchEffect = new GlitchEffect({
            //     delay: new THREE.Vector2(0.5, 1.25),
            //     duration: new THREE.Vector2(0.1, 0.3),
            //     strength: new THREE.Vector2(0.1, 0.2),
            //     blendFunction: BlendFunction.SUBTRACT,
            //     ratio: 0.8,
            //     dtSize: 8,
            //     columns: 0.01
            // });

            const pixelationEffect = new PixelationEffect(2);

            // Instantiate EffectPass
            const effectPass = new EffectPass(
              camera,
              noiseEffect,
              vignetteEffect,
              bloomEffect,
              pixelationEffect
            );
            effectPass.renderToScreen = true;

            // Add passes
            composer.addPass(new RenderPass(scene, camera));
            composer.addPass(effectPass);

            return composer;
          }, []);

          useEffect(() => {
            return () => {
              composer.dispose();
            };
          }, [composer]);
          useFrame((_state, delta) => {
            composer.render(delta);
          }, 1);
        }
        return null;
      };

      return (
        <Suspense fallback={<span>Loading scene...</span>}>
          {backgroundEnvironment}
          {apartmentLighting}
          <primitive
            object={cyberpunkApartment.scene}
            visible={backgroundNumber == 1}
          />
          {<PostProcessingEffects />}
        </Suspense>
      );
    };

    // BG3
    const Kitchen = () => {
      const { scene, camera, gl } = useThree();
      let cameraTarget = new THREE.Vector3(0.345, 1.8, -10);
      const cameraLocations: { [key: string]: THREE.Vector3[] } = {
        Home: [new THREE.Vector3(-5, 20, 5), new THREE.Vector3(0, 0, 0)],
        About: [
          new THREE.Vector3(0.05, 1.8, -0.5),
          new THREE.Vector3(1, 1.8, -10),
        ],
      };

      const spotlightRef = useRef<THREE.SpotLight>(null);
      const spotlightTargetRef = useRef(new THREE.Object3D());

      if (backgroundNumber == 2) {
        useEffect(() => {
          if (spotlightRef.current) {
            spotlightRef.current.target = spotlightTargetRef.current;
          }

          if (prevBGN != 2) {
            cameraTarget = cameraLocations[current][1];
            camera.position.copy(cameraLocations[current][0]);
            camera.lookAt(cameraTarget);
          }

          try {
            const newCameraTarget = cameraLocations[current][1];

            gsap.to(cameraTarget, {
              x: newCameraTarget.x,
              y: newCameraTarget.y,
              z: newCameraTarget.z,
              duration: 0.65,
              onUpdate() {
                camera.lookAt(cameraTarget);
              },
            });

            gsap.to(camera.position, {
              x: cameraLocations[current][0].x,
              y: cameraLocations[current][0].y,
              z: cameraLocations[current][0].z,
              duration: 0.65,
            });
          } catch (error) {
            gsap.killTweensOf(camera.position);
            gsap.killTweensOf(cameraTarget);
            cameraTarget = cameraLocations["Home"][1];
            camera.position.copy(cameraLocations["Home"][0]);
            camera.lookAt(cameraTarget);
          }
        }, []);
      }

      const labLighting = useMemo(() => {
        if (backgroundNumber == 2) {
          return (
            <>
              <ambientLight intensity={0.2} color={"#B6FFEC"} />
              <directionalLight
                position={[5, 10, 5]}
                intensity={0.7}
                color={"#B6FFEC"}
              />
              <pointLight
                position={[0.3, 1.4, 0.4]}
                intensity={3}
                distance={3.5}
                decay={1}
                color={"#fcf6b3"}
              />
              <spotLight
                ref={spotlightRef}
                position={[0.3, 1.4, 0.4]}
                intensity={5}
                distance={5}
                castShadow={true}
                angle={Math.PI / 3}
                penumbra={1}
                decay={0.01}
                color={"#fcf6b3"}
              />
            </>
          );
        } else return null;
      }, []);

      const PostProcessingEffects = () => {
        if (backgroundNumber == 2) {
          const composer = useMemo(() => {
            const composer = new FXC(gl, {
              multisampling: 0,
            });

            // Postprocessing Effects
            const bloomEffect = new BloomEffect({
              luminanceThreshold: 0.05,
              luminanceSmoothing: 0.5,
              intensity: 3.5,
            });
            const vignetteEffect = new VignetteEffect({
              offset: 0.15,
              darkness: 0.83,
              eskil: false,
              blendFunction: BlendFunction.NORMAL,
            });
            const noiseEffect = new NoiseEffect({
              premultiply: true,
              blendFunction: BlendFunction.ADD,
            });

            // Instantiate EffectPass
            const effectPass = new EffectPass(
              camera,
              noiseEffect,
              vignetteEffect,
              bloomEffect
            );
            effectPass.renderToScreen = true;

            // Add passes
            composer.addPass(new RenderPass(scene, camera));
            composer.addPass(effectPass);

            return composer;
          }, []);

          useEffect(() => {
            return () => {
              composer.dispose();
            };
          }, [composer]);
          useFrame((_state, delta) => {
            composer.render(delta);
          }, 1);
        }
        return null;
      };

      return (
        <>
          <Suspense fallback={<span>Loading scene...</span>}>
            {labLighting}
            <primitive
              object={spotlightTargetRef.current}
              position={[0.5, -5, 6]}
              visible={backgroundNumber == 2}
            />
            <primitive object={kitchen.scene} visible={backgroundNumber == 2} />
            <PostProcessingEffects />
          </Suspense>
        </>
      );
    };

    return (
      <div className="flex page-padding w-full h-full absolute -z-50">
        <Canvas camera={{ fov: 85, near: 0.001, far: 20, position: [0, 1, 0] }}>
          <Blank />
          <Apartment />
          <Kitchen />
          {/* <Stats /> */}
        </Canvas>
      </div>
    );
  },
  (prev, next) => {
    return (
      prev.backgroundNumber == next.backgroundNumber &&
      next.backgroundNumber == 1
    );
  }
);
