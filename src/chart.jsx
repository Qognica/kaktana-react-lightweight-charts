import React from "react";
import { createChart } from "lightweight-charts";
import usePrevious from "./util/hooks/usePrevious";

const Chart = (props) => {
    const { candlestickSeries, lineSeries, areaSeries, barSeries, histogramSeries, width, height, options, autoWidth, autoHeight, legend, from, to, onClick, onCrosshairMove, onTimeRangeMove, darkTheme, chartRef } = props;

    const prevProps = usePrevious(props);
    const [chart, setChart] = React.useState(null);
    const chartDiv = React.createRef();
    const legendDiv = React.createRef();


    return (
        <div ref={chartDiv} style={{ position: "relative" }}>
            <div
                ref={legendDiv}
                style={{
                    position: "absolute",
                    zIndex: 2,
                    padding: 10,
                }}
            />
        </div>
    );
}

export default Chart;
export * from "lightweight-charts";
