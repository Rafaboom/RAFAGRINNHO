// script.js

document.addEventListener('DOMContentLoaded', () => {
    const introScreen = document.getElementById('intro-screen');
    const gameScreen = document.getElementById('game-screen');
    const playButton = document.getElementById('play-button');
    const backToIntroButton = document.getElementById('back-to-intro-button'); // Novo botão
    const backgroundImageInput = document.getElementById('background-image-input');
    const backgroundContainer = document.getElementById('background-container');
    const mainVideo = document.getElementById('main-video');
    const mainImage = document.getElementById('main-image');

    // Função para fazer a transição entre telas
    function transitionToScreen(screenToShow) {
        // Esconde a tela atualmente ativa
        const activeScreen = document.querySelector('.content.active');
        if (activeScreen) {
            activeScreen.classList.remove('active');
            activeScreen.classList.add('hidden');
        }

        // Aguarda a transição de saída do conteúdo terminar (0.7s no CSS)
        // Antes de mostrar a próxima tela, para evitar sobreposição feia
        setTimeout(() => {
            // Mostra a nova tela
            screenToShow.classList.remove('hidden');
            screenToShow.classList.add('active');
        }, 700); // Deve ser igual ou ligeiramente maior que a duração da transição no CSS (.content)
    }

    // Event listener para o botão "JOGAR"
    playButton.addEventListener('click', () => {
        transitionToScreen(gameScreen);
        // Opcional: Aqui você pode mudar o fundo para o cenário do jogo
        // Por exemplo, se você tiver um vídeo/imagem diferente para o jogo:
        // mainVideo.classList.add('hidden');
        // mainImage.src = 'assets/game-background.jpg'; // Substitua pelo caminho da sua imagem
        // mainImage.classList.remove('hidden');
    });

    // Event listener para o botão "Voltar à Tela Inicial"
    backToIntroButton.addEventListener('click', () => {
        transitionToScreen(introScreen);
        // Opcional: Voltar o fundo para o vídeo original da introdução
        // mainImage.classList.add('hidden');
        // mainVideo.classList.remove('hidden');
    });

    // Event listener para o input de imagem de fundo
    backgroundImageInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                // Esconde o vídeo (se estiver visível)
                if (!mainVideo.classList.contains('hidden')) {
                    mainVideo.classList.add('hidden');
                }
                // Define o src da imagem e a mostra
                mainImage.src = e.target.result;
                mainImage.classList.remove('hidden');

                // Opcional: Adicionar um pequeno fade no próprio background-container
                backgroundContainer.style.opacity = 6;
                setTimeout(() => {
                    backgroundContainer.style.opacity = 1;
                }, 50); // Pequeno delay para forçar a transição
            };
            reader.readAsDataURL(file); // Lê o arquivo como uma URL de dados
        }
    });

    // Certificar-se de que a tela inicial esteja visível ao carregar
    introScreen.classList.add('active');
    introScreen.classList.remove('hidden');
});