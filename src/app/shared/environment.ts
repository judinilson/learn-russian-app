const apiUrl = {
    url:'http://localhost:5000/api'
}

export const environment = {
    allCountries: 'https://restcountries.eu/rest/v2/all',
    apiUrl: 'http://localhost:5000/api',

    usersUrl: `${apiUrl.url}/User/`,
    studentUserCreateUrl: `${apiUrl.url}/User/register-Student`,
    teacherUserCreateUrl: `${apiUrl.url}/User/register-Teacher`,


    countryUrl: `${apiUrl.url}/Country`,
    
    teacherGroupUrl: `${apiUrl.url}/TeacherGroup/`,
    groupUrl: `${apiUrl.url}/Group/`,


    demoContentGetUrl: `${apiUrl.url}/Content/Demonstration-Content`,
    articleContentGetUrl: `${apiUrl.url}/Content/Article-Content`,

    categoryUrl: `${apiUrl.url}/Category/`,

    trainingDataUrl: `${apiUrl.url}/TrainingContent`,

    statisticUrl: `${apiUrl.url}/Statistic`,
    statisticPostUrl: `${apiUrl.url}/Statistic/Create-Statistics`


};


export const  firebaseConfig = {
    apiKey: "AIzaSyB8VbIANCHuK3sNOPx2U5Ehzl--afAjZtc",
    authDomain: "lear-russian-server.firebaseapp.com",
    databaseURL: "https://lear-russian-server.firebaseio.com",
    projectId: "lear-russian-server",
    storageBucket: "lear-russian-server.appspot.com",
    messagingSenderId: "501783584069",
    appId: "1:501783584069:web:b810d8e6930249ed59b22c",
    measurementId: "G-W2S31WZ0R3"
  };