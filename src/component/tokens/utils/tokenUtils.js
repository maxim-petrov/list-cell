import rootTokens from '../../../tokens.json';

const parseTokenValue = (value) => {
  if (typeof value !== 'string') {
    return value;
  }
  
  if (value.endsWith('ms')) {
    const match = value.match(/^(\d+)ms$/);
    if (match) {
      return value; 
    }
  }
  
  if (value.startsWith('cubic-bezier')) {
    return value;
  }
  
  return value;
};

const processedTokens = {
  "LIST_CELL_DURATION_XS": "100ms",
  "LIST_CELL_DURATION_S": "150ms",
  "LIST_CELL_DURATION_M": "250ms",
  "LIST_CELL_EASING_STANDARD": "cubic-bezier(.165, .84, .44, 1)",
  "LIST_CELL_EASING_SPRING": "cubic-bezier(0.32, 1.72, 0, 1)",
  "LIST_CELL_EASING_BOUNCE": "cubic-bezier(0.32, 1.72, 0, 1)",
  "LIST_CELL_HOVER_DURATION": "250ms",
  "LIST_CELL_TAP_DURATION": "150ms",
  "LIST_CELL_RADIO_DURATION": "200ms",
  "LIST_CELL_AVATAR_DURATION": "250ms"
};

processedTokens.updateToken = function(tokenName, tokenValue) {
  if (this.hasOwnProperty(tokenName)) {
    this[tokenName] = parseTokenValue(tokenValue);
    return true;
  }
  return false;
};

console.log('TokenUtils loaded with values:', processedTokens);

export default processedTokens;