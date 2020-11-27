let inquirer = require("inquirer")
let fs = require('fs')


console.log(inquirer)
console.log("lkaklsjdflsj")


inquirer.prompt([

    {
        name: "title",
        message: "What is the name of your project",
        type: "input"

    },
    {
        name: "fullName",
        message: "What is your full name?",
        type: "input"

    },
    {
        name: "gitHubUserName",
        message: "What is your GitHub user name?",
        type: "input"

    },
    {
        name: "email",
        message: "What is your email?",
        type: "email"

    },

    {
        name: "description",
        message: `What was your motivation? Why did you build this project? What problem does it solve? What did you learn? What makes your project stand out? If your project has a lot of features, consider adding a heading called "Features" and listing them here`,
        type: "input"
        
    },
    {
        name: "tableOfContents",
        message: "Add a table of contents?",
        type: "list",
        choices: ["Yes","No"]

    },
    {
        name: "installation",
        message: "What are the steps required to install your project? Provide a step-by-step description of how to get the development environment running.",
        type: "input"
    },
    {
        name: "usage",
        message: "Provide instructions and examples for use. Include screenshots as needed.",
        type: "input"
    },
    {
        name: "video",
        message: `Provide a link to your screencastify videos.`,
        type: "input"
        
    },
    {
        name: "coverImageLink",
        message: `Provide a link to your video cover image.`,
        type: "input"
        
    },
    {
        name: "credits",
        message: "List your collaborators, if any, with links to their GitHub profiles. If you used any third-party assets that require attribution, list the creators with links to their primary web presence in this section. If you followed tutorials, include links to those here as well.",
        type: "input"
    },
    {
        name: "license",
        message: "lets other developers know what they can and cannot do with your project. If you need help choosing a license, use [https://choosealicense.com/](https://choosealicense.com/)",
        type: 'list',
        choices: ["MIT", "APACHE 2.0", "GPL 3.0", "BSD 3", "None"],
    },
    {
        name: "contributing",
        message: `If you created an application or package and would like other developers to contribute to it. add guidelines for how to do so.`,
        type: "input"
        
    },
    {
        name: "test",
        message: `write tests for your application. Then provide examples on how to run them.`,
        type: "input"
        
    },
    



]).then((response)=>{

    console.log(response)

    //logic for license section
    let badge = ""
    let license = ""
    let contentsTable = ""

    if(response.license==="MIT"){
        badge = "![APM](https://img.shields.io/apm/l/pack)";
        license = "The MIT license will let people do almost anything they want with your project, like making and distributing closed source versions."
    }
    else if(response.license==="APACHE 2.0"){
        badge = "![Hex.pm](https://img.shields.io/hexpm/l/apa)sdfsd" ;
        license = "The APACHE 2.0 license main conditions require preservation of copyright and license notices. Contributors provide an express grant of patent rights. Licensed works, modifications, and larger works may be distributed under different terms and without source code."
    }
    else if(response.license==="GPL 3.0"){
        badge = "![CRAN/METACRAN](https://img.shields.io/cran/l/gplm)";
        license = "Permissions of the GPL 3.0 license are conditioned on making available complete source code of licensed works and modifications, which include larger works using a licensed work, under the same license. Copyright and license notices must be preserved. Contributors provide an express grant of patent rights."
    }
    else if(response.license==="BSD 3"){
        badge = "![PyPI - License](https://img.shields.io/pypi/l/bsdf)";
        license = "The BSD 3-clause license allows you almost unlimited freedom with the software so long as you include the BSD copyright and license notice in it."

    }
    else if(response.license==="None"){
        badge = "No license";
    }

    //logic for table of contents
    if(response.tableOfContents==="Yes"){
        contentsTable = 
            `
* [Installation](#installation)
* [Usage](#usage)
* [Credits](#credits)
* [License](#license)
* [Questions](#questions)
* [Tests](#tests)
* [Contributing](#contributing)
* [Description](#description)

            `
    }
    else{
        contentsTable = `N/A`
    }



    //variable that renders Md file
    let renderMd = 
    ` # ${response.title}  
${badge}

## Description
    ${response.description}

## Table of Contents
    ${contentsTable}

## Installation
    ${response.installation}

## Usage
    ${response.usage}

[![Watch the video](${response.coverImageLink}.png)](${response.video})

## Credits
    ${response.credits}

## License
    ${response.license}

## Contributing
    ${response.contributing}

## Tests
    ${response.test}
## Questions
    Questions? Contact ${response.fullName} using the following:
GitHub ~ ${response.gitHubUserName} @ https://github.com/JoseSachango       
Email ~ ${response.email}

    `
    
    

  
    
    

   
    
    

    fs.writeFile("README.md",renderMd,(err)=>console.log(err))

})