/**
 * Utility functions for audio handling
 */

// Create audio elements for different sound effects
const popSound = new Audio('/sounds/pop.mp3');
const slideSound = new Audio('/sounds/slide.mp3');
const appearSound = new Audio('/sounds/appear.mp3');

/**
 * Play a specific sound by name
 * @param {string} soundName - The name of the sound to play (pop, slide, appear)
 */
export const playSound = (soundName) => {
  switch (soundName) {
    case 'pop':
      popSound.play().catch(err => console.error('Error playing sound:', err));
      break;
    case 'slide':
      slideSound.play().catch(err => console.error('Error playing sound:', err));
      break;
    case 'appear':
      appearSound.play().catch(err => console.error('Error playing sound:', err));
      break;
    default:
      console.error('Unknown sound name:', soundName);
  }
};

/**
 * Play a sound effect based on the credo type
 * @param {string} type - The type of credo (text, image, video, intro)
 */
export const playEntrySound = (type) => {
  switch (type) {
    case 'text':
      popSound.play().catch(err => console.error('Error playing sound:', err));
      break;
    case 'image':
      appearSound.play().catch(err => console.error('Error playing sound:', err));
      break;
    case 'video':
      slideSound.play().catch(err => console.error('Error playing sound:', err));
      break;
    default:
      popSound.play().catch(err => console.error('Error playing sound:', err));
  }
};