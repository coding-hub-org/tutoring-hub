import React, { Component } from "react";
import "./style.scss";

import LogoImage from "../../Assets/coding_hub_ic.svg";

import Github from "../../Assets/github_ic.svg";
import Gmail from "../../Assets/gmail_ic.svg";
import Instagram from "../../Assets/codepen_ic.svg";
import LinkedIn from "../../Assets/linkedin_ic.svg";

class Footer extends Component {
	render() {
		return (
			<div className="footer-component">
				<div className="footer-component--wrapper">
					<div className="footer-component--wrapper__top">
						<div className="footer-component--wrapper__top--logo">
							<img src={LogoImage} alt="Coding hub logo" />
							<p>Coding Hub</p>
						</div>
						<div className="footer-component--wrapper__top--navigation">
							<div className="footer-navigation-item">
								<a href="https://www.coding-hub.com#about">ABOUT</a>
							</div>
							<div className="footer-navigation-item">
								<a href="https://www.coding-hub.com#services">SERVICES</a>
							</div>
							<div className="footer-navigation-item">
								<a href="https://www.coding-hub.com#team">TEAM</a>
							</div>
							<div className="footer-navigation-item">
								<a href="https://www.coding-hub.com/#projects">PROJECTS</a>
							</div>
							<div className="footer-navigation-item">
								<a href="https://www.coding-hub.com/#contact">CONTACT US</a>
							</div>
						</div>
						<div className="footer-component--wrapper__top--social">
							<a href="mailto:psu-coders@gmail.com">
								<img src={Gmail} alt="" />
							</a>
							<a href="https://github.com/PSUCoders">
								<img src={Github} alt="Github logo" />
							</a>
							<a href="https://www.linkedin.com/company/coding-hub-suny-plattsburgh/about/">
								<img src={LinkedIn} alt="Linkedin logo" />
							</a>
							<a href="https://www.instagram.com/codinghub_plattsburgh/">
								<img src={Instagram} alt="Instagram logo" />
							</a>
						</div>
					</div>
					<div className="footer-component--wrapper__bottom">
						<span className="copyright">
							&copy; 2019 Coding Hub All Rights Reserved
						</span>
					</div>
				</div>
			</div>
		);
	}
}

export default Footer;
