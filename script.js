document.addEventListener('DOMContentLoaded', () => {
    // --- Countdown Timer (Optional, if birthday is in the future) ---
    // Set your crush's birthday (Year, Month (0-11), Day, Hour, Minute, Second)
    // **IMPORTANT: The month is 0-indexed, so June is '5' if you use the numerical format**
    const birthday = new Date('June 9, 2025 00:00:00').getTime(); // Updated to June 9, 2025

    const countdownElement = document.getElementById('countdown');
    const surpriseButton = document.getElementById('surpriseButton');
    const giftSection = document.getElementById('giftSection');

    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = birthday - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (distance < 0) {
            countdownElement.textContent = "Hope you have a fantastic birthday!!";
            surpriseButton.style.display = 'block'; // Show button once birthday arrives
            clearInterval(countdownInterval); // Stop the countdown once the birthday passes
            createConfetti(); // Add confetti effect when birthday arrives
        } else {
            countdownElement.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s until your birthday!`;
            surpriseButton.style.display = 'none'; // Hide button until birthday
        }
    };

    // Update the countdown every second
    const countdownInterval = setInterval(updateCountdown, 1000);
    // Initial call to display countdown immediately
    updateCountdown();

    // --- Surprise Button Logic ---
    surpriseButton.addEventListener('click', () => {
        surpriseButton.style.display = 'none'; // Hide the button after clicking
        giftSection.style.display = 'block'; // Show the gift section
        // Note: The countdown interval is already cleared when distance < 0,
        // so no need to clear it again here if the button is only shown then.
    });

    // --- Confetti Effect (from Experiment2) ---
    function createConfetti() {
        for (let i = 0; i < 100; i++) { // Generate 100 confetti pieces
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.animationDuration = Math.random() * 3 + 2 + 's'; // 2 to 5 seconds
            confetti.style.animationDelay = Math.random() * 2 + 's'; // Delay for staggered effect
            document.body.appendChild(confetti);

            confetti.addEventListener('animationend', () => {
                confetti.remove(); // Remove confetti after animation
            });
        }
    }

    // --- (Optional) Star Effect ---
    const body = document.body;
    function createStar() {
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.width = `${Math.random() * 3 + 2}px`; // 2-5px
        star.style.height = star.style.width;
        star.style.left = `${Math.random() * 100}vw`;
        star.style.top = `${Math.random() * 100}vh`;
        star.style.animationDuration = `${Math.random() * 5 + 5}s`; // 5-10s
        star.style.animationDelay = `${Math.random() * 5}s`; // Stagger animation
        body.appendChild(star);

        // Remove star after its animation ends to prevent too many elements
        star.addEventListener('animationend', () => {
            star.remove();
        });
    }

    // Create a few stars initially and then continuously
    for (let i = 0; i < 50; i++) {
        createStar();
    }
    setInterval(createStar, 1000); // Add a new star every second
});