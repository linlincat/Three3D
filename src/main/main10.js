import * as THREE from "three";

// 纹理

// attributes: normal:朝向如光线照射,折射的角度等[法线 ]    position:物体的顶点位置   uv:颜色渲染的位置

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

//  导入纹理
// 加载texture的一个类。 内部使用ImageLoader来加载文件。
const textTureLoader = new THREE.TextureLoader();
const doorColorTexture = textTureLoader.load("./textures/door/color.jpg");

// const texture = textTureLoader.load("./textures/minecraft.png");
// texture.minFilter = THREE.NearestFilter;
// texture.magFilter = THREE.NearestFilter;
// texture.minFilter = THREE.LinearFilter;
// texture.magFilter = THREE.LinearFilter;

// x 范围 0 - 1;
// doorColorTexture.offset.x = 0.5;
// doorColorTexture.offset.y = 0.5;
// doorColorTexture.offset.set(0.5.0.5)

// doorColorTexture.center.set(0.5, 0.5);
// doorColorTexture.rotation = Math.PI / 4;
// doorColorTexture.wrapS = THREE.MirroredRepeatWrapping;
// doorColorTexture.wrapT = THREE.RepeatWrapping;
// doorColorTexture.repeat.set(2, 2);
// var targetObject = new THREE.Object3D(); scene.add(targetObject);
// light.target = targetObject; 完成上述操作后，平行光现在就可以追踪到目标对像了。

// 添加物体
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
// 材质
const basicMaterial = new THREE.MeshBasicMaterial({
  color: "#ffff00",
  // 颜色贴图。可以选择包括一个alpha通道
  map: doorColorTexture,
  side: THREE.DoubleSide,
  // map: texture,
  // aoMap: Texture, 需要第二组uv
});

// 添加到场景
const cube = new THREE.Mesh(cubeGeometry, basicMaterial);
scene.add(cube);

// 添加一个平面
const planeGeometry = new THREE.PlaneGeometry(1, 1);
const plane = new THREE.Mesh(planeGeometry, basicMaterial);
// console.log(plane);
// plane.position.x = 2;
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
