import React from 'react'

export const Footer = () => {
    return (
        <div className="footer">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="logo">
                            <img src="/images/header-logo.png" alt="" />
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="footer-menu">
                            <ul>
                                <li><a href="/">Home</a></li>
                                {/* <li><a href="#">Help</a></li>
                                <li><a href="#">Privacy Policy</a></li>
                                <li><a href="#">How It Works ?</a></li>
                                <li><a href="#">Contact Us</a></li> */}
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="social-icons">
                            <ul>
                                <li><a href="https://facebook.com/"><i className="fa fa-facebook"></i></a></li>
                                <li><a href="https://twitter.com/"><i className="fa fa-twitter"></i></a></li>
                                <li><a href="https://linkedin.com/"><i className="fa fa-linkedin"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
