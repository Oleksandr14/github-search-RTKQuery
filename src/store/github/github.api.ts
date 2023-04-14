import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"; 
import {ServerResponse, IUser, IRepo } from "../../modules/modules";

export const githubApi = createApi({
    reducerPath: 'github/api', // вказує по якому адресу будуть закешовані дані в сторі коли буду працювати з апішкою
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.github.com/'
    }),
    refetchOnFocus: true,
    endpoints: build => ({
         searchUsers: build.query<IUser[], string>({ // прописуюдженерик в якому вказую тип параметрів які отримую від сервепа,а другим дженериком вказую тип параметра за допомогою якого буде запит
            query: (search: string) => ({
                url: 'search/users',
                params: {
                    q: search,
                    per_page: 10
                }
            }),
            transformResponse: (response: ServerResponse<IUser>) => response.items  // дістаю конкретні дані які мені потрібні
         }), 
         getUserRepos: build.query<IRepo[], string>({
            query: (username: string) => ({
                url: `users/${username}/repos`
            })
         })
    })
})

export const {useSearchUsersQuery, useLazyGetUserReposQuery} = githubApi // хук допомагає зрозуміти, що знаходиться в ендпоінтах і ми можемо використовувати його в наших компонентах