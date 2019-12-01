import * as vscode from 'vscode';
import * as runSelection from './commands/runSelection';
import * as install from './commands/install';
import * as initializeFolder from './commands/initializeFolder';

// TODO
// - Settings for various things; advance next line
// - Command to initialize folder
// - Command to run whole file interactively
// - Write readme

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Register run selection command
	runSelection.register(context);

	// Register installation command
	install.register(context);

	// Register command to initialize folder
	initializeFolder.register(context);

	// Ensure dotnet script is installed
	// vscode.commands.executeCommand("dotnetscriptr.install");
}

// this method is called when your extension is deactivated
export function deactivate() {}
