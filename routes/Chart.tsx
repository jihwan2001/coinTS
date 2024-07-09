import { useQuery } from "react-query";
import { fetchCoinHistory } from "./api";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atomos";

interface IHistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

interface chartProps {
  coinId: string;
}

function Chart({ coinId }: chartProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(["price", coinId], () =>
    fetchCoinHistory(coinId)
  );
  const isDark = useRecoilValue(isDarkAtom);
  return (
    // <div>
    //   {isLoading ? (
    //     "Loading"
    //   ) : (
    //     <ApexChart
    //       type="line"
    //       series={[
    //         {
    //           name: "hello",
    //           data: data?.map((price) => parseFloat(price.close)) ?? [],
    //         },
    //       ]}
    //       options={{
    //         theme: { mode: "dark" },
    //         chart: {
    //           height: 500,
    //           width: 500,
    //           toolbar: {
    //             show: false,
    //           },
    //           background: "transparent",
    //         },
    //         yaxis: {
    //           axisBorder: { show: false },
    //         },
    //         xaxis: {
    //           axisBorder: { show: false },
    //           axisTicks: { show: false },
    //           labels: { show: false },
    //           categories: data?.map((price) => price.time_close),
    //         },
    //         fill: {
    //           type: "gradient",
    //           gradient: { gradientToColors: ["blue"], stops: [0, 100] },
    //         },
    //         colors: ["red"],
    //         tooltip: {
    //           y: {
    //             formatter: (value) => `${value.toFixed(3)}`,
    //           },
    //         },
    //         grid: { show: false },
    //         stroke: { curve: "smooth", width: 3 },
    //       }}
    //     />
    //   )}
    // </div>
    <div>
      {isLoading ? (
        "Loading coins..."
      ) : (
        <ApexChart
          type="candlestick"
          series={
            [
              {
                data: data?.map((price) => {
                  return {
                    x: price.time_close,
                    y: [
                      Number(price.open).toFixed(3),
                      Number(price.low).toFixed(3),
                      Number(price.high).toFixed(3),
                      Number(price.close).toFixed(3),
                    ],
                  };
                }),
              },
            ] as any
          }
          options={{
            theme: {
              mode: isDark ? "dark" : "light",
            },
            chart: {
              height: 500,
              width: 500,
              toolbar: {
                tools: {},
              },
              background: "transparent",
            },
            grid: {
              show: false,
            },
            plotOptions: {
              candlestick: {
                wick: {
                  useFillColor: true,
                },
              },
            },
            xaxis: {
              labels: {
                show: false,
                datetimeFormatter: {
                  month: "mmm 'yy",
                },
              },
              type: "datetime",
              categories: data?.map((date) => date.time_close),
              axisBorder: {
                show: false,
              },
              axisTicks: {
                show: false,
              },
            },
            yaxis: {
              show: false,
            },
            tooltip: {
              y: {
                formatter: (v) => `$ ${v.toFixed(2)}`,
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
