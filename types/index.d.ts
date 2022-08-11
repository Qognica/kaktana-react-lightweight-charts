import {
    MouseEventHandler,
    TimeRangeChangeEventHandler,
    IChartApi,
} from "lightweight-charts";
import React, { FC } from "react";

export interface IChart extends React.HTMLProps<FC> {
    candlestickSeries?: Array<any>;
    lineSeries?: Array<any>;
    areaSeries?: Array<any>;
    barSeries?: Array<any>;
    histogramSeries?: Array<any>;
    width?: number;
    height?: number;
    options?: object;
    autoWidth?: boolean;
    autoHeight?: boolean;
    legend?: string;
    from?: number;
    to?: number;
    onCrosshairMove?: MouseEventHandler;
    onTimeRangeMove?: TimeRangeChangeEventHandler;
    darkTheme?: boolean;
    chartRef?: (chart: IChartApi) => void;
}

import Chart from "../src";
export default Chart as React.FC<IChart>;
export * from "lightweight-charts";
