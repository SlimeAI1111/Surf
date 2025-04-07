const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");

// Function to append messages to the chat
function appendMessage(content, sender) {
    const message = document.createElement("div");
    message.classList.add("message");
    message.classList.add(sender === "user" ? "user-message" : "bot-message");
    message.textContent = content;
    chatBox.appendChild(message);
    chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to bottom
}

// Function to handle sending messages
async function sendMessage() {
    const message = userInput.value;
    if (!message.trim()) return; // Do nothing if input is empty

    appendMessage(message, "user");
    userInput.value = ""; // Clear input field

    // Call the AI API (using fetch)
    const botResponse = await getBotResponse(message);
    appendMessage(botResponse, "bot");
}

// Function to get response from the AI model
async function getBotResponse(message) {
    // Use a chatbot API (OpenAI's GPT, for example)
    const apiKey = "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"; // Replace with your API key
    const endpoint = "https://api.openai.com/v1/completions";
    const prompt = `User: ${message}\nBot:`;

    const response = await fetch(endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            model: "text-davinci-003", // Choose a model
            prompt: prompt,
            max_tokens: 150,
        }),
    });

    const data = await response.json();
    return data.choices[0].text.trim();
}
