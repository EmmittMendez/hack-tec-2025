import { create } from "zustand";

export const useLearningPathStore = create((set) => ({
  learningPaths: [],
  addLearningPath: (path) =>
    set((state) => ({ learningPaths: [...state.learningPaths, path] })),
}));
