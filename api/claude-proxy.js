<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Marketing Content Creator - Collaborating Wellness</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600&family=Inter:wght@400;500;700&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Inter', sans-serif;
            background-color: #f4f0ed;
            color: #374151;
        }
        h1, h2, h3 {
            font-family: 'Cormorant Garamond', serif;
        }
        .content-type-btn {
            cursor: pointer;
            transition: all 0.2s;
        }
        .content-type-btn:hover {
            background-color: #f9fafb;
        }
        .content-type-btn.selected {
            border-color: #D8A2A0;
            background-color: #f0e8e6;
        }
        .btn {
            transition: all 0.2s;
            cursor: pointer;
        }
        .btn:hover:not(:disabled) {
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        .btn:disabled {
            cursor: not-allowed;
            opacity: 0.5;
        }
        .spinner {
            border: 4px solid #f3f4f6;
            border-top: 4px solid #D8A2A0;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        .saved-item {
            background-color: #f0e8e6;
            border-left: 4px solid #D8A2A0;
        }
        .modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 1000;
            align-items: center;
            justify-content: center;
        }
        .modal.show {
            display: flex;
        }
    </style>
</head>
<body class="p-4 sm:p-8">

    <!-- API Key Modal -->
    <div id="apiKeyModal" class="modal show">
        <div class="bg-white rounded-2xl p-8 max-w-md mx-4">
            <h2 class="text-2xl font-bold text-gray-800 mb-4">Welcome!</h2>
            <p class="text-gray-600 mb-4">To use this tool, you'll need your Claude API key. You only need to enter this once - it will be saved in your browser.</p>
            <div class="mb-4">
                <label class="block text-sm font-semibold text-gray-700 mb-2">Claude API Key:</label>
                <input type="password" id="apiKeyInput" placeholder="sk-ant-..." class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D8A2A0]">
                <p class="text-xs text-gray-500 mt-2">Get your API key from: <a href="https://console.anthropic.com/" target="_blank" class="text-blue-600 underline">console.anthropic.com</a></p>
            </div>
            <button onclick="saveApiKey()" class="w-full bg-[#D8A2A0] hover:bg-[#c89290] text-white font-semibold py-3 rounded-lg btn">
                Save & Continue
            </button>
            <button onclick="showApiKeyInfo()" class="w-full mt-2 text-sm text-gray-600 hover:text-gray-800">
                Where do I find my API key?
            </button>
        </div>
    </div>

    <div class="max-w-5xl mx-auto">
        <!-- Header -->
        <div class="bg-white rounded-3xl shadow-2xl p-6 sm:p-10 mb-6">
            <div class="text-center mb-6">
                <h1 class="text-3xl sm:text-4xl font-bold text-[#374151] mb-2">
                    Marketing Content Creator
                </h1>
                <p class="text-gray-600 italic">Collaborating Wellness | Janice LaFountaine, MS, LMFT</p>
                <button onclick="changeApiKey()" class="text-sm text-gray-500 hover:text-gray-700 mt-2">
                    Change API Key
                </button>
            </div>

            <!-- Form Section -->
            <div id="formSection">
                <div class="bg-[#fdfae9] border border-[#e6d8a2] rounded-xl p-4 mb-6">
                    <p class="text-sm text-gray-700">
                        💡 <strong>Create on-brand marketing content</strong> that honors your voice and values. Answer a few questions and let Claude craft content that feels authentically you.
                    </p>
                </div>

                <!-- Content Type -->
                <div class="mb-6">
                    <label class="block text-sm font-semibold text-gray-700 mb-3">
                        What type of content do you need?
                    </label>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3" id="contentTypeGrid">
                        <!-- Content type buttons will be inserted here -->
                    </div>
                </div>

                <!-- Audience -->
                <div class="mb-6">
                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                        Who is your target audience?
                    </label>
                    <select id="audience" class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D8A2A0]">
                        <option value="">Select audience...</option>
                        <option value="Trauma survivors">Trauma survivors</option>
                        <option value="Couples seeking relationship counseling">Couples seeking relationship counseling</option>
                        <option value="Individuals exploring EMDR">Individuals exploring EMDR</option>
                        <option value="General therapy clients">General therapy clients</option>
                        <option value="Professional referral sources">Professional referral sources</option>
                        <option value="Community/General public">Community/General public</option>
                    </select>
                </div>

                <!-- Key Message -->
                <div class="mb-6">
                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                        What's the key message or theme?
                    </label>
                    <textarea id="keyMessage" placeholder="e.g., 'EMDR can help process difficult memories' or 'Healing is possible after trauma'" class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D8A2A0] resize-y" rows="3"></textarea>
                </div>

                <!-- Tone -->
                <div class="mb-6">
                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                        What tone feels right?
                    </label>
                    <select id="tone" class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D8A2A0]">
                        <option value="">Select tone...</option>
                        <option value="Warm and compassionate">Warm and compassionate</option>
                        <option value="Educational and informative">Educational and informative</option>
                        <option value="Empowering and hopeful">Empowering and hopeful</option>
                        <option value="Gentle and trauma-informed">Gentle and trauma-informed</option>
                        <option value="Professional and credible">Professional and credible</option>
                        <option value="Conversational and approachable">Conversational and approachable</option>
                    </select>
                </div>

                <!-- Additional Notes -->
                <div class="mb-6">
                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                        Any additional notes or specific requests?
                    </label>
                    <textarea id="additionalNotes" placeholder="e.g., 'Include a call to action' or 'Mention insurance accepted' or 'Keep it under 150 words'" class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D8A2A0] resize-y" rows="3"></textarea>
                </div>

                <!-- Generate Button -->
                <button id="generateBtn" onclick="generateContent()" class="w-full bg-[#D8A2A0] hover:bg-[#c89290] text-white font-semibold py-4 rounded-xl btn shadow-lg">
                    ✨ Generate Content
                </button>
            </div>

            <!-- Loading Section -->
            <div id="loadingSection" style="display: none;" class="text-center py-12">
                <div class="spinner mx-auto mb-4"></div>
                <p class="text-lg text-gray-600">Creating your content...</p>
                <p class="text-sm text-gray-500 mt-2">This may take 10-30 seconds</p>
            </div>

            <!-- Result Section -->
            <div id="resultSection" style="display: none;">
                <div class="flex flex-wrap gap-3 justify-between items-center mb-6">
                    <h2 class="text-xl font-semibold text-gray-800">Your Generated Content</h2>
                    <div class="flex flex-wrap gap-2">
                        <button onclick="copyToClipboard()" class="px-4 py-2 bg-green-100 hover:bg-green-200 text-green-800 rounded-lg btn">
                            📋 Copy
                        </button>
                        <button onclick="saveItem()" class="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-lg btn">
                            💾 Save
                        </button>
                        <button onclick="resetForm()" class="px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-800 rounded-lg btn">
                            📄 New
                        </button>
                    </div>
                </div>

                <textarea id="generatedContent" class="w-full p-4 border-2 border-[#D1D5DB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D8A2A0] resize-y font-mono text-sm mb-6" rows="20"></textarea>

                <div class="bg-[#f0e8e6] rounded-xl p-4 border-l-4 border-[#D1D5DB]">
                    <label class="block text-sm font-semibold text-gray-700 mb-2">
                        Want to refine this? Describe your changes:
                    </label>
                    <textarea id="refinementNotes" placeholder="e.g., 'Make it shorter' or 'Add more warmth' or 'Include pricing info'" class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D8A2A0] resize-y mb-3" rows="2"></textarea>
                    <button onclick="regenerateWithChanges()" class="w-full bg-[#E6D8A2] hover:bg-[#d9ca8f] text-gray-800 font-semibold py-3 rounded-lg btn">
                        🔄 Regenerate with Changes
                    </button>
                </div>
            </div>
        </div>

        <!-- Saved Library -->
        <div id="savedLibrary" style="display: none;" class="bg-white rounded-3xl shadow-2xl p-6 sm:p-10">
            <h2 class="text-2xl font-bold text-[#374151] mb-6">Your Saved Library</h2>
            <div id="savedItemsContainer"></div>
        </div>
    </div>

    <script>
        // Content types configuration
        const contentTypes = [
            { value: 'social-post', label: 'Social Media Post', icon: '📱' },
            { value: 'email', label: 'Email Newsletter', icon: '📧' },
            { value: 'blog', label: 'Blog Post', icon: '📝' },
            { value: 'homework', label: 'Client Homework Assignment', icon: '📋' },
            { value: 'website-copy', label: 'Website Copy', icon: '🌐' },
            { value: 'client-handout', label: 'Client Information Handout', icon: '📄' }
        ];

        // State
        let selectedContentType = '';
        let currentFormData = {};
        let savedItems = [];

        // Initialize
        function init() {
            // Check for API key
            const apiKey = localStorage.getItem('claude_api_key');
            if (apiKey) {
                document.getElementById('apiKeyModal').classList.remove('show');
            }

            // Load saved items
            const saved = localStorage.getItem('marketing_saved_items');
            if (saved) {
                savedItems = JSON.parse(saved);
                updateSavedLibrary();
            }

            // Render content type buttons
            renderContentTypes();
        }

        function renderContentTypes() {
            const grid = document.getElementById('contentTypeGrid');
            grid.innerHTML = contentTypes.map(type => `
                <div class="content-type-btn p-4 rounded-xl border-2 border-gray-200" onclick="selectContentType('${type.value}')">
                    <div class="flex items-center gap-3">
                        <span class="text-2xl">${type.icon}</span>
                        <span class="font-medium text-gray-800">${type.label}</span>
                    </div>
                </div>
            `).join('');
        }

        function selectContentType(value) {
            selectedContentType = value;
            // Update UI
            document.querySelectorAll('.content-type-btn').forEach(btn => {
                btn.classList.remove('selected');
            });
            event.currentTarget.classList.add('selected');
            updateGenerateButton();
        }

        function updateGenerateButton() {
            const btn = document.getElementById('generateBtn');
            const audience = document.getElementById('audience').value;
            const keyMessage = document.getElementById('keyMessage').value;
            const tone = document.getElementById('tone').value;
            
            btn.disabled = !selectedContentType || !audience || !keyMessage || !tone;
        }

        // Listen for changes
        ['audience', 'keyMessage', 'tone', 'additionalNotes'].forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                el.addEventListener('input', updateGenerateButton);
                el.addEventListener('change', updateGenerateButton);
            }
        });

        function buildPrompt() {
            const contentTypeLabel = contentTypes.find(ct => ct.value === selectedContentType)?.label || selectedContentType;
            const audience = document.getElementById('audience').value;
            const keyMessage = document.getElementById('keyMessage').value;
            const tone = document.getElementById('tone').value;
            const additionalNotes = document.getElementById('additionalNotes').value;
            
            return `You are a marketing content creator for Janice LaFountaine, MS, LMFT, a therapist specializing in trauma/complex trauma, EMDR, and relationship counseling in the Spokane area. Her practice is called Collaborating Wellness.

BRAND VOICE & VALUES:
- Warm, compassionate, and trauma-informed
- Empowering without being patronizing
- Honors the wisdom clients already have within themselves
- Speaks to people as whole, capable beings on their healing journey
- Uses inclusive, non-pathologizing language
- Grounded in the philosophy that people have every answer within themselves as aspects of Source with access to their higher self
- Reverent, graceful, and kind

VISUAL BRAND ELEMENTS (for reference in tone):
- Colors: Dusty rose (#D8A2A0), champagne gold (#E6D8A2), pale rose (#f0e8e6), deep charcoal (#374151)
- Aesthetic: Warm, elegant, grounded, approachable

TASK:
Create a ${contentTypeLabel} for the following:

Target Audience: ${audience}
Key Message/Theme: ${keyMessage}
Desired Tone: ${tone}
${additionalNotes ? `Additional Notes: ${additionalNotes}` : ''}

REQUIREMENTS:
- Match Janice's authentic voice and values
- Be specific and actionable where appropriate
- Avoid clinical jargon unless necessary
- Honor the reader's intelligence and agency
- Create connection without manipulation
- If this is a homework assignment, follow the structure and interactive features shown in Janice's existing materials (auto-save, gentle reminders, trauma-informed prompts)

Generate the content now:`;
        }

        async function generateContent() {
            const apiKey = localStorage.getItem('claude_api_key');
            if (!apiKey) {
                alert('Please enter your API key first.');
                document.getElementById('apiKeyModal').classList.add('show');
                return;
            }

            // Store form data
            currentFormData = {
                contentType: selectedContentType,
                audience: document.getElementById('audience').value,
                keyMessage: document.getElementById('keyMessage').value,
                tone: document.getElementById('tone').value,
                additionalNotes: document.getElementById('additionalNotes').value
            };

            // Show loading
            document.getElementById('formSection').style.display = 'none';
            document.getElementById('loadingSection').style.display = 'block';

            try {
                const prompt = buildPrompt();
                
                const response = await fetch("https://claude-proxy-bay.vercel.app/api/claude-proxy", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "x-api-key": apiKey
                    },
                    body: JSON.stringify({
                        model: "claude-sonnet-4-20250514",
                        max_tokens: 4000,
                        messages: [
                            { role: "user", content: prompt }
                        ]
                    })
                });

                if (!response.ok) {
                    const error = await response.json();
                    throw new Error(error.error?.message || 'API request failed');
                }

                const data = await response.json();
                const content = data.content[0].text;
                
                document.getElementById('generatedContent').value = content;
                
                // Show result
                document.getElementById('loadingSection').style.display = 'none';
                document.getElementById('resultSection').style.display = 'block';
            } catch (error) {
                console.error('Error generating content:', error);
                alert('Error generating content: ' + error.message);
                document.getElementById('loadingSection').style.display = 'none';
                document.getElementById('formSection').style.display = 'block';
            }
        }

        async function regenerateWithChanges() {
            const apiKey = localStorage.getItem('claude_api_key');
            const refinementNotes = document.getElementById('refinementNotes').value;
            const currentContent = document.getElementById('generatedContent').value;
            
            if (!refinementNotes.trim()) {
                alert('Please describe what changes you want.');
                return;
            }

            const refinementPrompt = `${buildPrompt()}

PREVIOUS VERSION:
${currentContent}

USER REQUESTED CHANGES:
${refinementNotes}

Generate an improved version incorporating these changes:`;

            // Show loading
            document.getElementById('resultSection').style.display = 'none';
            document.getElementById('loadingSection').style.display = 'block';

            try {
                const response = await fetch("https://claude-proxy-bay.vercel.app/api/claude-proxy", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "x-api-key": apiKey
                    },
                    body: JSON.stringify({
                        model: "claude-sonnet-4-20250514",
                        max_tokens: 4000,
                        messages: [
                            { role: "user", content: refinementPrompt }
                        ]
                    })
                });

                if (!response.ok) {
                    throw new Error('API request failed');
                }

                const data = await response.json();
                const content = data.content[0].text;
                
                document.getElementById('generatedContent').value = content;
                document.getElementById('refinementNotes').value = '';
                
                // Show result
                document.getElementById('loadingSection').style.display = 'none';
                document.getElementById('resultSection').style.display = 'block';
            } catch (error) {
                console.error('Error regenerating:', error);
                alert('Error regenerating content. Please try again.');
                document.getElementById('loadingSection').style.display = 'none';
                document.getElementById('resultSection').style.display = 'block';
            }
        }

        function copyToClipboard() {
            const content = document.getElementById('generatedContent').value;
            navigator.clipboard.writeText(content).then(() => {
                alert('Content copied to clipboard!');
            }).catch(err => {
                console.error('Copy failed:', err);
                alert('Failed to copy. Please select and copy manually.');
            });
        }

        function saveItem() {
            const newItem = {
                id: Date.now(),
                date: new Date().toLocaleDateString(),
                contentType: currentFormData.contentType,
                audience: currentFormData.audience,
                keyMessage: currentFormData.keyMessage,
                content: document.getElementById('generatedContent').value,
                formData: currentFormData
            };
            
            savedItems.push(newItem);
            localStorage.setItem('marketing_saved_items', JSON.stringify(savedItems));
            updateSavedLibrary();
            alert('Saved to your library!');
        }

        function updateSavedLibrary() {
            const container = document.getElementById('savedItemsContainer');
            const library = document.getElementById('savedLibrary');
            
            if (savedItems.length === 0) {
                library.style.display = 'none';
                return;
            }
            
            library.style.display = 'block';
            container.innerHTML = savedItems.map(item => {
                const typeLabel = contentTypes.find(ct => ct.value === item.contentType)?.label || item.contentType;
                return `
                    <div class="saved-item rounded-xl p-4 mb-4">
                        <div class="flex justify-between items-start">
                            <div>
                                <h3 class="font-semibold text-gray-800">${typeLabel}</h3>
                                <p class="text-sm text-gray-600">${item.date} • ${item.audience}</p>
                                <p class="text-sm text-gray-700 mt-1 italic">"${item.keyMessage}"</p>
                            </div>
                            <div class="flex gap-2">
                                <button onclick="loadSavedItem(${item.id})" class="px-3 py-1 bg-white hover:bg-gray-50 text-gray-700 rounded-lg text-sm">
                                    Load
                                </button>
                                <button onclick="deleteSavedItem(${item.id})" class="px-3 py-1 bg-red-100 hover:bg-red-200 text-red-800 rounded-lg text-sm">
                                    🗑️
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
        }

        function loadSavedItem(id) {
            const item = savedItems.find(i => i.id === id);
            if (!item) return;
            
            currentFormData = item.formData;
            selectedContentType = item.formData.contentType;
            
            document.getElementById('audience').value = item.formData.audience;
            document.getElementById('keyMessage').value = item.formData.keyMessage;
            document.getElementById('tone').value = item.formData.tone;
            document.getElementById('additionalNotes').value = item.formData.additionalNotes || '';
            document.getElementById('generatedContent').value = item.content;
            
            // Update UI
            renderContentTypes();
            document.querySelectorAll('.content-type-btn').forEach(btn => {
                if (btn.textContent.includes(contentTypes.find(ct => ct.value === selectedContentType)?.label)) {
                    btn.classList.add('selected');
                }
            });
            
            document.getElementById('formSection').style.display = 'none';
            document.getElementById('resultSection').style.display = 'block';
            
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        function deleteSavedItem(id) {
            if (confirm('Delete this saved item?')) {
                savedItems = savedItems.filter(item => item.id !== id);
                localStorage.setItem('marketing_saved_items', JSON.stringify(savedItems));
                updateSavedLibrary();
            }
        }

        function resetForm() {
            selectedContentType = '';
            currentFormData = {};
            
            document.getElementById('audience').value = '';
            document.getElementById('keyMessage').value = '';
            document.getElementById('tone').value = '';
            document.getElementById('additionalNotes').value = '';
            document.getElementById('refinementNotes').value = '';
            
            renderContentTypes();
            
            document.getElementById('resultSection').style.display = 'none';
            document.getElementById('formSection').style.display = 'block';
            
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        function saveApiKey() {
            const apiKey = document.getElementById('apiKeyInput').value.trim();
            if (!apiKey) {
                alert('Please enter your API key.');
                return;
            }
            if (!apiKey.startsWith('sk-ant-')) {
                alert('Invalid API key format. Claude API keys start with "sk-ant-"');
                return;
            }
            localStorage.setItem('claude_api_key', apiKey);
            document.getElementById('apiKeyModal').classList.remove('show');
            alert('API key saved! You can now generate content.');
        }

        function changeApiKey() {
            document.getElementById('apiKeyInput').value = '';
            document.getElementById('apiKeyModal').classList.add('show');
        }

        function showApiKeyInfo() {
            alert('To get your Claude API key:\n\n1. Go to console.anthropic.com\n2. Sign up or log in\n3. Go to API Keys section\n4. Create a new key\n5. Copy and paste it here\n\nYour key will be stored securely in your browser.');
        }

        // Initialize on load
        window.addEventListener('load', init);
    </script>
</body>
</html>
