import React from 'react'
import { Bar } from 'react-chartjs-2';
import VacationsCard from '../VacationsCard';

export default function Reports({ adminVac }) {
    const [vacs, setvacs] = React.useState([])

    React.useEffect(() => {
        console.log(adminVac);
        for (let i = 0; i < adminVac.length; i++) {
            let filtered = adminVac.filter(el => el.followers.length > 0);
            setvacs(filtered)
        }
    }, [adminVac])

    return (
        <div className='chart-container'>
            <h1>Reports</h1>
            <Bar
                data={{
                    labels: vacs.map((item) => {
                        return (
                            item.description
                        )
                    }),
                    datasets: [{
                        label: 'Amount Of Followers Per Vacation',
                        data: vacs.map((item) => {
                            return (
                                item.followers.length
                            )
                        }),
                        backgroundColor: vacs.map(() => {
                            return (
                                'rgba(153, 102, 255, 0.2)'


                            )
                        }),
                        borderColor: vacs.map(() => {
                            return (
                                'rgb(153, 102, 255)'
                            )
                        }),
                        borderWidth: 1
                    }]
                }
                }
                width={100}
                height={50}
                options={{
                    maintainAspectRatio: false,
                    scales: {
                        yAxes: [
                            {
                                ticks: {
                                    beginAtZero: true,

                                }
                            }
                        ]
                    }
                }}
            />
        </div>
    )
}
