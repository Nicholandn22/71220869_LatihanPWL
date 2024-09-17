// 1. import data pet list
import pets from "./data/pets.js";
// 2. buat selector untuk element dropdown 
// 3. buat selector untuk element form 
// 4. buat selector untuk element search 
const dropdownElement = document.querySelector(".dropdownMenu");
const formElement = document.querySelector(".searchForm");
const searchInputElement = document.querySelector(".searchInput");

// 5. buat fungsi yang berisi komponen beserta data dengan template sebagai berikut
const renderPet = (petList) =>`
<div class="card my-3 mx-2" style="width: 20%">

    <img height="300" style="object-fit: cover" class="card-img-top" src='${petList.photo.full}' alt="Card image cap" />
    <div class="card-body">

      <h5 class="card-title d-inline">${petList.name}</h5>

      <span class="badge badge-pill badge-info">${petList.type}</span>
      <p class="card-text">
      ${petList.description}

      </p>

      <p><small>Published at: ${petList.published_at}</small></p>
      <button
        type="button"
        class="btn btn-secondary"
        data-toggle="modal"
        data-target="#confirmationModal"
      >
        Adopt Me
      </button>
    </div>
  </div>
  `;

// 6. fungsi render komponen pet dengan map 
const renderComponent = (pet) => {
  const konten = document.getElementsByClassName('petInfo')[0];
  if(pet.length === 0){
    konten.innerHTML = `<p class="text-center 20px"><strong>No Data about "${searchInputElement.value}"</strong></p>`
  } else{
    konten.innerHTML = pet.map(renderPet).join('');
  }
}

// 7. memanggil fungsi renderComponent dengan parameter petList untuk menampilkan data (sebagai inisialisasi sebelum data difilter)
renderComponent(pets);

// 8. Lengkapi fungsi sortPetById 
const sortPetById = (key) => {
  if (key === "oldest") {
    // 8a. return sort berdasarkan tanggal masuk paling lama
    return (a, b) => new Date(a.published_at) - new Date(b.published_at);
  }
  if (key === "newest") {
   // 8b. return sort berdasarkan tanggal masuk paling baru
   return (a, b) => new Date(b.published_at) - new Date(a.published_at);
  }
  if (key === "name") {
    // 8a. return sort berdasarkan name
    return (a, b) => a.name.localeCompare(b.name);
  }
};
// 9. Lengkapi fungsi untuk search dan sort pet berdasarkan key
const filterAndSortPets = (searchTerm, sortKey) => {
  const lowerCaseTerm = searchTerm.toLowerCase();
  
  let filteredPets = pets.filter(pet => 
    pet.name.toLowerCase().includes(lowerCaseTerm) ||
    pet.type.toLowerCase().includes(lowerCaseTerm) ||
    pet.description.toLowerCase().includes(lowerCaseTerm)
  );

  filteredPets = filteredPets.sort(sortPetById(sortKey));
  return filteredPets;
};

// 10. Gabungkan event listener untuk pencarian dan pengurutan
const updatePetsDisplay = () => {
  const searchKey = searchInputElement.value;
  const sortKey = dropdownElement.value;
  
  const updatedPets = filterAndSortPets(searchKey, sortKey);
  renderComponent(updatedPets);
};

// 11. Event listener untuk dropdown (sort) dan form pencarian
dropdownElement.addEventListener("change", updatePetsDisplay);
formElement.addEventListener("submit", (event) => {
  event.preventDefault();
  updatePetsDisplay();
});
