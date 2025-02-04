# Natural Language Website Generator

This repository contains a **Natural Language Website Generator** that uses the OpenAI API to transform descriptive prompts into fully functional website code. Users can simply describe the website they want (e.g., "Create a landing page with a hero image and signup form"), and the application generates HTML, CSS, and JavaScript code to match their request. It also provides a live preview of the generated code directly within the app.

## Features

- **Simple User Input**: Accepts natural language descriptions for the type of website the user wants.
- **OpenAI API Integration**: Calls OpenAI's API to generate HTML, CSS, and JavaScript code based on user input.
- **Code Preview and Live Render**: Displays the generated code in a text area and shows a live preview. (In progress)
- **Express Backend**: A Node.js/Express backend handles requests to the OpenAI API securely.
- **Responsive UI**: Built with a simple, responsive layout for ease of use on all devices.

## Files

- `public/index.html`: Main HTML file for the user interface.
- `public/css/style.css`: CSS file for styling the UI components.
- `public/js/script.js`: Frontend JavaScript to handle input processing and live preview rendering.
- `server/server.js`: Node.js/Express backend for secure API requests.
- `server/.env`: Stores sensitive API keys for OpenAI (not included in the repository for security).

## Getting Started

#### 1. **Clone the repository** and install dependencies.

   ```git
   git clone https://github.com/LeeLupton/Natural-Language-Website-Generator.git
   ```

   - Move into the project directory:
   
   ```
   cd Natural-Language-Website-Generator
   ```

   - After moving into the repository directory, create an `.env` file by copying `.env.example`.
  
     Linux:
     ```bash
     cp .env.example .env
     ```
  
     Windows PowerShell:
     ```PowerShell
     Copy-Item -Path ".env.example" -Destination ".env"
     ```
  
  - Install dependencies in `/server` using npm:
  ```npm
  cd server
  npm install express openai dotenv body-parser
  ```
  
#### 2. **Set up OpenAI API Key** in a `.env` file in the backend.
   - Open .env in your text editor of choice and replace `<your_openai_api_key_here>` with your actual key. Remove < and >.

#### 3. **Run the server** to launch the application locally.
   - Starting in the `Natural-Language-Website-Generator` directory, run `node server/server.js`

#### 4. Open the browser and type `localhost:3000` in the url bar. Then enter prompts to start generating website code in real-time.

## Usage Example

1. Open the app and type a description, e.g., "Create a portfolio page with a profile image and contact form."
2. Click "Generate Website" to see the generated HTML, CSS, and JavaScript.
3. View a live preview of the generated website code. (in progress)

---

This repo is ideal for developers, designers, and creatives interested in natural language-driven web development.
