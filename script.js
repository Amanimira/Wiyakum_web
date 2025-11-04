/**
 * Wiyakum Front-end Logic
 * This script handles all dashboard interactions, AI simulation, and UI state management.
 */

// --- CONFIGURATION / MOCK DATA ---
const SUGGESTIONS = [
    "Organize a family-friendly street food festival with heritage shows",
    "Create an interactive kids' reading club with digital stories",
    "A workshop to teach programming and AI to young people",
    "Neighborhood clean-up and beautification campaign with environmental contests",
    "A bazaar for local products and handmade crafts",
    "A mini football league for kids with prizes",
    "An art exhibition for local talents and creations",
    "A collaborative cooking workshop to learn traditional dishes"
];

// NOTE: Replace this placeholder with your actual n8n Webhook URL.
const N8N_WEBHOOK_URL = "YOUR_N8N_WEBHOOK_URL_HERE"; 

const FUNDING_TOTAL_COST = 2500;
const FUNDING_PARTICIPANTS = 50;
const PROGRESS_CIRCLE_RADIUS = 70;
const CIRCUMFERENCE = 2 * Math.PI * PROGRESS_CIRCLE_RADIUS;

// --- CORE FUNCTIONS ---

/**
 * Populates the AI input field with a random suggestion and triggers a typing animation.
 */
function showSuggestions() {
    const randomSuggestion = SUGGESTIONS[Math.floor(Math.random() * SUGGESTIONS.length)];
    const textarea = document.getElementById('aiInput');
    
    if (textarea) {
        textarea.value = randomSuggestion;
        textarea.classList.add('typing-effect');
        setTimeout(() => textarea.classList.remove('typing-effect'), 3000);
    }
}

/**
 * Initiates the AI plan generation process by sending the user idea to an n8n Webhook.
 * @param {HTMLButtonElement} button - The 'Get Started' button element.
 */
async function generatePlan(button) {
    const input = document.getElementById('aiInput').value;
    if (!input.trim()) {
        alert('Please enter your idea first! 💡');
        return;
    }
    
    // UI: Show loading state
    const originalText = button.innerHTML;
    button.innerHTML = '⏳ Analyzing & Generating...';
    button.disabled = true;
    
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'fixed inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center z-[1060]';
    loadingOverlay.innerHTML = `
        <div class="bg-white rounded-3xl p-8 text-center max-w-md mx-4 shadow-2xl border border-gray-200">
            <div class="text-6xl mb-4 animate-spin text-blue-600">🤖</div>
            <h3 class="text-xl font-bold mb-2 text-gray-900">Connecting to AI Workflow...</h3>
            <p class="text-gray-600 mb-4">Sending your idea to n8n for plan generation.</p>
            <div class="w-full bg-gray-300 rounded-full h-2">
                <div class="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full animate-pulse" style="width: 70%"></div>
            </div>
        </div>
    `;
    document.body.appendChild(loadingOverlay);

    try {
        // --- API CALL TO N8N WEBHOOK ---
        const response = await fetch(N8N_WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                userIdea: input,
                timestamp: new Date().toISOString()
            })
        });

        if (!response.ok) {
             throw new Error(`n8n Webhook failed with status: ${response.status}`);
        }
        
        // Assuming n8n returns a JSON object with the generated plan data
        const planData = await response.json(); 

        // Update UI with actual data
        updatePlanContentFromN8n(planData); 
        showGeneratedPlan();

    } catch (error) {
        console.error('Error integrating with n8n/AI:', error);
        alert(`❌ Failed to process the request. Error: ${error.message}. Please check your n8n Webhook URL.`);
        
        // Fallback or demonstration mode (optional): use keyword simulation on failure
        updatePlanContentFromN8n({ 
            title: "Plan Generation Failed (Simulated)", 
            type: "Error/Fallback", 
            audience: "Community Members" 
        });
        showGeneratedPlan();

    } finally {
        // UI: Restore button state
        document.body.removeChild(loadingOverlay);
        button.innerHTML = originalText;
        button.disabled = false;
        document.getElementById('aiInput').value = '';
    }
}

/**
 * Updates the plan content based on actual data returned from the n8n workflow.
 * This assumes the n8n workflow returns a JSON object like: 
 * { title: "...", type: "...", audience: "..." }
 * @param {Object} data - The JSON data returned from the n8n webhook response node.
 */
function updatePlanContentFromN8n(data) {
    const planTitle = data.title || "Plan Generated (Title Missing)";
    const eventType = data.type || "General Event";
    const targetAudience = data.audience || "Community Members";
    
    document.getElementById('planTitle').textContent = planTitle;
    document.getElementById('eventType').textContent = eventType;
    document.getElementById('targetAudience').textContent = targetAudience;
    
    // Note: If n8n returns dynamic cost data, you would update FUNDING_TOTAL_COST here
    // before calling updateContribution().
    updateContribution();
}


/**
 * Hides the dashboard and shows the generated plan screen.
 */
function showGeneratedPlan() {
    const heroSection = document.querySelector('.hero-section');
    const utilitySections = document.querySelectorAll('section.py-20');
    const planScreen = document.getElementById('generatedPlanScreen');
    
    if (heroSection) heroSection.style.display = 'none';
    utilitySections.forEach(sec => sec.style.display = 'none');
    if (planScreen) planScreen.style.display = 'block';
    
    window.scrollTo(0, 0);
}


/**
 * Reverts the view back to the main dashboard.
 */
function goBackToDashboard() {
    const planScreen = document.getElementById('generatedPlanScreen');
    const heroSection = document.querySelector('.hero-section');
    const utilitySections = document.querySelectorAll('section.py-20');
    
    if (planScreen) planScreen.style.display = 'none';
    if (heroSection) heroSection.style.display = 'flex';
    utilitySections.forEach(sec => sec.style.display = 'block');
    
    window.scrollTo(0, 0);
}

/**
 * Simulates submitting the plan for final approval.
 * @param {HTMLButtonElement} button - The submit button element.
 */
function submitForApproval(button) {
    const originalText = button.innerHTML;
    button.innerHTML = '⏳ Submitting...';
    button.disabled = true;
    
    setTimeout(() => {
        alert('🎉 Your plan has been successfully submitted for final approval!\n\n✅ You will receive a confirmation message within 5 minutes.\n📧 The registration link will be generated automatically.\n💰 Crowdfunding will begin immediately.');
        
        button.innerHTML = originalText;
        button.disabled = false;
        button.classList.add('animate-bounce');
        setTimeout(() => button.classList.remove('animate-bounce'), 2000);
        
        // Return to dashboard after successful submission
        setTimeout(() => goBackToDashboard(), 3000);
    }, 2500);
}


/**
 * Updates the crowdfunding display based on the slider value.
 */
function updateContribution() {
    const slider = document.getElementById('contributionSlider');
    const progressCircle = document.getElementById('progressCircle');
    if (!slider || !progressCircle) return; 

    const value = parseInt(slider.value);
    document.getElementById('contributionAmount').textContent = value;
    
    const totalRaised = FUNDING_PARTICIPANTS * value;
    const percentage = Math.min((totalRaised / FUNDING_TOTAL_COST) * 100, 100);
    const remaining = Math.max(FUNDING_TOTAL_COST - totalRaised, 0);
    
    document.getElementById('raisedAmount').textContent = `${totalRaised.toLocaleString()} SAR`;
    const remainingElement = document.getElementById('remainingAmount');
    const percentageText = document.getElementById('fundingPercentage');
    
    // Color logic and text update
    progressCircle.className = progressCircle.className.replace(/text-(green|yellow|blue|orange)-600/g, '').trim();
    percentageText.className = percentageText.className.replace(/text-(green|yellow|blue|orange)-600/g, '').trim();

    if (percentage >= 100) {
        remainingElement.textContent = 'Funded! 🎉';
        progressCircle.classList.add('text-green-600');
        percentageText.classList.add('text-green-600');
    } else {
        remainingElement.textContent = `${remaining.toLocaleString()} SAR`;
        if (percentage >= 75) {
            progressCircle.classList.add('text-yellow-600');
            percentageText.classList.add('text-yellow-600');
        } else if (percentage >= 50) {
            progressCircle.classList.add('text-orange-600');
            percentageText.classList.add('text-orange-600');
        } else {
            progressCircle.classList.add('text-blue-600');
            percentageText.classList.add('text-blue-600');
        }
    }
    
    percentageText.textContent = `${Math.round(percentage)}%`;

    // Update circular progress offset
    const offset = CIRCUMFERENCE - (percentage / 100) * CIRCUMFERENCE;
    progressCircle.style.strokeDashoffset = offset;
}

/**
 * Displays a modal window.
 * @param {string} modalId - The ID of the modal div.
 */
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

/**
 * Hides a modal window.
 * @param {string} modalId - The ID of the modal div.
 */
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// --- INITIALIZATION AND EVENT LISTENERS ---

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initial funding status load
    updateContribution();

    // 2. Close modal when clicking outside
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal.id);
            }
        });
    });

    // 3. Smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});