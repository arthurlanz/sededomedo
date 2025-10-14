import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Sede do Medo - Filmes de Terror',
        requiresAgeConfirmation: true,
      },
    },
    {
      path: '/movie/:id',
      name: 'movie-detail',
      component: () => import('@/views/MovieDetailView.vue'),
      meta: {
        title: 'Detalhes do Filme',
        requiresAgeConfirmation: true,
      },
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: () => import('@/views/FavoritesView.vue'),
      meta: {
        title: 'Meus Favoritos',
        requiresAgeConfirmation: true,
      },
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('@/views/SearchView.vue'),
      meta: {
        title: 'Buscar Filmes',
        requiresAgeConfirmation: true,
      },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFoundView.vue'),
      meta: {
        title: '404 - Página Não Encontrada',
      },
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0, behavior: 'smooth' };
    }
  },
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Terror Vault';
  if (to.meta.requiresAgeConfirmation) {
    const ageConfirmed = localStorage.getItem('age-confirmed');
    if (!ageConfirmed) {
      next();
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
