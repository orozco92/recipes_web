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
          const { RecipeListPage } = await import(
            "../components/recipe-list-page/RecipeListPage.tsx"
          );
          return { Component: RecipeListPage };
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
          const { RecipeListPage } = await import(
            "../components/recipe-list-page/RecipeListPage.tsx"
          );
          return { Component: RecipeListPage };
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
        path: "/recipes/:recipeId/show",
        async lazy() {
          const { ShowRecipe } = await import(
            "../components/show-recipe/ShowRecipe.tsx"
          );
          return { Component: ShowRecipe };
        },
      },
      {
        path: "/users",
        element: <h1>User list</h1>,
      },
      {
        path: "/me/favorites",
        async lazy() {
          const { FavoriteRecipes } = await import(
            "../components/favorite-recipes/FavoriteRecipes.tsx"
          );
          return { Component: FavoriteRecipes };
        },
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
    path: "/signin/oauth-redirect",
    async lazy() {
      const OAuthRedirect = await import(
        "../components/auth/OAuthRedirect.tsx"
      );
      return { Component: OAuthRedirect.default };
    },
  },
  {
    path: "/signup",
    element: <h1>Sign up page</h1>,
  },
]);

export default router;
