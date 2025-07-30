import os
from flask import Flask, render_template, request, jsonify, redirect, url_for, flash
from datetime import datetime
from openai import OpenAI
import smtplib
from email.mime.text import MIMEText
from dotenv import load_dotenv

load_dotenv()  # Load environment variables from .env

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # Needed for flash messages

# Store chat history in memory (in production, use a database)
chat_history = []

# OpenRouter/OpenAI client setup
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=OPENROUTER_API_KEY
)

@app.route('/')
def index():
    """Main page route"""
    return render_template('index.html')

@app.route('/api/chat', methods=['POST'])
def chat():
    """API endpoint for chat messages"""
    data = request.get_json()
    message = data.get('message', '')
    model = "mistralai/mistral-7b-instruct:free"

    if not message.strip():
        return jsonify({'error': 'Message cannot be empty'}), 400

    # If the user is asking to write a prompt, append the expert-level instruction
    expert_instruction = (
        "\n\nDeliver a comprehensive, expert-level response that is step-by-step, deeply insightful, and grounded in real-world best practices. "
        "Include clear explanations, practical examples, and multiple perspectives where relevant. Ensure the output is technically precise, highly creative, and logically structured. "
        "Use professional formatting such as bullet points, diagrams, or well-commented code snippets to enhance understanding and usability. "
        "Optimize for completeness, clarity, and actionable value."
    )
    if 'prompt' in message.lower():
        message += expert_instruction

    # Add user message to history
    user_message = {
        'id': len(chat_history) + 1,
        'type': 'user',
        'content': message,
        'timestamp': datetime.now().isoformat(),
        'model': model
    }
    chat_history.append(user_message)

    # Call OpenRouter API for AI response
    try:
        completion = client.chat.completions.create(
            extra_headers={
                # Optionally set these:
                # "HTTP-Referer": "https://yourdomain.com",
                # "X-Title": "Your App Name",
            },
            model=model,
            messages=[
                {"role": "user", "content": message}
            ]
        )
        ai_response = completion.choices[0].message.content
    except Exception as e:
        ai_response = f"[Error contacting AI: {e}]"

    # Add AI response to history
    ai_message = {
        'id': len(chat_history) + 1,
        'type': 'ai',
        'content': ai_response,
        'timestamp': datetime.now().isoformat(),
        'model': model
    }
    chat_history.append(ai_message)

    return jsonify({
        'success': True,
        'response': ai_response,
        'message_id': user_message['id'],
        'response_id': ai_message['id']
    })

@app.route('/api/chat/history', methods=['GET'])
def get_chat_history():
    """Get chat history"""
    return jsonify({
        'success': True,
        'messages': chat_history
    })

def generate_ai_response(message, model):
    # Deprecated: now handled by OpenRouter API
    return "[Simulated response: OpenRouter integration active]"

@app.route('/api/toggle-dark-mode', methods=['POST'])
def toggle_dark_mode():
    """Toggle dark mode preference"""
    data = request.get_json()
    dark_mode = data.get('darkMode', False)
    # In a real app, you'd save this to user preferences
    return jsonify({
        'success': True,
        'darkMode': not dark_mode
    })

@app.route('/help')
def help():
    """Help page route"""
    return render_template('help.html')

@app.route('/about')
def about():
    """About the Creator page route"""
    return render_template('about.html')

@app.route('/send-enquiry', methods=['POST'])
def send_enquiry():
    name = request.form.get('name')
    email = request.form.get('email')
    message = request.form.get('message')

    if not name or not email or not message:
        flash('All fields are required.', 'error')
        return redirect(url_for('index'))

    # Compose email
    subject = f"New Enquiry from {name}"
    body = f"Name: {name}\nEmail: {email}\nMessage:\n{message}"
    msg = MIMEText(body)
    msg['Subject'] = subject
    msg['From'] = email
    msg['To'] = 'singhvineetvedant@gmail.com'

    # Send email (using Gmail SMTP as example)
    try:
        smtp_server = 'smtp.gmail.com'
        smtp_port = 587
        smtp_user = 'your_gmail_address@gmail.com'  # Replace with your Gmail
        smtp_password = 'your_gmail_app_password'   # Use App Password if 2FA enabled

        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()
        server.login(smtp_user, smtp_password)
        server.sendmail(email, ['singhvineetvedant@gmail.com'], msg.as_string())
        server.quit()
        flash('Thank you for your enquiry! I will get back to you soon.', 'success')
    except Exception as e:
        print('Error sending email:', e)
        flash('Sorry, there was an error sending your enquiry.', 'error')

    return redirect(url_for('index'))

# NOTE: If the Help and About Me buttons are not responding,
# check your frontend code to ensure the buttons or links
# correctly point to '/help' and '/about' routes.

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)