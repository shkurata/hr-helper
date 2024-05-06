# A Sample HR helper CLI tool

This is a simple NodeJS CLI tool that helps HRs to calculate the payment dates for the employees.

## Dependencies

-   Jest
-   Inquirer
-   Figlet
-   Commander
-   Prettier
-   Eslint

## Installation

1. Clone the repository to your local machine using the following command:

```bash
git clone https://github.com/shkurata/hr-helper.git
```

2. Navigate to the project directory:

```bash
cd hr-helper
```

3. Install the dependencies:

```bash
npm install
```

4. Link the package to your global npm packages, to make the 'hr-helper' command available globally:

```bash
npm link
```

## Usage

After the installation, you can use the `hr-helper` command in your terminal to run the CLI tool. You have to answer a few questions to get the payment dates for the employees.

You have to choose:

1. the **locale** to be used for the payment dates calculation. The available locales are:
    - **en-US** (English - United States)
    - **nl-BE** (Dutch - Belgium)
    - **fr-BE** (French - Belgium)
    - **de-BE** (German - Belgium)
2. the **path** and the **name** of the file which will be used to store the payment dates
3. the **date** for the bonus payment

## Video

https://github.com/shkurata/hr-helper/assets/10957413/e47e9122-837b-4011-8154-620e06cc632b



