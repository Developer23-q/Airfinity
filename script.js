/* --- MOCK DATA --- */
const LOCATIONS_DB = [
    {
        id: 1,
        name: "Kyoto, Japan",
        desc: "Experience the perfect blend of ancient culture and modern life. Famous for its classical Buddhist temples, as well as gardens, imperial palaces, Shinto shrines and traditional wooden houses.",
        image: "https://picsum.photos/seed/kyoto/800/1200",
        affiliateLink: "https://example.com/book-kyoto",
        tags: ["Culture & Exploration", "Slow & Immersive", "Immersive Cultural Experiences", "Relaxation & Fun"],
        dietary: ["Vegan", "Vegetarian", "Non-Vegetarian"],
        accessibility: true,
        companions: ["alone", "Couple", "Friends"]
    },
    {
        id: 2,
        name: "Reykjavik, Iceland",
        desc: "A land of fire and ice. Perfect for thrill-seekers looking for adventure, sustainable travel, and eco-friendly landscapes that look like another planet.",
        image: "https://picsum.photos/seed/iceland/800/1200",
        affiliateLink: "https://example.com/book-iceland",
        tags: ["Adventure & Thrill", "Sustainable & Conscious", "Eco-Friendly & Responsible"],
        dietary: ["Vegan", "Vegetarian", "No Preference"],
        accessibility: true,
        companions: ["Solo", "Couple", "Friends"]
    },
    {
        id: 3,
        name: "Bali, Indonesia",
        desc: "Known for its forested volcanic mountains, iconic rice paddies, beaches and coral reefs. A hub for relaxation, yoga, and spiritual retreats.",
        image: "https://picsum.photos/seed/bali/800/1200",
        affiliateLink: "https://example.com/book-bali",
        tags: ["Relaxation & Calm", "Budget-Friendly & Practical", "Religious-Friendly & Respectful", "Slow & Immersive"],
        dietary: ["Vegan", "Vegetarian"],
        accessibility: false,
        companions: ["Solo", "Couple", "Friends", "Family"]
    },
    {
        id: 4,
        name: "Las Vegas, USA",
        desc: "The entertainment capital of the world. Featuring luxury resorts, high-end shopping, fine dining, and a vibrant nightlife scene.",
        image: "https://picsum.photos/seed/vegas/800/1200",
        affiliateLink: "https://example.com/book-vegas",
        tags: ["Luxury & Comfort", "Social / Nightlife & Connection", "Adventure & Thrill"],
        dietary: ["Non-Vegetarian", "No Preference"],
        accessibility: true,
        companions: ["Couple", "Friends"]
    },
    {
        id: 5,
        name: "Tuscany, Italy",
        desc: "A region in central Italy with rolling hills, vineyards, and historic art cities. Perfect for family trips, slow travel, and culinary exploration.",
        image: "https://picsum.photos/seed/tuscany/800/1200",
        affiliateLink: "https://example.com/book-tuscany",
        tags: ["Luxury & Comfort", "Balanced & Leisurely", "Culture & Exploration", "Family-Friendly & Inclusive"],
        dietary: ["Vegetarian", "Non-Vegetarian", "No Preference"],
        accessibility: true,
        companions: ["Couple", "Family", "Friends"]
    },
    {
        id: 6,
        name: "Chiang Mai, Thailand",
        desc: "A mountainous city in the north offering a blend of urban bustle and jungle adventures. Very friendly to digital nomads and budget travelers.",
        image: "https://picsum.photos/seed/thailand/800/1200",
        affiliateLink: "https://example.com/book-thailand",
        tags: ["Budget-Friendly & Practical", "Adventure & Thrill", "Culture & Exploration"],
        dietary: ["Vegan", "Non-Vegetarian"],
        accessibility: false,
        companions: ["Solo", "Friends"]
    },
    {
        id: 7,
        name: "Swiss Alps, Switzerland",
        desc: "The ultimate destination for luxury, nature, and sustainable tourism. Enjoy skiing, hiking, or simply relaxing in world-class spas.",
        image: "https://picsum.photos/seed/swiss/800/1200",
        affiliateLink: "https://example.com/book-swiss",
        tags: ["Luxury & Comfort", "Sustainable & Conscious", "Eco-Friendly & Responsible", "Relaxation & Calm"],
        dietary: ["Vegetarian", "No Preference"],
        accessibility: true,
        companions: ["Couple", "Family", "Friends"]
    },
    {
        id: 8,
        name: "New York City, USA",
        desc: "The city that never sleeps. A melting pot of cultures, endless entertainment, and fast-paced lifestyle. Immersive and intense.",
        image: "https://picsum.photos/seed/nyc/800/1200",
        affiliateLink: "https://example.com/book-nyc",
        tags: ["Culture & Exploration", "Social / Nightlife & Connection", "Adventure & Thrill", "Luxury & Comfort"],
        dietary: ["Vegan", "Vegetarian", "Non-Vegetarian", "No Preference"],
        accessibility: true,
        companions: ["Solo", "Couple", "Friends", "Family"]
    }
];

/* --- STATE --- */
const appState = {
    step: 1,
    data: {
        experiences: [],
        diet: null,
        accessibility: null,
        companions: null,
        values: [],
        name: ""
    },
    saved: []
};

/* --- ONBOARDING LOGIC --- */
const onboarding = {
    stepsConfig: [
        {
            id: 1,
            title: "Travel Style",
            subtitle: "Select all that apply.",
            type: "multi",
            field: "experiences",
            options: ["Adventure & Thrill", "Culture & Exploration", "Relaxation & Calm", "Luxury & Comfort", "Budget-Friendly & Practical", "Sustainable & Conscious", "Balanced & Leisurely", "Slow & Immersive"]
        },
        {
            id: 2,
            title: "Logistics",
            subtitle: "Tell us about your needs.",
            type: "mixed",
            fields: [
                { name: "diet", label: "Dietary Preference", options: ["Vegan", "Vegetarian", "Non-Vegetarian", "No Preference"] },
                { name: "accessibility", label: "Accessibility Needs?", options: ["Yes", "No"] },
                { name: "companions", label: "Traveling With", options: ["Solo", "Couple", "Family", "Friends"] }
            ]
        },
        {
            id: 3,
            title: "Values",
            subtitle: "What matters most to you?",
            type: "multi",
            field: "values",
            options: ["Eco-Friendly & Responsible", "Religious-Friendly & Respectful", "Family-Friendly & Inclusive", "Social / Nightlife & Connection", "Immersive Cultural Experiences", "Relaxation & Fun"]
        },
        {
            id: 4,
            title: "Welcome",
            subtitle: "Let's get to know you. What's your name?",
            type: "input",
            field: "name"
        }
    ],

    init: function() {
        this.renderStep();
        this.updateProgress();
    },

    renderStep: function() {
        const config = this.stepsConfig.find(s => s.id === appState.step);
        const container = document.getElementById('card-container');
        
        // Reset Animation
        container.classList.remove('card-enter');
        void container.offsetWidth; // Trigger reflow
        container.classList.add('card-enter');

        let html = `<h2>${config.title}</h2><p class="subtitle">${config.subtitle}</p>`;

        if (config.type === 'multi') {
            html += `<div class="options-grid">`;
            config.options.forEach(opt => {
                const isSelected = appState.data[config.field].includes(opt);
                html += `<div class="option-card ${isSelected ? 'selected' : ''}" 
                              onclick="onboarding.toggleMulti('${config.field}', '${opt}', this)">
                                 ${opt}
                             </div>`;
            });
            html += `</div>`;
        } 
        else if (config.type === 'mixed') {
            config.fields.forEach(f => {
                html += `<h4 style="margin: 24px 0 12px; color:var(--primary); font-weight:700;">${f.label}</h4><div class="options-grid">`;
                f.options.forEach(opt => {
                    const isSelected = appState.data[f.name] === opt;
                    html += `<div class="option-card ${isSelected ? 'selected' : ''}" 
                                  onclick="onboarding.toggleSingle('${f.name}', '${opt}', this)">
                                    ${opt}
                                 </div>`;
                });
                html += `</div>`;
            });
        }
        else if (config.type === 'input') {
            html += `<input type="text" id="input-name" class="input-field" placeholder="Your Name" value="${appState.data.name}" oninput="appState.data.name = this.value">`;
        }

        container.innerHTML = html;
        document.getElementById('btn-next').innerText = appState.step === 4 ? "Finish" : "Next";
        document.getElementById('btn-back').classList.toggle('hidden', appState.step === 1);
    },

    toggleMulti: function(field, value, el) {
        const index = appState.data[field].indexOf(value);
        if (index > -1) {
            appState.data[field].splice(index, 1);
            el.classList.remove('selected');
        } else {
            appState.data[field].push(value);
            el.classList.add('selected');
        }
    },

    toggleSingle: function(field, value, el) {
        appState.data[field] = value;
        const parent = el.parentElement;
        Array.from(parent.children).forEach(child => child.classList.remove('selected'));
        el.classList.add('selected');
    },

    nextStep: function() {
        const config = this.stepsConfig.find(s => s.id === appState.step);
        // Validation Logic
        if (config.type === 'multi' && appState.data[config.field].length === 0) return alert("Please select at least one.");
        if (config.type === 'mixed') {
            const missing = config.fields.filter(f => !appState.data[f.name]);
            if (missing.length > 0) return alert("Please complete all options.");
        }
        if (config.type === 'input' && !appState.data.name.trim()) return alert("Please enter your name.");

        if (appState.step < 4) {
            appState.step++;
            this.renderStep();
            this.updateProgress();
        } else {
            this.finish();
        }
    },

    prevStep: function() {
        if (appState.step > 1) {
            appState.step--;
            this.renderStep();
            this.updateProgress();
        }
    },

    updateProgress: function() {
        const pct = ((appState.step - 1) / 3) * 100;
        document.getElementById('progress-fill').style.width = pct + "%";
    },

    finish: function() {
        app.saveLocal();
        app.showFeed();
    }
};

/* --- APP CONTROLLER --- */
const app = {
    init: function() {
        const stored = localStorage.getItem('airfinity_profile');
        if (stored) {
            const parsed = JSON.parse(stored);
            appState.data = parsed.data;
            appState.saved = parsed.saved || [];
            this.showFeed();
        } else {
            document.getElementById('onboarding').classList.remove('hidden');
            onboarding.init();
        }
    },

    showFeed: function() {
        this.hideAll();
        document.getElementById('app-header').classList.remove('hidden');
        document.getElementById('feed').classList.remove('hidden');
        this.renderFeed();
    },

    showProfile: function() {
        this.hideAll();
        document.getElementById('app-header').classList.remove('hidden');
        document.getElementById('profile').classList.remove('hidden');
        this.renderProfile();
    },

    hideAll: function() {
        ['onboarding', 'feed', 'profile'].forEach(id => document.getElementById(id).classList.add('hidden'));
    },

    calculateScore: function(location) {
        let score = 0;
        const expMatches = location.tags.filter(tag => appState.data.experiences.includes(tag)).length;
        const valMatches = location.tags.filter(tag => appState.data.values.includes(tag)).length;
        score += (expMatches + valMatches) * 2;
        if (location.dietary.includes(appState.data.diet)) score += 2;
        if (appState.data.accessibility === 'Yes' && location.accessibility) score += 3;
        if (location.companions.includes(appState.data.companions)) score += 1;
        return Math.max(0, score);
    },

    renderFeed: function() {
        const feedContainer = document.getElementById('feed');
        feedContainer.innerHTML = '';

        // Sort by score
        let scoredLocations = LOCATIONS_DB.map(loc => ({ ...loc, score: this.calculateScore(loc) }))
                                            .sort((a, b) => b.score - a.score);

        // Fallback if empty
        if (scoredLocations.length === 0 || scoredLocations[0].score === 0) {
             feedContainer.innerHTML = `<div class="center flex-col" style="height:100%; color:white; text-align:center; padding:20px;">
                <h2>No matches found</h2>
                <button class="btn btn-primary" style="margin-top:20px; width:200px;" onclick="app.resetFilters()">Reset Preferences</button>
             </div>`;
             return;
        }

        scoredLocations.forEach(loc => {
            const isSaved = appState.saved.some(s => s.id === loc.id);
            const el = document.createElement('div');
            el.className = 'feed-item';
            el.innerHTML = `
                <img src="${loc.image}" class="feed-bg" alt="${loc.name}">
                <div class="feed-overlay" onclick="app.openDetails(${loc.id})">
                    <div class="feed-info">
                        <span class="match-badge">${Math.min(100, loc.score * 8)}% Match</span>
                        <h3>${loc.name}</h3>
                        <div class="feed-tags">
                            ${loc.tags.slice(0,3).map(t => `<span class="tag-pill">${t}</span>`).join('')}
                        </div>
                    </div>
                </div>
                <div class="feed-actions">
                    <div class="action-btn ${isSaved ? 'saved' : ''}" onclick="app.toggleSave(${loc.id}, this)">
                        ${isSaved ? '♥' : '♡'}
                    </div>
                    <div class="action-btn" onclick="app.openDetails(${loc.id})">ℹ</div>
                </div>
            `;
            feedContainer.appendChild(el);
        });
    },

    resetFilters: function() {
        if(confirm("Clear current profile to browse all?")) {
             this.resetApp();
        }
    },

    toggleSave: function(id, btn) {
        const index = appState.saved.findIndex(s => s.id === id);
        if (index > -1) {
            appState.saved.splice(index, 1);
            if(btn) btn.classList.remove('saved');
            if(btn) btn.innerHTML = '♡';
        } else {
            const loc = LOCATIONS_DB.find(l => l.id === id);
            appState.saved.push(loc);
            if(btn) btn.classList.add('saved');
            if(btn) btn.innerHTML = '♥';
            if(btn) {
                btn.style.transform = "scale(1.2)";
                setTimeout(() => btn.style.transform = "scale(1)", 200);
            }
        }
        this.saveLocal();
    },

    currentModalId: null,
    openDetails: function(id) {
        const loc = LOCATIONS_DB.find(l => l.id === id);
        this.currentModalId = id;
        document.getElementById('modal-img').src = loc.image;
        document.getElementById('modal-title').innerText = loc.name;
        document.getElementById('modal-desc').innerText = loc.desc;
        document.getElementById('modal-score').innerText = `Match Score: ${Math.min(100, this.calculateScore(loc) * 8)}%`;
        
        document.getElementById('modal-tags').innerHTML = loc.tags.map(t => 
            `<span class="tag-pill" style="background:#e5e7eb; color:#333;">${t}</span>`
        ).join('');

        // Setup Buttons
        const saveBtn = document.getElementById('modal-save-btn');
        const bookBtn = document.getElementById('modal-book-btn');
        const isSaved = appState.saved.some(s => s.id === id);
        
        saveBtn.innerText = isSaved ? "Saved" : "Save Location";
        saveBtn.className = isSaved ? "btn btn-primary btn-block" : "btn btn-outline btn-block"; // Outline style for unsaved
        if(!isSaved) saveBtn.style.borderColor = "var(--primary)"; 
        saveBtn.style.color = isSaved ? "white" : "var(--primary)";
        saveBtn.style.background = isSaved ? "var(--primary)" : "transparent";

        saveBtn.onclick = () => {
            this.toggleSave(id, null);
            this.openDetails(id);
        };

        bookBtn.href = loc.affiliateLink;

        document.getElementById('modal').classList.add('active');
    },

    closeModal: function() {
        document.getElementById('modal').classList.remove('active');
    },

    renderProfile: function() {
        const d = appState.data;
        document.getElementById('profile-name').innerText = d.name;
        document.getElementById('profile-avatar').innerText = d.name.charAt(0).toUpperCase();

        const prefs = [...d.experiences, d.values, d.diet, d.companions];
        document.getElementById('profile-prefs').innerHTML = prefs.map(p => 
            `<div class="pref-item"><span>${p}</span></div>`
        ).join('');

        const savedContainer = document.getElementById('profile-saved');
        if (appState.saved.length === 0) {
            savedContainer.innerHTML = `<p class="text-muted" style="text-align:center; padding:20px;">No saved locations yet.</p>`;
        } else {
            savedContainer.innerHTML = appState.saved.map(s => `
                <div class="saved-item">
                    <img src="${s.image}" alt="${s.name}">
                    <div class="saved-details">
                        <h4>${s.name}</h4>
                        <span>${s.tags[0]}</span>
                    </div>
                    <button class="remove-btn" onclick="app.removeSaved(${s.id})">Remove</button>
                </div>
            `).join('');
        }
    },

    removeSaved: function(id) {
        appState.saved = appState.saved.filter(s => s.id !== id);
        this.saveLocal();
        this.renderProfile();
    },

    saveLocal: function() {
        localStorage.setItem('airfinity_profile', JSON.stringify({
            data: appState.data,
            saved: appState.saved
        }));
    },

    resetApp: function() {
        if(confirm("Are you sure? This will delete your profile.")) {
            localStorage.removeItem('airfinity_profile');
            location.reload();
        }
    }
};

window.addEventListener('DOMContentLoaded', () => app.init());
document.getElementById('modal').addEventListener('click', (e) => {
    if (e.target.id === 'modal') app.closeModal();
});