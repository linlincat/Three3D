import * as THREE from 'three'   
// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// 导入动画库
import gsap from 'gsap'
// 导入dat.gui图形控制器
import * as dat from 'dat.gui'
// 创建场景
const scene = new THREE.Scene()
//  创建穿透摄像机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000)
//  设置摄像机位置
camera.position.set(0,0,10)
//  将摄像机添加到场景
scene.add(camera)
// 创建50个图形
for(let i = 0; i< 50; i++) {
  const geometry = new THREE.BufferGeometry()
  const positionArray = new Float32Array(9);
  for(let j=0; j<9;j++) {
    positionArray[j] = Math.random() * 5
  }
  geometry.setAttribute("position", new THREE.BufferAttribute(positionArray, 3));
  let color = new THREE.Color(Math.random(), Math.random(), Math.random());
  console.log(color)
  const material = new THREE.MeshBasicMaterial( { color: color, transparent: true, opacity: 0.5 } );
  const mesh = new THREE.Mesh( geometry, material );
  console.log(mesh)
  scene.add(mesh)
}
// //  创建图形
// const geometry = new THREE.BufferGeometry();
// 创建一个简单的矩形. 在这里我们左上和右下顶点被复制了两次。
// 因为在两个三角面片里，这两个顶点都需要被用到。
// const vertices = new Float32Array( [
// 	-1.0, -1.0,  1.0,
// 	 1.0, -1.0,  1.0,
// 	 1.0,  1.0,  1.0,
// 	 1.0,  1.0,  1.0,
// 	-1.0,  1.0,  1.0,
// 	-1.0, -1.0,  1.0
// ] );
// // itemSize = 3 因为每个顶点都是一个三元组。vertices 顶点
// geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
// const material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
// const mesh = new THREE.Mesh( geometry, material );

//  创建渲染器
const  renderer   = new THREE.WebGL1Renderer()
//  设置渲染器舞台大小
renderer.setSize(window.innerWidth, window.innerHeight)
//  添加渲染元素到页面中
document.body.appendChild(renderer.domElement)
// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement)
// 设置控制器阻尼,让控制器更有真实感
controls.enableDamping = true
// 添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper)
//  将场景与摄像机渲染出来

window.addEventListener('dblclick', () => {
  const fullscreenElement = document.fullscreenElement;
  if (!fullscreenElement) {
    renderer.domElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
})

function render() {
  // yoyo gsap动画要求在循环渲染中更新
  controls.update();
  renderer.render(scene, camera)
  requestAnimationFrame(render)
}
render()