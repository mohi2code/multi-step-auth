import { useDispatch, useSelector } from 'react-redux'
import { selectToken, selectUser, setCredentials } from './features/auth/authSlice'
import './App.css'

function App() {

  const dispatch = useDispatch()
  const token = useSelector(selectToken)
  const user = useSelector(selectUser)

  return (
    <>
      <button onClick={() => dispatch(setCredentials({ token: 'HD8dhdlxlsd821', user: { name: 'mohi2code' } }))}>Set Creds</button>

      <h1>Token - {token && token}</h1>
      <h1>User - {user?.name}</h1>
    </>
  )
}

export default App
