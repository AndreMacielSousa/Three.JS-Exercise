# Three.JS-Exercise - Universidade Aberta - Dezembro 2019

Este trabalho começou pela análise ao enunciado disponibilizado e das respostas às questões colocadas no fórum da UC, desta e porque tinha a vontade de produzir algo que fosse diferente do ponto de vista criativo, comecei por verificar como poderia dar resposta aos tópicos apresentados como referência ao trabalho a desenvolver:

Para a criação de objetos básicos, foram utilizadas várias funcionalidades do Three.js, identificadas e comendas no código;
Para a projeção e como estávamos com um trabalho em 3D, optei pela projeção em perspetiva;
No que concerne à aplicação de transformações espaciais foram utilizados os métodos scale, rotation, clone e position, comentados na sua primeira utilização. O método scale permite aplicar alterações de escala aos objetos, inclusive algumas distorções, como aplicado nas arvores exteriores. O método rotation é utilizado para aplicar a rotação aos objetos em radianos. O método clone foi utilizado para clonar objetos, o que agilizou o processo de construção de objetos similares, tendo também a vantagem acrescida de incluir as características do objeto clonado, como por exemplo o tratamento de sombras o que foi muito útil na construção das arvores ao ser colocado dentro de um ciclo for. Por seu lado o método position permite aplicar a translação aos objetos;
Em relação à cor e transparência, incluí também texturas foram utilizadas várias variações e conjuntos de texturas e cores, para assim como a mesma textura ter resultados distintos, enquanto que para a transparência foi utilizada uma janela para o exterior da casa;
Por fim para a iluminação foram colocadas três fontes de luz, uma iluminação ambiente para todo o cenário, uma SpotLight para simular a luz do sol, tentando alinhar as sombras pelas do cenário, por fim dois pontos de luz para simular a luz projetada pela lareira e pelas lâmpadas da casa. Nestes casos aconteceu uma dificuldade com o tratamento das sombras, dado que as mesmas “passam” as paredes o que num ambiente real não acontece.
Em relação ao projeto, fui acrescentando alguns pontos que vão sendo descritos ao longo dos comentários e que resumirei nos próximos parágrafos.

Para o controlo de visualização da cena foi utilizada a classe OrbitControls permitindo o movimento da câmera em torno do centro da cena, tendo adicionado algum controlo de distâncias e movimentos para que não ficassem disponíveis distâncias e ângulos sem sentido para o projeto.

Também ensaiei o controlo de objetos com os troncos, utilizando DragControls, contudo tive dificuldades em controlar o largar objeto, tendo concluído que seria uma incompatibilidade com o OrbitControls dado que quando removido este, o processo funciona normalmente.

Para o background da Cena apliquei a técnica conhecida por SkyBox com utilização da classe CubeTextureLoader o que permite uma envolvência da cena mais enquadrada com um ambiente real.

Para a criação da cena, fui dividindo o projeto em funções que fui desenvolvendo ao longo dos dias, em conformidade com o que desejava, sendo que neste projeto e ao contrário do primeiro e-folio, optei por maior reciclagem de variáveis aproveitando as características do JavaScript.

function criarCasaRC()

Esta função inclui a produção do Rés-do-Chão da casa, onde são contruídas as paredes, colocadas a porta e puxador, o piso e a janela com vista de e para o exterior.

Para a parede que inclui a janela não encontrei melhor solução que não fosse clonar vários pedaços de parede e posicionar nos locais para que ficasse a janela livre para a transparência. O único processo que encontrei passava por desenhar o objeto no Blender e posteriormente importá-lo para o Thrre.JS, pelo que ficou para um processo de melhoria para o final do projeto.

function criarCasaST()
Nesta são criados os objetos do Sótão, que inclui o telhado, a parede frontal, o piso, uma janela (para a qual foi utilizado uma função auxiliar para os passos repetidos e BoxGeometry para a sua construção). Numa segunda fase também foi incluído a colocação de vigas de suporte ao telhado, aproveitando uma função para a produção de troncos de madeira.

function criarExterior()
Aqui criamos os objetos exteriores, desde o terreno às arvores, utilizando texturas para dar alguma realidade aos objetos, assim como tomando partido do método clone para a construção das arvores. Numa segunda fase foi criada uma função para a construção de uma pilha de troncos no exterior, como projeto, ou caderno de encargos estava também a criação de um trilho para a porta da casa, assim como alguns objetos que simulassem a existem de montes de neve.

function criarOjectosCasa ()
Esta função foi adicionada numa fase mais final para adicionar objetos à casa para de algum modo utilizar o tempo restante para a entrega do trabalho para utilizar um pouco mais as funcionalidades da Framework.

function criarFumo ()
Esta foi mesmo o maior desafio, pois tive que compreender a utilização PointsMaterial, o que abriu portas para mais ideias a acrescentar ao projeto final, como flocos de neve, mas que optei por não executar, dada a dimensão que estava a ficar.

Conclusão:

As sombras aumentam o consumo de memória exponencialmente, isto porque enquanto desativas o consumo de memória do projeto anda nos [20-30] MS, caso contrário [90-140] MS, pelo que a um determinado momento (na produção dos conteúdos do inteiro) optei por não incluir as sombras em todos os objetos.

Como em qualquer trabalho que passemos muitas horas, quando chegamos ao momento da entrega, pensamos sempre que poderíamos ter otimizado este ou aquele aspeto, o que não foi exceção neste, um exemplo foi que poderia ter utilizado menos vezes a produção de material, criando todos os objetos com o mesmo material seguidos. Mas considero ter atingido todos os objetivos para este trabalho, utilizando todos os aspetos teóricos e explorado mais profundamente a framework.

Video: https://youtu.be/ZZXNwxtPbJg 
