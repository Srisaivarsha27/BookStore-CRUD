const apiUrl = "http://localhost:3000/products";

// Fetch and display books
async function fetchBooks() {
    const response = await fetch(apiUrl);
    const books = await response.json();
    const tableBody = document.getElementById("bookTable");
    tableBody.innerHTML = "";

    books.forEach(book => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${book.name}</td>
            <td>${book.rating}</td>
            <td>${book.price}</td>
            <td><img src="${book.image}" alt="${book.name}" width="50"></td>
            <td>
                <button onclick="editBook('${book._id}', '${book.name}', '${book.rating}', '${book.price}', '${book.image}')">Edit</button>
                <button onclick="deleteBook('${book._id}')">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Add or update a book
async function addOrUpdateBook() {
    const id = document.getElementById("bookId").value;
    const name = document.getElementById("name").value;
    const rating = document.getElementById("rating").value;
    const price = document.getElementById("price").value;
    const image = document.getElementById("image").value;

    if (!name || !rating || !price) {
        alert("Please fill all fields!");
        return;
    }

    const book = { name, rating, price, image };

    if (id) {
        await fetch(`${apiUrl}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(book)
        });
        alert("Book updated!");
        document.getElementById("saveBtn").textContent = "Save Book";
    } else {
        await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(book)
        });
        alert("Book added!");
    }

    clearForm();
    fetchBooks();
}

// Delete a book
async function deleteBook(id) {
    if (confirm("Are you sure?")) {
        await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
        alert("Book deleted!");
        fetchBooks();
    }
}

// Edit book details
function editBook(id, name, rating, price, image) {
    document.getElementById("bookId").value = id;
    document.getElementById("name").value = name;
    document.getElementById("rating").value = rating;
    document.getElementById("price").value = price;
    document.getElementById("image").value = image;

    document.getElementById("saveBtn").textContent = "Update Book";
}

// Clear form fields
function clearForm() {
    document.getElementById("bookId").value = "";
    document.getElementById("name").value = "";
    document.getElementById("rating").value = "";
    document.getElementById("price").value = "";
    document.getElementById("image").value = "";
}

window.onload = fetchBooks;
