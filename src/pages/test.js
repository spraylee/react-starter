{
  a(void 0, void 0, void 0, function () {
    var e, THREE, a, i, o, s, v, _, E, y, g
    return r(this, function (r) {
      switch (r.label) {
        case 0:
          return [
            4,
            Promise.all([
              $(() => import('./three.module.1d0a2815.js'), void 0),
              $(
                () => import('./index.08cd9453.js'),
                [
                  'https://cloudcache.tencent-cloud.com/qcloud/portal/home/assets/index.08cd9453.js',
                  'https://cloudcache.tencent-cloud.com/qcloud/portal/home/assets/three.module.1d0a2815.js',
                ]
              ),
            ]),
          ]
        case 1:
          return (
            (e = t.apply(void 0, [r.sent(), 2])),
            (THREE = e[0]),
            (a = e[1]),
            (i = a.RGBELoader),
            (o = a.GLTFLoader),
            l.current
              ? ((s = new o()),
                (v = new THREE.WebGLRenderer({
                  antialias: !0,
                  alpha: !0,
                  canvas: l.current,
                })).setPixelRatio(window.devicePixelRatio),
                v.setSize(626, 534),
                (v.outputEncoding = THREE.sRGBEncoding),
                v.setClearColor(16777215, 0),
                (_ = new THREE.PerspectiveCamera(40, 626 / 534, 1, 1e3)).position.set(0, 0, 47),
                _.lookAt(0, 0, -10),
                (E = new THREE.Scene()).add(_),
                (f.current = E),
                (h.current = new THREE.Clock()),
                (y = function (e, t) {
                  return new Promise(function (a) {
                    new i().setDataType(THREE.UnsignedByteType).load(e, function (e) {
                      var t = r.fromEquirectangular(e)
                      r.dispose(), e.dispose(), a(t.texture)
                    })
                    var r = new THREE.PMREMGenerator(t)
                    r.compileEquirectangularShader()
                  })
                }),
                (g = function (e, t, a) {
                  ;(null == e ? void 0 : e.url) &&
                    !u.current[t] &&
                    s.load(e.url, function (gltf) {
                      var i
                      if (!u.current[t]) {
                        u.current[t] = !0
                        var l = c(c({}, e), {
                            children: [],
                          }),
                          scene = gltf.scene,
                          meshes = e.meshes
                        scene.traverse(function (meshItem) {
                          if (meshItem.isMesh) {
                            if ((meshItem.layers.set(t + 1), meshItem.name.indexOf('glass') > -1)) {
                              var group = new THREE.Group(),
                                clonedMeshItem = meshItem.clone(),
                                i = meshes[meshItem.name]
                              ;(clonedMeshItem.material = new THREE.MeshPhysicalMaterial(c({}, i.frontMaterial))),
                                clonedMeshItem.material.color.convertSRGBToLinear(),
                                (clonedMeshItem.originalOpacity = meshItem.material.opacity),
                                group.add(clonedMeshItem),
                                l.children.push(group)
                            }
                            if (meshItem.name.indexOf('soft') > -1) {
                              var standardMaterial = new THREE.MeshStandardMaterial(c({}, meshes[meshItem.name]))
                              ;(meshItem.material = standardMaterial),
                                meshItem.material.color.convertSRGBToLinear(),
                                meshItem.material.emissive.convertSRGBToLinear(),
                                (meshItem.originalOpacity = meshItem.material.opacity),
                                l.children.push(meshItem)
                            } else
                              meshItem.name.indexOf('glass') < 0 &&
                                ((meshItem.originalOpacity = meshItem.material.opacity),
                                meshItem.material.color.convertSRGBToLinear(),
                                (meshItem.material.envMapIntensity = 1),
                                l.children.push(meshItem))
                          }
                        })
                        var group = new THREE.Group()
                        ;(group.name = 'rotate_group'),
                          null === (i = f.current) || void 0 === i || i.add(group),
                          l.children.forEach(function (e) {
                            group.add(e)
                          }),
                          gltf.animations.length > 0 &&
                            ((l.animations = gltf.animations),
                            (l.mixer = new THREE.AnimationMixer(f.current)),
                            l.animations.forEach(function (e) {
                              e && l.mixer.clipAction(e).play()
                            })),
                          (m.current[t] = l),
                          t === d.current && p.current && (_.layers.disableAll(), _.layers.enable(t + 1)),
                          null == a || a()
                      }
                    })
                }),
                x({
                  THREE: THREE,
                  camera: _,
                  renderer: v,
                  hdrLoader: y,
                  modelLoader: g,
                }),
                [2])
              : [2]
          )
      }
    })
  })
}

const meshes = {
  soft_dark008: {
    roughness: 0.21,
    metalness: 1,
    color: 7381759,
    emissive: '#315cdd',
    opacity: 1,
    transparent: true,
  },
  soft_mid1007: {
    roughness: 0.2,
    metalness: 1,
    color: 9279914,
    emissive: '#7d8cba',
    opacity: 0.99,
    transparent: true,
  },
  glass_light004: {
    frontMaterial: {
      side: 0,
      transparent: true,
      roughness: 0.01,
      metalness: 0.01,
      transmission: 0.97,
      reflectivity: 1,
      envMapIntensity: 2,
      color: '#98a0e1',
    },
    backMaterial: {
      side: 1,
      transparent: true,
      roughness: 0.01,
      metalness: 0.01,
      transmission: 0.71,
      reflectivity: 1,
      envMapIntensity: 2,
      color: '#98a0e1',
    },
  },
  glass_mid1007: {
    frontMaterial: {
      side: 0,
      transparent: true,
      roughness: 0.1,
      metalness: 0.2,
      transmission: 0.97,
      reflectivity: 1,
      envMapIntensity: 2,
      color: '#d6dcfa',
    },
    backMaterial: {
      side: 1,
      transparent: true,
      roughness: 0.01,
      metalness: 0.01,
      transmission: 0.71,
      reflectivity: 1,
      envMapIntensity: 2,
      color: '#d6dcfa',
    },
  },
  soft_light009: {
    roughness: 0.2,
    metalness: 1,
    color: 12897753,
    emissive: '#7b83a3',
    opacity: 1,
    transparent: true,
  },
  soft_mid1_1002: {
    roughness: 0.2,
    metalness: 1,
    color: 9279914,
    emissive: '#7d8cba',
    opacity: 0.99,
    transparent: true,
  },
  soft_mid5007: {
    roughness: 0.2,
    metalness: 1,
    color: 9279914,
    emissive: '#7d8cba',
    opacity: 0.99,
    transparent: true,
  },
  soft_mid6007: {
    roughness: 0.2,
    metalness: 1,
    color: 9279914,
    emissive: '#7d88ba',
    opacity: 0.99,
    transparent: true,
  },
  soft_mid2007: {
    roughness: 0.2,
    metalness: 1,
    color: 12966391,
    emissive: '#7d8cba',
    opacity: 0.85,
    transparent: true,
  },
}
