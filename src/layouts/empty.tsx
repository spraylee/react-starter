import { createStyles } from '@mantine/core'
import clsx from 'clsx'
import { FC, ReactNode } from 'react'
import { DarkSwitch } from '../components/DarkSwitch'

const useStyle = createStyles({
  'empty-layout': {
    height: '100%',
    ['& > *']: {
      height: '100%',
    },
  },
})

export const EmptyLayout: FC<{ children: ReactNode }> = (props) => {
  const { classes } = useStyle()
  return (
    <div className={clsx(classes['empty-layout'], 'relative')}>
      <div className="absolute right-4 top-4 z-1 h-auto">
        <DarkSwitch />
      </div>
      {props.children}
    </div>
  )
}
