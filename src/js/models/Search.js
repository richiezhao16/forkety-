import axios from 'axios';

export default class Search {
    constructor(query){
        this.query = query;
    }

    async getResult (){
        try {
            const proxy = `https://cors-anywhere.herokuapp.com/`
            const key = `aa9dad2582fcd78cede8bb5e556e3c3a`;
            const res = await axios(`${proxy}https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
            this.result = res.data.recipes;
        } catch (error) {
            alert(error);
        }
    }
}