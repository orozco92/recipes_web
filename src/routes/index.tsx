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
        async lazy() {
          const { UserListPage } = await import(
            "../components/user-list-page/UserListPage.tsx"
          );
          return { Component: UserListPage };
        },
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
      {
        path: "/me/recipes",
        async lazy() {
          const { UserRecipeListPage } = await import(
            "../components/user-recipe-list-page/UserRecipeListPage.tsx"
          );
          return { Component: UserRecipeListPage };
        },
      },
      {
        path: "/me",
        async lazy() {
          const { Profile } = await import("../components/profile/Profile.tsx");
          return { Component: Profile };
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
    async lazy() {
      const { SignUp } = await import("../components/auth/SignUp.tsx");
      return { Component: SignUp };
    },
  },
]);

export default router;
