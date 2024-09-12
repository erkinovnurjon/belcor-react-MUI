import type { CardProps } from "@mui/material/Card";
import type { ChartOptions } from "src/components/chart";

import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import { useTheme } from "@mui/material/styles";
import CardHeader from "@mui/material/CardHeader";

import { Chart, useChart, ChartLegends } from "src/components/chart";

// ----------------------------------------------------------------------

type Props = CardProps & {
  title?: string;
  subheader?: string;
  chart: {
    colors?: string[];
    categories: string[];
    series: {
      name: string;
      data: number[];
    }[];
    options?: ChartOptions;
  };
};

export function AnalyticsCurrentSubject({
  title,
  subheader,
  chart,
  ...other
}: Props) {
  const theme = useTheme();

  const chartColors = chart.colors ?? [
    theme.palette.primary.main,
    theme.palette.warning.main,
    theme.palette.info.main,
  ];

  const chartOptions = useChart({
    colors: chartColors,
    stroke: { width: 2 },
    fill: { opacity: 0.48 },
    xaxis: {
      categories: chart.categories,
      labels: {
        style: {
          colors: [...Array(6)].map(() => theme.palette.text.secondary),
        },
      },
    },
    ...chart.options,
  });

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Chart
        type="radar"
        series={chart.series}import type { CardProps } from '@mui/material/Card';
        import type { ChartOptions } from 'src/components/chart';
        
        import Card from '@mui/material/Card';
        import Divider from '@mui/material/Divider';
        import { useTheme } from '@mui/material/styles';
        import CardHeader from '@mui/material/CardHeader';
        
        import { fNumber } from 'src/utils/format-number';
        
        import { Chart, useChart, ChartLegends } from 'src/components/chart';
        
        // ----------------------------------------------------------------------
        
        type Props = CardProps & {
          title?: string;
          subheader?: string;
          chart: {
            colors?: string[];
            series: {
              label: string;
              value: number;
            }[];
            options?: ChartOptions;
          };
        };
        
        export function AnalyticsCurrentVisits({ title, subheader, chart, ...other }: Props) {
          const theme = useTheme();
        
          const chartSeries = chart.series.map((item) => item.value);
        
          const chartColors = chart.colors ?? [
            theme.palette.primary.main,
            theme.palette.warning.main,
            theme.palette.secondary.dark,
            theme.palette.error.main,
          ];
        
          const chartOptions = useChart({
            chart: { sparkline: { enabled: true } },
            colors: chartColors,
            labels: chart.series.map((item) => item.label),
            stroke: { width: 0 },
            dataLabels: { enabled: true, dropShadow: { enabled: false } },
            tooltip: {
              y: {
                formatter: (value: number) => fNumber(value),
                title: { formatter: (seriesName: string) => `${seriesName}` },
              },
            },
            plotOptions: { pie: { donut: { labels: { show: false } } } },
            ...chart.options,
          });
        
          return (
            <Card {...other}>
              <CardHeader title={title} subheader={subheader} />
        
              <Chart
                type="pie"
                series={chartSeries}
                options={chartOptions}
                width={{ xs: 240, xl: 260 }}
                height={{ xs: 240, xl: 260 }}
                sx={{ my: 6, mx: 'auto' }}
              />
        
              <Divider sx={{ borderStyle: 'dashed' }} />
        
              <ChartLegends
                labels={chartOptions?.labels}
                colors={chartOptions?.colors}
                sx={{ p: 3, justifyContent: 'center' }}
              />
            </Card>
          );
        }
        
        options={chartOptions}
        width={300}
        height={300}
        sx={{ my: 1, mx: "auto" }}
      />

      <Divider sx={{ borderStyle: "dashed" }} />

      <ChartLegends
        labels={chart.series.map((item) => item.name)}
        colors={chartOptions?.colors}
        sx={{ p: 3, justifyContent: "center" }}
      />
    </Card>
  );
}
