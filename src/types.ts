// Statistical data
///////////////////

export interface DailyStat {
    date: Date
    confirmed: number
    deaths: number 
    recovered: number 
}

export interface CovidStats {
    totalConfirmedCases: number
    totalDeaths: number
    totalRecoveredCases: number
    dailyStats: DailyStat[] // history
}



// Daily news
/////////////

export interface NewsStory {
    title: string
    excerpt: string 
    url: string 
    image: string | null
    date: Date 
    source: string 
}
