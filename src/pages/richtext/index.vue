<template>
  <view>
    <view class="editor_toolbox">
      <view style="display: flex">
        <i class="iconfont icon-undo" data-method="undo" @tap="edit" />
        <i class="iconfont icon-redo" data-method="redo" @tap="edit" />
        <i class="iconfont icon-img" data-method="insertImg" @tap="edit" />
        <i class="iconfont icon-video" data-method="insertVideo" @tap="edit" />
        <i class="iconfont icon-link" data-method="insertLink" @tap="edit" />
        <i class="iconfont icon-text" data-method="insertText" @tap="edit" />
        <i
          class="iconfont icon-line"
          data-method="insertHtml"
          data-param="<hr style='margin:10px 0'/>"
          @tap="edit" />
        <i class="iconfont icon-heading" @tap="insertHead" />
      </view>
      <view style="display: flex">
        <i
          class="iconfont icon-quote"
          data-method="insertHtml"
          data-param="<blockquote style='padding:0 1em;color:#6a737d;border-left:.25em solid #dfe2e5'>引用</blockquote>"
          @tap="edit" />
        <i class="iconfont icon-table" @tap="insertTable" />
        <i class="iconfont icon-code" @tap="insertCode" />
        <i class="iconfont icon-emoji" data-type="emoji" @tap="openDialog" />
        <i
          class="iconfont icon-template"
          data-type="template"
          @tap="openDialog" />
        <i class="iconfont icon-clear" @tap="clear" />
        <i class="iconfont icon-load" @tap="load" />
        <i
          :class="'iconfont icon-' + (editable ? 'save' : 'edit')"
          @tap="save" />
      </view>
    </view>
    <view style="padding-top: 90px">
      <mp-html
        ref="article"
        container-style="padding:20px;min-height:calc(100vh - 130px)"
        :content="content"
        domain="https://mp-html.oss-cn-hangzhou.aliyuncs.com"
        :tag-style="tagStyle"
        :editable="editable"
        @remove="remove" />
    </view>
    <block v-if="modal">
      <view class="mask" />
      <view class="modal">
        <view class="modal_title">{{ modal.title }}</view>
        <view class="modal_body">
          <block v-if="modal.title == '插入表格'">
            <picker
              class="modal_picker"
              :range="[1, 2, 3, 4, 5, 6, 7, 8, 9]"
              data-type="rows"
              @change="pickerChange">
              {{ rows }}
            </picker>
            行
            <picker
              class="modal_picker"
              :range="[1, 2, 3, 4, 5]"
              data-type="cols"
              @change="pickerChange">
              {{ cols }}
            </picker>
            列
          </block>
          <input
            v-else
            class="modal_input"
            :value="modal.value"
            maxlength="-1"
            auto-focus
            @input="modalInput" />
        </view>
        <view class="modal_foot">
          <view class="modal_button" @tap="modalCancel">取消</view>
          <view
            class="modal_button"
            style="color: #576b95; border-left: 1px solid rgba(0, 0, 0, 0.1)"
            @tap="modalConfirm">
            确定
          </view>
        </view>
      </view>
    </block>
    <!-- 底部弹窗 -->
    <view class="fadeIn" v-if="dialog">
      <view class="mask" @tap="closeDialog"></view>
      <view class="weui-half-screen-dialog">
        <view class="weui-half-screen-dialog__hd">
          <view class="weui-half-screen-dialog__hd__side" @tap="closeDialog">
            <view class="weui-icon-btn">
              <i class="weui-icon-close-thin"></i>
            </view>
          </view>
          <view class="weui-half-screen-dialog__hd__main">
            <strong class="weui-half-screen-dialog__title">
              插入{{ dialog == 'emoji' ? '表情' : '模板' }}
            </strong>
          </view>
        </view>
        <view
          class="weui-half-screen-dialog__bd"
          :style="
            'height:' +
            (dialog == 'emoji' ? '105' : '150') +
            'px; padding-bottom: 30px;'
          ">
          <view
            v-if="dialog == 'emoji'"
            v-for="(line, index) in emojis"
            style="display: flex; font-size: 20px; line-height: 35px">
            <view
              style="flex: 1"
              v-for="(item, index) in line"
              :data-emoji="item"
              @tap="insertEmoji">
              {{ item }}
            </view>
          </view>
          <view
            v-if="dialog == 'template'"
            v-for="(item, index) in templates"
            @tap="closeDialog">
            <rich-text
              :nodes="item"
              data-method="insertHtml"
              :data-param="item"
              @tap="edit" />
            <view
              style="
                border-top: 1px dashed gray;
                width: 80%;
                height: 0;
                margin: 20px auto;
              " />
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import mpHtml from '@/components/mp-html/mp-html'
import content from './content'
// 上传图片方法
function upload(src, type) {
  return new Promise((resolve, reject) => {
    console.log('上传', type === 'img' ? '图片' : '视频', '：', src)
    resolve(src)
    /*
			// 实际使用时，上传到服务器
			wx.uploadFile({
			  url: 'xxx', // 接口地址
			  filePath: src,
			  name: 'xxx',
			  success(res) {
			    resolve(res.data.path) // 返回线上地址
			  },
			  fail: reject
			})
			*/
  })
}
// 删除图片方法
function remove(src) {
  console.log('删除图片：', src)
  // 实际使用时，删除线上资源
}
export default {
  data() {
    return {
      content,
      modal: null,
      dialog: false,
      editable: true,
      // 预设的标签样式
      tagStyle: {
        table:
          'box-sizing:border-box;border-top:1px solid #dfe2e5;border-left:1px solid #dfe2e5',
        th: 'border-right:1px solid #dfe2e5;border-bottom:1px solid #dfe2e5',
        td: 'border-right:1px solid #dfe2e5;border-bottom:1px solid #dfe2e5',
        li: 'margin:5px 0'
      },
      rows: 1,
      cols: 1,
      // 用于插入的 emoji 表情
      emojis: [
        ['😄', '😷', '😂', '😝', '😳', '😱', '😔', '😒', '😉'],
        ['😎', '😭', '😍', '😘', '🤔', '😕', '🙃', '🤑', '😲'],
        ['🙄', '😤', '😴', '🤓', '😡', '😑', '😮', '🤒', '🤮']
      ],
      // 用于插入的 html 模板
      templates: [
        '<section style="text-align: center; margin: 0px auto;"><section style="border-radius: 4px; border: 1px solid #757576; display: inline-block; padding: 5px 20px;"><span style="font-size: 18px; color: #595959;">标题</span></section></section>',
        '<div style="width: 100%; box-sizing: border-box; border-radius: 5px; background-color: #f6f6f6; padding: 10px; margin: 10px 0"><div>卡片</div><div style="font-size: 12px; color: gray">正文</div></div>',
        '<div style="border: 1px solid gray; box-shadow: 3px 3px 0px #cfcfce; padding: 10px; margin: 10px 0">段落</div>'
      ]
    }
  },
  components: {
    mpHtml
  },
  onLoad() {
    uni.showActionSheet({
      itemList: ['简易模式', '正常模式'],
      success: (e) => {
        if (e.tapIndex === 0) {
          this._editmode = 'simple'
          this.editable = this._editmode
        } else {
          this._editmode = true
        }
      }
    })
  },
  onReady() {
    /**
     * @description 设置获取链接的方法
     * @param {String} type 链接的类型（img/video/audio/link）
     * @param {String} value 修改链接时，这里会传入旧值
     * @returns {Promise} 返回线上地址
     *   type 为音视频时可以返回一个数组作为源地址
     *   type 为 audio 时，可以返回一个 object，包含 src、name、author、poster 等字段
     */
    this.$refs.article.getSrc = (type, value) => {
      return new Promise((resolve, reject) => {
        if (type === 'img' || type === 'video') {
          uni.showActionSheet({
            itemList: ['本地选取', '远程链接'],
            success: (res) => {
              if (res.tapIndex === 0) {
                // 本地选取
                if (type === 'img') {
                  uni.chooseImage({
                    count: value === undefined ? 9 : 1, // 2.2.0 版本起插入图片时支持多张（修改图片链接时仅限一张）
                    success: (res) => {
                      // #ifdef MP-WEIXIN
                      if (res.tempFilePaths.length == 1 && wx.editImage) {
                        // 单张图片时进行编辑
                        wx.editImage({
                          src: res.tempFilePaths[0],
                          complete: (res2) => {
                            uni.showLoading({
                              title: '上传中'
                            })
                            upload(
                              res2.tempFilePath || res.tempFilePaths[0],
                              type
                            ).then((res) => {
                              uni.hideLoading()
                              resolve(res)
                            })
                          }
                        })
                      } else {
                        // #endif
                        uni.showLoading({
                          title: '上传中'
                        })
                        ;(async () => {
                          const arr = []
                          for (let item of res.tempFilePaths) {
                            // 依次上传
                            const src = await upload(item, type)
                            arr.push(src)
                          }
                          return arr
                        })().then((res) => {
                          uni.hideLoading()
                          resolve(res)
                        })
                        // #ifdef MP-WEIXIN
                      }
                      // #endif
                    },
                    fail: reject
                  })
                } else {
                  uni.chooseVideo({
                    success: (res) => {
                      uni.showLoading({
                        title: '上传中'
                      })
                      upload(res.tempFilePath, type).then((res) => {
                        uni.hideLoading()
                        resolve(res)
                      })
                    },
                    fail: reject
                  })
                }
              } else {
                // 远程链接
                this.callback = {
                  resolve,
                  reject
                }
                this.$set(this, 'modal', {
                  title: (type === 'img' ? '图片' : '视频') + '链接',
                  value
                })
              }
            }
          })
        } else {
          this.callback = {
            resolve,
            reject
          }
          let title
          if (type === 'audio') {
            title = '音频链接'
          } else if (type === 'link') {
            title = '链接地址'
          }
          this.$set(this, 'modal', {
            title,
            value
          })
        }
      })
    }
  },
  methods: {
    // 删除图片/视频/音频标签事件
    remove(e) {
      // 删除线上资源
      remove(e.src)
    },
    // 处理模态框
    modalInput(e) {
      this.value = e.detail.value
    },
    modalConfirm() {
      this.callback.resolve(this.value || this.modal.value || '')
      this.$set(this, 'modal', null)
    },
    modalCancel() {
      this.callback.reject()
      this.$set(this, 'modal', null)
    },
    pickerChange(e) {
      this.$set(
        this,
        e.currentTarget.dataset.type,
        parseInt(e.detail.value) + 1
      )
    },
    // 处理底部弹窗
    openDialog(e) {
      this.checkEditable()
        .then(() => {
          this.$set(this, 'dialog', e.currentTarget.dataset.type)
        })
        .catch(() => {})
    },
    closeDialog() {
      this.$set(this, 'dialog', false)
    },
    // 检查是否可编辑
    checkEditable() {
      return new Promise((resolve, reject) => {
        if (this.editable) {
          resolve()
        } else {
          uni.showModal({
            content: '需要继续编辑吗？',
            success: (res) => {
              if (res.confirm) {
                // 切换编辑状态
                this.save()
                resolve()
              } else {
                reject()
              }
            }
          })
        }
      })
    },
    // 调用编辑器接口
    edit(e) {
      this.checkEditable().then(() => {
        this.$refs.article[e.currentTarget.dataset.method](
          e.currentTarget.dataset.param
        )
      })
    },
    // 插入 head 系列标签
    insertHead() {
      this.checkEditable()
        .then(() => {
          uni.showActionSheet({
            itemList: ['大标题', '中标题', '小标题'],
            success: (res) => {
              let tagName = ['h1', 'h3', 'h5'][res.tapIndex]
              this.$refs.article.insertHtml(`<${tagName}>标题</${tagName}>`)
            }
          })
        })
        .catch(() => {})
    },
    // 插入表格
    insertTable() {
      this.checkEditable()
        .then(() => {
          this.$set(this, 'modal', {
            title: '插入表格'
          })
          this.callback = {
            resolve: () => {
              this.$refs.article.insertTable(this.rows, this.cols)
            },
            reject: () => {}
          }
        })
        .catch(() => {})
    },
    // 插入代码
    insertCode() {
      this.checkEditable()
        .then(() => {
          uni.showActionSheet({
            itemList: ['css', 'javascript', 'json'],
            success: (res) => {
              const lan = ['css', 'javascript', 'json'][res.tapIndex]
              this.$refs.article.insertHtml(
                `<pre><code class="language-${lan}">${lan} code</code></pre>`
              )
            }
          })
        })
        .catch(() => {})
    },
    // 插入 emoji
    insertEmoji(e) {
      this.$refs.article.insertHtml(e.currentTarget.dataset.emoji)
      this.closeDialog()
    },
    // 清空编辑器内容
    clear() {
      uni.showModal({
        title: '确认',
        content: '确定清空内容吗？',
        success: (res) => {
          if (res.confirm) this.$refs.article.clear()
        }
      })
    },
    // 加载内容
    load() {
      this.checkEditable()
        .then(() => {
          uni.showModal({
            title: '提示',
            content: '导入内容将覆盖现有内容，是否继续？',
            success: (res) => {
              if (res.confirm) {
                if (!uni.chooseMessageFile) {
                  return uni.showModal({
                    title: '失败',
                    content: '暂时无法使用此功能',
                    showCancel: false
                  })
                }
                uni.chooseMessageFile({
                  count: 1,
                  type: 'file',
                  extension: ['txt', 'html'],
                  success: (res) => {
                    const content = uni
                      .getFileSystemManager()
                      .readFileSync(res.tempFiles[0].path, 'utf8')
                    this.$refs.article.setContent(content)
                  }
                })
              }
            }
          })
        })
        .catch(() => {})
    },
    // 保存编辑器内容
    save() {
      setTimeout(() => {
        if (this.editable) {
          var content = this.$refs.article.getContent()
          uni.showModal({
            title: '保存',
            content,
            confirmText: '完成',
            success: (res) => {
              if (res.confirm) {
                // 复制到剪贴板
                uni.setClipboardData({
                  data: content
                })
                this.content = content
                // 结束编辑
                this.editable = false
              }
            }
          })
        } else {
          this.editable = this._editmode
        }
      }, 50)
    }
  }
}
</script>

<style>
page {
  line-height: 1.6;
}

.editor_toolbox {
  position: fixed;
  width: 100%;
  z-index: 999;
  top: 0;
  background-color: #ededed;
  padding: 5px;
  box-sizing: border-box;
}

@font-face {
  font-family: 'iconfont';
  src: url('data:application/x-font-woff2;charset=utf-8;base64,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')
    format('woff2');
}

.iconfont {
  flex: 1;
  text-align: center;
  font-family: 'iconfont' !important;
  font-size: 22px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-undo:before {
  content: '\eb75';
}

.icon-redo:before {
  content: '\eb71';
}

.icon-img:before {
  content: '\e9ee';
}

.icon-video:before {
  content: '\e9f0';
}

.icon-link:before {
  content: '\eb05';
}

.icon-text:before {
  content: '\ecdf';
}

.icon-line:before {
  content: '\e7fd';
}

.icon-heading:before {
  content: '\e735';
}

.icon-heading:before {
  content: '\e735';
}

.icon-quote:before {
  content: '\eb09';
}

.icon-table:before {
  content: '\eb0a';
}

.icon-code:before {
  content: '\e9ba';
}

.icon-emoji:before {
  content: '\e7a1';
}

.icon-template:before {
  content: '\e73d';
}

.icon-clear:before {
  content: '\e6fc';
}

.icon-load:before {
  content: '\e65d';
}

.icon-edit:before {
  content: '\eb03';
}

.icon-save:before {
  content: '\e747';
}

/* 模态框 */
.modal {
  position: fixed;
  top: 50%;
  left: 16px;
  right: 16px;
  background-color: #fff;
  border-radius: 12px;
  transform: translateY(-50%);
  text-align: center;
}

.modal_title {
  padding: 32px 24px 16px;
  font-size: 17px;
  font-weight: 700;
  text-align: center;
}

.modal_body {
  padding: 0 24px;
  margin-bottom: 32px;
  font-size: 17px;
  line-height: 1.4;
  word-wrap: break-word;
  color: rgba(0, 0, 0, 0.5);
}

.modal_input {
  display: block;
  padding: 5px;
  font-size: 14px;
  border: 1px solid #dfe2e5;
}

.modal_picker {
  display: inline-block;
  margin: 0 5px;
  border-bottom: 1px solid gray;
  padding: 0 5px;
}

.modal_foot {
  display: flex;
  line-height: 56px;
  font-weight: 700;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.modal_button {
  flex: 1;
  text-align: center;
}

.fadeIn {
  -webkit-animation: c 0.3s forwards;
  animation: c 0.3s forwards;
}

.weui-half-screen-dialog {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  max-height: 75%;
  z-index: 5000;
  line-height: 1.4;
  background-color: #fff;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  overflow: hidden;
  padding: 0 24px;
  padding: 0 calc(24px + constant(safe-area-inset-right))
    constant(safe-area-inset-bottom) calc(24px + constant(safe-area-inset-left));
  padding: 0 calc(24px + env(safe-area-inset-right)) env(safe-area-inset-bottom)
    calc(24px + env(safe-area-inset-left));
}

.weui-half-screen-dialog__hd {
  font-size: 8px;
  height: 8em;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
}

.weui-half-screen-dialog__hd .weui-icon-btn {
  position: absolute;
  top: 50%;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
}

.weui-half-screen-dialog__hd__side {
  position: relative;
  left: -8px;
}

.weui-half-screen-dialog__hd__main {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
}

.weui-half-screen-dialog__title {
  display: block;
  color: rgba(0, 0, 0, 0.9);
  font-weight: 700;
  font-size: 15px;
}

.weui-half-screen-dialog__hd__side + .weui-half-screen-dialog__hd__main {
  text-align: center;
  padding: 0 40px;
}

.weui-half-screen-dialog__hd .weui-icon-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.weui-icon-close-thin {
  mask-image: url(data:image/svg+xml,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M12.25%2010.693L6.057%204.5%205%205.557l6.193%206.193L5%2017.943%206.057%2019l6.193-6.193L18.443%2019l1.057-1.057-6.193-6.193L19.5%205.557%2018.443%204.5z%22%20fill-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E);
  display: inline-block;
  vertical-align: middle;
  width: 24px;
  height: 24px;
  mask-position: 50% 50%;
  mask-repeat: no-repeat;
  mask-size: 100%;
  background-color: currentColor;
}

.weui-half-screen-dialog__bd {
  padding-top: 4px;
  padding-bottom: 40px;
  font-size: 14px;
  overflow-y: auto;
}

/* 蒙版 */
.mask {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: black;
  opacity: 0.5;
}
</style>
