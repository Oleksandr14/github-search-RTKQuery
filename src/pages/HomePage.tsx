import {useState, useEffect} from 'react';
import { useSearchUsersQuery, useLazyGetUserReposQuery } from "../store/github/github.api"; // імпортую хук з github.api
import { useDebounce } from '../hooks/debounce';
import RepoCard from '../components/RepoCard';

const HomePage = () => {
    const [search, setSearch] = useState('')
    const [dropdown, setDropdown] = useState(false)
    const debounce = useDebounce(search)
    const {isLoading, isError, data} = useSearchUsersQuery(debounce, {
        skip: debounce.length < 3, // за якої умови не треба робити запит
        refetchOnFocus: true,
    }) // дістаю поняття , що відбувається якесь завантаження, помилку, дані
    const [fetchRepos, {isLoading: areReposLoading, data: repos}] = useLazyGetUserReposQuery()

    useEffect(() => {
        setDropdown(debounce.length > 3 && data?.length! > 0)
    }, [debounce, data])

    const clickHandler = (username: string) => {
        fetchRepos(username)
        setDropdown(false)
    }

    return (
        <div className="flex justify-center pt-10 mx-auto h-screen w-screen">
           {isError && (<p className="text-center text-red-600">Something went wrong</p>)}
        <div className="relative w-[560px]">
            
            <input value={search} onChange={e => setSearch(e.target.value)} type="text" className="border py-2 px-4 w-full h-[42px] mb-2" placeholder="Search for GitHub username..."/>
           { dropdown && <ul className="list-none absolute top-[42px] overflow-y-scroll left-0 right-0 max-h-[200px] shadow-md bg-white">
                {isLoading && <p className='text-center'>Loading...</p>}
                {data?.map(user => {
                    return <li onClick={() => clickHandler(user.login)} className='py-2 px-4 hover:bg-gray-500 hover:text-white transition-colors cursor-pointer' key={user.id}>
                        {user.login}
                        </li>
                })}
            </ul>}

        <div className='container'>
            {areReposLoading && <p className='text-center'>Repos are loading...</p>}
            {repos?.map(repo => <RepoCard repo={repo} key={repo.id}/>)}
        </div>
        </div>
       
        </div>
    );
};

export default HomePage;