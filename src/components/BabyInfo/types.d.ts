declare module 'vue' {
  export interface GlobalComponents {
    BabyPopupInfo: (typeof import('./Popup.vue'))['default']
  }
}

export {}
