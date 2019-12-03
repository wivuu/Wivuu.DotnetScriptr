import * as vscode from 'vscode';
import * as run from './commands/run';
import * as install from './commands/install';
import * as initializeFolder from './commands/initializeFolder';

// TODO
// - Write readme
// - Logo

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Register run commands
	run.registerRunSelection(context);
	run.registerRunDocument(context);

	// Register installation command
	install.register(context);

	// Register command to initialize folder
	initializeFolder.register(context);

	// Ensure dotnet script is installed
	// vscode.commands.executeCommand("dotnetscriptr.install");
}

// this method is called when your extension is deactivated
export function deactivate() {}
