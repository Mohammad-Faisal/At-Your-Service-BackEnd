
import { createAction, createReducer } from '@reduxjs/toolkit'
const initialState = {}
const resetAction = createAction('reset-tracked-loading-state')

function isPendingAction(action) {
    return action.type.endsWith('/pending')
}

const finishedReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(resetAction, () => initialState)
        .addMatcher(isPendingAction, (state, action) => {
            const requestName = action.type.replace('/pending', '')
            //state[requestName] = false
        })
        .addMatcher(
            (action) => action.type.endsWith('/rejected'),
            (state, action) => {
                const requestName = action.type.replace('/rejected', '')
                //state[requestName] = Math.random()
            }
        )
        .addMatcher(
            (action) => action.type.endsWith('/fulfilled'),
            (state, action) => {
                const requestName = action.type.replace('/fulfilled', '')
                state[requestName] =  Math.random()
            }
        )
})


export default finishedReducer