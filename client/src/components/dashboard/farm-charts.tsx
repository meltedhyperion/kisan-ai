'use client';

import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';
import { getSensorReadings } from '@/lib/data';
import type { SensorReading } from '@/lib/types';
import { Skeleton } from '../ui/skeleton';

interface FarmChartsProps {
    farmId: string;
}

const renderChart = (data: SensorReading[], dataKey: keyof SensorReading, name: string, unit: string, color: string) => (
    <div className="h-64">
        <h3 className="font-semibold text-center mb-2">{name}</h3>
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))"/>
                <XAxis 
                    dataKey="timestamp" 
                    tickFormatter={(ts) => format(new Date(ts), 'MMM d')}
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                />
                <YAxis 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickFormatter={(value) => `${value}${unit}`}
                 />
                <Tooltip 
                    contentStyle={{ 
                        backgroundColor: 'hsl(var(--background))',
                        border: '1px solid hsl(var(--border))'
                    }}
                    labelFormatter={(label) => format(new Date(label), 'PPP')}
                />
                <Legend />
                <Line type="monotone" dataKey={dataKey} name={name} stroke={color} strokeWidth={2} dot={false} />
            </LineChart>
        </ResponsiveContainer>
    </div>
);


export default function FarmCharts({ farmId }: FarmChartsProps) {
    const [data, setData] = useState<SensorReading[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const readings = await getSensorReadings(farmId);
            setData(readings);
            setLoading(false);
        };
        fetchData();
    }, [farmId]);

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Skeleton className="h-64 w-full" />
                <Skeleton className="h-64 w-full" />
                <Skeleton className="h-64 w-full" />
                <Skeleton className="h-64 w-full" />
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
            {renderChart(data, 'soilMoisture', 'Soil Moisture', '%', 'hsl(var(--chart-1))')}
            {renderChart(data, 'temperature', 'Temperature', '°C', 'hsl(var(--chart-2))')}
            {renderChart(data, 'lightIntensity', 'Light Intensity', ' Lux', 'hsl(var(--chart-4))')}
            {renderChart(data, 'rainfall', 'Rainfall', 'mm', 'hsl(var(--chart-5))')}
        </div>
    );
}
