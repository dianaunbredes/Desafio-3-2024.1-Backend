const API_URL = "https://pokeapi.co/api/v2/pokemon/";
const TOTAL_POKEMON = 1292;

const elements = {
  counter: document.querySelector("#counter"),
  artNumber: document.querySelector("#art-number"),
  image: document.querySelector("#pokemon-image"),
  name: document.querySelector("#pokemon-name"),
  id: document.querySelector("#pokemon-id"),
  types: document.querySelector("#pokemon-types"),
  height: document.querySelector("#pokemon-height"),
  weight: document.querySelector("#pokemon-weight"),
  flavor: document.querySelector("#pokemon-flavor"),
  loading: document.querySelector("#loading"),
  feedback: document.querySelector("#feedback"),
  searchForm: document.querySelector("#search-form"),
  searchInput: document.querySelector("#pokemon-search"),
  previous: document.querySelector("#previous-button"),
  next: document.querySelector("#next-button")
};

let currentId = 1;
const pokemonCache = new Map();

const typeLabels = {
  normal: "NORMAL", fire: "FIRE", water: "WATER", electric: "ELECTRIC",
  grass: "GRASS", ice: "ICE", fighting: "FIGHTING", poison: "POISON",
  ground: "GROUND", flying: "FLYING", psychic: "PSYCHIC", bug: "BUG",
  rock: "ROCK", ghost: "GHOST", dragon: "DRAGON", dark: "DARK",
  steel: "STEEL", fairy: "FAIRY"
};

function formatNumber(number) {
  return String(number).padStart(4, "0");
}

function showFeedback(message = "") {
  elements.feedback.textContent = message;
}

function setLoading(isLoading) {
  elements.loading.hidden = !isLoading;
  elements.previous.disabled = isLoading;
  elements.next.disabled = isLoading;
  elements.searchForm.querySelector("button").disabled = isLoading;
}

async function fetchPokemon(idOrName) {
  const key = String(idOrName).toLowerCase().trim();
  if (pokemonCache.has(key)) return pokemonCache.get(key);

  const response = await fetch(`${API_URL}${encodeURIComponent(key)}`);
  if (!response.ok) {
    throw new Error("Não encontramos esse Pokémon. Confira o nome ou número e tente novamente.");
  }

  const pokemon = await response.json();
  pokemonCache.set(String(pokemon.id), pokemon);
  pokemonCache.set(pokemon.name, pokemon);
  return pokemon;
}

function renderTypes(types) {
  elements.types.replaceChildren();
  types.forEach(({ type }) => {
    const tag = document.createElement("span");
    tag.className = `type type-${type.name}`;
    tag.textContent = typeLabels[type.name] || type.name.toUpperCase();
    elements.types.appendChild(tag);
  });
}

function renderPokemon(pokemon) {
  currentId = pokemon.id;
  const imageUrl = pokemon.sprites.other?.["official-artwork"]?.front_default
    || pokemon.sprites.front_default
    || "";

  elements.counter.innerHTML = `Nº ${formatNumber(pokemon.id)} <span>/ ${TOTAL_POKEMON}</span>`;
  elements.artNumber.textContent = `#${formatNumber(pokemon.id)}`;
  elements.id.textContent = `Nº ${formatNumber(pokemon.id)}`;
  elements.name.textContent = pokemon.name.replaceAll("-", " ");
  elements.image.src = imageUrl;
  elements.image.alt = `Imagem de ${pokemon.name}`;
  elements.height.textContent = `${(pokemon.height / 10).toLocaleString("pt-BR")} m`;
  elements.weight.textContent = `${(pokemon.weight / 10).toLocaleString("pt-BR")} kg`;
  elements.flavor.textContent = "Descubra os detalhes deste Pokémon e continue sua jornada.";
  renderTypes(pokemon.types);
  showFeedback();
}

async function loadPokemon(idOrName) {
  setLoading(true);
  showFeedback();
  try {
    const pokemon = await fetchPokemon(idOrName);
    renderPokemon(pokemon);
  } catch (error) {
    showFeedback(error.message || "Não foi possível carregar os dados. Verifique sua conexão.");
  } finally {
    setLoading(false);
  }
}

function navigate(direction) {
  let nextId = currentId + direction;
  if (nextId > TOTAL_POKEMON) nextId = 1;
  if (nextId < 1) nextId = TOTAL_POKEMON;
  loadPokemon(nextId);
}

elements.previous.addEventListener("click", () => navigate(-1));
elements.next.addEventListener("click", () => navigate(1));

elements.searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const query = elements.searchInput.value.trim().toLowerCase();
  if (!query) {
    showFeedback("Digite o nome ou número de um Pokémon.");
    elements.searchInput.focus();
    return;
  }
  loadPokemon(query);
});

elements.image.addEventListener("error", () => {
  elements.image.removeAttribute("src");
  elements.image.alt = "Imagem indisponível para este Pokémon";
});

loadPokemon(1);
