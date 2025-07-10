'use client';

import { useRef, useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Trophy, Target, Share2, Download, Twitter, Facebook, Linkedin, MessageCircle } from 'lucide-react';
import { QuizSection } from '@/lib/quiz-data';
import { useToast } from '@/hooks/use-toast';

interface ShareableImageProps {
  results: {
    totalQuestions: number;
    answeredQuestions: number;
    correctAnswers: number;
    needsReview: number;
    overallScore: number;
    completionRate: number;
    sectionResults: Array<{
      title: string;
      total: number;
      answered: number;
      correct: number;
      needsReview: number;
      score: number;
    }>;
  };
  timeElapsed: number;
  isVisible: boolean;
  onClose: () => void;
}

export function ShareableImage({ results, timeElapsed, isVisible, onClose }: ShareableImageProps) {
  const imageRef = useRef<HTMLDivElement>(null);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const generateImage = async () => {
    if (!imageRef.current) return;
    
    setIsGenerating(true);
    try {
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(imageRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        width: 1200,
        height: 630,
        useCORS: true,
        allowTaint: true,
      });
      
      const imageUrl = canvas.toDataURL('image/png');
      setImageUrl(imageUrl);
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadImage = () => {
    if (!imageUrl) return;
    
    const link = document.createElement('a');
    link.download = `quiz-results-${Math.round(results.overallScore)}.png`;
    link.href = imageUrl;
    link.click();
    
    toast({
      title: "Image downloaded!",
      description: "Your quiz results image has been saved.",
    });
  };

  const shareToSocial = (platform: string) => {
    const text = `I scored ${Math.round(results.overallScore)}% (${results.correctAnswers}/${results.totalQuestions}) questions on my test quiz with sims, see what you can get. #FNBAppAcademyHelp`;
    const url = window.location.href;
    
    let shareUrl = '';
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  const copyToClipboard = async () => {
    const text = `I scored ${Math.round(results.overallScore)}% (${results.correctAnswers}/${results.totalQuestions}) questions on my test quiz with sims, see what you can get. #FNBAppAcademyHelp`;
    
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied to clipboard!",
        description: "Share text has been copied to your clipboard.",
      });
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      toast({
        title: "Failed to copy",
        description: "Please try copying manually.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (isVisible) {
      generateImage();
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">Share Your Results</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              ✕
            </Button>
          </div>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Preview */}
          <div className="flex justify-center">
            <div className="relative">
              {isGenerating && (
                <div className="absolute inset-0 bg-white/80 flex items-center justify-center rounded-lg">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                    <p className="text-sm text-gray-600">Generating image...</p>
                  </div>
                </div>
              )}
              
              {/* Shareable Image */}
              <div 
                ref={imageRef}
                className="w-[600px] h-[315px] bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-lg p-8 text-white relative overflow-hidden"
                style={{ display: 'block' }}
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-4 right-4 w-32 h-32 bg-white rounded-full"></div>
                  <div className="absolute bottom-8 left-8 w-24 h-24 bg-white rounded-full"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full"></div>
                </div>
                
                {/* Content */}
                <div className="relative z-10 h-full flex flex-col justify-between">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="bg-white/20 p-3 rounded-full">
                        <Trophy className="w-8 h-8 text-yellow-300" />
                      </div>
                      <div>
                        <h1 className="text-2xl font-bold">Quiz Results</h1>
                        <p className="text-blue-100 text-sm">FNB App Academy</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-blue-100">Time</div>
                      <div className="text-lg font-mono font-bold">{formatTime(timeElapsed)}</div>
                    </div>
                  </div>
                  
                  {/* Score */}
                  <div className="text-center">
                    <div className="text-7xl font-bold text-yellow-300 mb-2">
                      {Math.round(results.overallScore)}%
                    </div>
                    <div className="text-xl text-blue-100 mb-4">
                      {results.correctAnswers} out of {results.totalQuestions} questions correct
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-3 mb-4">
                      <div 
                        className="bg-yellow-300 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${results.overallScore}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-300">{results.answeredQuestions}</div>
                      <div className="text-xs text-blue-100">Answered</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-200">{results.correctAnswers}</div>
                      <div className="text-xs text-blue-100">Correct</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-300">{results.needsReview}</div>
                      <div className="text-xs text-blue-100">Review</div>
                    </div>
                  </div>
                  
                  {/* Footer */}
                  <div className="text-center">
                    <p className="text-sm text-blue-100">
                      Africa needs builders. And you are one of them.
                    </p>
                    <p className="text-xs text-blue-200 mt-1">#FNBAppAcademyHelp</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Share Actions */}
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Share your achievement!</h3>
              <p className="text-sm text-gray-600">
                I scored {Math.round(results.overallScore)}% ({results.correctAnswers}/{results.totalQuestions}) questions on my test quiz with sims, see what you can get. #FNBAppAcademyHelp
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <Button
                onClick={() => shareToSocial('twitter')}
                className="bg-blue-500 hover:bg-blue-600 text-white"
              >
                <Twitter className="w-4 h-4 mr-2" />
                Twitter
              </Button>
              
              <Button
                onClick={() => shareToSocial('facebook')}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Facebook className="w-4 h-4 mr-2" />
                Facebook
              </Button>
              
              <Button
                onClick={() => shareToSocial('whatsapp')}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp
              </Button>
              
              <Button
                onClick={() => shareToSocial('linkedin')}
                className="bg-blue-700 hover:bg-blue-800 text-white"
              >
                <Linkedin className="w-4 h-4 mr-2" />
                LinkedIn
              </Button>
              
              <Button
                onClick={copyToClipboard}
                variant="outline"
                className="col-span-2 md:col-span-1"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Copy Text
              </Button>
              
              <Button
                onClick={downloadImage}
                variant="outline"
                disabled={!imageUrl}
                className="col-span-2 md:col-span-1"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Image
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 