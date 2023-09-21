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
  25
);
// 设置相机位置
camera.position.set(0, 0, 40);
scene.add(camera);

function createPoints(url, size = 0.5) {
  const particIesGeometry = new THREE.BufferGeometry();
  const count = 5000;

  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 100;
    colors[i] = Math.random();
  }
  particIesGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3)
  );
  particIesGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  // PointsMaterial 高版本不是针对单个订单做纹理渲染而是对整个形状对象渲染,
  // 用缓存图形来实现,由于缓存图形是由多个点组成不再是一个整体对象,所以可以单独对点对象做处理.
  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load(`./textures/particles/${url}.png`);
  const pointMaterial = new THREE.PointsMaterial({
    map: texture,
    // alphaHash: texture,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true,
    transparent: true,
    size: `${size}`,
    color: 0xffff00,
  });
  // pointMaterial.vertexColors= true;

  // const mesh = new THREE.Mesh(sphereGeometry, pointMaterial);
  const points = new THREE.Points(particIesGeometry, pointMaterial);

  scene.add(points);
  return points;
}

const points = createPoints("1");
const points2 = createPoints("xh", 1);

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
  let time = clock.getElapsedTime();
  points.rotation.x = time * 0.3;
  points2.rotation.x = time * 0.4;
  points2.rotation.y = time * 0.5;
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
