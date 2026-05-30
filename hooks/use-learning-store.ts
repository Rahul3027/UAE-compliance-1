'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface QuizResult {
  score: number;
  total: number;
}

interface LearningState {
  completedModules: string[];
  xp: number;
  quizScores: Record<string, QuizResult>;
  theme: 'dark' | 'light';
  completeModule: (id: string, xpGain?: number) => void;
  saveQuizScore: (moduleId: string, score: number, total: number) => void;
  toggleTheme: () => void;
  resetProgress: () => void;
}

export const useLearningStore = create<LearningState>()(
  persist(
    (set) => ({
      completedModules: [],
      xp: 0,
      quizScores: {},
      theme: 'dark',
      completeModule: (id, xpGain = 100) =>
        set((state) => {
          if (state.completedModules.includes(id)) return {};
          return {
            completedModules: [...state.completedModules, id],
            xp: state.xp + xpGain,
          };
        }),
      saveQuizScore: (moduleId, score, total) =>
        set((state) => {
          const oldQuiz = state.quizScores[moduleId];
          const alreadyTaken = !!oldQuiz;
          const scoreDiff = score - (oldQuiz?.score || 0);
          
          // Only reward XP difference if new score is higher
          const xpGain = !alreadyTaken ? score * 50 : (scoreDiff > 0 ? scoreDiff * 50 : 0);

          return {
            quizScores: {
              ...state.quizScores,
              [moduleId]: { score, total },
            },
            xp: state.xp + xpGain,
          };
        }),
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === 'dark' ? 'light' : 'dark',
        })),
      resetProgress: () =>
        set({
          completedModules: [],
          xp: 0,
          quizScores: {},
        }),
    }),
    {
      name: 'uae-compliance-learning-progress',
    }
  )
);
