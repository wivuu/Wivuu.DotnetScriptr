import * as vscode from 'vscode';

export const register =  (context: vscode.ExtensionContext) => {

    let disposable = vscode.commands.registerCommand('dotnetscriptr.installDotNetScript', (context) => {

        // Check if 'dotnet-script' is installed
        // `dotnet tool list -g`

        vscode.window.showInformationMessage("Checking for dotnet");
        vscode.window.showInformationMessage("Checking for dotnet-script");

    });

    context.subscriptions.push(disposable);
}