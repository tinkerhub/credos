import React, { useState, useEffect, useCallback, useRef } from 'react';
import Papa from 'papaparse';
import YouTube from 'react-youtube';
import { useSpring, animated } from 'react-spring';
import { getRandomColor } from './utils/colorUtils';
import { playSound } from './utils/audioUtils';

function App() {
  const [credos, setCredos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Animation properties
  const props = useSpring({
    opacity: isTransitioning ? 0 : 1,
    transform: isTransitioning ? 'scale(0.8)' : 'scale(1)',
    config: { tension: 300, friction: 20 }
  });

  // Load CSV data
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
              // Set initial background color
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

  // Handle navigation
  const navigate = useCallback((direction) => {
    if (isTransitioning || credos.length === 0) return;

    setIsTransitioning(true);
    
    // Play transition sound
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

  // Keyboard navigation
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

  // Touch navigation
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX.current;

    if (Math.abs(diff) > 50) { // Minimum swipe distance
      if (diff > 0) {
        navigate('next');
      } else {
        navigate('prev');
      }
    }
  };

  // Render current credo
  const renderCredo = () => {
    if (credos.length === 0) return <div className="loading">Loading...</div>;

    const credo = credos[currentIndex];
    
    switch (credo.type) {
      case 'text':
        return <h1 className="text-credo">{credo.content}</h1>;
      
      case 'image':
        return (
          <div className="image-container">
            <img src={credo.content} alt="TinkerHub Credo" className="image-content" />
          </div>
        );
      
      case 'video':
        // Extract YouTube video ID
        const videoId = credo.content.split('v=')[1]?.split('&')[0];
        if (!videoId) return <div>Invalid YouTube URL</div>;
        
        return (
          <div className="video-container">
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

  return (
    <div 
      className="app-container"
      style={{ backgroundColor }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="logo-container">
        <img src="/logo.svg" alt="TinkerHub Logo" className="header-logo" />
      </div>
      <animated.div className="credo-container" style={props}>
        {renderCredo()}
      </animated.div>
      
      <div className="navigation">
        <button onClick={() => navigate('prev')} className="nav-button prev">&lt;</button>
        <div className="progress">
          {credos.map((_, index) => (
            <div 
              key={index} 
              className={`progress-dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => {
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
        <button onClick={() => navigate('next')} className="nav-button next">&gt;</button>
      </div>
    </div>
  );
}

export default App;