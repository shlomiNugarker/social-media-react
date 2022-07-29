export function spendBalance(amount) {
  return async (dispatch) => {
    dispatch({ type: 'SPEND_BALANCE', amount })
  }
}
