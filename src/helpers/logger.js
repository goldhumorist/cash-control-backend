module.exports = {
  info: (message, additionalData, ...rest) => {
    console.log('[INFO]', message, additionalData || '', ...rest);
  },
  error: (message, additionalData, ...rest) => {
    console.error('[!ERROR!]', message, additionalData || '', ...rest);
  },
};
