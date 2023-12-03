import { useState, type ReactElement } from 'react'

export default function CopyToClipboard(): ReactElement {
	const [copyText, setCopyText] = useState('13212')
	const [copied, setCopied] = useState(false)

	// eslint-disable-next-line unicorn/consistent-function-scoping
	async function copyTextToClipboard(text: string): Promise<void> {
		if ('clipboard' in navigator) {
			await navigator.clipboard.writeText(text)
			return
		}
		document.execCommand('copy', true, text)
	}

	const handleCopyClick = (): void => {
		copyTextToClipboard(copyText)
			.then(() => {
				setCopied(true)
				setTimeout(() => {
					setCopied(false)
				}, 1500)
			})
			.catch((error) => {
				console.log(error)
			})
	}

	return (
		<div className="text-center font-bold">
			<p>COPY CODE</p>
			<div className="lobby-input flex flex-row justify-center">
				<div className="copy flex flex-row">
					<button
						type="button"
						className="inline-flex justify-center items-center gap-x-2 rounded-lg bg-blue-10 text-center border-none relative"
						onClick={handleCopyClick}
					>
						<input
							className="bg-blue-10 text-center rounded-lg border-none p-0"
							type="text"
							value={copyText}
							readOnly
						/>

						<div className="bg-[#9ac5f2] rounded-lg p-2">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="fill-white ionicon"
								viewBox="0 0 512 512"
								width={32}
								height={32}
							>
								<rect
									x="128"
									y="128"
									width="336"
									height="336"
									rx="57"
									ry="57"
									fill="none"
									stroke="currentColor"
									strokeLinejoin="round"
									strokeWidth="32"
								/>
								<path
									d="M383.5 128l.5-24a56.16 56.16 0 00-56-56H112a64.19 64.19 0 00-64 64v216a56.16 56.16 0 0056 56h24"
									fill="none"
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="32"
								/>
							</svg>
						</div>
					</button>
				</div>
			</div>

			<section className="section">
				{copied ? <span>Copied.</span> : undefined}
			</section>
		</div>
	)
}
