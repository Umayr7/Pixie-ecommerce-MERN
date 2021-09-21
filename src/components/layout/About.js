import React, { Fragment } from 'react'

export const About = () => {
    return (
        <Fragment>
            <div className="featured-page">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 col-sm-12">
                            <div className="section-heading">
                                <div className="line-dec"></div>
                                <h1>About This App</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="featured container no-gutter">
                <div className="row">
                    <div className="item new col-md-4">
                        <div className="featured-item">
                            <strong>Version: </strong> 1.0.0
                        </div>
                    </div>
                    <div className="item new col-md-4">
                        <div className="featured-item">
                            <strong> About: </strong> This is a full stack MERN APP for Ecommerce Store
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}