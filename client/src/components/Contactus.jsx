import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';

export default function ContactUs() {
  return (
    <>
    <hr style={{ height: "2px", backgroundColor: "#000", border: "none", margin: "15px 20px" }}/>
    <div className="contact-us py-5" id='contact-us'>
      <h2 className="text-center mb-4">Contact Us</h2>
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-6">
            <form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" id="name" placeholder="Your Name" />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label> 
                <input type="email" className="form-control" id="email" placeholder="Your Email" />
              </div>
              <div className="mb-3">
                <label htmlFor="message" className="form-label">Message</label>
                <textarea className="form-control" id="message" rows="6" placeholder="Your Message"></textarea>
              </div>
              <button type="submit" className="btn btn-danger">Send Message</button>
            </form>
          </div>
          <div className="col-12 col-md-6 text-center d-flex flex-column justify-content-center">
            <p className="fw-bold">Follow us on social media:</p>
            <div className="d-flex justify-content-center gap-4">
              <a href="#" target="_blank"  className="text-danger">
                <FaFacebook size={32} />
              </a>
              <a href="#"  rel="noopener noreferrer" className="text-danger">
                <FaInstagram size={32} />
              </a>
              <a href="#"  rel="noopener noreferrer" className="text-danger">
                <FaTwitter size={32} />
              </a>
              <a href="#"  rel="noopener noreferrer" className="text-danger">
                <FaLinkedin size={32} />
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
    </>
  );
}
