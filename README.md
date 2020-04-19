# Instapet

Social networking that about pet's life. This is the place where you can share all their hapiness and funny moments. 

## Architect

The app contains a frontend app using Ionic framework and the backend which include a bunch of micro services that is used nodejs and type script. All the app will be hosted on kubernetes on AWS. 
![architect](./resources/nginx.png)
## Dependencies

#### Cloud Services
    1.  AWS Relational database service PostgreSQL
    2.  AWS Resource hosting and deployments.
    3.  AWS IAM account.
    4.  AWS Cognito for authentication and registration.
    5.  AWS EKS for hosting the backend and frontend.

#### DevOps tools

    1.  Kubernetes
    2.  Docker
    3.  Travis(CI/CD)

#### Frameworks
    1.  Ionic (Typescript) frontend app.
    2.  Node.js (Typescript) backend app.
    3.  Nginx to proxy to multiple backend services.


## How to run locally

### Run individual service

##### Frontend app
    Prerequisite:
        1.  brew install node
        2.  npm install -g ionic/cli

Run the frontend app
```bash
    #install all dependencies first.
    npm install
    #install 
    ionic serve
```
Open browser at http://localhost:8100

##### Backend app
    Prerequisite:
        1.  brew install node

Run the backend app
```bash
    #install all dependencies first.
    npm install
    #install 
    npm run dev
```
Open browser at http://localhost:8080

### Run all services and frontend at once on Docker container
```bash
    #make sure all the environment variable is up to date.
    source ~/.profile
    #build individual image for each service.
    docker build -t dockerhub_username/app-name .
    #find all images
    docker image ls
    #remove image
    docker image rm -f image_name/id
    #clean all images
    docker image prune
```
```bash
    #run container with env variable
    docker run --rm --publish 8080:8080 -v $HOME/.aws:/root/.aws --env POSTGRESS_HOST=$POSTGRESS_HOST --env POSTGRESS_USERNAME=$POSTGRESS_USERNAME --env POSTGRESS_PASSWORD=$POSTGRESS_PASSWORD --env POSTGRESS_DATABASE=$POSTGRESS_DATABASE --env AWS_REGION=$AWS_REGION --env AWS_PROFILE=$AWS_PROFILE --env AWS_BUCKET=$AWS_BUCKET --env JWT_SECRET=$JWT_SECRET --name feed dockerhub_username/instapet-feed

    #check container
    curl http://localhost:8080/api/v0/feed
```
```bash
    docker container ls
    docker container kill <container_name>
    docker container prune
```

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

```bash
    #debug container
    docker logs image-name
    #continuously seeing the log
    docker logs image-name --follow
    #debug inside container
    docker exec -it image-name bash
```

```bash
    #publish image to registry
    docker push dockerhub_username/image-name
```
### Run all services and frontend at once on kubernetes

#### Prerequisite
    Tools needed

        1.  minikube (install kubernetes on local for testing.)
        2.  kubeone (install eks)
        3.  kubectl (kubernetes command line)
        4.  eksctl (official cli for aws eks)

    Setup
        1. Setup credentials for aws
        2. create infrastructure

 Follow [kubeone link](https://github.com/kubermatic/kubeone/blob/master/docs/quickstart-aws.md) or [AWS EKS CLI](https://github.com/weaveworks/eksctl), you can use eksctl to create new 

```bash
    eksctl create cluster -f eksconfig.yml
```

#### Deployment and Running local 
you can deploy the new version of the app without interrupting the service. The way we do that is adding the service layer to abstract the deployment layer. When you roll out the new version of the service or the web app, while the pod is replicated new pod with version of the app, the service layer continue to manage which pod is available and running without being interrupting. The client won't know what happened behind the scene. Kubernetes manages the traffic and reroute to the available pod.

```bash
    #deploy config and secret
    kubectl apply -f env-configmap.yaml
    kubectl apply -f env-secret.yaml
    kubectl apply -f aws-secret.yaml
    
    #deploy deployment
    kubectl apply -f instapet-reverseproxy.yaml
    kubectl apply -f instapet-user.yaml
    kubectl apply -f instapet-feed.yaml
    kubectl apply -f instapet-web.yaml
    
    #deploy service
    kubectl apply -f instapet-reverseproxy-service.yaml
    kubectl apply -f instapet-user-service.yaml
    kubectl apply -f instapet-feed-service.yaml
    kubectl apply -f instapet-web-service.yaml

    #running service locally 
    kubectl port-forward -p 8080:8080 service/reverseproxy
    kubectl port-forward -p 8100:8100 service/instapet-web

    #scaling

```

In addition, you can also run AB testing for the service or the app by changing the name of the label for each deployment. 
The service will acting as abstract level to reroute traffic to pod A or pod B. we can also create separate node group for ab testing.

### CICD process.

[![Build Status](https://travis-ci.org/nguyenjk/Instapet.svg?branch=master)](https://travis-ci.org/nguyenjk/Instapet)


Currently, the process of CICD is not completed. The chart below shows the process of CI. There is no deployment to AWS EKS yet but will be integrated in the future using [flux gitsop](https://eksctl.io/usage/experimental/gitops-flux/)

The dot line represent not completed.

![cicd chart](/resources/cicd.png)



### Screenshot document

Please take a look at this for 
[screenshot document ](/resources/submit.md)
