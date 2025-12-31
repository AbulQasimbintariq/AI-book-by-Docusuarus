import React, { useState, useRef, useEffect } from 'react';
import styles from './styles.module.css';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
}

interface ChatBotProps {
    isOpen?: boolean;
}

const ChatBot: React.FC<ChatBotProps> = ({ isOpen: initialOpen = false }) => {
    const [isOpen, setIsOpen] = useState(initialOpen);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: 'Hi! I\'m the AI Book Assistant. I can help you learn about AI & Spec-Driven Software Development. What would you like to know?',
            sender: 'bot',
            timestamp: new Date(),
        },
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const getAIResponse = (userMessage: string): string => {
        const lowerMessage = userMessage.toLowerCase();

        // Knowledge base for the chatbot
        const responses: { [key: string]: string } = {
            'spec': 'A specification is a formal, machine-readable description of what your code should do. It includes inputs, outputs, rules, and examples. Specs serve as the source of truth for your system.',
            'ai generation': 'AI code generation uses machine learning models to automatically create implementations from your specifications. This saves time and reduces boilerplate code writing.',
            'spec-driven': 'Spec-Driven Development is a modern approach where you write clear specifications and AI generates the code. This creates self-documenting systems with automatic testing.',
            'how to start': 'To get started with spec-driven development: 1) Write a clear specification with examples, 2) Use an AI assistant to generate code, 3) Run the auto-generated tests, 4) Review and deploy.',
            'examples': 'Check the documentation for practical examples! We have examples of functions, API endpoints, and data processing pipelines. Visit /docs/ai-spec-driven-development for detailed walkthroughs.',
            'testing': 'Tests are auto-generated from your specification examples. Each example in your spec becomes a test case, ensuring your generated code meets requirements.',
            'best practices': 'Best practices include: Write clear specs with concrete examples, Include edge cases and error conditions, Use proper data types and constraints, Iterate on specs when needed.',
            'tools': 'You can use AI assistants like Claude, ChatGPT, Copilot, and others. We provide guidance on how to structure prompts for each tool.',
            'benefits': 'Benefits of spec-driven + AI development include: Fewer bugs, Self-documenting code, Faster development, Clear requirements, Better code quality, and easier onboarding.',
            'ai book': 'Welcome to AI-Book-by-Docusaurus! This is a comprehensive guide to AI & Spec-Driven Software Development. Explore our documentation, chapters, and blog posts.',
            'learn': 'Start by reading the Introduction (/docs/intro) or jump to AI & Spec-Driven Development (/docs/ai-spec-driven-development). We also have 5 chapters covering different aspects.',
        };

        // Check for keyword matches
        for (const [key, response] of Object.entries(responses)) {
            if (lowerMessage.includes(key)) {
                return response;
            }
        }

        // Default response
        if (lowerMessage.includes('?')) {
            return 'Great question! I can help you with: specs, AI generation, spec-driven development, how to start, examples, testing, best practices, tools, benefits, the AI book, and learning resources. What interests you?';
        }

        return 'That\'s interesting! I can provide more specific help with topics like specifications, AI code generation, spec-driven development, testing strategies, and best practices. Feel free to ask!';
    };

    const handleSendMessage = async () => {
        if (!inputValue.trim()) return;

        // Add user message
        const userMessage: Message = {
            id: Date.now().toString(),
            text: inputValue,
            sender: 'user',
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);

        // Simulate AI response delay
        setTimeout(() => {
            const botResponse: Message = {
                id: (Date.now() + 1).toString(),
                text: getAIResponse(inputValue),
                sender: 'bot',
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, botResponse]);
            setIsLoading(false);
        }, 500);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div className= { styles.chatbotContainer } >
        {/* Chat Button */ }
    {
        !isOpen && (
            <button
          className={ styles.chatButton }
        onClick = {() => setIsOpen(true)}
aria - label="Open chat"
    >
    <span className={ styles.chatIcon }>💬</span>
        < span className = { styles.chatLabel } > Ask AI </span>
            </button>
      )}

{/* Chat Window */ }
{
    isOpen && (
        <div className={ styles.chatWindow }>
            {/* Header */ }
            < div className = { styles.chatHeader } >
                <div>
                <h3>AI Book Assistant </h3>
                    < p > Ask about spec - driven development </p>
                        </div>
                        < button
    className = { styles.closeButton }
    onClick = {() => setIsOpen(false)
}
aria - label="Close chat"
    >
              ✕
</button>
    </div>

{/* Messages */ }
<div className={ styles.messagesContainer }>
{
    messages.map((message) => (
        <div
                key= { message.id }
                className = {`${styles.message} ${styles[message.sender]}`}
    >
    <div className={ styles.messageBubble }>
        { message.text }
        </div>
        < span className = { styles.timestamp } >
        {
            message.timestamp.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
            })
        }
            </span>
            </div>
            ))}
{
    isLoading && (
        <div className={ `${styles.message} ${styles.bot}` }>
            <div className={ styles.messageBubble }>
                <span className={ styles.typingIndicator }>
                    <span></span>
                    < span > </span>
                    < span > </span>
                    </span>
                    </div>
                    </div>
            )
}
<div ref={ messagesEndRef } />
    </div>

{/* Input */ }
<div className={ styles.inputContainer }>
    <input
              type="text"
value = { inputValue }
onChange = {(e) => setInputValue(e.target.value)}
onKeyPress = { handleKeyPress }
placeholder = "Ask about specs, AI, development..."
className = { styles.input }
disabled = { isLoading }
    />
    <button
              onClick={ handleSendMessage }
disabled = { isLoading || !inputValue.trim()}
className = { styles.sendButton }
aria - label="Send message"
    >
              →
</button>
    </div>
    </div>
      )}
</div>
  );
};

export default ChatBot;
