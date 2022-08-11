import {
    MouseEventHandler,
    TimeRangeChangeEventHandler,
    IChartApi,
    SingleValueData,
    CandlestickSeriesPartialOptions,
    LineSeriesPartialOptions,
    AreaSeriesPartialOptions,
    BarSeriesPartialOptions,
    HistogramSeriesPartialOptions,
    OhlcData,
    ChartOptions
} from "lightweight-charts";
import React, { FC } from "react";

export interface ICandlestickSeries {
    id: string;
    data: OhlcData[];
    options: CandlestickSeriesPartialOptions;
}

export interface ILineSeries {
    id: string;
    data: SingleValueData[];
    options: LineSeriesPartialOptions;
}

export interface IAreaSeries {
    id: string;
    data: SingleValueData[];
    options: AreaSeriesPartialOptions;
}

export interface IBarSeries {
    id: string;
    data: SingleValueData[];
    options: BarSeriesPartialOptions;
}

export interface IHistogramSeries {
    id: string;
    data: SingleValueData[];
    options: HistogramSeriesPartialOptions;
}

export interface IChart extends React.HTMLProps<FC> {
    candlestickSeries?: Array<ICandlestickSeries>;
    lineSeries?: Array<ILineSeries>;
    areaSeries?: Array<IAreaSeries>;
    barSeries?: Array<IBarSeries>;
    histogramSeries?: Array<IHistogramSeries>;
    width?: number;
    height?: number;
    options?: ChartOptions;
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
