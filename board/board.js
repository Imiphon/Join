// Function that the search-baer should get a border-color blue, when the sarch-inout is clicked
let searchBar = document.getElementById('search-bar');
searchBar.addEventListener('click',()=>{
    searchBar.style.borderColor = 'var(--reg-blue)'
})

document.addEventListener('click', event=>{
    if(!searchBar.contains(event.target)){
        searchBar.style.borderColor = 'var(--user-grey)'
    }
})