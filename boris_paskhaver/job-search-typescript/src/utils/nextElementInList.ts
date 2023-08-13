const nextElementInList = <T>(list: T[], value: T) => {
  const currentValueIndex = list.indexOf(value) // 0, 1, 2, 3
  const nextValueIndex = (currentValueIndex + 1) % list.length // 1, 2, 3, 1
  const nextValue = list[nextValueIndex]
  return nextValue
}

export default nextElementInList
