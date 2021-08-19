const secondsToMinutes = (seconds: number): string => {
  const duration = (seconds / 60).toFixed(2)
  const format = duration.replace('.', ':')
  return format
}

export { secondsToMinutes }
