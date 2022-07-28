import React, { Component } from 'react';
import images from "../../../../../../../assets/images";
import HelperFunctions from "../../../../../../../utils/HelperFunctions";
import ContentLoader from "../../../../../../../commons/components/contentLoader";
import MiniLoader from "../../../../../../../commons/components/miniLoader";
import $ from 'jquery';

class GameHistory extends Component {

  handleAccordion = (index) => {

    // console.log(index, "index");
    $(this).addClass("open");

    if ($(".question_" + index).hasClass('open')) {
      $(".question_" + index).removeClass("open");
    } else {
      $(".result-tr").removeClass("open");
      $(".question_" + index).addClass("open");
    }

    if ($("#tip_question_" + index).css('display') === 'block') {
      $("#tip_question_" + index).slideUp();
    } else {
      $(".picks-question").slideUp();
      $("#tip_question_" + index).slideDown();
      // this.props.trackUser()
    }


  }

  render() {
    const { monthIndex, index, games, userInfo, seasonIndex, base_url } = this.props;
    // console.log("Trivia", games)

    return (
      <div className="accordion-content accordian-inner-content"
        id={"inner_content_" + seasonIndex + "_" + monthIndex + "_" + index}>
        <ul className="game-history-list">
          {!games ?
            games === null ?
              <li style={{ paddingTop: '10px', paddingBottom: '10px', textAlign: 'center' }}>No game played on this day.</li>
              :
              <ContentLoader loaderType={'content-relative'} />
            :
            games && games.map((item, j) => {
              // console.log(item, "item");
              return (
                <li className="open" key={j}>
                  <div className="acc-content accordin-contents" style={{ display: 'block' }}>
                    <div className="results-info">
                      <div className="result-table">
                        <div className="table-outer">
                          <div className="table-container">
                            <table>
                              <thead>
                                <tr>
                                  <th className="que-td">Ques.</th>
                                  <th className="answer-td">Answer</th>
                                  <th className="result-td">Result</th>
                                  <th className="boost-td">Boost</th>
                                  <th className="points-td">Points</th>
                                </tr>
                              </thead>
                              <tbody>

                                {
                                  item.question_info && item.question_info.map((que, qindex) => {
                                    return (
                                      <React.Fragment key={que.question_id}>
                                        <tr className={`result-tr question_${que.question_id}`} onClick={this.handleAccordion.bind(this, que.question_id)}>
                                          <td className="que-td">{que.question_number}</td>
                                          <td className="answer-td">
                                            {
                                              que.option_info && que.option_info.map((option, opIndex) => {
                                                return (
                                                  option.is_tipped && <span>{option.option_name}</span>
                                                )
                                              })
                                            }
                                          </td>
                                          <td className="result-td">
                                            <span className="results-icons">
                                              <i className={`icon ${que.tip_result === "win" ? "pp-check" : "pp-cross-fill"}`}></i>
                                            </span>
                                          </td>

                                          {
                                            <td className="boost-td">
                                              {
                                                que.boost_info ? <div className="boost-col">
                                                  {

                                                    que.boost_info.map((boostUsed, boostIndex) => {
                                                      let boostIcon = null;
                                                      switch (boostUsed.boost_id) {
                                                        case "BOOST004":
                                                          return boostIcon = <figure className="boosts-icon"><i className={`icon pp-blast`}></i></figure>;
                                                        case "BOOST003":
                                                          return boostIcon = <figure className="boosts-icon"><i className={`icon pp-refresh2`}></i></figure>;
                                                        case "BOOST001":
                                                          return boostIcon = <figure className="boosts-icon"><i className={`icon pp-watch2`}></i></figure>;
                                                        case "BOOST002":
                                                          return boostIcon = <figure className="boosts-icon"><i className={`icon pp-x`}></i></figure>;
                                                      }

                                                      return (
                                                        { boostIcon }
                                                      )
                                                    })
                                                  }
                                                </div> : ''
                                              }
                                            </td>

                                          }

                                          <td className="points-td">{que.winning_points} <i className="icon pp-arrow-down acc-arrow"></i></td>
                                        </tr>
                                        <tr className="resulted-tr">
                                          <td colSpan="5">
                                            <div className={`picks-question`} id={`tip_question_${que.question_id}`}>
                                              <div className="picks-question-outer">
                                                <h3 className="question-label">{que.question}</h3>
                                              </div>
                                            </div></td>
                                        </tr>
                                      </React.Fragment>
                                    )
                                  })
                                }
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              )
            })
          }
        </ul>
      </div>
    );
  }
}

function getBoostImages(boosts, base_url) {
  let boostImageOverlay = null;
  if (boosts) {
    boosts.map((boost, boostIndex) => {
      let boostIcon = base_url + boost.item_name + "_overlay.png";
      boostImageOverlay = boostIcon;
    })
  }
  return boostImageOverlay;
}

export default GameHistory;