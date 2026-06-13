import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowLeft,
  ArrowRight,
  Award,
  BookOpen,
  Code2,
  ExternalLink,
  GitFork,
  Mail,
  MessageCircle,
  Menu,
  X,
} from 'lucide-react';
import './styles.css';

const projects = [
  {
    title: 'RoomIQ',
    slug: 'roomiq',
    category: 'Science Fair Project',
    year: '2026',
    image: '/assets/roomiq.svg',
    summary:
      'An engineering science fair project focused on room intelligence, sensing, and practical automation.',
    stack: ['Electrical engineering', 'Mechanical design', 'Robotics'],
    metrics: ['GSDSEF award', 'Senior Engineering', 'Project notebook'],
    notebook: '/assets/roomiq-notebook.pdf',
    notebookLabel: 'Open project notebook',
    overview:
      'RoomIQ is my science fair engineering project. It explores how a room can become more responsive through sensing, control logic, and a physical system designed around practical use.',
    build:
      'The project combined hardware thinking, mechanical constraints, and robotics-style iteration. I documented the design process, testing, and revisions in the attached project notebook.',
    reflection:
      'RoomIQ earned first award in the Senior Engineering: Electrical, Mechanical, and Robotics category at GSDSEF. The project taught me how much strong engineering depends on clear testing and careful documentation.',
  },
  {
    title: 'CCA RavenMUN Website',
    slug: 'cca-ravenmun-website',
    category: 'Web development',
    year: '2025',
    image: '/assets/ravenmun.png',
    summary:
      'A conference website coded from scratch for CCA Model UN, supporting committees, schedules, officers, and registration.',
    stack: ['Frontend', 'Responsive design', 'Content architecture'],
    metrics: ['Coded from scratch', 'Director of Technology', 'Conference site'],
    overview:
      'The CCA RavenMUN website is a full website for CCA Model UN. As Director of Technology, I built the site from scratch to present conference information clearly and give delegates a polished place to find key resources.',
    build:
      'The site includes sections for committees, schedule, position papers, officers, and registration. The design uses a dark visual system with strong imagery and clear navigation so conference details are easy to scan.',
    reflection:
      'This project was a chance to connect leadership with engineering. It required thinking beyond code: content structure, maintainability, and how students and delegates would actually use the site.',
  },
  {
    title: 'PhysicsSIM',
    slug: 'physicssim',
    category: 'Rigid body simulator',
    year: '2025',
    image: '/assets/physicssim.png',
    summary:
      'An interactive physics simulation workspace for building rigid body scenes with blocks, ramps, pulleys, strings, and force diagrams.',
    stack: ['Simulation UI', 'Physics modeling', 'Interactive tools'],
    metrics: ['Rigid bodies', 'Ramps and pulleys', 'Property editor'],
    overview:
      'PhysicsSIM is a rigid body simulator with an editor-style interface for placing objects, adjusting properties, and visualizing how a scene evolves over time.',
    build:
      'The interface includes a tool rail, simulation canvas, playback controls, and a properties panel for parameters like mass, friction, drag, velocity, gravity, and air density.',
    reflection:
      'This project pushed me to think about both correctness and usability. A simulator needs sensible physics, but it also needs controls that make experimentation feel immediate.',
  },
];

const awards = [
  {
    title: 'GSDSEF First Award',
    detail: 'First award in Senior Engineering: Electrical, Mechanical, and Robotics for RoomIQ.',
    year: '2026',
  },
  {
    title: 'Director of Technology',
    detail: 'Led technology work for CCA Model UN and built the RavenMUN website from scratch.',
    year: '2025',
  },
];

function usePath() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const onPopState = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = (href) => {
    window.history.pushState({}, '', href);
    setPath(window.location.pathname);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return [path, navigate];
}

function App() {
  const [path, navigate] = usePath();
  const selectedProject = useMemo(() => {
    const slug = path.split('/projects/')[1];
    return projects.find((project) => project.slug === slug);
  }, [path]);

  if (selectedProject) {
    return <ProjectPage project={selectedProject} navigate={navigate} />;
  }

  return <HomePage navigate={navigate} />;
}

function HomePage({ navigate }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  const handleHomeLink = (event, href) => {
    event.preventDefault();
    closeMenu();
    if (href === '/') {
      navigate('/');
      return;
    }
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="site-shell">
      <header className="profile-header" id="home">
        <a className="identity" href="/" onClick={(event) => handleHomeLink(event, '/')}>
          <span className="portrait" aria-hidden="true">
            SM
          </span>
          <span>
            <strong>Smaran Mukkavilli</strong>
            <small>Technical Portfolio & Blog</small>
          </span>
        </a>
        <button
          className="menu-button"
          type="button"
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((current) => !current)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <nav className={menuOpen ? 'nav nav-open' : 'nav'} aria-label="Primary navigation">
          <a href="#projects" onClick={(event) => handleHomeLink(event, '#projects')}>
            Projects
          </a>
          <a href="#about" onClick={(event) => handleHomeLink(event, '#about')}>
            About
          </a>
          <a href="#awards" onClick={(event) => handleHomeLink(event, '#awards')}>
            Awards
          </a>
        </nav>
        <div className="social-row" aria-label="Contact links">
          <a href="mailto:hello@example.com" aria-label="Email">
            <Mail size={22} />
          </a>
          <a href="https://github.com/" target="_blank" rel="noreferrer" aria-label="GitHub">
            <GitFork size={22} />
          </a>
          <a href="#notebook" aria-label="Notebook" onClick={(event) => handleHomeLink(event, '#notebook')}>
            <BookOpen size={22} />
          </a>
          <a href="mailto:hello@example.com" aria-label="Contact">
            <MessageCircle size={22} />
          </a>
        </div>
      </header>

      <section className="intro">
        <p>
          I&apos;m a high school student interested in computer science, engineering, and mathematics. 
        </p>

      </section>

      <section className="projects-section" id="projects">
        <div className="section-title-row">
          <h1>Projects</h1>
          <span>{projects.length} selected builds</span>
        </div>
        <div className="project-gallery">
          {projects.map((project) => (
            <article className="project-card" key={project.slug}>
              <a
                className="project-image-link"
                href={`/projects/${project.slug}`}
                onClick={(event) => {
                  event.preventDefault();
                  navigate(`/projects/${project.slug}`);
                }}
                aria-label={`Read more about ${project.title}`}
              >
                <img src={project.image} alt="" />
              </a>
              <div className="project-card-body">
                <div className="project-meta">
                  <span>{project.category}</span>
                  <span>{project.year}</span>
                </div>
                <h2>
                  <a
                    href={`/projects/${project.slug}`}
                    onClick={(event) => {
                      event.preventDefault();
                      navigate(`/projects/${project.slug}`);
                    }}
                  >
                    {project.title}
                  </a>
                </h2>
                <p>{project.summary}</p>
                <a
                  className="read-more"
                  href={`/projects/${project.slug}`}
                  onClick={(event) => {
                    event.preventDefault();
                    navigate(`/projects/${project.slug}`);
                  }}
                >
                  Read more <ArrowRight size={20} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="lower-grid" id="about">
        <div className="bio-panel">
          <Code2 size={28} />
          <h2>Bio</h2>
          <p>
            I&apos;m interested in software engineering, human-centered design, and technical
            writing. I enjoy projects with a real user or workflow behind them: research notebooks,
            lab tools, planning interfaces, and small systems that make complicated work easier.
          </p>
        </div>
        <div className="awards-panel" id="awards">
          <h2>Awards</h2>
          {awards.map((award) => (
            <article className="award-item" key={award.title}>
              <Award size={20} />
              <div>
                <span>{award.year}</span>
                <h3>{award.title}</h3>
                <p>{award.detail}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="notebook-band" id="notebook">
        <div>
          <span className="eyebrow">Notebook</span>
          <h2>RoomIQ has a full project notebook attached.</h2>
          <p>
            The notebook PDF is linked from the RoomIQ writeup so visitors can dig into the design
            process, testing, and documentation.
          </p>
        </div>
        <a href="/assets/roomiq-notebook.pdf" target="_blank" rel="noreferrer">
          Open notebook <BookOpen size={18} />
        </a>
      </section>
    </main>
  );
}

function ProjectPage({ project, navigate }) {
  return (
    <main className="project-page">
      <header className="project-page-header">
        <a
          className="back-link"
          href="/#projects"
          onClick={(event) => {
            event.preventDefault();
            navigate('/');
            requestAnimationFrame(() => {
              document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
            });
          }}
        >
          <ArrowLeft size={20} /> Back to projects
        </a>
      </header>

      <article className="project-writeup">
        <div className="writeup-heading">
          <span className="eyebrow">{project.category}</span>
          <h1>
            Project Writeup:
            <span>{project.title}</span>
          </h1>
          <p>{project.summary}</p>
        </div>

        <img className="writeup-hero-image" src={project.image} alt="" />

        <div className="writeup-content">
          <aside className="project-facts">
            <div>
              <span>Year</span>
              <strong>{project.year}</strong>
            </div>
            <div>
              <span>Stack</span>
              <strong>{project.stack.join(', ')}</strong>
            </div>
            <div>
              <span>Highlights</span>
              <strong>{project.metrics.join(', ')}</strong>
            </div>
            {project.notebook ? (
              <a href={project.notebook} target="_blank" rel="noreferrer">
                {project.notebookLabel} <ExternalLink size={16} />
              </a>
            ) : (
              <a href="https://github.com/" target="_blank" rel="noreferrer">
                View code <ExternalLink size={16} />
              </a>
            )}
          </aside>

          <div className="writeup-sections">
            <section>
              <h2>Overview</h2>
              <p>{project.overview}</p>
            </section>
            <section>
              <h2>Build Details</h2>
              <p>{project.build}</p>
            </section>
            <section>
              <h2>Reflection</h2>
              <p>{project.reflection}</p>
            </section>
          </div>
        </div>
      </article>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);