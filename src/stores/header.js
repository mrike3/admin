import { defineStore } from "pinia";
import i18n from "@/locales/language.js";

import { menuTree } from "@/routers/unit/menu.js";

const searchData = [];
function getSearchList(menuData) {
    menuData.forEach((item) => {
        if (item.children) {
            getSearchList(item.children);
        } else {
            searchData.push(item);
        }
    });
}
getSearchList(menuTree);

if (sessionStorage.getItem("isDark") == "true") {
    document.documentElement.classList.toggle("dark");
}

export const headerStore = defineStore("headerStore", {
    state: () => ({
        searchValue: "",
        searchShow: false,
        isShow: true,
        isZh: sessionStorage.getItem("language") != "zh" ? false : true,
        isFullScreen: false,
        isDark: sessionStorage.getItem("isDark") == "true" ? true : false || false,
        SearchData: searchData,
        language: sessionStorage.getItem("language") || "zh",
    }),
    getters: {
        SearchList: (state) => {
            if (state.searchValue == "") {
                return [];
            } else {
                return state.SearchData.filter(
                    (item) => i18n.global.t(item.meta.title).indexOf(state.searchValue) != -1,
                );
            }
        },
    },
    actions: {
        //全屏切换
        FullScreen() {
            if (!this.isFullScreen) {
                document.documentElement.requestFullscreen();
                this.isFullScreen = true;
            } else {
                document.exitFullscreen();
                this.isFullScreen = false;
            }
        },
        //语言切换
        toggleLanguage(command) {
            sessionStorage.setItem("language", command);
            this.isZh = command == "zh" ? true : false;
            this.language = command;
            i18n.global.locale = sessionStorage.getItem("language");
        },
        //切换主题
        toggleTheme() {
            this.isDark = !this.isDark;
            sessionStorage.setItem("isDark", this.isDark ? "true" : "");

            if (!document.startViewTransition) this.switchTheme();
            document.startViewTransition(this.switchTheme);
        },
        changeTheme(isDark) {
            this.isDark = isDark;
            sessionStorage.setItem("isDark", this.isDark ? "true" : "");
            if (isDark) {
                document.documentElement.classList.add("dark");
            } else {
                document.documentElement.classList.remove("dark");
            }
        },
        switchTheme() {
            document.documentElement.classList.toggle("dark");
        },
    },
});
