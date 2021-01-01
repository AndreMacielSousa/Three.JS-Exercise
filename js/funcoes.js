/**
 * @author André Maciel Sousa / https://github.com/AndreMacielSousa
 *
 * Um Cenário de Natal para Efolio B da UC de CG 12/2019
 * 
 */

// Variaveis Globais para projectos

var scene; //representa um container onde vai ser colocado todos os objetos que queremos renderizar.
var camera; //representa o campo de visão da cena.
var renderer; //será nosso renderizador dos objetos contidos na cena.
var container; //referencia ao elemento que apresentara a scene

// Variaveis Globais para este Projecto

var luzAmbiente, luzDia, luzFoco;
var geometry, material, materials, controls;
var parede1, parede2, parede3, parede4, parede5;
var porta, chao, janela, puxador, esfera, aux, cilindro, mesa , sofa;
var sotao, plano, triangulo, lareira, aux2, fogo, chamine, moldura, candeeiro;
var terreno, arvore, tronco;
var objects = [];
var xx,yy,zz,rot;


// Instanciamento dos Elementos
// Funcao Principal

function main() {
	// referencia ao elemento que apresentara a scene
	container = document.querySelector("#mycanvas");

	// Criação do objeto cena que vai ser depois adicionado ao objeto render
	scene = new THREE.Scene();

	// Adicionar uma SkyBox como backgroud
	// https://threejs.org/docs/#api/en/loaders/CubeTextureLoader

	scene.background = new THREE.CubeTextureLoader()
		.setPath("img/cubeMap/")
		.load([
			"right.png", // positivo x
			"left.png", // negativo x
			"up.png", // positivo y
			"down.png", // negativo y
			"back.png", // positivo z
			"front.png" // negativo z
		]);

	// Criação de camera virtual com projeção em perspectiva, que vai ser depois adicionada ao objeto render
	// https://threejs.org/docs/#api/en/cameras/PerspectiveCamera
	var fov = 60; // angulo (fiel of view)
	var aspect = container.clientWidth / container.clientHeight; // aspect ratio
	var near = 0.1; // plano de corte proximo
	var far = 2000; // plano de corte afastado
	camera = camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

	// Posicionar a camera
	camera.position.set(320, 30, 250);
	//camera.lookAt(0, 0, 0); //TODO pode ser omitido com estes parametros

	// Renderizador
	renderizador();

	// Auxiliar para eixos (comentar no trabalho a entregar)
	var axes = new THREE.AxesHelper(50);
	//scene.add(axes);

	// Grelha Auxiliar (comentar no trabalho a entregar)
	var helper = new THREE.GridHelper( 2000, 100 );
	helper.position.y = - 150;
	helper.material.opacity = 0.25;
	helper.material.transparent = true;
	//scene.add( helper );

	// Orbita da Camera em torno do da posição do alvo [target.set]
	// https://threejs.org/docs/#examples/en/controls/OrbitControls
	controls = new THREE.OrbitControls(camera, renderer.domElement);
	controls.minDistance = 100; // distancia maxima de aproximação
	controls.maxDistance = 450; // distancia maxima de afastamento
	controls.maxPolarAngle = Math.PI / 2; // distancia vertical para movimentar
	controls.enableKeys = false;	// desablitar teclado para movimentar camera
	controls.enablePan = false;	// desablitar panning
	controls.target.set(0,-100,-100); // posicao do alvo

	// Arrastar e Largar Objectos
	// https://threejs.org/docs/#examples/en/controls/DragControls	
	//var dragControls = new THREE.DragControls( objects, camera, renderer.domElement );
	//dragcontrols.enabled = false;
	//dragControls.addEventListener( 'dragstart', function () { orbitControls.enabled = false; } );
	//dragControls.addEventListener( 'dragend', function () { orbitControls.enabled = true; } );

	// Criar Objectos antes de rendererizar cena
	criarCasaRC();
	criarCasaST();
	criarExterior();
	criarOjectosCasa();
	
	// Trabalhando particulas
	criarFumo();

	// TODO - Loading Objects
	loadObject();

	// Iluminação
	iluminar();

	// Animacao e Renderização
	animar();

	//FPS
	fps();
}

// Criar Objectos antes de rendererizar cena

function criarCasaRC() {
	/*
			Paredes da Casa
			Casa será um recorte para facilitar a visualização
			Como os materiais serão todos iguiais usamos as propriedades do THREE para Objectos:
				.clone para clonar
				.rotation para rodar para a nova posição  - Rotação
				.scale que permite redimensionar o objecto - Alteração de Escala e distorção
				.position que permite modificar a posição - Translação
	*/

	geometry = new THREE.BoxBufferGeometry(5, 150, 200);
	parede1 = new THREE.Mesh(
		geometry,
		new THREE.MeshStandardMaterial({
			map: new THREE.TextureLoader().load("img/logs.png"),
			side: THREE.DoubleSide
		})
	);
	parede1.position.set(-75, -75, 25);

	parede1.receiveShadow = true; //recebe sombra Clone recebe sombra
	scene.add(parede1);

	parede2 = parede1.clone();
	parede2.scale.set(1, 0.4, 1);
	parede2.rotation.y = Math.PI / 2;
	parede2.position.set(22.5, -120, -75);
	scene.add(parede2);

	parede3 = parede2.clone();
	parede3.scale.set(1, 0.267, 1);
	parede3.position.set(22.5, -20, -75);
	scene.add(parede3);

	parede4 = parede2.clone();
	parede4.scale.set(1, 0.35, 0.5);
	parede4.position.set(-27.5, -65, -75);
	scene.add(parede4);

	parede5 = parede4.clone();
	parede5.scale.set(1, 0.35, 0.095);
	parede5.position.set(113, -65, -75);
	scene.add(parede5);

	// Colocar uma porta
	geometry = new THREE.BoxBufferGeometry(7, 100, 40);
	porta = new THREE.Mesh(
		geometry,
		new THREE.MeshLambertMaterial({
			map: new THREE.TextureLoader().load("img/door.png"),
			side: THREE.DoubleSide
		})
	);
	porta.position.set(-75, -100, 75);
	porta.receiveShadow = true; //recebe sombra
	scene.add(porta);

	// colocar o piso
	geometry = new THREE.PlaneBufferGeometry(200, 200);
	chao = new THREE.Mesh(
		geometry,
		new THREE.MeshStandardMaterial({
			map: new THREE.TextureLoader().load("img/floor.jpg"),
			color: 0x654321,
			side: THREE.DoubleSide
		})
	);
	chao.rotation.set(-Math.PI / 2, 0, Math.PI / 2);
	chao.position.set(23, -150, 25);
	chao.receiveShadow = true; //recebe sombra
	scene.add(chao);

	// Colocar uma Janela com transparencia
	geometry = new THREE.BoxBufferGeometry(7, 50, 80);
	janela = new THREE.Mesh(
		geometry,
		new THREE.MeshStandardMaterial({
			color: 0xffffff,
			transparent: true,
			opacity: 0.5
		})
	);
	janela.rotation.y = Math.PI / 2;
	janela.position.set(63, -65, -75);
	scene.add(janela);

	//puxador da porta duas eferas e um cilindro
	puxador = new THREE.Group();
	geometry = new THREE.SphereBufferGeometry(3, 32, 32);
	material = new THREE.MeshStandardMaterial({ color: 0xffd700 });
	esfera = new THREE.Mesh(geometry, material);
	esfera.position.x = -8;
	puxador.add(esfera);
	aux = esfera.clone();
	aux.position.x = 8;
	puxador.add(aux);
	geometry = new THREE.CylinderBufferGeometry(2, 2, 12, 32);
	cilindro = new THREE.Mesh(geometry, material);
	cilindro.rotation.z = Math.PI / 2;
	puxador.add(cilindro);
	puxador.position.set(-75, -100, 87);
	puxador.castShadow = true; //projecta sombra
	scene.add(puxador);
}

function criarCasaST() {
	/*
		Criar o Sotão da Casa com o telhado e a chaminé
		Também com topo aberto para facilitar visualização
		Dando utilização ao PlaneBufferGeometry

	*/
	sotao = new THREE.Group();
	//piso do sotão
	geometry = new THREE.PlaneBufferGeometry(200, 200);
	plano = new THREE.Mesh(
		geometry,
		new THREE.MeshBasicMaterial({
			color: 0x654321,
			side: THREE.DoubleSide
		})
	);
	sotao.add(plano);

	// telhado
	geometry = new THREE.PlaneBufferGeometry(160, 220);
	plano = new THREE.Mesh(
		geometry,
		new THREE.MeshLambertMaterial({
			map: new THREE.TextureLoader().load("img/logs.png"),
			color: 0xFF0000,
			side: THREE.DoubleSide
		})
	);

	plano.rotation.y = Math.PI / 4;
	plano.position.set(-56.5, 0, -50);
	sotao.add(plano);

	aux = plano.clone();
	aux.rotation.y = -Math.PI / 4;
	aux.position.set(56.5, 0, -50);
	sotao.add(aux);

	// parede frontal com CylinderBufferGeometry com radiaSegments a 3
	geometry = new THREE.CylinderBufferGeometry(102.5, 102.5, 1, 3);
	triangulo = new THREE.Mesh(
		geometry,
		new THREE.MeshStandardMaterial({
			map: new THREE.TextureLoader().load("img/logs.png"),
			side: THREE.DoubleSide
		})
	);
	triangulo.rotation.set(-Math.PI, 0, 0);
	triangulo.scale.set(1.2, 1, 0.7);
	triangulo.position.set(0, 99, -35);
	sotao.add(triangulo);

	sotao.rotation.set(Math.PI / 2, 0, Math.PI / 2);
	sotao.position.set(23, 0, 25);
	scene.add(sotao);

	// Colocar uma Janela no sotão
	// Caixilhos
	janela = new THREE.Group();
	geometry = new THREE.BoxBufferGeometry(7, 25, 25);
	aux = new THREE.Mesh(
		geometry,
		new THREE.MeshLambertMaterial({
			color: 0x654321
		})
	);

	auxJanela(janela);
	
	//Vidros
	geometry = new THREE.BoxBufferGeometry(8, 23, 23);
	aux = new THREE.Mesh(
		geometry,
		new THREE.MeshLambertMaterial({
			color: 0x87CEEB,
			transparent: true,
			opacity: 0.5
		})
	);
	
	auxJanela(janela);

	// Colocar Chaminé
	chamine = new THREE.Group();
	geometry = new THREE.CylinderBufferGeometry(12, 12, 80, 4, 1, 0);
	material = new THREE.MeshStandardMaterial({
		map: new THREE.TextureLoader().load("img/brick_wall.png"),
		color: 0xa9a9a9,
		side: THREE.DoubleSide
	});
	aux = new THREE.Mesh(geometry, material);
	chamine.add(aux);
	geometry = new THREE.BoxBufferGeometry(20,8,20);
	aux = new THREE.Mesh(geometry, material);
	aux.position.y = 35;
	aux.rotation.y = Math.PI/4;
	chamine.add(aux);
	chamine.position.set(-60, 30, -60);
	scene.add(chamine);

	//Colocar as vigas principais tomando partido da funcao tronco
	aux=troncos(25,90,25,1);
	aux.scale.set(4,11,4);
	scene.add(aux);
	aux2=aux.clone();
	aux2.position.set(25,0,115);
	scene.add(aux2);
	aux2=aux.clone();
	aux2.position.set(25,0,-65);
	scene.add(aux2);

}

//Funcção Auxiliar para os passos repetidos da construção da Janela
function auxJanela(janela){

	janela.add(aux);
	
	aux2 = aux.clone();
	aux2.position.y = 25
	janela.add(aux2);

	aux2 = aux.clone();
	aux2.position.z = 25
	janela.add(aux2);

	aux2 = aux.clone();
	aux2.position.y = 25
	aux2.position.z = 25
	janela.add(aux2);


	janela.position.set(-75,25,12.5);
	scene.add(janela);

}

function criarExterior() {
	/* 
		Para exterior colocar um plano para receber sombras
		colocar umas arvores em torno da casa
		Para Arvore vamos usar um conjunto de ConeBufferGeometry com radialSements a 6
		Com o .Scale criamos dimensões diferentes
		Depois com .Clone replicamos e destribuimos
	 */

	geometry = new THREE.PlaneBufferGeometry(500, 500);
	terreno = new THREE.Mesh(
		geometry,
		new THREE.MeshPhongMaterial({
			map: new THREE.TextureLoader().load("img/snowtext.jpg"),
			color: 0xffffff,
			side: THREE.DoubleSide
		})
	);
	terreno.rotation.set(-Math.PI / 2, 0, Math.PI / 2);
	terreno.position.set(-77, -151, -60);
	terreno.receiveShadow = true; //recebe sombra
	scene.add(terreno);

	// Arvore
	arvore = new THREE.Group();
	geometry = new THREE.ConeBufferGeometry(20, 35, 6);
	aux = new THREE.Mesh(
		geometry,
		new THREE.MeshLambertMaterial({
			map: new THREE.TextureLoader().load("img/pinetexture.jpg"),
			color: 0x00ff00,
			side: THREE.DoubleSide
		})
	);
	aux.castShadow = true; // projecta sombra
	arvore.add(aux);

	// função para repetição da construção das folhas com ciclo for
	var x = 1,
		z = 1,
		yy = 0;
	for (var ii = 0; ii < 3; ii++) {
		//console.log(x);

		aux = aux.clone();
		aux.scale.set(x + 0.5, 1, z + 0.5);
		aux.position.set(0, yy - 20, 0);
		arvore.add(aux);
		x += 0.5;
		z += 0.5;
		yy -= 20;
	}
	geometry = new THREE.CylinderBufferGeometry(10, 10, 20, 6);
	aux = new THREE.Mesh(
		geometry,
		new THREE.MeshStandardMaterial({
			map: new THREE.TextureLoader().load("img/door.png"),
			side: THREE.DoubleSide
		})
	);
	aux.position.set(0, -85, 0);
	aux.castShadow = true; // projecta sombra
	arvore.add(aux);
	arvore.position.set(-20, -55, -175);
	scene.add(arvore);

	aux=arvore.clone();
	aux.scale.set(1,2,1);
	aux.position.set(-195,40,-195);
	scene.add(aux);

	aux=arvore.clone();
	aux.scale.set(1,2,1);
	aux.position.set(-215,40,155);
	scene.add(aux);

	// Aproveitar a função de criar troncos e colocar uma pilha de lenha nos exterior
	criarPilhadeTroncos();

	// criar um passeio em torno da casa
		// colocar o piso
		geometry = new THREE.PlaneBufferGeometry(35, 230);
		chao = new THREE.Mesh(
			geometry,
			new THREE.MeshBasicMaterial({
				map: new THREE.TextureLoader().load("img/brick.png"),
				color: 0xDCDCDC,
				side: THREE.DoubleSide
			})
		);
		chao.rotation.set(-Math.PI / 2, 0, Math.PI / 2);
		chao.position.set(8, -150, -95);
		scene.add(chao);
		aux = chao.clone();
		aux.rotation.z = 2*Math.PI;
		aux.scale.y=0.88;
		aux.position.set(-90,-150,23.5);
		scene.add(aux);
}

function criarPilhadeTroncos() {
	var xx = -87,
		yy = -147.5,
		zz = -75,
		rot = 1;
	for (var ii = 0; ii < 95; ii += 5) {
		for (var jj = 0; jj < 75; jj += 5) {
			scene.add(troncos(xx, yy + jj, zz + ii, rot));
		}
	}
}

function criarOjectosCasa() {

	/*
		Vamos começar por criar uma lareira, depois colocar uns troncos 
		Para desenhar a lareira vamos utilizar os planos para a composição
		Para os troncos os cilindros das Geometrias do Three.js. Tomaremos partido
		da utilziação de texturas.
	*/
	lareira = new THREE.Group();
	geometry = new THREE.PlaneBufferGeometry(60,101);
	aux =  new THREE.Mesh(
		geometry,
		new THREE.MeshStandardMaterial({
			map: new THREE.TextureLoader().load("img/brick_wall.png"),
			color: 0xA9A9A9,
			side: THREE.DoubleSide
		})
	);
	aux.rotation.set(0,Math.PI/4,0);
	lareira.add(aux);
	// base queimador	
	aux2 = aux.clone();
	aux2.scale.set(1,0.1,1);
	aux2.position.set(0,-95,0.5);
	lareira.add(aux2);
	// topo queimador	
	aux2 = aux2.clone();
	aux2.position.set(0,-45,0.5);
	lareira.add(aux2);
	//paredes queimador: esquerda
	aux2 = aux.clone();
	aux2.rotation.y = Math.PI/2;
	aux2.scale.set(0.7,1,1);
	aux2.position.set(-21,-50,0);
	lareira.add(aux2);
	//paredes queimador: direita
	aux2 = aux2.clone();
	aux2.rotation.y = Math.PI;
	aux2.position.set(0,-50,-21);
	lareira.add(aux2);
	//Proteção Queimador Tranparente e negro
	geometry = new THREE.BoxBufferGeometry(4, 40, 60);
	aux = new THREE.Mesh(
		geometry,
		new THREE.MeshPhongMaterial({
			color: 0x000000,
			transparent: true,
			//wireframe: true,
			opacity: 0.6
		})
	);
	aux.position.set(0,-70,0);
	aux.rotation.y = -Math.PI/4;
	lareira.add(aux);
	// Base Queimador
	geometry = new THREE.CylinderBufferGeometry(15, 15, 10, 3);
	aux = new THREE.Mesh(
		geometry,
		new THREE.MeshStandardMaterial({
			color: 0x000000,
			side: THREE.DoubleSide
		})
	);
	aux.position.set(-9,-95,-10);
	aux.scale.set(1.3,1,1.8);
	aux.rotation.set(0,-Math.PI/12,0);
	lareira.add(aux);
	// Colocar os troncos
	tronco = troncos(-5,-80,-10);
	tronco.rotation.set(Math.PI/4,0,0);
	lareira.add(tronco);

	tronco = troncos(-10,-80,-10);
	tronco.rotation.set(-Math.PI/4,0,0);
	lareira.add(tronco);

	tronco = troncos(-15,-80,-10);
	tronco.rotation.set(0,0,-Math.PI/6);
	lareira.add(tronco);

	// Adicionar a lareira ao cenario
	lareira.position.set(-50,-50,-50);
	scene.add(lareira);
	
	// Uma moldura na parede
	moldura = new THREE.Group();
	geometry = new THREE.BoxBufferGeometry(2, 26, 26);
	aux = new THREE.Mesh(
		geometry,
		new THREE.MeshLambertMaterial({
			color: 0x654321
		})
	);
	moldura.add(aux);
	// Vidro Moldura
	geometry = new THREE.BoxBufferGeometry(4, 23, 23);
	aux = new THREE.Mesh(
		geometry,
		new THREE.MeshLambertMaterial({
			color: 0x87CEEB,
			transparent: true,
			opacity: 0.2
		})
	);
	moldura.add(aux);
	// uma foto na moldura
	geometry = new THREE.PlaneBufferGeometry(23, 23);
	aux = new THREE.Mesh(
		geometry,
		new THREE.MeshBasicMaterial({
			map: new THREE.TextureLoader().load("img/f1.jpg")
		})
	);
	aux.position.x=1.5;
	aux.rotation.y=Math.PI/2;
	moldura.add(aux);
	moldura.position.set(-68, -70, 15);
	scene.add(moldura);

	// Um Candeeiro de tecto
	var points = [];
	for (var i = 0; i < 10; i++) {
		points.push(new THREE.Vector2(Math.sin(i * 0.2) * 10 + 5, (i - 5) * 2));
	}
	geometry = new THREE.LatheBufferGeometry(points,7);
	candeeiro = new THREE.Mesh(
		geometry,
		new THREE.MeshLambertMaterial({
			color: 0x660000,
			side: THREE.DoubleSide,
			transparent: true,
			opacity: 0.9
		})
	);
	candeeiro.rotation.x = Math.PI;
	candeeiro.position.set(25,-10,25);
	scene.add(candeeiro);

	// Uma mesa
	mesa = new THREE.Group();
	geometry = new THREE.CylinderBufferGeometry( 25, 25, 2, 64 );
	material = new THREE.MeshLambertMaterial({ color: 0xFFFFFF });
	aux = new THREE.Mesh(geometry,material);
	mesa.add(aux);
	geometry = new THREE.CylinderBufferGeometry(2,12,15,8);
	aux = new THREE.Mesh(geometry,material);
	aux.position.y = -10;
	mesa.add(aux);
	mesa.position.set(-15,-135,-15);
	scene.add(mesa);
	// conjunto sofas
	sofa = new THREE.Group();
	material = new THREE.MeshPhongMaterial({ color: 0xCC8800 });
	geometry = new THREE.BoxBufferGeometry(85,40,5);
	aux = new THREE.Mesh(geometry,material);
	aux.rotation.x=Math.PI/8;
	sofa.add(aux);
	geometry = new THREE.BoxBufferGeometry(85,15,30);
	aux = new THREE.Mesh(geometry,material);
	aux.position.set(0,-12,-10);
	sofa.add(aux);
	sofa.position.set(-25,-130,45);
	scene.add(sofa);
	// clonar para positionar novo sofa
	aux=sofa.clone();
	aux.rotation.y = Math.PI/2;
	aux.position.set(60,-130,-25);
	scene.add(aux);

	// Uma cama no sotao
	var length = 70,
		width = 8;

	var shape = new THREE.Shape();
	shape.moveTo(0, 0);
	shape.lineTo(0, width);
	shape.lineTo(length, width);
	shape.lineTo(length, 0);
	shape.lineTo(0, 0);

	var extrudeSettings = {
		steps: 2,
		depth: 60,
		bevelEnabled: true,
		bevelThickness: 4,
		bevelSize: 4,
		bevelOffset: 0,
		bevelSegments: 5
	};
	
	geometry = new THREE.ExtrudeBufferGeometry(shape, extrudeSettings);
	material = new THREE.MeshLambertMaterial({ color: 0x808080 });
	aux = new THREE.Mesh(geometry, material);
	aux.position.y = 5;
	scene.add(aux);

	// mesas de cabeceira
	var mat = new THREE.LineBasicMaterial({ color: 0xFFFFFF });
	geometry = new THREE.BoxBufferGeometry(15,20,15);
	aux = new THREE.Mesh(geometry, material);
	var geoEdge = new THREE.EdgesGeometry(aux.geometry);
	var wireframe = new THREE.LineSegments(geoEdge, mat);
	aux.add(wireframe);
	aux.position.set(75,11,-20);
	scene.add(aux);
	aux2=aux.clone();
	aux2.position.z=75;
	scene.add(aux2);
	//clonar o candeiro para o sotão
	aux=candeeiro.clone();
	aux.position.y=70;
	scene.add(aux);

}	

/* 	função para criar troncos de madeira a colocar em alguns locais da cena
	Os troncos serão os objectos que poderão ser deslocalizados no cenário
	recebe como argumentos a localização
*/
function troncos(xx,yy,zz,rot){
	rot=rot || 0;							//se rot nulo atribui 0
	geometry = new THREE.CylinderBufferGeometry( 2.5, 2.5, 20, 26 );
	materials =
	[
		new THREE.MeshPhongMaterial( { map: new THREE.TextureLoader().load("img/WoodO.png") } ),
		new THREE.MeshPhongMaterial( { map: new THREE.TextureLoader().load("img/WoodI.png") } ),
		new THREE.MeshPhongMaterial( { map: new THREE.TextureLoader().load("img/WoodI.png") } )
	];
	tronco = new THREE.Mesh( geometry,materials );
	tronco.castShadow = true;
	tronco.receiveShadow = true;
	tronco.position.set(xx,yy,zz);
	if (rot == 1) { tronco.rotation.z=Math.PI/2;};
	objects.push(tronco); // colocar no array de objectos que podem ser arrastados
	return tronco;
	
}


/*	Iluminação ambiente não permite lançar sombra
	https://threejs.org/docs/index.html#api/en/lights/AmbientLight
	
	Iluminação para simular luz do dia orientada pela sombras da SkyBox
	https://threejs.org/docs/index.html#api/en/lights/SpotLight

	Fonte de luz para lareira e para a lampada
	https://threejs.org/docs/index.html#api/en/lights/PointLight

*/

function iluminar() {
	// Luz Ambiente
	luzAmbiente = new THREE.AmbientLight(0x404040, 3);
	scene.add(luzAmbiente);

	// Luz Dia
	luzDia = new THREE.SpotLight(0xffffff, 0.4);
	luzDia.position.set(-250, 50, -400);
	luzDia.castShadow = true; //ativar sombras
	luzDia.target.position.set(-95, -65, 100);
	luzDia.shadow.mapSize.set(4096, 4096); //melhorar sombra
	scene.add(luzDia);
	scene.add(luzDia.target);

	// Luz Focos Candeeiro
	luzFoco = new THREE.PointLight(0xFFFF00,5,75,2);
	luzFoco.position.set(25,-15,25);
	luzFoco.castShadow = true; //ativar sombras
	scene.add(luzFoco);
	
	// Luz Focos Lareira
	luzFoco = new THREE.PointLight(0xFF9900,6,75,2);
	luzFoco.position.set(-50,-120,-50);
	luzFoco.castShadow = true; //ativar sombras
	scene.add(luzFoco);
	

	//Create a helper for the shadow camera (optional)   
	var helper = new THREE.CameraHelper(luzFoco.shadow.camera);
	//scene.add(helper);
}

// Resize

function onWindowResize() {
	camera.aspect = container.clientWidth / container.clientHeight; // Para garantir que não há distorção
	camera.updateProjectionMatrix(); // atualiza de seguida a matriz de projeção

	renderer.setSize(container.clientWidth, container.clientHeight);
}

window.addEventListener("resize", onWindowResize, false);

// Funcao animar e renderização

function renderizador(){
	// alpha para viewport transparente + antialias
    //6.1 Criar um WebGLRenderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
   
    //6.2 Definir dimensao
  	// renderer.setClearColor(new THREE.Color(0xEEEEEE, 1.0));  //WebGL warning: clearColor:
    renderer.setSize( container.clientWidth, container.clientHeight );
    renderer.shadowMap.enabled = true;   //TODO tirar comentário para ativar sombras
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;   //melhorar sombra


    //6.3 definir proporção correta de pixels para o dispositivo em que está sendo executado
    renderer.setPixelRatio(window.devicePixelRatio);
    
    //6.4 Adicionar Canvas Element à pagina
    container.appendChild( renderer.domElement );
}

function animar() {
	requestAnimationFrame(animar);

	//TODO
	pointsAnimation();

	renderer.render(scene, camera);
}

// Alguns AddOns

// FPS
function fps() {
	var script = document.createElement("script");
	script.onload = function() {
		var stats = new Stats();
		document.body.appendChild(stats.dom);
		requestAnimationFrame(function loop() {
			stats.update();
			requestAnimationFrame(loop);
		});
	};
	script.src = "js/stats.js";
	document.head.appendChild(script);
}


// Carregando um boneco de neve
function loadObject(){


	var loader = new THREE.GLTFLoader();

loader.load( 'model/teste.gltf', function ( gltf ) {

	aux = gltf.scene;
	aux.position.set(-225,-151,-15);
	aux.rotation.y=-Math.PI/2;
	aux.scale.set(20,20,20);

	scene.add( aux );

}, undefined, function ( error ) {

	console.error( error );

} );


}