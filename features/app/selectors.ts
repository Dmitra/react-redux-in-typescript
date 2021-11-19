import type { RootState } from 'model'

export const loading = (state: RootState) => state.app.loading

export const selectors = {
  loading,
}