# Lab test Playwright Project

## Overview

This repository contains automated tests for the Swag Labs web application, leveraging Playwright with TypeScript. The project follows the Page Object Model (POM) design pattern, aimed at ensuring robust, maintainable tests that validate the core functionality of the application, enabling successful user interaction with the web interface.

## Prerequisites

Before you begin, ensure you have met the following requirements:
- You have [Node.js](https://nodejs.org/en/) installed.
- You have a code editor such as [Visual Studio Code](https://code.visualstudio.com/) installed.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/rileyrabtest/labs-playwright-test.git
   cd labs-playwright-test
2. Install the dependencies:
    npm install
3. Install Playwright browsers:
    npx playwright install
## Usage
To run tests, use the following command:

npx playwright test lab-test.spec.ts

You can also run tests in a specific browser:

npx playwright test lab-test.spec.ts --browser=chromium

## Dependencies
The project relies on several key Node.js packages:

1. playwright for running browser automation
2. typescript for using TypeScript in the project. Further details can be found in package.json

## Documentation
Refer to the [Playwright documentation](https://playwright.dev/) for comprehensive guidelines on using Playwright.

## Contributing
Contributions are welcome! Please follow these steps:

Fork the repository.
Create your feature branch (git checkout -b feature/YourFeature).
Commit your changes (git commit -m 'Add some feature').
Push to the branch (git push origin feature/YourFeature).
Open a pull request.
## License
This project is licensed under the MIT License.
