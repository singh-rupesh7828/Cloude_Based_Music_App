import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FiSearch } from 'react-icons/fi'
import BottomNav from '../components/BottomNav.jsx'
import MiniPlayer from '../components/MiniPlayer.jsx'
import { searchSongs, selectFilteredSongs } from '../redux/feature.js'

const SearchPage = () => {
  const dispatch = useDispatch()
  const query = useSelector((state) => state.songs.searchQuery)
  const results = useSelector(selectFilteredSongs)
  const { items: songs, status, error } = useSelector((state) => state.songs)

  return (
    <main className="flex min-h-screen justify-center bg-[#f3f4f6] font-sans text-[#111827]">
      <section className="relative flex h-screen w-full max-w-101 flex-col overflow-hidden bg-white">
        <header className="shrink-0 px-6.25 pb-4 pt-12">
          <h1 className="text-2xl font-semibold leading-7.25">Search</h1>
          <div className="mt-5 flex h-12 items-center rounded-[17px] bg-[#f4f0ea] px-4 focus-within:ring-2 focus-within:ring-black/10">
            <FiSearch
              aria-hidden="true"
              className="h-4 w-4 shrink-0 text-[#9ca3af]"
            />
            <input
              aria-label="Search songs"
              className="h-full min-w-0 flex-1 bg-transparent pl-5 pr-1 text-sm outline-none placeholder:text-[#9ca3af]"
              onChange={(event) => dispatch(searchSongs(event.target.value))}
              placeholder="Search songs"
              type="search"
              value={query}
            />
          </div>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto px-6.25 pb-42.5">
          {error && <p className="py-3 text-sm text-red-600" role="alert">{error}</p>}
          {results.map((song) => (
            <Link
              className="flex h-21 items-center gap-4.5 text-inherit no-underline"
              key={song.id ?? song.title}
              state={{ song }}
              to="/player"
            >
              <img
                alt=""
                className="h-14.5 w-14.5 shrink-0 rounded-[10px] object-cover"
                loading="lazy"
                src={song.cover}
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-base leading-5">{song.title}</p>
                <p className="mt-1 truncate text-sm leading-4 text-[#9ca3af]">
                  {song.artist}
                </p>
              </div>
            </Link>
          ))}
          {results.length === 0 && (
            <p className="pt-6 text-center text-sm text-[#9ca3af]">
              {status === 'idle' || status === 'loading'
                ? 'Loading songs...'
                : 'No songs found'}
            </p>
          )}
        </div>

        {songs.length > 0 && <MiniPlayer song={songs[songs.length - 1]} />}
        <BottomNav active="search" />
      </section>
    </main>
  )
}

export default SearchPage