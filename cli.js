#!/usr/bin/env node

const exec = require('child_process').exec;
const program = require('commander');
const { blue, green, red, yellow, cyan, magenta, white } = require('chalk');

const REPORT_FILENAME_SUFFIX_DEFAULT = 'lighthouse';

const picture = () => (`
                  ${red(`.n.`)}                     ${yellow(`|`)}
                 ${red(`/___\\`)}          ${white(`_.---.`)}${yellow(`  \\ _ /`)}
                 ${yellow(`[|||]`)}         ${white(`(_._ ) )--;`)}${yellow(`_) --`)}
                 ${red(`[___]`)}           ${white(`'---'.__,`)}${yellow(`' \\`)}
                 ${white(`}-=-{`)}                    ${yellow(`|`)}
                 ${red(`|-" |`)}
                 ${white(`|.-"|`)}                ${white(`,`)}
          ${blue(`~^-~^~-`)}${red(`|_.-|`)}${blue(`~^-~^~ ~^~ -^~^~`)}${white(`|\\`)}${blue(` ~^-~^~-`)}
          ${blue(`^`)}   ${white(`.=.`)}${white(`| _.|`)}${white(`__`)}${blue(`  ^       ~`)}${white(`  /| \\`)}
          ${blue(` ~`)}${white(` /:. \\`)}${red(`" _|`)}${white(`_/\\`)}${blue(`    ~`)}${white(`      /_|__\\`)}${blue(`  ^`)}
          ${green(`.-`)}${white(`/::.  |   |""|`)}${green(`-._`)}${blue(`    ^`)}${white(`   ~~~~`)}
            ${white(`\`===-'-----'""\``)}${green(`  '-.`)}${blue(`              ~`)}
                          ${green(` __.-'`)}${blue(`      ^`)}
`);

program
    .option('-s, --sites <urls>', 'Comma-delimited list of URLs to audit', urls => urls.split(','), [])
    .option('-t, --html', 'Generates HTML reports')
    .option('-c, --csv', 'Generates CSV reports')
    .option('-p, --params <values>', 'Quoted string of params to pass to Lighthouse CLI', '', '')
    .option('-f, --filename <filename>', 'Set the name of the generated report file')
    .option('-v, --verbose', 'Enables verbose logging')
    .parse(process.argv);

const generateReportFilename = (url, fileExtension) => {
    const urlName = url.replace(/^https?:\/\//, '').replace(/[\/\?#:\*\$@\!\.]/g, '_');
    const today = new Date();
    const timestamp = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}-${today.getHours()}${today.getMinutes()}${today.getSeconds()}`;
    return `${timestamp}_${urlName}${urlName.charAt(urlName.length - 1) === '_' ? '' : '_'}${REPORT_FILENAME_SUFFIX_DEFAULT}.${fileExtension}`;
};

const init = () => {
    console.log(picture());
    const { sites, params, html, csv, filename, verbose } = program;
    exec('lighthouse --version', (error, stdout, stderr) => {
        if (stderr) {
            console.error(red(`\n    ERROR: No global installation of Google Lighthouse NPM CLI was found.\n    Please run: ${magenta('npm i -g lighthouse')}\n`));
            process.exit(1);
        }
    });
    if (sites.length === 0) {
        console.error(red(`\n    ERROR: No site URLs were given.\n    Please make sure to include URLs with -s or --sites: ${magenta('lighthouse-batch -s google.com,facebook.com')}\n`));
        process.exit(1);
    }
    else {
        console.log(white(`    Generating report types:\n    ---------------------------------------------------\n    ${green('✓')} JSON    ${html ? green('✓') : red('x')} HTML    ${csv ? green('✓') : red('x')} CSV\n\n\n    Processing ${cyan(sites.length)} URLs: \n    ---------------------------------------------------`));
        sites.map((url, index) => {
            url = url.match(/^https?:/) ? url : !url.startsWith('//') ? `https://${url}` : `https${url}`;
            const reportName = filename ? `${filename}.json` : generateReportFilename(url, 'json');
            console.log(`    ${cyan(`${index + 1}.`)} ${white(`${reportName} - ${url}`)}`);
            const command = `"${url}" --output json ${html ? 'html' : ' '} ${csv ? 'csv' : ' '} --output-path=./${reportName} ${verbose ? '' : '--quiet'} --chrome-flags="--headless" ${params}`;
            exec(`lighthouse ${command}`);
        });
        console.log(cyan('\n\n    Please wait for reports to complete...\n'));
    }
};

init();