import React, { useContext } from 'react'

import AlertContext from '../../context/alert/alertContext';

export const Alert = () => {
    const alertContext = useContext(AlertContext);

    const { alerts } = alertContext;

    return (
        alerts.length > 0 &&
            alerts.map(alert => (
                <div className="row">
                    <div className="col-md-12">
                        <div className="section-heading">
                            <div key={alert.id} className={`alert alert-${alert.type}`}>
                                <i className="fas fa-info-circle" /> {alert.msg}
                            </div>
                        </div>
                    </div>
                </div>
            ))
    )
}
