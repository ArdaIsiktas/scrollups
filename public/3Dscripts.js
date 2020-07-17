var scene = new THREE.Scene();
var scrollUp;

var camera = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer({
    alpha: true
});

if (typeof window.orientation !== 'undefined') {
    renderer.setSize(window.innerWidth / 4, window.innerHeight / 4);
    camera.position.set(40, 20, 20);
} else {
    camera.position.set(20, 10, 15);
    renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
}

document.getElementById("3D").appendChild(renderer.domElement);

var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.autoRotate = true;
controls.dampingFactor = 1;
controls.enableZoom = false;
controls.update();

var yariKure = new THREE.HemisphereLight(0xffffff, 0x000000, 10);
scene.add(yariKure);

// scene.background = new THREE.Color(0xf0f0f0);
renderer.setClearColor(0x000000, 0);

var mtlLoader = new THREE.MTLLoader();
mtlLoader.setTexturePath('/3D/');
mtlLoader.setPath('/3D/');
mtlLoader.load('kapalı.mtl', function (materials) {

    materials.preload();

    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath('/3D/');
    objLoader.load('kapalı.obj', function (object) {
        scene.add(object);
        scrollUp = object;
        object.position.z = 3;
        object.position.x = 0;
        // object.position.x = 0;
    });
});

var animate = function () {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
};

animate();



window.onload = (event) => {
    window.setTimeout(function () {
        controls.autoRotate = false;
    }, 4000);
};