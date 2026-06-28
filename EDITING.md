# 사이트 직접 수정 가이드

개발 지식이 없어도 **문구·목록·이미지**를 직접 고칠 수 있도록 정리했습니다.
대부분 "정해진 파일에서 따옴표 안의 글자만 바꾸고 저장" 하면 됩니다.

---

## 1. 문구(텍스트) 수정 — `src/lib/site-content.ts`

홈 히어로·섹션 제목·CTA·강점(Approach)·각 페이지 제목/설명·메뉴·문의 폼 라벨 등
**화면에 보이는 거의 모든 문구**가 이 한 파일에 모여 있습니다.

예시:
```ts
home: {
  hero: {
    badge: '공인회계사 · AI 자문위원',     // ← 이 따옴표 안 글자만 수정
    headline1: '회계 전문성에',
    headlineAccent: 'AI의 생산성',          // 파란 그라데이션 강조어
    headlineSuffix: '을 더합니다',
    ...
  },
},
```

규칙:
- **따옴표(`'...'`)와 끝의 쉼표(`,`)는 그대로 두고** 안쪽 글자만 바꾸세요.
- 문구 안에 작은따옴표(`'`)가 필요하면 큰따옴표(`"..."`)로 감싸세요.
- `meta`의 title/description은 검색결과·카카오/링크 공유 카드에 쓰입니다.

## 2. 목록 수정 — `src/lib/*-data.ts`

여러 개가 반복되는 항목은 각 데이터 파일에서 추가/수정/삭제합니다.

| 무엇 | 파일 |
|---|---|
| 서비스(회계 자문·AI 도입 등 4종) | `src/lib/services-data.ts` |
| 도서(포트폴리오) | `src/lib/publications-data.ts` |
| 강의(현재 비어 있음 → 추가하면 자동 노출) | `src/lib/lectures-data.ts` |
| 프로젝트 | `src/lib/projects-data.ts` |
| 외부활동(언론·활동, *소개* 페이지에 표시) | `src/lib/press-data.ts` |
| 경력·학력·전문분야·자격증·통계·연락처 | `src/lib/about-data.ts` |
| 후기(있을 때만 노출) | `src/lib/testimonials-data.ts` |
| 이메일·카카오·블로그·위키독스 등 링크 | `src/lib/site-config.ts` |

항목 추가는 기존 `{ ... }` 한 덩어리를 복사해 붙여넣고 내용만 바꾸면 됩니다(끝에 쉼표 유지).

## 3. 이미지 교체 — `public/`

- 홈 히어로 배경: `public/hero-cover.jpg` (같은 이름으로 덮어쓰면 교체)
- 도서 표지: `public/covers/*.jpg` (파일명은 `publications-data.ts`의 `cover` 값과 일치시키기)

## 4. 법적 페이지(이용약관·면책조항)

본문이 길어 별도 파일에서 직접 수정합니다: `src/app/terms/page.tsx`, `src/app/disclaimer/page.tsx`.

## 5. 문의 폼 켜기 (Web3Forms)

문의(`/contact`) 페이지의 **업무 문의는 "폼" 형태**로 만들어져 있습니다.
다만 **무료 키(Web3Forms Access Key)를 등록해야 폼이 실제로 동작**합니다.
키를 넣기 전에는 자동으로 이메일·카카오 링크가 대신 표시됩니다(정상 동작이며, 방문자가 연락할 수 있습니다).

켜는 방법:

1. **키 발급** — [web3forms.com](https://web3forms.com) 접속 → 문의를 받을 이메일 주소를 입력하면 **Access Key**가 메일로 옵니다(무료, 가입 불필요).
2. **로컬 적용** — 프로젝트 루트에 `.env.local` 파일을 만들고 아래 한 줄을 넣습니다(따옴표 없이):
   ```
   NEXT_PUBLIC_WEB3FORMS_KEY=발급받은키
   ```
   `.env.local`은 자동으로 깃에 올라가지 않습니다(비밀 보관). `npm run dev`로 폼이 뜨는지 확인하세요.
3. **운영(배포)에 적용** — Vercel 대시보드 → 해당 프로젝트 → **Settings → Environment Variables** →
   Name `NEXT_PUBLIC_WEB3FORMS_KEY`, Value `발급받은키`, 환경은 **Production**(원하면 Preview/Development도) 선택 후 저장 →
   **Deployments**에서 최신 배포를 **Redeploy** 하면 운영 사이트에 폼이 켜집니다.
4. 폼으로 들어온 문의는 1번에서 입력한 이메일로 전달됩니다. (메일 제목 형식은 `src/components/contact-form.tsx`에서 조정 가능)

---

## 미리보기 & 반영(배포)

```bash
npm run dev        # 로컬 미리보기 → http://localhost:3000 에서 확인
```

수정이 만족스러우면 저장 후:

```bash
git add -A
git commit -m "문구 수정"
git push
```

`master`에 push하면 **Vercel이 자동 배포**합니다. (배포 전 확인하려면 `npm run build` 로 오류가 없는지 점검)

## 주의

- 콤마/따옴표/중괄호 같은 **형식 문자는 지우지 마세요**(문구 글자만 수정).
- 저장 후 화면이 깨지면, 방금 바꾼 부분의 따옴표·쉼표 짝이 맞는지 확인하세요.
- `content/` 폴더(옛 원고)는 사이트에 사용되지 않습니다(외부 위키독스·네이버로 이전).
