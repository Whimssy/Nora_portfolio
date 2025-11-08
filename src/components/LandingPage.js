import React, { useEffect, useRef, useState } from 'react';
import './LandingPage.css';

const LandingPage = () => {
  const heroRef = useRef(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const modalRef = useRef(null);
  const servicesRef = useRef([]);
  const portfolioRef = useRef([]);
  const testimonialsRef = useRef([]);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    // Animate hero on mount
    if (heroRef.current) {
      heroRef.current.classList.add('animate-in');
    }

    // Animate elements on scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    [...servicesRef.current, ...portfolioRef.current, ...testimonialsRef.current].forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      [...servicesRef.current, ...portfolioRef.current, ...testimonialsRef.current].forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  // Track active section on scroll
  useEffect(() => {
    const sections = [
      { id: 'home', index: 0 },
      { id: 'services', index: 1 },
      { id: 'portfolio', index: 2 },
      { id: 'testimonials', index: 3 }
    ];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id);
        if (section) {
          const sectionTop = section.offsetTop;
          if (scrollPosition >= sectionTop) {
            setActiveSection(sections[i].index);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once on mount

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedRole) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedRole]);

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && selectedRole) {
        setSelectedRole(null);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [selectedRole]);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target) && selectedRole) {
        setSelectedRole(null);
      }
    };
    if (selectedRole) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [selectedRole]);

  const services = [
    {
      title: 'Vector Design',
      icon: '🎨',
      description: 'Creating precise geometric designs and vector graphics',
      color: '#FF6B6B',
      details: 'I specialize in creating precise geometric designs and vector graphics that communicate complex ideas with clarity and elegance. My vector work combines mathematical precision with artistic expression, resulting in scalable designs that maintain their quality at any size. From logos to illustrations, I transform concepts into clean, professional vector artwork.'
    },
    {
      title: 'Solution Architecture',
      icon: '🏗️',
      description: 'Designing elegant systems and scalable solutions',
      color: '#4ECDC4',
      details: 'As a Solution Architect, I design comprehensive systems that address complex challenges. I analyze requirements, identify patterns, and create scalable architectures that stand the test of time. My approach combines technical expertise with creative problem-solving, ensuring that every solution is both functional and innovative.'
    },
    {
      title: 'Visual Taxonomy',
      icon: '📊',
      description: 'Organizing information into meaningful hierarchies',
      color: '#95E1D3',
      details: 'I create order from chaos by organizing visual elements, information, and design components into logical, meaningful hierarchies. My work ensures that complex systems remain navigable and intuitive, making information accessible and experiences delightful through thoughtful classification and structure.'
    },
    {
      title: 'Design Philosophy',
      icon: '✨',
      description: 'Exploring the deeper meaning behind design decisions',
      color: '#F38181',
      details: 'I explore the deeper meaning behind every design decision, questioning the why behind each element and considering the philosophical implications of visual choices. My work goes beyond aesthetics to examine how design shapes perception, influences behavior, and communicates values in our digital world.'
    },
    {
      title: 'UI/UX Design',
      icon: '💻',
      description: 'Creating intuitive and beautiful user experiences',
      color: '#667eea',
      details: 'I create intuitive and beautiful user experiences that delight users while solving real problems. My UI/UX work focuses on understanding user needs, creating seamless interactions, and designing interfaces that are both aesthetically pleasing and highly functional. Every design decision is made with the user in mind.'
    },
    {
      title: 'Creative Consulting',
      icon: '💡',
      description: 'Strategic guidance for creative projects',
      color: '#f093fb',
      details: 'I provide strategic guidance for creative projects, helping clients navigate the intersection of design, technology, and business. My consulting approach combines creative vision with practical insights, ensuring that projects not only look great but also achieve their business objectives and resonate with their target audience.'
    }
  ];

  const portfolio = [
    {
      title: 'Vector Oriented Design',
      icon: '🎨',
      description: 'Crafting visual narratives through geometric precision and creative expression. Explore my portfolio of vector-based designs that communicate complex ideas with elegance.',
      color: '#FFD700'
    },
    {
      title: 'Solution Architecture',
      icon: '🏗️',
      description: 'Designing elegant systems and structures that solve complex problems. View my architectural solutions that combine technical expertise with creative problem-solving.',
      color: '#FFD700'
    },
    {
      title: 'Visual Taxonomy',
      icon: '📊',
      description: 'Organizing and categorizing visual elements into meaningful hierarchies. Discover how I create order from chaos through thoughtful classification.',
      color: '#FFD700'
    },
    {
      title: 'Pixel Philosophy',
      icon: '✨',
      description: 'Exploring the deeper meaning and philosophy behind every pixel and design decision. See how I examine how design shapes perception and influences behavior.',
      color: '#FFD700'
    },
    {
      title: 'UI/UX Projects',
      icon: '💻',
      description: 'Creating intuitive user interfaces that delight users. Browse through my collection of user-centered design projects.',
      color: '#FFD700'
    },
    {
      title: 'Creative Concepts',
      icon: '💡',
      description: 'Want your stunning designs? Let\'s collaborate and bring your vision to life with innovative design solutions.',
      isCTA: true
    }
  ];

  const testimonials = [
    {
      quote: 'Norah is an exceptional designer who brings a unique perspective to every project. Her ability to combine technical precision with creative expression is unmatched.',
      author: 'Sarah Johnson',
      role: 'Creative Director'
    },
    {
      quote: 'Working with Norah was a delight. She understands the deeper meaning behind design decisions and creates solutions that are both beautiful and functional.',
      author: 'Michael Chen',
      role: 'Product Manager'
    },
    {
      quote: 'Norah\'s approach to visual taxonomy and solution architecture has transformed how we think about design. Her work is both innovative and practical.',
      author: 'Emily Rodriguez',
      role: 'UX Lead'
    }
  ];

  const openModal = (item) => {
    setSelectedRole(item);
  };

  const closeModal = () => {
    setSelectedRole(null);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const sections = ['home', 'services', 'portfolio', 'testimonials'];

  const scrollToSectionByIndex = (index) => {
    scrollToSection(sections[index]);
  };

  return (
    <div className="landing-page">
      {/* Animated Background */}
      <div className="animated-background">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>

      {/* Header */}
      <header className="header">
        <div className="header-container">
          <div className="logo">NJR.</div>
          <nav className="nav">
            <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>Home</a>
            <a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection('services'); }}>Services</a>
            <a href="#portfolio" onClick={(e) => { e.preventDefault(); scrollToSection('portfolio'); }}>portfolio</a>
            <a href="#testimonials" onClick={(e) => { e.preventDefault(); scrollToSection('testimonials'); }}>Testimonials</a>
          </nav>
          <button className="cta-button header-cta">Let's Talk</button>
        </div>
      </header>

      {/* Hero Section - Split Layout */}
      <section id="home" className="hero-section" ref={heroRef}>
        <div className="hero-split-container">
          {/* Left Panel */}
          <div className="hero-left-panel">
            <div className="hero-left-content">
              <div className="hero-subtitle">CREATIVE PROFESSIONAL</div>
              <div className="hero-main-title">
                <h1 className="hero-name-part">NORAH</h1>
                <h1 className="hero-name-part">JEPCHIRCHIR</h1>
                <h1 className="hero-name-part">RUTTO</h1>
              </div>
              <p className="hero-description">
                A multidisciplinary creative professional specializing in vector design, 
                solution architecture, visual taxonomy, and design philosophy. 
                Transforming ideas into elegant visual solutions.
              </p>
              <button className="hero-cta-button">EXPLORE WORK</button>
            </div>
          </div>

          {/* Right Panel */}
          <div className="hero-right-panel">
            <div className="hero-right-content">
              <div className="hero-large-text">CREATIVE</div>
              <div className="hero-roles-list">
                <div className="hero-role-item">Vector Oriented</div>
                <div className="hero-role-item">Solution Architect</div>
                <div className="hero-role-item">Visual Taxonomist</div>
                <div className="hero-role-item">Pixel Philosopher</div>
              </div>
            </div>
            <div className="hero-scroll-indicator">
              <div className="scroll-dot active"></div>
              <div className="scroll-dot"></div>
              <div className="scroll-dot"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services-section">
        <h2 className="section-title">Services</h2>
        <p className="section-subtitle">Here are the services we are providing to you.</p>
        <div className="services-grid">
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card"
              ref={(el) => (servicesRef.current[index] = el)}
              onClick={() => openModal(service)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  openModal(service);
                }
              }}
            >
              <div className="service-icon">{service.icon}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              <div className="service-card-hint">Click to learn more</div>
            </div>
          ))}
        </div>
      </section>

      {/* Transition Section */}
      <section className="transition-section">
        <div className="transition-content">
          <h2 className="transition-title">HEY, I'M NORAH, A CREATIVE VECTOR ORIENTED PERSON, SOLUTION ARCHITECT, VISUAL TAXONOMIST AND PIXEL PHILOSOPHER.</h2>
          <div className="transition-keywords">
            <span className="keyword"><span className="keyword-asterisk">*</span> Designer</span>
            <span className="keyword"><span className="keyword-asterisk">*</span> Architect</span>
            <span className="keyword"><span className="keyword-asterisk">*</span> Taxonomist</span>
            <span className="keyword"><span className="keyword-asterisk">*</span> Philosopher</span>
          </div>
        </div>
      </section>

      {/* portfolio Section */}
      <section id="portfolio" className="portfolio-section">
        <div className="section-container">
          <h2 className="section-title">
            portfolio.
            <span className="title-underline"></span>
          </h2>
          <p className="section-subtitle">Click on the cards to see my portfolio of related category.</p>
          <div className="portfolio-grid">
            {portfolio.map((portfolio, index) => (
              <div
                key={index}
                className={`portfolio-card ${portfolio.isCTA ? 'portfolio-cta' : ''}`}
                ref={(el) => (portfolioRef.current[index] = el)}
                onClick={() => !portfolio.isCTA && openModal(portfolio)}
                role={portfolio.isCTA ? undefined : "button"}
                tabIndex={portfolio.isCTA ? undefined : 0}
                onKeyDown={(e) => {
                  if (!portfolio.isCTA && (e.key === 'Enter' || e.key === ' ')) {
                    e.preventDefault();
                    openModal(portfolio);
                  }
                }}
              >
                <div className="portfolio-icon">{portfolio.icon}</div>
                <h3 className="portfolio-title">{portfolio.title}</h3>
                <p className="portfolio-description">{portfolio.description}</p>
                {portfolio.isCTA && (
                  <button className="btn-primary portfolio-cta-button">Let's Talk</button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="testimonials-section">
        <div className="section-container">
          <h2 className="section-title">
            Testimonials
            <span className="title-underline"></span>
          </h2>
          <p className="section-subtitle">Here are some testimonials from our clients.</p>
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="testimonial-card"
                ref={(el) => (testimonialsRef.current[index] = el)}
              >
                <div className="testimonial-avatar">
                  <div className="avatar-icon">{testimonial.author.charAt(0)}</div>
                </div>
                <div className="testimonial-quote">
                  <span className="quote-mark quote-open">"</span>
                  <p>{testimonial.quote}</p>
                  <span className="quote-mark quote-close">"</span>
                </div>
                <div className="testimonial-author">
                  <strong>{testimonial.author}</strong>
                  <span className="testimonial-role">{testimonial.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedRole && (
        <div className="modal-overlay" onClick={closeModal}>
          <div
            className="modal-content"
            ref={modalRef}
            onClick={(e) => e.stopPropagation()}
            style={{ '--accent-color': selectedRole.color || '#FFD700' }}
          >
            <button className="modal-close" onClick={closeModal} aria-label="Close modal">
              <span>×</span>
            </button>
            <div className="modal-header">
              <div className="modal-icon">{selectedRole.icon}</div>
              <h2 className="modal-title">{selectedRole.title}</h2>
            </div>
            <div className="modal-body">
              <p className="modal-description">{selectedRole.description}</p>
              {selectedRole.details && <p className="modal-details">{selectedRole.details}</p>}
            </div>
          </div>
        </div>
      )}

      {/* Sticky Page Indicator */}
      <div className="page-indicator">
        {sections.map((section, index) => (
          <div
            key={section}
            className={`page-dot ${activeSection === index ? 'active' : ''}`}
            onClick={() => scrollToSectionByIndex(index)}
            role="button"
            tabIndex={0}
            aria-label={`Go to ${section} section`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                scrollToSectionByIndex(index);
              }
            }}
          >
            <span className="page-dot-tooltip">{section}</span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} Norah Jepchirchir Rutto</p>
        <p className="footer-tagline">Crafting digital experiences with purpose</p>
      </footer>
    </div>
  );
};

export default LandingPage;
