const ip = process.env.EXPO_PUBLIC_PERSONAL_IP;
export async function fetchSubs(token) {
  const response = await fetch(`${ip}/api/stripe/products`, {
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
export async function createSub({ token, email, priceId }) {
  const response = await fetch(`${ip}/api/stripe/subscription`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      priceId: priceId,
    }),
  });
  if (!response.ok) {
    throw new Error(response.errors);
  }
  const data = await response.json();
  return data;
}
