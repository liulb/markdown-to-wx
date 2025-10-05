<template>
  <div class="editor-container">
    <header class="header">
      <h1>微信公众号 Markdown 排版编辑器</h1>
      <button @click="copyHtml" :disabled="!convertedHtml" class="copy-btn">
        {{ copyStatus }}
      </button>
    </header>

    <div class="editor-wrapper">
      <div class="input-panel">
        <h3>Markdown 输入</h3>
        <div class="toolbar">
          <button @click="insertFormat('**', '**')" class="toolbar-btn" title="加粗">
            <b>B</b>
          </button>
          <button @click="insertFormat('*', '*')" class="toolbar-btn" title="斜体">
            <i>I</i>
          </button>
          <div class="dropdown" ref="headingDropdown" @mouseenter="showHeadingDropdown = true" @mouseleave="showHeadingDropdown = false">
            <button class="toolbar-btn" title="标题">
              H
            </button>
            <div v-show="showHeadingDropdown" class="dropdown-menu">
              <button @click="insertHeading(1)" class="dropdown-item">H1 一级标题</button>
              <button @click="insertHeading(2)" class="dropdown-item">H2 二级标题</button>
              <button @click="insertHeading(3)" class="dropdown-item">H3 三级标题</button>
              <button @click="insertHeading(4)" class="dropdown-item">H4 四级标题</button>
              <button @click="insertHeading(5)" class="dropdown-item">H5 五级标题</button>
              <button @click="insertHeading(6)" class="dropdown-item">H6 六级标题</button>
            </div>
          </div>
          <button @click="insertFormat('~~', '~~')" class="toolbar-btn" title="删除线">
            <s>S</s>
          </button>
          <span class="toolbar-divider"></span>
          <button @click="insertFormat('- ', '')" class="toolbar-btn" title="无序列表">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <circle cx="2" cy="4" r="1"/>
              <circle cx="2" cy="8" r="1"/>
              <circle cx="2" cy="12" r="1"/>
              <rect x="5" y="3.5" width="9" height="1"/>
              <rect x="5" y="7.5" width="9" height="1"/>
              <rect x="5" y="11.5" width="9" height="1"/>
            </svg>
          </button>
          <button @click="insertFormat('1. ', '')" class="toolbar-btn" title="有序列表">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <text x="2" y="6" font-size="6" font-family="Arial">1</text>
              <text x="2" y="10" font-size="6" font-family="Arial">2</text>
              <text x="2" y="14" font-size="6" font-family="Arial">3</text>
              <rect x="5" y="3.5" width="9" height="1"/>
              <rect x="5" y="7.5" width="9" height="1"/>
              <rect x="5" y="11.5" width="9" height="1"/>
            </svg>
          </button>
          <button @click="insertFormat('- [ ] ', '')" class="toolbar-btn" title="待办事项">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <rect x="1" y="3" width="3" height="3" fill="none" stroke="currentColor"/>
              <polyline points="2.5,4.5 3,5 4.5,3.5" fill="none" stroke="currentColor" stroke-width="0.8"/>
              <rect x="6" y="4" width="8" height="1"/>
              <rect x="1" y="7" width="3" height="3" fill="none" stroke="currentColor"/>
              <rect x="6" y="8" width="8" height="1"/>
              <rect x="1" y="11" width="3" height="3" fill="none" stroke="currentColor"/>
              <rect x="6" y="12" width="8" height="1"/>
            </svg>
          </button>
          <span class="toolbar-divider"></span>
          <button @click="insertFormat('> ', '')" class="toolbar-btn" title="引用">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M2 4v8l3-2V6h2V4H2zm6 0v8l3-2V6h2V4H8z"/>
            </svg>
          </button>
          <button @click="insertFormat('`', '`')" class="toolbar-btn" title="行内代码">
            &lt;/&gt;
          </button>
          <button @click="insertCodeBlock" class="toolbar-btn" title="代码块">
            { }
          </button>
          <span class="toolbar-divider"></span>
          <div class="dropdown theme-dropdown" @mouseenter="showThemeDropdown = true" @mouseleave="showThemeDropdown = false">
            <button class="toolbar-btn theme-btn" title="主题选择">
              {{ getThemeName(selectedTheme) }}
            </button>
            <div v-show="showThemeDropdown" class="dropdown-menu">
              <button @click="selectTheme('default')" class="dropdown-item" :class="{ active: selectedTheme === 'default' }">默认</button>
              <button @click="selectTheme('spring')" class="dropdown-item" :class="{ active: selectedTheme === 'spring' }">Spring</button>
              <button @click="selectTheme('juejin')" class="dropdown-item" :class="{ active: selectedTheme === 'juejin' }">Gray</button>
              <button @click="selectTheme('github')" class="dropdown-item" :class="{ active: selectedTheme === 'github' }">GitHub</button>
            </div>
          </div>
        </div>
        <textarea
          v-model="markdownText"
          placeholder="在这里输入或粘贴 Markdown 文本..."
          class="markdown-input"
          @input="onMarkdownChange"
          ref="textareaRef"
        ></textarea>
      </div>

      <div class="preview-panel">
        <h3>微信公众号预览</h3>
        <div
          class="preview-content"
          v-html="convertedHtml"
          ref="previewRef"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { markdownToWechat } from '../utils/markdownConverter.js'
import { copyRichTextToClipboard } from '../utils/clipboard.js'

const markdownText = ref('')
const convertedHtml = ref('')
const copyStatus = ref('复制')
const previewRef = ref(null)
const textareaRef = ref(null)
const selectedTheme = ref('default')
const showHeadingDropdown = ref(false)
const headingDropdown = ref(null)
const showThemeDropdown = ref(false)

// 示例 Markdown 文本
const sampleMarkdown = `# 微信公众号 Markdown 排版编辑器

这是一个专门为微信公众号设计的 **Markdown** 排版工具。

## 主要特性

- 支持大部分 Markdown 语法
- 自动将链接转为脚注形式
- 优化的代码显示效果
- 实时预览功能

### 使用方法

1. 在左侧输入框中编写 Markdown 文本
2. 右侧会实时显示转换后的效果
3. 点击"复制"按钮将格式化内容复制到剪贴板
4. 粘贴到微信公众号编辑器中即可

### 代码示例

这是一段 \`行内代码\`，下面是代码块：

\`\`\`javascript
function hello() {
  console.log('Hello, 微信公众号!')
}
\`\`\`

### 引用

> 这是一段引用文本，展示引用的样式效果。

### 链接处理

访问 [Vue.js 官网](https://vuejs.org) 了解更多信息。链接会自动转为脚注形式。

### 列表

- 无序列表项 1
- 无序列表项 2
  - 嵌套列表项
- 无序列表项 3

1. 有序列表项 1
2. 有序列表项 2
3. 有序列表项 3`

// 实时转换函数
const convertMarkdown = () => {
  if (markdownText.value.trim()) {
    convertedHtml.value = markdownToWechat(markdownText.value, selectedTheme.value)
  } else {
    convertedHtml.value = ''
  }
}

// 主题切换处理
const onThemeChange = () => {
  convertMarkdown()
}

// 主题选择相关方法
const getThemeName = (theme) => {
  const themeNames = {
    'default': '默认',
    'spring': 'Spring',
    'juejin': 'Gray',
    'github': 'GitHub'
  }
  return themeNames[theme] || '默认'
}

const selectTheme = (theme) => {
  selectedTheme.value = theme
  showThemeDropdown.value = false
  convertMarkdown()
}

// 监听 Markdown 文本变化
watch(markdownText, convertMarkdown, { immediate: true })

// 输入框变化处理
const onMarkdownChange = () => {
  convertMarkdown()
}

// 复制功能
const copyHtml = async () => {
  if (!convertedHtml.value || !previewRef.value) return

  try {
    const success = await copyRichTextToClipboard(previewRef.value)
    if (success) {
      copyStatus.value = '已复制!'
      setTimeout(() => {
        copyStatus.value = '复制'
      }, 2000)
    } else {
      copyStatus.value = '复制失败'
      setTimeout(() => {
        copyStatus.value = '复制'
      }, 2000)
    }
  } catch (error) {
    console.error('复制失败:', error)
    copyStatus.value = '复制失败'
    setTimeout(() => {
      copyStatus.value = '复制'
    }, 2000)
  }
}

// 组件挂载时加载示例文本
onMounted(() => {
  markdownText.value = sampleMarkdown
})

// 工具栏格式化功能
const insertFormat = (prefix, suffix) => {
  const textarea = textareaRef.value
  if (!textarea) return

  const start = textarea.selectionStart
  const end = textarea.selectionEnd
  const selectedText = markdownText.value.substring(start, end)

  let newText
  if (selectedText) {
    // 有选中文本，包围它
    newText = markdownText.value.substring(0, start) +
              prefix + selectedText + suffix +
              markdownText.value.substring(end)

    // 设置新的光标位置
    setTimeout(() => {
      textarea.selectionStart = start + prefix.length
      textarea.selectionEnd = end + prefix.length
      textarea.focus()
    }, 0)
  } else {
    // 没有选中文本，在光标位置插入
    const lineStart = markdownText.value.lastIndexOf('\n', start - 1) + 1
    const isLineStart = start === lineStart || markdownText.value.substring(lineStart, start).trim() === ''

    if (prefix === '# ' || prefix === '- ' || prefix === '1. ' || prefix === '- [ ] ' || prefix === '> ') {
      // 行级格式：插入到行首
      if (isLineStart) {
        newText = markdownText.value.substring(0, lineStart) +
                  prefix +
                  markdownText.value.substring(lineStart)

        setTimeout(() => {
          textarea.selectionStart = textarea.selectionEnd = lineStart + prefix.length
          textarea.focus()
        }, 0)
      } else {
        // 不在行首，新起一行
        newText = markdownText.value.substring(0, start) +
                  '\n' + prefix +
                  markdownText.value.substring(start)

        setTimeout(() => {
          textarea.selectionStart = textarea.selectionEnd = start + 1 + prefix.length
          textarea.focus()
        }, 0)
      }
    } else {
      // 行内格式：在光标位置插入
      newText = markdownText.value.substring(0, start) +
                prefix + suffix +
                markdownText.value.substring(start)

      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + prefix.length
        textarea.focus()
      }, 0)
    }
  }

  markdownText.value = newText
}

// 插入代码块
const insertCodeBlock = () => {
  const textarea = textareaRef.value
  if (!textarea) return

  const start = textarea.selectionStart
  const selectedText = markdownText.value.substring(textarea.selectionStart, textarea.selectionEnd)

  const codeBlock = selectedText ?
    `\`\`\`\n${selectedText}\n\`\`\`` :
    '\`\`\`\n\n\`\`\`'

  const newText = markdownText.value.substring(0, start) +
                  codeBlock +
                  markdownText.value.substring(textarea.selectionEnd)

  markdownText.value = newText

  setTimeout(() => {
    const cursorPos = selectedText ?
      start + 4 + selectedText.length :
      start + 4
    textarea.selectionStart = textarea.selectionEnd = cursorPos
    textarea.focus()
  }, 0)
}

// 标题下拉菜单功能
const insertHeading = (level) => {
  const prefix = '#'.repeat(level) + ' '
  insertFormat(prefix, '')
  showHeadingDropdown.value = false
}
</script>

<style scoped>
.editor-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
}

.header {
  background: white;
  padding: 20px;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  font-family: Optima-Regular, Optima, PingFangSC-light, PingFangTC-light, PingFang SC, Cambria, Cochin, Georgia, Times, Times New Roman, serif;
}

.header h1 {
  color: #2c3e50;
  font-size: 24px;
  margin: 0;
}

.copy-btn {
  background: #35b378;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.copy-btn:hover:not(:disabled) {
  background: #35b378;
}

.copy-btn:disabled {
  background: #bdc3c7;
  cursor: not-allowed;
}

.editor-wrapper {
  flex: 1;
  display: flex;
  gap: 1px;
  overflow: hidden;
}

.input-panel, .preview-panel {
  flex: 1;
  background: white;
  display: flex;
  flex-direction: column;
}

.input-panel h3, .preview-panel h3 {
  padding: 15px 20px;
  margin: 0;
  background: #34495e;
  color: white;
  font-size: 16px;
  font-weight: 500;
  font-family: Optima-Regular, Optima, PingFangSC-light, PingFangTC-light, PingFang SC, Cambria, Cochin, Georgia, Times, Times New Roman, serif;
}

.toolbar {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  background: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
  gap: 4px;
}

.toolbar-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: 1px solid #d1d5db;
  background: white;
  color: #374151;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s;
  user-select: none;
}

.toolbar-btn:hover {
  background: #f3f4f6;
  border-color: #9ca3af;
}

.toolbar-btn:active {
  background: #e5e7eb;
  transform: translateY(1px);
}

.toolbar-divider {
  width: 1px;
  height: 20px;
  background: #d1d5db;
  margin: 0 6px;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  z-index: 1000;
  min-width: 140px;
  margin-top: 2px;
}

.dropdown-item {
  display: block;
  width: 100%;
  padding: 8px 12px;
  text-align: left;
  border: none;
  background: transparent;
  color: #374151;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.15s;
  border-radius: 0;
}

.dropdown-item:first-child {
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
}

.dropdown-item:last-child {
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
}

.dropdown-item:hover {
  background: #f3f4f6;
}

.dropdown-item.active {
  background: #3b82f6;
  color: white;
}

.dropdown-item.active:hover {
  background: #2563eb;
}

.theme-btn {
  min-width: 60px !important;
  font-size: 12px;
}

.markdown-input {
  flex: 1;
  border: none;
  padding: 20px;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.6;
  resize: none;
  outline: none;
  background: #fafafa;
}

.markdown-input:focus {
  background: white;
}

.preview-content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background: white;
}

/* 移动端响应式 */
@media (max-width: 768px) {
  .editor-wrapper {
    flex-direction: column;
  }

  .header {
    padding: 15px;
  }

  .header h1 {
    font-size: 18px;
  }

  .copy-btn {
    padding: 8px 16px;
    font-size: 14px;
    font-family: Optima-Regular, Optima, PingFangSC-light, PingFangTC-light, PingFang SC, Cambria, Cochin, Georgia, Times, Times New Roman, serif;
  }
}
</style>