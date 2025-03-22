import { ThemeSwitcher } from "@/components/theme-switcher"
import { useMediaQuery } from "@/utils/use-media-query"
import { LayoutGroup, motion } from "framer-motion"
import { IconBrandGithub, IconBrandJustd } from "justd-icons"
import React, { useEffect } from "react"
import { ListBox, ListBoxItem } from "react-aria-components"
import { tv } from "tailwind-variants"
import { Button, buttonStyles, Container, Link, Sheet } from "ui"

const navigations = [
  {
    name: "Home",
    url: "/"
  },
  {
    name: "About",
    url: "/about"
  },
  {
    name: "Login",
    url: "/login"
  },
  {
    name: "Components",
    url: "https://justd.co/components"
  },
  {
    name: "Colors",
    url: "https://justd.co/colors"
  },
  {
    name: "Icons",
    url: "https://getjustd.com/icons"
  }
]

export function Navigation() {
  const isMobile = useMediaQuery("(max-width: 640px)")
  return (
    <nav className="sm:py-1 py-2.5 border-b bg-bg">
      <Container>
        <div className="flex items-center justify-between">
          <div className="flex gap-x-8 items-center">
            <Link href="/" className="">
              <IconBrandJustd className="size-5" />
            </Link>
            {!isMobile && (
              <span className="sm:inline hidden">
                <NavContent />
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 justify-end">
            <ThemeSwitcher />
            <Link
              aria-label="GitHub"
              className={buttonStyles({ appearance: "outline", size: "square-petite" })}
              href="https://github.com/justdlabs/astro"
            >
              <IconBrandGithub />
            </Link>
            <Link
              aria-label="Justd"
              className={buttonStyles({ appearance: "outline", size: "square-petite" })}
              href="https://justd.co"
            >
              <IconBrandJustd />
            </Link>
            {isMobile && <NavResponsive />}
          </div>
        </div>
      </Container>
    </nav>
  )
}

const navStyles = tv({
  base: "text-sm relative py-0 sm:py-4 inline-flex focus:outline-hidden focus-visible:text-fg font-medium",
  variants: {
    isCurrent: {
      true: "text-fg",
      false: "text-muted-fg"
    }
  }
})

function NavResponsive() {
  const [isOpen, setOpen] = React.useState(false)
  const [pathname, setPathname] = React.useState("")

  useEffect(() => {
    setPathname(window.location.pathname)
    setOpen(false)
  }, [pathname])

  return (
    <Sheet onOpenChange={setOpen} isOpen={isOpen}>
      <Button size="small" appearance="outline">
        Menu
      </Button>
      <Sheet.Content>
        <Sheet.Header className="text-left p-4 border-b">
          <Sheet.Title className="text-sm flex items-center gap-2">
            <IconBrandJustd />
            Starter Kit
          </Sheet.Title>
        </Sheet.Header>
        <Sheet.Body className="-mx-2 pt-4">
          <NavContent />
        </Sheet.Body>
      </Sheet.Content>
    </Sheet>
  )
}

function NavContent() {
  const isMobile = useMediaQuery("(max-width: 640px)")
  const id = React.useId()
  return (
    <LayoutGroup id={id}>
      <ListBox
        orientation={isMobile ? "vertical" : "horizontal"}
        layout={isMobile ? "stack" : "grid"}
        className="flex relative sm:flex-row flex-col sm:items-center gap-3 sm:gap-6"
        items={navigations}
        aria-label="Navigation"
      >
        {(item) => (
          <NavLink
            textValue={item.name}
            target={["Components", "Colors", "Icons"].includes(item.name) ? "_blank" : undefined}
            href={item.url}
            id={item.url}
          >
            {item.name}
          </NavLink>
        )}
      </ListBox>
    </LayoutGroup>
  )
}

interface LinkProps extends React.ComponentProps<typeof ListBoxItem> {
  isCurrent?: boolean
  className?: string
  children: React.ReactNode
}

function NavLink({ children, className, ...props }: LinkProps) {
  const [pathname, setPathname] = React.useState("")

  useEffect(() => {
    setPathname(window.location.pathname)
  }, [])

  const isCurrent = pathname === props.href
  return (
    <ListBoxItem className={navStyles({ isCurrent, className })} {...props}>
      {children}
      {isCurrent && <CurrentIndicator />}
    </ListBoxItem>
  )
}

function CurrentIndicator() {
  return (
    <motion.span
      className="h-full inset-y-0 sm:inset-auto sm:h-0.5 w-0.5 sm:w-full rounded-full bg-fg -left-4 sm:bottom-[-5px] sm:inset-x block absolute"
      layoutId="current"
    />
  )
}
