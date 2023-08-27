/*************************************
 * FUNCTIONS TO CREATE INITIALS (IN CIRCLE)
 *************************************/

// initialGroups are in templates/global_arrays.js
function findInitalGroup() {
    initialGroups = contactArray.reduce((acc, current) => {
        let initial = current.name[0].toUpperCase();    
        // if key not exist as a letter in the accumulator, push it
        if (!acc[initial]) {
            acc[initial] = [];
        }    
        // push current name to acc
        acc[initial].push(current);    
        return acc;
    }, {});
}

/*************************************
 * FUNCTIONS FOR POPUP IN MOBILE (IN MAIN-DIV)
 *************************************/

function createMobilePopup() {
    return new Promise((resolve) => {
        let popupHTML = `
        <div class="popup-background" id="popupBackground">
            <div class="popup">            
                <div class="popup-content" id="popContent">

                </div>
            </div>
        </div>
        `;
        document.body.innerHTML += popupHTML;
        let popupBg = document.getElementById('popupBackground');
        popupBg.style.display = 'block';
        setTimeout(() => {
            resolve();
        }, 0);
    });
}


function closePopup() {
    document.getElementById("popupBackground").style.display = "none";
}