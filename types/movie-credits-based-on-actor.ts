export interface MovieCreditsBasedOnActor {
    cast: Cast[]
    crew: Crew[]
    id: number
}

export interface Cast {
    id: number
    vote_average: number
    overview: string
    release_date: string
    vote_count: number
    adult: boolean
    backdrop_path?: string
    video: boolean
    genre_ids: number[]
    title: string
    original_language: string
    original_title: string
    poster_path?: string
    popularity: number
    character: string
    credit_id: string
    order: number
}

export interface Crew {
    overview: string
    release_date: string
    adult: boolean
    backdrop_path?: string
    genre_ids: number[]
    vote_count: number
    original_language: string
    original_title: string
    poster_path: string
    title: string
    video: boolean
    vote_average: number
    id: number
    popularity: number
    credit_id: string
    department: string
    job: string
}
