import * as vscode from 'vscode';
import * as child_process from 'child_process';
import * as util from 'util';

const exec = util.promisify(child_process.exec);

export const register = (context: vscode.ExtensionContext) => {

    let disposable = vscode.commands.registerCommand('dotnetscriptr.initializeFolder', async (context) => {
        const output = vscode.window.createOutputChannel("dotnetscriptr - Setting up folder...");

        output.append("Setting up folder... ");

        try {
            const [ cwd ] = vscode.workspace.workspaceFolders ?? [];

            if (cwd) {
                await exec(`dotnet script init`, {
                    cwd: cwd.uri.fsPath
                });

                output.appendLine("OK!");
            }
            else
                vscode.window.showErrorMessage("Must open a workspace first");
        }
        catch (e) {
            output.appendLine("Failed");
            console.error(e);
        }
        finally {
            output.dispose();
        }
    });

    context.subscriptions.push(disposable);
};
