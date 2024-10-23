'use client'

import { Link as LinkPrimitive, type LinkProps as LinkPrimitiveProps } from 'react-aria-components'
import { tv } from 'tailwind-variants'

import { cr } from './primitive'

const linkStyles = tv({
  base: 'forced-colors:outline-[Highlight] relative focus-visible:outline-2 outline outline-offset-2 disabled:focus-visible:outline-0 outline-0 outline-primary rounded disabled:opacity-60 forced-colors:disabled:text-[GrayText] border-transparent transition-colors disabled:cursor-default',
  variants: {
    intent: {
      unstyled: 'text-current',
      primary: 'text-primary hover:text-primary/80 forced-colors:disabled:text-[GrayText]',
      danger: 'text-danger hover:text-danger/80 forced-colors:disabled:text-[GrayText]',
      'lad/primary': 'text-fg hover:text-primary dark:hover:text-primary/80 forced-colors:disabled:text-[GrayText]',
      secondary: 'text-secondary-fg hover:text-secondary-fg/80'
    }
  },
  defaultVariants: {
    intent: 'unstyled'
  }
})

interface LinkProps extends LinkPrimitiveProps {
  intent?: 'primary' | 'secondary' | 'danger' | 'lad/primary' | 'unstyled'
}

const Link = ({ className, ...props }: LinkProps) => {
  return (
    <LinkPrimitive
      {...props}
      className={cr(className, (className, ...renderProps) =>
        linkStyles({ ...renderProps, intent: props.intent, className })
      )}
    >
      {(values) => <>{typeof props.children === 'function' ? props.children(values) : props.children}</>}
    </LinkPrimitive>
  )
}

export { Link, LinkPrimitive, type LinkPrimitiveProps, type LinkProps }
