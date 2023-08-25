function createPopup() {
    const popupHTML = `
    <div class="popup-background" id="popupBackground">
        <div class="popup">            
            <div class="popup-content">
                <div class="pop-top">
                
                    <a onclick="closePopEdit()"><img src="../assets/img/close.png" alt="close"></a>
                </div>
                <div class="popup-circle"></div>
                <div class="pop-bottom"></div>
            </div>
        </div>
    </div>
    `;
    // Popup-HTML to doc
    document.body.innerHTML += popupHTML;
}

function editUser() {
    if (!document.getElementById("popupBackground")) {
        createPopup();
    }
    document.getElementById("popupBackground").style.display = "block";
}
function closePopEdit() {
    document.getElementById("popupBackground").style.display = "none";
}
