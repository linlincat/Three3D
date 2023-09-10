import * as THREE from "three";

// time

// 轨道控制器（OrbitControls）
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

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

// 添加坐标轴辅助器
// 红色代表 X 轴. 绿色代表 Y 轴. 蓝色代表 Z 轴.
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

function render(time) {
  // cube.position.x += 0.01;
  // cube.rotation.x += 0.01;
  // 距离 = 速度 * 时间  求余是为了不断的循环
  let t = (time / 1000) % 5;
  cube.position.x = t * 1;
  if (cube.position.x > 5) {
    cube.position.x = 0;
  }

  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

render();
