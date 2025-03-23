import speech_recognition as sr
import gradio as gr
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Dictionary of supported Indian languages with Google Speech API language codes
indian_languages = {
    'hindi': 'hi-IN', 'tamil': 'ta-IN', 'telugu': 'te-IN', 'bengali': 'bn-IN', 'gujarati': 'gu-IN',
    'malayalam': 'ml-IN', 'marathi': 'mr-IN', 'punjabi': 'pa-IN', 'urdu': 'ur-IN'
}

current_language = 'hindi'  # Default language

def set_language(language):
    global current_language
    current_language = language.lower()
    return f"Language set to: {current_language}"

def process_text(text):
    if current_language not in indian_languages:
        return f"Error: Unsupported language. Choose from {', '.join(indian_languages.keys())}"
    
    try:
        # Here you can add any additional processing needed for the text
        return f"Processed Text ({current_language}): {text}"
    except Exception as e:
        return f"Error processing text: {str(e)}"

# Create FastAPI app
app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create Gradio Interface
iface = gr.Interface(
    fn=[set_language, process_text],  # Two functions
    inputs=[
        gr.Textbox(label="Enter Language (e.g., hindi, tamil, telugu)"),
        gr.Textbox(label="Text to process")
    ],
    outputs="text",
    title="Indian Language Speech-to-Text",
    description="Select a language and enter text to process."
)

# Mount Gradio app on FastAPI
app = gr.mount_gradio_app(app, iface, path="/")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=7860)