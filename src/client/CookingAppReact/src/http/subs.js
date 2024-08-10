const ip = import.meta.env.VITE_PUBLIC_PERSONAL_IP;
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
  console.log(data);
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
  console.log(response);
  if (!response.ok) {
    throw new Error(response.errors);
  }
  const data = await response.json();
  console.log(data);
  return data;
}
export async function mySub({ token }) {
  const response = await fetch(`${ip}/api/stripe/my-subscription`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error(response.errors);
  }
  const data = await response.json();
  return data.data;
}
export async function cancelSub({ token, subscriptionId }) {
  const response = await fetch(`${ip}/api/stripe/cancel/${subscriptionId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error(response.errors);
  }
  const data = await response.json();
  return data.data;
}
