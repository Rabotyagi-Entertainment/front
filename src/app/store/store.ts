import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { authApi } from '../../shared/api/Auth/AuthRequest.ts'
import { internshipAdminApi } from '../../shared/api/internshipAdmin/InternshipAdminRequest.ts'
import { internshipApi } from '../../shared/api/Internship/InternshipRequest.ts'
import { diaryApi } from '../../shared/api/Diary/DiaryRequest.ts'

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [internshipApi.reducerPath]: internshipApi.reducer,
    [internshipAdminApi.reducerPath]: internshipAdminApi.reducer,
    [diaryApi.reducerPath]: diaryApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      diaryApi.middleware,
      internshipAdminApi.middleware,
      internshipApi.middleware,
      authApi.middleware
    ),
})

setupListeners(store.dispatch)
