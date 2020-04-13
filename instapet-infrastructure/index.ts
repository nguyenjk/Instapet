import * as eks from "@pulumi/eks";
import * as k8s from "@pulumi/kubernetes";

// Create an EKS cluster with the default configuration.
const cluster = new eks.Cluster("instapet");

// Export the cluster's kubeconfig.
export const kubeconfig = cluster.kubeconfig;


// // Deploy a small canary service (NGINX), to test that the cluster is working.
// const appName = "reverseproxy";
// const appLabels = { appClass: appName };
// const deployment = new k8s.apps.v1.Deployment(`${appName}-dep`, {
//     metadata: { labels: appLabels },
//     spec: {
//         replicas: 2,
//         selector: { matchLabels: appLabels },
//         template: {
//             metadata: { labels: appLabels },
//             spec: {
//                 containers: [{
//                     name: appName,
//                     image: "nguyendk82/reverseproxy",
//                     ports: [{ name: "http", containerPort: 8080 }]
//                 }],
//                 restartPolicy: "Always"
//             }
//         }
//     },
// }, { provider: cluster.provider });
// const service = new k8s.core.v1.Service(`${appName}-svc`, {
//     metadata: { labels: appLabels },
//     spec: {
//         type: "LoadBalancer",
//         ports: [{ port: 80, targetPort: "http" }],
//         selector: appLabels,
//     },
// }, { provider: cluster.provider });

// Export the URL for the load balanced service.
export const url = service.status.loadBalancer.ingress[0].hostname;