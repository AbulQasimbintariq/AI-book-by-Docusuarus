# AI Chatbot Component

## Overview

The AI Chatbot is a floating chat assistant integrated into the AI-Book-by-Docusaurus website. It provides instant help to visitors about spec-driven development, AI code generation, and website content.

## Features

✨ **Smart Responses** - Understands questions about specs, AI generation, development practices, and more
💬 **Real-time Chat** - Instant conversational interface with typing indicators
📱 **Responsive Design** - Works seamlessly on desktop and mobile devices
🎨 **Themed UI** - Matches the website's blue/cyan color scheme
⚡ **Lightweight** - Pure React, no external dependencies beyond Docusaurus

## Architecture

### Components

1. **ChatBot Component** (`src/components/ChatBot/index.tsx`)

   - Main chat interface with message handling
   - Local knowledge base for responses
   - State management for messages and UI
   - Keyboard shortcuts (Enter to send)

2. **ChatBot Styles** (`src/components/ChatBot/styles.module.css`)

   - Responsive chat window design
   - Animations for message appearance
   - Mobile-optimized layout
   - Dark mode support

3. **Root Theme** (`src/theme/Root.tsx`)
   - Global layout wrapper that includes ChatBot
   - Automatically rendered on all pages
   - Integrates with Docusaurus routing

## Knowledge Base

The chatbot responds to topics including:

- **Specifications** - What specs are, how to write them
- **AI Generation** - Code generation from specs
- **Spec-Driven Development** - Core concepts and benefits
- **Getting Started** - How to begin with spec-driven dev
- **Examples** - Real-world use cases
- **Testing** - Auto-generated tests from specs
- **Best Practices** - Recommended patterns
- **Tools** - AI assistants and integrations
- **Benefits** - Why specs + AI matters
- **Learning** - How to use the AI Book

## Usage

### Default Behavior

The chatbot appears as a floating "💬 Ask AI" button in the bottom-right corner. Click to open the chat window.

### Keyboard Shortcuts

- **Enter** - Send message
- **Shift+Enter** - New line in message
- **Esc** (on header close button) - Close chat

## Customization

### Adding More Knowledge

Edit `src/components/ChatBot/index.tsx` and update the `responses` object in the `getAIResponse` function:

```typescript
const responses: { [key: string]: string } = {
  "your-keyword": "Your response text here",
  // Add more as needed
};
```

### Styling

Customize appearance by modifying `src/components/ChatBot/styles.module.css`:

- Colors: Update gradient colors in `.chatButton` and `.messageBubble`
- Size: Adjust `.chatWindow` width/height
- Position: Change `bottom` and `right` values in `.chatbotContainer`

### Integration with Backend

To connect to a real AI API:

1. Create an async function to call your API
2. Replace the timeout logic in `handleSendMessage` with API call
3. Update error handling as needed

```typescript
const handleSendMessage = async () => {
  // ... existing code ...

  const response = await fetch("/api/chat", {
    method: "POST",
    body: JSON.stringify({ message: inputValue }),
  });

  const data = await response.json();
  // ... handle response ...
};
```

## Mobile Experience

The chatbot is fully responsive:

- **Desktop**: Fixed floating button with 400px wide chat window
- **Tablet**: Adjusted sizing for touch interactions
- **Mobile**: Full-screen chat for better UX on small screens

## Accessibility

- Semantic HTML with proper ARIA labels
- Keyboard navigation support
- Color contrast compliant
- Screen reader friendly

## Performance

- Lazy loads only when needed
- Minimal bundle impact (~15KB uncompressed)
- Smooth animations with CSS
- No external API calls by default (local responses)

## Future Enhancements

Potential improvements:

1. **Persistent Chat History** - Store conversations in localStorage
2. **Analytics** - Track popular questions
3. **Multi-language** - Support different languages
4. **Real AI Backend** - Integrate with OpenAI API
5. **User Feedback** - Thumbs up/down on responses
6. **Advanced Search** - Index documentation for better answers

## Troubleshooting

### Chatbot not appearing

1. Check `src/theme/Root.tsx` is correctly placed
2. Verify import paths in Root component
3. Clear build cache: `npm run clear`
4. Rebuild: `npm run build`

### Messages not sending

- Check browser console for errors
- Verify input is not empty
- Check if `isLoading` state is stuck

### Styling issues

- Check CSS module is imported correctly
- Verify no conflicting global styles
- Clear CSS cache: `npm run clear`

## Support

For issues or feature requests, please:

1. Check existing GitHub issues
2. Create a detailed bug report
3. Include browser/device information
4. Provide steps to reproduce

---

**Happy chatting!** The AI Book Assistant is here to help. 🚀
