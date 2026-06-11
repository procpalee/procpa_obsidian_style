'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { InquiryEmbed } from '@/components/inquiry-embed'
import { FORMS } from '@/lib/site-config'

/**
 * Freemium email gate: clicking the trigger opens a dialog with a hosted
 * email-capture form. The form is configured (owner-side) to redirect to the
 * file on submit, so the gate is enforced without any client/backend logic.
 */
export function EmailGate({
  productSlug,
  gateFormUrl,
  label = '이메일 받고 무료 다운로드',
  className,
}: {
  productSlug: string
  gateFormUrl?: string
  label?: string
  className?: string
}) {
  return (
    <Dialog>
      <DialogTrigger
        className={
          className ??
          'inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90'
        }
      >
        {label}
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>이메일 입력 후 다운로드</DialogTitle>
          <DialogDescription>
            이메일을 남겨주시면 자료를 바로 받아보실 수 있습니다. 업데이트 소식도 함께 전해드립니다.
          </DialogDescription>
        </DialogHeader>
        <InquiryEmbed
          formUrl={gateFormUrl ?? FORMS.emailGateDefault}
          service={productSlug}
          title="이메일 입력 후 다운로드"
          minHeight={420}
        />
      </DialogContent>
    </Dialog>
  )
}
