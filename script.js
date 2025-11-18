// ============================================
// Wiyakum × ROSHN - Fixed Version
// Full Details Display + Complete Marketing Plan
// ============================================

console.log('🚀 Wiyakum × ROSHN Loading...');

// ============================================
// دالة عرض الاقتراحات
// ============================================

function showSuggestions() {
    const suggestions = [
        "🤖 بطولة الروبوتات الصغيرة - Mini Robot Tournament",
        "⚽ دوري كرة القدم الودي - Friendly Football League",
        "📚 ندوة الكتاب الشهرية - Monthly Book Club",
        "🎨 ورشة الرسم والفن - Art Workshop",
        "💻 ورشة البرمجة للمبتدئين - Coding Workshop",
        "🏃 ماراثون الصحة واللياقة - Health Marathon",
        "🎭 عرض مسرحي عائلي - Family Theater",
        "🍳 ورشة الطهي التقليدي - Cooking Workshop",
        "🎸 حفل موسيقي جماعي - Music Concert",
        "📖 قصص للأطفال - Kids Storytelling"
    ];
    
    const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
    const inputElement = document.getElementById('aiInput');
    
    if (inputElement) {
        inputElement.value = randomSuggestion;
        inputElement.classList.add('typing-effect');
        setTimeout(() => inputElement.classList.remove('typing-effect'), 2000);
    }
}

// ============================================
// توليد الخطة
// ============================================

function generatePlan(button) {
    const input = document.getElementById('aiInput');
    if (!input || !input.value.trim()) {
        alert('⚠️ الرجاء إدخال فكرتك أولاً!\nPlease enter your idea first!');
        return;
    }
    
    const originalText = button.innerHTML;
    button.innerHTML = '⏳ جاري التحليل...';
    button.disabled = true;
    
    setTimeout(() => {
        updatePlanContent(input.value);
        showModal();
        button.innerHTML = originalText;
        button.disabled = false;
        input.value = '';
    }, 2500);
}

// ============================================
// عرض وإخفاء المودال
// ============================================

function showModal() {
    const modal = document.getElementById('generatedPlanModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const modal = document.getElementById('generatedPlanModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// ============================================
// تحديث محتوى الخطة - قاعدة بيانات كاملة
// ============================================

function updatePlanContent(input) {
    const inputLower = input.toLowerCase();
    
    // قاعدة بيانات شاملة
    const eventDatabase = {
        "روبوت|robot": {
            title: "🤖 بطولة الروبوتات الصغيرة",
            type: "تقني وتعليمي",
            audience: "الأطفال والشباب (8-16 سنة)",
            scheduledTime: "السبت، 15 ديسمبر، 5:00 مساءً - 8:00 مساءً",
            date: "Saturday, Dec 15, 5:00 PM - 8:00 PM",
            venue: "مركز الحي الرياضي - القاعة الرئيسية",
            totalCost: "2,500",
            amountRaised: "1,250",
            needed: "1,250",
            percentage: "50",
            suggestedContribution: "25",
            supervisor: "مدرب روبوتات معتمد - تم تأكيده ✓",
            equipment: [
                "روبوتات صغيرة (10 مجموعات)",
                "حلبة تحديات وعوائق",
                "جوائز وميداليات للفائزين",
                "أجهزة كمبيوتر لبرمجة الروبوتات",
                "مكبرات صوت وإضاءة احترافية"
            ],
            marketingChannels: [
                "تطبيق ROSHN الرسمي",
                "مجموعات واتساب الآباء",
                "لوحات إعلانات في المراكز",
                "بريد إلكتروني للعائلات",
                "منشورات إنستقرام وتيك توك"
            ],
            marketingDraft: "🤖 بطولة الروبوتات الصغيرة - تحدَّ المستقبل!\n\n🚀 انضم إلينا في مغامرة تقنية مثيرة! سيتنافس الأطفال والشباب في بناء وبرمجة روبوتات صغيرة.\n\n📅 التاريخ: السبت 15 ديسمبر، 5-8 مساءً\n📍 المكان: مركز الحي الرياضي\n🎯 الأعمار: 8-16 سنة\n💰 المساهمة: 25 ريال فقط\n\n🔗 رابط التسجيل: سيتم توليده تلقائياً"
        },
        "كرة|football": {
            title: "⚽ دوري كرة القدم الودي",
            type: "رياضي",
            audience: "الشباب والكبار (14+)",
            scheduledTime: "الجمعة، 20 ديسمبر، 4:00 مساءً - 7:00 مساءً",
            date: "Friday, Dec 20, 4:00 PM - 7:00 PM",
            venue: "ملعب روشن الرياضي الرئيسي",
            totalCost: "2,000",
            amountRaised: "1,200",
            needed: "800",
            percentage: "60",
            suggestedContribution: "30",
            supervisor: "حكم معتمد - تم تأكيده ✓",
            equipment: [
                "5 كرات قدم احترافية",
                "أهداف وشباك",
                "مياه وإسعافات أولية",
                "كؤوس وميداليات"
            ],
            marketingChannels: [
                "تطبيق ROSHN - الرياضة",
                "مجموعات الرياضيين",
                "ملعب روشن"
            ],
            marketingDraft: "⚽ دوري كرة القدم الودي!\n\n📅 الجمعة 20 ديسمبر، 4-7 مساءً\n📍 ملعب روشن\n💰 30 ريال\n\n🔗 سجّل الآن"
        },
        "قراءة|book|كتاب": {
            title: "📚 ندوة الكتاب الشهرية",
            type: "ثقافي",
            audience: "محبو القراءة",
            scheduledTime: "الثلاثاء، 10 ديسمبر، 6:00 مساءً - 8:00 مساءً",
            date: "Tuesday, Dec 10, 6:00 PM - 8:00 PM",
            venue: "مكتبة روشن المجتمعية",
            totalCost: "800",
            amountRaised: "500",
            needed: "300",
            percentage: "62",
            suggestedContribution: "20",
            supervisor: "ميسر ثقافي - تم تأكيده ✓",
            equipment: [
                "30 نسخة من الكتاب",
                "مقاعد مريحة",
                "ضيافة خفيفة"
            ],
            marketingChannels: [
                "تطبيق ROSHN - الثقافة",
                "مكتبة روشن",
                "مجموعات القراءة"
            ],
            marketingDraft: "📚 ندوة الكتاب!\n\n📅 الثلاثاء 10 ديسمبر\n📍 مكتبة روشن\n💰 20 ريال"
        },
        "رسم|art|فن": {
            title: "🎨 ورشة الرسم والفن",
            type: "فني",
            audience: "جميع الأعمار",
            scheduledTime: "الأربعاء، 18 ديسمبر، 4:00 مساءً - 6:00 مساءً",
            date: "Wednesday, Dec 18, 4:00 PM - 6:00 PM",
            venue: "استوديو الفنون - روشن",
            totalCost: "1,200",
            amountRaised: "720",
            needed: "480",
            percentage: "60",
            suggestedContribution: "40",
            supervisor: "فنان معتمد - تم تأكيده ✓",
            equipment: [
                "30 لوحة رسم",
                "فرش وألوان",
                "مآزر حماية"
            ],
            marketingChannels: [
                "تطبيق ROSHN - الفنون",
                "استوديو الفنون"
            ],
            marketingDraft: "🎨 ورشة الرسم!\n\n📅 الأربعاء 18 ديسمبر\n💰 40 ريال"
        },
        "برمجة|programming|code": {
            title: "💻 ورشة البرمجة للمبتدئين",
            type: "تقني",
            audience: "المبتدئين (10+)",
            scheduledTime: "الخميس، 21 ديسمبر، 10:00 صباحاً - 1:00 مساءً",
            date: "Thursday, Dec 21, 10:00 AM - 1:00 PM",
            venue: "معمل روشن التقني",
            totalCost: "1,500",
            amountRaised: "900",
            needed: "600",
            percentage: "60",
            suggestedContribution: "45",
            supervisor: "مدرب معتمد - تم تأكيده ✓",
            equipment: [
                "30 جهاز كمبيوتر",
                "برامج تعليمية",
                "شهادات مشاركة"
            ],
            marketingChannels: [
                "تطبيق ROSHN - التقنية",
                "معمل روشن"
            ],
            marketingDraft: "💻 ورشة البرمجة!\n\n📅 الخميس 21 ديسمبر\n💰 45 ريال"
        }
    };
    
    // البحث عن تطابق
    let matchedEvent = null;
    for (const [keywords, eventData] of Object.entries(eventDatabase)) {
        const keywordList = keywords.split('|');
        if (keywordList.some(keyword => inputLower.includes(keyword))) {
            matchedEvent = eventData;
            break;
        }
    }
    
    // خطة افتراضية
    if (!matchedEvent) {
        matchedEvent = {
            title: "🎉 " + input,
            type: "فعالية مجتمعية",
            audience: "الجميع",
            scheduledTime: "نهاية الأسبوع - 5:00 مساءً",
            date: "Weekend - 5:00 PM",
            venue: "مركز روشن المجتمعي",
            totalCost: "1,500",
            amountRaised: "900",
            needed: "600",
            percentage: "60",
            suggestedContribution: "40",
            supervisor: "مشرف معتمد ✓",
            equipment: ["معدات أساسية", "ضيافة خفيفة"],
            marketingChannels: ["تطبيق ROSHN", "مجموعات واتساب"],
            marketingDraft: "فعالية رائعة في روشن!\n\n📅 قريباً\n📍 مركز روشن"
        };
    }
    
    // تحديث العناصر
    updateElement('planTitle', matchedEvent.title);
    updateElement('eventType', matchedEvent.type);
    updateElement('targetAudience', matchedEvent.audience);
    updateElement('scheduledTime', matchedEvent.scheduledTime);
    updateElement('suggestedDate', matchedEvent.date);
    updateElement('suggestedVenue', matchedEvent.venue);
    updateElement('totalCost', matchedEvent.totalCost + ' SAR');
    updateElement('amountRaised', matchedEvent.amountRaised + ' SAR');
    updateElement('needed', matchedEvent.needed + ' SAR');
    updateElement('fundingPercentage', matchedEvent.percentage + '%');
    updateElement('suggestedContribution', matchedEvent.suggestedContribution + ' SAR');
    updateElement('approvedSupervisor', matchedEvent.supervisor);
    
    // تحديث المعدات
    const equipmentList = document.getElementById('equipmentList');
    if (equipmentList && matchedEvent.equipment) {
        equipmentList.innerHTML = matchedEvent.equipment.map(item => `
            <li class="flex items-start gap-3 p-3 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-colors">
                <span class="text-emerald-600 text-xl">✓</span>
                <span class="text-gray-700">${item}</span>
            </li>
        `).join('');
    }
    
    // تحديث قنوات التسويق
    const marketingList = document.getElementById('marketingChannelsList');
    if (marketingList && matchedEvent.marketingChannels) {
        const icons = ['📱', '💬', '📋', '📧', '📸'];
        marketingList.innerHTML = matchedEvent.marketingChannels.map((channel, i) => `
            <div class="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl flex items-center gap-3 hover:shadow-md transition-shadow">
                <span class="text-2xl">${icons[i % 5]}</span>
                <span class="text-gray-700">${channel}</span>
            </div>
        `).join('');
    }
    
    // تحديث البيان التسويقي
    const marketingDraft = document.getElementById('marketingDraft');
    if (marketingDraft) {
        marketingDraft.innerHTML = `
            <div class="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200">
                <h4 class="text-xl font-bold text-purple-900 mb-4 flex items-center gap-2">
                    <span class="text-2xl">📢</span>
                    البيان الترويجي - Marketing Draft
                </h4>
                <div class="bg-white rounded-xl p-4 whitespace-pre-line text-gray-700 leading-relaxed">
${matchedEvent.marketingDraft}
                </div>
            </div>
        `;
    }
}

// ============================================
// دوال مساعدة
// ============================================

function updateElement(id, value) {
    const element = document.getElementById(id);
    if (element) {
        element.textContent = value;
    }
}

function submitForApproval(button) {
    const originalText = button.innerHTML;
    button.innerHTML = '⏳ جاري التقديم...';
    button.disabled = true;
    
    setTimeout(() => {
        alert('🎉 تم تقديم خطتك بنجاح!\n\n✅ ستتلقى بريد تأكيد خلال ساعة');
        button.innerHTML = originalText;
        button.disabled = false;
        setTimeout(() => closeModal(), 2000);
    }, 2000);
}

// ============================================
// التهيئة
// ============================================

window.addEventListener('load', () => {
    console.log('✅ Wiyakum × ROSHN Ready!');
    
    const modal = document.getElementById('generatedPlanModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }
});

console.log('%c🚀 Wiyakum × ROSHN', 'background: #3b82f6; color: white; font-size: 20px; padding: 10px;');
