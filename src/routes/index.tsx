import { createBrowserRouter } from "react-router-dom";
import App from "../App.tsx";

const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      {
        path: "",
        async lazy() {
          const RecipeList = await import(
            "../components/recipe-list/RecipeList.tsx"
          );
          return { Component: RecipeList.default };
        },
      },
      {
        path: "/recipes/new",
        async lazy() {
          const { UpsertRecipe } = await import(
            "../components/upsert-recipe/UpsertRecipe.tsx"
          );
          return { Component: UpsertRecipe };
        },
      },
      {
        path: "/recipes/:type",
        async lazy() {
          const RecipeList = await import(
            "../components/recipe-list/RecipeList.tsx"
          );
          return { Component: RecipeList.default };
        },
      },
      {
        path: "/recipes/:id/edit",
        async lazy() {
          const { UpsertRecipe } = await import(
            "../components/upsert-recipe/UpsertRecipe.tsx"
          );
          return { Component: UpsertRecipe };
        },
      },
      {
        path: "/users",
        element: <h1>User list</h1>,
      },
      {
        path: "/me/favorites",
        element: <h1>Favorite recipes</h1>,
      },
    ],
  },
  {
    path: "/signin",
    async lazy() {
      const SignIn = await import("../components/auth/SignIn.tsx");
      return { Component: SignIn.default };
    },
  },
  {
    path: "/signup",
    element: <h1>Sign up page</h1>,
  },
]);

export default router;
