export const errorAction = payload => {
    return {
        type: 'ERROR',
        payload: payload
    }
}
export const reset = () => {
    return {
        type: 'RESET'
    }
}