import React from 'react'

export const Pagination = ({ productsPerPage, totalProducts, paginate }) => {

    const pageNumbers=[];
    
    for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <ul>
                                {pageNumbers.map(number => (
                                    <li>
                                        <button className="btn btn-primary" onClick={() => paginate(number)} href="#">{number}</button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
    )
}
