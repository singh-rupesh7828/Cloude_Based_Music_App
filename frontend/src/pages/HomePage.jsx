import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FaChartBar } from 'react-icons/fa'
import BottomNav from '../components/BottomNav.jsx'
import MiniPlayer from '../components/MiniPlayer.jsx'

const HomePage = () => {
  const { items: songs, status, error } = useSelector((state) => state.songs)

  return (
    <main className="flex min-h-screen justify-center bg-[#f3f4f6] font-sans text-[#111827]">
      <section className="relative flex h-screen w-full max-w-101 flex-col overflow-hidden bg-white">
        <header className="flex shrink-0 items-center justify-between px-6.25 pb-3 pt-12">
          <h1 className="text-2xl font-semibold leading-7.25">Songs</h1>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto px-6.25 pb-55">
          {error && <p className="py-3 text-sm text-red-600" role="alert">{error}</p>}
          {songs.length === 0 ? (
            <p className="pt-6 text-center text-sm text-[#9ca3af]">
              {status === 'idle' || status === 'loading'
                ? 'Loading songs...'
                : 'No songs available'}
            </p>
          ) : (
            songs.map((song, index) => (
              <div className="flex h-21 items-center gap-4.5" key={song.id ?? song.title}>
                <Link
                  className="flex min-w-0 flex-1 items-center gap-4.5 text-inherit no-underline"
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
                {index === songs.length - 1 && (
                  <FaChartBar aria-label="Now playing" className="h-5 w-5 shrink-0" />
                )}
              </div>
            ))
          )}
        </div>

        {songs.length > 0 && <MiniPlayer song={songs[songs.length - 1]} />}
        <BottomNav active="home" />
      </section>
    </main>
  )
}

export default HomePage