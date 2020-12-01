module.exports = {
  css: {
    loaderOptions: {
      css: {
        sourceMap: process.env.NODE_ENV !== "production" ? true : false
      }
    }
  },
  devServer: {
    disableHostCheck: true, 
    proxy: 'http://localhost',
    public: 'http://635.aemg.com.au' //local ip
  }
};
