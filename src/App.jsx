import React, { useState, useEffect, useCallback, useRef } from 'react';
import Papa from 'papaparse';
import YouTube from 'react-youtube';
import { useSpring, animated } from 'react-spring';
import { getRandomColor } from './utils/colorUtils';
import { playSound } from './utils/audioUtils';

/**
 * Main App component that handles the TinkerHub Credos presentation
 * Features include:
 * - Loading and displaying credos from CSV
 * - Keyboard and touch navigation
 * - Dynamic background colors
 * - Support for text, image, and video content
 */
function App() {
  const [credos, setCredos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Animation properties for smooth transitions
  const props = useSpring({
    opacity: isTransitioning ? 0 : 1,
    transform: isTransitioning ? 'scale(0.8)' : 'scale(1)',
    config: { tension: 300, friction: 20 }
  });

  // Loads and parses the CSV file containing credos
  useEffect(() => {
    fetch('/credos.csv')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch CSV file');
        }
        return response.text();
      })
      .then(csvText => {
        Papa.parse(csvText, {
          header: true,
          complete: (results) => {
            if (results.data && results.data.length > 0) {
              setCredos(results.data);
              setBackgroundColor(getRandomColor());
            }
          },
          error: (error) => {
            console.error('Error parsing CSV:', error);
          }
        });
      })
      .catch(error => {
        console.error('Error fetching CSV:', error);
      });
  }, []);

  // Handles navigation between credos with animation and sound effects
  const navigate = useCallback((direction) => {
    if (isTransitioning || credos.length === 0) return;

    setIsTransitioning(true);
    playSound('slide');

    setTimeout(() => {
      let newIndex;
      if (direction === 'next') {
        newIndex = currentIndex === credos.length - 1 ? 0 : currentIndex + 1;
      } else {
        newIndex = currentIndex === 0 ? credos.length - 1 : currentIndex - 1;
      }
      
      setCurrentIndex(newIndex);
      setBackgroundColor(getRandomColor());
      
      setTimeout(() => {
        setIsTransitioning(false);
        playSound('appear');
      }, 100);
    }, 300);
  }, [credos, currentIndex, isTransitioning]);

  // Sets up keyboard navigation event listeners
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space' || e.code === 'ArrowRight') {
        navigate('next');
      } else if (e.code === 'ArrowLeft') {
        navigate('prev');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  // Handles touch navigation for mobile devices
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX.current;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        navigate('next');
      } else {
        navigate('prev');
      }
    }
  };

  // Renders the current credo based on its type
  const renderCredo = () => {
    if (credos.length === 0) return <div className="loading">Loading...</div>;

    const credo = credos[currentIndex];
    
    switch (credo.type) {
      case 'text':
        return <h1 className="text-credo">{credo.content}</h1>;
      
      case 'image':
        return (
          <div className="media-container">
            <img src={credo.content} alt="TinkerHub Credo" className="media-content" />
          </div>
        );
      
      case 'video':
        const videoId = credo.content.split('v=')[1]?.split('&')[0];
        if (!videoId) return <div>Invalid YouTube URL</div>;
        
        return (
          <div className="media-container">
            <YouTube 
              videoId={videoId} 
              opts={{
                height: '100%',
                width: '100%',
                playerVars: {
                  autoplay: 0,
                },
              }}
            />
          </div>
        );
      
      case 'intro':
        return (
          <div className="intro-container">
            <img src={credo.content} alt="TinkerHub Logo" className="intro-logo" />
            <h2>TinkerHub Credos</h2>
            <p>Press spacebar or swipe to navigate</p>
          </div>
        );
      
      default:
        return <div>Unknown credo type</div>;
    }
  };

  // Calculate text color based on background brightness
  const isDarkBackground = () => {
    const color = backgroundColor.replace('#', '');
    const r = parseInt(color.substr(0, 2), 16);
    const g = parseInt(color.substr(2, 2), 16);
    const b = parseInt(color.substr(4, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness < 128;
  };

  return (
    <div 
      className="app-container"
      style={{ 
        backgroundColor,
        '--text-color': isDarkBackground() ? '#ffffff' : '#000000',
        '--logo-filter': isDarkBackground() ? 'invert(1)' : 'none'
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={() => navigate('next')}
    >
      <div className="logo-container">
        <img 
          src="/logo.svg" 
          alt="TinkerHub Logo" 
          className="header-logo"
        />
      </div>
      
      <animated.div className="credo-container" style={props}>
        {renderCredo()}
      </animated.div>
      
      <div className="navigation">
        <div className="progress">
          {credos.map((_, index) => (
            <div 
              key={index} 
              className={`progress-dot ${index === currentIndex ? 'active' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                if (index !== currentIndex) {
                  setIsTransitioning(true);
                  playSound('pop');
                  setTimeout(() => {
                    setCurrentIndex(index);
                    setBackgroundColor(getRandomColor());
                    setTimeout(() => {
                      setIsTransitioning(false);
                      playSound('appear');
                    }, 100);
                  }, 300);
                }
              }}
            />
          ))}
        </div>
      </div>

      <footer className="footer">
        Use space or arrow keys to navigate
      </footer>
    </div>
  );
}

export default App;