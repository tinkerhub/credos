# TinkerHub Credos

A dynamic presentation application for TinkerHub Credos, featuring text, images, and videos with smooth transitions and interactive navigation.

## Features

- Dynamic background colors
- Support for text, image, and video content
- Keyboard and touch navigation
- Responsive design
- Automatic color contrast adjustment
- Progress indicators
- Smooth animations

## Installation

1. Clone the repository:
```bash
git clone https://github.com/tinkerhub/credos.git
cd credos
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Modifying Content

### Adding/Editing Credos

1. Open `credos.csv` in your preferred text editor
2. The CSV file should have the following columns:
   - `type`: Can be 'text', 'image', 'video', or 'intro'
   - `content`: The actual content (text, image URL, or YouTube URL)

Example:
```csv
type,content
text,This is a sample credo
image,https://example.com/image.jpg
video,https://www.youtube.com/watch?v=VIDEO_ID
```

### Customizing Styles

1. Open `src/App.css` to modify the visual styles
2. Key sections to customize:
   - `.app-container`: Main container styles
   - `.media-container`: Image and video container styles
   - `.text-credo`: Text content styles
   - `.progress-dot`: Navigation indicator styles

### Adding New Features

1. Main application logic is in `src/App.jsx`
2. Key functions:
   - `navigate`: Handles slide transitions
   - `renderCredo`: Renders different types of content
   - `isDarkBackground`: Calculates text color based on background

## Project Structure

```
credos/
├── src/
│   ├── App.jsx        # Main application component
│   ├── App.css        # Styles
│   └── utils/         # Utility functions
├── public/
│   ├── logo.svg       # TinkerHub logo
│   └── credos.csv     # Content file
├── package.json       # Project dependencies
└── vite.config.js     # Vite configuration
```

## Contributing

1. Fork the repository
2. Create a new branch for your feature
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.