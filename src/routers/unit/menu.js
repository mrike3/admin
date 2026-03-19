const pageModules = import.meta.glob("@/views/**/page.js", { eager: true, import: "default" });

function getParentPath(routePath) {
    const parts = routePath.split("/").filter(Boolean);
    if (parts.length <= 1) {
        return "/";
    }
    return `/${parts.slice(0, -1).join("/")}`;
}

function sortByOrder(a, b) {
    const aOrder = a.meta.order ?? Number.MAX_SAFE_INTEGER;
    const bOrder = b.meta.order ?? Number.MAX_SAFE_INTEGER;
    if (aOrder !== bOrder) {
        return aOrder - bOrder;
    }
    return a.routePath.localeCompare(b.routePath);
}

const pageEntries = Object.entries(pageModules)
    .map(([filePath, meta]) => {
        const routePath = filePath.replace("/src/views", "").replace("/page.js", "") || "/";

        return {
            filePath,
            routePath,
            parentPath: getParentPath(routePath),
            name: routePath.split("/").filter(Boolean).join("-"),
            meta,
        };
    })
    .sort(sortByOrder);

const childrenMap = new Map();

pageEntries.forEach((entry) => {
    const siblings = childrenMap.get(entry.parentPath) ?? [];
    siblings.push(entry);
    siblings.sort(sortByOrder);
    childrenMap.set(entry.parentPath, siblings);
});

function buildMenuNodes(entries, parentTitles = []) {
    return entries.map((entry) => {
        if (entry.meta.type === 2) {
            const breadcrumb = [...parentTitles, entry.meta.title];
            return {
                path: entry.routePath,
                name: entry.name,
                meta: entry.meta,
                breadcrumb,
                children: buildMenuNodes(childrenMap.get(entry.routePath) ?? [], breadcrumb),
            };
        }

        return {
            path: entry.routePath,
            name: entry.name,
            meta: entry.meta,
            breadcrumb: [...parentTitles, entry.meta.title],
        };
    });
}

export const menuTree = buildMenuNodes(childrenMap.get("/") ?? []);
