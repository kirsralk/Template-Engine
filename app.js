const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const util = require("util");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const writeFileAsync = util.promisify(fs.writeFile);

const render = require("./lib/htmlRenderer");


// Empty array where employee objects will populate
const employees = [];

// Inquirer prompt to collect user input
const promptUser = () =>
    inquirer.prompt([
    {
        type: 'input',
        name: 'name',
        message: "Enter this team member's name:",
    },
    {
        type: 'number',
        name: 'id',
        message: "Enter this team member's ID:",
    },
    {
        type: 'input',
        name: 'email',
        message: "Enter this team member's email:",
    },
    {
        type: 'list',
        name: 'type',
        message: 'Select a job description for this team member:',
        choices: ['Engineer','Intern','Manager'],
    },
        {
            type: 'input',
            name: 'github',
            message: "Enter this team member's GitHub username:",
            when: (answers) => answers.type === "Engineer"
        },
        {
            type: 'input',
            name: 'school',
            message: "Enter this team member's school name:",
            when: (answers) => answers.type === "Intern"
        },
        {
            type: 'input',
            name: 'officeNumber',
            message: "Enter this team member's office number:",
            when: (answers) => answers.type === "Manager"
        },

    ])  

    .then((answers) => {
        if (answers.type === "Engineer") {
            employees.push(new Engineer(answers.name.toUpperCase(), answers.id, answers.email, answers.github))
        } else if (answers.type === "Intern") {
            employees.push(new Intern(answers.name.toUpperCase(), answers.id, answers.email, answers.school))
        } else {
            employees.push(new Manager(answers.name.toUpperCase(), answers.id, answers.email, answers.officeNumber))
        }
            fs.appendFile(outputPath,render(employees),(err) =>
            err ? console.log(err) : console.log("This line ran at 74"));
    });
    // .then((answers) => render(answers));
            

        // if (answers.ID == "0") {
        //     console.log("inputs captured" + JSON.stringify(answers));
        // }
        // else {
        //     return
        // }
    // });

promptUser();


    // .then((employees) => fs.writeFileSync('team.html', render(employees), "utf8")); 
//     .then((employees) => {
//         // fs.mkdirSync(OUTPUT_DIR)
//         fs.appendFile(outputPath, render(employees), "utf8")
// }); 
    // .then(answers => render());
    // .then(console.log(answers));




