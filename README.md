# vintage-server

This is the Server side of the Vintage Culture project. The Frontend can be found [here](https://github.com/andressamachado/vintage-client)

Every year half a million tons of textiles are dumped by Canadians and this number can be even higher in countries like the USA where 11.3 Million tons are dumped every single year. 
Those textiles will end up in countries like India, Chile, Kenya, and Ghana, causing an environmental crisis, especially in those countries. 

> Vintage Culture emerged with the purpose of making thrifting part of our shopping routines. To increase the lifespan of our clothes by putting them on the market again after they do not fit us anymore.
> Our goal here is to make an application as practical as possible, easy to navigate through, and intuitive so it can be incorporated into our lives with ease. 


[A little presentation about the project](https://vintage-culture.my.canva.site/presentation) 

## Tech Stack 
![652581_code_command_develop_javascript_language_icon](https://github.com/andressamachado/vintage-server/assets/37486615/180017ef-7812-41e0-90b6-4105d5c1e161)
     ![8546986_node_icon](https://github.com/andressamachado/vintage-server/assets/37486615/dae75454-bef3-4da4-b331-eaa2418cadbc)
     <img width="100" alt="Screenshot 2023-10-18 at 6 23 16 PM" src="https://github.com/andressamachado/vintage-server/assets/37486615/12497d77-e193-4cb9-8ae9-1159e58d7e56">
     ![icons8-jwt-48](https://github.com/andressamachado/vintage-server/assets/37486615/154b6c35-9e69-4b41-8586-bf29a00fb7d3)
     ![pngwing com](https://github.com/andressamachado/vintage-server/assets/37486615/1e602a2c-bfae-424b-839e-710af891908c)
     ![62a73b7d223343fbc2207cf3](https://github.com/andressamachado/vintage-server/assets/37486615/d0d14a7f-9ba1-40cb-a1f7-d047effbebb1)

## Endpoints [ WIP ]
#### Get a list of users registered (for test purposes)

```GET /api/users/```

#### Get a single user instance selected by the id

```GET /api/users/:userId```

#### Register a new user 

```POST /api/users/register```

*note: by default, the user is registered as a buyer ( value of 0 ). 
To register as a vendor, for now, it has to be directly from an HTTP request.*
 
*Request`s body example:*

```
{
    "first_name": "admin",
    "last_name": "admin",
    "email": "admin@email.com",
    "password": "9876",
    "phone": "+1 (919) 797-2875",
    "address": "123 Rue St.",
    "isAdmin": 1
}
```

#### Sign in 

```POST /api/users/sign-in```

*Request`s body example:*

```{
    "email": "user@email.com",
    "password": "1234"
}
```

## Running locally 
1. You will need MySql installed. 

2. Populate your .env ( present as ```.env.example```, remove the ```.example``` before ) with your database configuration. 

3. run `npm install` to install the packages.


Perform the following commands inside the ```database``` folder: 

4. run `knex migrate:latest` to create the tables on your database. 

5. run  `knex seed:run` to populate your tables with initial values.

On the root folder:

6. run the server using ```npm start```


## Data 
To get the application running locally, Migration and Seed files are present under the **database** folder to populate the database. We use MySql2 on this project.

## Database relational diagram [ WIP ]

## Finally 
It is a project in development and any feedback is welcomed and appreciated! Thank you for taking the time to study my project this far. 



