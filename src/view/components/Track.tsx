export default function Track({ track }) {
  return (
    <li>
      <img src={track.album.cover} alt="Album cover" />
      <audio controls>
        <source src={track.preview} type="audio/mpeg" />
      </audio>
      Track: {track.title} Artista: {track.artist.name} Álbum:{' '}
      {track.album.title}
      <button>Deezer</button>
      <button>Fav</button>
    </li>
  )
}
