#!/usr/bin/env node

import { program } from "commander";

program
    .version("1.0.0")
    .description("HR manager CLI")
    .option("-f,  --filename <filename>", "Filename to save the report")
    .action((options) => {
        console.log(options);
    });

program.parse(process.argv);
