import React from 'react';
import { FaApple, FaGooglePlay } from 'react-icons/fa';

export default function MobileApp() {
    return (
        <div className="mobile-app bg-dark text-white py-5" id='mobile-app'>
            <div className="container">
                <div className="row align-items-center">

                    <div className="col-12 text-center text-md-start">
                        <h2 className="fw-bold mb-3">Get Our Mobile App</h2>
                        <p className="mb-4">
                            Order your favorite food anytime, anywhere with our easy-to-use mobile app.
                            Enjoy exclusive deals and quick delivery at your fingertips!
                        </p>
                        <div className="d-flex flex-column flex-md-row align-items-center gap-3">
                            <a href="#"  className="btn btn-danger d-flex align-items-center gap-2" style={{ padding: '10px 20px', fontSize: '18px' }}>
                                <FaGooglePlay size={24} />
                                <span>Google Play</span>
                            </a>
                            <a href="#" className="btn btn-light text-danger d-flex align-items-center gap-2" style={{ padding: '10px 20px', fontSize: '18px' }}>
                                <FaApple size={24} />
                                <span>App Store</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
