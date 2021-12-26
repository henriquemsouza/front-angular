# Front Angular Spa


## Requirements:
  * [Docker](https://docs.docker.com/engine/installation/)

  * [Docker-compose](https://docs.docker.com/compose/install/)

  * The backend of this project is in the following repo [repository link](https://github.com/henriquemsouza/back-serverless)


### Initial build with docker
```sh
docker-compose up --build
```


## To start the project with docker
```sh
docker-compose up
```

## To start the project without docker
```sh
yarn start
```

## Folder Structure (src) ##
```sh
.
├── app
│   ├── components
│   │   ├── add-product
│   │   ├── form-title
│   │   ├── loader
│   │   ├── product-details
│   │   └── product-list
│   ├── domain
│   ├── services
│   └── utils
├── assets
└── environments

```



## Made with


[Angular 13.x](https://angular.io/)

[SweetAlert2](https://github.com/sweetalert2/ngx-sweetalert2)
