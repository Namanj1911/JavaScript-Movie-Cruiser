var moviesList = [];
var favouriteMovies = [];

function getMovies() {
//	console.log("contacting server..");
	return fetch('http://localhost:3000/movies')
		.then((response) => {
			//			console.log(response.json());
			if (response.ok) {
	//			console.log("reading response.json");
				return response.json();
			} else {
				return Promise.reject(new Error("Promise rejected"));
			}

		}).then((movies) => {
	//		console.log("inside first getMovies promise");
			let movieNames = document.querySelector('#moviesList');
			movies.forEach((element) => {
				movieNames.innerHTML += `<li>${element.id} </br> ${element.title} </br> ${element.posterPath} 
			<button onclick="addFavourite(${element.id})">Add to Favourites</button>
			</li>`;
			});
			moviesList = movies;
			return movies;
		}).catch((err) => {
	//		console.log(err);
			return err;
		})
}


function getFavourites() {
//	console.log("inside getFavourite function");
//	console.log("server contact for fav");
	return fetch('http://localhost:3000/favourites')
		.then((value) => {
			//			console.log(value.json());
			if (value.ok) {
				return value.json();
			} else {
				return Promise.reject(new Error("Promise rejected"));
			}


		}).then((favourites) => {
	//		console.log("favourites first promise");
			let favNames = document.querySelector('#favouritesList');
			favourites.forEach((element) => {
				favNames.innerHTML += `<li>${element.id} </br> ${element.title} </br> ${element.posterPath} 
			</li>`;
			});
			favouriteMovies = favourites;
			return favourites;
		}).catch((err) => {
	//		console.log(err);
			return err;
		})
}

function addFavourite(id) {
//	console.log(" in add function now..");
	let movieName = moviesList.find(movie => {
		if (movie.id == id) {
//			console.log(movie);
			return movie;
		}
	});
	let favExists = favouriteMovies.find(favMovie => {
		if (favMovie.id == id) {
			return Promise.reject(new Error('Movie is already added to favourites'));
		}
	});
	if (favExists) {
//		console.log("Already exists");
		return Promise.reject(new Error('Movie is already added to favourites'));
	} else {
//		console.log("in else block");
		let contactPromise = fetch(`http://localhost:3000/favourites`, {
			"method": 'POST',
			"headers": { 'content-type': 'application/json' },
			"body": JSON.stringify(movieName)
		})
//		console.log(contactPromise);
		return contactPromise
			.then((response1) => {
				//			console.log("inside resolve promise block..");
				if (response1.ok) {
					if (movieName.id == id) {
						favouriteMovies.push(movieName);
//						console.log("updating HTML..");
						let favNames = document.querySelector('#favouritesList');
						favNames.innerHTML += `<li>${movieName.id} </br> ${movieName.title} </br> ${movieName.posterPath} 
			    </li>`
						return favouriteMovies;
					} else {
						return Promise.reject(new Error('Movie is already added to favourites'));
					}

				}
			}).catch((err) => {
//				console.log(err);
				return err;
			})
	}
}



module.exports = {
	getMovies,
	getFavourites,
	addFavourite
};

// You will get error - Uncaught ReferenceError: module is not defined
// while running this script on browser which you shall ignore
// as this is required for testing purposes and shall not hinder
// it's normal execution


