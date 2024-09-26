let finalArray = [];
let favoriteTeachers = [];

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
//чи валідний об'єкт user
function isValid(user) {
    return validString(user.full_name) &&
        validString(user.city) &&
        validString(user.state) &&
        validString(user.country) &&
        checkEmail(user.email) &&
        checkAge(user.age) &&
        validatePhone(user.phone, user.country)
        && (typeof (user.gender) === 'string');
}

//перевірка на валідність users
function checkValid(users) {
    return users.filter((user) => isValid(user));
}


//перевірка на валідність String
function validString(str) {
    if (!str || typeof (str) !== 'string') {
        return false;
    }
    if (str.charAt(0) === str.charAt(0).toLowerCase()) {
        return false;
    }
    return true;
}
//перевірка на валідність age
function checkAge(age) {
    if (typeof (age) !== 'number' || age < 0) {
        return false;
    }
    return true;
}
//перевірка на валідність phone

function validatePhone(phone, country) {

    const phoneFormats = {

        Germany: /^\d{4}[-\s]?\d{7}$/,
        Ireland: /^\d{3}[-\s]?\d{3}[-\s]?\d{4}$/,
        Australia: /^\d{2}[-\s]?\d{4}[-\s]?\d{4}$/,
        "United States": /^\(?\d{3}\)?[-\s]?\d{3}[-\s]?\d{4}$/,
        Finland: /^0\d{1}[-\s]?\d{3}[-\s]?\d{3}$/,
        Turkey: /^\(?\d{3}\)?[-\s]?\d{3}[-\s]?\d{4}$/,
        Switzerland: /^0\d{2}[-\s]?\d{3}[-\s]?\d{2}[-\s]?\d{2}$/,
        "New Zealand": /^\(?\d{3}\)?[-\s]?\d{3}[-\s]?\d{4}$/,
        Spain: /^\d{3}[-\s]?\d{3}[-\s]?\d{3}$/,
        Norway: /^\d{8}$/,
        Denmark: /^\d{8}$/,
        Iran: /^\d{3}[-\s]?\d{8}$/,
        Canada: /^\(?\d{3}\)?[-\s]?\d{3}[-\s]?\d{4}$/,
        Netherlands: /^\(?\d{3}\)?[-\s]?\d{3}[-\s]?\d{4}$/,
        France: /^\d{2}[-\s]?\d{2}[-\s]?\d{2}[-\s]?\d{2}[-\s]?\d{2}$/,

    };

    return phoneFormats[country] ? phoneFormats[country].test(phone) : false;

}
//перевірка на валідність email
function checkEmail(email) {
    if (!email || typeof (email) !== 'string' || !email.includes("@")) {
        return false;
    }
    return true;
}

// комапаратор
function compareObjectsByField(param, order) {
    return function (a, b) {
        let comparison = 0;

        if (a[param] < b[param]) {
            comparison = -1;
        } else if (a[param] > b[param]) {
            comparison = 1;
        }

        return order === -1 ? comparison * -1 : comparison;
    };
}
//сортування масиву за param, в порядку order==1 зростанням, order==-1 спаданням
function sortObjects(array, param, order) {
    if (param === 0) {
        return array;
    } else {
        return array.slice().sort(compareObjectsByField(param, order));
    }
}

// Функція для пошуку об'єкта за параметром
function findObjectByParam(arr, param, value) {
    return arr.filter((obj) => {
        if (typeof obj[param] === 'string' && typeof value === 'string') {
            return obj[param].toLowerCase().includes(value.toLowerCase());
        } else if (typeof obj[param] === 'number' && typeof value === 'number') {
            return String(obj[param]).includes(String(value));
        } else if (typeof obj[param] === 'number' && typeof value === 'string') {

            let numbers = [...value.matchAll("[0-9]+")];
            numbers = numbers.map((value) => Number(value));

            if (value.includes("<")) {
                return obj[param] < numbers[0];
            } else if (value.includes(">")) {
                return obj[param] > numbers[0];
            } else if (value.includes("-")) {
                let max = Math.min(numbers[0], numbers[1]);
                let min = Math.max(numbers[0], numbers[1]);
                return (obj[param]) > max && (obj[param]) < min;
            }
        }

        return false;
    });
}
//вираховуємо % знайдених за віком юзерів до всієї к-сті
function calcPercentOfFound(arr, value) {
    {
        const numOfMatches = findObjectByParam(arr, "age", ">60").length;
        const totalNum = arr.length;
        const percentage = (numOfMatches / totalNum) * 100;
        return percentage + " percents";
    }
}


// Основна функція для форматування та об'єднання об'єктів
function formatAndMergeUsers(randomUserMockThis, additionalUsersThis) {
    const formattedRandomUserMock = randomUserMockThis.map(formatUser);
    const mergedUsers = mergeObjects(formattedRandomUserMock, additionalUsersThis);
    return mergedUsers;
}


const randomUserMockThis = randomUserMock;
const additionalUsersThis = additionalUsers;
let result = formatAndMergeUsers(randomUserMockThis, additionalUsersThis);

function createTeacherCardTemplate(teacher, isForFavorites) {
    const nameParts = teacher.full_name.split(' ');
    const name = nameParts[0];
    const surname = nameParts[1];

    let photoSrc = teacher.picture_large;
    let subject = teacher.course;
    let country = teacher.country;
    let favorite = teacher.favorite;
    // Створюємо основний div з класом "roundedPhoto"
    const roundedPhotoDiv = document.createElement('div');
    roundedPhotoDiv.className = 'roundedPhoto';


    const photoDiv = document.createElement('div');
    photoDiv.className = 'photo';


    const personPhotoImg = document.createElement('img');
    personPhotoImg.className = 'personPhoto';
    personPhotoImg.alt = 'person';
    personPhotoImg.src = photoSrc;
    const starImg = document.createElement('img');
    if (!isForFavorites) {
        personPhotoImg.addEventListener("click",
            () => {
                showTeacherInfoPopup(teacher);
            });


        starImg.classList.add('star');
        starImg.alt = 'star';
        starImg.src = 'images\\star.png';

        if (!favorite) {
            starImg.hidden = true;
        } else {
            renderFavoriteTeachersTemplates(favoriteTeachers);
        }
    }

    const articleElement = document.createElement('article');

    const nameText = document.createElement('p');
    nameText.className = 'nameText';
    nameText.textContent = name;

    const surnameText = document.createElement('p');
    surnameText.className = 'surnameText';
    surnameText.textContent = surname;
    const subjectText = document.createElement('p');
    if (!isForFavorites) {
        subjectText.className = 'subjectText';
        subjectText.textContent = subject;
    }
    const countryText = document.createElement('p');
    countryText.className = 'countryText';
    countryText.textContent = country;

    photoDiv.appendChild(personPhotoImg);
    roundedPhotoDiv.appendChild(photoDiv);
    roundedPhotoDiv.appendChild(starImg);

    articleElement.appendChild(nameText);
    articleElement.appendChild(surnameText);
    articleElement.appendChild(subjectText);
    articleElement.appendChild(countryText);

    roundedPhotoDiv.appendChild(articleElement);

    return roundedPhotoDiv;
}

function createTeacherCardsFromArray(arrOfTeachers, teachersCardsContainer, isForFavorites) {
    for (const teacher of arrOfTeachers) {
        const teacherTemplate = createTeacherCardTemplate(teacher, isForFavorites);
        teachersCardsContainer.appendChild(teacherTemplate);
    }

}

function showTeacherInfoPopup(teacher) {
    // Отримуємо елементи DOM, які ми хочемо оновити
    const teacherInfoPopupBack = document.getElementById('teacherInfoPopup');
    const teacherPhoto = document.querySelector('.teacherPhotoInfoPopup');
    const teacherName = document.querySelector('.teacherDataPopup h1');
    const subject = document.querySelector('.teacherDataPopup p:nth-child(1)');
    const location = document.querySelector('.teacherDataPopup p:nth-child(2)');
    const ageGender = document.querySelector('.teacherDataPopup p:nth-child(3)');
    const email = document.querySelector('.teacherDataPopup .email');
    const phoneNumber = document.querySelector('.teacherDataPopup p:nth-child(5)');

    const closePopupButton = document.getElementById('closePopupInfoTeacher');

    teacherPhoto.src = teacher.picture_large;
    teacherName.textContent = teacher.full_name;
    subject.textContent = teacher.course;
    location.textContent = teacher.country + ", " + teacher.country;
    ageGender.textContent = teacher.ageGender;
    email.textContent = teacher.email;
    phoneNumber.textContent = teacher.phoneNumber;

    let favoriteStarButton = document.getElementById('favoriteStarButton');
    let cloneFavoriteStarButton = favoriteStarButton.cloneNode(true);

    favoriteStarButton.parentNode.replaceChild(cloneFavoriteStarButton, favoriteStarButton);
    favoriteStarButton = cloneFavoriteStarButton;

    if (teacher.favorite) {
        favoriteStarButton.innerHTML = '<img src="images\\star-filled.svg" alt="Star Button Filled">';
    } else {
        favoriteStarButton.innerHTML = '<img src="images\\star-outline.svg" alt="Star Button Not Filled">';
    }

    teacherInfoPopupBack.style.display = "block";

    cloneFavoriteStarButton.addEventListener('click', () => {
            favoriteStarButtonClicked(teacher, cloneFavoriteStarButton);
        }
    );

    closePopupButton.addEventListener('click', () => {
        teacherInfoPopupBack.style.display = "none";
    });
}

function removeObjectByName(array, nameToRemove) {
    // Використовуємо метод filter() для створення нового масиву, у якому об'єкти зберігаються тільки якщо ім'я не збігається з ім'ям, яке потрібно видалити
    const filteredArray = array.filter(item => item.full_name !== nameToRemove);
    return filteredArray;
}
function favoriteStarButtonClicked(teacher, favoriteStarButton) {

    if (teacher.favorite) {
        teacher.favorite = false;
        favoriteStarButton.innerHTML = '<img src="images\\star-outline.svg" alt="Star Button Not Filled">';
        favoriteTeachers = removeObjectByName(favoriteTeachers, teacher.full_name);
        renderFavoriteTeachersTemplates(favoriteTeachers);
        renderTeachersTemplates(finalArray);
    } else {
        teacher.favorite = true;
        favoriteStarButton.innerHTML = '<img src="images\\star-filled.svg" alt="Star Button Filled">';
        favoriteTeachers.push(teacher);
        renderTeachersTemplates(finalArray);
    }
}
const leftArrow = document.querySelector('.arrowButtonLeft');
const rightArrow = document.querySelector('.arrowButtonRight');
const carousel = document.querySelector('#carouselOfTeacherCards .overflow');

rightArrow.addEventListener('click', () => {
    carousel.scrollBy({ left: 200, behavior: 'smooth' });
});

leftArrow.addEventListener('click', () => {
    carousel.scrollBy({ left: -200, behavior: 'smooth' });
});


function renderTeachersTemplates(arrOfTeachers) {
    const teachersCardsContainer = document.getElementById('teachersCardsContainer');
    teachersCardsContainer.innerHTML = "";
    createTeacherCardsFromArray(arrOfTeachers, teachersCardsContainer, false);
}

function renderFavoriteTeachersTemplates(arrOfTeachers) {
    const favoriteTeachersCardsContainer = document.querySelector('#carouselOfTeacherCards .overflow');
    favoriteTeachersCardsContainer.innerHTML = "";
    if (arrOfTeachers.length !== 0) {
        createTeacherCardsFromArray(arrOfTeachers, favoriteTeachersCardsContainer, true);
    }
}


function filterObjects(array, filters) {
    return array.filter((item) => {

        if (filters.country && item.country !== filters.country && filters.country !== 'all') {
            return false;
        }

        if (filters.gender && item.gender !== filters.gender && filters.gender !== 'all') {
            return false;
        }

        if (typeof filters.favorite !== 'undefined' && item.favorite !== filters.favorite && filters.favorite === true) {
            return false;
        }

        if (filters.age && item.age !== filters.age || typeof (filters.age) === 'string') {
            if (typeof (filters.age) === 'string' && filters.age !== 'all') {
                let numbers = [...filters.age.matchAll("[0-9]+")];
                numbers = numbers.map((value) => Number(value));

                if (filters.age.includes("<")) {
                    return item.age < numbers[0];
                } else if (filters.age.includes(">")) {
                    return item.age > numbers[0];
                } else if (filters.age.includes("-")) {
                    let max = Math.min(numbers[0], numbers[1]);
                    let min = Math.max(numbers[0], numbers[1]);
                    return (item.age) > max && (item.age) < min;
                }
                return false;
            }
        }

        return true;
    });
}

function handleFilters(array) {
    // Отримуємо посилання на елементи фільтрації
    const ageSelect = document.getElementById('ageSelect');
    const regionSelect = document.getElementById('regionSelect');
    const sexSelect = document.getElementById('sexSelect');
    const onlyWithPhotoCheckbox = document.getElementById('onlyWithPhoto');
    const onlyFavoritesCheckbox = document.getElementById('onlyFavorites');

    // Додаємо івент-слухач для фільтрів
    ageSelect.addEventListener('change', () => applyFilters(array));
    regionSelect.addEventListener('change', () => applyFilters(array));
    sexSelect.addEventListener('change', () => applyFilters(array));
    onlyWithPhotoCheckbox.addEventListener('change', () => applyFilters(array));
    onlyFavoritesCheckbox.addEventListener('change', () => applyFilters(array));
}
function applyFilters(array) {
    const ageSelect = document.getElementById('ageSelect');
    const regionSelect = document.getElementById('regionSelect');
    const sexSelect = document.getElementById('sexSelect');
    const onlyWithPhotoCheckbox = document.getElementById('onlyWithPhoto');
    const onlyFavoritesCheckbox = document.getElementById('onlyFavorites');

    // Отримуємо значення фільтрів з елементів вводу
    const ageFilter = ageSelect.value;
    const regionFilter = regionSelect.value;
    const sexFilter = sexSelect.value;
    const onlyWithPhoto = onlyWithPhotoCheckbox.checked;
    const onlyFavorites = onlyFavoritesCheckbox.checked;

    // Створюємо об'єкт для фільтрів
    const filters = {
        age: ageFilter,
        country: regionFilter,
        gender: sexFilter,
        favorite: onlyFavorites,
        isPhoto: onlyWithPhoto,
    };

    // Фільтруємо викладачів на основі обраних фільтрів
    const filteredTeachers = filterObjects(array, filters);

    // Відображаємо відфільтрованих викладачів на сторінці
    renderTeachersTemplates(filteredTeachers);
    renderStatisticsTable(filteredTeachers);
}


function renderStatisticsTable(arr) {
    const table = document.getElementById("statisticsTable");
    const headers = table.querySelectorAll("thead th");

    // Отримайте tbody для таблиці
    const tbody = table.querySelector("tbody");

    // Функція для оновлення таблиці
    function updateTable(sortOrder, order) {

        while (tbody.firstChild) {
            tbody.removeChild(tbody.firstChild);
        }
        // Початковий порядок сортування (за ім'ям, спеціальністю, країною та віком)

        let sortedTeacher = arr;
        sortedTeacher = sortObjects(arr, sortOrder, order);

        // Додайте відсортовані дані до таблиці
        sortedTeacher.forEach((item) => {
            const row = document.createElement("tr");
            const keys = ["full_name", "course", "age", "gender", "country"];
            keys.forEach((key) => {
                const cell = document.createElement("td");
                cell.textContent = item[key];
                row.appendChild(cell);
            });
            tbody.appendChild(row);
        });
    }
    let order = 1;
    // Функція для зміни sortOrder при кліку на заголовок стовпця
    function handleHeaderClick(event) {
        let clickedHeader = event.target.closest("th");
        if (!clickedHeader) return;

        // Отримайте текс з заголовка
        let headerText = clickedHeader.textContent.trim();
        let sortOrder = "";

        // Визначте sortOrder на основі тексту заголовка
        if (headerText === "Name ↓") {
            sortOrder = "full_name";
        }
        else if (headerText === "Speciality ↓") {
            sortOrder = "course";
        }
        else if (headerText === "Gender ↓") {
            sortOrder = "gender";
        }
        else if (headerText === "Age ↓") {
            sortOrder = "age";
        }
        else if (headerText === "Nationality ↓") {
            sortOrder = "country";
        }
        let arrows = document.querySelectorAll('.tableArrow');
        arrows.forEach((arrow) => {
            arrow.style.transform = `rotate(${order === 1 ? 0 : 180}deg)`;
        });
        // Оновіть таблицю
        updateTable(sortOrder, order *= -1);
    }

    // Додайте обробник подій для заголовків стовпців
    headers.forEach((header) => {
        header.addEventListener("click", handleHeaderClick);
    });

    // Початкове заповнення та сортування таблиці
    updateTable(0);
}

function handleAddTeacherButtons() {
    const addTeacherButtons = document.querySelectorAll('.addTeacherButton');
    addTeacherButtons.forEach((button) => {
        button.addEventListener("click", () => {
            showAddTeacherPopup();
        });
    });
    const closePopupAddTeacher = document.getElementById('closePopupAddTeacher');
    closePopupAddTeacher.addEventListener("click", () => {
        const teacherPopup = document.getElementById('addTeacherPopupBack');
        teacherPopup.style.display = "none";
    });
}
function showAddTeacherPopup() {
    const teacherPopup = document.getElementById('addTeacherPopupBack');
    teacherPopup.style.display = "block";
}
function hideAddTeacherPopup() {
    const teacherPopup = document.getElementById('addTeacherPopupBack');
    teacherPopup.style.display = "none";
}


function searchTeacherByValue(arr, value) {
    return arr.filter((obj) => {
        if (typeof value === 'string') {
            if ((obj["full_name"]).toLowerCase().includes(value.toLowerCase()) || (obj["note"]).toLowerCase().includes(value.toLowerCase())) {
                return true;
            }
            else if (value.includes("-")) {
                const [minAge, maxAge] = value.split('-').map(Number);
                return obj["age"] >= minAge && obj["age"] <= maxAge;
            }

            else if (value.includes("<")) {
                const maxAge = Number(value.replace("<", "").trim());
                return obj["age"] < maxAge;
            }

            else if (value.includes(">")) {
                const minAge = Number(value.replace(">", "").trim());
                return obj["age"] > minAge;
            }

            else {
                return String(obj["age"]).includes(String(value));
            }
        } else {
            return false;
        }

    });
}
function handleSearchFieldAndButton() {
    document.querySelector('#addSpeciality').value;
    const searchButton = document.querySelector('#searchButtonClick');
    searchButton.addEventListener('click', (event) => {
        event.preventDefault();
        searchTeacherButtonClicked();
    });

    const clearButton = document.getElementById('clearSearchButton');
    clearButton.addEventListener('click', () => clearSearch());
}
function searchTeacherButtonClicked() {
    const searchField = document.getElementById('searchField');
    let value = searchField.value;
    let searchArray;
    if (value) {
        searchArray = searchTeacherByValue(finalArray, value);
        document.getElementById('ageSelect').value = "all";
        document.getElementById('regionSelect').value = "all";
        document.getElementById('sexSelect').value = "all";
        document.getElementById('onlyWithPhoto').checked = false;
        document.getElementById('onlyFavorites').checked = false;
        handleFilters(searchArray);
        renderTeachersTemplates(searchArray);
        renderStatisticsTable(searchArray);
    }



}
// Збираємо дані з форми та додаємо викладача до списку
function createUserObject() {
    // Отримуємо значення з полів форми
    const name = document.querySelector('.addName').value;
    const speciality = document.querySelector('#addSpeciality').value;
    const country = document.querySelector('.addCountry').value;
    const city = document.querySelector('.addCity').value;
    const email = document.querySelector('.addEmail').value;
    const phone = document.querySelector('.addPhone').value;
    const dateOfBirth = document.querySelector('.addDate').value;
    const gender = document.querySelector('input[name="sex"]:checked').value;
    const notes = document.querySelector('.addNotes').value;


    const age = new Date().getFullYear() - new Date(dateOfBirth).getFullYear();


    const newTeacher = {
        full_name: name,
        course: speciality,
        country: country,
        city: city,
        email: email,
        phone: phone,
        age: age,
        gender: gender,
        note: notes,
        picture_large: gender === "male" ? "images/male-default.svg" : "images/female-default.svg",
        favorite: false
    };

    // Додаємо викладача до масиву
    finalArray.push(newTeacher);

    // Оновлюємо відображення викладачів
    renderTeachersTemplates(finalArray);
    renderStatisticsTable(finalArray);


    hideAddTeacherPopup();
}

document.querySelector('.addTeacherButton').addEventListener('click', showAddTeacherPopup);
document.querySelector('#closePopupAddTeacher').addEventListener('click', hideAddTeacherPopup);


document.querySelector('#addTeacherForm').addEventListener('submit', (event) => {
    event.preventDefault();  // Зупиняємо стандартну відправку форми
    createUserObject();
});


function sortTableByColumn(array, columnKey, ascending) {
    return array.sort((a, b) => {
        let valueA = a[columnKey];
        let valueB = b[columnKey];


        if (typeof valueA === 'string') {
            valueA = valueA.toLowerCase();
        }
        if (typeof valueB === 'string') {
            valueB = valueB.toLowerCase();
        }


        if (valueA < valueB) return ascending ? -1 : 1;
        if (valueA > valueB) return ascending ? 1 : -1;
        return 0;
    });
}


function updateStatisticsTable(sortedArray) {
    const tbody = document.querySelector('#statisticsTable tbody');
    tbody.innerHTML = '';  // Очищаємо старі рядки

    sortedArray.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.full_name}</td>
            <td>${item.course}</td>
            <td>${item.age}</td>
            <td>${item.gender}</td>
            <td>${item.country}</td>
        `;
        tbody.appendChild(row);
    });
}


function handleTableSort() {
    const nameHeader = document.querySelector('#nameHeader');
    let currentSortDirection = true;  // true для зростання, false для спадання

    nameHeader.addEventListener('click', () => {
        console.log('Сортування по колонці "Name"');

        // Зміна напряму сортування
        currentSortDirection = !currentSortDirection;

        // Оновлення стрілки
        const arrow = nameHeader.querySelector('.tableArrow');
        arrow.textContent = currentSortDirection ? '↓' : '↑';

        // Сортуємо масив та оновлюємо таблицю
        const sortedArray = sortTableByColumn(finalArray, 'full_name', currentSortDirection);
        updateStatisticsTable(sortedArray);
    });
    const ageHeader = document.querySelector('#ageHeader');
    ageHeader.addEventListener('click', () => {
        console.log('Сортування по колонці "Age"');
        currentSortDirection = !currentSortDirection;
        const arrow = ageHeader.querySelector('.tableArrow');
        arrow.textContent = currentSortDirection ? '↓' : '↑';
        const sortedArray = sortTableByColumn(finalArray, 'age', currentSortDirection);
        updateStatisticsTable(sortedArray);
    });
    const genderHeader = document.querySelector('#genderHeader');
    genderHeader.addEventListener('click', () => {
        console.log('Сортування по колонці "Gender"');
        currentSortDirection = !currentSortDirection;
        const arrow = genderHeader.querySelector('.tableArrow');
        arrow.textContent = currentSortDirection ? '↓' : '↑';
        const sortedArray = sortTableByColumn(finalArray, 'gender', currentSortDirection);
        updateStatisticsTable(sortedArray);
    });
    const nationalityHeader = document.querySelector('#nationalityHeader');
    nationalityHeader.addEventListener('click', () => {
        console.log('Сортування по колонці "Nationality"');
        currentSortDirection = !currentSortDirection;
        const arrow = nationalityHeader.querySelector('.tableArrow');
        arrow.textContent = currentSortDirection ? '↓' : '↑';
        const sortedArray = sortTableByColumn(finalArray, 'country', currentSortDirection);
        updateStatisticsTable(sortedArray);
    });
    const specialityHeader = document.querySelector('#specialityHeader');
    specialityHeader.addEventListener('click', () => {
        console.log('Сортування по колонці "Speciality"');
        currentSortDirection = !currentSortDirection;
        const arrow = specialityHeader.querySelector('.tableArrow');
        arrow.textContent = currentSortDirection ? '↓' : '↑';
        const sortedArray = sortTableByColumn(finalArray, 'course', currentSortDirection);
        updateStatisticsTable(sortedArray);
    });

}


function handleAddButtonForm() {
    const addForm = document.getElementById('addTeacherForm');
    addForm.addEventListener("submit", (event) => {
        event.preventDefault();
        createUserObject();
    });
}
//повертає true, якщо дублікату не знайдено
function checkForDublicate(arr, user) {
    for (const obj of arr) {
        if (obj.full_name === user.full_name) {
            return false;
        }
    }
    return true;
}

async function fetchRandomTeachers(numOfTeachers) {
    const url = `https://randomuser.me/api/?results=${numOfTeachers}`;

    // Виконання запиту за допомогою fetch
    await fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Помилка при виконанні запиту');
        })
        .then(data => {
            let users = data.results;

            for (let user of users) {
                finalArray.push(formatUser(user));
            }
            renderTeachersTemplates(finalArray);
            renderStatisticsTable(finalArray);
        })
        .catch(error => {
            console.error(error);
        });


}
function handleTenMoreButton() {
    const tenMoreButt = document.getElementById("tenMoreButton");
    tenMoreButt.addEventListener("click", () => {
        fetchRandomTeachers(10);
    })

}

window.onload = () => {
    fetchRandomTeachers(50).then(() => {
        handleTableSort();
        updateStatisticsTable(finalArray);
        handleFilters(finalArray);
        handleSearchFieldAndButton();
        handleAddButtonForm();
        handleAddTeacherButtons();
        handleTenMoreButton();
        console.log(finalArray);
    });
};

