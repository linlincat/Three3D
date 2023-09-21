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

const geometry = new THREE.BufferGeometry();
// 创建一个简单的矩形. 在这里我们左上和右下顶点被复制了两次。
// 因为在两个三角面片里，这两个顶点都需要被用到。
const arr = sphereGeometry.attributes.position.array;
const vertices = new Float32Array(arr);

// itemSize = 3 因为每个顶点都是一个三元组。
geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
// const material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
// const mesh = new THREE.Mesh( geometry, material );
// const material = new THREE.MeshBasicMaterial({
//   color: 0xff0000,
//   // wireframe: true,
// });

// PointsMaterial 高版本不是针对单个订单做纹理渲染而是对整个形状对象渲染,
// 用缓存图形来实现,由于缓存图形是由多个点组成不再是一个整体对象,所以可以单独对点对象做处理.
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load("./textures/particles/2.png");
const pointMaterial = new THREE.PointsMaterial({
  map: texture,
  alphaHash: texture,
  depthWrite: false,
  blending: THREE.AdditiveBlending,
  transparent: true,
  size: 0.1,
  color: 0xffff00,
});
console.log(sphereGeometry);
// pointMaterial.sizeAttenuation = true;

// const mesh = new THREE.Mesh(sphereGeometry, pointMaterial);
const points = new THREE.Points(geometry, pointMaterial);

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
