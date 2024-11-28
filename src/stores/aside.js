import {defineStore} from 'pinia'

export const asideStore=defineStore('asideStore',{
    state:()=>({
        showAside:true,
        menuCollapsed:false,
        menuParentIndex:0,
    }),
    actions:{
        toggleAside(index){
            this.menuParentIndex=index
        }
    }
})