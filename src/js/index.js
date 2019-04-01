import Search from './models/Search';
import * as searchView from './views/searchView';
import { elements, renderloader, cancelLoader } from './views/base';
/** Global state of the app
 * Search object
 * Current recipe object
 * Shopping list object
 * liked recipes
 */
const state = {};

const controlSearch = async () => {
    // 1 get query from view;
    const query = searchView.getInput();

    if (query){
        // 2 New search object and add to state
        state.search = new Search(query);
        // 3 Prepare UI for results
        searchView.cleanInputField();
        searchView.cleanList();
        // 4 Search for the recipes 
        renderloader(elements.searchLoader);
        await state.search.getResult();
 
        ///5 Render result on UI 
        cancelLoader(); 
        searchView.renderResults(state.search.result); 
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
})

elements.searchPagButton.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if (btn){
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.cleanList();
        searchView.renderResults(state.search.result, goToPage);        
    }
})
 