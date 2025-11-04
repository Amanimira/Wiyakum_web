function showSuggestions() {
    const suggestions = [
        "Organize a family-friendly street food festival with heritage shows",
        "Create an interactive kids' reading club with digital stories",
        "A workshop to teach programming and AI to young people",
        "Neighborhood clean-up and beautification campaign with environmental contests",
        "A bazaar for local products and handmade crafts",
        "A mini football league for kids with prizes",
        "An art exhibition for local talents and creations",
        "A collaborative cooking workshop to learn traditional dishes"
    ];
    const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
    document.getElementById('aiInput').value = randomSuggestion;
    const textarea = document.getElementById('aiInput');
    textarea.classList.add('typing-effect');
    setTimeout(() => textarea.classList.remove('typing-effect'), 3000);
}

function generatePlan(button) {
    const input = document.getElementById('aiInput').value;
    if (!input.trim()) {
        alert('Please enter your idea first! 💡');
        return;
    }
    
    const originalText = button.innerHTML;
    button.innerHTML = '⏳ Analyzing & Generating...';
    button.disabled = true;
    
    // Add loading overlay
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'fixed inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center z-[1060]';
    loadingOverlay.innerHTML = `
        <div class="bg-white rounded-3xl p-8 text-center max-w-md mx-4 shadow-2xl border border-gray-200">
            <div class="text-6xl mb-4 animate-spin text-blue-600">🤖</div>
            <h3 class="text-xl font-bold mb-2 text-gray-900">AI at work...</h3>
            <p class="text-gray-600 mb-4">Analyzing your request and creating a comprehensive plan.</p>
            <div class="w-full bg-gray-300 rounded-full h-2">
                <div class="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full animate-pulse" style="width: 70%"></div>
            </div>
        </div>
    `;
    document.body.appendChild(loadingOverlay);
    
    // Simulate API response time
    setTimeout(() => {
        document.body.removeChild(loadingOverlay);
        updatePlanContent(input); 
        showGeneratedPlan();
        button.innerHTML = originalText;
        button.disabled = false;
        document.getElementById('aiInput').value = '';
    }, 4000);
}

function showGeneratedPlan() {
    document.querySelector('.hero-section').style.display = 'none';
    document.querySelectorAll('section.py-20').forEach(sec => sec.style.display = 'none');
    document.getElementById('generatedPlanScreen').style.display = 'block';
    window.scrollTo(0, 0);
}

function updatePlanContent(input) {
    // AI Simulation Logic based on keywords
    let planTitle = "🤖 Mini Robot Tournament";
    let eventType = "Sports Tech";
    let targetAudience = "Kids & Youth";
    
    if (input.includes('culture') || input.includes('read') || input.includes('art')) {
        planTitle = "📚 Reading & Culture Festival";
        eventType = "Cultural & Educational";
        targetAudience = "All Ages";
    } else if (input.includes('food') || input.includes('cook') || input.includes('eat')) {
        planTitle = "🍽️ Local Food Festival";
        eventType = "Food & Heritage";
        targetAudience = "Families";
    } else if (input.includes('environ') || input.includes('clean') || input.includes('green')) {
        planTitle = "🌱 Green Neighborhood Campaign";
        eventType = "Environmental & Volunteer";
        targetAudience = "The Whole Community";
    } else if (input.includes('sport') || input.includes('football') || input.includes('league')) {
        planTitle = "⚽ Neighborhood Sports League";
        eventType = "Competitive Sports";
        targetAudience = "Youth & Kids";
    }
    
    document.getElementById('planTitle').textContent = planTitle;
    document.getElementById('eventType').textContent = eventType;
    document.getElementById('targetAudience').textContent = targetAudience;
}

function goBackToDashboard() {
    document.getElementById('generatedPlanScreen').style.display = 'none';
    document.querySelector('.hero-section').style.display = 'flex';
    document.querySelectorAll('section.py-20').forEach(sec => sec.style.display = 'block');
    window.scrollTo(0, 0);
}

function editPlan() {
    alert('🛠️ The advanced plan editor is launching soon! You will be able to edit all details.');
}

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
        setTimeout(() => goBackToDashboard(), 3000);
    }, 2500);
}

function updateContribution() {
    const slider = document.getElementById('contributionSlider');
    const progressCircle = document.getElementById('progressCircle');
    if (!slider || !progressCircle) return; // Check if elements exist before processing

    const value = parseInt(slider.value);
    document.getElementById('contributionAmount').textContent = value;
    
    const totalCost = 2500;
    const participants = 50;
    const totalRaised = participants * value;
    const percentage = Math.min((totalRaised / totalCost) * 100, 100);
    const remaining = Math.max(totalCost - totalRaised, 0);
    
    document.getElementById('raisedAmount').textContent = `${totalRaised.toLocaleString()} SAR`;
    const remainingElement = document.getElementById('remainingAmount');
    const percentageText = document.getElementById('fundingPercentage');
    
    // Color logic
    progressCircle.classList.remove('text-green-600', 'text-yellow-600', 'text-blue-600', 'text-orange-600');
    percentageText.classList.remove('text-green-600', 'text-yellow-600', 'text-blue-600', 'text-orange-600');

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

    // Update circular progress (Circumference 439.82)
    const circumference = 2 * Math.PI * 70;
    const offset = circumference - (percentage / 100) * circumference;
    progressCircle.style.strokeDashoffset = offset;
}

function openModal(modalId) {
    document.getElementById(modalId).classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Global Event Listeners
document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal(modal.id);
        }
    });
});

window.addEventListener('load', () => {
    updateContribution();
});

document.addEventListener('DOMContentLoaded', function() {
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
