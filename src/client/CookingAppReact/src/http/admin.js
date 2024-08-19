const ip = import.meta.env.VITE_PUBLIC_PERSONAL_IP;

export async function gift({ token, userId }) {
  const response = await fetch(`${ip}/gift-tokens/${userId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response;
}
