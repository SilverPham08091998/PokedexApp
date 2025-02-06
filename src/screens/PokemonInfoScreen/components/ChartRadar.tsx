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

interface Props {
  option?: any;
}

const E_HEIGHT = 300;
const E_WIDTH = 300;
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
  const optionDefault = {
    color: [colorPrimary],
    radar: {
      indicator: [
        { name: "Hp", max: 200, min: 0 },
        { name: "Attack", max: 200, min: 0 },
        { name: "Defense", max: 200, min: 0 },
        { name: "Special-Attack", max: 200, min: 0 },
        { name: "Special-Defense", max: 200, min: 0 },
        { name: "Speed", max: 200, min: 0 },
      ],
    },
    series: [
      {
        type: "radar",
        areaStyle: {},
        data: [
          {
            value: info?.stats.map((i) => i.base_stat) || [],
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
