import { JoinedResult } from '../../models/result'
import { getResults } from '../apis/results'
import type { ThunkAction } from '../store'

export const FETCH_RESULTS_PENDING = 'FETCH_RESULTS_PENDING'
export const FETCH_RESULTS_FULFILLED = 'FETCH_RESULTS_FULFILLED'
export const FETCH_RESULTS_REJECTED = 'FETCH_RESULTS_REJECTED'

export type ResultsAction =
  | {
      type: typeof FETCH_RESULTS_PENDING
      payload: void
    }
  | {
      type: typeof FETCH_RESULTS_FULFILLED
      payload: JoinedResult[]
    }
  | {
      type: typeof FETCH_RESULTS_REJECTED
      payload: string
    }

export function fetchResultPending(): ResultsAction {
  return {
    type: FETCH_RESULTS_PENDING,
  } as ResultsAction
}

export function fetchResultsFulfilled(results: JoinedResult[]): ResultsAction {
  return {
    type: FETCH_RESULTS_FULFILLED,
    payload: results,
  }
}

export function fetchResultsRejected(errMessage: string): ResultsAction {
  return {
    type: FETCH_RESULTS_REJECTED,
    payload: errMessage,
  }
}

export function fetchResults(token: string): ThunkAction {
  return (dispatch) => {
    dispatch(fetchResultPending())
    return getResults(token)
      .then((results) => {
        dispatch(fetchResultsFulfilled(results))
      })
      .catch((err) => {
        dispatch(fetchResultsRejected(err.errMessage))
      })
  }
}
