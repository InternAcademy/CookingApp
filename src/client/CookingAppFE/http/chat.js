const ip = process.env.EXPO_PUBLIC_PERSONAL_IP;

export async function continueChat({ token, chatId, messageType, content, image }) {
  let body;
  let headers = {
    Authorization: `Bearer ${token}`
  };

  if (messageType === "Text") {
    headers["Content-Type"] = "application/json";
    body = JSON.stringify({
      chatId: chatId,
      type: messageType,
      content: content
    });
  } else if (messageType === "Image") {
    body = new FormData();
    body.append("chatId", chatId);
    body.append("type", messageType);
    body.append("image", {
      uri: image.uri,
      name: image.name,
      type: image.type
    });
  }

  const response = await fetch(`${ip}/continue`, {
    method: "POST",
    headers: headers,
    body: body
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const responseBody = await response.json();
  return responseBody;
}

export async function newChat({ token, messageType, content, image }) {
  console.log({ messageType, content, image });
  let body;
  let headers = {
    Authorization: `Bearer ${token}`
  };

  if (messageType === "Text") {
    headers["Content-Type"] = "application/json";
    body = JSON.stringify({
      type: messageType,
      content: content
    });
  } else if (messageType === "Image") {
    body = new FormData();
    body.append("type", messageType);
    body.append("image", {
      uri: image.uri,
      name: image.name,
      type: image.type
    });
  }

  const response = await fetch(`${ip}/new-chat`, {
    method: "POST",
    headers: headers,
    body: body
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();
  return data;
}

export async function getChat({ token, chatId }) {
  const response = await fetch(`${ip}/c/${chatId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();
  return data;
}

export async function getUserChats({ token, userId }) {
  const response = await fetch(`${ip}/user-chats/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();
  return data;
}
