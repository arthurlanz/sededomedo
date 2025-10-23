import './assets/main.css';
import 'vue-loading-overlay/dist/css/index.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import { useAuthStore } from '@/stores/auth';

// Criar app
const app = createApp(App);
const pinia = createPinia();

// Usar plugins
app.use(pinia);
app.use(router);

// Restaurar sessão antes de montar o app
const authStore = useAuthStore();
authStore.restoreSession().finally(() => {
  // Diretiva personalizada para lazy loading de imagens
  app.directive('lazy', {
    mounted(el, binding) {
      const loadImage = () => {
        el.src = binding.value;
        el.classList.add('loaded');
      };

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              loadImage();
              observer.unobserve(el);
            }
          });
        },
        {
          rootMargin: '50px',
        }
      );

      observer.observe(el);
    },
  });

  // Filtros globais
  app.config.globalProperties.$filters = {
    formatDate(date) {
      if (!date) return 'N/A';
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString('pt-BR', options);
    },
    formatRuntime(minutes) {
      if (!minutes) return 'N/A';
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      return hours > 0 ? `${hours}h ${mins}min` : `${mins}min`;
    },
    formatRating(rating) {
      if (!rating) return 'N/A';
      return rating.toFixed(1);
    },
  };

  // Montar app
  app.mount('#app');
});
