(function() {
	var camera, scene, renderer;
	var texture = void 0;
	var cubes;
	var container;

	function InitMesh() {
		var geometry = new THREE.CubeGeometry(3, 3, 3);
		var material = new THREE.MeshBasicMaterial({
			transparent: true,
			side: THREE.DoubleSide,
			alphaTest: .5,
		});
		if (texture !== void 0)
			material.map = texture;
		cubes = [];
		cubes.push(new THREE.Mesh(geometry, material));
		scene.add(cubes[0]);
		cubes.push(new THREE.Mesh(geometry, material));
		scene.add(cubes[1]);
		cubes.push(new THREE.Mesh(geometry, material));
		scene.add(cubes[2]);
		cubes[0].position.x = -2.44;
		cubes[0].position.y = -2;
		cubes[0].rotation.y = 45;
		cubes[1].position.x = 2.44;
		cubes[1].position.y = -2;
		cubes[1].rotation.y = 45;
		cubes[2].position.y = 2;
		cubes[2].rotation.y = 45;
	}

	function InitRenderer() {
		var WIDTH = container.clientWidth;
		var HEIGHT = container.clientHeight;
		var VIEW_ANGLE = 55;
		var ASPECT = WIDTH / HEIGHT;
		var NEAR = 1;
		var FAR = 500;
		camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
		camera.position.z = 10;
		scene = new THREE.Scene();
		scene.add(camera);
		renderer = new THREE.WebGLRenderer({
			antialias: true,
			//alpha: true,
		});
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(WIDTH, HEIGHT);
		renderer.setClearColor(0xeeeeff, 1);

		cameraControls = new THREE.OrbitControls(camera, renderer.domElement);
		cameraControls.target.set(0, 0, 0);
		cameraControls.maxDistance = 400;
		cameraControls.minDistance = 10;
		cameraControls.update();

		container.appendChild(renderer.domElement);
	}

	function Animate() {
		requestAnimationFrame(Animate);
		UpdateMotion();
		if (texture !== void 0)
			texture.needsUpdate = true;
		renderer.render(scene, camera);
	}

	function UpdateMotion() {
		var time = Date.now() * 0.001;
		var delta = Math.sin(time);
		cubes[0].rotation.y = Math.PI / 4 + 0.7 * delta;
		cubes[1].scale.x = 1 + 0.2 * delta;
		cubes[1].scale.y = 1 + 0.2 * delta;
		cubes[1].scale.z = 1 + 0.2 * delta;
		cubes[2].position.y = 2 + 0.7 * delta;
	}

	function GetTexture(canvas) {
		if (!canvas) return void 0;
		return (new THREE.Texture(canvas));
	}

	function Init() {
		InitRenderer();
		InitMesh();
		Animate();
	}

	window.cubesWithCanvas = function(div, canvas) {
		container = div;
		texture = GetTexture(canvas);
		Init();
	}
})();
