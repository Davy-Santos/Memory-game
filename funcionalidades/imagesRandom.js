document.addEventListener("DOMContentLoaded", () => {
    const levelButtons = {
        easy: { selector: ".easy .level-button", count: 3 },
        medium: { selector: ".medium .level-button", count: 6 },
        hard: { selector: ".hard .level-button", count: 10 }
    };

    Object.values(levelButtons).forEach(({ selector, count }) => {
        const button = document.querySelector(selector);
        if (button) {
            button.addEventListener("click", () => {
                const baseImages = [
                    "../IMG/geto.jpg",
                    "../IMG/gojoBlack.png",
                    "../IMG/gojoPurple.jpg",
                    "../IMG/inumake.jpg",
                    "../IMG/itadori.jpg",
                    "../IMG/mahito.jpg",
                    "../IMG/megumi.jpg",
                    "../IMG/nobara.jpg",
                    "../IMG/sukeye.jpg",
                    "../IMG/yuta.jpg"
                ];

                // Selecionar aleatoriamente imagens da lista
                let selectedImages = [];
                while (selectedImages.length < count) {
                    const randomImage = baseImages[Math.floor(Math.random() * baseImages.length)];
                    if (!selectedImages.includes(randomImage)) {
                        selectedImages.push(randomImage);
                    }
                }

                // Criar pares idênticos
                let imagePairs = [];
                selectedImages.forEach(img => {
                    imagePairs.push(img, img);
                });

                // Embaralhar a lista de imagens
                for (let i = imagePairs.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [imagePairs[i], imagePairs[j]] = [imagePairs[j], imagePairs[i]];
                }

                // Salvar no localStorage para usar na outra página
                localStorage.setItem("shuffledImages", JSON.stringify(imagePairs));
            });
        }
    });
});
