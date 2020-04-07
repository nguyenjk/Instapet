# Instapet

Social networking that about pets live. 


### how to run all services and frontend at once.
```bash
    #build all image front end and backend
    docker-compose -f docker-compose-build.yaml build --parallel
    #run
    docker-compose up
    #stop
    docker-compose stop
    #remove
    docker-compose down
```