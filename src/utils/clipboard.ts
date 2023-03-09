export function copy(copyText: string) {
  const textArea = document.createElement('textarea')
  textArea.value = copyText

  textArea.style.top = '0'
  textArea.style.left = '0'
  textArea.style.position = 'fixed'

  document.body.appendChild(textArea)
  textArea.focus()
  textArea.select()

  try {
    document.execCommand('copy')
  } catch (err) {
    alert('copy failed')
  }

  document.body.removeChild(textArea)
}
