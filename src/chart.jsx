import React from "react";
import { createChart } from "lightweight-charts";
import equal from "fast-deep-equal";
import { addSeriesFunctions, colors, defaultDarkTheme, lightTheme } from "./util/consts";
import usePrevious from "./util/hooks/usePrevious";
import { mergeDeep } from "./util/helpers";

const Chart = (props) => {
    const { candlestickSeries, lineSeries, areaSeries, barSeries, histogramSeries, width, height, options, autoWidth, autoHeight, legend, from, to, onClick, onCrosshairMove, onTimeRangeMove, darkTheme, chartRef } = props;

    const prevProps = usePrevious(props);
    const [legends, setLegends] = React.useState([]);
    const [series, setSeries] = React.useState([]);
    const [chart, setChart] = React.useState(null);
    const [color, setColor] = React.useState(lightTheme.layout.textColor);
    const chartDiv = React.createRef();
    const legendDiv = React.createRef();

    React.useEffect(() => {
        if (!chart) {
            const newChart = createChart(chartDiv.current)
            setChart(newChart);
            handleUpdateChart();
            resizeHandler();
            chartRef?.(newChart);
        }
    }, [chart, chartRef]);

    React.useEffect(() => {
        setColor(darkTheme
            ? defaultDarkTheme.layout.textColor
            : lightTheme.layout.textColor)
    }, [darkTheme]);

    React.useEffect(() => {
        if (!autoWidth && !autoHeight) {
            window.removeEventListener("resize", resizeHandler);
        }
        if (prevProps) {
            if (
                !equal(
                    [
                        prevProps.onCrosshairMove,
                        prevProps.onTimeRangeMove,
                        prevProps.onClick,
                    ],
                    [onCrosshairMove, onTimeRangeMove, onClick]
                ) 
            ) {
                unsubscribeEvents(prevProps);
            }
        }
       

    }, [prevProps]);

    /**
     * Series
     */

    const removeSeries = () => {
        series.forEach((serie) => chart?.removeSeries(serie));
        setSeries([]);
    };

    const addSeries = (serie, type) => {
        if(!chart) return;
        const func = addSeriesFunctions[type];
        const color =
            (serie.options && serie.options.color) ||
            colors[series.length % colors.length];
        const chartSeries = chart[func]({
            color,
            ...serie.options,
        });
        const data = handleLinearInterpolation(
            serie.data,
            serie.linearInterpolation
        );
        chartSeries.setData(data);

        if (serie.markers) {
            series.setMarkers(serie.markers);
        }

        if (serie.priceLines) {
            serie.priceLines.forEach((line) => series.createPriceLine(line));
        }

        if (serie.legend) {
            addLegend(series, color, serie.legend);
        } 

        return chartSeries;
    };

    const handleSeries = () => {
        candlestickSeries &&
            candlestickSeries.forEach((serie) => {
                setSeries([...series, addSeries(serie, "candlestick")]);
            });

        lineSeries &&
            lineSeries.forEach((serie) => {
                setSeries([...series, addSeries(serie, "line")]);
            });

        areaSeries &&
            areaSeries.forEach((serie) => {
                setSeries([...series, addSeries(serie, "area")]);
            });

        barSeries &&
            barSeries.forEach((serie) => {
                setSeries([...series, addSeries(serie, "bar")]);
            });

        histogramSeries &&
            histogramSeries.forEach((serie) => {
                setSeries([...series, addSeries(serie, "histogram")]);
            });
    };

    /**
     * Event handlers
     */

    const resizeHandler = () => {
        const newWidth =
            autoWidth &&
            chartDiv.current &&
            chartDiv.current.parentNode.clientWidth;
        let newHeight =
            autoHeight && chartDiv.current
                ? chartDiv.current.parentNode.clientHeight
                : height || 500;
        chart?.resize(newWidth, newHeight);
    };

    const unsubscribeEvents = (previousProps) => {
        chart?.unsubscribeClick(previousProps.onClick);
        chart?.unsubscribeCrosshairMove(previousProps.onCrosshairMove);
        chart?.timeScale().unsubscribeVisibleTimeRangeChange(previousProps.onTimeRangeMove);
    };

    const handleTimeRange = () => {
        from && to && chart?.timeScale().setVisibleRange({ from, to });
    };

    const handleUpdateChart = () => {
        window.removeEventListener("resize", resizeHandler);
        let userOptions = darkTheme ? defaultDarkTheme : lightTheme;
        userOptions = mergeDeep(userOptions, {
            width: autoWidth
                ? chartDiv.current.parentNode.clientWidth
                : width,
            height: autoHeight
                ? chartDiv.current.parentNode.clientHeight
                : height || 500,
            ...options,
        });
        chart?.applyOptions(userOptions);

        if (legendDiv.current) {
            legendDiv.current.innerHTML = "";
        }

        setLegends([]);
        if(legend) {
            handleMainLegend();
        }

        handleSeries();
        handleEvents();
        handleTimeRange();

        if (autoWidth || autoHeight) {
            // resize the chart with the window
            window.addEventListener("resize", resizeHandler);
        }
    };

    const handleEvents = () => {
        onClick && chart?.subscribeClick(onClick);
        onCrosshairMove && chart?.subscribeCrosshairMove(onCrosshairMove);
        onTimeRangeMove && chart?.timeScale().subscribeVisibleTimeRangeChange(onTimeRangeMove);

        // handle legend dynamical change
        chart?.subscribeCrosshairMove(handleLegends);
    };

    const handleLinearInterpolation = (data, candleTime) => {
        if (!candleTime || data.length < 2 || !data[0].value) return data;
        const first = data[0].time;
        const last = data[data.length - 1].time;
        const newData = new Array(Math.floor((last - first) / candleTime));
        newData[0] = data[0];
        const index = 1;
        for (let i = 1; i < data.length; i += 1) {
            newData[index += 1] = data[i];
            const prevTime = data[i - 1].time;
            const prevValue = data[i - 1].value;
            const { time, value } = data[i];
            for (
                let interTime = prevTime;
                interTime < time - candleTime;
                interTime += candleTime
            ) {
                // interValue get from the Taylor-Young formula
                const interValue =
                    prevValue +
                    (interTime - prevTime) *
                    ((value - prevValue) / (time - prevTime));
                newData[index + 1] = { time: interTime, value: interValue };
            }
        }
        // return only the valid values
        return newData.filter((x) => x);
    };

    /**
     * Legend Functions
     */

    const addLegend = (legendSeries, legendColor, legendTitle) => {
        const newLegend = { series: legendSeries, color: legendColor, title: legendTitle };
        setLegends({ ...legends, newLegend });
    };

    const handleMainLegend = () => {
        if (legendDiv.current) {
            const row = document.createElement("div");
            row.innerText = legend;
            legendDiv.current.appendChild(row);
        }
    };

    const handleLegends = (param) => {
        const div = legendDiv.current;
        if (param.time && div && legends.length) {
            div.innerHTML = "";
            legends.forEach(({ series, color, title }) => {
                let price = param.seriesPrices.get(series);
                if (price !== undefined) {
                    if (typeof price == "object") {
                        color =
                            price.open < price.close
                                ? "rgba(0, 150, 136, 0.8)"
                                : "rgba(255,82,82, 0.8)";
                        price = `O: ${price.open}, H: ${price.high}, L: ${price.low}, C: ${price.close}`;
                    }
                    const row = document.createElement("div");
                    row.innerText = `${title} `;
                    const priceElem = document.createElement("span");
                    priceElem.style.color = color;
                    priceElem.innerText = ` ${price}`;
                    row.appendChild(priceElem);
                    div.appendChild(row);
                }
            });
        }
    };

    return (
        <div ref={chartDiv} style={{ position: "relative" }}>
            <div
                ref={legendDiv}
                style={{
                    position: "absolute",
                    zIndex: 2,
                    color,
                    padding: 10,
                }}
            />
        </div>
    );
}

export default Chart;
export * from "lightweight-charts";
