<template>
  <AppContainer>
    <div class="activity">
      <PageList :api="getActivitiesRes">
        <template #item="{ data }">
          <div class="item">
            <div class="inner">
              <div class="img">
                <image :src="data.image" mode="aspectFit" />
              </div>
              <div class="info">
                <nut-ellipsis :content="data.title" direction="end" />
                <div class="flex items-center gap-x-[5rpx] mt-[20rpx]">
                  <nut-icon name="clock" custom-color="#666" size="12" />
                  <span class="text-[#666] text-[24rpx]">
                    {{ data.begin_time }} ~ {{ data.end_time }}
                  </span>
                </div>
                <div class="flex justify-between items-center mt-[10rpx]">
                  <div class="flex items-center gap-x-[5rpx]">
                    <nut-icon name="locationg3" custom-color="#666" size="14" />
                    <span class="text-[#666] text-[24rpx]">
                      {{ data.address }}
                    </span>
                  </div>
                  <nut-button
                    plain
                    type="primary"
                    size="mini"
                    @click="
                      navTo(`/pages/home/activity-details?id=${data.id}`, false)
                    ">
                    查看详情
                  </nut-button>
                </div>
              </div>
            </div>
          </div>
        </template>
      </PageList>
    </div>
  </AppContainer>
</template>

<script setup>
import { getActivitiesRes } from '@/api'
import { navTo } from '@/utils/uni'
</script>

<style lang="scss" scoped>
.activity {
  padding: 30rpx 20rpx;
  box-sizing: border-box;

  .item {
    border-radius: 15rpx;
    // 如果不设置该属性，则会导致子元素的圆角效果无法显示（子元素添加背景色溢出导致圆角被遮盖）
    overflow: hidden;
    position: relative;

    .inner {
      width: 100%;
      background: #fff;
      display: flex;
      align-items: center;

      .img {
        width: 220rpx;
        height: auto;
        align-self: stretch;
        display: flex;
        justify-content: center;
        align-items: center;

        image {
          width: 90%;
          height: 90%;
          border-radius: 15rpx;
        }
      }

      .info {
        flex: 1;
        padding: 20rpx 30rpx 20rpx 10rpx;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;

        ::v-deep() {
          .nut-ellipsis {
            font-size: 30rpx !important;
            font-weight: 500;
          }
        }

        .bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      }
    }
  }
}
</style>
