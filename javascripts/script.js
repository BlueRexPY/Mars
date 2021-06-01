var renderer,
  scene,
  camera,
  mars = document.getElementById("mars_3d");

renderer = new THREE.WebGLRenderer({
  canvas: mars,
  antialias: true,
  alpha: true,
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//Камера
camera = new THREE.PerspectiveCamera(
  30,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

//Сцена
scene = new THREE.Scene();

//Свет
var light = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(light);

var light2 = new THREE.PointLight(0xffffff, 0.9);
light2.position.y = 5000;
light2.position.x = -5000;
light2.position.z = 5000;
scene.add(light2);

var loader = new THREE.GLTFLoader();

loader.load("./../models/scene.gltf", handle_load);

var mesh;

function handle_load(gltf) {
  mesh = gltf.scene;
  mesh.children[0].material = new THREE.MeshLambertMaterial();
  scene.add(mesh);
  mesh.position.z = -750;
  mesh.position.x = 0;
  mesh.position.y = 0;
}

//Рендер
render();

var delta = 0;
var prevTime = Date.now();
var zoom = Boolean(false);

function render() {
  delta += 0.1;

  if (mesh) {
    mesh.rotation.y += 0.005;
    if (zoom == true) {
      if (mesh.position.x <= 150 && mesh.position.y >= -130) {
        if (window.screen.width <= 400) {
          mesh.position.x += 0.1;
          mesh.position.y -= 5;
          mesh.position.z += 0.1;
        } else {
          mesh.position.x += 6;
          mesh.position.y -= 0.7;
        }
        mesh.rotation.y += 0.05;
        mesh.position.z += 16;
      }
    }
  }

  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

travel_button.onclick = function () {
  zoom = true;
  travel_button.style.opacity = 0;
  move();
};

//chart.js
new Chart(document.getElementById("myChart"), {
  type: "doughnut",
  data: {
    labels: [
      "Carbon Dioxide",
      "Nitrogen",
      "Argon",
      "Oxygen",
      "Carbon Monoxide",
    ],
    datasets: [
      {
        backgroundColor: [
          "rgba(238, 53, 26,0.6)",
          "rgba(228, 53, 26,0.5)",
          "rgba(228, 53, 26,0.4)",
          "rgba(228, 53, 26,0.3)",
          "rgba(228, 53, 26,0.2)",
        ],
        borderColor: "rgba(0, 0, 0, 0)",
        data: [95.32, 2.7, 1.69, 0.14, 0.08],
        hoverOffset: 3,
      },
    ],
  },
  options: {
    animation: {
      duration: 2000,
    },
    responsive: true,
    plugins: {
      legend: {
        position: "none",
        //так делать не надо
      },
      title: {
        display: true,
        text: "the atmosphere of Mars consists",
      },
    },
  },
});

//anime.js
function move() {
  if (window.screen.width <= 400) {
    var elements = [`caption_1`, `caption_2`, `myChart`];
  } else {
    var elements = [
      `percent_1`,
      `percent_2`,
      `percent_3`,
      `percent_4`,
      `percent_5`,
      `caption_1`,
      `caption_2`,
      `myChart`,
    ];
  }

  var tl = anime.timeline({
    easing: "easeOutExpo",
    delay: 400,
  });
  for (let n = 0; n < elements.length; n++) {
    tl.add(
      {
        targets: `#${elements[n]}`,
        opacity: 1,
      },
      n * 300
    );
  }
}

//Адаптив
if (window.screen.width <= 420) {
  document.getElementById("travel_button").style.fontSize = "80px";
  document.getElementById("caption").style.top = "15%";
  document.getElementById("caption").style.left = "30%";
  document.getElementById("caption").style.marginLeft = "0";
  document.getElementById("caption").style.transform = "scale(1.8)";
  document.getElementById("name").style.fontSize = "30px";
}
