import api from './api.js'

const normalizeSong = (song) => ({
  id: song._id,
  title: song.title,
  artist: song.artist,
  cover: song.cover,
  songfile: song.songfile,
})

export const getSongs = async () => {
  const { data } = await api.get('/songs/getAllSong')
  return data.songs.map(normalizeSong)
}

export const getSongById = async (id) => {
  const { data } = await api.get(`/songs/getSongById/${id}`)
  return normalizeSong(data.song)
}

export const uploadSong = async (formData) => {
  const { data } = await api.post('/songs/upload', formData)
  return normalizeSong(data.song)
}