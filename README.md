# Three.js Coming Soon Page

This project is a simple "Coming Soon" webpage built using Three.js and TypeScript. It features a video background that plays once and freezes on the last frame, creating a cinematic effect for visitors.

## Project Structure

```
threejs-coming-soon
├── public
│   ├── index.html        # HTML structure of the webpage
│   ├── video.mp4        # Background video file
│   └── last-frame.jpg    # Static image of the last frame of the video
├── src
│   ├── main.ts          # Main TypeScript file for initialization
│   ├── styles.css       # CSS styles for the webpage
│   └── threejs
│       └── scene.ts     # Three.js related setup (optional)
├── package.json         # npm configuration file
├── tsconfig.json        # TypeScript configuration file
└── README.md            # Project documentation
```

## Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd threejs-coming-soon
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Build the Project**
   ```bash
   npm run build
   ```

4. **Run the Project**
   ```bash
   npm start
   ```

5. **Open in Browser**
   Navigate to `http://localhost:3000` (or the specified port) to view the "Coming Soon" page.

## Features

- Background video that plays once and freezes on the last frame.
- Responsive design that covers the entire viewport.
- Simple and clean interface with a "Coming Soon" message.

## Notes

- Ensure that the video file (`video.mp4`) and the last frame image (`last-frame.jpg`) are correctly placed in the `public` directory.
- You can customize the styles in `src/styles.css` to match your branding or design preferences.

## License

This project is licensed under the MIT License. Feel free to modify and use it as per your requirements.