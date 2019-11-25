## @intouchgroup/lighthouse-batch

CLI for batch processing Google Lighthouse audits


### Installation

Globally install this module and Google's Lighthouse module.<br/>
&nbsp;&nbsp;`npm i -g lighthouse @intouchgroup/lighthouse-batch`


### Usage

Using Terminal for Mac or Command Prompt for Windows, navigate into the directory where you want your reports to be saved, then run the `lighthouse-batch` command to generate Google Lighthouse reports.

Reports will be generated in the current working directory. For example, the following instructions will output to folder named "Reports" on the Desktop:

1. Using Terminal for Mac:<br/>
&nbsp;&nbsp;`cd ~/Desktop/Reports`<br/><br/>
Or using Command Prompt for Windows:<br/>
&nbsp;&nbsp;`cd Desktop/Reports`<br/><br/>
2. `lighthouse-batch -s google.com,intouchsol.com`


### Flags

| Short Name | Long Name   | Effect                                | Example                                                 |   |
|------------|-------------|---------------------------------------|---------------------------------------------------------|---|
| `-h`       | `--help`    | List all flags                        | `lighthouse-batch -h`                                   |   |
| `-s`       | `--sites`   | Comma-delimited list of URLs to audit | `lighthouse-batch -s google.com,intouchsol.com`         |   |
| `-t`       | `--html`    | Generates HTML reports                | `lighthouse-batch -t -s google.com`                     |   |
| `-c`       | `--csv`     | Generates CSV reports                 | `lighthouse-batch -c -s google.com`                     |   |
| `-p`       | `--params`  | String to be passed to Lighthouse CLI | `lighthouse-batch -s google.com -p "--port 8080"`       |   |
| `-f`       | `--filename`| Set the name of generated report file | `lighthouse-batch -s google.com -f "reportname"`        |   |
| `-v`       | `--verbose` | Enables verbose logging               | `lighthouse-batch -v -s google.com`                     |   |

**Note:** It does not matter if you use the short or long name for any flag, and flags may be passed in any order.
