import { create } from "zustand";
import { WORKOUTS } from "../constants/workouts";

type Exercise = (typeof WORKOUTS)[number];

type ExerciseStore = {
  exercises: Exercise[];
  filtered: Exercise[];
  selectedCategory: string | null;
  searchQuery: string;
  setCategory: (cat: string | null) => void;
  setSearch: (q: string) => void;
};

export const useExerciseStore = create<ExerciseStore>((set, get) => ({
  exercises: WORKOUTS,
  filtered: WORKOUTS,
  selectedCategory: null,
  searchQuery: "",

  setCategory: (cat) => {
    const { exercises, searchQuery } = get();
    const filtered = exercises.filter((e) => {
      const matchCat = !cat || e.category === cat;
      const matchSearch = !searchQuery || e.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
    set({ selectedCategory: cat, filtered });
  },

  setSearch: (q) => {
    const { exercises, selectedCategory } = get();
    const filtered = exercises.filter((e) => {
      const matchCat = !selectedCategory || e.category === selectedCategory;
      const matchSearch = !q || e.name.toLowerCase().includes(q.toLowerCase());
      return matchCat && matchSearch;
    });
    set({ searchQuery: q, filtered });
  },
}));
