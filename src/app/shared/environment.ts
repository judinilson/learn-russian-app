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

    categoryGetUrl: `${apiUrl.url}/Category`,

    trainingDataUrl: `${apiUrl.url}/TrainingContent`,

    statisticUrl: `${apiUrl.url}/Statistic`,
    statisticPostUrl: `${apiUrl.url}/Statistic/Create-Statistics`


};