// Inicializacao das variaveis
var altura = 0;
var largura = 0;
var vidas = 1;
var tempo = 10;
var nivel = window.location.search;
nivel = nivel.replace('?', ''); // Remove o ? da URI
var tempoDonuts = 2000;

//Aplica dificuldade de acordo com nivel selecionado
if(nivel === 'facil') {
    tempoDonuts = 1500;
} else if(nivel === 'medio'){
    tempoDonuts = 1000;
} else {
    tempoDonuts = 750;
}

// Pega o tamanho da tela do usuario
function tamanhoTela() {
    var altura = window.innerHeight;
    var largura = window.innerWidth;

    // Cronometro inicializado
    document.querySelector('#jogo-tempo').innerHTML = tempo;

    // Inicia loop do jogo
    var iniciaJogo = setInterval(function () {
        posicaoRandom(altura, largura);
    }, tempoDonuts);

    // Cronometro de tempo
    var cronometro = setInterval(function () {

        tempo -= 1;

        if (tempo < 0) {
            clearInterval(cronometro);
            clearInterval(iniciaJogo);
            alert('Você ganhou!');
            window.location.href = 'index.html';
        }

        document.querySelector('#jogo-tempo').innerHTML = tempo;
    }, 1000);
} tamanhoTela();

// Gerador de posicoes aleatorias
function posicaoRandom(altura, largura) {
    var posicaoX = Math.abs(Math.floor(Math.random() * largura - 90));
    var posicaoY = Math.abs(Math.floor(Math.random() * altura - 100));

    donutsAleatorio(posicaoX, posicaoY);
}

// Cria o donuts.
function donutsAleatorio(posicaoX, posicaoY) {
    var donuts = document.createElement('img');
    var tipoDonuts = sorteiaDonuts();

    donuts.src = 'imagens/' + tipoDonuts;
    donuts.className = tamanhoDonuts();
    donuts.setAttribute('data-target', tipoDonuts);

    donuts.style.position = 'absolute';
    donuts.style.left = posicaoX + 'px';
    donuts.style.top = posicaoY + 'px';

    donuts.id = 'donuts';

    document.body.appendChild(donuts);
    
    donuts.onclick = function () {
        if (donuts.getAttribute('data-target') === 'donuts-sem-recheio.png') {
            document.querySelector('#vida' + vidas).src = './imagens/coracao_vazio.png';
            vidas++;
        }

        this.remove();
    }
    
    if (vidas > 3) {
        alert('Game-Over!');
        window.location.href = 'index.html';
    }

    // Remove o donuts criado anteriormente se existir
    setTimeout(function(){
        if (document.querySelector('#donuts')) {

            // Remove vida se não clicado no donuts certo antes do tempo
            if (donuts.getAttribute('data-target') === 'donuts-recheado.png') {
                document.querySelector('#vida' + vidas).src = './imagens/coracao_vazio.png';
                vidas++;
            }

            document.querySelector('#donuts').remove();
        }
    }, tempoDonuts - 100)
}

// Sorteia o tipo do donuts
function sorteiaDonuts() {
    var source = Math.floor(Math.random() * 2);

    switch (source) {
        case 0:
            return 'donuts-recheado.png';
        case 1:
            return 'donuts-sem-recheio.png';
    }
}

// Tamanho dinamico do donuts
function tamanhoDonuts() {
    var classeDonuts = Math.floor(Math.random() * 3);

    switch (classeDonuts) {
        case 0:
            return 'donuts-pequeno';
        case 1:
            return 'donuts-medio';
        case 2:
            return 'donuts-grande';
    }
}