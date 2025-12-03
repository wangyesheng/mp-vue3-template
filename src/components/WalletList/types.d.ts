declare module 'vue' {
  export interface GlobalComponents {
    WalletItem: (typeof import('./Item.vue'))['default']
    WalletVerification: (typeof import('./Verification.vue'))['default']
  }
}

export {}
