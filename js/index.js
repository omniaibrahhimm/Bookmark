var SiteName = document.getElementById("SiteName")
var SiteURL = document.getElementById("SiteURL")
var tableBody = document.getElementById("t-body")
var addbtn = document.getElementById("addBtn")
var updateBtn = document.getElementById("updateBtn")
var updatedindex;
var SiteArray = [];

if (localStorage.getItem("SiteArray") !== null){
  SiteArray = JSON.parse(localStorage.getItem("SiteArray"));
  displaySite(SiteArray);
}
// validate //
function validateSiteName() {
  var nameError = document.getElementById('nameerror')
  var regex = /^[A-Z][a-z]{1,20}$/;
  if (regex.test(SiteName.value)) {
    SiteName.classList.replace('is-invalid', 'is-valid')
    nameError.classList.add('d-none')
return true
  }
else{  

  SiteName.classList.add('is-invalid')
nameError.classList.remove('d-none')
return false
}
}
function addSite() {
  if (!checkIsExisted()) { // الشخص مش موجود
    if (validateSiteName()) {
      var contactInfo = {
        name: SiteName.value,
        site: SiteURL.value,
      };

      SiteArray.push(contactInfo);
      localStorage.setItem("SiteArray", JSON.stringify(SiteArray));
      displaySite(SiteArray);
      clearSite(SiteArray);

    } else {
  Swal.fire({
  
    title: 'Site Name or Url is not valid, Please follow the rules below :',
    html: `
      <ul style="text-align:left;" class="list-unstyled"">
        <li>🔴 SSite name must contain at least 3 characters</li>
        <li>🔴 Site URL must be a valid one</li>
      </ul>
    `, showCloseButton: true,});}
  } else {
  Swal.fire({
  
    title: 'Site Name or Url is not valid, Please follow the rules below :',
    html: `
      <ul style="text-align:left;" class="list-unstyled"">
        <li>🔴 SSite name must contain at least 3 characters</li>
        <li>🔴 Site URL must be a valid one</li>
      </ul>
    `, showCloseButton: true,});}
}
function checkIsExisted() {
  for (var i = 0; i < SiteArray.length; i++) {
    if ((SiteURL.value === SiteArray[i].site) || (SiteName.value === SiteArray[i].name)) {
      return true;
    }
  }
  return false;
}

function displaySite(array) {
  var contactBox = "";
  for ( var i = 0; i < array.length; i++) {
   contactBox += `  <tr>
<td>${i + 1}</td>
<td>${array[i].site}</td>
<td>
  <button class="btn btn-visit" data-index="${i}">
    <i class="fa-solid fa-eye pe-2"></i>Visit
  </button>
</td>
<td>
  <button class="btn btn-danger btn-sm d-inline-block" onclick="deleteSite(${i})">Delete</button>
</td> </tr>` 
  }
tableBody.innerHTML = contactBox ;
document.querySelectorAll(".btn-visit").forEach(btn => {
    btn.addEventListener("click", visitWebsite);
  });
}
function clearSite() {
  SiteName.value='';
  SiteURL.value='';
}
function deleteSite(index) {
  SiteArray.splice(index, 1)
  localStorage.setItem("SiteArray", JSON.stringify(SiteArray))
  displaySite(SiteArray)
}
function visitWebsite(e) {
  var websiteIndex = e.target.dataset.index;
  var httpsRegex = /^https?:\/\//;
  var url = SiteArray[websiteIndex].site;

  if (httpsRegex.test(url)) {
    window.open(url, "_blank");
  } else {
    window.open(`https://${url}`, "_blank");
  }
}

