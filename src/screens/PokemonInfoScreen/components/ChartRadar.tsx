import React, { useEffect, useRef } from "react";
import { SvgChart, SVGRenderer } from "@wuba/react-native-echarts";
import * as echarts from "echarts/core";
import {
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent,
} from "echarts/components";
import { BarChart, RadarChart } from "echarts/charts";
import { useAppSelector } from "@/util";
import { PokemonTypeColors } from "@/type";
import { STRING_CONVERTER } from "@/util/function";

interface Props {
  option?: any;
}

const E_HEIGHT = 300;
const E_WIDTH = 400;
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  SVGRenderer,
  LegendComponent,
  BarChart,
  RadarChart,
]);
const ChartRadar = (props: Props) => {
  const { info } = useAppSelector((state) => {
    return state.home.pokemonInfo;
  });
  const primaryType =
    info?.types.find((type) => type.slot === 1)?.type.name || "";
  const colorPrimary = PokemonTypeColors[primaryType.toUpperCase()];
  const chartRef = useRef<any>(null);
  const indicator = info?.stats.map((i) => {
    return {
      name: STRING_CONVERTER.upperCaseFirstChart(i.stat.name),
      max: i.base_stat + 252 / 4 + 31,
      min: 0,
    };
  });
  const optionDefault = {
    color: [colorPrimary],
    radar: {
      indicator: indicator,
    },
    series: [
      {
        type: "radar",
        areaStyle: {},
        data: [
          {
            value:
              info?.stats.map((i) =>
                i?.effort ? i.base_stat + 10 * i?.effort + 31 : i.base_stat + 31
              ) || [],
            name: info?.name,
          },
        ],
      },
    ],
  };
  useEffect(() => {
    let chart: any;
    if (chartRef.current) {
      // @ts-ignore
      chart = echarts.init(chartRef.current, "light", {
        renderer: "svg",
        width: E_WIDTH,
        height: E_HEIGHT,
      });
      chart.setOption(optionDefault);
    }
    return () => chart?.dispose();
  }, [props.option]);

  return <SvgChart ref={chartRef} />;
};

export default ChartRadar;
