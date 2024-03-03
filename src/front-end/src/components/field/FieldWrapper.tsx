type Props = {
	children: React.ReactNode | React.ReactNode[]
}

const FieldWrapper = ({ children }: Props) => {
	return (
		<div className="grid aspect-square w-full max-w-max grid-cols-[16px_1fr] grid-rows-[16px_1fr] gap-2 md:gap-4">
			<div className="col-start-2 grid grid-cols-[repeat(10,minmax(0,56px))]">
				<div className="text-center text-xs sm:text-sm">A</div>
				<div className="text-center text-xs sm:text-sm">B</div>
				<div className="text-center text-xs sm:text-sm">C</div>
				<div className="text-center text-xs sm:text-sm">D</div>
				<div className="text-center text-xs sm:text-sm">E</div>
				<div className="text-center text-xs sm:text-sm">F</div>
				<div className="text-center text-xs sm:text-sm">G</div>
				<div className="text-center text-xs sm:text-sm">H</div>
				<div className="text-center text-xs sm:text-sm">I</div>
				<div className="text-center text-xs sm:text-sm">J</div>
			</div>
			<div className="grid">
				<div className="flex items-center justify-center text-xs sm:text-sm">
					1
				</div>
				<div className="flex items-center justify-center text-xs sm:text-sm">
					2
				</div>
				<div className="flex items-center justify-center text-xs sm:text-sm">
					3
				</div>
				<div className="flex items-center justify-center text-xs sm:text-sm">
					4
				</div>
				<div className="flex items-center justify-center text-xs sm:text-sm">
					5
				</div>
				<div className="flex items-center justify-center text-xs sm:text-sm">
					6
				</div>
				<div className="flex items-center justify-center text-xs sm:text-sm">
					7
				</div>
				<div className="flex items-center justify-center text-xs sm:text-sm">
					8
				</div>
				<div className="flex items-center justify-center text-xs sm:text-sm">
					9
				</div>
				<div className="flex items-center justify-center text-xs sm:text-sm">
					10
				</div>
			</div>
			{children}
		</div>
	)
}

export default FieldWrapper
