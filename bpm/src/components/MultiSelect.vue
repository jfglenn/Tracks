<template>
    <div class="multi-select">
        <div class="search">
            <div class="selections">
                <div v-for="option in selectedOptions">{{ option }}<button v-on:click="removeSelection(option)">x</button></div>     
            </div>
            <input type="text" v-model="searchQuery" placeholder="Add up to 5 Genres"></input>
        </div>
        <div class="search-results">
            <select :size="5" v-on:change="addSelection($event)">
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
.multi-select{
    display:flex;
    flex-direction: column;
    border-radius: 15px;
}

select{
    width: 100%;
}

</style>