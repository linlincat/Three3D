import * as THREE from "three";

// BufferGeometry 缓冲徒形创建矩形

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

// 添加物体 Buffer 缓冲
// BufferGeometry 是面片、线或点几何体的有效表述。包括顶点位置，面片索引、法相量、颜色值、UV 坐标和自定义缓存属性值。
const geometry = new THREE.BufferGeometry();
const vertices = new Float32Array([
  -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0, 1.0,
  -1.0, -1.0, 1.0,
]);
// itemSize = 3 因为每个顶点都是一个三元组。
// BufferAttribute( array : TypedArray, itemSize : Integer, normalized : Boolean )
geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

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
