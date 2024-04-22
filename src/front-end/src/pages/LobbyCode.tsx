import Layout from '@components/Layout/Layout'
import TextField from '@components/input/TextField'
import { useState, type ReactElement } from 'react'

export default function LobbyCode(): ReactElement {
  const [code, setCode] = useState('')
  const onSubmitForm = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    console.log(code)
    setCode('')
  }

  return (
    <Layout>
      <div className="flex flex-col my-auto">
        <div className="font-bold text-center mb-12">
          <h1 className="text-2xl mb-4">Classical battle ship game</h1>
          <h1 className="text-5xl">Pirate’s adventure</h1>
        </div>

        <form
          method="post"
          onSubmit={onSubmitForm}
          className="flex flex-row gap-4 justify-center"
        >
          <TextField
            type="text"
            placeholder="Enter lobby code"
            value={code}
            onChange={(event): void => setCode(event.target.value)}
          />

          <button
            type="submit"
            className="font-medium text-xl hover:text-deep-blue"
          >
            Join
          </button>
        </form>
      </div>
    </Layout>
  )
}
