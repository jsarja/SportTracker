import React from 'react';
import './Footer.css';

function Footer() {
	return (
		<footer>
			<div className="row">
				<div id="main-footer">
					<p id="app-name">SportTracker</p>
					<p id="copyright">
						Copyright © 2019 Janne Sarja
					</p>
				</div>
				<div id="contact-info">
					<p className="mb-0">sarja.janne@gmail.com</p>
					<a 
						href="https://github.com/jsarja" 
						target="_blank" 
						rel="noopener noreferrer"
					>
						<i className="fab fa-github-square"></i>
					</a>
					<a 
						href="https://www.linkedin.com/in/janne-sarja-29bb22155" 
						target="_blank"
						rel="noopener noreferrer"
					>
						<i className="fab fa-linkedin"></i>
					</a>
				</div>
			</div>
		</footer>
	);
}

export default Footer;