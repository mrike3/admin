import { createI18n } from 'vue-i18n'

const MyZh = {
    theme:{
        title: '主题设置',
        appearance:{
          title: '外观',
          theme:{
              title: '主题',
              list:{
                  light: '浅色',
                  dark: '深色',
                  System:'跟随系统'
              }
          },
          darksidebar: '深色侧边栏',
          darktopbar: '深色顶栏',
          builtin:{
              title: '内置主题',
              list:{
                  default: '默认',
                  violet: '紫罗兰',
                  pink:'樱花粉',
                  yellow: '柠檬黄',
                  skyblue: '天蓝色',
                  green: '浅绿色',
                  zinc: '锌灰色',
                  deepgreen: '深绿色',
                  deepblue: '深蓝色',
                  orange: '橙黄色',
                  rose: '玫瑰红',
                  neutrals: '中性色',
                  slate: '板岩灰',
                  gray: '中灰色',
                  customize:'自定义'
              }
          },
          other:{
              title: '其他',
              list:{
                  weakmode: '色弱模式',
                  graymode: '灰色模式',
              }
          }
      },
        layout:{
            title: '布局',
            layout:{
                title: '布局',
                list:{
                    vertical: '垂直',
                    horizontal: '水平',
                    towcolumns: '双列菜单',
                    mixedmenu: '混合菜单',
                    fullcontent: '全屏内容',
                }
            },
            sidebar:{
                title: '侧边栏',
                list:{
                    showsidebar: '显示侧边栏',
                    collpasesidebar: '折叠菜单',
                }
            },
            topbar:{
                title: '顶栏',
                list:{
                    showtopbar: '显示顶栏',
                }
            },
            copyright:{
                title: '版权',
                list:{
                    open: '启用版权',
                    name: '版权名称',
                    date: '版权日期',
                }
            }
        },
        shortcut:{
            title: '快捷键',
            global:{
                title: '全局',
                list:{
                    shortcut: '快捷键',
                    globalsearch: '全局搜索',
                    logout: '退出登录',
                    lock: '锁定屏幕',
                }
            }
        },
        general:{
            title: '通用',
            general:{
                title: '通用',
                list:{
                    language: '语言',
                    wartermark: '水印',
                }
            },
            animation:{
                title: '动画',
                list:{
                    open: '页面切换动画',
                }
            }
        }
    },
    moreBtn: {
        refresh: '刷新',
        closeCurrent: '关闭当前',
        closeLeft: '关闭左侧',
        closeRight: '关闭右侧',
        closeOthers: '关闭其他',
        closeAll: '关闭全部'
    },
    error: '错误提示',
    NotFound: {
        title:'哎呀！未找到页面',
        content:'抱歉，我们无法找到您要找的页面。',
        btn:'返回首页'
    },
    NotPermission: {
        title:'哎呀！访问被拒绝',
        content:'抱歉，您没有权限访问此页面。',
        btn:'返回首页'
    },
    Wrong:{
        title:'哎呀！出错了',
        content:'抱歉，服务器遇到错误。',
        btn:'返回首页'
    },
    header:{
        document: '文档',
        help: '帮助',
        lock: '锁定',
        logout: '登出',
        SearchPlaceholder: '请输入菜单关键字搜索',
        SearchNull: '暂无菜单',
        SearchBtn:{
            choose: '选择',
            tab: '切换',
            esc: '关闭'
        }
    },
    aside:{
        home: '首页',
        abnormal: {
          title:'异常页面',
          list:{
              page404: '页面404',
              page500: '页面500',
              page403: '页面403',
          }
        },
        table:{
            title:'表格',
            list:{
                HouseRandom: '随机房源',
            }
        },
        about: {
            title: '关于',
            list:{
                element: 'Element Plus',
            }
        },
        study:{
            title: '学习',
            list:{
                draggableStudy: '拖拽学习',
                tabsDrag: '标签拖拽学习',
            }
        }
    }
}
const MyEn = {
    theme:{
        title: 'Theme Settings',
        appearance:{
            title: 'Appearance',
            theme:{
                title: 'Theme',
                list:{
                    light: 'Light',
                    dark: 'Dark',
                    System:'Follow System'
                }
            },
            darksidebar: 'Semi Dark Sidebar',
            darktopbar: 'Semi Dark Topbar',
            builtin:{
                title: 'Built-in Themes',
                list:{
                    default: 'Default',
                    violet: 'Violet',
                    pink:'Pink',
                    yellow: 'Yellow',
                    skyblue: 'Sky Blue',
                    green: 'Green',
                    zinc: 'Zinc',
                    deepgreen: 'Deep Green',
                    deepblue: 'Deep Blue',
                    orange: 'Orange',
                    rose: 'Rose',
                    neutrals: 'Neutral',
                    slate: 'Slate',
                    gray: 'Gray',
                    customize:'Customize'
                }
            },
            other:{
                title: 'Other',
                list:{
                    weakmode: 'Weak Mode',
                    graymode: 'Gray Mode',
                }
            }
        },
        layout:{
            title: 'Layout',
            layout:{
                title: 'Layout',
                list:{
                    vertical: 'Vertical',
                    horizontal: 'Horizontal',
                    towcolumns: 'Two Columns',
                    mixedmenu: 'Mixed Menu',
                    fullcontent: 'Full Content',
                }
            },
            sidebar:{
                title: 'Sidebar',
                list:{
                    showsidebar: 'Show Sidebar',
                    collpasesidebar: 'Collapse Menu',
                }
            },
            topbar:{
                title: 'Topbar',
                list:{
                    showtopbar: 'Show Topbar',
                }
            },
            copyright:{
                title: 'Copyright',
                list:{
                    open: 'Enable Copyright',
                    name: 'Company Name',
                    date: 'Copyright Date',
                }
            }
        },
        shortcut:{
            title: 'Shortcut Keys',
            global:{
                title: 'Global',
                list:{
                    shortcut: 'Shortcut Keys',
                    globalsearch: 'Global Search',
                    logout: 'Logout',
                    lock: 'Lock Screen',
                }
            }
        },
        general:{
            title: 'General',
            general:{
                title: 'General',
                list:{
                    language: 'Language',
                    wartermark: 'Watermark',
                }
            },
            animation:{
                title: 'Animation',
                list:{
                    open: 'Page Transition Animation',
                }
            }
        }
    },
    moreBtn: {
        refresh: 'Refresh',
        closeCurrent: 'Close Current',
        closeLeft: 'Close Left',
        closeRight: 'Close Right',
        closeOthers: 'Close Others',
        closeAll: 'Close All'
    },
    error: 'Error Message',
    NotFound: {
        title:'Oops! Page Not Found',
        content:'The page you are looking for does not exist or has been removed.',
        btn:'Back to Home'
    },
    NotPermission: {
        title:'Oops! Access Denied',
        content:"Sorry, but you don't have permission to access this page.",
        btn:'Back to Home'
    },
    Wrong:{
        title:'Oops! Something went wrong',
        content:'Sorry, the server encountered an error.',
        btn:'Back to Home'
    },
    header:{
        document: 'Document',
        help: 'Help',
        lock: 'Lock',
        logout: 'Logout',
        SearchPlaceholder:'Please enter the menu keyword to search',
        SearchNull: 'No menu found',
        SearchBtn:{
            choose: 'to select',
            tab: 'to navigate',
            esc: 'to close'
        }
    },
    aside:{
        home: 'Home',
        abnormal: {
            title: 'Abnormal Page',
            list:{
                page404: 'Page 404',
                page500: 'Page 500',
                page403: 'Page 403',
            }
        },
        table:{
            title:'Table',
            list:{
                HouseRandom: 'Random House',
            }
        },
        about: {
            title: 'About',
            list:{
                element: 'Element Plus',
            }
        },
        study:{
            title: 'Study',
            list:{
                draggableStudy: 'Draggable Study',
                tabsDrag: 'TabsDrag Study',
            }
        }
    }

}
const i18n = createI18n({
    locale: sessionStorage.getItem('language') || 'zh',
    messages: {
        en: MyEn,
        zh: MyZh
    }
})
export default i18n