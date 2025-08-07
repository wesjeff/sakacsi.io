import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import './About.css';

export default function About() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [currentImageIndexes, setCurrentImageIndexes] = useState({});
  const sectionsRef = useRef([]);
  const containerRef = useRef(null);

  // Wrap aboutData in useMemo to prevent recreation on every render
  const aboutData = useMemo(() => [
    {
      id: 'me',
      title: 'About Me',
      description: `Hello! I'm Zac`,
      images: [
        { src: 'gte.jpg', alt: 'Zachary Sakacsi - Professional Photo' },
        { src: '/awsccp.png', alt: 'AWS Certification' },
        { src: '/fsu.png', alt: 'Additional Certification' },
      ]
    },
    {
      id: 'cat1',
      title: 'Meet Sunshine',
      description: `She is really chubby`,
      images: [
        { src: '/sunshine6.jpg', alt: 'Sunshine the Calico Cat - Portrait' },
        { src: '/sunshine1.jpg', alt: 'Sunshine the Calico Cat - Relaxing' },
        { src: '/sunshine2.jpg', alt: 'Sunshine the Calico Cat - Playing' },
        { src: '/sunshine3.jpg', alt: 'Sunshine the Calico Cat - Portrait' },
        { src: '/sunshine4.jpg', alt: 'Sunshine the Calico Cat - Relaxing' },
        { src: '/sunshine5.jpg', alt: 'Sunshine the Calico Cat - Playing' },
        { src: '/sunshine7.jpg', alt: 'Sunshine the Calico Cat - Playing' }
      ]
    },
    {
      id: 'cat2',
      title: 'Meet Opie',
      description: `Opie is a tripawd, he has 3 legs.`,
      images: [
        { src: '/opie4.jpg', alt: 'Opie the Black Cat - Portrait' },
        { src: '/opie1.jpg', alt: 'Opie the Black Cat - Exploring' },
        { src: '/opie2.jpg', alt: 'Opie the Black Cat - Exploring' },
        { src: '/opie3.jpg', alt: 'Opie the Black Cat - Mischievous' },
        { src: '/opie5.jpg', alt: 'Opie the Black Cat - Mischievous' }
      ]
    },
    {
      id: 'cat3',
      title: 'Meet Otis',
      description: `Otis is strange`,
      images: [
        { src: '/otis2.jpg', alt: 'Otis the Orange Tabby - Portrait' },
        { src: '/otis1.jpg', alt: 'Otis the Orange Tabby - Sleeping' },
        { src: '/otis3.jpg', alt: 'Otis the Orange Tabby - Gentle Giant' },
        { src: '/otis4.jpg', alt: 'Otis the Orange Tabby - Portrait' },
        { src: '/otis5.jpg', alt: 'Otis the Orange Tabby - Sleeping' },
        { src: '/otis6.jpg', alt: 'Otis the Orange Tabby - Portrait' },
        { src: '/otis7.jpg', alt: 'Otis the Orange Tabby - Sleeping' },
        { src: '/otis8.jpg', alt: 'Otis the Orange Tabby - Portrait' }
      ]
    }
  ], []); // Empty dependency array since this data never changes

  // Initialize image indexes and data on mount
  useEffect(() => {
    const initialIndexes = {};
    aboutData.forEach(section => {
      initialIndexes[section.id] = 0;
    });
    setCurrentImageIndexes(initialIndexes);
    
    // Force scroll to top and then set loaded state
    window.scrollTo(0, 0);
    
    // Use requestAnimationFrame to ensure DOM is ready before setting loaded
    requestAnimationFrame(() => {
      setIsLoaded(true);
    });
  }, [aboutData]);

  // Additional effect to handle scroll position after component mounts
  useEffect(() => {
    // Ensure we're at the top when component mounts
    const scrollToTop = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    // Call immediately
    scrollToTop();

    // Also call after a brief delay to handle any async loading
    const timeoutId = setTimeout(scrollToTop, 100);

    return () => clearTimeout(timeoutId);
  }, []);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionIndex = parseInt(entry.target.dataset.index, 10);
            setVisibleSections(prev => new Set([...prev, sectionIndex]));
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px' }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [isLoaded]); // Add isLoaded as dependency to ensure this runs after loading

  // Fixed image navigation function
  const handleImageNavigation = useCallback((sectionId, direction) => {
    setCurrentImageIndexes(prev => {
      const section = aboutData.find(s => s.id === sectionId);
      if (!section) return prev;
      
      const currentIndex = prev[sectionId] || 0;
      let newIndex;
      
      if (direction === 'next') {
        newIndex = (currentIndex + 1) % section.images.length;
      } else {
        newIndex = currentIndex === 0 ? section.images.length - 1 : currentIndex - 1;
      }
      
      return { ...prev, [sectionId]: newIndex };
    });
  }, [aboutData]);

  // Fixed dot click handler
  const handleDotClick = useCallback((sectionId, imageIndex) => {
    setCurrentImageIndexes(prev => ({ ...prev, [sectionId]: imageIndex }));
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`about-container ${isLoaded ? 'loaded' : ''}`}
    >
      <div className="about-content">
        {aboutData.map((section, index) => (
          <div
            key={section.id}
            ref={(el) => (sectionsRef.current[index] = el)}
            data-index={index}
            className={`about-section ${index % 2 === 0 ? 'image-right' : 'image-left'} ${
              visibleSections.has(index) ? 'visible' : ''
            }`}
          >
            <div className="section-content">
              <div className="text-content">
                <h2 className="section-title">{section.title}</h2>
                <div className="section-description">
                  {section.description.split('\n\n').map((paragraph, pIndex) => (
                    <p key={pIndex} className="description-paragraph">
                      {paragraph.trim()}
                    </p>
                  ))}
                </div>
              </div>
              <div className="image-content">
                <div className="image-carousel">
                  {section.images.length > 1 && (
                    <button 
                      className="carousel-arrow carousel-arrow-left"
                      onClick={() => handleImageNavigation(section.id, 'prev')}
                      aria-label="Previous image"
                    >
                      ‹
                    </button>
                  )}
                  
                  <div className="image-wrapper">
                    <div className="image-stack">
                      {section.images.map((image, imgIndex) => {
                        const currentIndex = currentImageIndexes[section.id] || 0;
                        const isActive = imgIndex === currentIndex;
                        
                        return (
                          <img 
                            key={imgIndex}
                            src={image.src} 
                            alt={image.alt}
                            className={`section-image ${isActive ? 'active' : ''}`}
                            loading="lazy"
                            onError={(e) => {
                              console.warn(`Failed to load image: ${image.src}`);
                              e.target.style.display = 'none';
                            }}
                          />
                        );
                      })}
                    </div>
                    {section.images.length > 1 && (
                      <div className="image-dots">
                        {section.images.map((_, dotIndex) => (
                          <button
                            key={dotIndex}
                            className={`image-dot ${dotIndex === (currentImageIndexes[section.id] || 0) ? 'active' : ''}`}
                            onClick={() => handleDotClick(section.id, dotIndex)}
                            aria-label={`Go to image ${dotIndex + 1}`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {section.images.length > 1 && (
                    <button 
                      className="carousel-arrow carousel-arrow-right"
                      onClick={() => handleImageNavigation(section.id, 'next')}
                      aria-label="Next image"
                    >
                      ›
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}