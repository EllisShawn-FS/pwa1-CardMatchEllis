// Imports your SCSS stylesheet
import '@/styles/index.scss';


(function () {
    const gameSection = document.getElementById('game-section')!;
    const attemptsDisplay = document.getElementById('attempt-counter')!;
    const resultDisplay = document.getElementById('results')!;
    const startButton = document.getElementById('reset-btn')!;

    let attemptsLeft = 3;
    let flippedCards: HTMLElement[] = [];
    let matchedPairs = 0; 
    const totalPairs = 3; 
    const cardValues: number[] = [1, 1, 2, 2, 3, 3];

    // Shuffle function
    const shuffleCards = (array: number[]): number[] => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    // Create card
    const createCard = (value: number): HTMLElement => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-value', value.toString());

        // Front and back sides
        const cardFront = document.createElement('div');
        cardFront.classList.add('card-front');
        cardFront.textContent = value.toString(); 

        const cardBack = document.createElement('div');
        cardBack.classList.add('card-back');
        cardBack.textContent = "❓"; 

        card.appendChild(cardFront);
        card.appendChild(cardBack);

        // Click event
        card.addEventListener('click', () => {
            flipCard(card);
        });

        return card;
    };

    // Flip card function
    const flipCard = (card: HTMLElement): void => {
        if (flippedCards.includes(card) || flippedCards.length >= 2) return;
    
        card.classList.add('flipped');
        flippedCards.push(card);
    
        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 500);
        }
    };

    // Check for match
    const checkMatch = (): void => {
        const [card1, card2] = flippedCards;
    
        if (!card1 || !card2) return;
    
        if (card1.dataset.value === card2.dataset.value) {
            card1.classList.add('matched');
            card2.classList.add('matched');
            flippedCards = []; 
            matchedPairs++;
    
            if (matchedPairs === totalPairs) {
                resultDisplay.textContent = 'You Won :)';
                return;
            }
        } else {
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                flippedCards = []; 
                attemptsLeft--;
                attemptsDisplay.textContent = `Attempts Left: ${attemptsLeft}`;
    
                if (attemptsLeft === 0) {
                    resultDisplay.textContent = 'You Lost :(';
                    return;
                }
            }, 1000); 
        }
    };

    // Setup game
    const setupGame = (): void => {
        gameSection.innerHTML = '';
        resultDisplay.textContent = '';
        attemptsLeft = 3;
        matchedPairs = 0;
        attemptsDisplay.textContent = `Attempts Left: ${attemptsLeft}`;
        flippedCards = [];

        const shuffledValues = shuffleCards([...cardValues]);

        shuffledValues.forEach((value) => {
            const card = createCard(value);
            gameSection.appendChild(card);
        });
    };

    startButton.addEventListener('click', setupGame);
})();