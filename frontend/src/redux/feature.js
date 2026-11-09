import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getSongs, uploadSong as uploadSongRequest } from '../songApi.js'

export const loadSongs = createAsyncThunk(
	'songs/load',
	async (_, { rejectWithValue }) => {
		try {
			return await getSongs()
		} catch (error) {
			return rejectWithValue(error.response?.data?.message ?? 'Unable to load songs.')
		}
	},
	{
		condition: (_, { getState }) => getState().songs.status === 'idle',
	},
)

export const createSong = createAsyncThunk(
	'songs/upload',
	async (formData, { rejectWithValue }) => {
		try {
			return await uploadSongRequest(formData)
		} catch (error) {
			return rejectWithValue(error.response?.data?.message ?? 'Unable to upload song.')
		}
	},
)

const songSlice = createSlice({
	name: 'songs',
	initialState: {
		items: [],
		searchQuery: '',
		isPlaying: false,
		status: 'idle',
		error: null,
		uploadStatus: 'idle',
		uploadError: null,
	},
	reducers: {
		setIsPlaying(state, action) {
			state.isPlaying = action.payload
		},
		searchSongs(state, action) {
			state.searchQuery = action.payload
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(loadSongs.pending, (state) => {
				state.status = 'loading'
				state.error = null
			})
			.addCase(loadSongs.fulfilled, (state, action) => {
				state.status = 'succeeded'
				state.items = action.payload
			})
			.addCase(loadSongs.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.payload ?? action.error.message
			})
			.addCase(createSong.pending, (state) => {
				state.uploadStatus = 'loading'
				state.uploadError = null
			})
			.addCase(createSong.fulfilled, (state, action) => {
				state.uploadStatus = 'succeeded'
				state.items.unshift(action.payload)
			})
			.addCase(createSong.rejected, (state, action) => {
				state.uploadStatus = 'failed'
				state.uploadError = action.payload ?? action.error.message
			})
	},
})

export const {
	setIsPlaying,
	searchSongs,
} = songSlice.actions

export const selectFilteredSongs = (state) => {
	const query = state.songs.searchQuery.trim().toLowerCase()
	return state.songs.items.filter((song) =>
		`${song.title} ${song.artist}`.toLowerCase().includes(query),
	)
}

export default songSlice.reducer
