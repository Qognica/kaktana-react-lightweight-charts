export const addSeriesFunctions = {
    candlestick: "addCandlestickSeries",
    line: "addLineSeries",
    area: "addAreaSeries",
    bar: "addBarSeries",
    histogram: "addHistogramSeries",
};

export const colors = [
    "#008FFB",
    "#00E396",
    "#FEB019",
    "#FF4560",
    "#775DD0",
    "#F86624",
    "#A5978B",
];

export const defaultDarkTheme = {
    layout: {
        backgroundColor: "#131722",
        lineColor: "#2B2B43",
        textColor: "#D9D9D9",
    },
    grid: {
        vertLines: {
            color: "#363c4e",
        },
        horzLines: {
            color: "#363c4e",
        },
    },
};

export const lightTheme = {
    layout: {
        backgroundColor: "#FFFFFF",
        lineColor: "#2B2B43",
        textColor: "#191919",
    },
    grid: {
        vertLines: {
            color: "#e1ecf2",
        },
        horzLines: {
            color: "#e1ecf2",
        },
    },
};