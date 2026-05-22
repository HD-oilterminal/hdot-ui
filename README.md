# HDOT Design System

## 프로젝트 개요

HDOT 디자인시스템 Storybook. `hdot-tmaster-front`의 공통 컴포넌트를 문서화하고 GitHub Pages로 배포

- **배포 URL**: `https://hd-oilterminal.github.io/`
- **소스**: `hdot-tmaster-front`의 컴포넌트를 이식 (Nuxt 의존성 제거)
- **배포 방식**: `main` 브랜치 push → GitHub Actions → GitHub Pages

---

## 기술 스택

| 항목 | 버전 |
|------|------|
| Storybook | 8.x |
| Vue | 3.x |
| Vite | 6.x |
| TailwindCSS | 3.x |
| Pinia | 3.x |
| vue-i18n | 11.x |
| TypeScript | 5.x |

---

## 디렉토리 구조

```
hd-oilterminal.github.io/
├── .github/workflows/storybook.yml   # GitHub Pages 자동 배포
├── .storybook/
│   ├── main.ts                        # Storybook 설정 (Vue3+Vite, @ alias)
│   └── preview.ts                     # 전역 설정 (Pinia, vue-i18n, TailwindCSS)
├── src/
│   ├── assets/tailwind.css            # TailwindCSS 진입점
│   ├── i18n/kr.ts                     # 한국어 메시지 (컴포넌트에서 사용하는 키만)
│   ├── stores/
│   │   ├── mdi.ts                     # MDI 탭 상태 (useMdiStore)
│   │   └── menu.ts                    # 메뉴 데이터 (useMenuStore)
│   ├── types/
│   │   ├── menu.ts                    # MenuLv1Item, MenuLv2Item
│   │   └── main.ts                    # MainTab
│   └── components/
│       ├── Button/                    # 예시 컴포넌트 (초기 scaffold)
│       ├── layout/
│       │   ├── AppHeader.vue          # 헤더 (MDI 탭바, 세션 타이머, 로그아웃)
│       │   ├── AppHeader.stories.ts
│       │   ├── AppSidebar.vue         # 2단계 사이드바 메뉴
│       │   └── AppSidebar.stories.ts
│       └── mdi/
│           ├── MainDashboard.vue      # 메인 대시보드 (탭 + 필터 + 그리드 플레이스홀더)
│           ├── MainDashboard.stories.ts
│           ├── PlaceholderPage.vue    # 개발 중 페이지 플레이스홀더
│           └── PlaceholderPage.stories.ts
├── eslint.config.mjs                  # eslint-plugin-storybook 규칙
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 컴포넌트 이식 규칙 (hdot-tmaster-front → 이 프로젝트)

Nuxt 자동 import를 제거하고 명시적 import로 변환한다.

| 원본 (Nuxt) | 이식 후 |
|-------------|---------|
| `useI18n()` 자동 import | `import { useI18n } from 'vue-i18n'` |
| `ref`, `computed` 등 자동 import | `import { ref, computed } from 'vue'` |
| `navigateTo('/login')` | `emit('logout')` 으로 교체 |
| `useAuthApi().logout()` | 제거, emit으로 위임 |
| `~/types/...` | `@/types/...` |

**AppHeader**의 `logout` emit: 부모(Story decorator)에서 처리한다.

---

## Storybook 코딩 규칙

- 모든 스토리 파일은 `*.stories.ts` 확장자
- 반드시 `tags: ['autodocs']` 포함 (자동 문서 생성)
- 스토어 초기 상태는 story의 `decorators`에서 설정
- `eslint-plugin-storybook` 규칙 통과 필수 (`pnpm lint`)
- CSF3 형식 사용 (default export `Meta`, named export `StoryObj`)

---

## 스토어 Mock 데이터

스토리에서 스토어 상태를 설정하는 패턴:

```ts
decorators: [
  (story) => ({
    setup() {
      const mdiStore = useMdiStore()
      mdiStore.tabs = [...]
      mdiStore.activeTabId = 'op_main'
      return {}
    },
    template: '<story />',
  }),
]
```

---

## 개발 명령어

```bash
pnpm storybook          # 로컬 개발 서버 (port 6006)
pnpm build-storybook    # 정적 빌드 → storybook-static/
pnpm lint               # ESLint (Storybook 규칙)
```

---

## 이미지 파일

컴포넌트가 `/images/*.svg` 경로를 참조한다. Storybook에서 표시하려면 `public/images/`에 파일을 복사해야 한다. 소스: `hdot-tmaster-front/public/images/`

---

## 미완료 / 추후 작업

- [x] `public/images/` 에 SVG 아이콘 파일 복사
- [x] 빌드 최종 검증 (`pnpm build-storybook`)
- [x] ESLint TypeScript/Vue 파서 설정 (`@typescript-eslint/parser`, `vue-eslint-parser`)
- [ ] `hdot-tmaster-front`에 새 컴포넌트 추가 시 이 프로젝트에도 동기화
