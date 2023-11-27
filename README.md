# ai-visual-tester

![Node Build](https://github.com/LaurentiuGabriel/ai-visual-tester/actions/workflows/node.js.yml.badge.svg)

ai-visual-tester is an innovative npm package that leverages artificial intelligence to perform visual testing on screenshots of applications. By utilizing OpenAI's powerful models, this package can analyze screenshots for visual inconsistencies, UX issues, typos, and other elements critical to high-quality software development.

## Features
- AI-Powered Analysis: Uses OpenAI's GPT models to analyze application screenshots.
- Easy to Use: Simple interface for passing screenshots and receiving AI analysis.
- Flexible: Can be integrated into various stages of the development and testing process.

## Installation
To use ai-visual-tester, first ensure you have Node.js installed. Then, run the following command in your project directory:

```
npm install ai-visual-tester
```
You also need an OpenAI API key stored as an environment variable with this key: OPENAI_KEY.

## Usage
Import the testPhoto function from the package and use it to send a file for analysis. The function expects a file as an argument.

### Example
```
const { testPhoto } = require('ai-visual-tester');
const fs = require('fs');

// Read the image file as a buffer
const fileBuffer = fs.readFileSync('path_to_your_screenshot.jpg');

testPhoto(fileBuffer)
  .then(lines => {
    console.log("AI Analysis:");
    lines.forEach(line => console.log(line));
  })
  .catch(error => console.error("Error:", error));
```

## API Reference
### testPhoto(file)
- file (File): The screenshot file to be analyzed.

## Contributing
Contributions are welcome! If you'd like to contribute, feel free to fork the repository and submit a pull request.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments
This package utilizes OpenAI's API for AI-powered analysis.
Thanks to all the contributors who have helped improve ai-visual-tester.
