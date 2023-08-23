let showedOptions = false;
function showOptions(){
    if(showedOptions === false){
        document.getElementById('caret-down').style.transform = 'rotate(180deg)'
        document.getElementById('dropdown-options').classList.remove('d-none')
        showedOptions = true;
    } else{
        document.getElementById('dropdown-options').classList.add('d-none')
        showedOptions = false;
        document.getElementById('caret-down').style.transform = 'rotate(0deg)'

    }

}