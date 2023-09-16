import * as THREE from "three";

// 材质加载进度- 纹理加载进度

// 轨道控制器（OrbitControls）
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// gsap导入动画库
import gsap from "gsap";

//1 新建场景
const scene = new THREE.Scene();

//2 创建相机  透视相机[比较真实的场景]
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// 设置相机位置
camera.position.set(0, 0, 10);
scene.add(camera);

// let event = {};
// 单张纹理图加载
// event.onLoad = function () {
//   console.log("onLoad");
// };
// event.onProgress = function () {
//   console.log("onProgress");
// };
// event.onError = function () {
//   console.log("onError");
// };

var div = document.createElement("div");
div.style.width = "200px";
div.style.height = "200px";
div.style.position = "fixed";
div.style.right = 0;
div.style.top = 0;
div.style.color = "#fff";
document.body.appendChild(div);
let event = {};
// 单张纹理图的加载
event.onLoad = function () {
  console.log("图片加载完成");
};
event.onProgress = function (url, num, total) {
  console.log("图片加载完成:", url);
  console.log("图片加载进度:", num);
  console.log("图片总数:", total);
  let value = ((num / total) * 100).toFixed(2) + "%";
  console.log("加载进度的百分比：", value);
  div.innerHTML = value;
};
event.onError = function (e) {
  console.log("图片加载出现错误");
  console.log(e);
};

// 设置加载管理器
const loadingManager = new THREE.LoadingManager(
  event.onLoad,
  event.onProgress,
  event.onError
);

//  导入纹理
// 加载texture的一个类。 内部使用ImageLoader来加载文件。
const textTureLoader = new THREE.TextureLoader(loadingManager);
const doorColorTexture = textTureLoader.load(
  "./textures/door/color.jpg"
  // event.onLoad,
  // event.onProgress,
  // event.onError
);

// 添加物体
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
// 材质
const basicMaterial = new THREE.MeshBasicMaterial({
  color: "#ffff00",
  // 颜色贴图。可以选择包括一个alpha通道
  map: doorColorTexture,
  side: THREE.DoubleSide,
});

// 添加到场景
const cube = new THREE.Mesh(cubeGeometry, basicMaterial);
scene.add(cube);

// 添加一个平面
const planeGeometry = new THREE.PlaneGeometry(1, 1);
const plane = new THREE.Mesh(planeGeometry, basicMaterial);
plane.position.set(5, 5, 5);
planeGeometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(planeGeometry.attributes.uv.array, 2)
);

scene.add(plane);
// 初始化渲染器
const renderer = new THREE.WebGL1Renderer();
// 设置渲染到尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight);

// 将webgl渲染的canvas添加到body上
document.body.appendChild(renderer.domElement);

//使用渲染器,通过相机将场景渲染进来
// renderer.render(scene, camera);

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);
// 控制器阻尼,让控制器更加真实
controls.enableDamping = true;

// 添加坐标轴辅助器
// 红色代表 X 轴. 绿色代表 Y 轴. 蓝色代表 Z 轴.
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

window.addEventListener("dblclick", () => {
  if (animate1.isActive()) {
    animate1.pause();
  } else {
    animate1.resume();
  }
});

function render() {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

render();
