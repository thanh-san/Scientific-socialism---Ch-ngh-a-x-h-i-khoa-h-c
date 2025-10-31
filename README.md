
# Scientific Socialism AI Chatbot

An AI-powered chatbot designed to answer questions and provide detailed explanations about Scientific Socialism in Vietnamese, leveraging the Google Gemini API.

## Deployment

This project is set up as a static web application and can be deployed to any static hosting provider like Vercel, Netlify, or GitHub Pages.

### Vercel Deployment

1.  Push the code to a Git repository (e.g., GitHub, GitLab).
2.  Import the project into Vercel. Vercel will automatically detect it as a static site. No special build commands are needed.
3.  **Crucially**, you must set an Environment Variable in your Vercel project settings:
    -   **Name**: `API_KEY`
    -   **Value**: `[Your Google Gemini API Key]`

The application will not work without this environment variable.
