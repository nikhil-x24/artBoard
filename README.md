# ArtBoard- WebApp

Link of Website: https://artboard.onrender.com

## Overview

This web application enables users to collaborate in real-time by drawing together on a shared interactive canvas.


## Features
- **Real-time Collaboration:** Multiple users can draw together on the same canvas in real time, fostering teamwork and creativity.
- **Drawing Tools:** Includes a variety of tools like a pen, eraser (with adjustable sizes), and sticky notes for enhanced drawing options.
- **Color Options:** Choose from a wide range of colors to personalize and diversify your drawings.
- **Sticky Notes with Drag-and-Drop:** Add sticky notes for collaborative note-taking, and reposition them anywhere on the canvas with drag-and-drop functionality.
- **Image Upload:** Upload images directly to the canvas for enhanced customization and creativity.
- **Download Whiteboard:** Save the entire whiteboard or canvas as an image file to preserve collaborative work.
- **Undo-Redo Feature:** Effortlessly undo or redo actions for accurate and flexible editing.


## Technologies Used

- **Frontend:** Built with HTML, CSS, and JavaScript, utilizing the Canvas API for drawing capabilities and Socket CDN for optimized content delivery.
- **Backend:** Powered by Node.js and Express.js to handle server-side operations efficiently.
- **Real-time Collaboration:** Implemented using Socket.io for seamless real-time communication and synchronization across multiple users.
- **Hosting:** Deployed and hosted on Render for reliable and scalable performance.



## Setup Instructions

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/nikhil-x24/artboard.git
   ```
   
2. **Install Dependencies:**
   Navigate to the project directory and install the required dependencies:
   ```bash
   cd artboard
   npm install
   ```

3. **Configure Environment Variables:**
   Set up any required environment variables such as API keys or database URLs in a `.env` file.

4. **Update Socket Client URL:**
   Edit the socket connection URL in `index.html` at **line 79** to point to your application's URL:
   ```html
   <script src="http://YOUR_APP_URL/socket.io/socket.io.js"></script>
   ```

5. **Run the Application:**
   Start the development server:
   ```bash
   npm run dev
   ```

6. **Access the Application:**
   Open your browser and navigate to `http://localhost:3000` to view the application.


## Usage

1. **Visit the Application:**
   Go to the deployed app at [https://artboard.onrender.com](https://artboard.onrender.com).

2. **Start Collaborating:**
   - Use the available drawing tools (pen, eraser, sticky notes) to create on the canvas.
   - Select colors from the palette to enhance your drawing.
   - Upload images to the canvas for added customization.
   - Add and reposition sticky notes for collaborative note-taking.
   - Work with others in real time, seeing changes instantly on the shared canvas.



## Connect with Us

- **Email:** [nikhilverma1425@gmail.com](mailto:nikhilverma1425@gmail.com)
- **LinkedIn:** [linkedin.com/in/nikhil301](https://www.linkedin.com/in/nikhil301/)
- **Website:** [nikhil-portfolio.vercel.app](https://portfolio-cuplbm6p2-nikhil-x24s-projects.vercel.app/)
