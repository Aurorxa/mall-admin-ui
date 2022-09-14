/// <reference types="vite/client" />

declare module '*.vue' {
  import type {DefineComponent} from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string,
  readonly VITE_APP_BUILD_DIRECTORY: string,
  readonly VITE_APP_BASE_URL: string,
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $dialogService: typeof import('@caroundsky/el-plus-dialog-service')['default']
  }
}
