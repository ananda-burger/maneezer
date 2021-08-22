import { Route } from 'types'

const secondsToMinutes = (seconds: number): string => {
  const duration = (seconds / 60).toFixed(2)
  const format = duration.replace('.', ':')
  return format
}

const isRoute = (path: Route, pathname: string): boolean => {
  return pathname.startsWith(path)
}

export { secondsToMinutes, isRoute }
