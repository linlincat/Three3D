import * as THREE from 'three'   
import { Clock } from 'three'
 // 轨道控制器
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls' 
// 动画库
import gsap from 'gsap'
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

// Clock  跟踪时间
const clock = new THREE.Clock();

function render() {
  // 获取时钟总时间
  let time = clock.getElapsedTime();
  let t = time  % 5;
  cube.position.x = t * 1;
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

render()