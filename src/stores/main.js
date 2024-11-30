import {defineStore} from 'pinia'

export const mainStore=defineStore('mainStore',{
    state:()=>({
        activeTabName:'/home',
        tabList:[
            {
                icon:'House',
                name:'/home',
                label:'aside.home',
                isKeepalive:false,
                KeepName:'home',
                breadcrumb:["aside.home"]
            }
        ],
        router:null,
        KeepAliveNames:[],
        showFooter:true
    }),
    getters:{
        currentTab(state){
            return state.tabList.find(tab=>tab.name===state.activeTabName)
        }
    },
    actions:{
        // 切换tab
        toggleTab(tab){
            this.activeTabName = tab.props.name
            this.router.push(tab.props.name)
        },
        //删除tab
        removeTab(name){
            const tab=this.tabList.find(tab=>tab.name===name)
            if(tab.isKeepAlive){
                //删除keepAlive缓存
                this.KeepAliveNames=this.KeepAliveNames.filter(item => item!= tab.KeepName)
            }
            this.tabList.splice(this.tabList.indexOf(tab),1)
            this.activeTabName=this.tabList[this.tabList.length-1].name
            this.router.push(this.activeTabName)
        }
    }
})
