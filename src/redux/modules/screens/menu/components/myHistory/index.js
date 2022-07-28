import React from 'react';
import 'react-perfect-scrollbar/dist/css/styles.css';
import ContentLoader from "../../../../../../commons/components/contentLoader";
import HGHistory from './hg/index';
import HTSHistory from './hts/index';
import MGHistory from './mgi/index';
import TriviaHistory from './trivia/index';
import HeadersHistory from './headers/index';
import PuckLuckHistory from './puckluck/index';
import BaseballBashHistory from './bbbash/index';

class MyHistory extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            gameType: 'hg',
        };
    }

    handleSelectChange(event) {
        this.setState({ gameType: event.target.value });
        this.props.groupsApi(event.target.value);
    }

    componentDidMount() {
        this.props.groupsApi(this.state.gameType);
    }

    render() {
        let self = this;

        const { myHistory, closePopup, userInfo, currentOrientation, handleTracking } = this.props;
        const { data, loader, winPrice } = myHistory;

        // console.log(this.props, "data");
        const { gameType } = this.state;
        const _onClosePopup = closePopup.bind(this, 'my history');
        return (
            <div className="modal-widget-wrap my-history-modal-wrap" style={{ display: "block" }}>
                {/* Prizes MODAL START */}
                <div className="modal my-history-modal slide-modal">
                    <div className="modal-contenier">
                        <div className="modal-outer">
                            <div className="modal-head slide-modal-head animated slideInUpLess">
                                <h2 className="modal-head-title"><a onClick={closePopup} className="icon pp-arrow-left2 modal-close"></a><span className="head-title-label">My History</span></h2>
                            </div>
                            <div className="modal-body">
                                <div className="popup-info my-history-modal-info">
                                    <div className="block scroll-modal-content">
                                        <div className="history-tabs-container content-tabs">
                                            <div className="select-game">
                                                <div className="select-dropdown animated slideInUpLess">
                                                    <select className="form-control" onChange={this.handleSelectChange.bind(this)} value={this.state.gameType}>
                                                        <option value="hg">Hoops Galore Indoor</option>
                                                        <option value="hgo">Hoops Galore Outdoor</option>
                                                        <option value="trivia">Trivia</option>
                                                        <option value="puckluck">Puck Luck</option>
                                                        <option value="bbbash">Baseball Bash</option>
                                                    
                                                        {/* <option value="hts">Hit The Spot</option>
                                                        <option value="mgi">Mini Golf</option>
                                                        <option value="trivia">Trivia</option>
                                                        <option value="hg">Hoops Galore Indoor</option>
                                                        <option value="hgo">Hoops Galore Outdoor</option>
                                                        <option value="headers">Headers</option>
                                                        <option value="gaelic">Gaelic Hit The Spot</option> */}


                                                    </select>
                                                </div>
                                            </div>
                                            {/* 
                                            <div className="select-game">
                                                <div className="select-dropdown animated slideInUpLess">
                                                    <select className="form-control">
                                                        <option value="hts">2021</option>
                                                    </select>
                                                </div>
                                            </div> */}

                                            <React.Fragment>
                                                {      // data && data.prize_details && data.groups && data.groups.length > 0 && (
                                                    //         <div className="history-title">
                                                    //             <div className="history-title-outer">
                                                    //                 <figure><img src={images.trophy} /></figure>
                                                    //                 <div className="title-detail">
                                                    //                     <h2>{`My Total prize over ${data.total_days_played} ${data.total_days_played === 1 ? 'day' : 'days'} played is:`}</h2>
                                                    //                     <h3> {`${HelperFunctions.getCurrency(userInfo ? userInfo.currency : '') + HelperFunctions.toFixedToOnePlace(winPrice)}`} </h3>
                                                    //                 </div>
                                                    //             </div>
                                                    //         </div>
                                                    //         )
                                                }

                                                {
                                                    loader ?
                                                        <ContentLoader loaderType={'content-relative green-loader'} />
                                                        :
                                                        <React.Fragment>
                                                            {
                                                                (gameType === "hts" || gameType === "gaelic") && <HTSHistory
                                                                    data={data}
                                                                    trackUser={this.trackUser}
                                                                    gameData={this.props.gameData}
                                                                    userInfo={userInfo}
                                                                    gameType={gameType}
                                                                    myHistory={myHistory}
                                                                    handleTracking={handleTracking}
                                                                />
                                                            }

                                                            {
                                                                gameType === "mgi" && <MGHistory
                                                                    data={data}
                                                                    trackUser={this.trackUser}
                                                                    gameData={this.props.gameData}
                                                                    userInfo={userInfo}
                                                                    gameType={gameType}
                                                                    myHistory={myHistory}
                                                                    handleTracking={handleTracking}
                                                                />
                                                            }

                                                            {
                                                                gameType === "trivia" && <TriviaHistory
                                                                    data={data}
                                                                    trackUser={this.trackUser}
                                                                    gameData={this.props.gameData}
                                                                    userInfo={userInfo}
                                                                    gameType={gameType}
                                                                    myHistory={myHistory}
                                                                    handleTracking={handleTracking}
                                                                />
                                                            }

                                                            {
                                                                (gameType === "hg" || gameType === "hgo") && <HGHistory
                                                                    data={data}
                                                                    trackUser={this.trackUser}
                                                                    gameData={this.props.gameData}
                                                                    userInfo={userInfo}
                                                                    gameType={gameType}
                                                                    myHistory={myHistory}
                                                                    handleTracking={handleTracking}
                                                                />
                                                            }

                                                            {
                                                                gameType === "headers" && <HeadersHistory
                                                                    data={data}
                                                                    trackUser={this.trackUser}
                                                                    gameData={this.props.gameData}
                                                                    userInfo={userInfo}
                                                                    gameType={gameType}
                                                                    myHistory={myHistory}
                                                                    handleTracking={handleTracking}
                                                                />
                                                            }

                                                            {
                                                                gameType === "puckluck" && <PuckLuckHistory
                                                                    data={data}
                                                                    trackUser={this.trackUser}
                                                                    gameData={this.props.gameData}
                                                                    userInfo={userInfo}
                                                                    gameType={gameType}
                                                                    myHistory={myHistory}
                                                                    handleTracking={handleTracking}
                                                                />
                                                            }

                                                            {
                                                                gameType === "bbbash" && <BaseballBashHistory
                                                                    data={data}
                                                                    trackUser={this.trackUser}
                                                                    gameData={this.props.gameData}
                                                                    userInfo={userInfo}
                                                                    gameType={gameType}
                                                                    myHistory={myHistory}
                                                                    handleTracking={handleTracking}
                                                                />
                                                            }


                                                        </React.Fragment>


                                                    // gameType === "mgi" && <HTSHistory
                                                    //     data={data}
                                                    //     trackUser = {this.trackUser}
                                                    //     gameData = {this.props.gameData}
                                                    //     userInfo = {userInfo}
                                                    // />
                                                }
                                            </React.Fragment>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bottom-space"></div>
                        </div>
                    </div>
                    <div className="mid-overlay" onClick={closePopup}></div>
                </div>
            </div>
        );
    }
}

export default MyHistory;
