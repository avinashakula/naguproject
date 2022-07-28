import React, { Component } from 'react';
import ContentLoader from '../../../../../commons/components/contentLoader';
import DateHelper from '../../../../../utils/DateHelper';
import TimeCounter from '../../../common/countDown/timeCounter';

class TriviaVote extends Component {

    constructor(props) {
        super(props);
        this.state = {
            readyToPlay: false,
            resultsFlag: false,
            nextVoteCounterFlag: true
        }
    }

    handleVote = (optionId, questionId) => {
        // console.log(optionId, questionId)
        let data = {
            "question_id": questionId,
            "option_id": optionId
        }
        this.props.submitPollVote(data)
    }

    makeTriviaOpen = () => {
        this.setState({ readyToPlay: true });
        this.props.getPollVoteData(true);
    };

    hideNextVoteTimer = () => {
        this.setState({ nextVoteCounterFlag: false });
        this.props.getPollVoteData(true);
    };


    showResults = () => {
        this.setState({ resultsFlag: true });
        this.props.getPollVoteData(true);
    };

    render() {
        const { pollVoteData, stats, newGameFlag } = this.props;
        const { readyToPlay, resultsFlag, nextVoteCounterFlag } = this.state;
        // console.log(readyToPlay, "readyToPlay");
        const questionData = pollVoteData && pollVoteData.question_info;
        let releaseTime = null;
        let endTime = null;
        let nextVoteTimer = null;
        let texToShow = "";
        if (pollVoteData !== 404 && pollVoteData) {
            if(questionData[0].option_info) {
                releaseTime = pollVoteData.start_date_time && DateHelper.calculateMatchDateTimeDifferenceFromCurrent(DateHelper.getDateFromStringMoment(pollVoteData.start_date_time));
            } else {
                releaseTime = pollVoteData.next_poll_vote_open && DateHelper.calculateMatchDateTimeDifferenceFromCurrent(DateHelper.getDateFromStringMoment(pollVoteData.next_poll_vote_open));
            }
            endTime = pollVoteData.end_date_time && DateHelper.calculateMatchDateTimeDifferenceFromCurrent(DateHelper.getDateFromStringMoment(pollVoteData.end_date_time));
            nextVoteTimer = pollVoteData.next_poll_vote_open && DateHelper.calculateMatchDateTimeDifferenceFromCurrent(DateHelper.getDateFromStringMoment(pollVoteData.next_poll_vote_open));

            texToShow = questionData && releaseTime && (pollVoteData.result_option && resultsFlag ? pollVoteData.result_option.option + " has been voted in as next week's trivia topic!" : ((readyToPlay || releaseTime.isLive) ? questionData[0].next_poll_text : ""))
        }


        // console.log(releaseTime, resultsFlag, endTime, "resultsFlag")

        return pollVoteData !== 404 ? (

            // ${pollVoteData && pollVoteData.result_option && "no-topic-card"}
            // ${stats && stats.epicScores && "desk-half-coll"}
            <div className={`card-info vote-user-info  ${newGameFlag ? "desk-half-coll" : ""}`}>
                {
                    questionData ? <React.Fragment>
                        <div className="title">
                            <h2 className="card-title animated slideInUpLess"><span>Trivia Vote</span></h2>
                        </div>
                        <div className="card-outer">
                            <div className="wcard animated slideInUpLess">
                                <div className="question-card">
                                    <div className="question">

                                        {
                                            questionData[0].option_info && <div className="vote-counter">
                                                {resultsFlag && nextVoteCounterFlag && nextVoteTimer && pollVoteData.result_option && <TimeCounter timerValue={nextVoteTimer} onComplete={this.hideNextVoteTimer} isSimpleCounter={"Next Poll Opens In"} />}
                                                {releaseTime && endTime && (readyToPlay || releaseTime.isLive) && !resultsFlag && <TimeCounter timerValue={endTime} onComplete={this.showResults} isSimpleCounter={"Poll Ends In"} />}
                                            </div>
                                        }
                                        {/* {pollVoteData.result_option ? null : <span className="x-value-title">{questionData[0].active_topic} </span>} */}
                                        {<span className="x-value-title">{questionData[0].active_topic} </span>}
                                        {/* {(readyToPlay || releaseTime.isLive) && <h3>{questionData[0].question}</h3>} */}
                                        {/* <h3>{pollVoteData.result_option && resultsFlag ? pollVoteData.result_option.option + " has been voted in as next week's trivia topic!" : ((readyToPlay || releaseTime.isLive) ? questionData[0].next_poll_text : "")}</h3> */}

                                        {
                                            questionData[0].option_info && texToShow !== "" && <h3>{texToShow}</h3>
                                        }

                                    </div>

                                    {
                                        <React.Fragment>
                                            {
                                                // (resultsFlag || endTime.isLive) ? <p>Results announced {pollVoteData.result_option}</p> :
                                                (releaseTime && questionData[0].option_info && (readyToPlay || releaseTime.isLive)) ? <div className="question-listing">
                                                    {
                                                        pollVoteData.isSubmittingVote ? <ContentLoader loaderType={"content-relative"} /> : <ul className={`question-list ${(questionData[0].is_tipped || pollVoteData.result_option) && "add-tip"}`}>
                                                            {/* tiped */}
                                                            {
                                                                questionData[0].option_info.map((options, index) => {

                                                                    return (
                                                                        <li className={`${options.is_result ? "tiped" : (options.is_tipped && !pollVoteData.result_option) ? "tiped" : null}`} onClick={options.is_tipped ? null : this.handleVote.bind(this, options.option_id, questionData[0].question_id)} key={index}>
                                                                            <div className="ques-bx">
                                                                                <div className="pool-voting">
                                                                                    <span className="voting-tm">{options.option} {options.is_tipped && <span>(Your Vote)</span>} </span>
                                                                                    {
                                                                                        options.tip_per !== undefined && <div className="voting-bar">
                                                                                            <div className="voting-bar-outer">
                                                                                                <div className="voting-progerss">
                                                                                                    <span className="pool-bar" style={{ width: options.tip_per + "%" }}></span>
                                                                                                </div>
                                                                                                <span className="voting">{options.tip_per.toFixed(1) + "%"}</span>
                                                                                            </div>
                                                                                        </div>
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                        </li>
                                                                    )
                                                                })
                                                            }
                                                        </ul>
                                                    }
                                                </div> : <div className="question-counter">
                                                    <h3 className="counter-title">Voting on next week's Poll {releaseTime ? " opens in" : "will be available soon"}</h3>
                                                    {releaseTime && <TimeCounter timerValue={releaseTime} onComplete={this.makeTriviaOpen} />}
                                                </div>
                                            }
                                        </React.Fragment>
                                    }

                                    {/* counter for when the poll vote finished and results shows */}
                                    {
                                        (endTime && !resultsFlag && !endTime.isLive) && <div className="question-counter" style={{ display: "none" }}>
                                            {<TimeCounter timerValue={endTime} onComplete={this.showResults} />}
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </React.Fragment> : <ContentLoader loaderType={"content-relative"} />
                }
            </div>
        ) : null;
    }
}

export default TriviaVote;