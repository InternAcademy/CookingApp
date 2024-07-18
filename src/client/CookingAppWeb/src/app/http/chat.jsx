"use client";

export async function sendMessage({ token, chatId, type, content }) {
  console.log("Sending message...");
  const response = await fetch(`http://localhost:3000/api/message`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      type,
      content,
      chatId
    })
  });

  if (!response.ok) {
    throw new Error("Resource not found");
  }

  const responseBody = await response.json();
  console.log("Message sent successfully", responseBody);
  return responseBody.data;
}

export async function getChat({ token, chatId }) {
  console.log(`Fetching chat with ID: ${chatId}`);
  const response = await fetch(`http://localhost:3000/api/c/${chatId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();
  console.log("Chat data:", data);
  return data;
}

export async function getUserChats({ token, userId }) {
  console.log(`Fetching chats for user with ID: ${userId}`);
  const response = await fetch(`http://localhost:3000/api/user-chats/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();
  console.log("User chats data:", data);
  return data;
}
