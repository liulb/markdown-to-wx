// 复制富文本到剪贴板的工具函数
export async function copyRichTextToClipboard(htmlElement) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      // 创建一个临时的div元素来包含HTML内容
      const tempDiv = document.createElement('div')
      tempDiv.innerHTML = htmlElement.innerHTML
      tempDiv.style.position = 'absolute'
      tempDiv.style.left = '-9999px'
      document.body.appendChild(tempDiv)

      // 选择内容
      const range = document.createRange()
      range.selectNodeContents(tempDiv)
      const selection = window.getSelection()
      selection.removeAllRanges()
      selection.addRange(range)

      // 使用现代API复制
      const clipboardItem = new ClipboardItem({
        'text/html': new Blob([tempDiv.innerHTML], { type: 'text/html' }),
        'text/plain': new Blob([tempDiv.textContent], { type: 'text/plain' })
      })
      await navigator.clipboard.write([clipboardItem])

      // 清理
      document.body.removeChild(tempDiv)
      selection.removeAllRanges()
      return true
    } else {
      // 降级方案：使用document.execCommand
      const tempDiv = document.createElement('div')
      tempDiv.innerHTML = htmlElement.innerHTML
      tempDiv.style.position = 'absolute'
      tempDiv.style.left = '-9999px'
      tempDiv.contentEditable = true
      document.body.appendChild(tempDiv)

      // 选择所有内容
      const range = document.createRange()
      range.selectNodeContents(tempDiv)
      const selection = window.getSelection()
      selection.removeAllRanges()
      selection.addRange(range)

      // 复制
      const successful = document.execCommand('copy')

      // 清理
      document.body.removeChild(tempDiv)
      selection.removeAllRanges()
      return successful
    }
  } catch (err) {
    console.error('复制失败:', err)
    return false
  }
}