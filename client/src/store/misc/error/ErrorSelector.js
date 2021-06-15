export const selectError = (state , actionTypes) => {
    return state.error[`${actionTypes}`]
}