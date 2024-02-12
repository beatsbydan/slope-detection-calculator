import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const Diagram:React.FC<{labels: any, data: any, label: string, text: string}> = (props) => {
    const chartRef = useRef<HTMLCanvasElement>(null);
    const chartInstanceRef = useRef<Chart | null>(null);
    
    useEffect(() => {
        if (chartRef.current) {
            const ctx = chartRef.current.getContext('2d');
            if (ctx) {
                // Destroy previous chart instance, if it exists
                if (chartInstanceRef.current) {
                    chartInstanceRef.current.destroy();
                    chartInstanceRef.current = null;
                }

                // Create new chart instance
                chartInstanceRef.current = new Chart(ctx, 
                    {
                        type: 'line',
                        data: {
                            labels: [...props.labels],
                            datasets: [{
                                label: props.label,
                                data: [...props.data],
                                borderColor: 'blue',
                                borderWidth: 2,
                            }],
                        },
                        options: {
                            scales: {
                                x: {
                                    title: {
                                        display: true,
                                        text: 'Node',
                                    },
                                },
                                y: {
                                    title: {
                                        display: true,
                                        text: props.text,
                                    },
                                },
                            },
                        },
                    });
                }
            }

        // Cleanup function
        return () => {
            // Destroy chart instance when component unmounts
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
                chartInstanceRef.current = null;
            }
        };
    }, [props.data, props.label, props.labels, props.text]);

    return <canvas ref={chartRef} />;
};

export default Diagram;
