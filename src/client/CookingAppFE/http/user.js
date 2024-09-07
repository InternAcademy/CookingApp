const ip = process.env.EXPO_PUBLIC_PERSONAL_IP;
export async function setUi({ token, userId, language, theme }) {
  const response = await fetch(`${ip}/save-preferences`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: userId,
      language: language,
      theme: theme,
    }),
  });
  if (!response.ok) {
    throw new Error("Resource not found");
  }

  const responseBody = await response.json();

  return responseBody.data;
}
export async function checkUserStatus({ token }) {
  const response = await fetch(`${ip}/fetch-profile`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response;
}
export async function preferences({
  token,
  userId,
  dietaryPreference,
  allergies,
  avoidedfoods,
}) {
  const response = await fetch(`${ip}/preferences`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId: userId,
      dietaryPreference: dietaryPreference,
      allergies: allergies,
      avoidedfoods: avoidedfoods,
    }),
  });
  const responseBody = await response.json();
  
  return responseBody;
}
