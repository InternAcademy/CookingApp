export async function fetchSubs(token) {
  const response = await fetch('https://localhost:8001/api/stripe/products', {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  if (!response.ok) {
    throw new Error(response.errors);
  }
  const data = await response.json();
  console.log(data);
  return data;
}
export async function createSub({ token, email, priceId }) {
  console.log('FETCHING');
  const response = await fetch('https://localhost:8001/api/stripe/subscription', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email,
      priceId: priceId
    })
  });
  console.log(response);
  if (!response.ok) {
    throw new Error(response.errors);
  }
  const data = await response.json();
  console.log(data);
  return data;
}
