import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import AudioPlayer from 'react-h5-audio-player'
import { setIsPlaying } from '../redux/feature.js'

const MiniPlayer = ({ song }) => {
  const dispatch = useDispatch()

  return (
    <div className="absolute inset-x-3.5 bottom-19 flex h-18 items-center rounded-2xl border border-[#eeeeee] bg-white px-3 shadow-[0_2px_8px_rgba(0,0,0,0.03)]">
      <Link
        className="flex min-w-0 flex-1 items-center text-inherit no-underline"
        state={{ song }}
        to="/player"
      >
        <img
          alt=""
          className="h-12 w-12 shrink-0 rounded-lg object-cover"
          src={song.cover}
        />
        <div className="ml-3 min-w-0 flex-1">
          <p className="truncate text-sm leading-5">{song.title}</p>
          <p className="truncate text-xs leading-4 text-[#9ca3af]">{song.artist}</p>
        </div>
      </Link>
      <div className="ml-2 h-10.5 w-10.5 shrink-0">
        <AudioPlayer
          className="mini-audio-player h-full! min-w-10.5! w-full! shrink-0! border-0! bg-transparent! p-0! shadow-none! [&_.rhap_main]:h-full! [&_.rhap_main]:w-full! [&_.rhap_main]:flex-none! [&_.rhap_controls-section]:m-0! [&_.rhap_controls-section]:h-full! [&_.rhap_controls-section]:w-full! [&_.rhap_controls-section]:flex-none! [&_.rhap_main-controls]:m-0! [&_.rhap_main-controls]:h-full! [&_.rhap_main-controls]:w-full! [&_.rhap_main-controls]:flex-none! [&_.rhap_play-pause-button]:m-0! [&_.rhap_play-pause-button]:h-10.5! [&_.rhap_play-pause-button]:w-10.5! [&_.rhap_play-pause-button]:min-w-10.5! [&_.rhap_play-pause-button]:shrink-0! [&_.rhap_play-pause-button]:rounded-full! [&_.rhap_play-pause-button]:bg-black! [&_.rhap_play-pause-button]:text-sm! [&_.rhap_play-pause-button]:text-white!"
          customControlsSection={['MAIN_CONTROLS']}
          customProgressBarSection={[]}
          onEnded={() => dispatch(setIsPlaying(false))}
          onPause={() => dispatch(setIsPlaying(false))}
          onPlay={() => dispatch(setIsPlaying(true))}
          showJumpControls={false}
          showSkipControls={false}
          src={song.songfile}
        />
      </div>
    </div>
  )
}

export default MiniPlayer