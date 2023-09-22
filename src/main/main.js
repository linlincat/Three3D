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

const particlesTextureLoader = new THREE.TextureLoader();
const particlesTexture = particlesTextureLoader.load(
  "./textures/particles/1.png"
);

// 设置相机位置
camera.position.set(0, 0, 10);
scene.add(camera);

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const matarial = new THREE.MeshBasicMaterial({
  wireframe: true,
});
const redMaterial = new THREE.MeshBasicMaterial({
  color: "#ff0000",
});

// 创建物体
let cubeArr = [];
for (let i = -5; i < 5; i++) {
  for (let j = -5; j < 5; j++) {
    for (let z = -5; z < 5; z++) {
      const cube = new THREE.Mesh(cubeGeometry, matarial);
      cube.position.set(i, j, z);
      scene.add(cube);
      cubeArr.push(cube);
    }
  }
}

// 创建投射光线对象
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener("mousemove", (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1; // (0-1)*2-1    -1 到 1
  mouse.y = -((event.clientY / window.innerHeight) * 2 - 1);

  // 通过摄像机和鼠标位置更新射线
  raycaster.setFromCamera(mouse, camera);
  let result = raycaster.intersectObjects(cubeArr);
  result[0].object.material = redMaterial;
});

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
