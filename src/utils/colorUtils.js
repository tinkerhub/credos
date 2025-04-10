/**
 * Utility functions for color manipulation
 */

/**
 * Determines if a color is dark or light
 * @param {string} color - Hex color code
 * @returns {boolean} - True if color is dark, false if light
 */
export const isDarkColor = (color) => {
  // Remove the hash if it exists
  const hex = color.replace('#', '');
  
  // Convert hex to RGB
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  
  // Calculate brightness using the formula: (0.299*R + 0.587*G + 0.114*B)
  const brightness = (r * 0.299 + g * 0.587 + b * 0.114);
  
  // If brightness is less than 128, color is considered dark
  return brightness < 128;
};

/**
 * Generates a random color
 * @returns {string} - Random hex color code
 */
export const getRandomColor = () => {
  // Generate vibrant colors that work well with text
  const colors = [
    '#FF5252', // Red
    '#FF4081', // Pink
    '#E040FB', // Purple
    '#7C4DFF', // Deep Purple
    '#536DFE', // Indigo
    '#448AFF', // Blue
    '#40C4FF', // Light Blue
    '#18FFFF', // Cyan
    '#64FFDA', // Teal
    '#69F0AE', // Green
    '#B2FF59', // Light Green
    '#EEFF41', // Lime
    '#FFFF00', // Yellow
    '#FFD740', // Amber
    '#FFAB40', // Orange
    '#FF6E40'  // Deep Orange
  ];
  
  return colors[Math.floor(Math.random() * colors.length)];
}