const table = document.getElementById("movieTable");
const movieForm = document.getElementById("movieForm");
const cancelButton = document.getElementById("cancelButton");

const getMovies = async () => {
  const response = await fetch(
    "http://localhost:3000/movies?sortBy=title&orderBy=asc&title="
  );
  const result = await response.json();
  return result.data;
};

const renderMovies = (movies) => {
  table.innerHTML = ""; // Clear the table before rendering
  movies.forEach((movie) => {
    const row = document.createElement("tr");
    const titleCell = document.createElement("td");
    titleCell.textContent = movie.title;
    row.appendChild(titleCell);
    const releaseYearCell = document.createElement("td");
    releaseYearCell.textContent = movie.release_year;
    row.appendChild(releaseYearCell);
    const genreCell = document.createElement("td");
    genreCell.textContent = movie.genre;
    row.appendChild(genreCell);
    const directorCell = document.createElement("td");
    directorCell.textContent = movie.director;
    row.appendChild(directorCell);
    const ratingCell = document.createElement("td");
    ratingCell.textContent = movie.rating;
    row.appendChild(ratingCell);
    const actionCell = document.createElement("td");

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.setAttribute("data-id", movie.id); // Set movie ID jadi data atribute
    editButton.onclick = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });

      movieForm.querySelector("[name='title']").value = movie.title;
      movieForm.querySelector("[name='release_year']").value = movie.release_year;
      movieForm.querySelector("[name='genre']").value = movie.genre;
      movieForm.querySelector("[name='director']").value = movie.director;
      movieForm.querySelector("[name='rating']").value = movie.rating;
      
      // masukkan data ud
      movieForm.setAttribute("data-id", movie.id);
    };

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = async () => {
      if (confirm("Are you sure you want to delete this movie?")) {
        const response = await fetch(
          `http://localhost:3000/movies/${movie.id}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          const movies = await getMovies();
          renderMovies(movies);
        } else {
          alert("Gagal Menghapus Movie");
        }
      }
    };

    actionCell.appendChild(editButton);
    actionCell.appendChild(deleteButton);
    row.appendChild(actionCell);
    table.appendChild(row);
  });
};

window.onload = async () => {
  const movies = await getMovies();
  renderMovies(movies);
};

movieForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const movieId = movieForm.getAttribute("data-id"); // Get ID from form's data attribute
  const movieData = {
    title: movieForm.querySelector("[name='title']").value,
    release_year: movieForm.querySelector("[name='release_year']").value,
    genre: movieForm.querySelector("[name='genre']").value,
    director: movieForm.querySelector("[name='director']").value,
    rating: movieForm.querySelector("[name='rating']").value,
  };

  let response;
  if (movieId) {
    response = await fetch(`http://localhost:3000/movies/${movieId}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(movieData),
    });
  } else {
    response = await fetch("http://localhost:3000/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(movieData),
    });
  }

  if (response.ok) {
    movieForm.reset(); // Reset the form after submission
    movieForm.removeAttribute("data-id"); // Remove the data-id attribute
    const movies = await getMovies();
    renderMovies(movies);
  } else {
    alert("Failed to save the movie.");
  }
});

cancelButton.addEventListener("click", () => {
  movieForm.reset();
  movieForm.removeAttribute("data-id"); // Clear movie ID on cancel
});
