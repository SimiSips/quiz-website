# FNB App Academy Quiz with Social Sharing

An interactive quiz application to help learners prepare for the FNB App Academy final exam, featuring a beautiful social sharing feature.

## Features

### Quiz Functionality
- Interactive multiple-choice questions
- Real-time scoring and progress tracking
- Detailed results breakdown by section
- Time tracking
- Dark/light mode toggle
- Export results functionality

### Social Sharing Feature ✨
- **Beautiful Image Generation**: Creates stunning shareable images with quiz results
- **Multiple Social Platforms**: Share to Twitter, Facebook, LinkedIn, and WhatsApp
- **Copy to Clipboard**: Easy text sharing with the hashtag #FNBAppAcademyHelp
- **Download Image**: Save the generated image locally
- **Responsive Design**: Works perfectly on all devices

### Share Message Format
```
I scored 56% (20/50) questions on my test quiz with sims, see what you can get. #FNBAppAcademyHelp
```

## Technology Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Image Generation**: html2canvas
- **Icons**: Lucide React
- **Deployment**: Netlify

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## How to Use the Sharing Feature

1. Complete the quiz
2. View your results
3. Click the "Share Results" button (available in both header and actions section)
4. Choose your preferred sharing method:
   - **Social Media**: Share directly to Twitter, Facebook, LinkedIn, or WhatsApp
   - **Copy Text**: Copy the formatted message to your clipboard
   - **Download Image**: Save the beautiful generated image

## Generated Image Features

The shareable image includes:
- Your overall score percentage
- Number of correct answers vs total questions
- Time taken to complete the quiz
- Visual progress bar
- Motivational message
- FNB App Academy branding
- Professional gradient design

## Development

### Project Structure
```
quiz-sims-fnb/
├── app/                 # Next.js app directory
├── components/          # React components
│   ├── ui/             # shadcn/ui components
│   ├── quiz-section.tsx
│   ├── results-view.tsx
│   └── shareable-image.tsx  # Social sharing component
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and data
└── public/             # Static assets
```

### Key Components

- **`ShareableImage`**: Handles image generation and social sharing
- **`ResultsView`**: Displays quiz results with sharing integration
- **`QuizSection`**: Manages individual quiz sections

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is created for educational purposes in preparation for the FNB App Academy. 