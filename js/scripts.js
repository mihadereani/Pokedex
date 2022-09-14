const pokemonRepository = (function () {
  const pokemonList = [];
  const apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  function getAll() {
    return pokemonList;
  }

  function add(pokemon) {
    if (typeof pokemon === "object" && "name" in pokemon) {
      return pokemonList.push(pokemon);
    }
  }

  function addListItem(pokemon) {
    const pokemonList = document.querySelector(".pokemon-list");
    const listItem = document.createElement("li");
    const button = document.createElement("button");

    listItem.classList.add(
      "group-list-item",
      "row",
      "justify-content-center",
      "mt-2"
    );

    button.innerText = pokemon.name;
    button.setAttribute("data-bs-toggle", "modal");
    button.setAttribute("data-bs-target", "#pokemon-modal");
    button.classList.add(
      "btn",
      "btn-primary",
      "col-12",
      "col-sm-9",
      "col-lg-6"
    );
    button.addEventListener("click", function (event) {
      showDetails(pokemon);
    });

    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
  }

  function loadList() {
    showLoadingMessage();
    debugger;
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        hideLoadingMessage();
        json.results.forEach(function (item) {
          const pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
          console.log(pokemon);
        });
      })
      .catch(function (e) {
        hideLoadingMessage();
        console.error(e);
      });
  }

  function loadDetails(item) {
    showLoadingMessage();
    debugger;
    const url = item.detailsUrl;
    return fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((details) => {
        hideLoadingMessage();
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = [];
        for (var i = 0; i < details.types.length; i++) {
          item.types.push(details.types[i].type.name);
        }
      })
      .catch(function (e) {
        hideLoadingMessage();
        console.error(e);
      });
  }

  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function () {
      showModal(item);
      console.log(item);
    });
  }

  function showLoadingMessage() {
    const showLoadingMessage = document.querySelector(".loader");
    const loadingMessage = document.createElement("div");
    showLoadingMessage.innerText = "Loading...";
    showLoadingMessage.classList.remove("hide");

    showLoadingMessage.appendChild(loadingMessage);
  }

  function hideLoadingMessage() {
    const hideLoadingMessage = document.querySelector(".loader");
    hideLoadingMessage.classList.add("hide");
  }

  function showModal(pokemon) {
    const modalBody = $(".modal-body");
    const modalTitle = $(".modal-title");

    modalTitle.empty();
    modalBody.empty();
    const nameElement = $("<h1>" + pokemon.name + "</h1>");
    const imageElement = $('<img class="pokemon-img">');
    imageElement.attr("src", pokemon.imageUrl);
    const heightElement = $("<p>" + "Height: " + pokemon.height + "</p>");
    const typeElement = $("<p>" + "Types: " + pokemon.types + "</p>");

    modalTitle.append(nameElement);
    modalBody.append(imageElement);
    modalBody.append(heightElement);
    modalBody.append(typeElement);
  }

  return {
    getAll,
    add,
    addListItem,
    loadList,
    loadDetails,
    showDetails,
    showModal,
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
