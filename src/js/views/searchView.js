import { elements } from './base';

export const getInput = () => elements.searchElement.value;

export const cleanInputField = () => {
    elements.searchElement.value = "";
};

export const cleanList = () => {
    elements.searchResultList.innerHTML = '';
    elements.searchPagButton.innerHTML = '';
};


const limitRecipeTitle = (title, limit = 17) => {
    if (title.length >= limit){
        const newTitle = [];
        title.split(' ').reduce((acc, cur) => {
            if(acc + cur.length <= limit){
                newTitle.push(cur);
            }
            return acc + cur.length;
        }, 0);
        return `${newTitle.join(' ')}...`;
    } 
    return title;
};
    

const renderRecipe = recipe => {
    const markup = `
        <li>
            <a class="results__link" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="${recipe.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
    `
    elements.searchResultList.insertAdjacentHTML('beforeend', markup)
};

const creatButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto = ${type === 'pre' ? page - 1 : page + 1 }>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'pre' ? 'left' : 'right'}"></use>
        </svg>
        <span>Page ${type === 'pre' ? page - 1 : page + 1 }</span>
    </button>
`;


const renderButtton = (curPage, nunberOfRes, resPerPage) => {
    const pages = Math.ceil(nunberOfRes / resPerPage);
    let button;
    if (curPage === 1 && pages > 1){
        // only show next buttom
        button = creatButton(curPage, 'next');
    }else if (curPage < pages){
        //show both buttom
        button = `
            ${creatButton(curPage, 'pre')}${creatButton(curPage, 'next')}
        `;
    }else if (curPage === pages && pages > 1){
        //show pre buttom 
        button = creatButton(curPage, 'pre');
    }
    elements.searchPagButton.insertAdjacentHTML('afterbegin', button);
}

//show list of result 
export const renderResults = (recipes, page = 1, pageRes = 10) => {
    //render result of current page 
    const start = (page - 1) * pageRes; 
    const end = page * pageRes;
    recipes.slice(start, end).forEach(renderRecipe);
    // create the button under the list 
    renderButtton(page, recipes.length, pageRes);
}