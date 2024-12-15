export const loadScore = () => {
    const savedScore = localStorage.getItem('highscore')
    if (savedScore !== null) {
        return JSON.parse(savedScore)
    }
    return 0
}

export const saveScore = (score: number) => {
    localStorage.removeItem('highscore')
    localStorage.setItem('highscore', JSON.stringify(score))
}
