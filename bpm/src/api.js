// const API_BASE_URL = process.env.VUE_APP_API_BASE_URL
// const USE_TEST_DATA = process.env.VUE_APP_USE_TEST_DATA === "true";

// import { testProject, testProjects, testEntities } from "./testData";

// class Api {
//   constructor(baseUrl) {
//     this.baseUrl = baseUrl;
//   }

//   async request(endpoint, method = 'GET', data = null) {
//     if (USE_TEST_DATA) {
//       return this.getTestData(endpoint);
//     }

//     const url = `${this.baseUrl}${endpoint}`;
//     const headers = {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${localStorage.getItem('token')}`,
//     };

//     const options = {
//       method,
//       headers,
//       //credentials: 'include', // This is important for handling cookies, if your API uses them
//     };

//     if (data && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
//       options.body = JSON.stringify(data);
//     }

//     try {
//       const response = await fetch(url, options)

//       if (!response.ok) {
//         throw new Error(`HTTP error! Could not connect to the server. Status: ${response.status}`);

//       }
   
//       const contentType = response.headers.get("content-type");
//       if (contentType && contentType.indexOf("application/json") !== -1) {
//         return await response.json();
//       } else {
//         return await response.text();
//       }
//     } catch (error) {
//       console.error('API request failed:', error);
//       throw error;
//     }
//   }

//   getTestData(endpoint) {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         if (endpoint === '/projects') {
//           resolve({ data: testProjects });
//         } else if (endpoint.startsWith('/projects/')) {
//           const projectId = endpoint.split('/')[2];
//           let testProject = testProjects.find(o => o.id === projectId)
//           resolve({ data: testProject });
//         } else if(endpoint.startsWith('/entities')){
//           resolve({ data: testEntities});
//         } else {
//           resolve({ data: null });
//         }
//       }, 200); // Simulate network delay
//     });
//   }

//   //#region Helper methods for COMMON HTTP methods
//   async get(endpoint) {
//     return this.request(endpoint);
//   }

//   async post(endpoint, data) {
//     return this.request(endpoint, 'POST', data);
//   }

//   async put(endpoint, data) {
//     return this.request(endpoint, 'PUT', data);
//   }

//   async patch(endpoint, data) {
//     return this.request(endpoint, 'PATCH', data);
//   }

//   async delete(endpoint) {
//     return this.request(endpoint, 'DELETE');
//   }
//   async sayHi(){
//     return this.get(`/entityManager/sayHi`);
//   }
//   //#endregion
 



// }

// export default new Api(API_BASE_URL);