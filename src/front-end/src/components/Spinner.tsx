import { ReactElement } from 'react'

interface Props {
  show: boolean
}

export default function Spinner({ show }: Props): ReactElement {
  return (
    <>
      {show ? (
        <div className="w-[40px] h-[40px]">
          <img src="/icons/spinner.svg" alt="" />
        </div>
      ) : (
        ''
      )}
    </>
  )
}
