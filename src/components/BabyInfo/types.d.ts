declare module 'vue' {
  export interface GlobalComponents {
    BabyPopupInfo: (typeof import('./Popup.vue'))['default']
    BabyStackingInfo: (typeof import('./Stacking.vue'))['default']
  }
}

export {}
