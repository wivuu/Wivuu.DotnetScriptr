import * as vscode from 'vscode';

export const register =  (context: vscode.ExtensionContext) => {

    let disposable = vscode.commands.registerCommand('dotnetscriptr.install', (context) => {
        // Check if 'dotnet-script' is installed
        // `dotnet tool list -g`

        vscode.window.showInformationMessage("Checking for dotnet");
        vscode.window.showInformationMessage("Checking for dotnet-script");

        // Use the console to output diagnostic information (console.log) and errors (console.error)
        // This line of code will only be executed once when your extension is activated
        console.log('Congratulations, your extension "dotnetscriptr" is now active!');

        
    });
    
    context.subscriptions.push(disposable);
}