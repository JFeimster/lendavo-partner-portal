/**
 * Lendavo Partner Portal - Core Logic
 * Handles the Trust Equity Calculator and System Status Pulses
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. TRUST EQUITY LEAKAGE CALCULATOR
    // ==========================================
    
    // Note: You will need to add these exact IDs to your index.html
    const clientSlider = document.getElementById('clientSlider');
    const denialCount = document.getElementById('denialCount');
    const lostCommission = document.getElementById('lostCommission');

    // Strategic Constants (Based on 2026 Metrics)
    const REJECTION_RATE = 0.54; 
    const AVG_COMMISSION_PER_CLIENT = 1500; // Estimated baseline commission

    function updateCalculator() {
        if (!clientSlider || !denialCount || !lostCommission) return;

        const referrals = parseInt(clientSlider.value, 10);
        
        // Calculate the math based on the 54% rejection wall
        const denials = Math.round(referrals * REJECTION_RATE);
        const lostRevenue = denials * AVG_COMMISSION_PER_CLIENT;

        // Update the DOM with the terrifying reality (Loss Aversion trigger)
        denialCount.innerHTML = `~${denials} Clients <span class="text-xs text-gray-500 font-normal ml-1">(Lost to algorithms)</span>`;
        lostCommission.textContent = `$${lostRevenue.toLocaleString()}/mo`;
    }

    if (clientSlider) {
        clientSlider.addEventListener('input', updateCalculator);
        // Initialize math on load
        updateCalculator(); 
    }

    // ==========================================
    // 2. SYSTEM STATUS "SOCIAL PROOF" PULSE
    // ==========================================
    
    // Note: You will need to add id="socialProofBox" and id="socialProofContent" to your HTML
    const proofBox = document.getElementById('socialProofBox');
    const proofContent = document.getElementById('socialProofContent');

    // Mock Data Feed (Replace with real data via API later if desired)
    const feedData = [
        { role: 'CPA', location: 'Chicago', amount: '$150,000' },
        { role: 'Business Coach', location: 'Austin', amount: '$75,000' },
        { role: 'Loan Officer', location: 'Miami', amount: '$250,000' },
        { role: 'Consulting Agency', location: 'Denver', amount: '$110,000' },
        { role: 'Tax Advisor', location: 'Atlanta', amount: '$300,000' }
    ];

    let currentFeedIndex = 0;

    function triggerSystemPulse() {
        if (!proofBox || !proofContent) return;

        // 1. Fade out the current notification
        proofBox.style.opacity = '0';
        proofBox.style.transform = 'translateY(10px)';
        proofBox.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';

        // 2. Wait for fade, swap data, and fade back in
        setTimeout(() => {
            currentFeedIndex = (currentFeedIndex + 1) % feedData.length;
            const data = feedData[currentFeedIndex];

            proofContent.innerHTML = `
                <p class="text-xs text-gray-300"><span class="text-white font-semibold">${data.role} in ${data.location}</span> just secured</p>
                <p class="text-xs text-brand-accent font-mono">${data.amount} via Lendavo Protocol</p>
            `;

            // Fade back in
            proofBox.style.opacity = '1';
            proofBox.style.transform = 'translateY(0)';
            
        }, 600); // Matches the CSS transition time
    }

    // Initialize the continuous pulse every 7 seconds
    if (proofBox) {
        // Ensure CSS starts ready for transitions
        proofBox.style.opacity = '1'; 
        setInterval(triggerSystemPulse, 7000);
    }
});
