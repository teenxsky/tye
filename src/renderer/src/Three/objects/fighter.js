import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'

function fighter() {
    const gltfLoader = new GLTFLoader()
    const url =
        'resources/models/cartoon_lowpoly_small_city_free_pack/scene.gltf'
    gltfLoader.load(url, (gltf) => {
        const root = gltf.scene
        scene.add(root)
    })
}

export { fighter }
