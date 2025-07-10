'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Clock, Moon, Sun, Download, RotateCcw, CheckCircle, XCircle } from 'lucide-react';
import { getShuffledQuizData, QuizSection as QuizSectionType } from '@/lib/quiz-data';
import { QuizSection } from '@/components/quiz-section';
import { ResultsView } from '@/components/results-view';
import { cn } from '@/lib/utils';

export default function Home() {
  const [currentSection, setCurrentSection] = useState(-1); // -1 for landing page
  const [quizData, setQuizData] = useState<QuizSectionType[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Initialize shuffled quiz data
  useEffect(() => {
    setQuizData(getShuffledQuizData());
  }, []);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerActive) {
      interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerActive]);

  // Load saved progress
  useEffect(() => {
    const savedAnswers = localStorage.getItem('quiz-answers');
    const savedSection = localStorage.getItem('quiz-section');
    const savedTime = localStorage.getItem('quiz-time');
    
    if (savedAnswers) setAnswers(JSON.parse(savedAnswers));
    if (savedSection) setCurrentSection(parseInt(savedSection));
    if (savedTime) setTimeElapsed(parseInt(savedTime));
  }, []);

  // Save progress
  useEffect(() => {
    localStorage.setItem('quiz-answers', JSON.stringify(answers));
    localStorage.setItem('quiz-section', currentSection.toString());
    localStorage.setItem('quiz-time', timeElapsed.toString());
  }, [answers, currentSection, timeElapsed]);

  // Dark mode toggle
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getTotalProgress = () => {
    const totalQuestions = quizData.reduce((sum, section) => sum + section.questions.length, 0);
    const answeredQuestions = Object.keys(answers).length;
    return (answeredQuestions / totalQuestions) * 100;
  };

  const startQuiz = () => {
    // Shuffle questions again when starting a new quiz
    setQuizData(getShuffledQuizData());
    setCurrentSection(0);
    setIsTimerActive(true);
  };

  const nextSection = () => {
    if (currentSection < quizData.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const submitQuiz = () => {
    setIsTimerActive(false);
    setShowResults(true);
  };

  const restartQuiz = () => {
    // Shuffle questions again when restarting
    setQuizData(getShuffledQuizData());
    setCurrentSection(-1);
    setAnswers({});
    setShowResults(false);
    setTimeElapsed(0);
    setIsTimerActive(false);
    localStorage.removeItem('quiz-answers');
    localStorage.removeItem('quiz-section');
    localStorage.removeItem('quiz-time');
  };

  const exportResults = () => {
    const results = {
      timeElapsed: formatTime(timeElapsed),
      answers,
      timestamp: new Date().toISOString(),
      totalQuestions: quizData.reduce((sum, section) => sum + section.questions.length, 0),
      answeredQuestions: Object.keys(answers).length
    };
    
    const blob = new Blob([JSON.stringify(results, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'fnb-quiz-results.json';
    a.click();
  };

  if (showResults) {
    return (
      <ResultsView
        answers={answers}
        quizData={quizData}
        timeElapsed={timeElapsed}
        onRestart={restartQuiz}
        onExport={exportResults}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-md border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-2 rounded-lg">
                <span className="font-bold text-lg">FNB</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                App Academy Exam Prep
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              {currentSection >= 0 && (
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                  <Clock className="w-4 h-4" />
                  <span className="font-mono">{formatTime(timeElapsed)}</span>
                </div>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2"
              >
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Landing Page */}
        {currentSection === -1 && (
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                FNB App Academy Exam Prep
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                with Simphiwe Radebe
              </p>
            </div>

            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-center">Exam Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="font-medium">Total Questions:</span>
                      <Badge variant="secondary">50 (10 per section)</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Sections:</span>
                      <Badge variant="secondary">{quizData.length}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Question Types:</span>
                      <Badge variant="secondary">Mixed</Badge>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {quizData.map((section, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-300">{section.title}:</span>
                        <span className="font-medium">10 questions</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button 
              onClick={startQuiz}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 text-lg font-semibold"
            >
              Start Quiz
            </Button>
          </div>
        )}

        {/* Quiz Section */}
        {quizData.length > 0 && currentSection >= 0 && currentSection < quizData.length && (
          <div className="space-y-6">
            {/* Progress Bar */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    Overall Progress
                  </span>
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    {Math.round(getTotalProgress())}%
                  </span>
                </div>
                <Progress value={getTotalProgress()} className="h-2" />
              </CardContent>
            </Card>

            {/* Section Header */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <Badge variant="outline" className="mb-2">
                      Section {currentSection + 1} of {quizData.length}
                    </Badge>
                    <CardTitle className="text-xl">
                      {quizData[currentSection].title}
                    </CardTitle>
                  </div>
                  <div className="text-right text-sm text-gray-600 dark:text-gray-300">
                    {quizData[currentSection].questions.length} questions
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Quiz Section Component */}
            <QuizSection
             key={currentSection}
              section={quizData[currentSection]}
              sectionIndex={currentSection}
              answers={answers}
              onAnswerChange={(questionId, answer) => {
                setAnswers(prev => ({ ...prev, [questionId]: answer }));
              }}
            />

            {/* Navigation */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={prevSection}
                    disabled={currentSection === 0}
                  >
                    Previous Section
                  </Button>
                  <div className="flex space-x-2">
                    {currentSection < quizData.length - 1 ? (
                      <Button onClick={nextSection}>
                        Next Section
                      </Button>
                    ) : (
                      <Button onClick={submitQuiz} className="bg-green-600 hover:bg-green-700">
                        Submit Quiz
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}