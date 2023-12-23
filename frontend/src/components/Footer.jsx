import React from 'react';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
    return (
        <div className="Container">
            <div className="Content">
                {/* Your main content goes here */}
            </div>
            <footer className="Footer">
                <div className="FooterContent">
                    <p>&copy; 2023 Velocida. All rights reserved.</p>
                    <p>
                        Created by <a className="name" href="https://www.linkedin.com/in/nicholasguarino/" target="_blank" rel="noopener noreferrer">Nicholas Guarino</a>
                    </p>
                    <div className="SocialIcons">
                        <a href="https://github.com/nguarino522" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faGithub} />
                        </a>
                        <a href="https://www.linkedin.com/in/nicholasguarino/" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faLinkedin} />
                        </a>
                        <a href="mailto:nguarino05@gmail.com">
                            <FontAwesomeIcon icon={faEnvelope} />
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;
