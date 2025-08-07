// VARIABLES CHAT
let chatOpen = false;
let chatMessages = [];

// RÉPONSES AUTOMATIQUES
const chatResponses = {
    'tarif': `💰 **Nos tarifs d'intervention :**

🚨 **Urgence (24h/24):** 
- Déplacement : 69€
- Main d'œuvre : à partir de 45€/h
- Devis gratuit avant intervention

📅 **Intervention planifiée :**
- Déplacement : 39€  
- Main d'œuvre : à partir de 35€/h

📞 **Appelez pour un devis personnalisé : 06 64 94 05 41**`,

    'délai': `⏱️ **Nos délais d'intervention garantis :**

🚨 **URGENCES (24h/24) :**
- 🔐 Serrurerie : 30 minutes
- ⚡ Électricité : 45 minutes  
- 🔧 Plomberie : 1 heure
- 🔥 Chauffage : 1 heure
- 🪟 Vitrerie : 1 heure

📅 **Interventions planifiées :** sous 48h

📞 **Pour une urgence immédiate : 06 64 94 05 41**`,

    'disponibilité': `📅 **Nos disponibilités :**

✅ **7 jours sur 7**
✅ **24 heures sur 24** 
✅ **Week-ends inclus**
✅ **Jours fériés inclus**
✅ **Nuits et dimanches** (supplément urgence)

🚨 **Urgence immédiate ?**
📞 **06 64 94 05 41**`,

    'zone': `📍 **Notre zone d'intervention :**

✅ **Rayon de 50km** autour de [Votre ville]
✅ **Intervention en moins d'1h** dans un rayon de 20km
✅ **Particuliers et professionnels**

🗺️ **Principales villes couvertes :**
- [Ville 1]
- [Ville 2] 
- [Ville 3]

📞 **Vérifiez votre secteur : 06 64 94 05 41**`
};

// FONCTIONS CHAT
function toggleChat() {
    const chatWindow = document.getElementById('chatWindow');
    const notification = document.getElementById('chatNotification');
    
    chatOpen = !chatOpen;
    
    if (chatOpen) {
        chatWindow.classList.add('active');
        if (notification) notification.style.display = 'none';
    } else {
        chatWindow.classList.remove('active');
    }
}

function sendQuickMessage(message) {
    addUserMessage(message);
    setTimeout(() => {
        generateAutoResponse(message);
    }, 1000);
}

function sendChatMessage() {
    const input = document.getElementById('chatMessageInput');
    const message = input.value.trim();
    
    if (message) {
        addUserMessage(message);
        input.value = '';
        
        setTimeout(() => {
            generateAutoResponse(message);
        }, 1000);
    }
}

function handleChatKeyPress(event) {
    if (event.key === 'Enter') {
        sendChatMessage();
    }
}

function addUserMessage(message) {
    const messagesContainer = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message user-message';
    
    messageDiv.innerHTML = `
        <div class="message-content">
            <p>${message}</p>
        </div>
        <div class="message-time">${getCurrentTime()}</div>
    `;
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function addAgentMessage(message) {
    const messagesContainer = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message agent-message';
    
    messageDiv.innerHTML = `
        <div class="message-content">
            ${message.split('\n').map(line => `<p>${line}</p>`).join('')}
        </div>
        <div class="message-time">${getCurrentTime()}</div>
    `;
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function generateAutoResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    let response = '';
    
    if (message.includes('tarif') || message.includes('prix') || message.includes('coût')) {
        response = chatResponses.tarif;
    } else if (message.includes('délai') || message.includes('temps') || message.includes('rapide')) {
        response = chatResponses.délai;
    } else if (message.includes('disponible') || message.includes('week-end') || message.includes('dimanche')) {
        response = chatResponses.disponibilité;
    } else if (message.includes('zone') || message.includes('secteur') || message.includes('où')) {
        response = chatResponses.zone;
    } else if (message.includes('urgence') || message.includes('urgent')) {
        response = `🚨 **URGENCE DÉTECTÉE !**

Pour une intervention immédiate, appelez directement :
📞 **06 64 94 05 41**

Nos équipes sont disponibles 24h/24 !

Sinon, décrivez-moi votre problème et je vous aiderai.`;
    } else {
        response = `Merci pour votre message ! 

Pour une réponse personnalisée ou une urgence :
📞 **06 64 94 05 41** (24h/24)
✉️ **contact.jaje@gmail.com**

Ou utilisez les boutons rapides ci-dessous pour obtenir des informations immédiates.`;
    }
    
    addAgentMessage(response);
}

function getCurrentTime() {
    return new Date().toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit'
    });
}

// INITIALISATION
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        const notification = document.getElementById('chatNotification');
        if (notification && !chatOpen) {
            notification.style.display = 'flex';
        }
    }, 30000);
});
