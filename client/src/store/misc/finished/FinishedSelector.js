export const selectFinished = (state , actionTypes) => {
    return state.finished[`${actionTypes}`]
}