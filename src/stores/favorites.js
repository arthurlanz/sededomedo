import { reactive, computed } from 'vue';
import { defineStore } from 'pinia';

export const useFavoritesStore = defineStore('favorites', () => {
  const state = reactive({
    favorites: [],
    history: [],
  });

  const favorites = computed(() => state.favorites);
  const history = computed(() => state.history);
  const loadFromStorage = () => {
    const savedFavorites = localStorage.getItem('horror-favorites');
    const savedHistory = localStorage.getItem('horror-history');

    if (savedFavorites) {
      state.favorites = JSON.parse(savedFavorites);
    }

    if (savedHistory) {
      state.history = JSON.parse(savedHistory);
    }
  };
  const isFavorite = (movieId) => {
    return state.favorites.some((movie) => movie.id === movieId);
  };
  const addToFavorites = (movie) => {
    if (!isFavorite(movie.id)) {
      state.favorites.push({
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        vote_average: movie.vote_average,
        release_date: movie.release_date,
        addedAt: new Date().toISOString(),
      });
      localStorage.setItem('horror-favorites', JSON.stringify(state.favorites));
    }
  };
  const removeFromFavorites = (movieId) => {
    state.favorites = state.favorites.filter((movie) => movie.id !== movieId);
    localStorage.setItem('horror-favorites', JSON.stringify(state.favorites));
  };
  const toggleFavorite = (movie) => {
    if (isFavorite(movie.id)) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };
  const addToHistory = (movie) => {
    state.history = state.history.filter((m) => m.id !== movie.id);
    state.history.unshift({
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      viewedAt: new Date().toISOString(),
    });
    if (state.history.length > 20) {
      state.history = state.history.slice(0, 20);
    }

    localStorage.setItem('horror-history', JSON.stringify(state.history));
  };
  const clearHistory = () => {
    state.history = [];
    localStorage.removeItem('horror-history');
  };
  loadFromStorage();

  return {
    favorites,
    history,
    isFavorite,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    addToHistory,
    clearHistory,
  };
});
