import {
  ContactShadows,
  Environment,
  Html,
  Loader,
  OrbitControls,
  PresentationControls,
  useAnimations,
  useGLTF,
} from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { Mesh } from 'three'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import './style.scss'
import { animated, config, useSpring } from '@react-spring/three'

export const ThreeFiberPage = () => {
  return (
    <>
      <Suspense fallback={null}>
        <ThreeFiberPageInner />
      </Suspense>
      <Loader />
    </>
  )
}

export const ThreeFiberPageInner = () => {
  return (
    <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 4], fov: 50 }} style={{ backgroundColor: '#2d4967' }}>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} shadow-mapSize={[512, 512]} castShadow />

      {/* <ambientLight intensity={10} />
      <spotLight position={[10, 10, 150]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} /> */}
      {/* {[-1, 0, 1].map((i) => [-1, 0, 1].map((j) => [-1, 0, 1].map((k) => <Box position={[i, j, k]} />))).flat()} */}
      {/* <Model /> */}
      <PresentationControls
        global
        config={{ mass: 2, tension: 500 }}
        // snap={{ mass: 4, tension: 1500 }}
        rotation={[0, 0.3, 0]}
        polar={[-Math.PI / 3, Math.PI / 3]}
        azimuth={[-Math.PI / 1.4, Math.PI / 2]}
      >
        {/* <Watch rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.25, 0]} scale={0.003} /> */}
        {/* <Watch2 rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.25, 0]} scale={0.003} /> */}
        <AllModel2 scale={0.1} />
        {/* <Scene scale={0.1} /> */}
      </PresentationControls>
      {/* <OrbitControls /> */}
      <ContactShadows
        rotation-x={Math.PI / 2}
        position={[0, -1.4, 0]}
        opacity={0.75}
        width={10}
        height={10}
        blur={2.6}
        far={2}
      />

      <Environment preset="sunset" />
    </Canvas>
  )
}

function Box(props: JSX.IntrinsicElements['mesh']) {
  const ref = useRef<Mesh>(null!)

  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)

  // useFrame((state, delta) => (ref.current.rotation.x += 0.01))
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      // onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}
    >
      <boxGeometry args={[0.9, 0.9, 0.9]} />
      <meshMatcapMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

const AllModel = (props: JSX.IntrinsicElements['group']) => {
  const gltf = useGLTF('/model.glb') as any
  const { actions, names, ref } = useAnimations(gltf.animations)
  console.log(actions, names, ref)
  return (
    <group {...props} dispose={null}>
      <primitive object={gltf.scene} />
    </group>
  )
}

const AllModel2 = (props: JSX.IntrinsicElements['group']) => {
  const { scene, animations } = useGLTF('/model2.glb')
  const { actions, names, ref } = useAnimations(animations) as any
  useFrame(({ clock }) => {
    // ref.current!.rotation.y = Math.sin(clock.getElapsedTime())
  })
  const [active, setActive] = useState(true)
  const { scale } = useSpring({
    scale: active ? 0.6 : 1,
    config: config.wobbly,
  })

  const [activeIndex, setActiveIndex] = useState(0)
  useEffect(() => {
    console.log(actions, 'actions', animations, names)
    if (actions) {
      actions[names[activeIndex]].reset().fadeIn(0.5).play()
    }
    return () => actions[names[activeIndex]].fadeOut(0.5)
  }, [actions, names, activeIndex])

  const handleChangeAnmition = useCallback(() => {
    if (activeIndex < names.length - 1) {
      setActiveIndex(activeIndex + 1)
    } else {
      setActiveIndex(0)
    }
  }, [activeIndex])

  return (
    <animated.group
      ref={ref}
      {...props}
      dispose={null}
      // scale={scale}
      // onPointerOver={() => setActive(!active)}
      onClick={handleChangeAnmition}
    >
      <primitive object={scene} />
    </animated.group>
  )
}

function Watch(props: any) {
  const ref = useRef<JSX.IntrinsicElements['group']>(null!)
  const { nodes, materials } = useGLTF('/watch.glb') as any
  // useFrame((state) => {
  //   const t = state.clock.getElapsedTime()
  //   ref.current.rotation.x = -Math.PI / 1.75 + Math.cos(t / 4) / 8
  //   ref.current.rotation.y = Math.sin(t / 4) / 8
  //   ref.current.rotation.z = (1 + Math.sin(t / 1.5)) / 20
  //   ref.current.position.y = (1 + Math.sin(t / 1.5)) / 10
  // })
  return (
    <group ref={ref} {...props} dispose={null}>
      <mesh geometry={nodes.Object005_glass_0.geometry} material={materials.glass}>
        <Html scale={100} rotation={[Math.PI / 2, 0, 0]} position={[180, -350, 50]} transform occlude>
          <div className="watch-annotation">
            6.550 $ <span style={{ fontSize: '1.5em' }}>🥲</span>
          </div>
        </Html>
      </mesh>
      <mesh castShadow receiveShadow geometry={nodes.Object006_watch_0.geometry} material={materials.watch} />
    </group>
  )
}

function Watch2(props: any) {
  const gltf = useLoader(GLTFLoader, '/watch.glb')
  return (
    <group {...props} dispose={null}>
      <Suspense fallback={null}>
        <primitive object={gltf.scene} />
      </Suspense>
    </group>
  )
}

function Scene(props: JSX.IntrinsicElements['group']) {
  const gltf = useLoader(GLTFLoader, '/watch.glb')
  return (
    <group {...props} dispose={null}>
      <Suspense fallback={null}>
        <primitive object={gltf.scene} />
      </Suspense>
    </group>
  )
}
