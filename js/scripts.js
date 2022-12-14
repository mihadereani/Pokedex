const pokemonRepository = (function () {
  const pokemonList = [];
  const apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  getAll = () => pokemonList;

  add = (pokemon) => {
    if (typeof pokemon === "object" && "name" in pokemon) {
      return pokemonList.push(pokemon);
    }
  };

  addListItem = (pokemon) => {
    const pokemonList = document.querySelector(".pokemon-list");
    const listItem = document.createElement("li");
    const button = document.createElement("button");
    listItem.classList.add(
      "group-list-item",
      "row",
      "justify-content-center",
      "mt-2",
      "mx-2"
    );
    button.innerText = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    button.setAttribute("data-bs-toggle", "modal");
    button.setAttribute("data-bs-target", "#pokemon-modal");
    button.classList.add(
      "btn",
      "btn-outline-secondary",
      "col-12",
      "col-sm-9",
      "col-lg-6",
      "shadow"
    );
    button.addEventListener("click", (event) => {
      showDetails(pokemon);
    });
    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
  };

  loadList = () => {
    showLoadingMessage();
    return fetch(apiUrl)
      .then((response) => response.json())
      .then((json) => {
        hideLoadingMessage();
        json.results.forEach((item) => {
          const pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
          console.log(pokemon);
        });
      })
      .catch((e) => {
        hideLoadingMessage();
        console.error(e);
      });
  };

  loadDetails = (item) => {
    showLoadingMessage();
    const url = item.detailsUrl;
    return fetch(url)
      .then((response) => response.json())
      .then((details) => {
        hideLoadingMessage();
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = [];
        for (var i = 0; i < details.types.length; i++) {
          item.types.push(" " + details.types[i].type.name);
        }
      })
      .catch((e) => {
        hideLoadingMessage();
        console.error(e);
      });
  };

  showDetails = (item) => {
    pokemonRepository.loadDetails(item).then(() => {
      showModal(item);
      console.log(item);
    });
  };

  showLoadingMessage = () => {
    const showLoadingMessage = document.querySelector(".loader");
    const loadingMessage = document.createElement("div");
    showLoadingMessage.innerText = "Loading...";
    showLoadingMessage.classList.remove("hide");
    showLoadingMessage.appendChild(loadingMessage);
  };

  hideLoadingMessage = () => {
    const hideLoadingMessage = document.querySelector(".loader");
    hideLoadingMessage.classList.add("hide");
  };

  showModal = (pokemon) => {
    const modalBody = $(".modal-body");
    const modalTitle = $(".modal-title");
    modalTitle.empty();
    modalBody.empty();
    const nameElement = $(
      "<h1>" + pokemon.name[0].toUpperCase() + pokemon.name.slice(1) + "</h1>"
    );
    const imageElement = $('<img class="pokemon-img">');
    imageElement.attr("src", pokemon.imageUrl);
    const heightElement = $("<p>" + "Height: " + pokemon.height + "</p>");
    const typeElement = $("<p>" + "Type(s): " + pokemon.types + "</p>");
    modalTitle.append(nameElement);
    modalBody.append(imageElement);
    modalBody.append(heightElement);
    modalBody.append(typeElement);
  };

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

pokemonRepository.loadList().then(() => {
  pokemonRepository.getAll().forEach((pokemon) => {
    pokemonRepository.addListItem(pokemon);
  });
});
