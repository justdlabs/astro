import { cn } from 'ui'

export function Container({ className, children }: React.HtmlHTMLAttributes<HTMLDivElement>) {
  return <div className={cn('mx-auto max-w-7xl px-4 sm:px-6', className)}>{children}</div>
}
