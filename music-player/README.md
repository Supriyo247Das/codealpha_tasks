# 🎵 Web Music Player

A feature-rich, responsive web-based music player built with HTML, CSS, and JavaScript. This project demonstrates DOM manipulation, Media APIs, state management, and modern web development practices.

## ✨ Features

### Core Functionality
- **File Upload**: Drag & drop or browse to upload multiple audio files
- **Playlist Management**: Create, manage, and organize your music collection
- **Playback Controls**: Play, pause, skip, previous, shuffle, and repeat modes
- **Volume Control**: Adjustable volume slider
- **Progress Control**: Seekable progress bar with time display
- **Search & Filter**: Search by title, artist, or genre with dynamic filtering

### User Experience
- **Dark/Light Theme**: Toggle between themes with persistence
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Drag & Drop Interface**: Intuitive file upload experience
- **Real-time Updates**: Live progress tracking and playlist updates
- **Keyboard Navigation**: Accessible interface design

### Advanced Features
- **Shuffle Mode**: Randomize playbook order
- **Repeat Modes**: No repeat, repeat all, repeat one
- **Playlist Export/Import**: Save and load playlists as JSON
- **Local Storage**: Remembers theme preference and playlist data
- **Genre/Artist Filtering**: Dynamic filter dropdowns
- **Track Duration Display**: Shows formatted time for each track

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Audio Handling**: HTML5 `<audio>` API
- **Storage**: localStorage, File API, Blob API
- **Styling**: CSS Custom Properties, Flexbox, Grid
- **Icons**: Font Awesome
- **Responsive**: CSS Media Queries

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional but recommended)

### Installation

1. **Clone or Download** the project files to your local machine

2. **File Structure**:
   ```
   music-player/
   ├── index.html          # Main HTML file
   ├── css/
   │   └── styles.css      # Main stylesheet
   ├── js/
   │   └── musicPlayer.js  # Main JavaScript functionality
   └── assets/             # (Optional) For additional resources
   ```

3. **Open the Application**:
   - **Option 1**: Double-click `index.html` to open in your browser
   - **Option 2**: Use a local server for best experience:
     ```bash
     # Using Python (if installed)
     python -m http.server 8000
     
     # Using Node.js (if installed)
     npx serve .
     
     # Using VS Code Live Server extension
     Right-click index.html → "Open with Live Server"
     ```

4. **Access the Application**:
   - Direct file: `file:///path/to/music-player/index.html`
   - Local server: `http://localhost:8000`

## 📖 Usage Guide

### Uploading Music
1. **Drag & Drop**: Drag audio files directly onto the upload area
2. **Browse Files**: Click "Choose Files" to select multiple audio files
3. **Supported Formats**: MP3, WAV, OGG, M4A, and other browser-supported formats

### Player Controls
- **Play/Pause**: Central play button or spacebar
- **Skip Tracks**: Previous/Next buttons or arrow keys
- **Shuffle**: Randomize playback order
- **Repeat**: Cycle through no repeat → repeat all → repeat one
- **Volume**: Adjust using the volume slider
- **Seek**: Click on progress bar to jump to specific time

### Playlist Management
- **Play Track**: Click any track in the playlist
- **Remove Track**: Click the × button next to any track
- **Clear Playlist**: Remove all tracks at once
- **Save Playlist**: Export playlist metadata as JSON
- **Load Playlist**: Import previously saved playlist structure

### Search & Filter
- **Search**: Type in the search box to filter by title, artist, or genre
- **Genre Filter**: Select specific genre from dropdown
- **Artist Filter**: Select specific artist from dropdown
- **Clear Filters**: Select "All" options or clear search box

### Theme Toggle
- Click the moon/sun icon in the header to switch between light and dark themes
- Theme preference is automatically saved and restored

## 🎯 Key Concepts Demonstrated

### DOM Manipulation
- Dynamic playlist creation and updates
- Real-time progress and time updates
- Interactive drag & drop interface
- Dynamic filter population

### Media APIs
- HTML5 Audio API usage
- File API for audio file handling
- Blob API for playlist export
- URL.createObjectURL for file processing

### State Management
- Current track tracking
- Playlist state management
- Player state (playing, paused, shuffle, repeat)
- Theme persistence with localStorage

### Event Handling
- Audio events (loadedmetadata, timeupdate, ended)
- User interaction events (click, drag, input)
- File upload events
- Keyboard event handling

## 🎨 Customization

### Styling
- Modify CSS custom properties in `:root` for color scheme
- Adjust responsive breakpoints in media queries
- Customize animations and transitions

### Functionality
- Add more audio format support
- Implement equalizer functionality
- Add visualizer features
- Integrate with music APIs

### Storage
- Implement backend integration for persistent storage
- Add user accounts and cloud sync
- Implement collaborative playlists

## 🔧 Browser Compatibility

- **Chrome**: Full support ✅
- **Firefox**: Full support ✅
- **Safari**: Full support ✅
- **Edge**: Full support ✅
- **Mobile Browsers**: Responsive design ✅

## 📱 Mobile Features

- Touch-friendly controls
- Responsive layout
- Optimized for mobile audio playback
- Gesture support for common actions

## 🐛 Known Limitations

1. **File Storage**: Audio files are stored in memory, lost on page refresh
2. **Format Support**: Limited to browser-supported audio formats
3. **File Size**: Large files may impact performance
4. **Offline Play**: Requires files to be re-uploaded each session

## 🚀 Future Enhancements

- [ ] Backend integration for persistent storage
- [ ] Audio visualizer
- [ ] Equalizer controls
- [ ] Lyrics display
- [ ] Social sharing features
- [ ] Keyboard shortcuts
- [ ] Playlist collaboration
- [ ] Music streaming integration

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

## 📞 Support

If you encounter any issues or have questions:
1. Check the browser console for error messages
2. Ensure your browser supports HTML5 audio
3. Try different audio file formats
4. Use a local server instead of file:// protocol

---

**Enjoy your music! 🎵**
