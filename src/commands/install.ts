import * as vscode from 'vscode';
import * as child_process from 'child_process';
import * as util from 'util';
import * as semver from 'semver';

const exec = util.promisify(child_process.exec);

export const register =  (context: vscode.ExtensionContext) => {

    let disposable = vscode.commands.registerCommand('dotnetscriptr.install', async (context) => {
        const output = vscode.window.createOutputChannel("dotnetscriptr - Installing dependencies...");
        
        try {
            vscode.window.showInformationMessage("dotnetscriptr - Checking dependencies...");

            output.append("Checking for dotnet core... ");

            const dotnetVersion = (await exec(`dotnet --version`)).stdout;
            const isValid = semver.gte(dotnetVersion, "3.0.100");

            if (!isValid) {
                output.appendLine("Missing!");
                vscode.window.showErrorMessage(`Install dotnet core sdk 3.0 or later at https://dot.net`);
                return;
            }
            else
                output.appendLine("OK!");

            output.append("Checking for dotnet script... ");
            
            await exec(`dotnet tool install -g dotnet-script`)
                .then(() => output.appendLine("Installed!"))
                .catch(e => {
                    if (/already installed/.test(e))
                        output.appendLine("OK!");
                    else {
                        vscode.window.showErrorMessage(`Install dotnet script: ${e}`);
                        output.appendLine("Error!");
                    }
                });

            vscode.window.showInformationMessage("dotnetscriptr - Dependencies OK");
        }
        finally {
            output.dispose();
        }
    });
    
    context.subscriptions.push(disposable);
} 