'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Award, RotateCcw } from 'lucide-react';
import { QuizQuestion } from '@/data/quiz-data';
import { useLearningStore } from '@/hooks/use-learning-store';

interface QuizCardProps {
  moduleId: string;
  questions: QuizQuestion[];
  onComplete?: () => void;
}

export function QuizCard({ moduleId, questions, onComplete }: QuizCardProps) {
  const { saveQuizScore, quizScores } = useLearningStore();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const currentQuestion = questions[currentIdx];

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    setSelectedIdx(idx);
  };

  const handleSubmit = () => {
    if (selectedIdx === null || isAnswered) return;
    
    const correct = selectedIdx === currentQuestion.correctIndex;
    if (correct) {
      setScore((s) => s + 1);
    }
    setIsAnswered(true);
  };

  const handleNext = () => {
    setIsAnswered(false);
    setSelectedIdx(null);
    
    if (currentIdx < questions.length - 1) {
      setCurrentIdx((c) => c + 1);
    } else {
      setShowResult(true);
      saveQuizScore(moduleId, score + (selectedIdx === currentQuestion.correctIndex ? 1 : 0), questions.length);
      if (onComplete) onComplete();
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedIdx(null);
    setIsAnswered(false);
    setScore(0);
    setShowResult(false);
  };

  if (!questions || questions.length === 0) {
    return <div className="text-sm text-textSecondary">No quiz available for this module yet.</div>;
  }

  return (
    <div className="apple-panel p-6 max-w-xl mx-auto overflow-hidden">
      <AnimatePresence mode="wait">
        {!showResult ? (
          <motion.div
            key={currentIdx}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Header */}
            <div className="flex justify-between items-center border-b border-white/[0.06] pb-3">
              <span className="text-xs uppercase tracking-wider text-accent font-semibold">Compliance Check</span>
              <span className="text-xs text-textSecondary font-mono">
                {currentIdx + 1} of {questions.length}
              </span>
            </div>

            {/* Question */}
            <h4 className="text-base font-medium text-textPrimary leading-relaxed">
              {currentQuestion.question}
            </h4>

            {/* Options */}
            <div className="space-y-2">
              {currentQuestion.options.map((opt, idx) => {
                let btnStyle = "border-white/[0.08] hover:bg-white/[0.04]";
                let icon = null;

                if (isAnswered) {
                  if (idx === currentQuestion.correctIndex) {
                    btnStyle = "border-green-500/30 bg-green-500/10 text-green-400";
                    icon = <Check className="w-4 h-4 text-green-400 shrink-0" />;
                  } else if (idx === selectedIdx) {
                    btnStyle = "border-red-500/30 bg-red-500/10 text-red-400";
                    icon = <X className="w-4 h-4 text-red-400 shrink-0" />;
                  } else {
                    btnStyle = "border-white/[0.04] opacity-50";
                  }
                } else if (selectedIdx === idx) {
                  btnStyle = "border-accent/40 bg-accent/5 text-textPrimary";
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswered}
                    onClick={() => handleSelect(idx)}
                    className={`w-full text-left px-4 py-3 rounded-lg border text-sm transition-all flex items-center justify-between gap-3 ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {icon}
                  </button>
                );
              })}
            </div>

            {/* Actions / Feedback */}
            <div className="space-y-4">
              {isAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/[0.02] border border-white/[0.06] p-4 rounded-lg text-xs leading-relaxed text-textSecondary"
                >
                  <strong className="text-textPrimary block mb-1">Explanation:</strong>
                  {currentQuestion.explanation}
                </motion.div>
              )}

              <div className="flex justify-end pt-2">
                {!isAnswered ? (
                  <button
                    disabled={selectedIdx === null}
                    onClick={handleSubmit}
                    className="btn-apple-primary text-xs px-5 py-2.5 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Submit Answer
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    className="btn-apple-secondary text-xs px-5 py-2.5"
                  >
                    {currentIdx < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8 space-y-6"
          >
            <div className="w-16 h-16 bg-accent/10 border border-accent/20 rounded-full flex items-center justify-center mx-auto">
              <Award className="w-8 h-8 text-accent" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-textPrimary">Quiz Completed!</h3>
              <p className="text-sm text-textSecondary max-w-sm mx-auto">
                You scored <span className="text-accent font-medium">{score}</span> out of <span className="font-medium text-textPrimary">{questions.length}</span> correct.
              </p>
              <p className="text-xs text-accent">
                +{score * 50} XP awarded to your profile!
              </p>
            </div>

            <div className="flex justify-center gap-3 pt-4">
              <button onClick={handleRestart} className="btn-apple-secondary text-xs flex items-center gap-2">
                <RotateCcw className="w-3.5 h-3.5" /> Retake
              </button>
              {onComplete && (
                <button onClick={onComplete} className="btn-apple-primary text-xs">
                  Continue Journey
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
