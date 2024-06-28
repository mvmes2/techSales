export function addRandomCharsToToken(token: string): string {
  if (typeof token !== 'string') {
      throw new Error('Token must be a string');
  }

  const randomChar = () => String.fromCharCode(65 + Math.floor(Math.random() * 26)); // Gera um caractere aleatório A-Z

  const position1 = 2; 
  const char1 = randomChar();

  const position2 = Math.floor(token.length / 2);
  const char2 = randomChar();

  const position3 = token.length - 3;
  const char3 = randomChar();

  return (
      token.slice(0, position1) + char1 +                    // Adiciona o primeiro caractere aleatório na 3ª posição
      token.slice(position1, position2) + char2 +            // Adiciona o segundo caractere aleatório no meio do token
      token.slice(position2, position3) + char3 +            // Adiciona o terceiro caractere aleatório na 3ª última posição
      token.slice(position3)                                 // Adiciona o resto do token
  );
}

export function removeRandomCharsFromToken(token: string): string {
  if (typeof token !== 'string') {
      throw new Error('Token must be a string');
  }

  // As posições dos caracteres mudam após cada remoção
  const position1 = 2;
  const position2 = Math.floor((token.length - 1) / 2);
  const position3 = token.length - 4;

  return (
      token.slice(0, position1) +                      // Parte do início até antes da 3ª posição
      token.slice(position1 + 1, position2) +          // Parte após a 3ª posição até o meio, ajustado
      token.slice(position2 + 1, position3) +          // Parte após o meio até a 3ª última posição, ajustado
      token.slice(position3 + 1)                       // Parte após a 3ª última posição
  );
}



  
  