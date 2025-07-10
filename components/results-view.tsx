'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, XCircle, Clock, Download, RotateCcw, AlertCircle, Trophy, Target, Sun, Moon } from 'lucide-react';
import { QuizSection } from '@/lib/quiz-data';
import { cn } from '@/lib/utils';

interface ResultsViewProps {
  answers: Record<string, string>;
  quizData: QuizSection[];
  timeElapsed: number;
  onRestart: () => void;
  onExport: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export function ResultsView({ 
  answers, 
  quizData,
  timeElapsed, 
  onRestart, 
  onExport, 
  isDarkMode, 
  onToggleDarkMode 
}: ResultsViewProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const calculateResults = () => {
    let totalQuestions = 0;
    let correctAnswers = 0;
    let answeredQuestions = 0;
    let needsReview = 0;
    
    const sectionResults = quizData.map(section => {
      let sectionCorrect = 0;
      let sectionAnswered = 0;
      let sectionNeedsReview = 0;
      
      section.questions.forEach(question => {
        totalQuestions++;
        
        if (answers[question.id] && answers[question.id].trim() !== '') {
          answeredQuestions++;
          sectionAnswered++;
          
          if (question.type === 'multiple-choice' && question.correctAnswer) {
            if (answers[question.id] === question.correctAnswer) {
              correctAnswers++;
              sectionCorrect++;
            }
          } else {
            needsReview++;
            sectionNeedsReview++;
          }
        }
      });
      
      return {
        title: section.title,
        total: section.questions.length,
        answered: sectionAnswered,
        correct: sectionCorrect,
        needsReview: sectionNeedsReview,
        score: section.questions.length > 0 ? (sectionCorrect / section.questions.length) * 100 : 0
      };
    });
    
    return {
      totalQuestions,
      answeredQuestions,
      correctAnswers,
      needsReview,
      overallScore: totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0,
      completionRate: totalQuestions > 0 ? (answeredQuestions / totalQuestions) * 100 : 0,
      sectionResults
    };
  };

  const results = calculateResults();

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBadgeVariant = (score: number) => {
    if (score >= 80) return 'default';
    if (score >= 60) return 'secondary';
    return 'destructive';
  };

  const getMotivationalMessage = () => {
    if (results.overallScore >= 80) {
      return "🎉 Excellent work! Africa needs builders. And you are one of them.";
    } else if (results.overallScore >= 60) {
      return "👍 Good effort! Keep building your skills. Africa needs builders. And you are one of them.";
    } else {
      return "💪 Every expert was once a beginner. Keep learning and building. Africa needs builders. And you are one of them.";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-md border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-2 rounded-lg">
                <Trophy className="w-6 h-6" />
              </div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                Quiz Results
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                <Clock className="w-4 h-4" />
                <span className="font-mono">{formatTime(timeElapsed)}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={onToggleDarkMode}
                className="p-2"
              >
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Overall Score */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
          <CardHeader>
            <CardTitle className="text-center text-2xl">
              Overall Results
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-4">
              <div className="text-6xl font-bold text-blue-600 dark:text-blue-400">
                {Math.round(results.overallScore)}%
              </div>
              <div className="text-lg text-gray-600 dark:text-gray-300">
                {results.correctAnswers} out of {results.totalQuestions} questions correct
              </div>
              <Progress value={results.overallScore} className="h-4" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {results.answeredQuestions}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Questions Answered
                </div>
              </div>
              <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {results.correctAnswers}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Correct Answers
                </div>
              </div>
              <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                  {results.needsReview}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Need Review
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Motivational Message */}
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800">
          <CardContent className="pt-6">
            <div className="text-center text-lg font-medium text-green-800 dark:text-green-300">
              {getMotivationalMessage()}
            </div>
          </CardContent>
        </Card>

        {/* Section Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="w-5 h-5" />
              <span>Section Breakdown</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {results.sectionResults.map((section, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{section.title}</span>
                  <div className="flex items-center space-x-2">
                    <Badge variant={getScoreBadgeVariant(section.score)}>
                      {Math.round(section.score)}%
                    </Badge>
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {section.correct}/{section.total}
                    </span>
                  </div>
                </div>
                <Progress value={section.score} className="h-2" />
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                  <span>Answered: {section.answered}</span>
                  {section.needsReview > 0 && (
                    <span className="flex items-center space-x-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>Review needed: {section.needsReview}</span>
                    </span>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Detailed Review */}
        <Card>
          <CardHeader>
            <CardTitle>Detailed Review</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {quizData.map((section, sectionIndex) => (
              <div key={sectionIndex} className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {section.title}
                </h3>
                <div className="space-y-3">
                  {section.questions.map((question, questionIndex) => {
                    const userAnswer = answers[question.id];
                    const hasAnswer = userAnswer && userAnswer.trim() !== '';
                    const isCorrect = question.type === 'multiple-choice' && 
                                    question.correctAnswer && 
                                    userAnswer === question.correctAnswer;
                    const needsReview = hasAnswer && question.type !== 'multiple-choice';

                    return (
                      <div key={question.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                              Q{questionIndex + 1}:
                            </span>
                            {!hasAnswer && (
                              <Badge variant="outline" className="text-xs">
                                Not Answered
                              </Badge>
                            )}
                            {question.type === 'multiple-choice' && hasAnswer && (
                              <Badge variant={isCorrect ? "default" : "destructive"} className="text-xs">
                                {isCorrect ? (
                                  <><CheckCircle className="w-3 h-3 mr-1" /> Correct</>
                                ) : (
                                  <><XCircle className="w-3 h-3 mr-1" /> Incorrect</>
                                )}
                              </Badge>
                            )}
                            {needsReview && (
                              <Badge variant="secondary" className="text-xs">
                                <AlertCircle className="w-3 h-3 mr-1" /> Manual Review Needed
                              </Badge>
                            )}
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                          {question.question}
                        </p>
                        
                        {hasAnswer && (
                          <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded text-sm">
                            <span className="font-medium text-gray-600 dark:text-gray-400">Your answer: </span>
                            <span className="text-gray-900 dark:text-white">{userAnswer}</span>
                          </div>
                        )}
                        
                        {question.type === 'multiple-choice' && question.correctAnswer && hasAnswer && !isCorrect && (
                          <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded text-sm mt-2">
                            <span className="font-medium text-green-600 dark:text-green-400">Correct answer: </span>
                            <span className="text-green-800 dark:text-green-300">{question.correctAnswer}</span>
                          </div>
                        )}
                        
                        {question.explanation && hasAnswer && (
                          <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded text-sm mt-2">
                            <span className="font-medium text-blue-600 dark:text-blue-400">Explanation: </span>
                            <span className="text-blue-800 dark:text-blue-300">{question.explanation}</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                {sectionIndex < quizData.length - 1 && <Separator />}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={onRestart}
            size="lg"
            className="flex items-center space-x-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Restart Quiz</span>
          </Button>
          <Button
            onClick={onExport}
            variant="outline"
            size="lg"
            className="flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Export Results</span>
          </Button>
        </div>
      </div>
    </div>
  );
}