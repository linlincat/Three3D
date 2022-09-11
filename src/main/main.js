import * as THREE from 'three'   
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000)

camera.position.set(0,0,10)

scene.add(camera)

const  cubeGeomeetry  =  new THREE.BoxGeometry(1,1,1);
const  cubeMaterial  = new THREE.MeshBasicMaterial({color:0xffff00}) 

const  cube  = new THREE.Mesh(cubeGeomeetry,cubeMaterial)

cube.scale.set(1,1,1)

// cube.position.set(5, 0,0 )
scene.add(cube)

const  renderer   = new THREE.WebGL1Renderer()

renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
const axesHelper = new THREE.AxesHelper( 5 );
scene.add(axesHelper)

function render() {
  cube.position.x += 0.01;
  cube.rotation.x += 0.01;
  if (cube.position.x > 5) cube.position.x = 0;
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

render()