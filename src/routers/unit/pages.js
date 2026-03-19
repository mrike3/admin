const pages = import.meta.glob("@/views/**/page.js", { eager: true, import: "default" });
const components = import.meta.glob("@/views/**/index.vue");

export const routes = Object.entries(pages)
    .filter(([, meta]) => meta.type === 1)
    .map(([path, meta]) => {
        const compPath = path.replace("page.js", "index.vue");
        const component = components[compPath];
        path = path.replace("/src/views", "").replace("/page.js", "");
        const name = path.split("/").filter(Boolean).join("-");
        return {
            path,
            name,
            component,
            meta,
        };
    });
