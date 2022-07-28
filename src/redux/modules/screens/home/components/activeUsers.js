import React, { Component } from 'react';
import ContentLoader from '../../../../../commons/components/contentLoader';

class ActiveUsers extends Component {
    render() {
        const { stats } = this.props;
        return stats !== 404 ? (
            <React.Fragment>
                {
                    (stats.onlineUsers || stats.lastWeekTotalUser) && <div className="online-user-wrap">
                        {
                            stats && stats.onlineUsers && <div className="card-info online-user-info">
                                <div className="title ">
                                    <h2 className="card-title animated slideInUpLess"><span># of Users Online</span></h2>
                                </div>
                                <div className="card-outer">
                                    <div className="wcard animated slideInUpLess">
                                        <div className="online-users">
                                            <div className="users-icon"><i className="icon pp-users2"></i></div>
                                            <div className="online-user-detail">
                                                <div className="users-counter"><span>{stats.onlineUsers}</span></div>
                                                <div className="user-title"><span>USERS ONLINE</span></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }

                        {
                            stats && stats.lastWeekTotalUser && <div className="card-info online-user-info">
                                <div className="title">
                                    <h2 className="card-title animated slideInUpLess"><span># of Users Last Week</span></h2>
                                </div>
                                <div className="card-outer">
                                    <div className="wcard animated slideInUpLess">
                                        <div className="online-users">
                                            <div className="users-icon"><i className="icon pp-users2"></i></div>
                                            <div className="online-user-detail">
                                                <div className="users-counter"><span>{stats.lastWeekTotalUser}</span></div>
                                                <div className="user-title"><span>WEEKLY USERS</span></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }

                    </div>
                }


            </React.Fragment>

        ) : null;
    }
}

export default ActiveUsers;