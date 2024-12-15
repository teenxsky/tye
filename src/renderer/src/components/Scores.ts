export const loadScore = () => {
    const savedScore = localStorage.getItem('tye-highscore')
    if (savedScore !== null) {
        return JSON.parse(savedScore)
    }
    return 0
}

export const saveScore = (score: number) => {
    localStorage.removeItem('tye-highscore')
    localStorage.setItem('tye-highscore', JSON.stringify(score))
}