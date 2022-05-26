import { ScrollArea } from '@mantine/core'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

export const IndexPage = () => {
  const domRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene>()
  useEffect(() => {
    if (sceneRef.current) return

    const scene = new THREE.Scene()
    sceneRef.current = scene

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    domRef.current!.appendChild(renderer.domElement)

    // const geometry = new THREE.BoxGeometry()
    // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    // const cube = new THREE.Mesh(geometry, material)
    // scene.add(cube)

    // scene.background = new THREE.Color(0xa0a0a0)
    // scene.fog = new THREE.Fog(0xa0a0a0, 10, 50)

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444)
    hemiLight.position.set(0, 20, 0)
    scene.add(hemiLight)

    {
      const dirLight = new THREE.DirectionalLight(0xffffff)
      dirLight.position.set(3, 10, 10)
      dirLight.castShadow = true
      dirLight.shadow.camera.top = 2
      dirLight.shadow.camera.bottom = -2
      dirLight.shadow.camera.left = -2
      dirLight.shadow.camera.right = 2
      dirLight.shadow.camera.near = 0.1
      dirLight.shadow.camera.far = 40
      scene.add(dirLight)
    }
    {
      const dirLight = new THREE.DirectionalLight(0xffffff)
      dirLight.position.set(-3, -10, -2)
      dirLight.castShadow = true
      dirLight.shadow.camera.top = 2
      dirLight.shadow.camera.bottom = -2
      dirLight.shadow.camera.left = -2
      dirLight.shadow.camera.right = 2
      dirLight.shadow.camera.near = 0.1
      dirLight.shadow.camera.far = 40
      scene.add(dirLight)
    }
    {
      const dirLight = new THREE.PointLight(0xffffff)
      dirLight.position.set(2, 5, 20)
      dirLight.castShadow = true
      // dirLight.shadow.camera.top = 2
      // dirLight.shadow.camera.bottom = -2
      // dirLight.shadow.camera.left = -2
      // dirLight.shadow.camera.right = 2
      dirLight.shadow.camera.near = 0.1
      dirLight.shadow.camera.far = 40
      scene.add(dirLight)
    }

    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(100, 100),
      new THREE.MeshPhongMaterial({ color: 0x999999, depthWrite: false })
    )
    mesh.rotation.x = -Math.PI / 2
    mesh.receiveShadow = true
    scene.add(mesh)

    const loader = new GLTFLoader()
    loader.load(
      // '/Xbot.glb',
      '/model2.glb',
      function (gltf) {
        console.log('add')

        const model = gltf.scene
        scene.add(model)

        model.traverse(function (object) {
          if (object instanceof THREE.Mesh) {
            console.log(object)
            object.material.side = THREE.DoubleSide
            object.castShadow = true
            object.receiveShadow = true
          }
        })

        // const skeleton = new THREE.SkeletonHelper(model)
        // skeleton.visible = false
        // scene.add(skeleton)

        camera.position.z = 50

        // camera.position.set(-1, 2, 3)

        function animate() {
          requestAnimationFrame(animate)

          // model.rotation.x += 0.01
          // model.rotation.y += 0.003

          model.traverse(function (object) {
            if (object instanceof THREE.Mesh) {
              if (object.name.includes('soft_light_')) {
                object.rotation.z += 0.01
              }
            }
          })

          renderer.render(scene, camera)
        }

        animate()
      },
      undefined,
      function (error) {
        console.error(error)
      }
    )
  }, [])

  return <div ref={domRef}></div>
  // return (
  //   <ScrollArea p="lg">
  //     <div>test page</div>
  //   </ScrollArea>
  // )
}
