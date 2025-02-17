document.addEventListener("DOMContentLoaded", () => {
    // Redireciona para index.html ao recarregar a página
    if (performance.navigation.type === 1) {
        window.location.href = "../index.html";
    }

    const cards = document.querySelectorAll(".card");
    const cardBackImages = document.querySelectorAll(".card-back img");
    let flippedCards = [];
    let matchedPairs = 0;

    const storedImages = localStorage.getItem("shuffledImages");
    
    if (storedImages) {
        const shuffledImages = JSON.parse(storedImages);
        
        cardBackImages.forEach((img, index) => {
            img.src = shuffledImages[index];
        });

        localStorage.removeItem("shuffledImages");
    }

    cards.forEach(card => {
        card.addEventListener("click", () => {
            if (flippedCards.length < 2 && !card.querySelector(".card-inner").classList.contains("flipped")) {
                card.querySelector(".card-inner").classList.add("flipped");
                flippedCards.push(card);
            }

            if (flippedCards.length === 2) {
                const [firstCard, secondCard] = flippedCards;
                const firstImage = firstCard.querySelector(".card-back img").src;
                const secondImage = secondCard.querySelector(".card-back img").src;

                if (firstImage !== secondImage) {
                    setTimeout(() => {
                        flippedCards.forEach(flippedCard => flippedCard.querySelector(".card-inner").classList.remove("flipped"));
                        flippedCards = [];
                    }, 1000);
                } else {
                    matchedPairs++;
                    flippedCards = [];

                    if (matchedPairs === cards.length / 2) {
                        setTimeout(() => {
                            const victoryMessage = document.createElement("div");
                            victoryMessage.classList.add("victory-message");
                            victoryMessage.innerHTML = `
                                <h1>🎉 Você Venceu! 🎉</h1>
                                <p>Parabéns! Você completou o desafio com sucesso.</p>
                            `;
                            document.body.appendChild(victoryMessage);
                        }, 500);
                    }
                }
            }
        });
    });
});
