import * as THREE from 'three'   
// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// 导入动画库
import gsap from 'gsap'
// 导入dat.gui图形控制器
import * as dat from 'dat.gui'
import { RepeatWrapping } from 'three'
// 创建场景
const scene = new THREE.Scene()
//  创建穿透摄像机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000)
//  设置摄像机位置
camera.position.set(0,0,5)
//  将摄像机添加到场景
scene.add(camera)
// 导入纹理
const textureLoader = new THREE.TextureLoader();
// 载入颜色纹理
const texture = textureLoader.load("./textures/minecraft.png")
// 线性算法
// texture.minFilter = THREE.LinearFilter;
// texture.magFilter = THREE.LinearFilter;
// 接近算法
texture.minFilter = THREE.NearestFilter;
texture.magFilter = THREE.NearestFilter;
// 添加物体
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
// 材质
const basicMaterial = new THREE.MeshBasicMaterial({
  color: "#ffff00",
   map: texture,
});
const cube = new THREE.Mesh(cubeGeometry, basicMaterial);
scene.add(cube)

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