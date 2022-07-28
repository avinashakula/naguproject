import React, {Component} from 'react';

import Chart from "chart.js";
import $ from "jquery";
import images from "../../../../../../../assets/images";
import HelperFunctions from "../../../../../../../utils/HelperFunctions";

class ChartDemo extends Component {

    constructor(props) {
        super(props);
        this.myChart = null;
        this.state = {
            months: this.props.graphData.months,
            totalScores: this.props.graphData.total_score
        };
    }

    chartRef = React.createRef();

    componentDidMount() {
        let self = this;
        this.resetGraph(this.props.graphData.months, this.props.graphData.total_score);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        let self = this;
        if (nextProps !== this.props) {
            document.getElementById("monthDropdown").selectedIndex = "0";
            this.resetGraph(nextProps.graphData.months, nextProps.graphData.total_score);
        }
    }

    initGraphConfig() {
        if (this.myChart) {
            this.myChart.destroy();
        }
        let self = this;
        Chart.defaults.global.elements.line.tension = 0;
        let data = {
            labels: this.state.months,
            datasets: [{
                label: null,
                backgroundColor: "rgba(255,255,255,0)",
                borderColor: "rgba(17,81,144)",
                borderWidth: 2,
                hoverBackgroundColor: "rgba(17,81,144)",
                hoverBorderColor: "rgba(17,81,144)",
                data: this.state.totalScores,
            }]
        };

        Chart.plugins.register({
            beforeRender: function (chart) {
                if (chart.config.options.showAllTooltips) {
                    // create an array of tooltips
                    // we can't use the chart tooltip because there is only one tooltip per chart
                    chart.pluginTooltips = [];
                    chart.config.data.datasets.forEach(function (dataset, i) {

                        chart.getDatasetMeta(i).data.forEach(function (sector, j) {
                            chart.pluginTooltips.push(new Chart.Tooltip({
                                _chart: chart.chart,
                                _chartInstance: chart,
                                _data: chart.data,
                                _options: chart.options.tooltips,
                                _active: [sector]
                            }, chart));
                        });
                    });

                    // turn off normal tooltips
                    chart.options.tooltips.enabled = false;
                }
            },
            afterDraw: function (chart, easing) {
                if (chart.config.options.showAllTooltips) {
                    // we don't want the permanent tooltips to animate, so don't do anything till the animation runs atleast once
                    if (!chart.allTooltipsOnce) {
                        if (easing !== 1)
                            return;
                        chart.allTooltipsOnce = true;
                    }

                    // turn on tooltips
                    chart.options.tooltips.enabled = true;
                    Chart.helpers.each(chart.pluginTooltips, function (tooltip) {

                        // This line checks if the item is visible to display the tooltip
                        if (!tooltip._active[0].hidden) {
                            tooltip.initialize();
                            tooltip.update();
                            tooltip.displayColors = false;
                            // we don't actually need this since we are not animating tooltips
                            tooltip.pivot();
                            tooltip.transition(easing).draw();
                        }
                    });
                    chart.options.tooltips.enabled = false;
                }
            }
        });

        let options = {
            showAllTooltips: true,
            maintainAspectRatio: false,
            legend: {
                display: false,
            },
            scales: {
                yAxes: [{
                    ticks: {
                        display: false,
                        borderColor : '#115190'
                    },
                    gridLines: {
                        display: true,
                        drawBorder: true,
                        borderDash: [0, 1],
                        color: "#115190"
                    }
                }],
                xAxes: [{
                    gridLines: {
                        display: true,
                        borderDash: [4, 5],
                        color: "#115190",
                        fontColor : "#115190"
                    },
                    ticks: {
                        fontColor: "#115190"
                  }
                }]
            },
            tooltips: {
                mode: 'index',
                yAlign: 'bottom',
                callbacks: {
                    labelColor: function (tooltipItem, chart) {
                        return {
                            borderColor: 'rgba(17,81,144, 1)',
                            backgroundColor: 'rgba(17,81,144, 1)',
                        }
                    },
                    label: function (tooltipItem, chart) {
                        return null
                    },
                    title: function (tooltipItem, chart) {
                        return tooltipItem[0].yLabel === 0 ? "0" : HelperFunctions.numberFormatter(tooltipItem[0].yLabel);
                    },
                },
                backgroundColor: 'rgba(0, 157, 219, 1)',
                titleMarginBottom: 0,
            },
            layout: {
                padding: {
                    left: 0,
                    right: 5,
                    top: 30,
                    bottom: 0
                }
            }
        };

        self.myChart = new Chart.Line('chart', {
            options: options,
            data: data
        });
    }

    monthOnChange = (e) => {
        const monthWiseScores = this.props.graphData.month_wise;
        if (e.target.value === "all") {
            this.resetGraph(this.props.graphData.months, this.props.graphData.total_score);
        } else {
            monthWiseScores.map((value, index) => {
                    if (e.target.value === value.month) {
                        this.resetGraph(value.group_date, value.score);
                    }
                }
            );
        }
        this.props.setSelectedMonth(e.target.value);
    };


    resetGraph(month_date, score) {
        let self = this;
        this.setState({
            months: month_date,
            totalScores: score
        });

        setTimeout(function () {
            self.initGraphConfig();
        }, 200)
    }

    render() {
        const {graphData} = this.props;
        return (
            <React.Fragment>
                <div className="graph-dropdown">
                    <div className="graph-dropdown-inner">
                        <div className="select-dropdown">
                            <select id={"monthDropdown"} onChange={this.monthOnChange}>
                                <option value={"all"}>All Months</option>
                                {
                                    graphData.months.map((month, index) => {
                                        return (
                                            <option key={index} value={month}>{month}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>
                </div>
                <div className="scroll-content">
                    <span className="top-scroll-arrow"><img src={images.topArrow1} alt=""/></span>
                    <span className="bottom-scroll-arrow">
                    <img src={images.bottomArrow1} alt=""/>
                </span>
                    <div className="scrollbar-container ps">
                        <div className="content-mid scroll-bar">
                            <div className="monthly-info">
                                {/* <div className="monthly-graph">
                                <canvas id="chart_0" style="height:40vh; width:80vw">

                                <div
                                    className="chartjs-tooltip"
                                    id={"tooltip-" + seasonIndex}
                                    style={{opacity: "0"}}>
                                </div>
                            </div>*/}

                                <div className="monthly-graph chart-container">
                                    <canvas id={"chart"}></canvas>
                                    <div
                                        className="chartjs-tooltip"
                                        id={"tooltip-0"}
                                        style={{opacity: "0"}}>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default ChartDemo;