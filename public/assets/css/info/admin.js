function PreviewImage() {
    var oFReader = new FileReader();
    oFReader.readAsDataURL(document.getElementById("uploadImage").files[0]);
    oFReader.onload = function (oFREvent) {
    document.getElementById("uploadPreview").src = oFREvent.target.result;
    };
    };
function PreviewImage2() {
    var oFReader = new FileReader();
    oFReader.readAsDataURL(document.getElementById("uploadImage2").files[0]);
    oFReader.onload = function (oFREvent) {
    document.getElementById("uploadPreview2").src = oFREvent.target.result;
    };
    };
function PreviewImage3() {
    var oFReader = new FileReader();
    oFReader.readAsDataURL(document.getElementById("uploadImage3").files[0]);
    oFReader.onload = function (oFREvent) {
    document.getElementById("uploadPreview3").src = oFREvent.target.result;
    };
    };
function PreviewImage4() {
    var oFReader = new FileReader();
    oFReader.readAsDataURL(document.getElementById("uploadImage4").files[0]);
    oFReader.onload = function (oFREvent) {
    document.getElementById("uploadPreview4").src = oFREvent.target.result;
    };
    };
function PreviewImage5() {
    var oFReader = new FileReader();
    oFReader.readAsDataURL(document.getElementById("uploadImage5").files[0]);
    oFReader.onload = function (oFREvent) {
    document.getElementById("uploadPreview5").src = oFREvent.target.result;
    };
    };