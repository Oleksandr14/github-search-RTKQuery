import {useState} from 'react';
import { IRepo } from '../modules/modules';
import { useActions } from '../hooks/actions';
import { useAppSelector } from '../hooks/redux';

const RepoCard = ({repo}: {repo: IRepo}) => {

    const {addFavorites, removeFavorites} = useActions()
    const {favorites} = useAppSelector(state => state.github)

    const [isFav, setIsFav] = useState(favorites.includes(repo.html_url))

    const addToFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        addFavorites(repo.html_url)
        setIsFav(true)
    }

    const removeFromFavorite= (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        removeFavorites(repo.html_url)
        setIsFav(false)
    }

    return (
        <div className='border px-3 py-5 rounded cursor-pointer hover:shadow-md hover:bg-gray-100 transition-all'>
            <a href={repo.html_url} target='_blank'>
                <h2 className='text-lg font-bold '>{repo.full_name}</h2>
                <p className='text-sm'>
                    Forks: <span className='font-bold mr-2'>{repo.forks}</span>
                    Watchers: <span className='font-bold'>{repo.watchers}</span>
                </p>
                <p className='text-sm font-thin'>{repo?.description}</p>
                {!isFav && <button onClick={addToFavorite} className='py-2 mr-2 px-4 bg-yellow-400 rounded hover:shadow-md transition-all'>Add</button>}
                {isFav && <button onClick={removeFromFavorite} className='py-2 px-4 bg-red-400 rounded hover:shadow-md transition-all'>Remove</button>}
            </a>
        </div>
    );
};

export default RepoCard;