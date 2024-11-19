# Social Media React Application

## Overview

This project is a social media web-app inspired by LinkedIn, called **Travelsdin**. The application allows users to create posts, like, comment, and interact with other users, focusing on providing an interactive and modern UI/UX for social networking purposes.

For the live project, visit: [Travelsdin on Railway](https://travelsdin-express-production.up.railway.app/#/)

Backend Repository: [Social Network Backend](https://github.com/shlomiNugarker/Social-Network-Backend)

## Features

- User authentication (sign up, log in, log out)
- Create, edit, and delete posts
- Like and comment on posts
- User profile pages
- Real-time notifications for new likes and comments
- Responsive design for different screen sizes
- Persistent state using local storage

## Installation

To get started with the project, follow these steps:

1. **Clone the repository**:

   ```sh
   git clone https://github.com/shlomiNugarker/social-media-react.git
   ```

2. **Navigate into the project directory**:

   ```sh
   cd social-media-react-main
   ```

3. **Install the dependencies**:

   ```sh
   npm install
   ```

4. **Start the development server**:

   ```sh
   npm start
   ```

The application should now be running on [http://localhost:3000](http://localhost:3000).

## Available Scripts

- **`npm start`**: Runs the app in development mode.
- **`npm test`**: Launches the test runner.
- **`npm run build`**: Builds the app for production.
- **`npm run lint`**: Lints the code to find and fix issues.

## Technologies Used

- **React**: Frontend framework for building the user interface.
- **Redux**: State management for React components.
- **React Router**: For managing application routes.
- **CSS Modules and SASS**: For styling components in a modular and reusable way.
- **Axios**: For making HTTP requests.
- **Node.js**: Backend runtime environment.
- **Express**: Backend framework for creating RESTful APIs.
- **Socket.io**: Real-time bidirectional event-based communication.
- **MongoDB**: Database for storing user data and posts.
- **Service Workers**: For enabling offline functionality.

## Folder Structure

- **src/**
  - **assets/**: Holds images, icons, and other static resources used throughout the application.
  - **components/**: Main reusable components, such as:
    - **Navbar.js**: The navigation bar component.
    - **Post.js**: Component for displaying individual posts.
    - **Profile.js**: User profile component.
  - **hooks/**: Custom hooks to share reusable logic across components.
  - **pages/**: Page components representing different routes in the application:
    - **Home.js**: Home page of the application.
    - **Login.js**: Login page component.
    - **Profile.js**: User profile page.
  - **services/**: Functions for interacting with external APIs (CRUD operations, user authentication).
  - **store/**: Contains Redux store configurations and slices, such as:
    - **userSlice.js**: State management for user authentication.
    - **postSlice.js**: State management for posts.
  - **utils/**: Helper functions for repetitive tasks.
  - **App.js**: Root component of the application.
  - **index.js**: Entry point for rendering the application.

## Deployment

To deploy the application, you can use platforms like Vercel, Netlify, or GitHub Pages. First, build the application using:

```sh
npm run build
```

Then follow the specific deployment steps for your chosen platform.

## Media

### Screenshot



### Demo Video

Watch the demo of Travelsdin here:

[Travelsdin Demo Video](https://user-images.githubusercontent.com/98424459/205487047-22fc957c-701f-45de-bb31-58c11a467db8.mp4)

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a Pull Request.

## Contact

If you have any questions or suggestions, feel free to contact the project maintainer at:

- **Name**: Shlomi Nugarker
- **Email**: [shlomin1231@gmail.com](mailto\:shlomin1231@gmail.com)

We look forward to your feedback and contributions to make **Travelsdin** even better!

