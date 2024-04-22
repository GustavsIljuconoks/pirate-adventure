import RadioButton from 'components/input/RadioButton'
import Layout from '../components/Layout/Layout'
import { useState, type ReactElement } from 'react'

export default function Settings(): ReactElement {
	const [mode, setMode] = useState('')
	const [time, setTime] = useState('')
	const [abilities, setAbilities] = useState('')

	// eslint-disable-next-line unicorn/consistent-function-scoping
	const onSubmitForm = (event: React.FormEvent<HTMLFormElement>): void => {
		event.preventDefault()
		console.log([mode, time, abilities])
	}
	return (
		<Layout>
			<div className="my-auto font-medium">
				<h1 className="text-5xl mb-12 font-bold">Lobby settings</h1>

				<div className="text-2xl mb-20">
					<form
						className="boxed grid gap-y-16 md:w-9/12 text-gray"
						onSubmit={onSubmitForm}
					>
						<div className="flex flex-col lg:flex-row lg:justify-between">
							<h1 className="font-bold mb-4">Game mode:</h1>
							<div className="flex flex-row justify-between gap-4 lg:gap-20">
								<RadioButton
									label="Time limited"
									type="mode"
									value="limited"
									onChange={(event): void =>
										setMode(event.target.value)
									}
								/>

								<RadioButton
									label="Offline"
									type="mode"
									value="offline"
									onChange={(event): void =>
										setMode(event.target.value)
									}
								/>
							</div>
						</div>

						<div className="flex flex-col lg:flex-row lg:justify-between">
							<h1 className="font-bold mb-4">Time:</h1>
							<div className="flex flex-row justify-between gap-4 lg:gap-20">
								<RadioButton
									label="2 min"
									type="time"
									value="2"
									onChange={(event): void =>
										setTime(event.target.value)
									}
								/>

								<RadioButton
									label="5 min"
									type="time"
									value="5"
									onChange={(event): void =>
										setTime(event.target.value)
									}
								/>

								<RadioButton
									label="10 min"
									type="time"
									value="10"
									onChange={(event): void =>
										setTime(event.target.value)
									}
								/>

								<RadioButton
									label="Unlimited"
									type="time"
									value="unlimited"
									onChange={(event): void =>
										setTime(event.target.value)
									}
								/>
							</div>
						</div>

						<div className="flex flex-col lg:flex-row lg:justify-between">
							<h1 className="font-bold mb-4">Abilites:</h1>
							<div className="flex flex-row justify-between gap-4 lg:gap-20">
								<RadioButton
									label="On"
									type="abilities"
									value="on"
									onChange={(event): void =>
										setAbilities(event.target.value)
									}
								/>

								<RadioButton
									label="Off"
									type="abilities"
									value="off"
									onChange={(event): void =>
										setAbilities(event.target.value)
									}
								/>
							</div>
						</div>
						<div className="flex justify-between">
							<a
								href="/"
								className="font-medium text-xl hover:text-deep-blue"
							>
								Go back to main menu
							</a>

							<button
								type="submit"
								className="font-medium text-xl hover:text-deep-blue"
							>
								Create Lobby
							</button>
						</div>
					</form>
				</div>
			</div>
		</Layout>
	)
}
