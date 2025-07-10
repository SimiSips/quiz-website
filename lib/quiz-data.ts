export interface Question {
  id: string;
  question: string;
  type: 'multiple-choice' | 'short-text' | 'code-prediction' | 'output-tracing';
  options?: string[];
  correctAnswer?: string;
  code?: string;
  explanation?: string;
}

export interface QuizSection {
  title: string;
  questions: Question[];
}

// Fisher-Yates shuffle algorithm
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const htmlCssQuestions: Question[] = [
  {
    id: 'html-1',
    question: 'Which HTML5 semantic element is best for containing navigation links?',
    type: 'multiple-choice',
    options: ['<div>', '<nav>', '<section>', '<header>'],
    correctAnswer: '<nav>',
    explanation: 'The <nav> element is specifically designed for navigation links and provides semantic meaning.'
  },
  {
    id: 'html-2',
    question: 'What does CSS Grid\'s "grid-template-areas" property allow you to do?',
    type: 'multiple-choice',
    options: ['Define grid line names', 'Create named grid areas for layout', 'Set grid item sizes', 'Control grid gaps'],
    correctAnswer: 'Create named grid areas for layout',
    explanation: 'grid-template-areas lets you create a visual representation of your layout using named areas.'
  },
  {
    id: 'html-3',
    question: 'Which CSS property is used to create a sticky header that stays at the top when scrolling?',
    type: 'multiple-choice',
    options: ['position: fixed', 'position: sticky', 'position: absolute', 'position: relative'],
    correctAnswer: 'position: sticky',
    explanation: 'position: sticky creates an element that toggles between relative and fixed positioning based on scroll position.'
  },
  {
    id: 'html-4',
    question: 'What is the purpose of the "alt" attribute in img tags?',
    type: 'short-text',
    correctAnswer: 'accessibility',
    explanation: 'The alt attribute provides alternative text for screen readers and when images fail to load.'
  },
  {
    id: 'html-5',
    question: 'Which CSS unit is best for responsive typography?',
    type: 'multiple-choice',
    options: ['px', 'em', 'rem', 'pt'],
    correctAnswer: 'rem',
    explanation: 'rem units are relative to the root font size, making them ideal for responsive typography.'
  },
  {
    id: 'html-6',
    question: 'What does the CSS "box-sizing: border-box" property do?',
    type: 'multiple-choice',
    options: ['Adds padding outside the element', 'Includes padding and border in element width', 'Removes borders', 'Centers the element'],
    correctAnswer: 'Includes padding and border in element width',
    explanation: 'border-box makes padding and border count inside the element\'s total width and height.'
  },
  {
    id: 'html-7',
    question: 'Which HTML attribute makes an input field required?',
    type: 'short-text',
    correctAnswer: 'required',
    explanation: 'The required attribute prevents form submission if the field is empty.'
  },
  {
    id: 'html-8',
    question: 'What CSS property controls the stacking order of elements?',
    type: 'multiple-choice',
    options: ['z-index', 'stack-order', 'layer', 'depth'],
    correctAnswer: 'z-index',
    explanation: 'z-index controls which elements appear in front of others when they overlap.'
  },
  {
    id: 'html-9',
    question: 'Which CSS display value creates a flex container?',
    type: 'multiple-choice',
    options: ['block', 'inline', 'flex', 'grid'],
    correctAnswer: 'flex',
    explanation: 'display: flex creates a flex container and enables flexbox layout for its children.'
  },
  {
    id: 'html-10',
    question: 'What is the difference between margin and padding?',
    type: 'short-text',
    correctAnswer: 'margin is outside, padding is inside',
    explanation: 'Margin creates space outside the element, padding creates space inside the element.'
  },
  {
    id: 'html-11',
    question: 'Which CSS property is used to create rounded corners?',
    type: 'multiple-choice',
    options: ['corner-radius', 'border-radius', 'round-corners', 'border-round'],
    correctAnswer: 'border-radius',
    explanation: 'border-radius creates rounded corners on elements.'
  },
  {
    id: 'html-12',
    question: 'What does the CSS "overflow: hidden" property do?',
    type: 'multiple-choice',
    options: ['Hides the element', 'Clips content that overflows', 'Makes element transparent', 'Removes borders'],
    correctAnswer: 'Clips content that overflows',
    explanation: 'overflow: hidden clips any content that extends beyond the element\'s boundaries.'
  },
  {
    id: 'html-13',
    question: 'Which HTML5 input type is used for email addresses?',
    type: 'short-text',
    correctAnswer: 'email',
    explanation: 'input type="email" provides built-in email validation and appropriate mobile keyboards.'
  },
  {
    id: 'html-14',
    question: 'What CSS property controls text alignment?',
    type: 'multiple-choice',
    options: ['align-text', 'text-align', 'text-position', 'align'],
    correctAnswer: 'text-align',
    explanation: 'text-align controls horizontal alignment of text within its container.'
  },
  {
    id: 'html-15',
    question: 'Which CSS selector targets elements with a specific class?',
    type: 'multiple-choice',
    options: ['#classname', '.classname', 'classname', '*classname'],
    correctAnswer: '.classname',
    explanation: 'The dot (.) prefix is used to select elements by their class attribute.'
  },
  {
    id: 'html-16',
    question: 'What is the purpose of CSS media queries?',
    type: 'short-text',
    correctAnswer: 'responsive design',
    explanation: 'Media queries allow different CSS rules for different screen sizes and devices.'
  },
  {
    id: 'html-17',
    question: 'Which CSS property controls the space between lines of text?',
    type: 'multiple-choice',
    options: ['line-spacing', 'line-height', 'text-spacing', 'line-gap'],
    correctAnswer: 'line-height',
    explanation: 'line-height controls the vertical space between lines of text.'
  },
  {
    id: 'html-18',
    question: 'What does the HTML "viewport" meta tag control?',
    type: 'multiple-choice',
    options: ['Page title', 'Mobile display scaling', 'Search engine indexing', 'Page encoding'],
    correctAnswer: 'Mobile display scaling',
    explanation: 'The viewport meta tag controls how the page is displayed on mobile devices.'
  },
  {
    id: 'html-19',
    question: 'Which CSS property makes text bold?',
    type: 'short-text',
    correctAnswer: 'font-weight',
    explanation: 'font-weight: bold or font-weight: 700 makes text appear bold.'
  },
  {
    id: 'html-20',
    question: 'What is the default display value for div elements?',
    type: 'multiple-choice',
    options: ['inline', 'block', 'flex', 'grid'],
    correctAnswer: 'block',
    explanation: 'Div elements are block-level by default, taking up the full width available.'
  },
  {
    id: 'html-21',
    question: 'Which CSS property controls element transparency?',
    type: 'multiple-choice',
    options: ['transparency', 'opacity', 'alpha', 'visibility'],
    correctAnswer: 'opacity',
    explanation: 'opacity controls how transparent an element appears (0 = invisible, 1 = opaque).'
  },
  {
    id: 'html-22',
    question: 'What HTML element is used for the largest heading?',
    type: 'short-text',
    correctAnswer: 'h1',
    explanation: 'h1 is the largest heading element and should be used for main page titles.'
  },
  {
    id: 'html-23',
    question: 'Which CSS property controls the font family?',
    type: 'multiple-choice',
    options: ['font-family', 'font-type', 'typeface', 'font-name'],
    correctAnswer: 'font-family',
    explanation: 'font-family specifies which fonts to use for text rendering.'
  },
  {
    id: 'html-24',
    question: 'What does CSS "position: absolute" do?',
    type: 'multiple-choice',
    options: ['Centers the element', 'Positions relative to nearest positioned parent', 'Makes element sticky', 'Removes from layout'],
    correctAnswer: 'Positions relative to nearest positioned parent',
    explanation: 'Absolute positioning places elements relative to their nearest positioned ancestor.'
  },
  {
    id: 'html-25',
    question: 'Which HTML attribute specifies a unique identifier?',
    type: 'short-text',
    correctAnswer: 'id',
    explanation: 'The id attribute provides a unique identifier for HTML elements.'
  },
  {
    id: 'html-26',
    question: 'What CSS property controls background color?',
    type: 'multiple-choice',
    options: ['bg-color', 'background-color', 'color-background', 'background'],
    correctAnswer: 'background-color',
    explanation: 'background-color sets the background color of an element.'
  },
  {
    id: 'html-27',
    question: 'Which CSS unit is relative to the parent element\'s font size?',
    type: 'multiple-choice',
    options: ['px', 'rem', 'em', '%'],
    correctAnswer: 'em',
    explanation: 'em units are relative to the parent element\'s font size.'
  },
  {
    id: 'html-28',
    question: 'What HTML element creates a line break?',
    type: 'short-text',
    correctAnswer: 'br',
    explanation: 'The <br> element creates a line break in text content.'
  },
  {
    id: 'html-29',
    question: 'Which CSS property controls text color?',
    type: 'multiple-choice',
    options: ['text-color', 'font-color', 'color', 'text-style'],
    correctAnswer: 'color',
    explanation: 'The color property sets the text color of an element.'
  },
  {
    id: 'html-30',
    question: 'What does the CSS "display: none" property do?',
    type: 'multiple-choice',
    options: ['Makes element transparent', 'Hides element completely', 'Makes element small', 'Changes element color'],
    correctAnswer: 'Hides element completely',
    explanation: 'display: none removes the element from the layout entirely.'
  },
  {
    id: 'html-31',
    question: 'Which HTML element is used for creating lists?',
    type: 'multiple-choice',
    options: ['<list>', '<ul> or <ol>', '<items>', '<menu>'],
    correctAnswer: '<ul> or <ol>',
    explanation: '<ul> creates unordered lists, <ol> creates ordered lists.'
  },
  {
    id: 'html-32',
    question: 'What CSS property controls element width?',
    type: 'short-text',
    correctAnswer: 'width',
    explanation: 'The width property sets the width of an element.'
  },
  {
    id: 'html-33',
    question: 'Which CSS property adds shadow to text?',
    type: 'multiple-choice',
    options: ['text-shadow', 'font-shadow', 'shadow', 'text-effect'],
    correctAnswer: 'text-shadow',
    explanation: 'text-shadow adds shadow effects to text.'
  },
  {
    id: 'html-34',
    question: 'What HTML attribute links to external CSS files?',
    type: 'multiple-choice',
    options: ['src', 'href', 'link', 'css'],
    correctAnswer: 'href',
    explanation: 'The href attribute in <link> tags specifies the path to CSS files.'
  },
  {
    id: 'html-35',
    question: 'Which CSS property controls element height?',
    type: 'short-text',
    correctAnswer: 'height',
    explanation: 'The height property sets the height of an element.'
  },
  {
    id: 'html-36',
    question: 'What does CSS "float" property do?',
    type: 'multiple-choice',
    options: ['Makes element transparent', 'Positions element left or right', 'Adds animation', 'Changes color'],
    correctAnswer: 'Positions element left or right',
    explanation: 'Float positions elements to the left or right, allowing text to wrap around them.'
  },
  {
    id: 'html-37',
    question: 'Which HTML element creates a table?',
    type: 'short-text',
    correctAnswer: 'table',
    explanation: 'The <table> element creates a table structure.'
  },
  {
    id: 'html-38',
    question: 'What CSS property controls border thickness?',
    type: 'multiple-choice',
    options: ['border-width', 'border-size', 'border-thickness', 'border'],
    correctAnswer: 'border-width',
    explanation: 'border-width controls the thickness of element borders.'
  },
  {
    id: 'html-39',
    question: 'Which CSS selector targets all elements?',
    type: 'multiple-choice',
    options: ['*', 'all', 'everything', 'global'],
    correctAnswer: '*',
    explanation: 'The asterisk (*) is the universal selector that targets all elements.'
  },
  {
    id: 'html-40',
    question: 'What HTML element creates a hyperlink?',
    type: 'short-text',
    correctAnswer: 'a',
    explanation: 'The <a> element creates hyperlinks to other pages or resources.'
  },
  {
    id: 'html-41',
    question: 'Which CSS property controls cursor appearance on hover?',
    type: 'multiple-choice',
    options: ['cursor', 'pointer', 'hover', 'mouse'],
    correctAnswer: 'cursor',
    explanation: 'The cursor property changes the mouse cursor when hovering over elements.'
  },
  {
    id: 'html-42',
    question: 'What does the HTML "lang" attribute specify?',
    type: 'multiple-choice',
    options: ['Page language', 'Programming language', 'Location', 'Layout'],
    correctAnswer: 'Page language',
    explanation: 'The lang attribute specifies the language of the page content for accessibility and SEO.'
  },
  {
    id: 'html-43',
    question: 'Which CSS property adds space around an element\'s content?',
    type: 'short-text',
    correctAnswer: 'padding',
    explanation: 'Padding adds space between an element\'s content and its border.'
  },
  {
    id: 'html-44',
    question: 'What CSS property controls text decoration?',
    type: 'multiple-choice',
    options: ['text-decoration', 'text-style', 'font-decoration', 'decoration'],
    correctAnswer: 'text-decoration',
    explanation: 'text-decoration controls underlines, overlines, and strikethrough effects.'
  },
  {
    id: 'html-45',
    question: 'Which HTML element represents emphasized text?',
    type: 'multiple-choice',
    options: ['<strong>', '<em>', '<bold>', '<italic>'],
    correctAnswer: '<em>',
    explanation: '<em> represents emphasized text, typically displayed in italics.'
  },
  {
    id: 'html-46',
    question: 'What CSS property controls element borders?',
    type: 'short-text',
    correctAnswer: 'border',
    explanation: 'The border property sets width, style, and color of element borders.'
  },
  {
    id: 'html-47',
    question: 'Which CSS property controls vertical alignment?',
    type: 'multiple-choice',
    options: ['vertical-align', 'align-vertical', 'v-align', 'text-vertical'],
    correctAnswer: 'vertical-align',
    explanation: 'vertical-align controls the vertical positioning of inline elements.'
  },
  {
    id: 'html-48',
    question: 'What HTML element creates a form?',
    type: 'short-text',
    correctAnswer: 'form',
    explanation: 'The <form> element creates a form for user input.'
  },
  {
    id: 'html-49',
    question: 'Which CSS property controls text transformation?',
    type: 'multiple-choice',
    options: ['text-transform', 'text-case', 'case-transform', 'text-style'],
    correctAnswer: 'text-transform',
    explanation: 'text-transform controls capitalization (uppercase, lowercase, capitalize).'
  },
  {
    id: 'html-50',
    question: 'What does the CSS "clear" property do?',
    type: 'multiple-choice',
    options: ['Removes content', 'Clears floated elements', 'Makes transparent', 'Resets styles'],
    correctAnswer: 'Clears floated elements',
    explanation: 'The clear property prevents elements from wrapping around floated elements.'
  }
];

const javascriptDomQuestions: Question[] = [
  {
    id: 'js-1',
    question: 'What will this code output?',
    type: 'output-tracing',
    code: `console.log(typeof null);`,
    correctAnswer: 'object',
    explanation: 'typeof null returns "object" due to a historical bug in JavaScript that has been kept for compatibility.'
  },
  {
    id: 'js-2',
    question: 'Which method adds an element to the end of an array?',
    type: 'multiple-choice',
    options: ['push()', 'pop()', 'shift()', 'unshift()'],
    correctAnswer: 'push()',
    explanation: 'push() adds one or more elements to the end of an array and returns the new length.'
  },
  {
    id: 'js-3',
    question: 'What does "DOM" stand for?',
    type: 'short-text',
    correctAnswer: 'Document Object Model',
    explanation: 'DOM stands for Document Object Model, representing the structure of HTML documents.'
  },
  {
    id: 'js-4',
    question: 'What will this code output?',
    type: 'output-tracing',
    code: `let x = 5;
let y = x++;
console.log(x, y);`,
    correctAnswer: '6 5',
    explanation: 'Post-increment (x++) returns the original value before incrementing.'
  },
  {
    id: 'js-5',
    question: 'Which method selects an element by its ID?',
    type: 'multiple-choice',
    options: ['getElementById()', 'querySelector()', 'getElementsByClassName()', 'getElementsByTagName()'],
    correctAnswer: 'getElementById()',
    explanation: 'getElementById() specifically selects an element by its ID attribute.'
  },
  {
    id: 'js-6',
    question: 'What is the difference between "let" and "var"?',
    type: 'short-text',
    correctAnswer: 'block scope vs function scope',
    explanation: 'let has block scope while var has function scope, and let prevents hoisting issues.'
  },
  {
    id: 'js-7',
    question: 'What will this code output?',
    type: 'output-tracing',
    code: `console.log(0 == false);
console.log(0 === false);`,
    correctAnswer: 'true false',
    explanation: '== performs type coercion, === checks both value and type without coercion.'
  },
  {
    id: 'js-8',
    question: 'Which method removes the last element from an array?',
    type: 'multiple-choice',
    options: ['pop()', 'push()', 'shift()', 'splice()'],
    correctAnswer: 'pop()',
    explanation: 'pop() removes and returns the last element from an array.'
  },
  {
    id: 'js-9',
    question: 'What does "addEventListener" do?',
    type: 'short-text',
    correctAnswer: 'attaches event handlers',
    explanation: 'addEventListener attaches event handler functions to DOM elements.'
  },
  {
    id: 'js-10',
    question: 'What will this code output?',
    type: 'output-tracing',
    code: `const arr = [1, 2, 3];
arr.push(4);
console.log(arr.length);`,
    correctAnswer: '4',
    explanation: 'Even though arr is const, array contents can be modified. push() adds an element.'
  },
  {
    id: 'js-11',
    question: 'Which operator checks for strict equality?',
    type: 'multiple-choice',
    options: ['==', '===', '=', '!='],
    correctAnswer: '===',
    explanation: '=== checks for strict equality without type coercion.'
  },
  {
    id: 'js-12',
    question: 'What method converts a string to uppercase?',
    type: 'short-text',
    correctAnswer: 'toUpperCase()',
    explanation: 'toUpperCase() converts all characters in a string to uppercase.'
  },
  {
    id: 'js-13',
    question: 'What will this code output?',
    type: 'output-tracing',
    code: `function test() {
  return
    {
      name: "John"
    };
}
console.log(test());`,
    correctAnswer: 'undefined',
    explanation: 'Automatic semicolon insertion adds a semicolon after return, making it return undefined.'
  },
  {
    id: 'js-14',
    question: 'Which method creates a new array with filtered elements?',
    type: 'multiple-choice',
    options: ['map()', 'filter()', 'reduce()', 'forEach()'],
    correctAnswer: 'filter()',
    explanation: 'filter() creates a new array with elements that pass a test function.'
  },
  {
    id: 'js-15',
    question: 'What does "querySelector" return if no element is found?',
    type: 'short-text',
    correctAnswer: 'null',
    explanation: 'querySelector returns null when no matching element is found.'
  },
  {
    id: 'js-16',
    question: 'What will this code output?',
    type: 'output-tracing',
    code: `console.log([1, 2, 3] + [4, 5, 6]);`,
    correctAnswer: '1,2,34,5,6',
    explanation: 'Arrays are converted to strings and concatenated when using the + operator.'
  },
  {
    id: 'js-17',
    question: 'Which method removes the first element from an array?',
    type: 'multiple-choice',
    options: ['shift()', 'unshift()', 'pop()', 'splice()'],
    correctAnswer: 'shift()',
    explanation: 'shift() removes and returns the first element from an array.'
  },
  {
    id: 'js-18',
    question: 'What is a closure in JavaScript?',
    type: 'short-text',
    correctAnswer: 'function with access to outer scope',
    explanation: 'A closure is a function that has access to variables in its outer scope even after the outer function returns.'
  },
  {
    id: 'js-19',
    question: 'What will this code output?',
    type: 'output-tracing',
    code: `let a = [1, 2, 3];
let b = a;
b.push(4);
console.log(a.length);`,
    correctAnswer: '4',
    explanation: 'Arrays are reference types, so b and a point to the same array object.'
  },
  {
    id: 'js-20',
    question: 'Which method adds elements to the beginning of an array?',
    type: 'multiple-choice',
    options: ['unshift()', 'shift()', 'push()', 'pop()'],
    correctAnswer: 'unshift()',
    explanation: 'unshift() adds one or more elements to the beginning of an array.'
  },
  {
    id: 'js-21',
    question: 'What does "preventDefault()" do?',
    type: 'short-text',
    correctAnswer: 'stops default behavior',
    explanation: 'preventDefault() stops the default action of an event from occurring.'
  },
  {
    id: 'js-22',
    question: 'What will this code output?',
    type: 'output-tracing',
    code: `console.log(1 + "2" + 3);`,
    correctAnswer: '123',
    explanation: 'String concatenation occurs left to right: 1 + "2" = "12", then "12" + 3 = "123".'
  },
  {
    id: 'js-23',
    question: 'Which method transforms each array element?',
    type: 'multiple-choice',
    options: ['map()', 'filter()', 'find()', 'some()'],
    correctAnswer: 'map()',
    explanation: 'map() creates a new array by transforming each element with a function.'
  },
  {
    id: 'js-24',
    question: 'What is the difference between "null" and "undefined"?',
    type: 'short-text',
    correctAnswer: 'null is assigned, undefined is default',
    explanation: 'null is an assigned value representing "no value", undefined means a variable has been declared but not assigned.'
  },
  {
    id: 'js-25',
    question: 'What will this code output?',
    type: 'output-tracing',
    code: `const obj = { a: 1 };
const obj2 = obj;
obj2.a = 2;
console.log(obj.a);`,
    correctAnswer: '2',
    explanation: 'Objects are reference types, so obj and obj2 point to the same object.'
  },
  {
    id: 'js-26',
    question: 'Which method checks if an array includes a value?',
    type: 'multiple-choice',
    options: ['includes()', 'contains()', 'has()', 'indexOf()'],
    correctAnswer: 'includes()',
    explanation: 'includes() returns true if an array contains a specified value.'
  },
  {
    id: 'js-27',
    question: 'What does "this" refer to in a regular function?',
    type: 'short-text',
    correctAnswer: 'global object or undefined',
    explanation: 'In regular functions, "this" refers to the global object (window) or undefined in strict mode.'
  },
  {
    id: 'js-28',
    question: 'What will this code output?',
    type: 'output-tracing',
    code: `console.log(typeof []);`,
    correctAnswer: 'object',
    explanation: 'Arrays are objects in JavaScript, so typeof returns "object".'
  },
  {
    id: 'js-29',
    question: 'Which method finds the first element that matches a condition?',
    type: 'multiple-choice',
    options: ['find()', 'filter()', 'map()', 'some()'],
    correctAnswer: 'find()',
    explanation: 'find() returns the first element that satisfies the provided testing function.'
  },
  {
    id: 'js-30',
    question: 'What is event bubbling?',
    type: 'short-text',
    correctAnswer: 'events propagate up the DOM tree',
    explanation: 'Event bubbling is when events propagate from the target element up through its ancestors.'
  },
  {
    id: 'js-31',
    question: 'What will this code output?',
    type: 'output-tracing',
    code: `console.log(3 > 2 > 1);`,
    correctAnswer: 'false',
    explanation: '3 > 2 evaluates to true, then true > 1 becomes 1 > 1, which is false.'
  },
  {
    id: 'js-32',
    question: 'Which method joins array elements into a string?',
    type: 'multiple-choice',
    options: ['join()', 'concat()', 'toString()', 'split()'],
    correctAnswer: 'join()',
    explanation: 'join() creates a string by concatenating array elements with a specified separator.'
  },
  {
    id: 'js-33',
    question: 'What does "async/await" do?',
    type: 'short-text',
    correctAnswer: 'handles promises synchronously',
    explanation: 'async/await provides a way to write asynchronous code that looks and behaves like synchronous code.'
  },
  {
    id: 'js-34',
    question: 'What will this code output?',
    type: 'output-tracing',
    code: `let x = 1;
function test() {
  console.log(x);
  let x = 2;
}
test();`,
    correctAnswer: 'ReferenceError',
    explanation: 'Temporal dead zone: x is hoisted but not accessible before its declaration.'
  },
  {
    id: 'js-35',
    question: 'Which method reduces an array to a single value?',
    type: 'multiple-choice',
    options: ['reduce()', 'map()', 'filter()', 'find()'],
    correctAnswer: 'reduce()',
    explanation: 'reduce() executes a reducer function on each array element, resulting in a single value.'
  },
  {
    id: 'js-36',
    question: 'What is the purpose of "use strict"?',
    type: 'short-text',
    correctAnswer: 'enables strict mode',
    explanation: '"use strict" enables strict mode, which catches common coding errors and prevents unsafe actions.'
  },
  {
    id: 'js-37',
    question: 'What will this code output?',
    type: 'output-tracing',
    code: `console.log([] == false);`,
    correctAnswer: 'true',
    explanation: 'Empty array is converted to empty string, then to 0, which equals false.'
  },
  {
    id: 'js-38',
    question: 'Which method creates a shallow copy of an array?',
    type: 'multiple-choice',
    options: ['slice()', 'splice()', 'split()', 'join()'],
    correctAnswer: 'slice()',
    explanation: 'slice() returns a shallow copy of a portion of an array into a new array.'
  },
  {
    id: 'js-39',
    question: 'What is a Promise in JavaScript?',
    type: 'short-text',
    correctAnswer: 'object representing async operation',
    explanation: 'A Promise is an object representing the eventual completion or failure of an asynchronous operation.'
  },
  {
    id: 'js-40',
    question: 'What will this code output?',
    type: 'output-tracing',
    code: `console.log(1 + 2 + "3");`,
    correctAnswer: '33',
    explanation: 'Addition occurs left to right: 1 + 2 = 3, then 3 + "3" = "33" (string concatenation).'
  },
  {
    id: 'js-41',
    question: 'Which method checks if at least one element passes a test?',
    type: 'multiple-choice',
    options: ['some()', 'every()', 'find()', 'includes()'],
    correctAnswer: 'some()',
    explanation: 'some() tests whether at least one element passes the provided function test.'
  },
  {
    id: 'js-42',
    question: 'What does "hoisting" mean in JavaScript?',
    type: 'short-text',
    correctAnswer: 'declarations moved to top',
    explanation: 'Hoisting is JavaScript\'s behavior of moving declarations to the top of their scope.'
  },
  {
    id: 'js-43',
    question: 'What will this code output?',
    type: 'output-tracing',
    code: `console.log(typeof NaN);`,
    correctAnswer: 'number',
    explanation: 'NaN (Not a Number) is actually of type "number" in JavaScript.'
  },
  {
    id: 'js-44',
    question: 'Which method checks if all elements pass a test?',
    type: 'multiple-choice',
    options: ['every()', 'some()', 'filter()', 'find()'],
    correctAnswer: 'every()',
    explanation: 'every() tests whether all elements pass the provided function test.'
  },
  {
    id: 'js-45',
    question: 'What is the difference between "==" and "==="?',
    type: 'short-text',
    correctAnswer: 'type coercion vs strict equality',
    explanation: '== performs type coercion, === checks both value and type without coercion.'
  },
  {
    id: 'js-46',
    question: 'What will this code output?',
    type: 'output-tracing',
    code: `console.log(!!"");`,
    correctAnswer: 'false',
    explanation: 'Empty string is falsy, ! converts it to true, then !! converts back to false.'
  },
  {
    id: 'js-47',
    question: 'Which method splits a string into an array?',
    type: 'multiple-choice',
    options: ['split()', 'slice()', 'splice()', 'join()'],
    correctAnswer: 'split()',
    explanation: 'split() divides a string into an array of substrings based on a separator.'
  },
  {
    id: 'js-48',
    question: 'What is the global object in browsers?',
    type: 'short-text',
    correctAnswer: 'window',
    explanation: 'In browsers, the global object is "window", which contains all global variables and functions.'
  },
  {
    id: 'js-49',
    question: 'What will this code output?',
    type: 'output-tracing',
    code: `console.log(parseInt("10px"));`,
    correctAnswer: '10',
    explanation: 'parseInt() parses characters until it encounters a non-numeric character.'
  },
  {
    id: 'js-50',
    question: 'Which method executes a function for each array element?',
    type: 'multiple-choice',
    options: ['forEach()', 'map()', 'filter()', 'reduce()'],
    correctAnswer: 'forEach()',
    explanation: 'forEach() executes a provided function once for each array element.'
  }
];

const pythonQuestions: Question[] = [
  {
    id: 'py-1',
    question: 'What will this Python code output?',
    type: 'output-tracing',
    code: `print(type([])).__name__`,
    correctAnswer: 'list',
    explanation: 'type([]) returns the list class, and __name__ gives the class name as a string.'
  },
  {
    id: 'py-2',
    question: 'Which method adds an element to the end of a Python list?',
    type: 'multiple-choice',
    options: ['append()', 'add()', 'insert()', 'extend()'],
    correctAnswer: 'append()',
    explanation: 'append() adds a single element to the end of a list.'
  },
  {
    id: 'py-3',
    question: 'What does "PEP 8" refer to?',
    type: 'short-text',
    correctAnswer: 'Python style guide',
    explanation: 'PEP 8 is the official style guide for Python code formatting and conventions.'
  },
  {
    id: 'py-4',
    question: 'What will this code output?',
    type: 'output-tracing',
    code: `x = [1, 2, 3]
y = x
y.append(4)
print(len(x))`,
    correctAnswer: '4',
    explanation: 'Lists are mutable objects, so x and y reference the same list object.'
  },
  {
    id: 'py-5',
    question: 'Which keyword is used to define a function in Python?',
    type: 'multiple-choice',
    options: ['def', 'function', 'func', 'define'],
    correctAnswer: 'def',
    explanation: 'The "def" keyword is used to define functions in Python.'
  },
  {
    id: 'py-6',
    question: 'What is a list comprehension?',
    type: 'short-text',
    correctAnswer: 'concise way to create lists',
    explanation: 'List comprehensions provide a concise way to create lists based on existing iterables.'
  },
  {
    id: 'py-7',
    question: 'What will this code output?',
    type: 'output-tracing',
    code: `print(3 // 2)`,
    correctAnswer: '1',
    explanation: 'The // operator performs floor division, returning the integer part of the division.'
  },
  {
    id: 'py-8',
    question: 'Which data type is immutable in Python?',
    type: 'multiple-choice',
    options: ['list', 'dict', 'tuple', 'set'],
    correctAnswer: 'tuple',
    explanation: 'Tuples are immutable sequences in Python - their contents cannot be changed after creation.'
  },
  {
    id: 'py-9',
    question: 'What does the "self" parameter represent?',
    type: 'short-text',
    correctAnswer: 'instance of the class',
    explanation: '"self" refers to the instance of the class and is used to access instance variables and methods.'
  },
  {
    id: 'py-10',
    question: 'What will this code output?',
    type: 'output-tracing',
    code: `print("Hello" * 3)`,
    correctAnswer: 'HelloHelloHello',
    explanation: 'The * operator with strings repeats the string the specified number of times.'
  },
  {
    id: 'py-11',
    question: 'Which method removes an element from a list by value?',
    type: 'multiple-choice',
    options: ['remove()', 'delete()', 'pop()', 'del()'],
    correctAnswer: 'remove()',
    explanation: 'remove() removes the first occurrence of a specified value from a list.'
  },
  {
    id: 'py-12',
    question: 'What is the difference between "==" and "is"?',
    type: 'short-text',
    correctAnswer: 'value equality vs identity',
    explanation: '"==" compares values for equality, "is" compares object identity (same object in memory).'
  },
  {
    id: 'py-13',
    question: 'What will this code output?',
    type: 'output-tracing',
    code: `x = [1, 2, 3]
print(x[1:3])`,
    correctAnswer: '[2, 3]',
    explanation: 'List slicing [1:3] returns elements from index 1 up to (but not including) index 3.'
  },
  {
    id: 'py-14',
    question: 'Which keyword is used for exception handling?',
    type: 'multiple-choice',
    options: ['try', 'catch', 'handle', 'except'],
    correctAnswer: 'try',
    explanation: 'The "try" keyword starts an exception handling block, followed by "except" clauses.'
  },
  {
    id: 'py-15',
    question: 'What does "lambda" create in Python?',
    type: 'short-text',
    correctAnswer: 'anonymous function',
    explanation: 'Lambda creates small anonymous functions that can have any number of arguments but only one expression.'
  },
  {
    id: 'py-16',
    question: 'What will this code output?',
    type: 'output-tracing',
    code: `print(bool([]))`,
    correctAnswer: 'False',
    explanation: 'Empty lists are falsy in Python, so bool([]) returns False.'
  },
  {
    id: 'py-17',
    question: 'Which method converts a string to lowercase?',
    type: 'multiple-choice',
    options: ['lower()', 'lowercase()', 'toLower()', 'downcase()'],
    correctAnswer: 'lower()',
    explanation: 'The lower() method returns a string with all characters converted to lowercase.'
  },
  {
    id: 'py-18',
    question: 'What is a dictionary in Python?',
    type: 'short-text',
    correctAnswer: 'key-value pairs collection',
    explanation: 'A dictionary is a collection of key-value pairs that is mutable and unordered.'
  },
  {
    id: 'py-19',
    question: 'What will this code output?',
    type: 'output-tracing',
    code: `x = {1, 2, 2, 3}
print(len(x))`,
    correctAnswer: '3',
    explanation: 'Sets automatically remove duplicates, so {1, 2, 2, 3} becomes {1, 2, 3}.'
  },
  {
    id: 'py-20',
    question: 'Which operator checks membership in a sequence?',
    type: 'multiple-choice',
    options: ['in', 'contains', 'has', 'includes'],
    correctAnswer: 'in',
    explanation: 'The "in" operator tests whether a value exists in a sequence or collection.'
  },
  {
    id: 'py-21',
    question: 'What does "yield" do in Python?',
    type: 'short-text',
    correctAnswer: 'creates generator',
    explanation: '"yield" creates a generator function that can pause and resume execution.'
  },
  {
    id: 'py-22',
    question: 'What will this code output?',
    type: 'output-tracing',
    code: `print(list(range(3)))`,
    correctAnswer: '[0, 1, 2]',
    explanation: 'range(3) generates numbers from 0 up to (but not including) 3.'
  },
  {
    id: 'py-23',
    question: 'Which method adds multiple elements to a list?',
    type: 'multiple-choice',
    options: ['extend()', 'append()', 'add()', 'insert()'],
    correctAnswer: 'extend()',
    explanation: 'extend() adds all elements from an iterable to the end of a list.'
  },
  {
    id: 'py-24',
    question: 'What is the purpose of "__init__" method?',
    type: 'short-text',
    correctAnswer: 'constructor/initializer',
    explanation: '__init__ is the constructor method that initializes new instances of a class.'
  },
  {
    id: 'py-25',
    question: 'What will this code output?',
    type: 'output-tracing',
    code: `print(2 ** 3)`,
    correctAnswer: '8',
    explanation: 'The ** operator performs exponentiation: 2 to the power of 3 equals 8.'
  },
  {
    id: 'py-26',
    question: 'Which function returns the length of an object?',
    type: 'multiple-choice',
    options: ['len()', 'length()', 'size()', 'count()'],
    correctAnswer: 'len()',
    explanation: 'len() returns the number of items in an object like lists, strings, or dictionaries.'
  },
  {
    id: 'py-27',
    question: 'What is a tuple in Python?',
    type: 'short-text',
    correctAnswer: 'immutable sequence',
    explanation: 'A tuple is an ordered collection of items that cannot be changed after creation.'
  },
  {
    id: 'py-28',
    question: 'What will this code output?',
    type: 'output-tracing',
    code: `x = "hello"
print(x[::-1])`,
    correctAnswer: 'olleh',
    explanation: 'The slice [::-1] reverses the string by stepping backwards through all characters.'
  },
  {
    id: 'py-29',
    question: 'Which keyword creates a class in Python?',
    type: 'multiple-choice',
    options: ['class', 'Class', 'object', 'Object'],
    correctAnswer: 'class',
    explanation: 'The "class" keyword is used to define a new class in Python.'
  },
  {
    id: 'py-30',
    question: 'What does "import" do?',
    type: 'short-text',
    correctAnswer: 'loads modules',
    explanation: '"import" loads modules or specific functions/classes from modules into the current namespace.'
  },
  {
    id: 'py-31',
    question: 'What will this code output?',
    type: 'output-tracing',
    code: `print(10 % 3)`,
    correctAnswer: '1',
    explanation: 'The % operator returns the remainder of division: 10 divided by 3 leaves remainder 1.'
  },
  {
    id: 'py-32',
    question: 'Which method splits a string into a list?',
    type: 'multiple-choice',
    options: ['split()', 'divide()', 'separate()', 'break()'],
    correctAnswer: 'split()',
    explanation: 'split() divides a string into a list based on a specified separator.'
  },
  {
    id: 'py-33',
    question: 'What is inheritance in Python?',
    type: 'short-text',
    correctAnswer: 'class derives from another',
    explanation: 'Inheritance allows a class to inherit attributes and methods from another class.'
  },
  {
    id: 'py-34',
    question: 'What will this code output?',
    type: 'output-tracing',
    code: `x = [1, 2, 3]
y = x.copy()
y.append(4)
print(len(x))`,
    correctAnswer: '3',
    explanation: 'copy() creates a shallow copy, so modifying y does not affect x.'
  },
  {
    id: 'py-35',
    question: 'Which function converts a string to an integer?',
    type: 'multiple-choice',
    options: ['int()', 'integer()', 'toInt()', 'parse()'],
    correctAnswer: 'int()',
    explanation: 'int() converts a string or number to an integer type.'
  },
  {
    id: 'py-36',
    question: 'What does "pass" do in Python?',
    type: 'short-text',
    correctAnswer: 'null operation placeholder',
    explanation: '"pass" is a null operation that does nothing, used as a placeholder where syntax requires a statement.'
  },
  {
    id: 'py-37',
    question: 'What will this code output?',
    type: 'output-tracing',
    code: `print(bool(0))`,
    correctAnswer: 'False',
    explanation: 'Zero is falsy in Python, so bool(0) returns False.'
  },
  {
    id: 'py-38',
    question: 'Which method joins list elements into a string?',
    type: 'multiple-choice',
    options: ['join()', 'concat()', 'combine()', 'merge()'],
    correctAnswer: 'join()',
    explanation: 'join() concatenates list elements into a string using a specified separator.'
  },
  {
    id: 'py-39',
    question: 'What is a set in Python?',
    type: 'short-text',
    correctAnswer: 'unordered unique elements',
    explanation: 'A set is an unordered collection of unique elements with no duplicates.'
  },
  {
    id: 'py-40',
    question: 'What will this code output?',
    type: 'output-tracing',
    code: `x = [1, 2, 3, 4, 5]
print(x[::2])`,
    correctAnswer: '[1, 3, 5]',
    explanation: 'The slice [::2] takes every second element starting from the beginning.'
  },
  {
    id: 'py-41',
    question: 'Which keyword is used for loops in Python?',
    type: 'multiple-choice',
    options: ['for', 'loop', 'while', 'both for and while'],
    correctAnswer: 'both for and while',
    explanation: 'Python has both "for" loops (for iteration) and "while" loops (for condition-based repetition).'
  },
  {
    id: 'py-42',
    question: 'What does "enumerate" do?',
    type: 'short-text',
    correctAnswer: 'adds index to iteration',
    explanation: 'enumerate() adds a counter to an iterable, returning tuples of (index, value).'
  },
  {
    id: 'py-43',
    question: 'What will this code output?',
    type: 'output-tracing',
    code: `print("Python"[1:4])`,
    correctAnswer: 'yth',
    explanation: 'String slicing [1:4] extracts characters from index 1 up to (but not including) index 4.'
  },
  {
    id: 'py-44',
    question: 'Which method removes and returns the last element from a list?',
    type: 'multiple-choice',
    options: ['pop()', 'remove()', 'delete()', 'take()'],
    correctAnswer: 'pop()',
    explanation: 'pop() removes and returns the last element from a list (or element at specified index).'
  },
  {
    id: 'py-45',
    question: 'What is polymorphism in Python?',
    type: 'short-text',
    correctAnswer: 'same interface different implementations',
    explanation: 'Polymorphism allows objects of different types to be treated as instances of the same type through a common interface.'
  },
  {
    id: 'py-46',
    question: 'What will this code output?',
    type: 'output-tracing',
    code: `print(abs(-5))`,
    correctAnswer: '5',
    explanation: 'abs() returns the absolute value of a number, removing the negative sign.'
  },
  {
    id: 'py-47',
    question: 'Which function creates a range of numbers?',
    type: 'multiple-choice',
    options: ['range()', 'sequence()', 'numbers()', 'series()'],
    correctAnswer: 'range()',
    explanation: 'range() generates a sequence of numbers, commonly used in for loops.'
  },
  {
    id: 'py-48',
    question: 'What does "global" keyword do?',
    type: 'short-text',
    correctAnswer: 'accesses global variable',
    explanation: '"global" allows a function to modify a variable in the global scope.'
  },
  {
    id: 'py-49',
    question: 'What will this code output?',
    type: 'output-tracing',
    code: `print(max([1, 5, 3, 9, 2]))`,
    correctAnswer: '9',
    explanation: 'max() returns the largest item in an iterable or the largest of multiple arguments.'
  },
  {
    id: 'py-50',
    question: 'Which method checks if a string starts with a specific substring?',
    type: 'multiple-choice',
    options: ['startswith()', 'begins()', 'starts()', 'prefix()'],
    correctAnswer: 'startswith()',
    explanation: 'startswith() returns True if the string starts with the specified prefix.'
  }
];

const apiBackendQuestions: Question[] = [
  {
    id: 'api-1',
    question: 'What does REST stand for?',
    type: 'short-text',
    correctAnswer: 'Representational State Transfer',
    explanation: 'REST is an architectural style for designing networked applications using standard HTTP methods.'
  },
  {
    id: 'api-2',
    question: 'Which HTTP method is used to retrieve data?',
    type: 'multiple-choice',
    options: ['GET', 'POST', 'PUT', 'DELETE'],
    correctAnswer: 'GET',
    explanation: 'GET is used to retrieve data from a server without modifying it.'
  },
  {
    id: 'api-3',
    question: 'What does API stand for?',
    type: 'short-text',
    correctAnswer: 'Application Programming Interface',
    explanation: 'API is a set of protocols and tools for building software applications.'
  },
  {
    id: 'api-4',
    question: 'Which status code indicates a successful HTTP request?',
    type: 'multiple-choice',
    options: ['200', '404', '500', '301'],
    correctAnswer: '200',
    explanation: 'HTTP status code 200 indicates that the request was successful.'
  },
  {
    id: 'api-5',
    question: 'What is JSON?',
    type: 'short-text',
    correctAnswer: 'JavaScript Object Notation',
    explanation: 'JSON is a lightweight data interchange format that is easy to read and write.'
  },
  {
    id: 'api-6',
    question: 'Which HTTP method is used to create new resources?',
    type: 'multiple-choice',
    options: ['GET', 'POST', 'PUT', 'DELETE'],
    correctAnswer: 'POST',
    explanation: 'POST is typically used to create new resources on the server.'
  },
  {
    id: 'api-7',
    question: 'What is a database schema?',
    type: 'short-text',
    correctAnswer: 'structure of database tables',
    explanation: 'A database schema defines the structure, organization, and relationships of data in a database.'
  },
  {
    id: 'api-8',
    question: 'Which SQL command is used to retrieve data?',
    type: 'multiple-choice',
    options: ['SELECT', 'INSERT', 'UPDATE', 'DELETE'],
    correctAnswer: 'SELECT',
    explanation: 'SELECT is used to query and retrieve data from database tables.'
  },
  {
    id: 'api-9',
    question: 'What does CRUD stand for?',
    type: 'short-text',
    correctAnswer: 'Create Read Update Delete',
    explanation: 'CRUD represents the four basic operations for persistent storage.'
  },
  {
    id: 'api-10',
    question: 'Which HTTP method is used to update existing resources?',
    type: 'multiple-choice',
    options: ['GET', 'POST', 'PUT', 'DELETE'],
    correctAnswer: 'PUT',
    explanation: 'PUT is used to update or replace existing resources on the server.'
  },
  {
    id: 'api-11',
    question: 'What is authentication?',
    type: 'short-text',
    correctAnswer: 'verifying user identity',
    explanation: 'Authentication is the process of verifying the identity of a user or system.'
  },
  {
    id: 'api-12',
    question: 'Which status code indicates "Not Found"?',
    type: 'multiple-choice',
    options: ['200', '404', '500', '401'],
    correctAnswer: '404',
    explanation: 'HTTP status code 404 indicates that the requested resource was not found.'
  },
  {
    id: 'api-13',
    question: 'What is a primary key in databases?',
    type: 'short-text',
    correctAnswer: 'unique identifier for records',
    explanation: 'A primary key uniquely identifies each record in a database table.'
  },
  {
    id: 'api-14',
    question: 'Which HTTP method is used to delete resources?',
    type: 'multiple-choice',
    options: ['GET', 'POST', 'PUT', 'DELETE'],
    correctAnswer: 'DELETE',
    explanation: 'DELETE is used to remove resources from the server.'
  },
  {
    id: 'api-15',
    question: 'What is middleware in web development?',
    type: 'short-text',
    correctAnswer: 'software between request and response',
    explanation: 'Middleware is software that sits between the request and response, processing data or adding functionality.'
  },
  {
    id: 'api-16',
    question: 'Which status code indicates server error?',
    type: 'multiple-choice',
    options: ['200', '404', '500', '301'],
    correctAnswer: '500',
    explanation: 'HTTP status code 500 indicates an internal server error.'
  },
  {
    id: 'api-17',
    question: 'What is a foreign key?',
    type: 'short-text',
    correctAnswer: 'reference to another table',
    explanation: 'A foreign key is a field that refers to the primary key of another table, creating relationships.'
  },
  {
    id: 'api-18',
    question: 'Which protocol is commonly used for web APIs?',
    type: 'multiple-choice',
    options: ['HTTP', 'FTP', 'SMTP', 'SSH'],
    correctAnswer: 'HTTP',
    explanation: 'HTTP (HyperText Transfer Protocol) is the standard protocol for web APIs.'
  },
  {
    id: 'api-19',
    question: 'What is caching?',
    type: 'short-text',
    correctAnswer: 'storing data for faster access',
    explanation: 'Caching stores frequently accessed data in memory for faster retrieval.'
  },
  {
    id: 'api-20',
    question: 'Which SQL command adds new data to a table?',
    type: 'multiple-choice',
    options: ['SELECT', 'INSERT', 'UPDATE', 'DELETE'],
    correctAnswer: 'INSERT',
    explanation: 'INSERT is used to add new records to a database table.'
  },
  {
    id: 'api-21',
    question: 'What is authorization?',
    type: 'short-text',
    correctAnswer: 'controlling access permissions',
    explanation: 'Authorization determines what actions an authenticated user is allowed to perform.'
  },
  {
    id: 'api-22',
    question: 'Which status code indicates unauthorized access?',
    type: 'multiple-choice',
    options: ['200', '404', '500', '401'],
    correctAnswer: '401',
    explanation: 'HTTP status code 401 indicates that authentication is required.'
  },
  {
    id: 'api-23',
    question: 'What is a JOIN in SQL?',
    type: 'short-text',
    correctAnswer: 'combining data from multiple tables',
    explanation: 'JOIN combines rows from two or more tables based on related columns.'
  },
  {
    id: 'api-24',
    question: 'Which format is commonly used for API responses?',
    type: 'multiple-choice',
    options: ['XML', 'JSON', 'CSV', 'PDF'],
    correctAnswer: 'JSON',
    explanation: 'JSON is the most common format for modern API responses due to its simplicity.'
  },
  {
    id: 'api-25',
    question: 'What is a webhook?',
    type: 'short-text',
    correctAnswer: 'HTTP callback for events',
    explanation: 'A webhook is an HTTP callback that triggers when specific events occur in an application.'
  },
  {
    id: 'api-26',
    question: 'Which SQL command modifies existing data?',
    type: 'multiple-choice',
    options: ['SELECT', 'INSERT', 'UPDATE', 'DELETE'],
    correctAnswer: 'UPDATE',
    explanation: 'UPDATE is used to modify existing records in a database table.'
  },
  {
    id: 'api-27',
    question: 'What is rate limiting?',
    type: 'short-text',
    correctAnswer: 'controlling request frequency',
    explanation: 'Rate limiting controls how many requests a client can make to an API within a time period.'
  },
  {
    id: 'api-28',
    question: 'Which header specifies content type in HTTP?',
    type: 'multiple-choice',
    options: ['Content-Type', 'Accept', 'Authorization', 'User-Agent'],
    correctAnswer: 'Content-Type',
    explanation: 'Content-Type header specifies the media type of the request or response body.'
  },
  {
    id: 'api-29',
    question: 'What is database normalization?',
    type: 'short-text',
    correctAnswer: 'organizing data to reduce redundancy',
    explanation: 'Normalization organizes database tables to minimize data redundancy and improve integrity.'
  },
  {
    id: 'api-30',
    question: 'Which SQL command removes data from a table?',
    type: 'multiple-choice',
    options: ['SELECT', 'INSERT', 'UPDATE', 'DELETE'],
    correctAnswer: 'DELETE',
    explanation: 'DELETE is used to remove records from a database table.'
  },
  {
    id: 'api-31',
    question: 'What is CORS?',
    type: 'short-text',
    correctAnswer: 'Cross-Origin Resource Sharing',
    explanation: 'CORS is a mechanism that allows web pages to access resources from different domains.'
  },
  {
    id: 'api-32',
    question: 'Which status code indicates redirection?',
    type: 'multiple-choice',
    options: ['200', '301', '404', '500'],
    correctAnswer: '301',
    explanation: 'HTTP status code 301 indicates a permanent redirect to a different URL.'
  },
  {
    id: 'api-33',
    question: 'What is an index in databases?',
    type: 'short-text',
    correctAnswer: 'structure for faster queries',
    explanation: 'An index is a data structure that improves the speed of data retrieval operations.'
  },
  {
    id: 'api-34',
    question: 'Which method is idempotent in REST?',
    type: 'multiple-choice',
    options: ['POST', 'GET', 'PATCH', 'All except POST'],
    correctAnswer: 'All except POST',
    explanation: 'GET, PUT, and DELETE are idempotent (same result when called multiple times), but POST is not.'
  },
  {
    id: 'api-35',
    question: 'What is pagination?',
    type: 'short-text',
    correctAnswer: 'dividing results into pages',
    explanation: 'Pagination divides large result sets into smaller, manageable chunks or pages.'
  },
  {
    id: 'api-36',
    question: 'Which SQL clause filters results?',
    type: 'multiple-choice',
    options: ['SELECT', 'FROM', 'WHERE', 'ORDER BY'],
    correctAnswer: 'WHERE',
    explanation: 'WHERE clause filters records based on specified conditions.'
  },
  {
    id: 'api-37',
    question: 'What is load balancing?',
    type: 'short-text',
    correctAnswer: 'distributing requests across servers',
    explanation: 'Load balancing distributes incoming requests across multiple servers to improve performance.'
  },
  {
    id: 'api-38',
    question: 'Which HTTP header is used for authentication?',
    type: 'multiple-choice',
    options: ['Content-Type', 'Accept', 'Authorization', 'User-Agent'],
    correctAnswer: 'Authorization',
    explanation: 'Authorization header contains credentials for authenticating the client with the server.'
  },
  {
    id: 'api-39',
    question: 'What is a transaction in databases?',
    type: 'short-text',
    correctAnswer: 'group of operations as single unit',
    explanation: 'A transaction is a sequence of database operations that are treated as a single unit of work.'
  },
  {
    id: 'api-40',
    question: 'Which SQL clause sorts results?',
    type: 'multiple-choice',
    options: ['SELECT', 'FROM', 'WHERE', 'ORDER BY'],
    correctAnswer: 'ORDER BY',
    explanation: 'ORDER BY clause sorts the result set based on specified columns.'
  },
  {
    id: 'api-41',
    question: 'What is API versioning?',
    type: 'short-text',
    correctAnswer: 'managing different API versions',
    explanation: 'API versioning allows multiple versions of an API to coexist for backward compatibility.'
  },
  {
    id: 'api-42',
    question: 'Which status code indicates forbidden access?',
    type: 'multiple-choice',
    options: ['401', '403', '404', '500'],
    correctAnswer: '403',
    explanation: 'HTTP status code 403 indicates that the server understood the request but refuses to authorize it.'
  },
  {
    id: 'api-43',
    question: 'What is database replication?',
    type: 'short-text',
    correctAnswer: 'copying data across multiple databases',
    explanation: 'Database replication involves copying and maintaining database objects in multiple databases.'
  },
  {
    id: 'api-44',
    question: 'Which HTTP method is safe and idempotent?',
    type: 'multiple-choice',
    options: ['GET', 'POST', 'PUT', 'DELETE'],
    correctAnswer: 'GET',
    explanation: 'GET is both safe (no side effects) and idempotent (same result when repeated).'
  },
  {
    id: 'api-45',
    question: 'What is a stored procedure?',
    type: 'short-text',
    correctAnswer: 'precompiled SQL code',
    explanation: 'A stored procedure is a precompiled collection of SQL statements stored in the database.'
  },
  {
    id: 'api-46',
    question: 'Which SQL function counts rows?',
    type: 'multiple-choice',
    options: ['SUM', 'COUNT', 'AVG', 'MAX'],
    correctAnswer: 'COUNT',
    explanation: 'COUNT function returns the number of rows that match specified criteria.'
  },
  {
    id: 'api-47',
    question: 'What is microservices architecture?',
    type: 'short-text',
    correctAnswer: 'small independent services',
    explanation: 'Microservices architecture structures an application as a collection of small, independent services.'
  },
  {
    id: 'api-48',
    question: 'Which protocol is used for secure HTTP?',
    type: 'multiple-choice',
    options: ['HTTP', 'HTTPS', 'FTP', 'SSH'],
    correctAnswer: 'HTTPS',
    explanation: 'HTTPS (HTTP Secure) uses SSL/TLS encryption to secure HTTP communications.'
  },
  {
    id: 'api-49',
    question: 'What is database sharding?',
    type: 'short-text',
    correctAnswer: 'horizontal partitioning of data',
    explanation: 'Sharding is a method of horizontally partitioning data across multiple database instances.'
  },
  {
    id: 'api-50',
    question: 'Which SQL clause groups results?',
    type: 'multiple-choice',
    options: ['SELECT', 'GROUP BY', 'WHERE', 'ORDER BY'],
    correctAnswer: 'GROUP BY',
    explanation: 'GROUP BY clause groups rows that have the same values in specified columns.'
  }
];

const conceptsDesignCareerQuestions: Question[] = [
  {
    id: 'cdc-1',
    question: 'What does SDLC stand for?',
    type: 'short-text',
    correctAnswer: 'Software Development Life Cycle',
    explanation: 'SDLC is a process used by software development teams to design, develop, and test high-quality software.'
  },
  {
    id: 'cdc-2',
    question: 'Which SDLC phase comes first?',
    type: 'multiple-choice',
    options: ['Design', 'Planning', 'Implementation', 'Testing'],
    correctAnswer: 'Planning',
    explanation: 'Planning is typically the first phase where requirements are gathered and project scope is defined.'
  },
  {
    id: 'cdc-3',
    question: 'What is Django?',
    type: 'short-text',
    correctAnswer: 'Python web framework',
    explanation: 'Django is a high-level Python web framework that encourages rapid development and clean design.'
  },
  {
    id: 'cdc-4',
    question: 'Which principle is central to Design Thinking?',
    type: 'multiple-choice',
    options: ['User-centered design', 'Technology-first', 'Cost reduction', 'Speed of development'],
    correctAnswer: 'User-centered design',
    explanation: 'Design Thinking focuses on understanding and solving user problems through empathy and iteration.'
  },
  {
    id: 'cdc-5',
    question: 'What does UX stand for?',
    type: 'short-text',
    correctAnswer: 'User Experience',
    explanation: 'UX refers to the overall experience a user has when interacting with a product or service.'
  },
  {
    id: 'cdc-6',
    question: 'Which Git command creates a new branch?',
    type: 'multiple-choice',
    options: ['git branch', 'git checkout', 'git merge', 'git clone'],
    correctAnswer: 'git branch',
    explanation: 'git branch creates a new branch, though git checkout -b can create and switch to a new branch.'
  },
  {
    id: 'cdc-7',
    question: 'What is the main purpose of user personas?',
    type: 'short-text',
    correctAnswer: 'represent target users',
    explanation: 'User personas are fictional characters that represent different user types and help guide design decisions.'
  },
  {
    id: 'cdc-8',
    question: 'Which app strategy focuses on multiple platforms?',
    type: 'multiple-choice',
    options: ['Native', 'Cross-platform', 'Web-only', 'Desktop-only'],
    correctAnswer: 'Cross-platform',
    explanation: 'Cross-platform development allows apps to run on multiple operating systems with shared code.'
  },
  {
    id: 'cdc-9',
    question: 'What is user-centric app development?',
    type: 'short-text',
    correctAnswer: 'designing around user needs',
    explanation: 'User-centric development prioritizes user needs, behaviors, and feedback throughout the development process.'
  },
  {
    id: 'cdc-10',
    question: 'Which database type is best for complex relationships?',
    type: 'multiple-choice',
    options: ['NoSQL', 'Relational', 'Graph', 'Document'],
    correctAnswer: 'Relational',
    explanation: 'Relational databases excel at managing complex relationships between different data entities.'
  },
  {
    id: 'cdc-11',
    question: 'What is a MVP in business development?',
    type: 'short-text',
    correctAnswer: 'Minimum Viable Product',
    explanation: 'MVP is a product with minimum features needed to satisfy early customers and provide feedback.'
  },
  {
    id: 'cdc-12',
    question: 'Which backend technology is known for scalability?',
    type: 'multiple-choice',
    options: ['Node.js', 'Django', 'Ruby on Rails', 'All of the above'],
    correctAnswer: 'All of the above',
    explanation: 'All these backend technologies can be scaled effectively with proper architecture and optimization.'
  },
  {
    id: 'cdc-13',
    question: 'What does AI stand for in development?',
    type: 'short-text',
    correctAnswer: 'Artificial Intelligence',
    explanation: 'AI in development refers to incorporating machine learning and intelligent automation into applications.'
  },
  {
    id: 'cdc-14',
    question: 'Which marketing strategy is most cost-effective for startups?',
    type: 'multiple-choice',
    options: ['TV advertising', 'Digital marketing', 'Print media', 'Radio'],
    correctAnswer: 'Digital marketing',
    explanation: 'Digital marketing offers targeted reach, measurable results, and lower costs compared to traditional media.'
  },
  {
    id: 'cdc-15',
    question: 'What is financial literacy in business?',
    type: 'short-text',
    correctAnswer: 'understanding money management',
    explanation: 'Financial literacy involves understanding financial concepts like budgeting, investing, and cash flow management.'
  },
  {
    id: 'cdc-16',
    question: 'Which Agile ceremony happens daily?',
    type: 'multiple-choice',
    options: ['Sprint Planning', 'Daily Standup', 'Sprint Review', 'Retrospective'],
    correctAnswer: 'Daily Standup',
    explanation: 'Daily Standup (or Daily Scrum) is a short daily meeting to sync team progress and identify blockers.'
  },
  {
    id: 'cdc-17',
    question: 'What is the purpose of wireframing?',
    type: 'short-text',
    correctAnswer: 'plan layout and structure',
    explanation: 'Wireframing creates a basic structural blueprint of a page or app before adding visual design elements.'
  },
  {
    id: 'cdc-18',
    question: 'Which Git command merges branches?',
    type: 'multiple-choice',
    options: ['git branch', 'git checkout', 'git merge', 'git clone'],
    correctAnswer: 'git merge',
    explanation: 'git merge combines changes from one branch into another branch.'
  },
  {
    id: 'cdc-19',
    question: 'What is A/B testing?',
    type: 'short-text',
    correctAnswer: 'comparing two versions',
    explanation: 'A/B testing compares two versions of a feature to determine which performs better with users.'
  },
  {
    id: 'cdc-20',
    question: 'Which database approach offers more flexibility?',
    type: 'multiple-choice',
    options: ['SQL', 'NoSQL', 'Both equally', 'Neither'],
    correctAnswer: 'NoSQL',
    explanation: 'NoSQL databases typically offer more flexibility in data structure and schema changes.'
  },
  {
    id: 'cdc-21',
    question: 'What is customer acquisition cost (CAC)?',
    type: 'short-text',
    correctAnswer: 'cost to acquire new customer',
    explanation: 'CAC measures how much it costs to acquire a new customer through marketing and sales efforts.'
  },
  {
    id: 'cdc-22',
    question: 'Which backend pattern separates concerns?',
    type: 'multiple-choice',
    options: ['MVC', 'Singleton', 'Observer', 'Factory'],
    correctAnswer: 'MVC',
    explanation: 'MVC (Model-View-Controller) separates application logic into three interconnected components.'
  },
  {
    id: 'cdc-23',
    question: 'What is machine learning in AI?',
    type: 'short-text',
    correctAnswer: 'algorithms that learn from data',
    explanation: 'Machine learning enables computers to learn and improve from experience without being explicitly programmed.'
  },
  {
    id: 'cdc-24',
    question: 'Which metric measures user engagement?',
    type: 'multiple-choice',
    options: ['Revenue', 'Daily Active Users', 'Server uptime', 'Code coverage'],
    correctAnswer: 'Daily Active Users',
    explanation: 'Daily Active Users (DAU) measures how many unique users engage with your app daily.'
  },
  {
    id: 'cdc-25',
    question: 'What is cash flow in business?',
    type: 'short-text',
    correctAnswer: 'money in and out of business',
    explanation: 'Cash flow tracks the movement of money into and out of a business over a specific period.'
  },
  {
    id: 'cdc-26',
    question: 'Which SDLC model emphasizes iteration?',
    type: 'multiple-choice',
    options: ['Waterfall', 'Agile', 'V-Model', 'Spiral'],
    correctAnswer: 'Agile',
    explanation: 'Agile methodology emphasizes iterative development with frequent releases and customer feedback.'
  },
  {
    id: 'cdc-27',
    question: 'What is Django\'s main architectural pattern?',
    type: 'short-text',
    correctAnswer: 'MTV (Model-Template-View)',
    explanation: 'Django follows the MTV pattern, which is similar to MVC but with Django-specific terminology.'
  },
  {
    id: 'cdc-28',
    question: 'Which Design Thinking phase comes first?',
    type: 'multiple-choice',
    options: ['Ideate', 'Empathize', 'Prototype', 'Test'],
    correctAnswer: 'Empathize',
    explanation: 'Empathize is the first phase where you understand user needs and problems.'
  },
  {
    id: 'cdc-29',
    question: 'What does UI stand for?',
    type: 'short-text',
    correctAnswer: 'User Interface',
    explanation: 'UI refers to the visual elements and interactive components users interact with in an application.'
  },
  {
    id: 'cdc-30',
    question: 'Which Git command shows commit history?',
    type: 'multiple-choice',
    options: ['git status', 'git log', 'git diff', 'git show'],
    correctAnswer: 'git log',
    explanation: 'git log displays the commit history for the current branch.'
  },
  {
    id: 'cdc-31',
    question: 'What is responsive design?',
    type: 'short-text',
    correctAnswer: 'adapts to different screen sizes',
    explanation: 'Responsive design ensures applications work well across various devices and screen sizes.'
  },
  {
    id: 'cdc-32',
    question: 'Which app development approach is fastest to market?',
    type: 'multiple-choice',
    options: ['Native', 'Hybrid', 'Progressive Web App', 'Cross-platform'],
    correctAnswer: 'Progressive Web App',
    explanation: 'PWAs can be developed quickly using web technologies and work across all platforms.'
  },
  {
    id: 'cdc-33',
    question: 'What is user journey mapping?',
    type: 'short-text',
    correctAnswer: 'visualizing user interactions',
    explanation: 'User journey mapping visualizes the process users go through to accomplish a goal with your product.'
  },
  {
    id: 'cdc-34',
    question: 'Which database feature ensures data consistency?',
    type: 'multiple-choice',
    options: ['Indexing', 'ACID properties', 'Replication', 'Sharding'],
    correctAnswer: 'ACID properties',
    explanation: 'ACID (Atomicity, Consistency, Isolation, Durability) properties ensure reliable database transactions.'
  },
  {
    id: 'cdc-35',
    question: 'What is product-market fit?',
    type: 'short-text',
    correctAnswer: 'product satisfies market demand',
    explanation: 'Product-market fit occurs when a product satisfies a strong market demand and customers are willing to pay.'
  },
  {
    id: 'cdc-36',
    question: 'Which backend concept handles multiple requests?',
    type: 'multiple-choice',
    options: ['Threading', 'Caching', 'Authentication', 'Validation'],
    correctAnswer: 'Threading',
    explanation: 'Threading allows servers to handle multiple requests concurrently for better performance.'
  },
  {
    id: 'cdc-37',
    question: 'What is natural language processing (NLP)?',
    type: 'short-text',
    correctAnswer: 'AI understanding human language',
    explanation: 'NLP enables computers to understand, interpret, and generate human language in a meaningful way.'
  },
  {
    id: 'cdc-38',
    question: 'Which marketing channel has highest ROI?',
    type: 'multiple-choice',
    options: ['Email marketing', 'Social media', 'SEO', 'Paid advertising'],
    correctAnswer: 'Email marketing',
    explanation: 'Email marketing typically provides the highest return on investment among digital marketing channels.'
  },
  {
    id: 'cdc-39',
    question: 'What is break-even point?',
    type: 'short-text',
    correctAnswer: 'revenue equals costs',
    explanation: 'Break-even point is when total revenue equals total costs, resulting in neither profit nor loss.'
  },
  {
    id: 'cdc-40',
    question: 'Which testing type validates user requirements?',
    type: 'multiple-choice',
    options: ['Unit testing', 'Integration testing', 'Acceptance testing', 'Performance testing'],
    correctAnswer: 'Acceptance testing',
    explanation: 'Acceptance testing validates that the system meets user requirements and business needs.'
  },
  {
    id: 'cdc-41',
    question: 'What is Django\'s ORM?',
    type: 'short-text',
    correctAnswer: 'Object-Relational Mapping',
    explanation: 'Django\'s ORM allows developers to interact with databases using Python objects instead of SQL.'
  },
  {
    id: 'cdc-42',
    question: 'Which Design Thinking tool generates ideas?',
    type: 'multiple-choice',
    options: ['Brainstorming', 'User interviews', 'Prototyping', 'Testing'],
    correctAnswer: 'Brainstorming',
    explanation: 'Brainstorming is a key ideation technique used in Design Thinking to generate creative solutions.'
  },
  {
    id: 'cdc-43',
    question: 'What is accessibility in UI/UX?',
    type: 'short-text',
    correctAnswer: 'usable by people with disabilities',
    explanation: 'Accessibility ensures products are usable by people with various abilities and disabilities.'
  },
  {
    id: 'cdc-44',
    question: 'Which Git workflow is most common?',
    type: 'multiple-choice',
    options: ['Git Flow', 'GitHub Flow', 'GitLab Flow', 'Feature Branch'],
    correctAnswer: 'GitHub Flow',
    explanation: 'GitHub Flow is a simple, branch-based workflow that\'s widely adopted for its simplicity.'
  },
  {
    id: 'cdc-45',
    question: 'What is conversion rate?',
    type: 'short-text',
    correctAnswer: 'percentage of users who take action',
    explanation: 'Conversion rate measures the percentage of users who complete a desired action (purchase, signup, etc.).'
  },
  {
    id: 'cdc-46',
    question: 'Which app strategy targets iOS and Android separately?',
    type: 'multiple-choice',
    options: ['Native', 'Hybrid', 'Web', 'Cross-platform'],
    correctAnswer: 'Native',
    explanation: 'Native development creates separate apps for each platform using platform-specific technologies.'
  },
  {
    id: 'cdc-47',
    question: 'What is user research?',
    type: 'short-text',
    correctAnswer: 'studying user behaviors and needs',
    explanation: 'User research involves studying user behaviors, needs, and motivations to inform design decisions.'
  },
  {
    id: 'cdc-48',
    question: 'Which database type is best for real-time applications?',
    type: 'multiple-choice',
    options: ['SQL', 'NoSQL', 'In-memory', 'Graph'],
    correctAnswer: 'In-memory',
    explanation: 'In-memory databases store data in RAM for extremely fast read/write operations needed in real-time apps.'
  },
  {
    id: 'cdc-49',
    question: 'What is customer lifetime value (CLV)?',
    type: 'short-text',
    correctAnswer: 'total value customer brings',
    explanation: 'CLV predicts the total revenue a customer will generate throughout their relationship with your business.'
  },
  {
    id: 'cdc-50',
    question: 'Which AI technique mimics human neural networks?',
    type: 'multiple-choice',
    options: ['Decision trees', 'Neural networks', 'Linear regression', 'Clustering'],
    correctAnswer: 'Neural networks',
    explanation: 'Neural networks are inspired by biological neural networks and form the basis of deep learning.'
  }
];

const allQuizData: QuizSection[] = [
  {
    title: 'HTML & CSS',
    questions: htmlCssQuestions
  },
  {
    title: 'JavaScript & DOM',
    questions: javascriptDomQuestions
  },
  {
    title: 'Python Programming',
    questions: pythonQuestions
  },
  {
    title: 'API & Backend Logic',
    questions: apiBackendQuestions
  },
  {
    title: 'Concepts, Design & Career',
    questions: conceptsDesignCareerQuestions
  }
];

export function getShuffledQuizData(): QuizSection[] {
  return allQuizData.map(section => ({
    ...section,
    questions: shuffleArray(section.questions).slice(0, 10) // Take only 10 random questions
  }));
}