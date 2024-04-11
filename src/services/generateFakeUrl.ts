export function generateFakeUrl(file: File) {
  const fileSrc = URL.createObjectURL(file)
  setTimeout(() => {
    URL.revokeObjectURL(fileSrc)
  }, 1000)

  return fileSrc
}
