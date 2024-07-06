export async function continueChat({ token, chatId, message }) {
  const response = await fetch(`http://192.168.0.105:8000/continue`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chatId: chatId,
      message: message,
    }),
  });
  if (!response.ok) {
    throw new Error(response.errors);
  }
  const body = await response.json();
  return body;
}
export async function newChat({ token, message }) {
  console.log(message);
  const response = await fetch("http://192.168.0.105:8000/new-chat", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: message,
    }),
  });
  if (!response.ok) {
    throw new Error(response.errors);
  }
  const data = await response.json();
  return data;
}
export async function getChat({ token, chatId }) {
  const response = await fetch(`http://192.168.0.105:8000/c/${chatId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error(response.errors);
  }
  const data = await response.json();
  return data;
}
export async function getUserChats({ token, userId }) {
  const response = await fetch(
    `http://192.168.0.105:8000/user-chats/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) {
    throw new Error(response.errors);
  }
  const data = await response.json();
  return data;
}
