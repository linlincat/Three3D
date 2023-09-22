import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap";
import * as dat from "dat.gui";

const gui = new dat.GUI();
// 1、创建场景
const scene = new THREE.Scene();

// 2、创建相机
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
// 设置相机位置
camera.position.set(0, 0, 10);
scene.add(camera);

// 创建球到几何体\
const sphereGeometry = new THREE.SphereGeometry(3, 20, 20);
// const material = new THREE.MeshBasicMaterial({
//   color: 0xff0000,
//   wireframe: true,
// });
// const textureLoader = new THREE.TextureLoader();
// const texture = textureLoader.load("./textures/particles/1.png");
// 载入纹理
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load("./textures/particles/1.png");
texture.colorSpace = THREE.SRGBColorSpace;
const pointMaterial = new THREE.PointsMaterial({
  map: texture,
  size: 0.1,
  color: 0xffff00,
  transparent: true,
});
// pointMaterial.sizeAttenuation = true;

// const mesh = new THREE.Mesh(sphereGeometry, material);
const points = new THREE.Points(sphereGeometry, pointMaterial);

scene.add(points);

// // 初始化渲染器
const renderer = new THREE.WebGLRenderer();
// 设置渲染的尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight);
// 将webgl渲染的canvas内容添加到body
document.body.appendChild(renderer.domElement);

// // 使用渲染器，通过相机将场景渲染进来
// renderer.render(scene, camera);

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);
// 设置控制器阻尼，让控制器更有真实效果,必须在动画循环里调用.update()。
controls.enableDamping = true;

// 添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper(10);
scene.add(axesHelper);

const clock = new THREE.Clock();

function render() {
  controls.update();
  renderer.render(scene, camera);
  //   渲染下一帧的时候就会调用render函数
  requestAnimationFrame(render);
}

render();

// 监听画面变化，更新渲染画面
window.addEventListener("resize", () => {
  //   console.log("画面变化了");
  // 更新摄像头
  camera.aspect = window.innerWidth / window.innerHeight;
  //   更新摄像机的投影矩阵
  camera.updateProjectionMatrix();

  //   更新渲染器
  renderer.setSize(window.innerWidth, window.innerHeight);
  //   设置渲染器的像素比
  renderer.setPixelRatio(window.devicePixelRatio);
});
