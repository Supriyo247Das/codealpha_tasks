class MusicPlayer {
    constructor() {
        // Audio element and playlist data
        this.audioPlayer = document.getElementById('audioPlayer');
        this.playlist = [];
        this.currentTrackIndex = 0;
        this.isPlaying = false;
        this.isShuffled = false;
        this.repeatMode = 0; // 0: no repeat, 1: repeat all, 2: repeat one
        this.originalPlaylist = [];

        // DOM elements
        this.initializeElements();
        
        // Event listeners
        this.initializeEventListeners();
        
        // Initialize theme
        this.initializeTheme();
        
        // Load saved playlist if exists
        this.loadSavedPlaylist();
    }

    initializeElements() {
        // File upload elements
        this.fileInput = document.getElementById('fileInput');
        this.uploadArea = document.getElementById('uploadArea');
        this.uploadBtn = document.getElementById('uploadBtn');

        // Search and filter elements
        this.searchInput = document.getElementById('searchInput');
        this.genreFilter = document.getElementById('genreFilter');
        this.artistFilter = document.getElementById('artistFilter');

        // Player control elements
        this.playPauseBtn = document.getElementById('playPauseBtn');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.shuffleBtn = document.getElementById('shuffleBtn');
        this.repeatBtn = document.getElementById('repeatBtn');

        // Progress and volume elements
        this.progressSlider = document.getElementById('progressSlider');
        this.progressFill = document.getElementById('progressFill');
        this.currentTimeSpan = document.getElementById('currentTime');
        this.totalTimeSpan = document.getElementById('totalTime');
        this.volumeSlider = document.getElementById('volumeSlider');

        // Track info elements
        this.currentTitle = document.getElementById('currentTitle');
        this.currentArtist = document.getElementById('currentArtist');
        this.currentGenre = document.getElementById('currentGenre');

        // Playlist elements
        this.playlistElement = document.getElementById('playlist');
        this.clearPlaylistBtn = document.getElementById('clearPlaylistBtn');
        this.savePlaylistBtn = document.getElementById('savePlaylistBtn');
        this.loadPlaylistBtn = document.getElementById('loadPlaylistBtn');

        // Theme toggle
        this.themeToggle = document.getElementById('themeToggle');
    }

    initializeEventListeners() {
        // File upload events
        this.uploadBtn.addEventListener('click', () => this.fileInput.click());
        this.fileInput.addEventListener('change', (e) => this.handleFileUpload(e));
        
        // Drag and drop events
        this.uploadArea.addEventListener('dragover', (e) => this.handleDragOver(e));
        this.uploadArea.addEventListener('dragleave', (e) => this.handleDragLeave(e));
        this.uploadArea.addEventListener('drop', (e) => this.handleFileDrop(e));
        this.uploadArea.addEventListener('click', () => this.fileInput.click());

        // Player control events
        this.playPauseBtn.addEventListener('click', () => this.togglePlayPause());
        this.prevBtn.addEventListener('click', () => this.previousTrack());
        this.nextBtn.addEventListener('click', () => this.nextTrack());
        this.shuffleBtn.addEventListener('click', () => this.toggleShuffle());
        this.repeatBtn.addEventListener('click', () => this.toggleRepeat());

        // Audio events
        this.audioPlayer.addEventListener('loadedmetadata', () => this.updateTrackInfo());
        this.audioPlayer.addEventListener('timeupdate', () => this.updateProgress());
        this.audioPlayer.addEventListener('ended', () => this.handleTrackEnd());

        // Progress and volume events
        this.progressSlider.addEventListener('input', () => this.seekTo());
        this.volumeSlider.addEventListener('input', () => this.setVolume());

        // Search and filter events
        this.searchInput.addEventListener('input', () => this.filterPlaylist());
        this.genreFilter.addEventListener('change', () => this.filterPlaylist());
        this.artistFilter.addEventListener('change', () => this.filterPlaylist());

        // Playlist action events
        this.clearPlaylistBtn.addEventListener('click', () => this.clearPlaylist());
        this.savePlaylistBtn.addEventListener('click', () => this.savePlaylist());
        this.loadPlaylistBtn.addEventListener('click', () => this.loadPlaylistFromFile());

        // Theme toggle event
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
    }

    initializeTheme() {
        const savedTheme = localStorage.getItem('musicPlayerTheme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        this.updateThemeToggleIcon(savedTheme);
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('musicPlayerTheme', newTheme);
        this.updateThemeToggleIcon(newTheme);
    }

    updateThemeToggleIcon(theme) {
        const icon = this.themeToggle.querySelector('i');
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }

    // File handling methods
    handleFileUpload(event) {
        const files = Array.from(event.target.files);
        this.processFiles(files);
    }

    handleDragOver(event) {
        event.preventDefault();
        this.uploadArea.classList.add('dragover');
    }

    handleDragLeave(event) {
        event.preventDefault();
        this.uploadArea.classList.remove('dragover');
    }

    handleFileDrop(event) {
        event.preventDefault();
        this.uploadArea.classList.remove('dragover');
        const files = Array.from(event.dataTransfer.files);
        this.processFiles(files);
    }

    async processFiles(files) {
        const audioFiles = files.filter(file => file.type.startsWith('audio/'));
        
        for (const file of audioFiles) {
            const track = await this.createTrackFromFile(file);
            this.playlist.push(track);
        }

        this.originalPlaylist = [...this.playlist];
        this.updatePlaylistDisplay();
        this.updateFilters();
        
        if (this.playlist.length === 1) {
            this.loadTrack(0);
        }
    }

    async createTrackFromFile(file) {
        return new Promise((resolve) => {
            const audio = new Audio();
            const url = URL.createObjectURL(file);
            
            audio.addEventListener('loadedmetadata', () => {
                const track = {
                    id: Date.now() + Math.random(),
                    title: this.extractTitle(file.name),
                    artist: 'Unknown Artist',
                    genre: 'Unknown',
                    duration: audio.duration,
                    url: url,
                    file: file
                };
                
                resolve(track);
            });
            
            audio.src = url;
        });
    }

    extractTitle(filename) {
        return filename.replace(/\.[^/.]+$/, "").replace(/[-_]/g, ' ');
    }

    // Player control methods
    togglePlayPause() {
        if (this.playlist.length === 0) return;

        if (this.isPlaying) {
            this.audioPlayer.pause();
        } else {
            this.audioPlayer.play();
        }
    }

    previousTrack() {
        if (this.playlist.length === 0) return;

        if (this.isShuffled) {
            this.currentTrackIndex = Math.floor(Math.random() * this.playlist.length);
        } else {
            this.currentTrackIndex = this.currentTrackIndex > 0 ? this.currentTrackIndex - 1 : this.playlist.length - 1;
        }
        
        this.loadTrack(this.currentTrackIndex);
        if (this.isPlaying) {
            this.audioPlayer.play();
        }
    }

    nextTrack() {
        if (this.playlist.length === 0) return;

        if (this.isShuffled) {
            this.currentTrackIndex = Math.floor(Math.random() * this.playlist.length);
        } else {
            this.currentTrackIndex = this.currentTrackIndex < this.playlist.length - 1 ? this.currentTrackIndex + 1 : 0;
        }
        
        this.loadTrack(this.currentTrackIndex);
        if (this.isPlaying) {
            this.audioPlayer.play();
        }
    }

    toggleShuffle() {
        this.isShuffled = !this.isShuffled;
        this.shuffleBtn.classList.toggle('active', this.isShuffled);
        
        if (this.isShuffled) {
            this.shufflePlaylist();
        } else {
            this.playlist = [...this.originalPlaylist];
            this.updatePlaylistDisplay();
        }
    }

    shufflePlaylist() {
        const currentTrack = this.playlist[this.currentTrackIndex];
        const shuffled = [...this.playlist];
        
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        
        this.playlist = shuffled;
        this.currentTrackIndex = this.playlist.findIndex(track => track.id === currentTrack.id);
        this.updatePlaylistDisplay();
    }

    toggleRepeat() {
        this.repeatMode = (this.repeatMode + 1) % 3;
        const icon = this.repeatBtn.querySelector('i');
        
        switch (this.repeatMode) {
            case 0:
                this.repeatBtn.classList.remove('active');
                icon.className = 'fas fa-redo';
                break;
            case 1:
                this.repeatBtn.classList.add('active');
                icon.className = 'fas fa-redo';
                break;
            case 2:
                this.repeatBtn.classList.add('active');
                icon.className = 'fas fa-redo-alt';
                break;
        }
    }

    loadTrack(index) {
        if (index < 0 || index >= this.playlist.length) return;

        this.currentTrackIndex = index;
        const track = this.playlist[index];
        
        this.audioPlayer.src = track.url;
        this.updateCurrentTrackDisplay(track);
        this.updatePlaylistDisplay();
    }

    updateCurrentTrackDisplay(track) {
        this.currentTitle.textContent = track.title;
        this.currentArtist.textContent = track.artist;
        this.currentGenre.textContent = track.genre;
    }

    handleTrackEnd() {
        if (this.repeatMode === 2) { // Repeat one
            this.audioPlayer.currentTime = 0;
            this.audioPlayer.play();
        } else if (this.repeatMode === 1 || this.currentTrackIndex < this.playlist.length - 1) { // Repeat all or not last track
            this.nextTrack();
        } else {
            this.isPlaying = false;
            this.updatePlayPauseButton();
        }
    }

    // Audio event handlers
    updateTrackInfo() {
        this.totalTimeSpan.textContent = this.formatTime(this.audioPlayer.duration);
        this.progressSlider.max = this.audioPlayer.duration;
    }

    updateProgress() {
        const currentTime = this.audioPlayer.currentTime;
        const duration = this.audioPlayer.duration;
        
        if (duration) {
            const progressPercent = (currentTime / duration) * 100;
            this.progressFill.style.width = progressPercent + '%';
            this.progressSlider.value = currentTime;
        }
        
        this.currentTimeSpan.textContent = this.formatTime(currentTime);
        
        // Update play/pause button state
        this.isPlaying = !this.audioPlayer.paused;
        this.updatePlayPauseButton();
    }

    updatePlayPauseButton() {
        const icon = this.playPauseBtn.querySelector('i');
        icon.className = this.isPlaying ? 'fas fa-pause' : 'fas fa-play';
    }

    seekTo() {
        this.audioPlayer.currentTime = this.progressSlider.value;
    }

    setVolume() {
        this.audioPlayer.volume = this.volumeSlider.value / 100;
    }

    formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';
        
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    // Playlist management methods
    updatePlaylistDisplay() {
        this.playlistElement.innerHTML = '';
        
        if (this.playlist.length === 0) {
            this.playlistElement.innerHTML = '<div class="empty-playlist">No tracks in playlist. Upload some music files to get started!</div>';
            return;
        }

        this.playlist.forEach((track, index) => {
            const listItem = this.createPlaylistItem(track, index);
            this.playlistElement.appendChild(listItem);
        });
    }

    createPlaylistItem(track, index) {
        const li = document.createElement('li');
        li.className = 'playlist-item';
        if (index === this.currentTrackIndex) {
            li.classList.add('active');
        }

        li.innerHTML = `
            <div class="track-number">${index + 1}</div>
            <div class="track-info-playlist">
                <div class="track-title">${track.title}</div>
                <div class="track-meta">${track.artist} • ${track.genre}</div>
            </div>
            <div class="track-duration">${this.formatTime(track.duration)}</div>
            <button class="remove-track" data-index="${index}">
                <i class="fas fa-times"></i>
            </button>
        `;

        // Add event listeners
        li.addEventListener('click', (e) => {
            if (!e.target.closest('.remove-track')) {
                this.loadTrack(index);
                if (this.isPlaying) {
                    this.audioPlayer.play();
                }
            }
        });

        li.querySelector('.remove-track').addEventListener('click', (e) => {
            e.stopPropagation();
            this.removeTrack(index);
        });

        return li;
    }

    removeTrack(index) {
        this.playlist.splice(index, 1);
        this.originalPlaylist = this.originalPlaylist.filter(track => 
            track.id !== this.playlist[index]?.id
        );

        if (index === this.currentTrackIndex) {
            if (this.playlist.length > 0) {
                this.currentTrackIndex = Math.min(this.currentTrackIndex, this.playlist.length - 1);
                this.loadTrack(this.currentTrackIndex);
            } else {
                this.audioPlayer.src = '';
                this.currentTitle.textContent = 'No track selected';
                this.currentArtist.textContent = 'Unknown Artist';
                this.currentGenre.textContent = 'Unknown Genre';
            }
        } else if (index < this.currentTrackIndex) {
            this.currentTrackIndex--;
        }

        this.updatePlaylistDisplay();
        this.updateFilters();
    }

    clearPlaylist() {
        if (confirm('Are you sure you want to clear the entire playlist?')) {
            this.playlist = [];
            this.originalPlaylist = [];
            this.currentTrackIndex = 0;
            this.audioPlayer.src = '';
            this.audioPlayer.pause();
            this.isPlaying = false;
            
            this.currentTitle.textContent = 'No track selected';
            this.currentArtist.textContent = 'Unknown Artist';
            this.currentGenre.textContent = 'Unknown Genre';
            
            this.updatePlaylistDisplay();
            this.updateFilters();
            this.updatePlayPauseButton();
        }
    }

    // Filter and search methods
    filterPlaylist() {
        const searchTerm = this.searchInput.value.toLowerCase();
        const selectedGenre = this.genreFilter.value;
        const selectedArtist = this.artistFilter.value;

        const filteredPlaylist = this.originalPlaylist.filter(track => {
            const matchesSearch = track.title.toLowerCase().includes(searchTerm) ||
                                track.artist.toLowerCase().includes(searchTerm) ||
                                track.genre.toLowerCase().includes(searchTerm);
            
            const matchesGenre = !selectedGenre || track.genre === selectedGenre;
            const matchesArtist = !selectedArtist || track.artist === selectedArtist;

            return matchesSearch && matchesGenre && matchesArtist;
        });

        this.playlist = filteredPlaylist;
        this.currentTrackIndex = 0;
        this.updatePlaylistDisplay();

        if (this.playlist.length > 0) {
            this.loadTrack(0);
        }
    }

    updateFilters() {
        // Update genre filter
        const genres = [...new Set(this.originalPlaylist.map(track => track.genre))];
        this.genreFilter.innerHTML = '<option value="">All Genres</option>';
        genres.forEach(genre => {
            const option = document.createElement('option');
            option.value = genre;
            option.textContent = genre;
            this.genreFilter.appendChild(option);
        });

        // Update artist filter
        const artists = [...new Set(this.originalPlaylist.map(track => track.artist))];
        this.artistFilter.innerHTML = '<option value="">All Artists</option>';
        artists.forEach(artist => {
            const option = document.createElement('option');
            option.value = artist;
            option.textContent = artist;
            this.artistFilter.appendChild(option);
        });
    }

    // Playlist save/load methods
    savePlaylist() {
        if (this.playlist.length === 0) {
            alert('No tracks in playlist to save!');
            return;
        }

        const playlistData = {
            name: 'My Playlist',
            tracks: this.playlist.map(track => ({
                title: track.title,
                artist: track.artist,
                genre: track.genre,
                duration: track.duration
            }))
        };

        const dataStr = JSON.stringify(playlistData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = 'playlist.json';
        link.click();

        // Also save to localStorage
        localStorage.setItem('musicPlayerPlaylist', dataStr);
    }

    loadPlaylistFromFile() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        
        input.addEventListener('change', async (e) => {
            const file = e.target.files[0];
            if (!file) return;

            try {
                const text = await file.text();
                const playlistData = JSON.parse(text);
                
                if (playlistData.tracks && Array.isArray(playlistData.tracks)) {
                    // Note: This will only load the metadata, not the actual audio files
                    alert('Playlist structure loaded! You\'ll need to re-upload the actual audio files.');
                    console.log('Loaded playlist:', playlistData);
                }
            } catch (error) {
                alert('Error loading playlist file!');
                console.error('Error:', error);
            }
        });

        input.click();
    }

    loadSavedPlaylist() {
        const savedPlaylist = localStorage.getItem('musicPlayerPlaylist');
        if (savedPlaylist) {
            try {
                const playlistData = JSON.parse(savedPlaylist);
                console.log('Found saved playlist:', playlistData);
                // Note: This would only load metadata, not actual files
            } catch (error) {
                console.error('Error loading saved playlist:', error);
            }
        }
    }
}

// Initialize the music player when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const musicPlayer = new MusicPlayer();
    
    // Make it globally accessible for debugging
    window.musicPlayer = musicPlayer;
    
    console.log('Music Player initialized successfully!');
});
