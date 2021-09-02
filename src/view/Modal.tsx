import { styled } from 'view/components/theme'
import { useDispatch } from 'app/hooks'
import * as modal from 'store/modalSlice'

const Backdrop = styled.div`
  position: fixed;
  z-index: 998;
  background-color: rgba(0, 0, 0, 0.75);
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`

const ModalStyle = styled.form`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.5rem;
  height: 70%;
  width: 60%;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  background: white;
  z-index: 999;
  @media (max-width: 768px) {
    height: 70%;
    width: 80%;
  }
`

export default function Modal() {
  const dispatch = useDispatch()

  const closeModal = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()
    dispatch(modal.close())
  }

  const createPlaylist = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()
    console.log('create')
  }

  return (
    <div>
      <ModalStyle>
        <input placeholder="Title" />
        <input placeholder="Description" />
        <select name="options" id="options">
          <option value="private">Private Playlist</option>
          <option value="public">Public Playlist</option>
        </select>
        <button onClick={closeModal}>Cancel</button>
        <button onClick={createPlaylist}>Confirm</button>
      </ModalStyle>
      <Backdrop onClick={closeModal} />
    </div>
  )
}
