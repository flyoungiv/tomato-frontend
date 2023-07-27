import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

const defaultSeries = [
  {
    "year": "1992",
    "medals": 1.0,
    "population": 2.67
  }]

export default function SimpleLineChart({ data }) {

  const getSeriesData = (series) => {
    const years = []
    const medals = []
    const population = []

    series.forEach(year => {
      years.push(year.year)
      medals.push(year.medals)
      population.push(year.population)
    })

    return [years, medals, population]
  }

  const series = data ? data.series : defaultSeries

  const [years, medals, population] = getSeriesData(series)

  return (
    <LineChart
      width={900}
      height={300}
      series={[
        { data: medals, label: 'Medals' },
        { data: population, label: 'Population (10M people)' },
      ]}
      xAxis={[{ scaleType: 'point', data: years }]}
    />
  );
}