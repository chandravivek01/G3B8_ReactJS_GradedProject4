// Presenting a structure/ layout to the all the Movie-Documents in general.
export default interface IMovie {
    id: number,
    title: string,
    year: string,
    genres: string[],
    ratings: number[],
    poster: string,
    contentRating: string,
    duration: string,
    releaseDate: string,
    averageRating: number,
    originalTitle: string,
    storyline: string,
    actors: string[],
    imdbRating: number,
    posterurl: string
}
