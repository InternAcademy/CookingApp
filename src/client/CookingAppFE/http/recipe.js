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

export async function getRecipes({ token, userId, page }) {
  const response = await fetch(
    `${ip}/recipes/${userId}?pageIndex=${page}&pageSize=5`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) {
    throw new Error("Resource not found");
  }
  const responseBody = await response.json();
  return responseBody.data;
}

export async function deleteRecipe({ token, recipeId }) {
  const response = await fetch(`${ip}/delete-recipe/${recipeId}`, {
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

export async function getRecipeById({ token, recipeId }) {
  console.log(recipeId);
  const response = await fetch(`${ip}/r/${recipeId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Resource not found");
  }
  const responseBody = await response.json();
  console.log(responseBody);
  return responseBody.data;
}

export async function archive({ token, recipeId }) {
  const response = await fetch(`${ip}/archive/${recipeId}`, {
    method: "POST",
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
export async function getArchivedRecipes({ token, userId }) {
  const response = await fetch(`${ip}/archived-recipes/${userId}`, {
    method: "GET",
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
