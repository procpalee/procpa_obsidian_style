'use client'

import { useRef, useState, type HTMLAttributes } from 'react'

/**
 * MDX <pre> replacement with a CMDS-style copy button.
 * Reads text from the inner <code> element so the button label is never copied.
 */
export function CodeBlock(props: HTMLAttributes<HTMLPreElement>) {
  const ref = useRef<HTMLPreElement>(null)
  const [copied, setCopied] = useState(false)

  const copy = () => {
    const code = ref.current?.querySelector('code')
    const text = code?.textContent ?? ref.current?.textContent ?? ''
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }

  return (
    <pre ref={ref} {...props}>
      {props.children}
      <button
        type="button"
        onClick={copy}
        className="code-copy-btn"
        data-copied={copied}
        aria-label="코드 복사"
      >
        {copied ? 'Copied' : 'Copy'}
      </button>
    </pre>
  )
}
