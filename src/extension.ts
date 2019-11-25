import * as vscode from 'vscode';
import * as runSelection from './commands/runSelection';

// TODO
// - Add automatic keybinding for .csx files to invoke runSelection
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
}

// this method is called when your extension is deactivated
export function deactivate() {}
