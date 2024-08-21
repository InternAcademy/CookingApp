import toast from "react-hot-toast";
const ip = import.meta.env.VITE_PUBLIC_PERSONAL_IP;

export async function createRecipe({ token, request }) {
  const response = await fetch(`${ip}/create-recipe`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },

    body: `"${request}"`,
  });

  if (response.status === 403) {
    const responseBody = await response.json();

    toast.error(
      responseBody.data === null ? responseBody.errors[0] : responseBody.data
    );
  }
  if (!response.ok) {
    throw new Error("Resource not found");
  }

  const responseBody = await response.json();

  return responseBody.data;
}

export async function getRecipes({ token, userId, page, title }) {
  const response = await fetch(
    `${ip}/recipes/${userId}?pageIndex=${page}&pageSize=5${
      title ? `&title=${title}` : ""
    }`,
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
