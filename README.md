# TinkerHub Credos Viewer

A React application that displays TinkerHub credos in a slideshow format. The application shows one credo at a time with randomized background colors. Users can navigate through the credos using keyboard controls (spacebar, arrow keys) or touch controls on mobile devices.

## Features

- Displays text, images, and videos from a CSV file
- Randomized background colors for each credo
- Keyboard navigation (spacebar, arrow keys)
- Touch controls for mobile devices
- Responsive design for all screen sizes
- First item always fixed as an intro
- YouTube video embedding with previews

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository or download the source code
2. Navigate to the project directory
3. Install dependencies:

```bash
npm install
```

### Running the Application

Start the development server:

```bash
npm run dev
```

The application will be available at http://localhost:3000

### Building for Production

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Customizing Credos

The credos are loaded from a CSV file located in the `public` directory. You can modify the `credos.csv` file to add, remove, or update credos.

The CSV file has the following columns:

- `type`: The type of content (text, image, video, intro)
- `content`: The content to display (text, image URL, video URL)
- `description`: A description of the content (displayed as the title)

## Usage

- Press the **spacebar** or **right arrow key** to go to the next credo
- Press the **left arrow key** to go to the previous credo
- On mobile devices, use the arrow buttons at the bottom of the screen

## License

This project is open source and available under the MIT License.