# Python Chatbot App

A modern Python Flask chatbot application with a beautiful UI built with HTML, CSS, and JavaScript. This is a complete conversion from the React/TypeScript version to a Python backend with a responsive frontend.

## Features

- **Python Flask Backend**: RESTful API with chat functionality
- **Modern UI**: Beautiful, responsive design with dark/light mode support
- **Collapsible Sidebar**: Navigation with smooth animations
- **Real-time Chat**: Send and receive messages with AI responses
- **Multiple AI Models**: Support for various AI models (GPT-4o, Claude, Gemini, etc.)
- **Dark/Light Mode**: Toggle between themes with persistent preferences
- **Mobile Responsive**: Works perfectly on all device sizes
- **Chat History**: Messages are stored and displayed in the conversation

## Project Structure

```
chatbot-app/
├── app.py                 # Main Flask application
├── requirements.txt       # Python dependencies
├── templates/
│   └── index.html        # Main HTML template
├── static/
│   ├── css/
│   │   └── style.css     # All styling and themes
│   └── js/
│       └── app.js        # Frontend JavaScript functionality
└── README.md             # This file
```

## Getting Started

### Prerequisites

- Python 3.8+
- pip (Python package manager)

### Installation

1. **Clone or download the project files**

2. **Install Python dependencies:**
```bash
pip install -r requirements.txt
```

3. **Run the Flask application:**
```bash
python app.py
```

4. **Open your browser and go to:**
```
http://localhost:5000
```

## API Endpoints

The Flask backend provides the following REST API endpoints:

- `GET /` - Main application page
- `POST /api/chat` - Send a chat message
- `GET /api/chat/history` - Get chat history
- `GET /api/models` - Get available AI models
- `POST /api/toggle-dark-mode` - Toggle dark mode preference

## Features in Detail

### Chat Functionality
- Send messages through the input field
- Receive AI responses (currently simulated)
- Chat history is maintained during the session
- Support for multiple AI models

### UI Features
- **Collapsible Sidebar**: Click the chevron to collapse/expand
- **Dark Mode Toggle**: Switch between light and dark themes
- **Model Selection**: Choose from different AI models
- **New Chat**: Start fresh conversations
- **Responsive Design**: Works on desktop, tablet, and mobile

### Frontend Technologies
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS variables for theming
- **JavaScript (ES6+)**: Interactive functionality
- **Font Awesome**: Icons
- **Local Storage**: Persistent user preferences

### Backend Technologies
- **Flask**: Lightweight Python web framework
- **JSON APIs**: RESTful communication
- **Session Management**: Chat history storage

## Customization

### Adding Real AI Integration

To integrate with actual AI services, modify the `generate_ai_response()` function in `app.py`:

```python
def generate_ai_response(message, model):
    # Replace with actual AI API calls
    if model == 'gpt-4o':
        # OpenAI API integration
        pass
    elif model == 'claude':
        # Anthropic API integration
        pass
    # ... other models
```

### Styling Customization

The app uses CSS variables for easy theming. Modify colors in `static/css/style.css`:

```css
:root {
    --primary: #your-color;
    --background: #your-color;
    /* ... other variables */
}
```

### Adding New Features

1. **New API Endpoints**: Add routes in `app.py`
2. **Frontend Features**: Add JavaScript in `static/js/app.js`
3. **UI Components**: Add HTML in `templates/index.html`
4. **Styling**: Add CSS in `static/css/style.css`

## Development

### Running in Development Mode
```bash
python app.py
```
The app will run with debug mode enabled and auto-reload on changes.

### Production Deployment

For production deployment, consider:

1. **WSGI Server**: Use Gunicorn or uWSGI
2. **Database**: Add SQLAlchemy for persistent storage
3. **Environment Variables**: Use python-dotenv for configuration
4. **Security**: Add authentication and rate limiting
5. **HTTPS**: Use SSL certificates

### Example Production Setup
```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:8000 app:app
```

## Browser Support

- Chrome/Chromium (recommended)
- Firefox
- Safari
- Edge

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## Future Enhancements

- [ ] Real AI API integration (OpenAI, Anthropic, etc.)
- [ ] User authentication and accounts
- [ ] File upload and image analysis
- [ ] Voice input/output
- [ ] Database integration for persistent chat history
- [ ] WebSocket support for real-time updates
- [ ] Multi-language support
- [ ] Export chat conversations
- [ ] Advanced model configuration options