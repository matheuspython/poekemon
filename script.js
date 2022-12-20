  // Dicionário de tradução dos tipos
  const typeTranslations = {
    'normal': 'normal',
    'fighting': 'lutador',
    'flying': 'voador',
    'poison': 'venenoso',
    'ground': 'terrestre',
    'rock': 'pedra',
    'bug': 'inseto',
    'ghost': 'fantasma',
    'steel': 'aço',
    'fire': 'fogo',
    'water': 'água',
    'grass': 'grama',
    'electric': 'elétrico',
    'psychic': 'psíquico',
    'ice': 'gelo',
    'dragon': 'dragão',
    'dark': 'noturno',
    'fairy': 'fada',
    'unknown': 'desconhecido',
    'shadow': 'sombra'
  }
  function updateBodyColor(pokemonType) {
    // Tabela de cores pré-definidas
    const typeColors = {
      normal: '#A8A878',
      lutador: '#C03028',
      voador: '#A890F0',
      venenoso: '#A040A0',
      terrestre: '#E0C068',
      pedra: '#B8A038',
      inseto: '#A8B820',
      fantasma: '#705898',
      aço: '#B8B8D0',
      fogo: '#F08030',
      água: '#6890F0',
      grama: '#78C850',
      elétrico: '#F8D030',
      psíquico: '#F85888',
      gelo: '#98D8D8',
      dragão: '#7038F8',
      noturno: '#705848',
      fada: '#EE99AC',
      desconhecido: '#A8A878',
      sombra: '#966E9A',
    };

    // Altera a cor de fundo para a cor correspondente ao tipo do Pokémon
    document.body.style.backgroundColor = typeColors[pokemonType];
  }

  let pokemonImageUrl= ''
  async function getPokemonType(pokemonName) {
    try {
      // Faz a chamada à API de Pokémon
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

      // Verifica se o Pokémon não foi encontrado
      if (response.status === 404) {
        return 'Pokémon não encontrado';
      }

      // Converte a resposta em um dicionário JavaScript
      const data = await response.json();
      const pokemonId = data.id;
     pokemonImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;
      // Obtém o tipo do Pokémon
       const pokemonType = data.types[0].type.name;

      // Traduz o tipo para o português
      const translatedType = typeTranslations[pokemonType];

      // Atualiza a cor de fundo da página
      updateBodyColor(translatedType);

      // Retorna o tipo do Pokémon
      return translatedType;
    } catch (error) {
      console.error(error);
      return 'Erro ao consultar o Pokémon';
    }
  }

  const searchButton = document.getElementById('search-button');
  searchButton.addEventListener('click', async () => {
    // Obtém o nome do Pokémon digitado pelo usuário
    const pokemonName = document.getElementById('pokemon-name').value;

    const pokemonType = await getPokemonType(pokemonName);

    // Atualiza o elemento HTML que exibe o resultado
    const resultElement = document.getElementById('result');
    resultElement.innerHTML = `
        <p>o ${pokemonName} é do tipo: ${pokemonType}</p>
            </br>
        <img src="${pokemonImageUrl}" alt="${pokemonName}">`;
  });