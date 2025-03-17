import { useRouter } from "next/router"
import { useState } from "react"

export default function Index() {
  const [message, setMessage] = useState('')
  const router = useRouter()

  function changeHandler (event) {
    setMessage(event.target.value)
  }

  function redirect(event) {
    event.preventDefault()
    console.log(message)
    router.push(`/pokemon/${message}`)
  }

  return (
    <div className="main-container">
      <h1>Pokedex</h1>
      <form onSubmit={redirect}>
        <input
          type="search"
          onChange={changeHandler}
          value={message}
        />
        <button>Search</button>
      </form>
    </div>
  )
}