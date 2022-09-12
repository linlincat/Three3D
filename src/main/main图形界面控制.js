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
//  创建图形
const  cubeGeomeetry  =  new THREE.BoxGeometry(1,1,1);
//  创建材质
const  cubeMaterial  = new THREE.MeshBasicMaterial({color:0xffff00}) 
//  融合到网格中国呢
const  cube  = new THREE.Mesh(cubeGeomeetry,cubeMaterial)
//  将网格添加到场景中
scene.add(cube)
const gui = new dat.GUI();
gui.add(cube.position, 'x').min(0).max(5).step(0.01).name("移动X轴").onChange((value) => {
  // console.log(value)
}).onFinishChange((value) => {
  // console.log(value)
})
const params = {
  color: "#ffff00",
  fn: () => {
    // 设置gsap动画
    gsap.to(cube.position, {x: 5,  rotation: 360, duration: 2,yoyo: true,  ease: "power2.out", repeat: -1});
  }
}
gui.addColor(params, "color").onChange((value) => {
  cube.material.color.set(value)
})
gui.add(cube, "visible").name("是否显示")

var floder = gui.addFolder('设置立方体')
floder.add(cube.material, 'wireframe').name('设置线框')
floder.add(params, 'fn').name("触发运动")
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

// 双击全屏/关闭全屏
window.addEventListener('dblclick', () => {
  const fullscreenElement = document.fullscreenElement;
  if (!fullscreenElement) {
    renderer.domElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
})
//  将场景与摄像机渲染出来
function render() {
  // yoyo gsap动画要求在循环渲染中更新
  controls.update();
  renderer.render(scene, camera)
  requestAnimationFrame(render)
}
render()