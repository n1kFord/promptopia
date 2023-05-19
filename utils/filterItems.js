export const filterItems = (searchText, list, isTag) => {
    if (!searchText) {
        return list;
    }

    if (isTag) {
        return list.filter(({ tag }) => {
            return tag
                .toLowerCase()
                .includes(searchText.replace(/#\b/g, "").toLowerCase());
        });
    }

    return list.filter(({ prompt }) => {
        return prompt.toLowerCase().includes(searchText.toLowerCase());
    });
};
