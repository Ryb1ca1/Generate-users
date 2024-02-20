
window.onload = function()
{
    document.getElementById('generateButton').addEventListener('click', generateData);
    document.getElementById('clearButton').addEventListener('click', clearData);
};

function generateData() {
    const initPerson = personGenerator.getPerson();
    const birthDate = `${initPerson.birthDay} ${initPerson.birthMonth} ${initPerson.birthYear}`;
    document.getElementById('firstNameOutput').innerText = initPerson.firstName;
    document.getElementById('surnameOutput').innerText = initPerson.surname;
    document.getElementById('birthYearOutput').innerText = birthDate;
    document.getElementById('genderOutput'). innerText = initPerson.gender;
    document.getElementById('professionOutput').innerText = initPerson.profession;
    document.getElementById('patronymicOutput').innerText = initPerson.patronymic;
}

function clearData() {
    document.getElementById('firstNameOutput').innerText = "-";
    document.getElementById('surnameOutput').innerText = "-";
    document.getElementById('birthYearOutput').innerText = "-";
    document.getElementById('genderOutput').innerText = "-";
    document.getElementById('professionOutput').innerText = "-";
    document.getElementById('patronymicOutput').innerText = "-";
}