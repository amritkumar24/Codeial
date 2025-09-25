// assets/js/chatbox.js

// Connect to Socket.io server
const socket = io();

const chatInput = document.getElementById("chat-input");
const chatMessages = document.getElementById("chat-messages");

// Send message when Enter is pressed
chatInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter" && chatInput.value.trim() !== "") {
    socket.emit("chat message", chatInput.value);
    chatInput.value = "";
  }
});

// Listen for incoming messages
socket.on("chat message", function (msg) {
  const messageElement = document.createElement("div");
  messageElement.textContent = msg;
  chatMessages.appendChild(messageElement);

  // Auto-scroll to latest message
  chatMessages.scrollTop = chatMessages.scrollHeight;
});
