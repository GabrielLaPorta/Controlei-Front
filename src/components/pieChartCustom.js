import React, { PureComponent } from 'react';
import DonutChart from "react-donut-chart";
import Container from '@mui/material/Container';

export default function PieChartCustom({ data }) {
  const reactDonutChartBackgroundColor = [
    '#6D8EAD', '#FFC000'
  ];
  const reactDonutChartdata = [
    {
      label: "Gasto",
      value: data[0]
    },
    {
      label: "Disponível",
      value: data[1]
    }
  ];
  const reactDonutChartInnerRadius = 0.6;
  const reactDonutChartSelectedOffset = 0.00;
  const reactDonutChartHandleClick = (item, toggled) => {
    if (toggled) {
      console.log(item);
    }
  };
  let reactDonutChartStrokeColor = "#FFFFFF";
  const reactDonutChartOnMouseEnter = (item) => {
    let color = reactDonutChartdata.find((q) => q.label === item.label);
    reactDonutChartStrokeColor = color;
  };

  return (
    <Container>
      <DonutChart
        width="110"
        height="110"
        legend={false}
        onMouseEnter={(item) => reactDonutChartOnMouseEnter(item)}
        strokeColor={reactDonutChartStrokeColor}
        data={reactDonutChartdata}
        colors={reactDonutChartBackgroundColor}
        innerRadius={reactDonutChartInnerRadius}
        selectedOffset={reactDonutChartSelectedOffset}
        onClick={(item, toggled) => reactDonutChartHandleClick(item, toggled)}
      />
    </Container>
  );
}
