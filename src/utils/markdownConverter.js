import { marked } from 'marked'

// 主题定义 - 基于真实的优质主题
const themes = {
  default: {
    // 原有的微信公众号样式作为默认主题
    name: '默认',
    h1: 'margin: 10px auto; height: 40px; background-color: rgb(251, 251, 251); border-bottom: 1px solid rgb(246, 246, 246); overflow: hidden; box-sizing: border-box;',
    h1Inner: 'margin-left: -10px; display: inline-block; width: auto; height: 40px; background-color: rgb(46, 167, 101); border-bottom-right-radius: 100px; color: rgb(255, 255, 255); padding-right: 30px; padding-left: 30px; line-height: 40px; font-size: 19px; font-family: Optima-Regular, Optima, PingFangSC-light, PingFangTC-light, PingFang SC, Cambria, Cochin, Georgia, Times, Times New Roman, serif;',
    h2: 'font-size: 20px; color: #2c3e50; margin: 18px 0 12px; padding-left: 15px; border-left: 4px solid #35b378; font-weight: bold; font-family: Optima-Regular, Optima, PingFangSC-light, PingFangTC-light, PingFang SC, Cambria, Cochin, Georgia, Times, Times New Roman, serif;',
    h3: 'font-size: 18px; color: #2c3e50; margin: 16px 0 10px; font-weight: bold; font-family: Optima-Regular, Optima, PingFangSC-light, PingFangTC-light, PingFang SC, Cambria, Cochin, Georgia, Times, Times New Roman, serif;',
    blockquote: 'margin: 20px 0px; padding: 10px 20px; background-color: rgb(240, 253, 244); border-left: 4px solid rgb(66, 185, 131); color: rgb(44, 62, 80); font-size: 16px; line-height: 1.6; border-radius: 4px; font-family: Optima-Regular, Optima, PingFangSC-light, PingFangTC-light, PingFang SC, Cambria, Cochin, Georgia, Times, Times New Roman, serif;',
    codeHeader: 'background: rgb(40, 44, 52);',
    codeBackground: 'background: #282c34; color: #abb2bf;',
    strong: 'color: #e74c3c; font-weight: bold; font-family: Optima-Regular, Optima, PingFangSC-light, PingFangTC-light, PingFang SC, Cambria, Cochin, Georgia, Times, Times New Roman, serif;',
    em: 'color: #9b59b6; font-style: italic; font-family: Optima-Regular, Optima, PingFangSC-light, PingFangTC-light, PingFang SC, Cambria, Cochin, Georgia, Times, Times New Roman, serif;',
    p: 'margin: 12px 0; text-align: justify; line-height: 1.6; font-family: Optima-Regular, Optima, PingFangSC-light, PingFangTC-light, PingFang SC, Cambria, Cochin, Georgia, Times, Times New Roman, serif;',
    ul: 'margin: 12px 0; padding-left: 25px; line-height: 1.6; font-family: Optima-Regular, Optima, PingFangSC-light, PingFangTC-light, PingFang SC, Cambria, Cochin, Georgia, Times, Times New Roman, serif;',
    ol: 'margin: 12px 0; padding-left: 25px; line-height: 1.6; font-family: Optima-Regular, Optima, PingFangSC-light, PingFangTC-light, PingFang SC, Cambria, Cochin, Georgia, Times, Times New Roman, serif;',
    li: 'margin: 4px 0; line-height: 1.6; font-family: Optima-Regular, Optima, PingFangSC-light, PingFangTC-light, PingFang SC, Cambria, Cochin, Georgia, Times, Times New Roman, serif;',
    footnoteRef: 'color: #35b378; text-decoration: none; font-size: 12px; vertical-align: super; font-weight: bold; margin-left: 2px;'
  },
  juejin: {
    name: '掘金',
    h1: 'font-size: 24px; line-height: 1.5; margin-top: 35px; margin-bottom: 10px; color: #333; font-weight: bold;',
    h1Inner: null,
    h2: 'font-size: 20px; line-height: 1.5; margin-top: 35px; margin-bottom: 10px; padding-bottom: 5px; border-bottom: 1px solid #eee; color: #333; font-weight: bold;',
    h3: 'font-size: 18px; line-height: 1.5; margin-top: 35px; margin-bottom: 10px; color: #333; font-weight: bold;',
    blockquote: 'color: #666; padding: 1px 23px; margin: 22px 0; border-left: 4px solid #cbcbcb; background-color: #f8f8f8;',
    codeHeader: 'background: #f8f8f8;',
    codeBackground: 'background: #f8f8f8; color: #333; font-size: 12px;',
    strong: 'color: #ff502c; font-weight: bold;',
    em: 'color: #ff502c; font-style: italic;',
    p: 'margin: 12px 0; text-align: left; line-height: 1.6;',
    footnoteRef: 'color: #ff502c; text-decoration: none; font-size: 12px; vertical-align: super; font-weight: bold; margin-left: 2px;'
  },
  github: {
    name: 'GitHub',
    h1: 'font-size: 2em; font-weight: 600; padding-bottom: 10px; margin-top: 24px; margin-bottom: 16px; border-bottom: 1px solid #d1d9e0; color: #1f2328;',
    h1Inner: null,
    h2: 'font-size: 1.5em; font-weight: 600; padding-bottom: 8px; margin-top: 24px; margin-bottom: 16px; border-bottom: 1px solid #d1d9e0; color: #1f2328;',
    h3: 'font-size: 1.25em; font-weight: 600; margin-top: 24px; margin-bottom: 16px; color: #1f2328;',
    blockquote: 'margin: 0; padding: 0 1em; color: #656d76; border-left: 0.25em solid #d1d9e0;',
    codeHeader: 'background: #f6f8fa;',
    codeBackground: 'background: #f6f8fa; color: #1f2328; padding: 16px; border-radius: 6px; font-size: 85%; line-height: 1.45;',
    strong: 'font-weight: 600; color: inherit;',
    em: 'font-style: italic; color: inherit;',
    p: 'margin: 12px 0; text-align: left; line-height: 1.6;',
    footnoteRef: 'color: #656d76; text-decoration: none; font-size: 12px; vertical-align: super; font-weight: bold; margin-left: 2px;'
  },
  spring: {
    name: 'Spring',
    h1: 'font-size: 30px; color: #303133; line-height: 1.6em; margin: 50px 0 20px; font-weight: bold; font-family: Optima-Regular, Optima, PingFangSC-light, PingFangTC-light, PingFang SC, Cambria, Cochin, Georgia, Times, Times New Roman, serif;',
    h1Inner: null,
    h2: 'font-size: 26px; color: #303133; line-height: 1.6em; margin: 45px 0 18px; font-weight: bold; font-family: Optima-Regular, Optima, PingFangSC-light, PingFangTC-light, PingFang SC, Cambria, Cochin, Georgia, Times, Times New Roman, serif;',
    h3: 'font-size: 22px; color: #303133; line-height: 1.6em; margin: 40px 0 16px; font-weight: bold; font-family: Optima-Regular, Optima, PingFangSC-light, PingFangTC-light, PingFang SC, Cambria, Cochin, Georgia, Times, Times New Roman, serif;',
    blockquote: 'font-size: 14px; color: #666; padding: 1px 23px; margin: 22px 0; border-left: 4px solid #42b983; background-color: rgba(66, 185, 131, 0.1); border-radius: 0; font-family: Optima-Regular, Optima, PingFangSC-light, PingFangTC-light, PingFang SC, Cambria, Cochin, Georgia, Times, Times New Roman, serif;',
    codeHeader: 'background: #f8f8f8;',
    codeBackground: 'background: #f8f8f8; color: #333; font-size: 12px; padding: 15px 12px; font-family: Menlo, Monaco, Consolas, Courier New, monospace;',
    strong: 'color: #303133; font-weight: bold; font-family: Optima-Regular, Optima, PingFangSC-light, PingFangTC-light, PingFang SC, Cambria, Cochin, Georgia, Times, Times New Roman, serif;',
    em: 'color: #303133; font-style: italic; font-family: Optima-Regular, Optima, PingFangSC-light, PingFangTC-light, PingFang SC, Cambria, Cochin, Georgia, Times, Times New Roman, serif;',
    p: 'margin: 12px 0; text-align: justify; line-height: 1.6; font-family: Optima-Regular, Optima, PingFangSC-light, PingFangTC-light, PingFang SC, Cambria, Cochin, Georgia, Times, Times New Roman, serif;',
    ul: 'margin: 12px 0; padding-left: 25px; line-height: 1.6; font-family: Optima-Regular, Optima, PingFangSC-light, PingFangTC-light, PingFang SC, Cambria, Cochin, Georgia, Times, Times New Roman, serif;',
    ol: 'margin: 12px 0; padding-left: 25px; line-height: 1.6; font-family: Optima-Regular, Optima, PingFangSC-light, PingFangTC-light, PingFang SC, Cambria, Cochin, Georgia, Times, Times New Roman, serif;',
    li: 'margin: 4px 0; line-height: 1.6; font-family: Optima-Regular, Optima, PingFangSC-light, PingFangTC-light, PingFang SC, Cambria, Cochin, Georgia, Times, Times New Roman, serif;',
    footnoteRef: 'color: #42b983; text-decoration: none; font-size: 12px; vertical-align: super; font-weight: bold; margin-left: 2px;'
  }
}

// 链接计数器
let linkCounter = 0
const footnotes = []
let currentTheme = 'default'

// 内联样式定义
const styles = {
  container: 'font-family: Optima-Regular, Optima, PingFangSC-light, PingFangTC-light, "PingFang SC", Cambria, Cochin, Georgia, Times, "Times New Roman", serif; letter-spacing: 0.544px; color: #333; line-height: 1.8; word-wrap: break-word; word-break: break-all;',
  h1: 'font-size: 24px; color: #2c3e50; margin: 20px 0 15px; padding-bottom: 10px; border-bottom: 2px solid #35b378; font-weight: bold;',
  h2: 'font-size: 20px; color: #2c3e50; margin: 18px 0 12px; padding-left: 15px; border-left: 4px solid #35b378; font-weight: bold;',
  h3: 'font-size: 18px; color: #2c3e50; margin: 16px 0 10px; font-weight: bold;',
  h4: 'font-size: 16px; color: #2c3e50; margin: 14px 0 8px; font-weight: bold;',
  h5: 'font-size: 16px; color: #2c3e50; margin: 14px 0 8px; font-weight: bold;',
  h6: 'font-size: 16px; color: #2c3e50; margin: 14px 0 8px; font-weight: bold;',
  p: 'margin: 12px 0; text-align: justify;',
  strong: 'color: #e74c3c; font-weight: bold;',
  em: 'color: #9b59b6; font-style: italic;',
  ul: 'margin: 12px 0; padding-left: 25px;',
  ol: 'margin: 12px 0; padding-left: 25px;',
  li: 'margin: 6px 0;',
  blockquote: 'margin: 20px 0; padding: 15px 20px; background: #f6f8fa; border-left: 4px solid #d0d7de; color: #656d76; font-style: italic;',
  code: 'background-color: #f1f2f6; color: #e74c3c; padding: 2px 6px; border-radius: 3px; font-family: Consolas, "Liberation Mono", Menlo, Courier, monospace; font-size: 14px;',
  pre: 'background-color: #2d3748; color: #e2e8f0; padding: 16px; border-radius: 6px; margin: 16px 0; overflow-x: auto; font-family: Consolas, "Liberation Mono", Menlo, Courier, monospace; font-size: 13px; line-height: 1.45; position: relative;',
  preCode: 'background: none; color: inherit; padding: 0; border-radius: 0; display: block; white-space: pre;',
  footnotes: 'margin-top: 30px; padding: 15px 0; border-top: 1px solid #e1e4e8;',
  footnotesTitle: 'font-size: 16px; color: #586069; margin: 0 0 15px; font-weight: normal; text-align: left; font-family: inherit;',
  footnoteItem: 'margin: 8px 0; padding: 0; font-size: 14px; color: #333; line-height: 1.6; text-align: left;',
  footnoteRef: 'color: #007bff; text-decoration: none; font-size: 12px; vertical-align: super; font-weight: bold; margin-left: 2px;'
}

// 自定义渲染器
const renderer = new marked.Renderer()

// 重写链接渲染，转为脚注形式
renderer.link = function(href, title, text) {
  linkCounter++
  footnotes.push({
    id: linkCounter,
    url: href,
    title: title || text
  })
  const theme = themes[currentTheme] || themes.default
  const footnoteRefStyle = theme.footnoteRef || styles.footnoteRef
  return `${text}<sup style="${footnoteRefStyle}">[${linkCounter}]</sup>`
}

// 重写代码块渲染
renderer.code = function(code, language) {
  const theme = themes[currentTheme] || themes.default

  // 直接转义HTML，不进行语法高亮
  const lines = code.split('\n')
  let numberedCode = ''

  lines.forEach((line, index) => {
    const lineNumber = (index + 1).toString().padStart(2, ' ')
    numberedCode += `<span style="color: #6c7680; user-select: none; margin-right: 16px;">${lineNumber}</span>${escapeHtml(line)}\n`
  })

  // 根据主题返回不同样式的代码块
  if (currentTheme === 'default') {
    // 默认主题 - 恢复原始的苹果窗口效果
    return `<pre style="border-radius: 5px; box-shadow: rgba(0, 0, 0, 0.55) 0px 2px 10px; text-align: left; margin: 10px 0; padding: 0;"><div style="display: flex; align-items: center; background: rgb(40, 44, 52); height: 30px; border-radius: 5px 5px 0 0; padding: 0 12px;"><span style="width: 12px; height: 12px; border-radius: 50%; background: #ff5f56; margin-right: 8px;"></span><span style="width: 12px; height: 12px; border-radius: 50%; background: #ffbd2e; margin-right: 8px;"></span><span style="width: 12px; height: 12px; border-radius: 50%; background: #27ca3f;"></span>${language ? `<span style="color: #ccc; font-size: 12px; margin-left: auto;">${language}</span>` : ''}</div><code style="overflow-x: auto; padding: 16px; color: #abb2bf; letter-spacing: 0px; background: #282c34; border-radius: 0 0 5px 5px; display: block; font-family: Consolas, Monaco, Menlo, monospace; font-size: 12px; margin: 0; white-space: pre;">${numberedCode}</code></pre>`
  } else {
    // 其他主题 - 简洁样式
    return `<pre style="margin: 16px 0; overflow-x: auto; border-radius: 6px;">
      <code style="display: block; ${theme.codeBackground}; font-family: Consolas, Monaco, Menlo, monospace; font-size: 12px; margin: 0; white-space: pre; padding: 16px; line-height: 1.5;">${numberedCode}</code>
    </pre>`
  }
}

// 重写行内代码渲染
renderer.codespan = function(code) {
  const theme = themes[currentTheme] || themes.default

  // GitHub 主题的特殊行内代码样式
  if (currentTheme === 'github') {
    return `<code style="padding: 0.2em 0.4em; font-size: 85%; background-color: #f6f8fa; border-radius: 6px; color: #1f2328; font-family: ui-monospace, SFMono-Regular, 'SF Mono', Consolas, 'Liberation Mono', Menlo, monospace;">${code}</code>`
  }

  // Spring 主题的特殊行内代码样式
  if (currentTheme === 'spring') {
    return `<code style="background-color: #fff5f5; color: #e96900; padding: 3px 5px; border-radius: 2px; font-family: Menlo, Monaco, Consolas, 'Courier New', monospace; font-size: 0.87em;">${code}</code>`
  }

  return `<code style="${styles.code}">${code}</code>`
}

// 重写强调渲染
renderer.strong = function(text) {
  const theme = themes[currentTheme] || themes.default
  return `<strong style="${theme.strong}">${text}</strong>`
}

// 重写斜体渲染
renderer.em = function(text) {
  const theme = themes[currentTheme] || themes.default
  return `<em style="${theme.em}">${text}</em>`
}

// 重写段落渲染
renderer.paragraph = function(text) {
  const theme = themes[currentTheme] || themes.default
  const paragraphStyle = theme.p || styles.p
  return `<p style="${paragraphStyle}">${text}</p>`
}

// 重写标题渲染
renderer.heading = function(text, level) {
  const theme = themes[currentTheme] || themes.default

  if (level === 1) {
    if (theme.h1Inner) {
      // GitHub 样式 - 使用特殊的内嵌样式
      return `<h1 style="${theme.h1}"><span style="${theme.h1Inner}"><span>${text}</span></span></h1>`
    } else {
      // 其他主题 - 简单样式
      return `<h1 style="${theme.h1}">${text}</h1>`
    }
  } else if (level === 2) {
    return `<h2 style="${theme.h2}">${text}</h2>`
  } else {
    return `<h${level} style="${theme.h3}">${text}</h${level}>`
  }
}

// 重写列表渲染
renderer.list = function(body, ordered) {
  const theme = themes[currentTheme] || themes.default
  const type = ordered ? 'ol' : 'ul'
  const themeStyle = theme[type] || (ordered ? styles.ol : styles.ul)
  return `<${type} style="${themeStyle}">${body}</${type}>`
}

renderer.listitem = function(text) {
  const theme = themes[currentTheme] || themes.default
  const listItemStyle = theme.li || styles.li

  // 如果内容不是以 <p> 或其他块级标签开始，则添加 <p> 标签包裹
  // 这是为了确保微信公众号编辑器能正确渲染列表项
  if (!text.trim().match(/^<(p|ul|ol|blockquote|pre|div)/)) {
    const paragraphStyle = theme.p || styles.p
    text = `<p style="${paragraphStyle}">${text}</p>`
  }

  return `<li style="${listItemStyle}">${text}</li>`
}

// 重写引用渲染
renderer.blockquote = function(quote) {
  const theme = themes[currentTheme] || themes.default
  return `<blockquote style="${theme.blockquote}">${quote}</blockquote>`
}

// 重写图片渲染
renderer.image = function(href, title, text) {
  return `<img src="${href}" alt="${text || ''}" title="${title || ''}" style="border-radius: 6px; display: block; margin: 20px auto 30px; object-fit: contain; box-shadow: rgb(153, 153, 153) 2px 4px 7px; height: auto !important; visibility: visible !important; width: 645px !important;" />`
}

// HTML 转义函数
function escapeHtml(text) {
  const div = document.createElement('div')
  div.textContent = text
  return div.innerHTML
}

// 生成脚注HTML
function generateFootnotes() {
  if (footnotes.length === 0) return ''

  const fontFamily = 'Optima-Regular, Optima, PingFangSC-light, PingFangTC-light, PingFang SC, Cambria, Cochin, Georgia, Times, Times New Roman, serif'

  let footnotesHtml = `<p style="margin-top: 30px; padding-top: 15px; border-top: 1px solid #e1e4e8; font-size: 16px; color: #586069; margin-bottom: 15px; font-weight: normal; text-align: left; font-family: ${fontFamily};"><strong>参考链接</strong></p>`
  footnotes.forEach((footnote) => {
    footnotesHtml += `<p style="margin: 8px 0; padding: 0; font-size: 14px; color: #333; line-height: 1.6; text-align: left; font-family: ${fontFamily};">[${footnote.id}] ${footnote.title}: <em style="color: #666; font-style: italic; font-family: ${fontFamily};">${footnote.url}</em></p>`
  })

  return footnotesHtml
}

// 主要的转换函数
export function markdownToWechat(markdown, theme = 'default') {
  // 设置当前主题
  currentTheme = theme

  // 重置脚注
  linkCounter = 0
  footnotes.length = 0

  // 配置marked选项
  marked.setOptions({
    renderer,
    gfm: true,
    breaks: true,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false
  })

  // 预处理 markdown 以支持任务列表
  // 直接将待办事项转换为HTML div，使用不会被markdown解析的标记
  markdown = markdown.replace(/^(\s*)- \[([ xX])\] (.+)$/gm, (match, indent, checked, text) => {
    const isChecked = checked.toLowerCase() === 'x'
    const checkboxSymbol = isChecked ? '☑️' : '☐'
    // 使用HTML注释作为标记，不会被markdown解析
    return `${indent}<!--TASKITEM--><div style="margin: 6px 0; padding-left: 0; list-style: none;">${checkboxSymbol} ${text}</div><!--ENDTASK-->`
  })

  // 转换markdown
  let html = marked.parse(markdown)

  // 后处理：清理HTML注释标记
  html = html.replace(/<!--TASKITEM-->|<!--ENDTASK-->/g, '')
  // 清理可能被包围在p标签中的情况
  html = html.replace(/<p>(\s*<div[^>]*>.*?<\/div>\s*)<\/p>/g, '$1')

  // 添加脚注
  html += generateFootnotes()

  // 包装在微信样式容器中
  return `<div style="${styles.container}">${html}</div>`
}