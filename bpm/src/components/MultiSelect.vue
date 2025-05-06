<template>
    <div class="multi-select primary group">
        <h2>Genres</h2>
        <div class="search">
            <div class="selections-wrapper">
                <div class="selections primary groupItem" v-for="option in selectedOptions">
                    <div class="selection">{{ option }}</div>   
                    <button class="btn secondary" v-on:click="removeSelection(option)">X</button>  
                </div>
            </div>
           
            <input type="text" class="primary" id="search-bar" v-model="searchQuery" placeholder="Add up to 5 Genres"></input>
        </div>
        <div class="search-results group">
            <select class="secondary" :size="7" v-on:change="addSelection($event)">
                <option v-for="option in filterAndSortOptions" :key="option" :value="option">{{ option }}</option>
            </select>
        </div>
    </div>
</template>

<script>

// import { debounce } from '@/helpers/utilHelper';

export default{
    components:{

    },
    props:{
        originalOptions:{
            type: Array,
        }
    },
    data(){
        return{
            selectedOptions:[],
            searchQuery: ''
        }
    },
    computed:{
        filterAndSortOptions() {
            if(!this.originalOptions)
                return []

            var filteredOptions = [...this.originalOptions];

            filteredOptions = filteredOptions.filter(option =>{
                // switch (this.archiveFilter) {
                // case 'archived':
                //     if (!project.archive) return false;
                //     break;
                // case 'active':
                //     if (project.archive) return false;
                //     break;
                // case 'all':
                //     // Show all projects regardless of archive status
                //     break;
                // default:
                //     console.warn('Invalid archiveFilter value. Using "active" as default.');
                //     if (project.archive) return false;
                // }

                // if(this.searchQuery)
                //   return project.name.toLowerCase().includes(this.searchQuery.toLowerCase())
                let alreadySelected = false;
                for(const index in this.selectedOptions){
                    alreadySelected = option == this.selectedOptions[index]
                    if(alreadySelected)
                        return false; // if the option is already selected, don't include it

                }

                if(this.searchQuery){
                    let genreName =  option.toLowerCase();

                    return genreName.includes(this.searchQuery)
                }
                
                return true
            });

            return filteredOptions
        },
    },
    methods:{
        // debounceSearchQuery: debounce(function() {
        //     this.inputChange();
        // }, 300),
        // inputChange() {
        //     this.searchQuery = this.inputValue;
        // },
        removeSelection(option){
            let indexToRemove = this.selectedOptions.indexOf(option);
            if (indexToRemove > -1) {
                this.selectedOptions.splice(indexToRemove, 1);
            }
        },
        addSelection(event){
            const selectedGenre = event.target.value;
            if(this.selectedOptions.length == 5){
                return
            }

            this.selectedOptions.push(selectedGenre);
            
        }
    },
}
</script>

<style scoped>
/* orange: #DA8338 */
.primary{
    border: 1.5px solid #DA8338;
    border-radius: 15px;
    background-color: transparent;
    outline:none;
}
.secondary{
    background-color: transparent;
    border: none;
    outline: none;
    background:none;
}
.group{
    margin:0px 15px 15px 15px;
}
.groupItem{
    margin: 0px 5px 10px 5px;
    padding: 10px;
}


.multi-select{
    display:flex;
    flex-direction: column;
    justify-content: space-evenly;
    width: 350px;
    height: fit-content;
    color:#DA8338
}


.selections-wrapper{
    display:flex;
    flex-wrap: wrap;
}

.selections{
    border-radius: 50px;
    background-color: transparent;
    width: fit-content;
    min-width: 75px;
    display: flex;
    justify-content: space-between;
}

.btn{
    cursor:pointer;
}

select{
    width: 100%;
    color:#DA8338;
    text-align: left;
    font-size: large;
    appearance: none;
}

select option{
    margin: 15px;
    appearance: none;
    cursor:pointer;
}

::-webkit-scrollbar {
  width: 5px;
  height: 20px;
}

::-webkit-scrollbar-thumb {
  background: rgb(74, 73, 73);
  border-radius: 15px; /* Straight line */
}

::-webkit-scrollbar-track {
  background: transparent;
}

#search-bar{
    width:90%;
    border-radius: 5px;
    padding: 5px;
    margin-bottom: 5px;
}


#removeSelection{
    background: transparent;
    border: none;
}

</style>