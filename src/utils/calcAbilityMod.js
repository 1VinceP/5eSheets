export default (score, asString = false) => {
   const modifier = Math.floor((Number(score) - 10) / 2);
   const symbol = modifier >= 0 ? '+' : '';

   return asString ? `${symbol}${modifier}` : modifier;
};
