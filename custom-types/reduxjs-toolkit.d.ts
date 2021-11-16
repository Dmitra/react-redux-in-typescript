import { PayloadAction as RPayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../model'

declare module '@reduxjs/toolkit' {
    interface PayloadAction<P = void, T extends string = string> {
        payload: P,
        type: T,
        global: RootState,
        next: RootState,
    }
}