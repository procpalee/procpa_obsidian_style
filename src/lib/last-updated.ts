import { execSync } from 'node:child_process'

/**
 * 마지막 git 커밋(=최종 push) 일자(YYYY-MM-DD).
 * 빌드 시점에 한 번 계산되며, git 정보를 못 읽으면 빌드 일자로 폴백한다.
 * Vercel은 Git 연동 배포 시 저장소를 체크아웃하므로 최종 push 커밋 일자가 잡힌다.
 */
export function getLastPushDate(): string {
  // Vercel이 주입하는 커밋 SHA가 있으면 그 커밋의 일자를 우선 시도
  const sha = process.env.VERCEL_GIT_COMMIT_SHA
  try {
    const ref = sha ? `${sha}` : 'HEAD'
    return execSync(`git log -1 --format=%cs ${ref}`, { encoding: 'utf8' }).trim()
  } catch {
    try {
      return execSync('git log -1 --format=%cs', { encoding: 'utf8' }).trim()
    } catch {
      return new Date().toISOString().slice(0, 10)
    }
  }
}
