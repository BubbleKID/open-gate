module.exports = {
  css: {
    loaderOptions: {
      css: {
        sourceMap: process.env.NODE_ENV !== "production" ? true : false
      }
    }
  },
  devServer: {
    proxy: 'http://localhost:8080',
    public: '192.168.0.185:8080' //local ip
  }
};
