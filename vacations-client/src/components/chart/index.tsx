import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis,Bar, Cell,ResponsiveContainer } from "recharts"
import { getChartDataAction } from "../../store/asyncFunction/vacations"
import { useAppSelector } from "../../store/hooks"
import { getTokenLS } from "../../store/ls"
import "./chart.css"
function getRandomColor(index:number){
    const options = [
        '#00bcd4',
        '#009688',
        '#4caf50',
        '#ffeb3b',
        '#ffc107',
        '#ff9800',
        '#ff5722',
        '#795548',
        '#9e9e9e',
        '#607d8b',
        '#f44336',
        '#e91e63',
        '#9c27b0',
        '#673ab7',
        '#3f51b5',
        '#2196f3',
        '#009688',
        '#03a9f4',
        '#00bcd4',
        '#009688',
        '#4caf50',
    ]
    const randomNum = Math.floor(Math.random()*20)
    return options[randomNum]
}
 export default function MyChart(){
     const navigate = useNavigate()
     useEffect(() => {
        const tokenLS = getTokenLS()
        console.log("useEffect",tokenLS)
        if (!tokenLS) {
            console.log("navigate")
          return  navigate("/login");
        }
    },[]) 
    useEffect(() => {
      getChartDataAction()
    }, [])
    const chartData = useAppSelector(state => state.vacations.chartData)
    const data = setData(chartData)
    console.log(data)
    return <div className="chartWrap">
        <h1>Vacations Chart</h1>
       { Array.isArray(data) &&data.length>0 &&  <ResponsiveContainer height={"80%"} width={"100%"} className="chart" >
        <BarChart   data={data}>
    <CartesianGrid strokeDasharray="3" />
    <XAxis dataKey="name" />
    <YAxis  />
    <Tooltip cursor={false}  />
    <Legend />
    <Bar dataKey="Followers" fill="#FDAC53" >
        {data.map((item:any, index:any) => {
            return <Cell fill={getRandomColor(index)} key={index} />
        })}
        </Bar>
  </BarChart>
       </ResponsiveContainer>}
    </div>
 }
 function setData(data:Array<any>){
    return data?.map(item => {
        return {
            name: item.destination,
            Followers: item.ammount_of_followers,
        }
    })
 }
 