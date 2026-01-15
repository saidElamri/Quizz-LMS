import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios';
import { Search, Filter, BookOpen, Video, FileText, Code, Globe, Github, Terminal, ArrowRight, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import './ResourcesPage.css';

const ResourcesPage = () => {
  const [resources, setResources] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Documentation', 'Video Tutorials', 'Cheat Sheets', 'Practice Problems', 'Tools & Libraries'];

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/resources');
        setResources(response.data);
      } catch (err) {
        console.error('Error fetching resources:', err);
      }
    };
    fetchResources();
  }, []);

  const filteredResources = resources.filter(resource => {
    const matchesCategory = selectedCategory === 'All' || resource.category === selectedCategory;
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryIcon = (cat) => {
    switch(cat) {
      case 'Documentation': return <FileText size={20} />;
      case 'Video Tutorials': return <Video size={20} />;
      case 'Cheat Sheets': return <Terminal size={20} />;
      case 'Practice Problems': return <Code size={20} />;
      case 'Tools & Libraries': return <Globe size={20} />;
      default: return <BookOpen size={20} />;
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <main className="elite-container" style={{ flex: 1, padding: 'var(--section-padding) 0 80px' }}>
        
        {/* Header Hero */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ marginBottom: 'clamp(40px, 8vw, 80px)', textAlign: 'center' }}
        >
          <div className="glass-v2" style={{ display: 'inline-flex', padding: '6px 16px', borderRadius: '40px', color: 'var(--fluid-primary)', fontWeight: 900, fontSize: '0.75rem', marginBottom: '24px', border: '1px solid var(--fluid-primary)' }}>
            INSTITUTIONAL_REPOSITORY
          </div>
          <h1 className="title-display" style={{ fontSize: 'var(--h1-size)' }}>Research <span className="text-fluid">Lab</span></h1>
          <p style={{ color: 'var(--ink-700)', fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', maxWidth: '700px', margin: '20px auto 0', fontWeight: 600 }}>
            Access our curated library of high-integrity learning modules and technical documentation.
          </p>
        </motion.div>

        {/* Filter Interaction Hub */}
        <div className="luxury-card glass-v2" style={{ padding: 'clamp(16px, 4vw, 24px)', marginBottom: 'clamp(40px, 8vw, 64px)', display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: '1 1 auto', minWidth: 'min(300px, 100%)' }}>
            <Search style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-400)' }} size={20} />
            <input 
              type="text" 
              placeholder="Query the lab database..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={styles.searchInput}
            />
          </div>
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px', maxWidth: '100%' }} className="no-scrollbar">
            {categories.map(cat => (
              <button 
                key={cat} 
                className={`cat-tab-elite ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
                style={{ position: 'relative' }}
              >
                {selectedCategory === cat && (
                  <motion.div 
                    layoutId="cat-bg"
                    style={{ position: 'absolute', inset: 0, background: 'var(--ink-900)', borderRadius: '50px', zIndex: 0 }}
                    transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                  />
                )}
                <span style={{ position: 'relative', zIndex: 1 }}>{cat}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Resource Grid */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(300px, 100%), 1fr))', gap: '24px' }}
        >
          {filteredResources.length > 0 ? (
            filteredResources.map((res, index) => (
              <motion.a 
                key={index} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                href={res.url} 
                target="_blank" 
                rel="noreferrer" 
                className="luxury-card resource-card-elite" 
                style={{ padding: 'var(--card-padding)' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                  <div style={{ width: '48px', height: '48px', background: '#f8fafc', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--fluid-primary)' }}>
                    {getCategoryIcon(res.category)}
                  </div>
                  <ExternalLink size={18} color="var(--ink-400)" />
                </div>
                <div>
                  <h3 style={{ margin: '0 0 12px 0', fontSize: '1.4rem' }}>{res.title}</h3>
                  <p style={{ color: 'var(--ink-700)', fontSize: '0.95rem', margin: 0, lineHeight: 1.7, minHeight: '60px' }}>{res.desc}</p>
                </div>
                <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid rgba(0,0,0,0.03)', display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--fluid-primary)', fontWeight: 900, fontSize: '0.8rem', letterSpacing: '0.05em' }}>
                  ACCESS RESOURCE <ArrowRight size={14} />
                </div>
              </motion.a>
            ))
          ) : (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px 0' }}>
              <div className="luxury-card" style={{ display: 'inline-block', padding: 'clamp(40px, 10vw, 80px) clamp(24px, 10vw, 100px)' }}>
                <Search size={48} style={{ opacity: 0.1, marginBottom: '24px' }} />
                <h3 style={{ fontSize: '1.5rem' }}>Query Null.</h3>
                <p style={{ color: 'var(--ink-700)', marginTop: '12px', fontSize: '0.9rem' }}>Try adjusting your search parameters.</p>
              </div>
            </div>
          )}
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

const styles = {
  searchInput: {
    width: '100%',
    padding: '12px 12px 12px 48px',
    borderRadius: '12px',
    border: '1px solid var(--border-light)',
    background: '#f8fafc',
    fontSize: '0.95rem',
    fontWeight: 600,
    outline: 'none',
    transition: 'all 0.2s',
  }
};

export default ResourcesPage;
