import * as THREE from "three";

// 酷炫的三角形

// attributes: normal:朝向如光线照射,折射的角度等    position:物体的顶点位置   uv:颜色渲染的位置

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

for (let i = 0; i < 50; i++) {
  const geometry = new THREE.BufferGeometry();
  // Float32Array(0) 没有添加进去,因此默认的时候添加9表示有9个点
  // 因为它是缓冲区的一个数组
  const positionArray = new Float32Array(9);
  for (let j = 0; j < 9; j++) {
    positionArray[j] = Math.random() * 10 - 5;
  }
  geometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positionArray, 3)
  );
  let color = new THREE.Color(Math.random(), Math.random(), Math.random());
  //   基础网格材质(MeshBasicMaterial)
  // 一个以简单着色（平面或线框）方式来绘制几何体的材质。
  // 这种材质不受光照的影响。
  const material = new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity: 0.5, // transparent为true才会生效
  });
  const mesh = new THREE.Mesh(geometry, material);
  console.log(mesh);

  scene.add(mesh);
}

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
