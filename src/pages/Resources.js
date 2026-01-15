import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './ResourcesPage.css'; // Link to external stylesheet for better styling control

const ResourcesPage = () => {
    const [resources, setResources] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    // Categories for filtering
    const categories = ['All', 'Documentation', 'Video Tutorials', 'Cheat Sheets', 'Practice Problems', 'Community Resources', 'Tools & Libraries'];

    // Simulating fetching data from an API
    useEffect(() => {
        const fetchedResources = [
            { title: 'JavaScript Documentation - MDN', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript', category: 'Documentation' },
            { title: 'React Documentation', url: 'https://reactjs.org/docs/getting-started.html', category: 'Documentation' },
            { title: 'CSS Tricks - Guides and Tutorials', url: 'https://css-tricks.com/', category: 'Documentation' },
            { title: 'JavaScript Cheat Sheet', url: '/downloads/javascript-cheat-sheet.pdf', category: 'Cheat Sheets' },
            { title: 'Git Commands Cheat Sheet', url: 'https://www.cheatography.com/davechild/cheat-sheets/git/', category: 'Cheat Sheets' },
            { title: 'React.js Tutorial', url: 'https://www.youtube.com/embed/dGcsHMXbSOA', category: 'Video Tutorials' },
            { title: 'LeetCode', url: 'https://leetcode.com/', category: 'Practice Problems' },
            { title: 'HackerRank', url: 'https://www.hackerrank.com/', category: 'Practice Problems' },
            { title: 'CodeWars', url: 'https://www.codewars.com/', category: 'Practice Problems' },
            { title: 'Stack Overflow', url: 'https://stackoverflow.com/', category: 'Community Resources' },
            { title: 'Discord - Learn Programming', url: 'https://discord.com/invite/learnprogramming', category: 'Community Resources' },
            { title: 'Visual Studio Code', url: 'https://code.visualstudio.com/', category: 'Tools & Libraries' },
            { title: 'GitHub', url: 'https://github.com/', category: 'Tools & Libraries' }
        ];

        setResources(fetchedResources);
    }, []);

    // Filter resources based on search term and selected category
    const filteredResources = resources.filter(resource => {
        const matchesCategory = selectedCategory === 'All' || resource.category === selectedCategory;
        const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
      <>
        <Header />
        <div className="resources-page">
            <div className="resources-header">
                <h1>Resources</h1>

                {/* Search Bar */}
                <input
                    type="text"
                    placeholder="Search resources..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-bar"
                />

                {/* Category Filter */}
                <div className="category-filter">
                    <label htmlFor="category">Filter by Category:</label>
                    <select
                        id="category"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        {categories.map((category, index) => (
                            <option key={index} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Render Filtered Resources */}
            <section id="learning-materials" className="resource-list">
                <h2>Filtered Resources</h2>
                {filteredResources.length > 0 ? (
                    <ul>
                        {filteredResources.map((resource, index) => (
                            <li key={index}>
                                <a href={resource.url} target="_blank" rel="noreferrer">{resource.title}</a> <span>({resource.category})</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No resources found.</p>
                )}
            </section>

            {/* Video Tutorials Section */}
            <section id="video-tutorials">
                <h2>Video Tutorials</h2>
                <div className="video-container">
                    <iframe
                        src="https://www.youtube.com/embed/dGcsHMXbSOA"
                        title="React.js Tutorial"
                        allowFullScreen
                    ></iframe>
                </div>
            </section>

            {/* Other sections */}
            <section id="code-examples">
                <h2>Code Examples & Sandboxes</h2>
                <iframe
                    title="Code Example"
                    src="https://codepen.io/pen/embed/"
                    allowFullScreen
                ></iframe>
            </section>

            <section id="glossary">
                <h2>Glossary</h2>
                <p>A list of key terms related to web development and coding will go here.</p>
            </section>

            <section id="project-ideas">
                <h2>Project Ideas</h2>
                <p>Here are some project ideas you can work on to solidify your knowledge.</p>
            </section>

            <section id="career-development">
                <h2>Career Development</h2>
                <p>Resources to help with building a portfolio, resume, and interview preparation.</p>
            </section>
        </div>
        <Footer />
      </>
    );
};

export default ResourcesPage;
