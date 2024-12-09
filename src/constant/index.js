import waitSign from '../static/images/me/waitSign.png'
import waitShare from '../static/images/me/waitShare.png'
import waitOperation from '../static/images/me/waitOperation.png'
import signed from '../static/images/me/signed.png'
import refuseSign from '../static/images/me/refuseSign.png'
import waitIcon from '../static/images/wait.png'
import boundIcon from '../static/images/bound.png'
import refuseIcon from '../static/images/refuse.png'
import passIcon from '../static/images/pass.png'

export const contractStatusList = [
  {
    label: '待签署',
    icon: waitSign,
    value: 0
  },
  {
    label: '待分享',
    icon: waitShare,
    value: 1
  },
  {
    label: '待操作',
    icon: waitOperation,
    value: 2
  },
  {
    label: '已签署',
    icon: signed,
    value: 4
  },
  {
    label: '已拒签',
    icon: refuseSign,
    value: 5
  }
]

export const contractStatusFullList = [
  {
    label: '待甲方签署',
    icon: waitSign,
    value: 0
  },
  {
    label: '待甲方分享',
    icon: waitShare,
    value: 1
  },
  {
    label: '待乙方操作',
    icon: waitOperation,
    value: 2
  },
  {
    label: '待乙方签署',
    icon: waitSign,
    value: 3
  },
  {
    label: '已签署',
    icon: signed,
    value: 4
  },
  {
    label: '已拒签',
    icon: refuseSign,
    value: 5
  }
]

export const signInvitationStatusMap = {
  2: {
    icon: waitIcon,
    label: '待签署'
  },
  3: {
    icon: boundIcon,
    label: '乙方信息已绑定'
  },
  4: {
    icon: passIcon,
    label: '已签署'
  },
  5: {
    icon: refuseIcon,
    label: '已拒签'
  }
}
