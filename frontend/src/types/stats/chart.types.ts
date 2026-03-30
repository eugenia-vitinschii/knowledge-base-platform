//Chart data

export interface ChartDataset {
   data: number[]
}

export interface ChartData {
   labels: string[]
   datasests: ChartDataset[]
}