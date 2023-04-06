import { JoinedResult } from '../../models/result'
import {
  ResultsAction,
  FETCH_RESULTS_FULFILLED,
  FETCH_RESULTS_PENDING,
  FETCH_RESULTS_REJECTED,
} from '../actions/results'

interface ResultsState {
  data: JoinedResult[] | undefined
  error: string | undefined
  loading: boolean
}

const initialState: ResultsState = {
  data: undefined,
  error: undefined,
  loading: false,
}

const resultsReducer = (
  state = initialState,
  action: ResultsAction
): ResultsState => {
  const { type, payload } = action
  switch (type) {
    case FETCH_RESULTS_PENDING:
      return {
        data: undefined,
        error: undefined,
        loading: true,
      }
    case FETCH_RESULTS_FULFILLED:
      return {
        data: payload,
        error: undefined,
        loading: false,
      }
    case FETCH_RESULTS_REJECTED:
      return {
        data: undefined,
        error: payload,
        loading: false,
      }
    default:
      return state
  }
}

export default resultsReducer
