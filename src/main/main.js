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
document.body.appendChild(renderer.domElement)  //canvas

const controls = new OrbitControls(camera, renderer.domElement)
// 设置阻尼让控制器更真实
controls.enableDamping = true;
const axesHelper = new THREE.AxesHelper( 5 );
scene.add(axesHelper)

gsap.to(cube.position, {x: 5, duration: 5, ease: "power1.inOut", yoyo: true, repeat: -1})
gsap.to(cube.rotation, {x: 2 * Math.PI, duration: 5, ease: "power.inOut"})
function render() {
controls.update();
// repeat yoyo 添加动画后必须要对循环渲染进行更新
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

render()

// 监听页面变化
window.addEventListener("resize", function () {
  // 更新摄像头 宽高比
  camera.aspect = window.innerWidth / window.innerHeight;
  // 更新摄像机投影矩阵
  camera.updateProjectionMatrix();
  // 更新渲染器
  renderer.setSize(window.innerWidth, window.innerHeight);
  // 设置渲染器的像素比
  renderer.setPixelRatio(window.devicePixelRatio)
});