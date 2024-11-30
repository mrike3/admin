import {defineStore} from 'pinia'
import i18n from '@/locales/language.js'

import menuList from '@/assets/json/menuList.json'

const searchData =[]
function getSearchList(menuData){
    menuData.forEach(item=>{
        if(item.children){
            getSearchList(item.children)
        }else{
            searchData.push(item)
        }
    })
}
getSearchList(menuList.data)

if(sessionStorage.getItem('isDark')=='true'){
    document.documentElement.classList.toggle("dark");
}

export const headerStore=defineStore('headerStore',{
    state:()=>({
        searchValue:'',
        searchShow:false,
        isShow:true,
        isZh:sessionStorage.getItem('language')!='zh'?false:true||false,
        isFullScreen:false,
        isDark:sessionStorage.getItem('isDark')=='true'?true:false || false,
        SearchData:searchData,
        language:sessionStorage.getItem('language') || 'zh'
    }),
    getters:{
        SearchList:state => {
            if(state.searchValue==''){
                return []
            }else {
                return state.SearchData.filter(item=>i18n.global.t(item.meta.title).indexOf(state.searchValue)!=-1)
            }
        }
    },
    actions:{
        //全屏切换
        FullScreen(){
            if(!this.isFullScreen){
                document.documentElement.requestFullscreen();
                this.isFullScreen=true;
            }else{
                document.exitFullscreen();
                this.isFullScreen=false;
            }
        },
        //语言切换
        toggleLanguage(command){
            sessionStorage.setItem('language',command);
            this.isZh=command=='zh'?true:false;
            i18n.global.locale= sessionStorage.getItem('language')
        },
        //切换主题
        toggleTheme(e){
            this.isDark =!this.isDark;
            sessionStorage.setItem('isDark',this.isDark?'true':'');

            let userAgent = navigator.userAgent || navigator.vendor || window.opera;
            // 常见的手机浏览器标识
            let mobile = /mobile|tablet|ip(ad|hone|od)|android/i;
            // 检测是否为手机或平板设备
            if (mobile.test(userAgent)) {
                document.documentElement.classList.toggle("dark");
            } else {
                const transition = document.startViewTransition(() => {
                    document.documentElement.classList.toggle("dark");
                });
                transition.ready.then(() => {
                    // 从点击的位置开始
                    const x = e.clientX;
                    const y = e.clientY;

                    // 计算圆半径
                    const tragetRadius = Math.hypot(
                        Math.max(x, window.innerWidth - x),
                        Math.max(y, window.innerWidth - y)
                    );

                    document.documentElement.animate(
                        {
                            clipPath:
                                [
                                    `circle(0 at ${x}px ${y}px)`, //从哪里开始
                                    `circle( ${tragetRadius}px at ${x}px ${y}px)` //到哪里结束
                                ]
                        },
                        {
                            duration: 800,
                            easing:'ease-in-out',
                            pseudoElement: "::view-transition-new(root)"
                        }
                    );
                });
            }


        },
        changeTheme(isDark){
            this.isDark =isDark
            sessionStorage.setItem('isDark',this.isDark?'true':'');
            if(isDark){
                document.documentElement.classList.add("dark");
            }else {
                document.documentElement.classList.remove("dark");
            }
        }
    }
})