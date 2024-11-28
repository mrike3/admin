import {defineStore} from 'pinia'

const el = document.documentElement
el.style.setProperty('--el-color-primary', sessionStorage.getItem('themeColor')||'#006BE6')

if(sessionStorage.getItem('isGray')=='gray') {
    document.documentElement.classList.add("gray");
}else{
    document.documentElement.classList.remove("gray");
}
if(sessionStorage.getItem('isInvert')=='invert') {
    document.documentElement.classList.add("invert");
}else{
    document.documentElement.classList.remove("invert");
}

export const themStore=defineStore('themStore',{
    state:()=>({
        isGray:sessionStorage.getItem('isGray')=='gray'?true:false||false,
        isInvert:sessionStorage.getItem('isInvert')=='invert'?true:false||false,
        drawerShow:false,
        themeColor:sessionStorage.getItem('themeColor')||'#006BE6',
        topBarIsDark:sessionStorage.getItem('topBarIsDark')=='dark'?true:false||false,
        sideBarIsDark:sessionStorage.getItem('sideBarIsDark')=='dark'?true:false||false,
        openWaterMark:sessionStorage.getItem('openWaterMark')=='true'?true:false||false,
        openAnimate:sessionStorage.getItem('openAnimate')=='true'?true:false,
        animateType:sessionStorage.getItem('animateType')||'fade1',
        altk:true,
        altl:true,
        altq:true,
        copyrightdate:'2024',
        copyrightname:'Mr.Vfire',
        layoutType:parseInt(sessionStorage.getItem('layoutType'))||0,
        lockScreen:sessionStorage.getItem('lockScreen')=='true'?true:false||false,
    }),
    getters:{
        getWaterMark:state => {
            return state.openWaterMark?'Vfire Admin':''
        }
    },
    actions:{
        toggleThemeColor(color){
            sessionStorage.setItem('themeColor',color)
            this.themeColor=color
            el.style.setProperty('--el-color-primary', color)
        },
        changeThemeColor(){
            sessionStorage.setItem('themeColor',this.themeColor)
            el.style.setProperty('--el-color-primary', this.themeColor)
        },
        changeTopBarIsDark(){
            sessionStorage.setItem('topBarIsDark',this.topBarIsDark?'dark':'')
        },
        changeSideBarIsDark(){
            sessionStorage.setItem('sideBarIsDark',this.sideBarIsDark?'dark':'')
        },
        toggleGray(){
            sessionStorage.setItem('isGray',this.isGray?'gray':'')
            if(this.isGray){
                document.documentElement.classList.add("gray");
            }else{
                document.documentElement.classList.remove("gray");
            }
        },
        toggleInvert(){
            sessionStorage.setItem('isInvert',this.isInvert?'invert':'')
            if(this.isInvert){
                document.documentElement.classList.add("invert");
            }else{
                document.documentElement.classList.remove("invert");
            }
        },
        changeOpenAnimate(){
            sessionStorage.setItem('openAnimate',this.openAnimate?'true':'false')
        },
        toggleAnimate(type){
            this.animateType=type
            sessionStorage.setItem('animateType',type)
        },
        setLayoutType(type){
            sessionStorage.setItem('layoutType',type)
            this.layoutType=type
        }
    }
})