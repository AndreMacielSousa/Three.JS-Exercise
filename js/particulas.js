/* https://stemkoski.github.io/Three.js/Particle-Engine.html */

var particleCount = 500;
var points;

function criarFumo() {
	createPoints();
}

function createPoints() {
	var geometry = new THREE.Geometry();

	var texture = new THREE.TextureLoader().load("img/smokeparticle.png");
	var material = new THREE.PointsMaterial({
		size: 15,
		map: texture,
		blending: THREE.AdditiveBlending,
		depthWrite: false,
		transparent: true,
		color: 0xbab5ae
	});

	var range = 10;
	for (var i = 0; i < particleCount; i++) {
		var x = THREE.Math.randInt(-range, range);
		var y = THREE.Math.randInt(-range, range);
		var z = THREE.Math.randInt(-range, range);
		var point = new THREE.Vector3(x, y, z);
		point.velocityX = THREE.Math.randFloat(-0.01, 0.01);
		point.velocityY = THREE.Math.randFloat(0.1, 0.3);
		geometry.vertices.push(point);
	}

	points = new THREE.Points(geometry, material);
	points.position.set(-60, 70, -60);
	scene.add(points);
}

function pointsAnimation() {
	points.geometry.vertices.forEach(function(v) {
		v.y = v.y + v.velocityY;
		v.x = v.x + v.velocityX;

		if (v.y >= 100) {
			v.x = THREE.Math.randInt(-10, 10);
			v.y = 0;
		}
	});

	points.geometry.verticesNeedUpdate = true;
}