const ip = process.env.EXPO_PUBLIC_PERSONAL_IP;

export async function createRecipe({ token, request }) {
  const response = await fetch(`${ip}/create-recipe`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },

    body: `"${request}"`,
  });
  if (!response.ok) {
    throw new Error("Resource not found");
  }

  const responseBody = await response.json();

  return responseBody.data;
}
