module.exports = {
  css: {
    loaderOptions: {
      css: {
        sourceMap: process.env.NODE_ENV !== "production" ? true : false
      }
    }
  },
  devServer: {
    proxy: 'http://localhost',
    public: '192.168.1.108' //local ip
  }
};
