var scene = new THREE.Scene();
// var TWEEN = new TWEEN.Tween();

var camera = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 0.1, 1000);
// camera.position.z = 15;
// camera.position.y = 15;
// camera.position.x = -20;
camera.position.set(-20, 15, 15);


var renderer = new THREE.WebGLRenderer({
    alpha: true
});
renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);

// document.body.appendChild( renderer.domElement );
document.getElementById("3D").appendChild(renderer.domElement);

var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = false;
// controls.autoRotate = true;
controls.dampingFactor = 0.15;
controls.enableZoom = false;

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
        //object.position.y -= 60;
    });
});

var animate = function () {
    requestAnimationFrame(animate);
    TWEEN.update();
    controls.update();
    renderer.render(scene, camera);
};

animate();

window.setTimeout(function () {
    // var from = camera.position.clone();

    // var to = {
    //     x: 20,
    //     y: 15,
    //     z: 15
    // };
    // // var to = camera.position.clone().subScalar(100);
    // var tween = new TWEEN.Tween(from)
    //     .to(to, 100)
    //     // .easing(TWEEN.Easing.Linear.None)
    //     // .onUpdate(function () {
    //     //     camera.position.copy(this);
    //     //     controls.update(); // update of controls is here now
    //     // })
    //     .start();
}, 3000);