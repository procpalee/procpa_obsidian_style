// Obsidian 콜아웃(`> [!info] 제목`) 블록인용을 <div class="callout callout-<type>">로 변환.
// remark-rehype의 data.hName/hProperties 훅을 사용해 HTML 파이프라인에서 동작한다.
import { visit } from 'unist-util-visit'

const CALLOUT_RE = /^\[!(\w+)\][+-]?\s*(.*)$/

type MdNode = {
  type: string
  children?: MdNode[]
  value?: string
  data?: { hName?: string; hProperties?: Record<string, unknown> }
}

export default function remarkCallout() {
  return (tree: MdNode) => {
    visit(tree as never, 'blockquote', (bq: MdNode) => {
      const firstPara = bq.children?.[0]
      if (!firstPara || firstPara.type !== 'paragraph' || !firstPara.children?.length) return
      const firstText = firstPara.children[0]
      if (firstText.type !== 'text' || !firstText.value) return

      const lines = firstText.value.split('\n')
      const m = CALLOUT_RE.exec(lines[0])
      if (!m) return

      const type = m[1].toLowerCase()
      const title = (m[2] || '').trim() || type.charAt(0).toUpperCase() + type.slice(1)

      // 첫 줄(마커)을 본문에서 제거
      const rest = lines.slice(1).join('\n')
      if (rest) firstText.value = rest
      else {
        firstPara.children.shift()
        if (firstPara.children.length === 0) bq.children!.shift()
      }

      // 콜아웃 컨테이너 + 제목
      bq.data = { hName: 'div', hProperties: { className: ['callout', `callout-${type}`] } }
      bq.children!.unshift({
        type: 'paragraph',
        data: { hName: 'div', hProperties: { className: ['callout-title'] } },
        children: [{ type: 'text', value: title }],
      })
    })
  }
}
