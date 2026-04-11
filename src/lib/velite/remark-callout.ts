/**
 * remark-callout
 *
 * Obsidian-style callout syntax를 MDX JSX 컴포넌트로 변환하는 remark 플러그인.
 *
 * 지원 문법:
 *   > [!note] 제목
 *   > 내용
 *
 *   > [!warning]- 접힌 제목 (기본 접힘)
 *   > 내용
 *
 *   > [!tip]+ 펼친 제목 (기본 펼침, 접기 가능)
 *   > 내용
 */

const CALLOUT_RE = /^\[!(\w+)\]([+-])?\s*(.*)?$/

interface MdNode {
  type: string
  children?: MdNode[]
  value?: string
  name?: string
  attributes?: any[]
  data?: any
}

export default function remarkCallout() {
  return (tree: MdNode) => {
    visitBlockquotes(tree)
  }
}

function visitBlockquotes(node: MdNode): void {
  if (!node.children) return

  for (let i = 0; i < node.children.length; i++) {
    const child = node.children[i]

    if (child.type === 'blockquote' && child.children?.length) {
      const replaced = tryConvertCallout(child)
      if (replaced) {
        node.children[i] = replaced
      }
    }

    // Recurse into children
    visitBlockquotes(child)
  }
}

function tryConvertCallout(bq: MdNode): MdNode | null {
  const firstChild = bq.children?.[0]
  if (!firstChild || firstChild.type !== 'paragraph') return null

  const firstInline = firstChild.children?.[0]
  if (!firstInline || firstInline.type !== 'text' || !firstInline.value) return null

  const lines = firstInline.value.split('\n')
  const match = CALLOUT_RE.exec(lines[0])
  if (!match) return null

  const [, type, foldChar, titleText] = match
  const calloutType = type.toLowerCase()
  const foldable = foldChar === '-' || foldChar === '+'
  const defaultOpen = foldChar !== '-'
  const title = titleText?.trim() || calloutType.charAt(0).toUpperCase() + calloutType.slice(1)

  // 첫 줄을 제거하고 나머지 텍스트를 유지
  const remainingLines = lines.slice(1)

  if (remainingLines.length > 0) {
    firstInline.value = remainingLines.join('\n')
  } else {
    // 첫 inline 텍스트가 callout 마커만 포함
    firstChild.children!.shift()
    // 첫 paragraph가 비었으면 blockquote에서 제거
    if (firstChild.children!.length === 0) {
      bq.children!.shift()
    }
  }

  // blockquote를 MDX JSX 요소로 교체
  const attrs: any[] = [
    { type: 'mdxJsxAttribute', name: 'type', value: calloutType },
    { type: 'mdxJsxAttribute', name: 'title', value: title },
  ]
  if (foldable) {
    attrs.push({ type: 'mdxJsxAttribute', name: 'foldable', value: null })
    if (defaultOpen) {
      attrs.push({ type: 'mdxJsxAttribute', name: 'defaultOpen', value: null })
    }
  }

  return {
    type: 'mdxJsxFlowElement',
    name: 'Callout',
    attributes: attrs,
    children: bq.children ?? [],
    data: { _mdxExplicitJsx: true },
  }
}
