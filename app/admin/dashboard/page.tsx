"use client";

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const moduleData = [
    {
        title: "Bài viết",
        data: [10, 15, 12, 20, 8],
        labels: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5"],
        color: "#3b82f6",
    },
    {
        title: "Người dùng",
        data: [50, 60, 75, 80, 90],
        labels: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5"],
        color: "#22c55e",
    },
    {
        title: "Sản phẩm",
        data: [5, 8, 10, 6, 15],
        labels: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5"],
        color: "#a855f7",
    },
    {
        title: "Đơn hàng",
        data: [30, 40, 35, 50, 45],
        labels: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5"],
        color: "#f97316",
    },
    {
        title: "Liên hệ",
        data: [2, 5, 3, 4, 6],
        labels: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5"],
        color: "#ef4444",
    },
];

export default function Dashboard() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {moduleData.map((module, index) => (
                <Card key={index} className="p-4">
                    <CardHeader>
                        <CardTitle className="text-center text-lg font-medium">
                            {module.title}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Bar
                            data={{
                                labels: module.labels,
                                datasets: [
                                    {
                                        label: module.title,
                                        data: module.data,
                                        backgroundColor: module.color,
                                    },
                                ],
                            }}
                            options={{
                                responsive: true,
                                plugins: {
                                    legend: { display: false },
                                    tooltip: { enabled: true },
                                },
                                scales: {
                                    y: { beginAtZero: true },
                                },
                            }}
                        />
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
