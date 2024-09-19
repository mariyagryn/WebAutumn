let combinedUsers = [...randomUserMock, ...additionalUsers];
let uniqueUsers = combinedUsers.filter((user, index, self) =>
    index === self.findIndex((u) => u.email === user.email)
);

// Функція для генерації випадкового значення зі списку
function getRandomValue(list) {
    const randomIndex = Math.floor(Math.random() * list.length);
    return list[randomIndex];
}


// Функція для об'єднання об'єктів із позбавленням повторів
function mergeObjects(arr1, arr2) {
    const mergedObjects = [];

    // Об'єдную об'єкти з першого масиву
    for (const obj of arr1) {
        if (obj.full_name) {
            const duplicate = mergedObjects.find((item) => item.full_name === obj.full_name);
            if (!duplicate) {
                mergedObjects.push(obj);
            }
        }
    }

    // Об'єдную об'єкти з другого масиву
    for (const obj of arr2) {
        if (obj.full_name) {
            const duplicate = mergedObjects.find((item) => item.full_name === obj.full_name);
            if (!duplicate) {
                mergedObjects.push(obj);
            }
        }
    }
    return mergedObjects;
}
function createHexCode() {
    let letters = "0123456789ABCDEF";
    let color = '#';

    for (let i = 0; i < 6; i++)
        color += letters[(Math.floor(Math.random() * 16))];

    return color;
}
//Створюємо юзера з правильно переданими параметрами
function formatUser(user) {
    let formatedUser = {
        gender: user.gender,
        title: user.name.title,
        full_name: user.name.first + " " + user.name.last,
        city: user.location.city,
        state: user.location.state,
        country: user.location.country,
        postcode: user.location.postcode,
        coordinates: user.location.coordinates,
        timezone: user.location.timezone,
        email: user.email,
        b_date: user.dob.date,
        age: user.dob.age,
        phone: user.phone,
        picture_large: user.picture.large,
        picture_thumbnail: user.picture.thumbnail,
        id: "",
        favorite: false,
        course: getRandomValue([
            "Mathematics",
            "Physics",
            "English",
            "Computer Science",
            "Dancing",
            "Chess",
            "Biology",
            "Chemistry",
            "Law",
            "Art",
            "Medicine",
            "Statistics",
        ]),
        bg_color: createHexCode(),
        note: "",

    }

    return formatedUser;
}

// Перевірка на валідність рядка
function validString(str) {
    if (!str || typeof str !== 'string') {
        return false;
    }
    return str.charAt(0) === str.charAt(0).toUpperCase();
}

// Перевірка на валідність віку
function checkAge(age) {
    return typeof age === 'number' && age >= 0;
}

// Перевірка на валідність телефону
function validatePhone(phone, country) {
    const phoneFormats = {
        "Germany": /^\d{4}[-\s]?\d{7}$/,
        "Ireland": /^\d{3}[-\s]?\d{3}[-\s]?\d{4}$/,
        "Australia": /^\d{2}[-\s]?\d{4}[-\s]?\d{4}$/,
        "United States": /^\(?\d{3}\)?[-\s]?\d{3}[-\s]?\d{4}$/,
        "Finland": /^0\d{1}[-\s]?\d{3}[-\s]?\d{3}$/,
        "Turkey": /^\(?\d{3}\)?[-\s]?\d{3}[-\s]?\d{4}$/,
        "Switzerland": /^0\d{2}[-\s]?\d{3}[-\s]?\d{2}[-\s]?\d{2}$/,
        "New Zealand": /^\(?\d{3}\)?[-\s]?\d{3}[-\s]?\d{4}$/,
        "Spain": /^\d{3}[-\s]?\d{3}[-\s]?\d{3}$/,
        "Norway": /^\d{8}$/,
        "Denmark": /^\d{8}$/,
        "Iran": /^\d{3}[-\s]?\d{8}$/,
        "Canada": /^\(?\d{3}\)?[-\s]?\d{3}[-\s]?\d{4}$/,
        "Netherlands": /^\(?\d{3}\)?[-\s]?\d{3}[-\s]?\d{4}$/,
        "France": /^\d{2}[-\s]?\d{2}[-\s]?\d{2}[-\s]?\d{2}[-\s]?\d{2}$/
    };
    return phoneFormats[country] ? phoneFormats[country].test(phone) : false;
}

// Перевірка на валідність email
function checkEmail(email) {
    return email && typeof email === 'string' && email.includes("@");
}
// Функція перевірки валідності кожного користувача
function isValid(user) {
    console.log("Перевіряємо користувача:", user);

    const isFullNameValid = validString(user.full_name);
    console.log("Повне ім'я валідне:", isFullNameValid);

    const isCityValid = validString(user.city);
    console.log("Місто валідне:", isCityValid);

    const isAgeValid = checkAge(user.age);
    console.log("Вік валідний:", isAgeValid);

    const isPhoneValid = validatePhone(user.phone, user.country);
    console.log("Телефон валідний:", isPhoneValid);

    const isEmailValid = checkEmail(user.email);
    console.log("Email валідний:", isEmailValid);

    return isFullNameValid && isCityValid && isAgeValid && isPhoneValid && isEmailValid;
}
function filterObjects(array, filters) {
    return array.filter((item) => {
        // Перевірка країни
        if (filters.country && filters.country !== 'all') {
            let country = item.location ? item.location.country : item.country;
            if (typeof country !== 'string' || country.trim() !== filters.country) {
                return false;
            }
        }

        // Перевірка статі
        if (filters.gender && filters.gender !== 'all' && item.gender !== filters.gender) {
            return false;
        }

        // Перевірка улюблених (favorite)
        if (typeof filters.favorite !== 'undefined' && filters.favorite !== 'all' && item.favorite !== filters.favorite) {
            return false;
        }

        // Перевірка віку
        if (filters.age && filters.age !== 'all') {
            let ageRange = filters.age.match(/\d+/g).map(Number); // Знаходимо всі числа в діапазоні

            if (filters.age.includes("<")) {
                if (item.age >= ageRange[0]) {
                    return false;
                }
            } else if (filters.age.includes(">")) {
                if (item.age <= ageRange[0]) {
                    return false;
                }
            } else if (filters.age.includes("-")) {
                let min = ageRange[0];
                let max = ageRange[1];
                if (item.age < min || item.age > max) {
                    return false;
                }
            }
        }

        return true;
    });
}


let filters = {
    country: 'all',
    age: 'all',
    gender: 'female',
    favorite: 'all'
};


let filteredUsers = filterObjects(uniqueUsers, filters);

function compareObjectsByField(param, order) {
    return function (a, b) {
        let comparison = 0;

        // Перевіряємо поле full_name
        if (param === 'full_name') {
            let nameA = a.full_name ? a.full_name.toLowerCase().trim() : '';
            let nameB = b.full_name ? b.full_name.toLowerCase().trim() : '';
            comparison = nameA.localeCompare(nameB);
        }
        else if (param === 'country') {
            let countryA = a.location && a.location.country ? a.location.country.toLowerCase().trim() : '';
            let countryB = b.location && b.location.country ? b.location.country.toLowerCase().trim() : '';
            comparison = countryA.localeCompare(countryB);
        }
        // Інші параметри
        else if (typeof a[param] === 'number' && typeof b[param] === 'number') {
            comparison = a[param] - b[param];
        } else if (typeof a[param] === 'string' && typeof b[param] === 'string') {
            comparison = a[param].localeCompare(b[param]);
        }
        else if (param === 'age') {
            const calculateAge = (dob) => {
                let birthDate = new Date(dob.date);
                let today = new Date();
                let age = today.getFullYear() - birthDate.getFullYear();
                let monthDifference = today.getMonth() - birthDate.getMonth();
                if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
                    age--;
                }
                return age;
            };

            let ageA = a.dob ? calculateAge(a.dob) : 0;
            let ageB = b.dob ? calculateAge(b.dob) : 0;
            comparison = ageA - ageB;
        }
        // Сортування за датою народження 'b_day'
        else if (param === 'b_day') {
            let dateA = a.dob && a.dob.date ? new Date(a.dob.date) : null;
            let dateB = b.dob && b.dob.date ? new Date(b.dob.date) : null;

            if (dateA && dateB) {
                comparison = dateA - dateB;
            } else if (!dateA && dateB) {
                comparison = -1;
            } else if (dateA && !dateB) {
                comparison = 1;
            }
        }


        return order === 'desc' ? comparison * -1 : comparison;
    };
}

const allUsers = [...uniqueUsers];


allUsers.forEach(user => {
    if (!user.full_name) {
        user.full_name = `${user.name.first} ${user.name.last}`;
    }
});

// Функція для сортування за full_name
allUsers.sort((a, b) => a.full_name.localeCompare(b.full_name));


// Функція для сортування масиву за параметром та порядком (зростанням або спаданням)
function sortObjects(array, param, order) {
    return array.slice().sort(compareObjectsByField(param, order));
}


let sortedByNameAsc = sortObjects([...uniqueUsers], 'full_name', 'asc');
let sortedByAgeAsc = sortObjects([...uniqueUsers], 'age', 'asc');
let sortedByBirthdayAsc = sortObjects([...uniqueUsers], 'b_day', 'asc');
let sortedByCountryAsc = sortObjects([...uniqueUsers], 'country', 'asc');

let sortedByNameDesc = sortObjects([...uniqueUsers], 'full_name', 'desc');
let sortedByAgeDesc = sortObjects([...uniqueUsers], 'age', 'desc');
let sortedByBirthdayDesc = sortObjects([...uniqueUsers], 'b_day', 'desc');
let sortedByCountryDesc = sortObjects([...uniqueUsers], 'country', 'desc');

function findObjectByParam(arr, param, value) {
    return arr.filter((obj) => {
        const paramValue = getObjectValue(obj, param);
        if (typeof paramValue === 'string' && typeof value === 'string') {
            // Якщо параметр та значення є строковими, виконуємо пошук за текстом
            return paramValue.toLowerCase().includes(value.toLowerCase());
        } else if (typeof paramValue === 'number' && typeof value === 'number') {
            // Якщо параметр та значення є числовими, виконуємо пошук за числовим значенням
            return String(paramValue).includes(String(value));
        } else if (typeof paramValue === 'number' && typeof value === 'string') {
            let numbers = [...value.matchAll("[0-9]+")];
            numbers = numbers.map((value) => Number(value));

            if (value.includes("<")) {
                return paramValue < numbers[0];
            } else if (value.includes(">")) {
                return paramValue > numbers[0];
            } else if (value.includes("-")) {
                let max = Math.max(numbers[0], numbers[1]);
                let min = Math.min(numbers[0], numbers[1]);
                return paramValue > min && paramValue < max;
            }
        }

        return false;
    });
}

// Допоміжна функція для отримання значення параметра з об'єкта
function getObjectValue(obj, param) {
    const keys = param.split('.');
    let value = obj;
    for (const key of keys) {
        if (value[key] !== undefined) {
            value = value[key];
        } else {
            return undefined;
        }
    }
    return value;
}



let foundByName = findObjectByParam(uniqueUsers, 'name.first', 'Norbert');

let foundByAge = findObjectByParam(uniqueUsers, 'dob.age', 47);

let foundByAgeRange = findObjectByParam(uniqueUsers, 'dob.age', '>50');

let foundByNote = findObjectByParam(additionalUsers, 'note', 'old lady with a cats');
//обчислення відсотка відповідних об'єктів
function calcPercentOfFound(arr, param, value) {
    const foundObjects = arr.filter(user => {
        const paramParts = param.split('.');  // Розбиваємо ключ на частини
        let paramValue = user;

        //(dob.age)
        for (const part of paramParts) {
            paramValue = paramValue?.[part];
            if (paramValue === undefined) break;
        }


        return paramValue !== undefined && paramValue > value;
    });

    const totalObjects = arr.length;
    const percentage = (foundObjects.length / totalObjects) * 100;

    return percentage.toFixed(2) + " percents";
}


const percentageOfUsersOver = calcPercentOfFound(uniqueUsers, 'dob.age', 50);
