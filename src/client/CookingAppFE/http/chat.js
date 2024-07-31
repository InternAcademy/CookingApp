const ip = process.env.EXPO_PUBLIC_PERSONAL_IP;

export async function sendMessage({ token, chatId, type, content }) {
  const response = await fetch(`${ip}/message`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      type,
      content,
      chatId,
    }),
  });
  if (!response.ok) {
    throw new Error("Resource not found");
  }

  const responseBody = await response.json();

  return responseBody.data;
}

export async function getChat({ token, chatId }) {
  const response = await fetch(`${ip}/c/${chatId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();
  return data;
}

export async function getUserChats({ token, userId, pageIndex }) {
  const response = await fetch(`${ip}/user-chats/${userId}/${pageIndex}/20`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const data = await response.json();
  return data;
}

export async function deleteChat({ token, chatId }) {
  const response = await fetch(`${ip}/delete-chat/${chatId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Resource not found");
  }
  const responseBody = await response.json();
  return responseBody.data;
}
