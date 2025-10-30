# مزایده اثار هنری (ماه) - Parsian Art Gallery

This is a web application for an online art gallery that hosts auctions for various artworks. The application is built with React and Vite, and it uses Supabase for its backend services.

## Features

*   **Browse Artwork:** View a gallery of artworks with detailed information about each piece and the artist.
*   **Live Auctions:** Participate in real-time auctions for your favorite artworks.
*   **User Authentication:** Secure user registration and login functionality.
*   **Responsive Design:** The application is designed to be accessible on various devices, including desktops, tablets, and mobile phones.

## Technologies Used

*   **Frontend:**
    *   React
    *   Vite
    *   Tailwind CSS
    *   Swiper.js
    *   Framer Motion
*   **Backend:**
    *   Supabase
*   **Deployment:**
    *   Apache

## Getting Started

### Prerequisites

*   Node.js (v16 or higher)
*   npm

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/parsian-art-gallery.git
    cd parsian-art-gallery
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Set up environment variables:**

    Create a `.env` file in the root of the project and add your Supabase credentials:

    ```
    VITE_SUPABASE_URL=<YOUR_SUPABASE_URL>
    VITE_SUPABASE_ANON_KEY=<YOUR_SUPABASE_ANON_KEY>
    ```

### Running the Application

To run the application in a development environment, use the following command:

```bash
npm run dev
```

This will start the development server at `http://localhost:5173`.

### Building for Production

To create a production build of the application, run:

```bash
npm run build
```

This will generate a `dist` folder with the optimized and minified files.

### Linting

To check the code for any linting errors, run:

```bash
npm run lint
```

## Deployment

The application is configured to be deployed on an Apache server. When you run `npm run build`, a `.htaccess` file is copied to the `dist` folder to handle client-side routing.

**Note:** Ensure that the `mod_rewrite` module is enabled on your Apache server.
