/**
 * Care Mate - Chat Interface JavaScript
 * 
 * This file contains the functionality for the AI chat interface
 * including message handling, history management, and API integration.
 */

// Chat state
let chatHistory = [];
let isProcessing = false;

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initChatInterface();
});

/**
 * Initialize the chat interface
 */
function initChatInterface() {
    const chatInput = document.querySelector('.chat-input');
    const sendButton = document.querySelector('.chat-send-button');
    const chatMessages = document.querySelector('.chat-messages');
    
    if (!chatInput || !sendButton || !chatMessages) return;
    
    // Send message when clicking send button
    sendButton.addEventListener('click', function() {
        sendMessage();
    });
    
    // Send message when pressing Enter (but allow Shift+Enter for new lines)
    chatInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
    
    // Auto-resize textarea as user types
    chatInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    });
    
    // Load chat history from local storage
    loadChatHistory();
}

/**
 * Send a message to the AI
 */
function sendMessage() {
    if (isProcessing) return;
    
    const chatInput = document.querySelector('.chat-input');
    const message = chatInput.value.trim();
    
    if (!message) return;
    
    // Add user message to chat
    addMessageToChat('user', message);
    
    // Clear input
    chatInput.value = '';
    chatInput.style.height = 'auto';
    
    // Show typing indicator
    showTypingIndicator();
    
    // Set processing state
    isProcessing = true;
    
    // Simulate AI response (in a real app, this would be an API call)
    setTimeout(() => {
        // Remove typing indicator
        hideTypingIndicator();
        
        // Generate AI response
        const aiResponse = generateAIResponse(message);
        
        // Add AI response to chat
        addMessageToChat('ai', aiResponse);
        
        // Reset processing state
        isProcessing = false;
        
        // Save chat history
        saveChatHistory();
    }, 1500);
}

/**
 * Add a message to the chat interface
 * @param {string} sender - 'user' or 'ai'
 * @param {string} message - The message text
 */
function addMessageToChat(sender, message) {
    const chatMessages = document.querySelector('.chat-messages');
    
    if (!chatMessages) return;
    
    // Create message element
    const messageElement = document.createElement('div');
    messageElement.className = `message message-${sender}`;
    
    // Format message text (handle markdown, links, etc.)
    const formattedMessage = formatMessage(message);
    
    // Set message content
    messageElement.innerHTML = formattedMessage;
    
    // Add message to chat
    chatMessages.appendChild(messageElement);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Add to history
    chatHistory.push({
        sender,
        message,
        timestamp: new Date().toISOString()
    });
}

/**
 * Show typing indicator
 */
function showTypingIndicator() {
    const chatMessages = document.querySelector('.chat-messages');
    
    if (!chatMessages) return;
    
    // Create typing indicator
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'typing-indicator';
    typingIndicator.innerHTML = `
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
    `;
    
    // Add typing indicator to chat
    chatMessages.appendChild(typingIndicator);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

/**
 * Hide typing indicator
 */
function hideTypingIndicator() {
    const typingIndicator = document.querySelector('.typing-indicator');
    
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

/**
 * Format message text (handle markdown, links, etc.)
 * @param {string} message - The raw message text
 * @returns {string} - The formatted message HTML
 */
function formatMessage(message) {
    // Convert URLs to links
    message = message.replace(
        /(https?:\/\/[^\s]+)/g, 
        '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>'
    );
    
    // Convert line breaks to <br>
    message = message.replace(/\n/g, '<br>');
    
    return message;
}

/**
 * Generate AI response (placeholder for actual AI integration)
 * @param {string} userMessage - The user's message
 * @returns {string} - The AI's response
 */
function generateAIResponse(userMessage) {
    // This is a placeholder. In a real app, this would call an API
    
    // Simple responses based on keywords
    if (userMessage.toLowerCase().includes('hello') || 
        userMessage.toLowerCase().includes('hi')) {
        return "Hello! I'm Care Mate, your NDIS assistant. How can I help you today?";
    }
    
    if (userMessage.toLowerCase().includes('ndis')) {
        return "The National Disability Insurance Scheme (NDIS) provides support to eligible people with intellectual, physical, sensory, cognitive and psychosocial disability. Let me know if you have specific questions about your NDIS plan or supports.";
    }
    
    if (userMessage.toLowerCase().includes('plan')) {
        return "Your NDIS plan contains information about your disability, your goals, and the funding you've received. I can help you understand different parts of your plan or how to use your funding effectively.";
    }
    
    if (userMessage.toLowerCase().includes('provider') || 
        userMessage.toLowerCase().includes('service')) {
        return "Finding the right service providers is important. I can help you search for providers in your area that match your needs and NDIS goals. Would you like me to explain how to choose a provider?";
    }
    
    // Default response
    return "Thank you for your message. As your NDIS assistant, I'm here to help you navigate your plan, find providers, and achieve your goals. Could you tell me more about what you need assistance with?";
}

/**
 * Save chat history to local storage
 */
function saveChatHistory() {
    localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
}

/**
 * Load chat history from local storage
 */
function loadChatHistory() {
    const savedHistory = localStorage.getItem('chatHistory');
    
    if (savedHistory) {
        try {
            chatHistory = JSON.parse(savedHistory);
            
            // Display messages from history
            chatHistory.forEach(item => {
                addMessageToChat(item.sender, item.message);
            });
        } catch (error) {
            console.error('Error loading chat history:', error);
            chatHistory = [];
        }
    }
}

/**
 * Clear chat history
 */
function clearChatHistory() {
    chatHistory = [];
    localStorage.removeItem('chatHistory');
    
    const chatMessages = document.querySelector('.chat-messages');
    if (chatMessages) {
        chatMessages.innerHTML = '';
    }
}
