export const elements = {
    searchElement: document.querySelector('.search__field'),
    searchForm: document.querySelector('.search'),
    searchResultList: document.querySelector('.results__list'),
    searchLoader: document.querySelector('.results'),
    searchPagButton: document.querySelector('.results__pages')
};


export const elementsStrings = {
    loader: 'loader'
}

export const renderloader = parent => {
    const loader = `
        <div class="${elementsStrings.loader}">
            <svg>
                <use href = "img/icons.svg#icon-cw"></use>
            </svg>
        </div> 
    `;
    parent.insertAdjacentHTML('afterbegin', loader);
}

export const cancelLoader = () => {
    const loader = document.querySelector(`.${elementsStrings.loader}`)
    if (loader){
        loader.parentElement.removeChild(loader);
    }
}
