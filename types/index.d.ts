

export interface ICandlestickSeries {
    id?: string;
    data: OhlcData[];
    options?: CandlestickSeriesPartialOptions;
    linearInterpolation?: number;
    legend?: string;
    markers?: SeriesMarker[];
    priceLines?: PriceLineOptions[];
}

export interface ILineSeries {
    id?: string;
    data: SingleValueData[];
    options?: LineSeriesPartialOptions;
    linearInterpolation?: number;
    legend?: string;
    markers?: SeriesMarker[];
    priceLines?: PriceLineOptions[];
}

export interface IAreaSeries {
    id?: string;
    data: SingleValueData[];
    options?: AreaSeriesPartialOptions;
    linearInterpolation?: number;
    legend?: string;
    markers?: SeriesMarker[];
    priceLines?: PriceLineOptions[];
}

export interface IBarSeries {
    id?: string;
    data: SingleValueData[];
    options?: BarSeriesPartialOptions;
    linearInterpolation?: number;
    legend?: string;
    markers?: SeriesMarker[];
    priceLines?: PriceLineOptions[];
}

export interface IHistogramSeries {
    id?: string;
    data: SingleValueData[];
    options?: HistogramSeriesPartialOptions;
    linearInterpolation?: number;
    legend?: string;
    markers?: SeriesMarker[];
    priceLines?: PriceLineOptions[];
}

type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>;
};

export interface IChart extends React.HTMLProps<FC> {
    candlestickSeries?: Array<ICandlestickSeries>;
    lineSeries?: Array<ILineSeries>;
    areaSeries?: Array<IAreaSeries>;
    barSeries?: Array<IBarSeries>;
    histogramSeries?: Array<IHistogramSeries>;
    width?: number;
    height?: number;
    options?: DeepPartial<ChartOptions>;
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
