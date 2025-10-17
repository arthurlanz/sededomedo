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
        title: 'Sede Do Medo - Descubra os Melhores Filmes de Terror',
        requiresAgeConfirmation: true,
      },
    },
    {
      path: '/movie/:id',
      name: 'movie-detail',
      component: () => import('@/views/MovieDetailView.vue'),
      meta: {
        title: 'Detalhes do Filme - Sede Do Medo',
        requiresAgeConfirmation: true,
      },
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: () => import('@/views/FavoritesView.vue'),
      meta: {
        title: 'Meus Favoritos - Sede Do Medo',
        requiresAgeConfirmation: true,
      },
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('@/views/SearchView.vue'),
      meta: {
        title: 'Buscar Filmes - Sede Do Medo',
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
    } else if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      };
    } else {
      return { top: 0, behavior: 'smooth' };
    }
  },
});

// Navigation Guard
router.beforeEach((to, from, next) => {
  // Atualizar título da página
  document.title = to.meta.title || 'Terror Vault';

  // Adicionar meta description
  let metaDescription = document.querySelector('meta[name="description"]');
  if (!metaDescription) {
    metaDescription = document.createElement('meta');
    metaDescription.name = 'description';
    document.head.appendChild(metaDescription);
  }
  metaDescription.content = 'Descubra, explore e avalie os melhores filmes de terror. Plataforma completa com trailers, sinopses e informações detalhadas.';

  next();
});

// After navigation
router.afterEach(() => {
  // Scroll to top on route change
  window.scrollTo(0, 0);
});

export default router;

