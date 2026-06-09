import { buildCategoryData, cleanLabel } from '@/lib/category'
import { CategoryArchive } from '@/components/category/category-archive'
import { CategoryEditorial } from '@/components/category/category-editorial'
import { CategoryGrouped } from '@/components/category/category-grouped'
import { CategorySidebar } from '@/components/category/category-sidebar'
import type { TopicKey } from '@/lib/topics'

export const dynamic = 'force-static'

const DESIGNS = [
  { id: 'A', name: '아카이브 테이블', Comp: CategoryArchive },
  { id: 'B', name: '에디토리얼 (피처드)', Comp: CategoryEditorial },
  { id: 'C', name: '서브카테고리 그룹', Comp: CategoryGrouped },
  { id: 'D', name: '사이드바 인덱스', Comp: CategorySidebar },
] as const

// '개발' = 포스트/서브카테고리 풍부, 'ai-생산성' = 시리즈 포함
const SAMPLE_CATS: TopicKey[] = ['개발', 'ai-생산성']

export default function CategoryLabPage() {
  return (
    <main className="py-10">
      <div className="mx-auto max-w-[1440px] px-6">
        <p className="font-mono text-xs uppercase tracking-widest text-primary">Preview / throwaway</p>
        <h1 className="mt-2 text-3xl font-bold">카테고리 디자인 4종 비교</h1>
        <p className="mt-2 text-muted-foreground">
          실제 콘텐츠로 A~D 디자인을 두 카테고리(개발 · AI&생산성)에 적용했습니다. 마음에 드는 안을
          고르면 해당 디자인을 카테고리 페이지에 적용하고 나머지/프리뷰는 제거합니다.
        </p>
      </div>

      {SAMPLE_CATS.map((cat, ci) => {
        const data = buildCategoryData(cat)
        return (
          <section key={cat}>
            <div className="mx-auto mt-16 max-w-[1440px] px-6">
              <div className="rounded-lg border border-primary/30 bg-primary/[0.04] px-4 py-3">
                <span className="font-mono text-sm text-primary">CATEGORY · {cleanLabel(data.label)}</span>
              </div>
            </div>

            {DESIGNS.map(({ id, name, Comp }) => (
              <div key={id} id={`shot-${ci}-${id}`}>
                <div className="mx-auto mt-12 max-w-[1440px] px-6">
                  <div className="border-t-2 border-dashed border-border/60 pt-6">
                    <span className="font-mono text-sm uppercase tracking-widest text-muted-foreground">
                      Design {id} — {name}
                    </span>
                  </div>
                </div>
                <Comp data={data} />
              </div>
            ))}
          </section>
        )
      })}
    </main>
  )
}
