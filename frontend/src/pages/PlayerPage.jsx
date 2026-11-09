import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FiArrowLeft } from 'react-icons/fi'
import AudioPlayer from 'react-h5-audio-player'
import { setIsPlaying } from '../redux/feature.js'
import { getSongById } from '../songApi.js'

const PlayerPage = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const songs = useSelector((state) => state.songs.items)
  const selectedSong = location.state?.song ?? songs[songs.length - 1]
  const [currentSong, setCurrentSong] = useState(selectedSong)

  useEffect(() => {
    let isCurrent = true
    setCurrentSong(selectedSong)

    if (!selectedSong?.id) {
      return () => {
        isCurrent = false
      }
    }

    getSongById(selectedSong.id)
      .then((song) => {
        if (isCurrent) setCurrentSong(song)
      })
      .catch((error) => {
        if (isCurrent && error.response?.status === 404) setCurrentSong(null)
      })

    return () => {
      isCurrent = false
    }
  }, [selectedSong])

  if (!currentSong) {
    return (
      <main className="flex min-h-screen justify-center bg-[#f3f4f6] font-sans text-[#111827]">
        <section className="min-h-screen w-full max-w-101 bg-white px-6.25 pt-12">
          <Link className="text-sm text-[#6b7280] no-underline" to="/home">
            Back
          </Link>
          <p className="pt-8 text-center text-sm text-[#9ca3af]" role="status">
            No song selected.
          </p>
        </section>
      </main>
    )
  }

  const audioSource = currentSong.songfile

  return (
    <main className="flex min-h-screen justify-center bg-[#f3f4f6] font-sans text-[#111827]">
      <section className="min-h-screen w-full max-w-101 bg-white px-6.25 pt-12">
        <Link
          className="flex h-5 items-center gap-3 text-sm text-[#6b7280] no-underline"
          to="/home"
        >
          <FiArrowLeft aria-hidden="true" className="h-5 w-5" />
          Back
        </Link>

        <img
          alt={`${currentSong.title} album cover`}
          className="mt-4 aspect-square w-full rounded-[22px] object-cover"
          src={currentSong.cover}
        />

        <div className="mt-10">
          <h1 className="text-2xl font-bold leading-7.25">{currentSong.title}</h1>
          <p className="mt-2 text-base text-[#9ca3af]">{currentSong.artist}</p>
        </div>

        <div className="mt-6">
          {audioSource ? (
            <AudioPlayer
              autoPlayAfterSrcChange={false}
              className="rounded-xl! bg-white! shadow-none!"
              onEnded={() => dispatch(setIsPlaying(false))}
              onPause={() => dispatch(setIsPlaying(false))}
              onPlay={() => dispatch(setIsPlaying(true))}
              showJumpControls={false}
              showSkipControls={false}
              src={audioSource}
            />
          ) : (
            <p className="py-5 text-center text-sm text-[#9ca3af]" role="status">
              Audio isn&apos;t available for this song.
            </p>
          )}
        </div>
      </section>
    </main>
  )
}

export default PlayerPage