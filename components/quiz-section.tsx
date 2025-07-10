'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Code, CheckCircle, Circle } from 'lucide-react';
import { QuizSection as QuizSectionType, Question } from '@/lib/quiz-data';
import { cn } from '@/lib/utils';

interface QuizSectionProps {
  section: QuizSectionType;
  sectionIndex: number;
  answers: Record<string, string>;
  onAnswerChange: (questionId: string, answer: string) => void;
}

export function QuizSection({ section, sectionIndex, answers, onAnswerChange }: QuizSectionProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const isAnswered = (questionId: string) => {
    return answers[questionId] !== undefined && answers[questionId] !== '';
  };

  const getQuestionTypeIcon = (type: Question['type']) => {
    switch (type) {
      case 'multiple-choice':
        return <Circle className="w-4 h-4" />;
      case 'code-prediction':
      case 'output-tracing':
        return <Code className="w-4 h-4" />;
      default:
        return <Circle className="w-4 h-4" />;
    }
  };

  const getQuestionTypeLabel = (type: Question['type']) => {
    switch (type) {
      case 'multiple-choice':
        return 'Multiple Choice';
      case 'short-text':
        return 'Short Answer';
      case 'code-prediction':
        return 'Code Prediction';
      case 'output-tracing':
        return 'Output Tracing';
      default:
        return 'Question';
    }
  };

  const renderQuestion = (question: Question, index: number) => {
    const isCurrentAnswer = answers[question.id] || '';

    return (
      <Card key={question.id} className="mb-6">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="flex items-center space-x-1">
                {getQuestionTypeIcon(question.type)}
                <span>{getQuestionTypeLabel(question.type)}</span>
              </Badge>
              {isAnswered(question.id) && (
                <Badge variant="secondary" className="flex items-center space-x-1">
                  <CheckCircle className="w-3 h-3" />
                  <span>Answered</span>
                </Badge>
              )}
            </div>
            <span className="text-sm text-gray-500">
              Question {index + 1} of {section.questions.length}
            </span>
          </div>
          <CardTitle className="text-lg">
            {question.question}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {question.code && (
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg font-mono text-sm overflow-x-auto">
              <pre className="whitespace-pre-wrap">{question.code}</pre>
            </div>
          )}

          {question.type === 'multiple-choice' && question.options && (
            <RadioGroup
              value={isCurrentAnswer}
              onValueChange={(value) => onAnswerChange(question.id, value)}
            >
              <div className="space-y-3">
                {question.options.map((option, optionIndex) => (
                  <div key={optionIndex} className="flex items-center space-x-2">
                    <RadioGroupItem value={option} id={`${question.id}-${optionIndex}`} />
                    <Label 
                      htmlFor={`${question.id}-${optionIndex}`}
                      className="flex-1 cursor-pointer"
                    >
                      {option}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          )}

          {question.type === 'short-text' && (
            <Input
              placeholder="Enter your answer..."
              value={isCurrentAnswer}
              onChange={(e) => onAnswerChange(question.id, e.target.value)}
              className="w-full"
            />
          )}

          {(question.type === 'code-prediction' || question.type === 'output-tracing') && (
            <div className="space-y-2">
              <Label htmlFor={`answer-${question.id}`} className="text-sm font-medium">
                Your answer:
              </Label>
              <Textarea
                id={`answer-${question.id}`}
                placeholder="Enter your answer..."
                value={isCurrentAnswer}
                onChange={(e) => onAnswerChange(question.id, e.target.value)}
                className="w-full min-h-[100px]"
              />
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Question Navigation */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-2 mb-4">
            {section.questions.map((_, index) => (
              <Button
                key={index}
                variant={currentQuestion === index ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentQuestion(index)}
                className={cn(
                  "w-10 h-10 p-0",
                  isAnswered(section.questions[index].id) && "bg-green-100 border-green-300 text-green-800 hover:bg-green-200"
                )}
              >
                {index + 1}
                {isAnswered(section.questions[index].id) && (
                  <CheckCircle className="w-3 h-3 ml-1" />
                )}
              </Button>
            ))}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300">
            Progress: {section.questions.filter(q => isAnswered(q.id)).length} of {section.questions.length} questions answered
          </div>
        </CardContent>
      </Card>

      {/* Current Question */}
      {renderQuestion(section.questions[currentQuestion], currentQuestion)}

      {/* Question Navigation */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
              disabled={currentQuestion === 0}
            >
              Previous Question
            </Button>
            <Button
              onClick={() => setCurrentQuestion(Math.min(section.questions.length - 1, currentQuestion + 1))}
              disabled={currentQuestion === section.questions.length - 1}
            >
              Next Question
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}