export const selectRequesting = (state , actionTypes) => {
    return actionTypes.some((actionType) => state.requesting[actionType])
}