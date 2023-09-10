import * as THREE from "three";

// 适应屏幕宽度

// attributes: normal:朝向如光线照射,折射的角度等    position:物体的位置   uv:颜色渲染的位置

// 轨道控制器（OrbitControls）
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// gsap导入动画库
import gsap from "gsap";

//1 新建场景
const scene = new THREE.Scene();

//2 创建相机  透视相机[比较真实的场景]
// PerspectiveCamera( fov : Number, aspect : Number, near : Number, far : Number )
// fov — 摄像机视锥体垂直视野角度
// aspect — 摄像机视锥体长宽比
// near — 摄像机视锥体近端面
// far — 摄像机视锥体远端面
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// 设置相机位置
camera.position.set(0, 0, 10);
scene.add(camera);

// 添加物体
// 创建几何体
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
// 材质
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
//根据几何体与材质创建物体
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

// 修改物体的位置
// cube.position.x(5)
// cube.position.set(5, 0, 0);
// 缩放
// cube.scale.x(5)
// cube.scale.set(1, 2, 3);
// 旋转
// cube.rotation.set(Math.PI / 4, 0, 0, "XYZ");

// 将几何体添加到场景中
scene.add(cube);

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

// 设置动画  会返回一个动画对象 [tween 在……之间]
var animate1 = gsap.to(cube.position, {
  x: 5,
  duration: 5,
  ease: "power1.inOut",
  repeat: -1,
  yoyo: true,
  onComplete: () => {
    console.log("game over");
  },
  onStart: () => {
    console.log("animate start");
  },
});
gsap.to(cube.rotation, { x: Math.PI * 2, duration: 5 });

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

// 监听界面变化,更新渲染画面
window.addEventListener("resize", () => {
  // 更新摄像头  aspect表示摄像机视锥体长宽比
  camera.aspect = window.innerWidth / window.innerHeight;
  // 更新摄像头的投影矩阵,在3维的世界里使用矩阵算法映射到屏幕出来的
  camera.updateProjectionMatrix();
  // 更新渲染器
  renderer.setSize(window.innerWidth, window.innerHeight);
  // 奢者渲染器的像素比例
  renderer.setPixelRatio(window.devicePixelRatio);
});
