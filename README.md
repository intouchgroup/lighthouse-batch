## @intouchgroup/lighthouse-batch

Lighthouse Batch is a tool to run multiple Google Lighthouse reports concurrently.

The tool makes multiple requests simultaneously, can handle HTTP or HTTPS domains, and is capable of testing sites which require Authentication.


### Installation

You must have [NodeJS](https://nodejs.org/en/) version 12+ installed to use this module.

To check what version of NodeJS you have, launch Terminal on Mac or Powershell on Windows and type `node -v`.

Once you have NodeJS 12+, globally install the latest version of this module from Terminal or Powershell:

`npm i -g @intouchgroup/lighthouse-batch`

You can now run Lighthouse Batch from any folder on your computer using Terminal or Powershell.


### Usage

When you open Terminal or Powershell, you will see a file path listed in the prompt. This is the current location of your Terminal or Powershell.

You can change locations using the `cd FILE_PATH` command. `cd` stands for "change directory" (go to a different folder), and is how you navigate using Terminal or Powershell.

1. Using Terminal or Powershell, navigate to the folder where you want to save the Lighthouse Batch reports. For example: `cd Desktop/Reports`

2. Now run the Lighthouse Batch tool from Terminal or Powershell with whatever *arguments* you want. For example: `lighthouse-batch -s intouchsol.com`


### Arguments

Arguments are how we tell `lighthouse-batch` what to do. Some arguments are required, while others are completely optional. Arguments can be passed in any order, but the value must come right after the argument text. For example:

`lighthouse-batch --argument "This is the value of the argument"`

A full list of available arguments with examples is presented below.

| Short name   | Long name          | What it does                                              |
|--------------|--------------------|-----------------------------------------------------------|
|  `-h`        |  `--help`          |  Shows all available arguments                            |
|  `-s`        |  `--sites`         |  Comma-separated list of URLs to test                     |
|  `-t`        |  `--html`          |  Generate HTML report                                     |
|  `-c`        |  `--csv`           |  Generate CSV report                                      |
|  `-p`        |  `--params`        |  Text to pass to Google's `lighthouse` tool               |
|  `-f`        |  `--filename`      |  Manually set the name of the generated report            |
|  `-v`        |  `--verbose`       |  Enables verbose logging                                  |


### Examples

<br>1. Generate CSV reports for multiple sites:

`lighthouse-batch -s intouchsol.com,google.com -c`

> Tests ht&#8203;tps://intouchsol.com and ht&#8203;tps://google.com

<br><br>2. Generate HTML reports for multiple sites:

`lighthouse-batch -s intouchsol.com,google.com -t`

> Tests ht&#8203;tps://intouchsol.com and ht&#8203;tps://google.com

<br><br>3. Generate a CSV report named "MyBestReportYet":

`lighthouse-batch -s intouchsol.com -c -f "MyBestReportYet"`

> Tests ht&#8203;tps://intouchsol.com

<br><br>4. Use short or long names for arguments. These commands are exactly equivalent:

`lighthouse-batch -s intouchsol.com -c -f "MyBestReportYet"`

`lighthouse-batch --sites intouchsol.com --csv --filename "MyBestReportYet"`

<br><br>5. Authentication is supported by passing encoded text to Google's `lighthouse` tool. We do this using the `-p` or `--params` argument.

First, make use of the [Lighthouse Auth Formatter](https://github.com/intouchgroup/lighthouse-auth-formatter) tool to encode your username and password. The encoded text should look similar to this:

`--extra-headers="{\"Authorization\":\"Basic Y29keS5wZXJzaW5nZXI6VGhpc1Bhc3N3b3JkMTIzXw==\"}"`

Next, use the encoded text as the value for the `-p` or `--params` argument. Make sure to *wrap the encoded text in single quotes*:

`lighthouse-batch -s intouchsol.com -c -p 'ENCODED_TEXT_GOES_HERE'`

Using our example encoded text above, the final command should look like this:

`lighthouse-batch -s intouchsol.com -c -p '--extra-headers="{\"Authorization\":\"Basic Y29keS5wZXJzaW5nZXI6VGhpc1Bhc3N3b3JkMTIzXw==\"}"'`
