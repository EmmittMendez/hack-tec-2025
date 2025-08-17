const quizStore = create((set) => ({
  quiz: null,
  setQuiz: (quiz) => set({ quiz }),
}));

export default quizStore;
