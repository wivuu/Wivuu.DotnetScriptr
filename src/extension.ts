import * as vscode from 'vscode';
import * as runSelection from './commands/runSelection';
import * as install from './commands/install';

// TODO
// - Settings for various things; advance next line
// - Helper to check & install dotnet script or prompt user to install it
// - Command to add omnisharp.json stub
// - Command to initialize C# script file?
// - Command to run whole file interactively
// - Write readme

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Register run selection command
	runSelection.register(context);

	// Register installation command
	install.register(context);

	// Ensure dotnet script is installed
}

// this method is called when your extension is deactivated
export function deactivate() {}
