# Next.js with WordPress

This project is a web application built using Next.js with WordPress as the CMS. It leverages Apollo Client to fetch data from the WordPress GraphQL API and displays posts on the frontend.

## Features

- Next.js: A React framework for server-rendered applications.
- WordPress: Used as the headless CMS.
- Apollo Client: For fetching data from the WordPress GraphQL API.
- Tailwind CSS: For styling the application.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/shlomiNugarker/nextjs-with-wordpress.git
   cd nextjs-with-wordpress
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Create a .env.local file based on .env.example and set your WordPress GraphQL endpoint:

   ```bash
   WORDPRESS_GRAPHQL_ENDPOINT=https://your-wordpress-site.com/graphql
   ```

## Usage

1.  Start the development server:

    ```bash
    npm run dev
    ```

2.  Open your browser and navigate to http://localhost:3000.

## Project Structure

- src/ : Main application code.
- pages/ : Next.js pages.
- components/ : Reusable components.
- lib/ : Apollo Client setup.
- public/ : Static files.
- styles/ : Tailwind CSS configuration.

## Contributing

Feel free to submit issues and pull requests.

## Contact

Developed by [Shlomi Nugarker](https://www.linkedin.com/in/shlomi-nugarker-b89777155/).

- [LinkedIn](https://www.linkedin.com/in/shlomi-nugarker-b89777155/)
- [Email](mailto:shlomin1231@gmail.com)
- [Portfolio](https://shlomi-nugarker-portfolio.vercel.app/)
