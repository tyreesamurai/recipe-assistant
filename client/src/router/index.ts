import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import SearchView from '@/views/SearchView.vue'
import RecipeView from '@/views/RecipeView.vue'
import RecipeSpecificView from '@/views/RecipeSpecificView.vue'
import CreateRecipeView from '@/views/CreateRecipeView.vue'
import PlannerView from '@/views/PlannerView.vue'
import ShoppingListView from '@/views/ShoppingListView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: HomeView },
    { path: '/search', component: SearchView },
    { path: '/recipes', component: RecipeView },
    { path: '/recipes/:id', component: RecipeSpecificView },
    { path: '/create', component: CreateRecipeView },
    { path: '/planner', component: PlannerView },
    { path: '/shopping-list', component: ShoppingListView },
  ],
})

export default router
