import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import BottomNav from '../components/BottomNav.jsx'
import { createSong } from '../redux/feature.js'

const UploadSongPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { uploadStatus, uploadError } = useSelector((state) => state.songs)

  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const result = await dispatch(createSong(formData))

    if (createSong.fulfilled.match(result)) {
      navigate('/home')
    }
  }

  return (
    <main className="flex min-h-screen justify-center bg-[#f3f4f6] font-sans text-[#111827]">
      <section className="relative h-screen w-full max-w-101 overflow-hidden bg-white px-6.25 pt-11">
        <Link
          className="flex h-5 items-center gap-3 text-sm text-[#6b7280] no-underline"
          to="/home"
        >
          <FiArrowLeft aria-hidden="true" className="h-5 w-5" />
          Back
        </Link>

        <form className="mt-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <input
              aria-label="Song Title"
              className="h-14.5 rounded-[17px] border border-[#e5e7eb] bg-white px-5.25 text-sm outline-none placeholder:text-[#9ca3af] focus:border-[#cbd5e1]"
              name="title"
              placeholder="Song Title"
              required
            />
            <input
              aria-label="Artist Name"
              className="h-14.5 rounded-[17px] border border-[#e5e7eb] bg-white px-5.25 text-sm outline-none placeholder:text-[#9ca3af] focus:border-[#cbd5e1]"
              name="artist"
              placeholder="Artist Name"
              required
            />
          </div>

          <div className="mt-5.5 grid grid-cols-2 gap-3">
            <label className="flex h-12 cursor-pointer items-center justify-center rounded-full bg-[#f1eee8] px-2 text-sm">
              Upload Audio File
              <input accept="audio/*" className="sr-only" name="file" required type="file" />
            </label>
            <label className="flex h-12 cursor-pointer items-center justify-center rounded-full bg-[#f1eee8] px-2 text-sm">
              Upload image File
              <input accept="image/*" className="sr-only" name="albumCover" type="file" />
            </label>
          </div>

          {uploadError && (
            <p className="absolute bottom-42 left-6.25 right-6.25 text-center text-sm text-red-600" role="alert">
              {uploadError}
            </p>
          )}

          <button
            aria-label="Upload song"
            className="absolute bottom-23 left-6.25 right-6.25 h-14.5 rounded-[17px] bg-black text-sm text-white"
            disabled={uploadStatus === 'loading'}
            type="submit"
          >
            {uploadStatus === 'loading' ? 'Uploading...' : 'Upload Song'}
          </button>
        </form>

        <BottomNav active="upload" />
      </section>
    </main>
  )
}

export default UploadSongPage