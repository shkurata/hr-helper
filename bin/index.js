#!/usr/bin/env node

import { program } from 'commander';
import figlet from 'figlet';
import inquirer from 'inquirer';
import fs from 'fs';

import { calculatePaymentDatesUntilEndYear } from '../src/controller.js';

console.log(figlet.textSync('HR Manager CLI', { horizontalLayout: 'full' }));

program
	.version('1.0.0')
	.description('HR manager CLI')
	.action(() => {
		console.log('Welcome to HR Manager CLI!\n');
        console.log('Please answer the following questions to generate the payment dates report.\n');
        
		inquirer
			.prompt([
				{
					type: 'list',
					name: 'locale',
					message: 'Please enter your locale (Enter for default)',
					choices: ['en-US', 'nl-BE', 'fr-BE', 'de-BE'],
					default: 'en-US',
				},
				{
					type: 'input',
					name: 'pathname',
					message:
						'Please enter the path to be used for the generated report',
					default: 'output',
				},
				{
					type: 'input',
					name: 'filename',
					message:
						'Please enter the filename for the generated report',
					default: 'payment-dates',
				},
				{
					type: 'input',
					name: 'bonusDate',
					message: 'Please enter the bonus date',
					default: '15',
				},
				{
					type: 'list',
					name: 'generateFile',
					message: 'Proceed to generate the report? (Yes/No)',
					choices: ['Yes', 'No'],
					default: 'Yes',
				},
			])

			.then(({ locale, pathname, filename, bonusDate, generateFile }) => {
				if (generateFile === 'Yes') {
					const reportData = calculatePaymentDatesUntilEndYear(
						locale,
						bonusDate,
					);
					const logger = fs.createWriteStream(
						`${pathname}/${filename}.csv`,
						{
							flags: 'w',
						},
					);
					logger.write('Month,Payment Date,Bonus Date\n');
					reportData.forEach(data => {
						logger.write(
							`${data.month},${data.paymentDay},${data.bonusDay}\n`,
						);
					});
					console.log(
						`Filename ${filename} successfully generated in ${pathname} folder.`,
					);
				} else {
					console.log('Exiting...');
				}
			})
			.catch(error => {
				console.log('An error occurred', error);
			});
	});

program.parse(process.argv);
