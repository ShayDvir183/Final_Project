import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
  Bar,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { getChartDataAction } from "../../store/asyncFunction/vacations";
import { useAppSelector } from "../../store/hooks";
import { getTokenLS } from "../../store/ls";
import styles from "./chart.module.css";
import { IGetChartData } from "../../store/services/vacationsService";
const colors: Array<string> = [];
export default function MyChart() {
  const navigate = useNavigate();
  const chartData: Array<IGetChartData> = useAppSelector(
    (state) => state.vacations.chartData
  );
  useEffect(() => {
    const token = getTokenLS();
    if (token) {
      theChartData();
    } else {
      navigate("/login");
    }
    async function theChartData() {
      if (data.length > 1) return;
      await getChartDataAction();
    }
  }, [chartData]);

  const data: Array<IPrintData> = setData(chartData);
  return (
    <div className={styles.chartWrap}>
      <h1>Vacations Chart </h1>
      {Array.isArray(data) && data.length > 0 && (
        <ResponsiveContainer className={styles.chart}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3" stroke="#fff" />
            <XAxis dataKey="name" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip cursor={false} />
            <Legend />
            <Bar dataKey="Followers" fill="#fff">
              {data.map((item: any, index: any) => {
                const color = getRandomColor(index);
                return <Cell fill={color} key={index} />;
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
function setData(data: Array<IGetChartData>): Array<IPrintData> {
  return data?.map((item: IGetChartData) => {
    return {
      name: item.destination,
      Followers: item.ammount_of_followers,
    };
  });
}

interface IPrintData {
  name: string;
  Followers: number;
}
function getRandomColor(index: number): string {
  const options = [
    "#00bcd4",
    "#009688",
    "#4caf50",
    "#ffeb3b",
    "#ffc107",
    "#ff9800",
    "#ff5722",
    "#795548",
    "#9e9e9e",
    "#607d8b",
    "#f44336",
    "#e91e63",
    "#9c27b0",
    "#673ab7",
    "#3f51b5",
    "#2196f3",
    "#009688",
    "#03a9f4",
    "#00bcd4",
    "#009688",
    "#4caf50",
  ];
  function checkIfUsed(colorToCheck: string): boolean {
    const s = colors.find((color) => color === colorToCheck);
    if (s === undefined) {
      return false;
    } else {
      return true;
    }
  }
  let randomNum = randomNumber();
  do {
    randomNum = randomNumber();
  } while (checkIfUsed(options[randomNum]));
  colors.push(options[randomNum]);
  return options[randomNum];
}
function randomNumber(): number {
  return Math.floor(Math.random() * 20);
}
