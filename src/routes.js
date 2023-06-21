import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";

const routes = [
    {
        path: "/",
        name: "main",
        component: Main,
    },
    {
        path: "/search",
        name: "search",
        component: () => import("./pages/SearchPage"),
    },
    {
        path: "/about",
        name: "about",
        component: () => import("./pages/AboutPage"),
    },
    {
        path: "/register",
        name: "register",
        component: () => import("./pages/RegisterPage"),
    },
    {
        path: "/login",
        name: "login",
        component: () => import("./pages/LoginPage"),
    },
    {
        path: "/recipe/:recipeId",
        name: "recipe",
        component: () => import("./pages/RecipeViewPage"),
    },
    {
        path: "/favorites",
        name: "favorites",
        component: () => import("./pages/FavoritesPage"),
    },
    {
        path: "/created",
        name: "created",
        component: () => import("./pages/CreatedRecipesPage"),
    },
    {
        path: "/familyrecipes",
        name: "familyrecipes",
        component: () => import("./pages/FamilyRecipesPage"),
    },
    {
        path: "/create",
        name: "create",
        component: () => import("./pages/CreateRecipePage"),
    },
    {
        path: "*",
        name: "notFound",
        component: NotFound,
    },
];

export default routes;
