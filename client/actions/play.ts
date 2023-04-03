export const FETCH_PLAY_CONTENT_PENDING = 'FETCH_PLAY_CONTENT_PENDING'

export type PlayAction = {
  type: typeof FETCH_PLAY_CONTENT_PENDING
  payload: void
}

export function fetchPlayContentPending(): PlayAction {
  return {
    type: FETCH_PLAY_CONTENT_PENDING,
  } as PlayAction
}
