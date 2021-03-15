module.exports={
    head:{
            title:'NodeBird'
    },
    modules:[
        '@nuxtjs/axios'
    ],
    buildModules: [
        '@nuxtjs/vuetify',
        '@nuxtjs/moment'
      ],
      moment:{
        locales:['ko']
      },
      vuetify: {
        /* module options */
      },
      axios: {
        browserBaseURL: 'http://localhost:4000',
        baseURL: 'http://localhost:4000',
        https: false,
      },
      // server:{
      //   port:3081,
      // }
}