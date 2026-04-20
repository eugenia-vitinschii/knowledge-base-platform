//Chart data

export interface ChartDataset {
   data: number[]
   backgroundColor?: string[]
}

export interface ChartData {
   labels: string[]
   datasets: ChartDataset[]
}