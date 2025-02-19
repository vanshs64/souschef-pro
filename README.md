# SousChef Recipe Assistant
SousChef is not a teacher or recipe book, SousChef empowers users to cook smarter, not harder.

## Overview
My Recipe App is a user-friendly React application that allows users to input a recipe URL or paste recipe text directly. The app extracts important details such as ingredients, steps, durations, and provides helpful cooking techniques. Users can specify the quantity of the recipe they want and receive step-by-step instructions in a friendly manner.

## Features
- Input a recipe URL or paste recipe text directly.
- Extracts ingredients, steps, and durations from the provided recipe.
- Provides AI-generated cooking techniques to simplify the cooking process.
- Allows users to specify the desired quantity of the recipe.
- Presents instructions step-by-step to avoid overwhelming users.

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm (Node Package Manager)

### Installation
1. Clone the repository:
   ```
   git clone https://github.com/vanshs64/souschef-pro/
   ```
2. Navigate to the project directory:
   ```
   cd souschef-pro
   ```
3. Install the dependencies:
   ```
   npm install
   ```

### Environment Variables
Create a `.env` file in the root of the project and add your OpenAI API key:
```
REACT_APP_OPENAI_API_KEY=your_api_key_here
```

### Running the Application
You will need to have Python 3.10+ and Node.js installed. To start the development server, run (in two parallel terminals).:
```
pip install -r requirements.txt
python server.py

npm install
npm run dev
```

Also, it's worth noting that you may want to run this on a virtual environment (so that you don't end up with conflicting dependancies installed on your local machine)
```
python -m venv venv

# For mac
./venv/bin/Activate

# For windows
./venv/Scripts/Activate
```

Open your browser and navigate to `http://localhost:5173/` to view the application.

### Building for Production
To create a production build, run:
```
npm run build
```

## Usage
1. On the home page, input a recipe URL or paste the recipe text.
2. Specify the quantity of the recipe you want.
3. Follow the step-by-step instructions provided by the app.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

This project began at a Hackathon with @azhahd, @YeehawMcfly, and @shababaa.
Devpost Project: https://devpost.com/software/souschef-k16pgi

## License
This project is licensed under the MIT License.