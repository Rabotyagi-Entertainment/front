import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { authApi, internshipApi, diaryApi, DiaryAdmin } from '../../shared'
import { internshipAdminApi } from '../../shared/api/internshipAdmin/InternshipAdminRequest.ts'

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [internshipApi.reducerPath]: internshipApi.reducer,
    [internshipAdminApi.reducerPath]: internshipAdminApi.reducer,
    [diaryApi.reducerPath]: diaryApi.reducer,
    [DiaryAdmin.reducerPath]: DiaryAdmin.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      diaryApi.middleware,
      internshipAdminApi.middleware,
      internshipApi.middleware,
      authApi.middleware,
      DiaryAdmin.middleware
    ),
})

setupListeners(store.dispatch)
